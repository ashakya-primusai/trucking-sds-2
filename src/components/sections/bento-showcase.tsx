"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { ScrollHighlightHeading } from "@/components/ui/scroll-highlight-heading";

const BENTO_HEADLINE_LINES = [
  ["How", "we", "solved", "it."],
] as const;

/* ── Mini UI components ──────────────────────────────────────────── */

function StatusBadge({ label, color }: { label: string; color: "green" | "amber" | "blue" | "red" | "gray" }) {
  const colors = {
    green: "bg-emerald-100 text-emerald-700 border-emerald-200",
    amber: "bg-amber-100 text-amber-700 border-amber-200",
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    red: "bg-red-100 text-red-700 border-red-200",
    gray: "bg-neutral-100 text-neutral-500 border-neutral-200",
  };
  return (
    <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded border ${colors[color]}`}>
      {label}
    </span>
  );
}

function PriorityDot({ level }: { level: "high" | "normal" }) {
  return (
    <span
      className="w-2 h-2 rounded-full shrink-0"
      style={{ background: level === "high" ? "var(--bad)" : "var(--sds-accent)" }}
    />
  );
}


/* ── Feature card previews (matching real product screens) ───────── */

/** Dashboard — Live Operations overview with load pipeline */
function PreviewDashboard() {
  return (
    <div className="h-full bg-bg-card rounded-xl p-4 flex flex-col gap-3 border border-line overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-mono text-[8px] text-ink-3 uppercase tracking-widest">Live Operations</span>
          <div className="text-[13px] font-semibold text-ink mt-0.5">Here&apos;s what&apos;s moving today.</div>
        </div>
        <span className="w-1.5 h-1.5 rounded-full bg-ok" style={{ animation: "pulse-dot 1.8s ease-out infinite" }} />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-1.5 text-center">
        {[
          { label: "On the Road", value: "9" },
          { label: "Pickups Today", value: "5" },
          { label: "Critical Alerts", value: "2", alert: true },
          { label: "SLA at Risk", value: "22", alert: true },
        ].map((s) => (
          <div key={s.label} className="bg-bg-soft rounded-lg py-2 px-1 border border-line">
            <div className={`text-[14px] font-bold ${s.alert ? "text-red-600" : "text-ink"}`}>{s.value}</div>
            <div className="text-[7px] text-ink-3 uppercase tracking-wider mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Load Pipeline */}
      <div>
        <div className="text-[9px] font-medium text-ink-3 mb-1.5">Load Pipeline</div>
        <div className="flex gap-1">
          {[
            { label: "Discovered", count: 2, color: "bg-neutral-200" },
            { label: "Initiated", count: 1, color: "bg-blue-200" },
            { label: "Negotiating", count: 1, color: "bg-amber-200" },
            { label: "Approved", count: 1, color: "bg-emerald-200" },
            { label: "Pmt Pending", count: 1, color: "bg-purple-200" },
          ].map((s) => (
            <div key={s.label} className="flex-1 text-center">
              <div className={`${s.color} rounded py-1.5 text-[11px] font-bold text-ink`}>{s.count}</div>
              <div className="text-[6px] text-ink-3 mt-0.5 truncate">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stuck loads alert */}
      <div className="mt-auto bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
        <span className="text-[9px] text-red-700 font-medium">2 stuck loads in same stage for extended period</span>
      </div>
    </div>
  );
}

/** Load Management — Table of loads with routes, stages, rates */
function PreviewLoadManagement() {
  const loads = [
    { id: "#A1BC07", origin: "Ottawa, ON", stage: "Docs Pending", stageBg: "amber", rate: "", driver: "" },
    { id: "#AA41FF", origin: "Mississauga, ON", stage: "In Transit", stageBg: "blue", rate: "", driver: "Ryan Nobbs" },
    { id: "#D26223", origin: "Sudbury, ON", stage: "Pickup Scheduled", stageBg: "green", rate: "$5,632", driver: "" },
    { id: "#D26222", origin: "Thunder Bay, ON", stage: "Closed", stageBg: "gray", rate: "$7,095", driver: "" },
    { id: "#D26221", origin: "Lethbridge, AB", stage: "Delivered", stageBg: "green", rate: "$8,405", driver: "" },
  ];
  return (
    <div className="h-full bg-bg-card rounded-xl p-3 flex flex-col border border-line overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-[13px] font-semibold text-ink">Load Management</span>
          <span className="text-[8px] text-ink-3 ml-2">Confirmed loads → past settlement</span>
        </div>
        <div className="flex gap-1.5 text-[8px]">
          {["Active: 18", "Drivers: 15", "On Road: 9"].map((s) => (
            <span key={s} className="bg-bg-soft border border-line rounded px-1.5 py-0.5 text-ink-3 font-mono">{s}</span>
          ))}
        </div>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[1fr_0.7fr_0.8fr_0.5fr_0.5fr] gap-1 text-[7px] text-ink-3 uppercase tracking-wider pb-1 border-b border-line font-medium">
        <span>Load</span><span>Route</span><span>Stage</span><span>Rate</span><span>Driver</span>
      </div>

      {/* Table rows */}
      <div className="flex flex-col flex-1">
        {loads.map((l) => (
          <div key={l.id} className="grid grid-cols-[1fr_0.7fr_0.8fr_0.5fr_0.5fr] gap-1 py-1.5 border-b border-dashed border-line last:border-0 items-center">
            <div>
              <span className="text-[10px] font-semibold text-ink">LOAD {l.id}</span>
            </div>
            <span className="text-[9px] text-ink-2 truncate">{l.origin}</span>
            <StatusBadge label={l.stage} color={l.stageBg as "green" | "amber" | "blue" | "red" | "gray"} />
            <span className="text-[9px] font-mono text-ink-2">{l.rate}</span>
            <span className="text-[9px] text-ink-3 truncate">{l.driver}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Load Tracking — Map with live route and load list */
function PreviewLoadTracking() {
  return (
    <div className="h-full bg-bg-card rounded-xl flex flex-col border border-line overflow-hidden">
      <div className="p-3 pb-2">
        <span className="text-[13px] font-semibold text-ink">Load Tracking</span>
        <span className="text-[8px] text-ink-3 ml-2">Routes, stops, and real-time progress</span>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Load list sidebar */}
        <div className="w-[38%] border-r border-line p-2 flex flex-col gap-1 overflow-hidden">
          {[
            { id: "#A1BC07", status: "active", driver: "Dale Fenning" },
            { id: "#AA41FF", status: "active", driver: "Ryan Nobbs" },
            { id: "#D04180", status: "active", driver: "Daniel Roberta" },
            { id: "#D04101", status: "", driver: "Marc B." },
            { id: "#D041C4", status: "", driver: "Pickup Sched." },
          ].map((l) => (
            <div key={l.id} className={`flex items-center gap-1.5 px-1.5 py-1 rounded text-[9px] ${l.status === "active" ? "bg-bg-soft" : ""}`}>
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${l.status === "active" ? "bg-ok" : "bg-neutral-300"}`} />
              <div className="min-w-0">
                <div className="font-semibold text-ink truncate">LOAD {l.id}</div>
                <div className="text-[7px] text-ink-3 truncate">{l.driver}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Map area */}
        <div className="flex-1 bg-neutral-900 relative overflow-hidden">
          {/* Simulated map background */}
          <div className="absolute inset-0 opacity-30" style={{
            background: "radial-gradient(circle at 60% 40%, #1a3a2a 0%, #111 50%, #0a0a0a 100%)"
          }} />
          {/* Route line */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
            <path d="M60,160 Q80,100 100,80 T140,30" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,2" />
            <circle cx="60" cy="160" r="4" fill="#3b82f6" />
            <circle cx="140" cy="30" r="4" fill="#ef4444" />
            <circle cx="100" cy="80" r="3" fill="#3b82f6" opacity="0.6" />
          </svg>
          {/* Map labels */}
          <span className="absolute bottom-3 left-3 text-[7px] text-white/40 font-mono">CVL-2026223 · In Transit</span>
        </div>
      </div>
    </div>
  );
}

