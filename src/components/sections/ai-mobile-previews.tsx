/* Mobile-optimized portrait UI previews for the AI deep-dive carousel */

const B = "border border-line";
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-bg-card rounded-xl ${B} overflow-hidden ${className}`}>{children}</div>
);

function StatusBadge({ label, color }: { label: string; color: string }) {
  const c: Record<string, string> = {
    green: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    blue: "bg-blue-100 text-blue-700",
    red: "bg-red-100 text-red-700",
    gray: "bg-neutral-100 text-neutral-500",
    purple: "bg-purple-100 text-purple-600",
  };
  return <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${c[color] ?? c.gray}`}>{label}</span>;
}

/* ── Trucking ── */

export function MobileDashboard() {
  return (
    <div className="h-full flex flex-col gap-2.5 text-[0px]">
      <Card>
        <div className="px-3 pt-3 pb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-ink">Live Operations</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" style={{ animation: "pulse-dot 1.8s ease-out infinite" }} />
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { v: "9", l: "On Road" },
              { v: "5", l: "Pickups" },
              { v: "2", l: "Alerts", alert: true },
              { v: "22", l: "SLA Risk", alert: true },
            ].map((s) => (
              <div key={s.l} className="bg-bg-soft rounded-lg py-1.5 text-center border border-line">
                <div className={`text-[13px] font-bold ${s.alert ? "text-red-600" : "text-ink"}`}>{s.v}</div>
                <div className="text-[6px] text-ink-3 uppercase tracking-wider mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <Card>
        <div className="px-3 py-2.5">
          <div className="text-[9px] font-medium text-ink-3 mb-1.5">Load Pipeline</div>
          <div className="flex gap-1">
            {[
              { l: "New", n: 2, c: "bg-neutral-200" },
              { l: "Initiated", n: 1, c: "bg-blue-200" },
              { l: "Negotiating", n: 1, c: "bg-amber-200" },
              { l: "Approved", n: 1, c: "bg-emerald-200" },
              { l: "Payment", n: 1, c: "bg-purple-200" },
            ].map((s) => (
              <div key={s.l} className="flex-1 text-center">
                <div className={`${s.c} rounded py-1.5 text-[11px] font-bold text-ink`}>{s.n}</div>
                <div className="text-[6px] text-ink-3 mt-0.5 truncate">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <Card>
        <div className="px-3 py-2.5 flex items-center gap-2 bg-red-50">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
          <span className="text-[9px] text-red-700 font-medium">2 stuck loads — same stage for 48h+</span>
        </div>
      </Card>
      <Card className="flex-1">
        <div className="px-3 py-2.5">
          <div className="text-[9px] font-medium text-ink-3 mb-2">Critical Messages</div>
          {[
            { name: "Danielle F.", msg: "Convoy delayed — waiting for loading bay", time: "4m", tag: "Critical" },
            { name: "orders@north.ca", msg: "Rate confirmation needed for #A1BC07", time: "12m", tag: "Pending" },
          ].map((m) => (
            <div key={m.name} className="flex items-start gap-2 py-1.5 border-b border-line last:border-0">
              <div className="w-5 h-5 rounded-full bg-sds-accent/10 flex items-center justify-center shrink-0">
                <span className="text-[7px] font-bold text-sds-accent">{m.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-semibold text-ink truncate">{m.name}</span>
                  <span className="text-[7px] text-ink-3 shrink-0 ml-1">{m.time}</span>
                </div>
                <div className="text-[8px] text-ink-3 truncate">{m.msg}</div>
                <span className={`text-[6px] font-semibold px-1 py-0.5 rounded mt-0.5 inline-block ${m.tag === "Critical" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>{m.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function MobileLeads() {
  const leads = [
    { id: "CVL-206", co: "NorthEnd Industrial", route: "Prince George → Windsor", stage: "Agreement", color: "amber", rate: "$7,620", hot: true },
    { id: "CVL-205", co: "Ridgeline Supply", route: "Sherbrooke → Lethbridge", stage: "Approved", color: "green", rate: "$3,000", hot: true },
    { id: "CVL-204", co: "Canadian Fuel", route: "Regina → Abbotsford", stage: "Negotiation", color: "blue", rate: "$3,300", hot: true },
    { id: "CVL-203", co: "Medicraft Pharma", route: "Brampton → Sudbury", stage: "Initiated", color: "amber", rate: "$5,900", hot: false },
  ];
  return (
    <div className="h-full flex flex-col gap-2.5 text-[0px]">
      <Card>
        <div className="px-3 pt-3 pb-2">
          <div className="text-[10px] font-semibold text-ink mb-2">Sales Pipeline</div>
          <div className="flex gap-1.5">
            {[{ l: "Total", v: "6" }, { l: "Negotiating", v: "1" }, { l: "Approved", v: "1" }].map((s) => (
              <span key={s.l} className="text-[8px] font-mono text-ink-3 bg-bg-soft border border-line rounded px-1.5 py-0.5">{s.l}: {s.v}</span>
            ))}
          </div>
        </div>
      </Card>
      <Card className="flex-1">
        <div className="divide-y divide-line">
          {leads.map((l) => (
            <div key={l.id} className="px-3 py-2.5 flex items-center gap-2.5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-ink">{l.id}</span>
                  {l.hot && <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />}
                </div>
                <div className="text-[8px] text-ink-3 truncate">{l.co}</div>
                <div className="text-[7px] text-ink-3 truncate mt-0.5">{l.route}</div>
              </div>
              <div className="text-right shrink-0 flex flex-col items-end gap-1">
                <StatusBadge label={l.stage} color={l.color} />
                <span className="text-[10px] font-mono font-semibold text-ink">{l.rate}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function MobileLoads() {
  const loads = [
    { id: "#A1BC07", route: "Ottawa → Vancouver", stage: "In Transit", color: "blue", driver: "Dale F.", pct: 62 },
    { id: "#AA41FF", route: "Mississauga → Toronto", stage: "Pickup Ready", color: "amber", driver: "Ryan N.", pct: 0 },
    { id: "#D26223", route: "Sudbury → Windsor", stage: "Dispatched", color: "green", driver: "Jamie M.", pct: 28 },
    { id: "#D26222", route: "Thunder Bay → Calgary", stage: "Docs Pending", color: "amber", driver: "—", pct: 0 },
  ];
  return (
    <div className="h-full flex flex-col gap-2.5 text-[0px]">
      <Card>
        <div className="px-3 pt-3 pb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-ink">Active Loads</span>
            <div className="flex gap-1.5">
              {[{ l: "Active", v: "18" }, { l: "On Road", v: "9" }].map((s) => (
                <span key={s.l} className="text-[8px] font-mono text-ink-3 bg-bg-soft border border-line rounded px-1.5 py-0.5">{s.l}: {s.v}</span>
              ))}
            </div>
          </div>
        </div>
      </Card>
      <Card className="flex-1">
        <div className="divide-y divide-line">
          {loads.map((l) => (
            <div key={l.id} className="px-3 py-2.5">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-ink font-mono">{l.id}</span>
                  <StatusBadge label={l.stage} color={l.color} />
                </div>
                <span className="text-[9px] text-ink-3">{l.driver}</span>
              </div>
              <div className="text-[9px] text-ink-2">{l.route}</div>
              {l.pct > 0 && (
                <div className="mt-1.5 h-1 rounded-full bg-bg-soft overflow-hidden">
                  <div className="h-full rounded-full bg-blue-500" style={{ width: `${l.pct}%` }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function MobileTracking() {
  return (
    <div className="h-full flex flex-col gap-2.5 text-[0px]">
      <Card className="flex-1">
        <div className="h-[55%] bg-neutral-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 60% 40%, #1a3a2a 0%, #111 50%, #0a0a0a 100%)" }} />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
            <path d="M30,170 Q70,110 100,80 T160,20" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="4,2" />
            <circle cx="30" cy="170" r="5" fill="#22c55e" />
            <circle cx="100" cy="80" r="4" fill="#3b82f6" opacity="0.7" />
            <circle cx="160" cy="20" r="5" fill="#ef4444" />
          </svg>
          <div className="absolute bottom-2 left-2 bg-black/60 rounded px-2 py-1">
            <span className="text-[8px] text-white/70 font-mono">3 active routes</span>
          </div>
        </div>
        <div className="divide-y divide-line">
          {[
            { id: "#A1BC07", driver: "Dale F.", status: "In Transit", color: "bg-blue-500", eta: "2h 15m" },
            { id: "#AA41FF", driver: "Ryan N.", status: "At Pickup", color: "bg-amber-500", eta: "—" },
            { id: "#D26223", driver: "Jamie M.", status: "En Route", color: "bg-emerald-500", eta: "45m" },
          ].map((l) => (
            <div key={l.id} className="px-3 py-2 flex items-center gap-2.5">
              <span className={`w-2 h-2 rounded-full ${l.color} shrink-0`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-semibold text-ink font-mono">{l.id}</span>
                  <span className="text-[8px] text-ink-3">{l.driver}</span>
                </div>
                <span className="text-[8px] text-ink-3">{l.status}</span>
              </div>
              <span className="text-[9px] font-mono text-ink-2 shrink-0">ETA {l.eta}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function MobileComms() {
  return (
    <div className="h-full flex flex-col gap-2.5 text-[0px]">
      <Card>
        <div className="px-3 pt-3 pb-2 flex items-center justify-between">
          <span className="text-[10px] font-semibold text-ink">Inbox</span>
          <div className="flex gap-1.5">
            <span className="text-[8px] font-mono text-red-600 font-bold">Critical: 2</span>
            <span className="text-[8px] font-mono text-ink-3">Pending: 8</span>
          </div>
        </div>
      </Card>
      <Card className="flex-1">
        <div className="divide-y divide-line">
          {[
            { name: "Derek Chamberlain", msg: "Arrived at gas, waiting for loading bay to open.", time: "1m", unread: true },
            { name: "Danielle Fontaine", msg: "Still waiting. Convoy should start in about 45 min…", time: "4m", tag: "Critical" },
            { name: "orders@northind.ca", msg: "Hi there, are you still at your previous…", time: "12m", tag: "Pending" },
            { name: "Isabelle Paradis", msg: "Arrived at loads. Picking up in about 30 min…", time: "18m" },
          ].map((c) => (
            <div key={c.name} className={`px-3 py-2.5 ${c.unread ? "bg-blue-50/50" : ""}`}>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-semibold text-ink truncate">{c.name}</span>
                <span className="text-[7px] text-ink-3 shrink-0 ml-1">{c.time}</span>
              </div>
              <div className="text-[8px] text-ink-3 truncate mt-0.5">{c.msg}</div>
              {c.tag && <span className={`text-[7px] font-semibold px-1 py-0.5 rounded mt-1 inline-block ${c.tag === "Critical" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>{c.tag}</span>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function MobileScheduling() {
  const drivers = ["Dale F.", "Ryan N.", "Jamie M."];
  const hours = ["8a", "9a", "10a", "11a", "12p", "1p", "2p"];
  return (
    <div className="h-full flex flex-col gap-2.5 text-[0px]">
      <Card>
        <div className="px-3 pt-3 pb-2 flex items-center justify-between">
          <span className="text-[10px] font-semibold text-ink">Today&apos;s Schedule</span>
          <span className="text-[8px] text-ink-3 font-mono">3 drivers · 7 stops</span>
        </div>
      </Card>
      <Card className="flex-1 overflow-hidden">
        <div className="px-3 pt-2">
          {/* Time header */}
          <div className="flex ml-[52px]">
            {hours.map((h) => (
              <div key={h} className="flex-1 text-[7px] text-ink-3 text-center font-mono">{h}</div>
            ))}
          </div>
          {/* Driver rows */}
          {drivers.map((d, di) => (
            <div key={d} className="flex items-center py-2 border-b border-line last:border-0">
              <span className="text-[8px] font-medium text-ink w-[52px] shrink-0 truncate">{d}</span>
              <div className="flex-1 relative h-5">
                <div className="absolute inset-0 flex">
                  {hours.map((h) => <div key={h} className="flex-1 border-l border-line/50" />)}
                </div>
                {/* Blocks */}
                {di === 0 && <>
                  <div className="absolute top-0.5 h-4 rounded bg-blue-400/30 border border-blue-400/50" style={{ left: "5%", width: "25%" }}>
                    <span className="text-[6px] text-blue-700 font-medium px-1 truncate block leading-[16px]">Pickup</span>
                  </div>
                  <div className="absolute top-0.5 h-4 rounded bg-emerald-400/30 border border-emerald-400/50" style={{ left: "55%", width: "30%" }}>
                    <span className="text-[6px] text-emerald-700 font-medium px-1 truncate block leading-[16px]">Delivery</span>
                  </div>
                </>}
                {di === 1 && <div className="absolute top-0.5 h-4 rounded bg-amber-400/30 border border-amber-400/50" style={{ left: "20%", width: "40%" }}>
                  <span className="text-[6px] text-amber-700 font-medium px-1 truncate block leading-[16px]">In Transit</span>
                </div>}
                {di === 2 && <>
                  <div className="absolute top-0.5 h-4 rounded bg-emerald-400/30 border border-emerald-400/50" style={{ left: "0%", width: "18%" }}>
                    <span className="text-[6px] text-emerald-700 font-medium px-1 truncate block leading-[16px]">Drop</span>
                  </div>
                  <div className="absolute top-0.5 h-4 rounded bg-blue-400/30 border border-blue-400/50" style={{ left: "35%", width: "22%" }}>
                    <span className="text-[6px] text-blue-700 font-medium px-1 truncate block leading-[16px]">Pickup</span>
                  </div>
                </>}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ── Last Mile ── */

export function MobileLMOps() {
  return (
    <div className="h-full flex flex-col gap-2.5 text-[0px]">
      <Card>
        <div className="px-3 pt-3 pb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-ink">Delivery Operations</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" style={{ animation: "pulse-dot 1.8s ease-out infinite" }} />
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { v: "24", l: "Active" },
              { v: "18", l: "On Route" },
              { v: "3", l: "Delayed", alert: true },
              { v: "96%", l: "On Time" },
            ].map((s) => (
              <div key={s.l} className="bg-bg-soft rounded-lg py-1.5 text-center border border-line">
                <div className={`text-[13px] font-bold ${s.alert ? "text-red-600" : "text-ink"}`}>{s.v}</div>
                <div className="text-[6px] text-ink-3 uppercase tracking-wider mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <Card className="flex-1">
        <div className="px-3 py-2.5">
          <div className="text-[9px] font-medium text-ink-3 mb-2">Driver Status</div>
          {[
            { name: "Michael R.", route: "#402", stops: "2/4", status: "On Route", color: "bg-emerald-500" },
            { name: "Sarah L.", route: "#403", stops: "3/6", status: "Delivering", color: "bg-blue-500" },
            { name: "Chris P.", route: "#404", stops: "0/5", status: "Starting", color: "bg-amber-500" },
          ].map((d) => (
            <div key={d.name} className="flex items-center gap-2.5 py-2 border-b border-line last:border-0">
              <span className={`w-2 h-2 rounded-full ${d.color} shrink-0`} />
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-semibold text-ink">{d.name}</span>
                <div className="text-[8px] text-ink-3">Route {d.route} · {d.stops} stops</div>
              </div>
              <span className="text-[8px] text-ink-3 shrink-0">{d.status}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function MobileLMMap() {
  return (
    <div className="h-full flex flex-col gap-2.5 text-[0px]">
      <Card className="flex-1">
        <div className="h-[60%] bg-neutral-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 50% 50%, #1a3a2a 0%, #111 50%, #0a0a0a 100%)" }} />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
            {/* Routes */}
            <path d="M40,160 Q80,100 120,80 T170,40" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.6" />
            <path d="M30,140 Q90,120 130,60 T180,30" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />
            <path d="M60,170 Q100,130 140,100 T160,60" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.6" />
            {/* Driver dots */}
            <circle cx="80" cy="100" r="5" fill="#22c55e" stroke="white" strokeWidth="1.5" />
            <circle cx="120" cy="75" r="5" fill="#3b82f6" stroke="white" strokeWidth="1.5" />
            <circle cx="100" cy="130" r="5" fill="#f59e0b" stroke="white" strokeWidth="1.5" />
          </svg>
          <div className="absolute top-2 left-2 bg-black/60 rounded px-2 py-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[8px] text-white/70 font-mono">3 drivers live</span>
          </div>
        </div>
        <div className="divide-y divide-line">
          {[
            { name: "Michael R.", status: "On time", color: "text-emerald-600", eta: "12:45" },
            { name: "Sarah L.", status: "2 min late", color: "text-amber-600", eta: "13:10" },
            { name: "Chris P.", status: "On time", color: "text-emerald-600", eta: "14:00" },
          ].map((d) => (
            <div key={d.name} className="px-3 py-2 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-semibold text-ink">{d.name}</span>
                <span className={`text-[8px] ml-1.5 ${d.color}`}>{d.status}</span>
              </div>
              <span className="text-[9px] font-mono text-ink-3">ETA {d.eta}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function MobileLMRoutes() {
  const routes = [
    { id: "R-402", stops: "4 stops", driver: "Michael R.", status: "In Progress", color: "blue" },
    { id: "R-403", stops: "6 stops", driver: "Sarah L.", status: "In Progress", color: "blue" },
    { id: "R-404", stops: "5 stops", driver: "Chris P.", status: "Not Started", color: "gray" },
    { id: "R-405", stops: "3 stops", driver: "Unassigned", status: "Pending", color: "amber" },
  ];
  return (
    <div className="h-full flex flex-col gap-2.5 text-[0px]">
      <Card>
        <div className="px-3 pt-3 pb-2 flex items-center justify-between">
          <span className="text-[10px] font-semibold text-ink">Routes Today</span>
          <span className="text-[8px] font-mono text-ink-3">4 routes · 18 stops</span>
        </div>
      </Card>
      <Card className="flex-1">
        <div className="divide-y divide-line">
          {routes.map((r) => (
            <div key={r.id} className="px-3 py-2.5 flex items-center gap-2.5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-ink font-mono">{r.id}</span>
                  <StatusBadge label={r.status} color={r.color} />
                </div>
                <div className="text-[8px] text-ink-3 mt-0.5">{r.driver} · {r.stops}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function MobileLMAssign() {
  return (
    <div className="h-full flex flex-col gap-2.5 text-[0px]">
      <Card>
        <div className="px-3 pt-3 pb-2">
          <div className="text-[10px] font-semibold text-ink mb-1">Assign Driver</div>
          <div className="text-[8px] text-ink-3">Route #405 · 3 stops · Downtown zone</div>
        </div>
      </Card>
      <Card className="flex-1">
        <div className="px-3 pt-2 pb-1">
          <div className="text-[8px] text-ink-3 uppercase tracking-wider font-medium mb-1.5">AI Recommendations</div>
        </div>
        <div className="divide-y divide-line">
          {[
            { name: "Michael R.", score: "98%", reason: "Closest · 2.1 km away", hos: "6h left", best: true },
            { name: "Sarah L.", score: "87%", reason: "Same zone · finishing soon", hos: "4h left", best: false },
            { name: "David K.", score: "72%", reason: "Available · different zone", hos: "7h left", best: false },
          ].map((d) => (
            <div key={d.name} className={`px-3 py-2.5 ${d.best ? "bg-sds-accent/5" : ""}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-sds-accent/10 flex items-center justify-center">
                    <span className="text-[8px] font-bold text-sds-accent">{d.name[0]}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-semibold text-ink">{d.name}</span>
                    {d.best && <span className="text-[7px] ml-1 text-sds-accent font-medium">Best match</span>}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-sds-accent">{d.score}</span>
              </div>
              <div className="text-[8px] text-ink-3 mt-1 ml-8">{d.reason} · HOS: {d.hos}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function MobileLMComms() {
  return (
    <div className="h-full flex flex-col gap-2.5 text-[0px]">
      <Card>
        <div className="px-3 pt-3 pb-2 flex items-center justify-between">
          <span className="text-[10px] font-semibold text-ink">Messages</span>
          <div className="flex gap-1.5">
            <span className="text-[8px] font-mono text-red-600 font-bold">Urgent: 1</span>
            <span className="text-[8px] font-mono text-ink-3">Total: 5</span>
          </div>
        </div>
      </Card>
      <Card className="flex-1">
        <div className="divide-y divide-line">
          {[
            { name: "Michael R.", msg: "Customer not at location, calling now…", time: "2m", tag: "Urgent", ch: "SMS" },
            { name: "Sarah L.", msg: "All 3 deliveries done for downtown route", time: "8m", ch: "App" },
            { name: "Chris P.", msg: "Running 5 min behind, traffic on Main St", time: "15m", ch: "WhatsApp" },
            { name: "support@client.com", msg: "Delivery window changed to 2-4 PM", time: "22m", ch: "Email" },
          ].map((c) => (
            <div key={c.name} className="px-3 py-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-semibold text-ink truncate">{c.name}</span>
                  <span className="text-[7px] text-ink-4 bg-bg-soft rounded px-1 py-0.5">{c.ch}</span>
                </div>
                <span className="text-[7px] text-ink-3 shrink-0">{c.time}</span>
              </div>
              <div className="text-[8px] text-ink-3 truncate mt-0.5">{c.msg}</div>
              {c.tag && <span className="text-[7px] font-semibold px-1 py-0.5 rounded mt-1 inline-block bg-red-100 text-red-700">{c.tag}</span>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ── Lookup map ── */

export const MOBILE_PREVIEWS: Record<string, () => React.JSX.Element> = {
  dashboard: MobileDashboard,
  leads: MobileLeads,
  loads: MobileLoads,
  tracking: MobileTracking,
  comms: MobileComms,
  scheduling: MobileScheduling,
  "lm-ops-dashboard": MobileLMOps,
  "lm-live-map": MobileLMMap,
  "lm-route-mgmt": MobileLMRoutes,
  "lm-assign": MobileLMAssign,
  "lm-comms": MobileLMComms,
};
