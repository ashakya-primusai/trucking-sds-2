function RuleRow({ kw, children }: { kw: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[64px_1fr] gap-4 items-center p-3 px-3.5 rounded-lg" style={{ background: "color-mix(in oklch, white 4%, transparent)" }}>
      <span className="font-mono text-xs tracking-[0.08em] font-semibold text-sds-accent">
        {kw}
      </span>
      <div className="flex gap-2.5 flex-wrap items-center text-sm" style={{ color: "color-mix(in oklch, white 88%, transparent)" }}>
        {children}
      </div>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center h-[26px] px-2.5 rounded-full text-white text-[12.5px]" style={{ background: "color-mix(in oklch, white 10%, transparent)", border: "1px solid color-mix(in oklch, white 18%, transparent)" }}>
      {children}
    </span>
  );
}

export function AutomationBuilder() {
  return (
    <div className="bg-ink text-bg rounded-[20px] overflow-hidden font-mono shadow-[0_24px_60px_-30px_oklch(20%_0.02_60/0.18)]">
      <div className="flex justify-between items-center p-3.5 px-[18px] border-b" style={{ borderColor: "color-mix(in oklch, white 12%, transparent)" }}>
        <span className="text-[12px] tracking-[0.08em] uppercase font-medium" style={{ color: "color-mix(in oklch, white 60%, transparent)" }}>
          automation_builder.tos
        </span>
        <span className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full text-[13px]" style={{ background: "color-mix(in oklch, white 8%, transparent)", border: "1px solid color-mix(in oklch, white 14%, transparent)", color: "color-mix(in oklch, white 75%, transparent)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-ok" />
          Active
        </span>
      </div>

      <div className="p-5 px-[18px] flex flex-col gap-2">
        <RuleRow kw="WHEN">
          <span>New ETA</span>
          <span className="text-[13px]" style={{ color: "color-mix(in oklch, white 45%, transparent)" }}>→</span>
          <span>is Appointment Late</span>
        </RuleRow>
        <RuleRow kw="AND">
          <span>Customer Priority</span>
          <span className="text-[13px]" style={{ color: "color-mix(in oklch, white 45%, transparent)" }}>→</span>
          <span>is High</span>
        </RuleRow>
        <RuleRow kw="THEN">
          <Pill>Notify dispatcher</Pill>
          <Pill>Email customer</Pill>
          <Pill>Flag load as At Risk</Pill>
        </RuleRow>
      </div>

      <div className="p-3.5 px-[18px] border-t flex justify-between items-center font-sans" style={{ borderColor: "color-mix(in oklch, white 12%, transparent)" }}>
        <span className="text-[13px]" style={{ color: "var(--ink-3)" }}>
          Triggered <b className="text-white font-semibold tabular-nums">147</b> times this week · saved <b className="text-white font-semibold tabular-nums">~6.4 hrs</b>
        </span>
        <a href="#docs" className="inline-flex items-center gap-1.5 font-medium text-[14.5px] text-white group">
          Open builder{" "}
          <span className="inline-block transition-transform duration-150 group-hover:translate-x-[3px]">→</span>
        </a>
      </div>
    </div>
  );
}