/** Communication Hub — Unified messaging with conversations */
function PreviewCommunication() {
  return (
    <div className="h-full bg-bg-card rounded-xl flex flex-col border border-line overflow-hidden">
      <div className="p-3 pb-2 border-b border-line">
        <span className="text-[13px] font-semibold text-ink">Communication Hub</span>
        <div className="flex gap-2 mt-1.5 text-[8px]">
          {[
            { label: "Total", value: "8" },
            { label: "Critical", value: "2", alert: true },
            { label: "Pending", value: "8" },
            { label: "Resolved", value: "0" },
          ].map((s) => (
            <span key={s.label} className={`font-mono ${s.alert ? "text-red-600 font-bold" : "text-ink-3"}`}>
              {s.label}: {s.value}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Conversation list */}
        <div className="w-[45%] border-r border-line flex flex-col">
          {[
            { name: "Derek Chamberlain", preview: "Arrived at gas, waiting for loading bay to open.", time: "1m", unread: true },
            { name: "Danielle Fontaine", preview: "Still waiting. Convoy should start in about 45 min…", time: "4m", badge: "Critical" },
            { name: "orders@northandind.ca", preview: "Hi there, are you still at your previous…", time: "12m", badge: "Pending" },
            { name: "Isabelle Paradis", preview: "Arrived at loads. Picking up in about 30 min…", time: "18m", badge: "Pending" },
          ].map((c) => (
            <div key={c.name} className={`px-2 py-1.5 border-b border-line last:border-0 ${c.unread ? "bg-blue-50/50" : ""}`}>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-semibold text-ink truncate">{c.name}</span>
                <span className="text-[7px] text-ink-3 shrink-0 ml-1">{c.time}</span>
              </div>
              <div className="text-[8px] text-ink-3 truncate mt-0.5">{c.preview}</div>
              {c.badge && (
                <span className={`text-[6px] font-semibold px-1 py-0.5 rounded mt-0.5 inline-block ${c.badge === "Critical" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                  {c.badge}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Chat area */}
        <div className="flex-1 p-2 flex flex-col gap-1.5 bg-bg-soft">
          <div className="bg-blue-500 text-white rounded-lg rounded-bl-sm px-2 py-1.5 text-[8px] max-w-[85%]">
            Hi Derek, you&apos;re dispatched for pickup at 3:00S Industrial Park Dr, Mississauga. Please confirm when you&apos;re en route.
          </div>
          <div className="bg-bg border border-line rounded-lg rounded-br-sm px-2 py-1.5 text-[8px] text-ink-2 max-w-[85%] self-end">
            Confirmed. Leaving now, about 20 minutes out.
          </div>
          <div className="bg-emerald-500 text-white rounded-lg rounded-bl-sm px-2 py-1.5 text-[8px] max-w-[85%]">
            Got it! Reminder: check in at Gate 2 with photo ID. Contact is Stacey. Call if you need anything.
          </div>
        </div>
      </div>
    </div>
  );
}

/** Lead Management — Sales pipeline from discovery to agreement */
function PreviewLeadManagement() {
  const leads = [
    { id: "CVL-2026206", customer: "NorthEnd Industrial Supply", route: "Prince George, BC → Windsor, ON", priority: "high", stage: "Agreement Pending", rate: "$7,620" },
    { id: "CVL-2026205", customer: "Ridgeline Supply Chain Inc", route: "Sherbrooke, QC → Lethbridge, AB", priority: "high", stage: "Approved", rate: "$3,000" },
    { id: "CVL-2026204", customer: "Canadian Fuel Corp", route: "Regina, SK → Abbotsford, BC", priority: "high", stage: "Negotiation", rate: "$3,300" },
    { id: "CVL-2026203", customer: "Medicraft Pharma Logistics", route: "Brampton, ON → Sudbury, ON", priority: "high", stage: "Email Initiated", rate: "$5,900" },
    { id: "CVL-2026202", customer: "Rig Solutions", route: "Regina, SK → Red Deer, AB", priority: "normal", stage: "Discovered", rate: "$6,900" },
  ];
  return (
    <div className="h-full bg-bg-card rounded-xl p-3 flex flex-col border border-line overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-[13px] font-semibold text-ink">Lead Management</span>
          <span className="text-[8px] text-ink-3 ml-2">Sales pipeline — discovery through agreement</span>
        </div>
        <div className="flex gap-1.5 text-[8px]">
          {["Total: 6", "Negotiating: 1", "Approved: 1"].map((s) => (
            <span key={s} className="bg-bg-soft border border-line rounded px-1.5 py-0.5 text-ink-3 font-mono">{s}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.4fr] gap-1 text-[7px] text-ink-3 uppercase tracking-wider pb-1 border-b border-line font-medium">
        <span>Lead</span><span>Route</span><span>Stage</span><span>Rate</span>
      </div>

      <div className="flex flex-col flex-1">
        {leads.map((l) => (
          <div key={l.id} className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.4fr] gap-1 py-1.5 border-b border-dashed border-line last:border-0 items-center">
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[9px] font-semibold text-ink">{l.id}</span>
                <PriorityDot level={l.priority as "high" | "normal"} />
              </div>
              <div className="text-[7px] text-ink-3 truncate">{l.customer}</div>
            </div>
            <span className="text-[8px] text-ink-2 truncate">{l.route}</span>
            <StatusBadge
              label={l.stage}
              color={l.stage === "Approved" ? "green" : l.stage === "Agreement Pending" ? "amber" : l.stage === "Negotiation" ? "blue" : l.stage === "Discovered" ? "gray" : "amber"}
            />
            <span className="text-[9px] font-mono text-ink-2">{l.rate}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Document Management — Documents organized by type and load */
function PreviewDocManagement() {
  const docTypes = [
    { type: "Load Agreement", count: 3 },
    { type: "Border / Crossing", count: 0 },
    { type: "Bill of Lading (BOL)", count: 3 },
    { type: "Rate Confirmation", count: 0 },
    { type: "Proof of Delivery", count: 0 },
    { type: "Insurance Certificate", count: 0 },
  ];
  const docs = [
    { name: "Load Agreement", file: "test.py", date: "05/11/2026" },
    { name: "Load Agreement", file: "test.py", date: "05/11/2026" },
    { name: "Bill of Lading (BOL)", file: "bol.pdf", date: "04/23/2026" },
    { name: "Bill of Lading (BOL)", file: "test.py", date: "04/16/2026" },
  ];
  return (
    <div className="h-full bg-bg-card rounded-xl flex flex-col border border-line overflow-hidden">
      <div className="p-3 pb-2 border-b border-line">
        <span className="text-[13px] font-semibold text-ink">Document Management</span>
        <span className="text-[8px] text-ink-3 ml-2">All documents uploaded against loads</span>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar filter */}
        <div className="w-[40%] border-r border-line p-2 flex flex-col gap-0.5">
          <div className="text-[8px] text-ink-3 uppercase tracking-wider mb-1 font-medium">Filter by Type</div>
          {docTypes.map((d) => (
            <div key={d.type} className="flex items-center justify-between py-1 px-1.5 rounded text-[8px] hover:bg-bg-soft">
              <span className="text-ink-2 truncate">{d.type}</span>
              <span className="text-ink-3 font-mono text-[7px] shrink-0 ml-1">{d.count}</span>
            </div>
          ))}
          <div className="mt-2 border-t border-line pt-2">
            <div className="text-[8px] text-ink-3 mb-0.5">Quick Stats</div>
            <div className="text-[8px] text-ink-2">Total Documents: <span className="font-semibold">6</span></div>
          </div>
        </div>

        {/* Document grid */}
        <div className="flex-1 p-2">
          <div className="grid grid-cols-2 gap-1.5">
            {docs.map((d, i) => (
              <div key={i} className="border border-line rounded-lg p-2 bg-bg-soft">
                <div className="text-[8px] font-medium text-ink truncate">{d.name}</div>
                <div className="text-[7px] text-ink-3 mt-0.5">{d.file}</div>
                <div className="text-[7px] text-ink-3">{d.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Feature card ────────────────────────────────────────────────── */

type FeatureCardProps = {
  id: string;
  title: string;
  desc: string;
  index: number;
  number: number;
  children: React.ReactNode;
};

function FeatureCard({ id, title, desc, index, number, children }: FeatureCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal
      id={id}
      delay={index * 65}
      variant="scale"
      className="scroll-mt-24 shrink-0 sm:snap-start w-full sm:w-[min(420px,calc(100vw-80px))] bento-feature-card"
    >
      {/* Desktop: always expanded */}
      <div className="hidden sm:flex flex-col gap-6">
        <div className="h-[280px] md:h-[330px] w-full">{children}</div>
        <div>
          <h3 className="bento-feature-card__title text-[22px] md:text-[24px] font-semibold text-ink tracking-tight leading-snug"><span className="font-mono text-[11.5px] text-ink-3 tracking-[0.08em] mr-2 align-middle">{String(number).padStart(2, "0")}</span>{title}</h3>
          <p className="bento-feature-card__desc mt-1.5 text-[17px] md:text-[20.25px] text-ink-2 leading-relaxed">{desc}</p>
        </div>
      </div>

      {/* Mobile: collapsed = title + one-line desc + "Read more"; expanded = full desc + preview */}
      <div className="sm:hidden border border-line rounded-2xl overflow-hidden bg-bg-card">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-full text-left px-5 pt-5 pb-4 flex flex-col items-start"
          aria-expanded={open}
        >
          <h3 className="text-[17px] font-semibold text-ink tracking-tight">
            <span className="font-mono text-[17px] text-ink-3 tracking-[0.08em] mr-2">
              {String(number).padStart(2, "0")}.  
            </span>
            {title}
          </h3>

          {!open && (
            <p className="mt-1 text-[14px] text-ink-2 leading-relaxed truncate w-full">
              {desc}
            </p>
          )}
          {!open && (
            <span className="mt-2 inline-flex items-center gap-1 text-[12px] font-medium text-sds-accent">
              Read more
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          )}
        </button>
        <div
          className="grid transition-[grid-template-rows] duration-200 ease-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="px-5 pb-5 flex flex-col gap-3">
              <p className="text-[14px] text-ink-2 leading-relaxed">{desc}</p>
              <div className="h-[220px] w-full">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Main section ────────────────────────────────────────────────── */

export function BentoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return; // handled by IntersectionObserver on mobile
      const progress = Math.min(
        1,
        Math.max(0, (window.scrollY - section.offsetTop) / scrollable),
      );
      setScrollProgress(progress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-bg border-y border-line bento-scroll-section"
      id="bento"
    >
      <div className="bento-scroll-pin">
        <div className="page-wrap bento-scroll-content">

          <div className="mb-8 sm:mb-12 max-w-[760px] shrink-0">
            <Eyebrow>With Enrout AI</Eyebrow>
            {/* Desktop: scroll-driven highlight animation */}
            <ScrollHighlightHeading
              lines={BENTO_HEADLINE_LINES}
              progress={scrollProgress}
              theme="light"
              accentWords={["One"]}
              as="h2"
              className="mt-4 hidden sm:block"
              style={{
                fontSize: "var(--sz-h2)",
                fontWeight: 540,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                textWrap: "balance",
              }}
            />
            {/* Mobile: plain heading, no animation */}
            <h2
              className="mt-4 sm:hidden"
              style={{
                fontSize: "var(--sz-h2)",
                fontWeight: 540,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                textWrap: "balance",
              }}
            >
              How we solved it.
            </h2>
            <p className="mt-5 text-ink-2 max-w-[560px]" style={{ fontSize: "var(--sz-body)", lineHeight: 1.5 }}>
              Dashboard, load management, tracking, communication, leads, and documents — every dispatcher need solved in one connected platform.
            </p>
          </div>

          {/* Scrollable card row */}
          <div className="relative min-h-0 flex-1 flex flex-col">
            {/* Fade edge right */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 z-10 hidden sm:block"
              style={{ background: "linear-gradient(to left, var(--bg), transparent)" }} />

            <div className="bento-card-row flex flex-col sm:flex-row gap-3 sm:gap-5 sm:overflow-x-auto pb-4 sm:pb-6 sm:snap-x sm:snap-mandatory sm:-mx-[clamp(20px,4vw,56px)] sm:px-[clamp(20px,4vw,56px)] sm:scroll-pl-[clamp(20px,4vw,56px)]"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}>

              <FeatureCard
                id="dashboard"
                index={0}
                number={1}
                title="Live Dashboard"
                desc="Full lifecycle visibility across loads, dispatch, and delivery — everything that needs your attention, right now."
              >
                <PreviewDashboard />
              </FeatureCard>

              <FeatureCard
                id="lead-management"
                index={4}
                number={2}
                title="Lead Management"
                desc="Track your sales pipeline from discovery through agreement. See every lead's priority, stage, and rate at a glance."
              >
                <PreviewLeadManagement />
              </FeatureCard>

              <FeatureCard
                id="load-management"
                index={1}
                number={3}
                title="Load Management"
                desc="Every confirmed load from creation to settlement. Track stages, rates, drivers, and actions — all in one table."
              >
                <PreviewLoadManagement />
              </FeatureCard>

              <FeatureCard
                id="load-tracking"
                index={2}
                number={4}
                title="Load Tracking"
                desc="See all loads on the map with routes, stops, and real-time progress. Select any load to view pickup and delivery status."
              >
                <PreviewLoadTracking />
              </FeatureCard>

              <FeatureCard
                id="communication"
                index={3}
                number={5}
                title="Communication Hub"
                desc="Every conversation with clients, carriers, and drivers in one place. AI summarizes context so you never miss what matters."
              >
                <PreviewCommunication />
              </FeatureCard>

              <FeatureCard
                id="document-management"
                index={5}
                number={6}
                title="Document Management"
                desc="BOLs, rate confirmations, agreements, and PODs — all organized by type and load. No more digging through email."
              >
                <PreviewDocManagement />
              </FeatureCard>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
