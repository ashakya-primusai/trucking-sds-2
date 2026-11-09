export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span className={`font-mono text-xs font-medium tracking-[0.08em] uppercase ${dark ? "text-white/50" : "text-ink-3"}`}>
      <span className="text-sds-accent">●</span>
      &nbsp;&nbsp;{children}
    </span>
  );
}
