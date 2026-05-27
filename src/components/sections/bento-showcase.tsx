"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { ScrollHighlightHeading } from "@/components/ui/scroll-highlight-heading";

const BENTO_HEADLINE_LINES = [
  ["Your", "entire", "operation.", "One", "screen."],
  ["No", "tab", "juggling."],
] as const;

/* ── Mini UI components ──────────────────────────────────────────── */

function CommodityRow({ name, sub }: { name: string; sub: string }) {
  return (
    <div className="flex items-center gap-2 text-[11px]">
      <span className="w-3.5 h-3.5 rounded-full bg-white/10 border border-white/20 shrink-0" />
      <span className="text-white/80 font-medium truncate">{name}</span>
      <span className="ml-auto text-white/40 font-mono shrink-0">{sub}</span>
    </div>
  );
}

function StopDot({ active }: { active?: boolean }) {
  return (
    <span
      className="w-4 h-4 rounded-full border grid place-items-center font-mono text-[8px] shrink-0"
      style={
        active
          ? { background: "var(--sds-accent)", borderColor: "var(--sds-accent)", color: "white" }
          : { background: "var(--bg-soft)", borderColor: "var(--line)", color: "var(--ink-3)" }
      }
    />
  );
}

function MiniHosBar({ pct, warn }: { pct: number; warn?: boolean }) {
  return (
    <div className="h-1 bg-line rounded-full overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{ width: `${pct}%`, background: warn ? "var(--warn)" : "var(--sds-accent)" }}
      />
    </div>
  );
}

function Thought({ done, live, text }: { done?: boolean; live?: boolean; text: string }) {
  return (
    <div className="flex gap-1.5 items-start text-[10px] font-mono leading-snug text-white/70">
      <span
        className="shrink-0 w-2.5 h-2.5 rounded-full border mt-px grid place-items-center text-[7px]"
        style={
          done
            ? { background: "var(--sds-accent)", borderColor: "var(--sds-accent)", color: "var(--ink)" }
            : live
              ? { borderColor: "var(--sds-accent)", color: "var(--sds-accent)" }
              : { borderColor: "rgba(255,255,255,0.2)", opacity: 0.4 }
        }
      >
        {done ? "✓" : live ? <span className="w-[4px] h-[4px] rounded-full bg-sds-accent" style={{ animation: "pulse-dot 1.4s ease-out infinite" }} /> : ""}
      </span>
      <span style={{ opacity: done || live ? 1 : 0.4 }}>{text}</span>
    </div>
  );
}

/* ── Feature card previews ───────────────────────────────────────── */

function PreviewLoadPlanning() {
  return (
    <div className="h-full bg-ink rounded-xl p-4 flex flex-col gap-2.5 overflow-hidden"
      style={{ border: "1px solid color-mix(in oklch, white 8%, var(--ink))" }}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">L-4831 · Live</span>
        <span className="w-1.5 h-1.5 rounded-full bg-sds-accent" style={{ animation: "pulse-dot 1.8s ease-out infinite" }} />
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        <CommodityRow name="Graphic GPUs" sub="12 skids" />
        <CommodityRow name="Keyboards" sub="5 skids" />
        <CommodityRow name="Monitors" sub="9 skids" />
      </div>
      <div className="border-t border-white/10 pt-2.5 grid grid-cols-2 gap-1.5 text-[10px] font-mono">
        <div><span className="text-white/40">Miles</span> <span className="text-white font-semibold ml-1">880</span></div>
        <div><span className="text-white/40">Margin</span> <span className="text-white font-semibold ml-1">$2,418</span></div>
      </div>
    </div>
  );
}

