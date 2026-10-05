import { cn } from "@/lib/utils";

/** DentaNova wordmark + monogram (original, made for this demo). */
export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden="true">
        <rect width="40" height="40" rx="12" fill={light ? "#ffffff" : "#0b1d3a"} />
        <path
          d="M13.2 11.5c-2.6 0-4.4 2-4.4 4.7 0 2.2.8 3.4 1.5 5.2.7 1.7.8 3.6 1.1 5.6.3 1.8.9 3.5 2.2 3.5 1.6 0 1.9-2.4 2.4-4.2.4-1.4 1-2.3 2.4-2.3"
          fill="none"
          stroke={light ? "#0b1d3a" : "#ffffff"}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M26.8 11.5c2.6 0 4.4 2 4.4 4.7 0 2.2-.8 3.4-1.5 5.2-.7 1.7-.8 3.6-1.1 5.6-.3 1.8-.9 3.5-2.2 3.5-1.6 0-1.9-2.4-2.4-4.2-.4-1.4-1-2.3-2.4-2.3"
          fill="none"
          stroke="#6a9cec"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="20" cy="13.2" r="1.8" fill="#6a9cec" />
      </svg>
      <span className={cn("text-[1.3rem] leading-none tracking-[-0.03em]", light ? "text-white" : "text-navy-900")}>
        <span className="font-bold">Denta</span>
        <span className={cn("font-medium", light ? "text-azure-200" : "text-azure-600")}>Nova</span>
      </span>
    </span>
  );
}
