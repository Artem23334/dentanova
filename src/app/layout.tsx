import type { ReactNode } from "react";
import "./globals.css";

/**
 * The real root layout (with <html lang>) lives in app/[locale]/layout.tsx so the
 * language attribute matches the page. This file only passes children through.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
