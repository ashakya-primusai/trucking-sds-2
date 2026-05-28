const stats = [
  { big: "40%", label: "more loads per dispatcher per day" },
  { big: "3×", label: "faster invoice-to-payment" },
  { big: "80%", label: "less manual data entry" },
  { big: "100%", label: "POD capture rate" },
];

const brand = [
  { big: "4.8", unit: "/ 5", label: "on G2 and Capterra. Rated by real dispatchers." },
  { big: "10K", unit: "+", label: "dispatchers using Enrout.ai every single day.", dark: true },
  { big: "$1.8", unit: "B", label: "in freight invoiced through Enrout.ai in 2025." },
  { big: "99.99", unit: "%", label: "uptime SLA on Enterprise. Every truck, always." },
];

export function StatsStrip() {
  return (
    <section className="bg-bg-soft border-y border-line" style={{ paddingBlock: "clamp(96px, 10vh, 128px)" }}>
      <div className="page-wrap">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.big}
              className="px-6 first:pl-0"
              style={{ borderLeft: i > 0 ? "1px solid var(--line)" : "none" }}
            >
              <div
                className="tabular-nums"
                style={{
                  fontSize: "clamp(56px, 6.5vw, 96px)",
                  fontWeight: 500,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {s.big}
              </div>
              <div className="text-sm text-ink-3 mt-3.5 max-w-[200px] leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-[72px]">
          {brand.map((b) => (
            <div
              key={b.label}
              className="rounded-[14px] p-6 flex flex-col gap-2 border"
              style={{
                background: b.dark ? "var(--ink)" : "var(--bg)",
                color: b.dark ? "var(--bg)" : "var(--ink)",
                borderColor: b.dark ? "var(--ink)" : "var(--line)",
              }}
            >
              <div
                className="tabular-nums"
                style={{
                  fontSize: "clamp(28px, 3vw, 40px)",
                  fontWeight: 540,
                  letterSpacing: "-0.025em",
                  lineHeight: 1,
                }}
              >
                {b.big}
                <span
                  className="text-[0.5em] ml-1"
                  style={{
                    color: b.dark
                      ? "color-mix(in oklch, white 45%, transparent)"
                      : "var(--ink-3)",
                  }}
                >
                  {b.unit}
                </span>
              </div>
              <div
                className="text-[13.5px] max-w-[200px] leading-snug"
                style={{
                  color: b.dark
                    ? "color-mix(in oklch, white 68%, transparent)"
                    : "var(--ink-3)",
                }}
              >
                {b.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
