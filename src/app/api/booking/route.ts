import { NextResponse, type NextRequest } from "next/server";
import { parseBooking, validateAll } from "@/lib/booking";

/**
 * POST /api/booking — demo booking endpoint.
 *
 * - Accepts JSON only, with a small body size limit
 * - Re-validates every field server-side (never trusts the browser)
 * - Honeypot field ("website") silently drops simple bots
 * - Basic in-memory rate limiting per IP (good enough for a demo; use a shared
 *   store such as Redis/Upstash in production with multiple instances)
 * - Nothing is stored. If BOOKING_WEBHOOK_URL is set (server-side env only),
 *   the validated request is forwarded there (e.g. n8n / CRM).
 */

const MAX_BODY_BYTES = 4_000;
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const hits = new Map<string, { count: number; start: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(ip, { count: 1, start: now });
    if (hits.size > 5_000) hits.clear(); // avoid unbounded growth
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

function reference(): string {
  return "DEMO-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

export async function POST(request: NextRequest) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ ok: false, error: "unsupported_media_type" }, { status: 415 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (json && typeof json === "object" && (json as Record<string, unknown>).website) {
    return NextResponse.json({ ok: true, reference: reference(), demo: true });
  }

  const data = parseBooking(json);
  const errors = validateAll(data);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "validation", fields: errors }, { status: 422 });
  }

  const ref = reference();
  const webhook = process.env.BOOKING_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(process.env.BOOKING_WEBHOOK_SECRET ? { "x-webhook-secret": process.env.BOOKING_WEBHOOK_SECRET } : {}),
        },
        body: JSON.stringify({ ...data, reference: ref, createdAt: new Date().toISOString() }),
        signal: AbortSignal.timeout(5_000),
      });
    } catch {
      return NextResponse.json({ ok: false, error: "forward_failed" }, { status: 502 });
    }
  }

  // Demo mode: data is validated and then discarded.
  return NextResponse.json({ ok: true, reference: ref, demo: !webhook });
}

export function GET() {
  return NextResponse.json({ ok: false, error: "method_not_allowed" }, { status: 405, headers: { Allow: "POST" } });
}
