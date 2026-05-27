import { cn } from "@/lib/utils";

type ChipStatus = "ok" | "warn" | "bad" | "default";

const dotColors: Record<ChipStatus, string> = {
  ok: "bg-ok",
  warn: "bg-warn",
  bad: "bg-bad",
  default: "bg-ink-4",
};

export function Chip({
  children,
  status = "default",
  className,
}: {
  children: React.ReactNode;
  status?: ChipStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 h-7 px-2.5 bg-bg-card border border-line rounded-full text-[13px] text-ink-2 tabular-nums",
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", dotColors[status])} />
      {children}
    </span>
  );
}
