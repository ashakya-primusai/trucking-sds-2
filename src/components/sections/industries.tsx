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

const T = "transition-colors duration-200 ease-out";

/* ── Trucking: Dispatch Dashboard ── */

function PreviewTrucking({ isOpen }: { isOpen: boolean }) {
  return (
    <div className={`h-full rounded-2xl overflow-hidden select-none border ${isOpen ? "bg-[#151820] border-white/[0.06]" : "bg-white border-black/[0.06]"} ${T}`} style={{ fontSize: 0 }}>
      <div className={`flex items-center justify-between px-4 py-2.5 border-b ${isOpen ? "border-white/[0.06]" : "border-black/[0.06]"} ${T}`}>
        <div className="flex items-center gap-2">
          <div className="w-[18px] h-[18px] rounded-md bg-sds-accent/15 flex items-center justify-center">
            <div className="w-2 h-2 rounded-sm bg-sds-accent" />
          </div>
          <span className={`text-[11px] font-semibold tracking-tight leading-none ${isOpen ? "text-white" : "text-ink"} ${T}`}>Dispatch Board</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`text-[9px] px-2 py-1 rounded-md font-medium leading-none ${isOpen ? "bg-white/[0.08] text-white/50" : "bg-black/[0.04] text-ink-3"} ${T}`}>Today</span>
          <span className="text-[9px] px-2 py-1 rounded-md bg-sds-accent text-white font-medium leading-none">+ New Load</span>
        </div>
      </div>

      <div className={`grid grid-cols-4 border-b ${isOpen ? "border-white/[0.06]" : "border-black/[0.06]"} ${T}`}>
        {[
          { n: "18", l: "Active", color: isOpen ? "text-white" : "text-ink" },
          { n: "15", l: "Assigned", color: isOpen ? "text-blue-400" : "text-blue-600" },
          { n: "9", l: "En Route", color: "text-sds-accent" },
          { n: "3", l: "Delivered", color: isOpen ? "text-emerald-400" : "text-emerald-600" },
        ].map((m, i) => (
          <div key={i} className={`px-3 py-2.5 ${i < 3 ? `border-r ${isOpen ? "border-white/[0.06]" : "border-black/[0.06]"} ${T}` : ""}`}>
            <p className={`text-[16px] font-semibold leading-none tracking-tight ${m.color}`}>{m.n}</p>
            <p className={`text-[8px] mt-1 leading-none font-medium ${isOpen ? "text-white/40" : "text-ink-3"} ${T}`}>{m.l}</p>
          </div>
        ))}
      </div>

      <div>
        {[
          { route: "Ottawa → Vancouver", status: "In Transit", statusColor: "bg-blue-500", driver: "RS", pct: 62 },
          { route: "Mississauga → Toronto", status: "Pickup Ready", statusColor: "bg-sds-accent", driver: "CB", pct: 0 },
          { route: "Sudbury → Windsor", status: "Dispatched", statusColor: "bg-emerald-500", driver: "JM", pct: 28 },
          { route: "Thunder Bay → Calgary", status: "Docs Pending", statusColor: "bg-amber-400", driver: "—", pct: 0 },
        ].map((load, i) => (
          <div key={i} className={`flex items-center gap-3 px-4 py-2.5 ${i < 3 ? `border-b ${isOpen ? "border-white/[0.04]" : "border-black/[0.04]"} ${T}` : ""}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${isOpen ? "bg-white/[0.08]" : "bg-black/[0.04]"} ${T}`}>
              <span className={`text-[8px] font-semibold ${isOpen ? "text-white/50" : "text-ink-3"} ${T}`}>{load.driver}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-[10px] font-medium leading-none truncate ${isOpen ? "text-white" : "text-ink"} ${T}`}>{load.route}</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className={`w-[5px] h-[5px] rounded-full ${load.statusColor} shrink-0`} />
                <span className={`text-[8px] leading-none ${isOpen ? "text-white/40" : "text-ink-3"} ${T}`}>{load.status}</span>
              </div>
            </div>
            <div className="w-16 shrink-0">
              <div className={`h-1 rounded-full overflow-hidden ${isOpen ? "bg-white/[0.08]" : "bg-black/[0.04]"} ${T}`}>
                <div className={`h-full rounded-full ${load.statusColor}`} style={{ width: `${load.pct}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Last Mile: Live Route Tracker ── */

function PreviewLastMile({ isOpen }: { isOpen: boolean }) {
  return (
    <div className={`h-full rounded-2xl overflow-hidden select-none border ${isOpen ? "bg-[#151820] border-white/[0.06]" : "bg-white border-black/[0.06]"} ${T}`} style={{ fontSize: 0 }}>
      <div className="flex h-full">
        <div className={`flex-1 min-w-0 relative overflow-hidden ${isOpen ? "bg-[#1c2030]" : "bg-[#f0ece0]"} ${T}`}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="mg-light" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0H0v40" fill="none" stroke="black" strokeWidth="0.3" opacity="0.06"/>
              </pattern>
              <pattern id="mg-dark" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0H0v40" fill="none" stroke="white" strokeWidth="0.3" opacity="0.06"/>
              </pattern>
              <filter id="routeGlow"><feGaussianBlur stdDeviation="4"/></filter>
            </defs>
            <rect width="300" height="300" fill="url(#mg-light)" className={`${isOpen ? "opacity-0" : "opacity-100"} ${T}`}/>
            <rect width="300" height="300" fill="url(#mg-dark)" className={`${isOpen ? "opacity-100" : "opacity-0"} ${T}`}/>
            <g className={`${isOpen ? "opacity-0" : "opacity-100"} ${T}`}>
              <path d="M0,200 Q80,180 140,120 T250,60" fill="none" stroke="black" strokeWidth="0.8" opacity="0.06"/>
              <path d="M60,300 Q100,200 160,150 T280,100" fill="none" stroke="black" strokeWidth="0.6" opacity="0.04"/>
            </g>
            <g className={`${isOpen ? "opacity-100" : "opacity-0"} ${T}`}>
              <path d="M0,200 Q80,180 140,120 T250,60" fill="none" stroke="white" strokeWidth="0.8" opacity="0.08"/>
              <path d="M60,300 Q100,200 160,150 T280,100" fill="none" stroke="white" strokeWidth="0.6" opacity="0.06"/>
            </g>
            <path d="M50,260 C80,220 100,190 130,155 S180,100 210,80 S260,50 280,30" fill="none" stroke="oklch(70% 0.165 55)" strokeWidth="8" strokeLinecap="round" opacity="0.15" filter="url(#routeGlow)"/>
            <path d="M50,260 C80,220 100,190 130,155 S180,100 210,80 S260,50 280,30" fill="none" stroke="oklch(70% 0.165 55)" strokeWidth="2.5" strokeLinecap="round" opacity="0.9"/>
          </svg>

          <div className="absolute top-[75%] left-[16%] flex flex-col items-center gap-0.5">
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_8px_rgba(16,185,129,0.3)]">
              <svg width="10" height="10" viewBox="0 0 16 16"><path d="M13.5 4.5l-7 7L3 8" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className={`text-[7px] font-semibold leading-none ${isOpen ? "text-emerald-400" : "text-emerald-700"} ${T}`}>Picked up</span>
          </div>
          <div className="absolute top-[45%] left-[40%] flex flex-col items-center gap-0.5">
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_8px_rgba(16,185,129,0.3)]">
              <svg width="10" height="10" viewBox="0 0 16 16"><path d="M13.5 4.5l-7 7L3 8" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className={`text-[7px] font-semibold leading-none ${isOpen ? "text-emerald-400" : "text-emerald-700"} ${T}`}>Stop 1</span>
          </div>
          <div className="absolute top-[30%] left-[62%] flex flex-col items-center gap-0.5">
            <div className="relative">
              <div className="absolute inset-0 w-5 h-5 rounded-full bg-sds-accent animate-ping opacity-30" />
              <div className="relative w-5 h-5 rounded-full bg-sds-accent flex items-center justify-center shadow-[0_0_12px_rgba(217,155,50,0.4)]">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
            </div>
            <span className="text-[7px] font-semibold text-sds-accent leading-none">Stop 2</span>
          </div>
          <div className="absolute top-[14%] left-[82%] flex flex-col items-center gap-0.5">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isOpen ? "bg-white/10 border-white/20" : "bg-black/[0.06] border-black/[0.08]"} border ${T}`}>
              <div className={`w-1 h-1 rounded-full ${isOpen ? "bg-white/40" : "bg-black/20"} ${T}`} />
            </div>
            <span className={`text-[7px] font-medium leading-none ${isOpen ? "text-white/30" : "text-ink-3"} ${T}`}>Stop 3</span>
          </div>
          <div className="absolute top-[35%] left-[55%]">
            <div className="w-6 h-6 rounded-lg bg-sds-accent shadow-[0_0_16px_rgba(217,155,50,0.35)] flex items-center justify-center -rotate-[35deg]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L12 22M12 2l6 8H6l6-8z"/>
              </svg>
            </div>
          </div>
          <div className={`absolute top-0 left-0 right-0 p-2.5 flex items-center justify-between bg-gradient-to-b ${isOpen ? "from-[#151820]" : "from-[#f0ece0]"} to-transparent ${T}`}>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
              <span className={`text-[9px] font-medium leading-none ${isOpen ? "text-white/70" : "text-ink-2"} ${T}`}>3 drivers active</span>
            </div>
            <span className={`text-[9px] px-2 py-1 rounded-md font-medium leading-none ${isOpen ? "bg-white/[0.08] text-white/50" : "bg-black/[0.05] text-ink-3"} ${T}`}>Live</span>
          </div>
        </div>

        <div className={`w-[120px] shrink-0 p-3 hidden sm:flex flex-col gap-3 border-l ${isOpen ? "border-white/[0.06] bg-[#151820]" : "border-black/[0.06] bg-white/60"} ${T}`}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sds-accent/30 to-sds-accent/10 flex items-center justify-center">
                <span className="text-[9px] font-bold text-sds-accent">M</span>
              </div>
              <div>
                <p className={`text-[9px] font-semibold leading-none ${isOpen ? "text-white" : "text-ink"} ${T}`}>Michael R.</p>
                <p className={`text-[7px] leading-none mt-0.5 ${isOpen ? "text-white/30" : "text-ink-3"} ${T}`}>Route #402</p>
              </div>
            </div>
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border ${isOpen ? "border-emerald-500/15" : "border-emerald-500/20"} ${T}`}>
              <div className="w-1 h-1 rounded-full bg-emerald-500" />
              <span className={`text-[7px] font-medium leading-none ${isOpen ? "text-emerald-400" : "text-emerald-600"}`}>On time — ETA 12:45</span>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <p className={`text-[7px] uppercase tracking-[0.08em] font-semibold mb-2 leading-none ${isOpen ? "text-white/20" : "text-ink-4"} ${T}`}>Stops</p>
            <div className="space-y-1">
              {[
                { name: "Warehouse", time: "09:12", done: true },
                { name: "2841 Oak Ave", time: "10:35", done: true },
                { name: "782 Industrial", time: "11:20", active: true },
                { name: "1900 Commerce", time: "12:45", done: false },
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="flex flex-col items-center pt-[3px]">
                    <div className={`w-[6px] h-[6px] rounded-full shrink-0 ${
                      s.done ? "bg-emerald-500" : s.active ? "bg-sds-accent ring-2 ring-sds-accent/30" : `${isOpen ? "bg-white/10 border-white/20" : "bg-black/[0.08] border-black/10"} border ${T}`
                    }`} />
                    {i < 3 && <div className={`w-px h-3 mt-0.5 ${s.done ? "bg-emerald-500/30" : `${isOpen ? "bg-white/[0.06]" : "bg-black/[0.06]"} ${T}`}`} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-[8px] leading-none truncate ${
                      s.active ? "text-sds-accent font-semibold" : s.done ? `${isOpen ? "text-white/50" : "text-ink-3"} ${T}` : `${isOpen ? "text-white/25" : "text-ink-4"} ${T}`
                    }`}>{s.name}</p>
                    <p className={`text-[7px] leading-none mt-0.5 ${s.active ? "text-sds-accent/60" : `${isOpen ? "text-white/15" : "text-ink-4/60"} ${T}`}`}>{s.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`rounded-md p-2 border ${isOpen ? "bg-white/[0.03] border-white/[0.05]" : "bg-black/[0.02] border-black/[0.04]"} ${T}`}>
            <p className={`text-[7px] uppercase tracking-[0.06em] font-semibold leading-none ${isOpen ? "text-white/25" : "text-ink-4"} ${T}`}>Last POD</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="w-5 h-5 rounded bg-emerald-500/10 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="oklch(62% 0.14 150)" strokeWidth="1.5" strokeLinecap="round"><path d="M3 8.5l3 3 7-7"/></svg>
              </div>
              <div>
                <p className={`text-[7px] leading-none ${isOpen ? "text-white/50" : "text-ink-3"} ${T}`}>Signed</p>
                <p className={`text-[6px] leading-none mt-0.5 ${isOpen ? "text-white/20" : "text-ink-4"} ${T}`}>10:34 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PREVIEWS: Record<string, (props: { isOpen: boolean }) => React.JSX.Element> = {
  trucking: PreviewTrucking,
  "last-mile": PreviewLastMile,
};

/* ── Industry Card ── */

function IndustryCard({
  id,
  title,
  tag,
  desc,
  points,
  index,
  isOpen,
  onToggle,
}: (typeof INDUSTRIES)[number] & { index: number; isOpen: boolean; onToggle: () => void }) {
  const Preview = PREVIEWS[id];

  return (
    <Reveal delay={index * 90} variant="scale" className="min-h-0 h-full">
      <article
        className={`industry-card group flex flex-col min-h-0 h-full rounded-[20px] overflow-hidden transition-all duration-500 ease-out cursor-pointer bg-bg-card shadow-[0_2px_24px_-4px_oklch(20%_0.02_60/0.08),0_0_0_1px_oklch(20%_0.01_60/0.04)] ${
          isOpen
            ? "bg-ink shadow-[0_12px_40px_-8px_oklch(10%_0.01_60/0.45)] -translate-y-1.5"
            : "hover:-translate-y-1.5 hover:bg-bg-soft hover:shadow-[0_8px_28px_-6px_oklch(20%_0.02_60/0.12)]"
        }`}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); } }}
      >
        <div className="industry-card__preview p-5 pb-0 min-h-0 hidden sm:block">
          <Preview isOpen={isOpen} />
        </div>
        <div className="flex flex-col flex-1 p-6 pt-5 gap-4 min-h-0">
          <div>
            <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-sds-accent">
              {tag}
            </p>
            <h3
              className={`mt-2 font-semibold tracking-tight ${T} ${isOpen ? "text-white" : "text-ink"}`}
              style={{ fontSize: "var(--sz-h3)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
            >
              {title}
            </h3>
            <p className={`mt-2 text-[15px] leading-relaxed ${T} ${isOpen ? "text-white/60" : "text-ink-2"}`}>{desc}</p>
          </div>
          <ul className="space-y-2">
            {points.map((point) => (
              <li key={point} className={`flex items-center gap-2.5 text-[14px] ${T} ${isOpen ? "text-white/55" : "text-ink-2"}`}>
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

/* ── Main Section ── */

export function Industries({
  activeId,
  onToggle,
}: {
  activeId: string | null;
  onToggle: (id: string) => void;
}) {
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
            <IndustryCard
              key={industry.id}
              {...industry}
              index={i}
              isOpen={activeId === industry.id}
              onToggle={() => onToggle(industry.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
