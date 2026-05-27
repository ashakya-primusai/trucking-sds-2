export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs font-medium tracking-[0.08em] uppercase text-ink-3">
      <span className="text-sds-accent">●</span>
      &nbsp;&nbsp;{children}
    </span>
  );
}