function PreviewStops() {
  return (
    <div className="h-full bg-bg-card rounded-xl p-4 flex flex-col gap-2.5 border border-line overflow-hidden">
      <span className="font-mono text-[9px] text-ink-3 uppercase tracking-widest">4 stops · Active</span>
      <div className="flex flex-col gap-2 flex-1">
        {[
          { n: "01", city: "Toronto, ON", time: "Tue · 06:00", active: true },
          { n: "02", city: "New York, NY", time: "Wed · 09:30" },
          { n: "03", city: "New Jersey, NY", time: "Wed · 14:00" },
          { n: "04", city: "Pittsburgh, PA", time: "Thu · 11:00" },
        ].map((s) => (
          <div key={s.n} className="flex items-center gap-2 text-[11px]">
            <StopDot active={s.active} />
            <span className="font-medium text-ink truncate">{s.city}</span>
            <span className="ml-auto font-mono text-ink-3 shrink-0 text-[10px]">{s.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewDriverHOS() {
  return (
    <div className="h-full bg-bg-card rounded-xl p-4 flex flex-col gap-3 border border-line overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] text-ink-3 uppercase tracking-widest">HOS Compliance</span>
        <span className="inline-flex items-center gap-1 text-[9px] border border-line rounded-full px-1.5 py-0.5">
          <span className="w-1 h-1 rounded-full bg-ok" /> On duty
        </span>
      </div>
      <div className="text-[13px] font-semibold text-ink">John Freightman</div>
      <div className="flex flex-col gap-2.5 flex-1">
        {[
          { label: "Driving", left: "4h 32m", pct: 56 },
          { label: "Shift", left: "6h 15m", pct: 78 },
          { label: "Cycle", left: "18h 20m", pct: 26 },
        ].map((b) => (
          <div key={b.label} className="flex flex-col gap-1">
            <div className="flex justify-between text-[10px]">
              <span className="text-ink-3">{b.label}</span>
              <span className="font-mono tabular-nums text-ink-3">{b.left}</span>
            </div>
            <MiniHosBar pct={b.pct} warn={b.pct > 70} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewBilling() {
  return (
    <div className="h-full bg-ink rounded-xl p-4 flex flex-col gap-2.5 overflow-hidden"
      style={{ border: "1px solid color-mix(in oklch, white 8%, var(--ink))" }}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Week 12</span>
        <span className="text-[10px] font-mono text-sds-accent">▲ 14%</span>
      </div>
      <div className="flex items-end gap-1 h-10">
        {[46, 58, 42, 74, 62, 38, 24].map((h, i) => (
          <div key={i} className="flex-1 rounded-t" style={{
            height: `${h}%`,
            background: i === 3 ? "var(--sds-accent)" : "color-mix(in oklch, white 14%, transparent)"
          }} />
        ))}
      </div>
      <div className="border-t border-white/10 pt-2.5 grid grid-cols-3 gap-1 text-[10px] font-mono">
        <div><div className="text-white/40">Revenue</div><div className="text-white font-semibold mt-0.5">$32.5k</div></div>
        <div><div className="text-white/40">Cost</div><div className="text-white font-semibold mt-0.5">$17.5k</div></div>
        <div><div className="text-white/40">Margin</div><div className="text-sds-accent font-semibold mt-0.5">$15k</div></div>
      </div>
    </div>
  );
}

function PreviewAI({ tick }: { tick: number }) {
  return (
    <div className="h-full bg-ink rounded-xl p-4 flex flex-col gap-2 overflow-hidden"
      style={{ border: "1px solid color-mix(in oklch, white 8%, var(--ink))" }}>
      <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">AI Dispatcher</span>
      <div className="flex flex-col gap-1.5 flex-1">
        <Thought done text="Checked driver HOS and 70-hr cycle" />
        <Thought done text="Verified border docs (TOR → NY)" />
        <Thought done text="Estimated drive time → 8h 40m" />
        <Thought live={tick % 4 < 3} done={tick % 4 >= 3} text="Recalculating HOS for NJ leg…" />
        <Thought text="Confirming Pittsburgh window…" />
      </div>
    </div>
  );
}

function PreviewDocInbox() {
  return (
    <div className="h-full bg-bg-card rounded-xl p-4 flex flex-col gap-2 border border-line overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] text-ink-3 uppercase tracking-widest">Document Inbox</span>
        <span className="text-[9px] font-mono text-sds-accent">3 new</span>
      </div>
      <div className="flex flex-col flex-1">
        {[
          { id: "DOC-2138", subject: "Rate con · DAL → SJC", unread: true },
          { id: "DOC-3154", subject: "BOL · Order #004 · NorthCo", unread: false },
          { id: "DOC-3123", subject: "Rate con · Order #002", unread: true },
          { id: "DOC-3231", subject: "Invoice POD · Order #005", unread: false },
          { id: "DOC-5323", subject: "Rate con · Order #001", unread: true },
        ].map((row) => (
          <div key={row.id} className="flex items-center gap-2 py-1.5 border-b border-dashed border-line last:border-0">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: row.unread ? "var(--sds-accent)" : "var(--ink-4)" }} />
            <span className="text-[10.5px] text-ink-2 truncate flex-1">{row.subject}</span>
            <span className="font-mono text-[9px] text-ink-3 shrink-0">{row.id}</span>
          </div>
        ))}
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
  children: React.ReactNode;
};

function FeatureCard({ id, title, desc, index, children }: FeatureCardProps) {
  return (
    <Reveal
      id={id}
      delay={index * 65}
      variant="scale"
      className="scroll-mt-24 shrink-0 w-[420px] flex flex-col gap-6"
    >
      <div className="h-[330px] w-full">
        {children}
      </div>
      <div>
        <h3 className="text-[24px] font-semibold text-ink tracking-tight leading-snug">{title}</h3>
        <p className="mt-1.5 text-[20.25px] text-ink-2 leading-relaxed">{desc}</p>
      </div>
    </Reveal>
  );
}

/* ── Main section ────────────────────────────────────────────────── */

export function BentoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1100);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        setScrollProgress(0);
        return;
      }
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

        <div className="mb-12 max-w-[760px] shrink-0">
          <Eyebrow>With TOS</Eyebrow>
          <ScrollHighlightHeading
            lines={BENTO_HEADLINE_LINES}
            progress={scrollProgress}
            theme="light"
            accentWords={["One"]}
            as="h2"
            className="mt-4"
            style={{
              fontSize: "var(--sz-h2)",
              fontWeight: 540,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              textWrap: "balance",
            }}
          />
          <p className="mt-5 text-ink-2 max-w-[560px]" style={{ fontSize: "var(--sz-body)", lineHeight: 1.5 }}>
            Every dispatcher headache — load planning, stops, fleet, docs, AI, billing — solved in a single connected platform.
          </p>
        </div>

        {/* Scrollable card row */}
        <div className="relative min-h-0 flex-1 flex flex-col">
          {/* Fade edge right */}
          <div className="pointer-events-none absolute right-[-120px] top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(to left, var(--bg), transparent)" }} />

          <div className="flex gap-5 overflow-x-auto pb-6 -mx-[clamp(20px,4vw,56px)] px-[clamp(20px,4vw,56px)]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>

            <FeatureCard
              id="load-planning"
              index={0}
              title="Load Planning"
              desc="Build loads instantly — AI reads rate cons, auto-fills fields, and calculates margin before you confirm."
            >
              <PreviewLoadPlanning />
            </FeatureCard>

            <FeatureCard
              id="live-stops"
              index={1}
              title="Stop Management"
              desc="Every pickup and drop tracked live. Drivers update via app — no phone calls, no manual entry."
            >
              <PreviewStops />
            </FeatureCard>

            <FeatureCard
              id="live-board"
              index={2}
              title="Driver Hours (HOS)"
              desc="Hours-of-service tracked automatically. TOS never suggests a driver who'd violate — before you assign."
            >
              <PreviewDriverHOS />
            </FeatureCard>

            <FeatureCard
              id="billing"
              index={3}
              title="Billing & Revenue"
              desc="Invoices go out the day loads deliver. PODs, rate cons, and accessorials all linked — nothing lost."
            >
              <PreviewBilling />
            </FeatureCard>

            <FeatureCard
              id="ai-dispatch"
              index={4}
              title="AI Dispatcher"
              desc="TOS AI thinks through HOS, docs, routes, and windows so your dispatchers make faster, smarter calls."
            >
              <PreviewAI tick={tick} />
            </FeatureCard>

            <FeatureCard
              id="document-inbox"
              index={5}
              title="Document Inbox"
              desc="Rate cons, BOLs, and PODs flow in automatically — parsed, linked to the right load, ready to invoice."
            >
              <PreviewDocInbox />
            </FeatureCard>

          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
