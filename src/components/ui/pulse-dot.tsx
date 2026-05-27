import { cn } from "@/lib/utils";

export function PulseDot({ className }: { className?: string }) {
  return (
    <span
      className={cn("w-2 h-2 rounded-full bg-sds-accent shrink-0", className)}
      style={{ animation: "pulse-dot 1.8s ease-out infinite" }}
    />
  );
}
