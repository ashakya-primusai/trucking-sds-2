import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

const INDUSTRIES = [
  {
    id: "trucking",
    title: "Trucking Industry",
    tag: "For carriers & fleet operators",
    desc: "Full-truckload and LTL carriers run dispatch, tracking, billing, and fleet ops on one connected platform.",
    points: [
      "AI-powered dispatch",
      "Real-time load tracking",
      "Automated invoicing",
      "Driver & fleet management",
    ],
  },
  {
    id: "last-mile",
    title: "Last Mile Delivery",
    tag: "For couriers & delivery fleets",
    desc: "Final-mile teams optimize routes, capture proof-of-delivery, and keep customers updated — without extra tools.",
    points: [
      "Route optimization",
      "Proof-of-delivery capture",
      "Same-day scheduling",
      "Live customer ETAs",
    ],
  },
] as const;

function PreviewTrucking() {
  return (
    <div
      className="h-full rounded-xl p-4 flex flex-col gap-3 overflow-hidden bg-ink"
      style={{ border: "1px solid color-mix(in oklch, white 8%, var(--ink))" }}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
          Load L-4831 · En route
        </span>
        <span
          className="w-1.5 h-1.5 rounded-full bg-sds-accent"
          style={{ animation: "pulse-dot 1.8s ease-out infinite" }}
        />
      </div>
      <div className="flex-1 flex flex-col justify-center gap-3">
        <div className="flex items-center gap-2 text-[11px] font-mono">
          <span className="text-white/90 font-semibold">Dallas, TX</span>
          <span className="flex-1 h-px bg-white/15 relative">
            <span className="absolute inset-y-0 left-[18%] right-[38%] bg-sds-accent/70 h-px" />
          </span>
          <span className="text-white/90 font-semibold">Chicago, IL</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2">
            <p className="text-white/40">Miles</p>
            <p className="text-white font-semibold mt-0.5">880</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2">
            <p className="text-white/40">ETA</p>
            <p className="text-white font-semibold mt-0.5">6h 12m</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2">
            <p className="text-white/40">Driver</p>
            <p className="text-white font-semibold mt-0.5">M. Reyes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewLastMile() {
  const stops = [
    { n: 1, done: true },
    { n: 2, done: true },
    { n: 3, active: true },
    { n: 4 },
    { n: 5 },
  ];

  return (
    <div
      className="h-full rounded-xl p-4 flex flex-col gap-3 overflow-hidden bg-ink"
      style={{ border: "1px solid color-mix(in oklch, white 8%, var(--ink))" }}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
          Route R-219 · 5 stops
        </span>
        <span className="text-[10px] font-mono text-sds-accent">On time</span>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-2">
        {stops.map((stop) => (
          <div key={stop.n} className="flex items-center gap-2.5">
            <span
              className="w-5 h-5 rounded-full border grid place-items-center font-mono text-[8px] shrink-0"
              style={
                stop.done
                  ? {
                      background: "var(--sds-accent)",
                      borderColor: "var(--sds-accent)",
                      color: "white",
                    }
                  : stop.active
                    ? {
                        borderColor: "var(--sds-accent)",
                        color: "var(--sds-accent)",
                        background: "color-mix(in oklch, var(--sds-accent) 12%, transparent)",
                      }
                    : {
                        borderColor: "rgba(255,255,255,0.15)",
                        color: "rgba(255,255,255,0.35)",
                      }
              }
            >
              {stop.done ? "✓" : stop.n}
            </span>
            <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-sds-accent/80"
                style={{ width: stop.done ? "100%" : stop.active ? "62%" : "0%" }}
              />
            </div>
            <span className="font-mono text-[9px] text-white/35 w-8 text-right shrink-0">
              {stop.done || stop.active ? "POD" : "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const PREVIEWS = {
  trucking: PreviewTrucking,
  "last-mile": PreviewLastMile,
} as const;

function IndustryCard({
  id,
  title,
  tag,
  desc,
  points,
  index,
}: (typeof INDUSTRIES)[number] & { index: number }) {
  const Preview = PREVIEWS[id];

  return (
    <Reveal delay={index * 90} variant="scale" className="min-h-0 h-full">
      <article className="industry-card group flex flex-col min-h-0 h-full rounded-[20px] border border-line bg-bg-card overflow-hidden transition-all duration-300 hover:border-ink-4 hover:-translate-y-1">
        <div className="industry-card__preview p-4 pb-0 min-h-0">
          <Preview />
        </div>
        <div className="flex flex-col flex-1 p-6 pt-5 gap-4 min-h-0">
          <div>
            <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-sds-accent">
              {tag}
            </p>
            <h3
              className="mt-2 font-semibold tracking-tight"
              style={{ fontSize: "var(--sz-h3)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
            >
              {title}
            </h3>
            <p className="mt-2 text-ink-2 text-[15px] leading-relaxed">{desc}</p>
          </div>
          <ul className="mt-auto space-y-2">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-[14px] text-ink-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sds-accent shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

export function Industries() {
  return (
    <section id="industries" className="bg-bg border-b border-line">
      <div className="page-wrap industries-section">
        <Reveal className="industries-section__header max-w-[640px]">
          <Eyebrow>Industries</Eyebrow>
          <h2
            className="mt-4"
            style={{
              fontSize: "var(--sz-h2)",
              fontWeight: 540,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              textWrap: "balance",
            }}
          >
            Built for trucking teams and last-mile fleets.
          </h2>
        </Reveal>

        <div className="industries-section__grid">
          {INDUSTRIES.map((industry, i) => (
            <IndustryCard key={industry.id} {...industry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
