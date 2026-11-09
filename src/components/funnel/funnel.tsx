"use client";

import { useState } from "react";
import { Logo } from "@/components/logo";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ReelPlayer } from "@/components/funnel/reel-player";
import { PlanCard, plans, type Plan } from "@/components/sections/pricing";

/* ───────────── Content ───────────── */

const fleetTypes: { id: Plan["id"]; title: string; size: string; need: string }[] = [
  { id: "starter", title: "Owner-operator / small fleet", size: "1–10 trucks", need: "Get off spreadsheets and know where every truck is." },
  { id: "pro", title: "Growing fleet", size: "10–50 trucks", need: "Let AI handle rate cons and driver updates so dispatch scales." },
  { id: "enterprise", title: "Large operation", size: "50+ trucks", need: "Automate calls and connect every system you already use." },
];

const features = [
  { tag: "Rate cons", title: "Drop in a rate con. Get a load.", text: "AI reads the PDF and fills pickup, delivery, rate and broker — no typing.", plan: "Pro" },
  { tag: "Tracking", title: "Every truck on one map.", text: "Live GPS from the driver app. Know who's late before the broker calls.", plan: "All plans" },
  { tag: "Updates", title: "Drivers update themselves.", text: "Status, photos and documents arrive automatically from the driver app.", plan: "All plans" },
  { tag: "Profit", title: "See profit on every load.", text: "Rate, miles and costs side by side, the moment a load is booked.", plan: "Pro" },
  { tag: "Bella AI", title: "An AI that answers the phone.", text: "Bella handles routine broker and driver calls so your team doesn't have to.", plan: "Enterprise" },
];


const switching = [
  { title: "We move your data", text: "Send us your drivers, trucks and customers in any format. We import it." },
  { title: "Live in one day", text: "Most fleets are dispatching on Enrout Ops the next business day." },
  { title: "Drivers learn in minutes", text: "Simple app. We walk your drivers through it." },
  { title: "No contract", text: "Monthly billing. Cancel any time." },
];

const faqs = [
  { q: "What do I need to get started?", a: "Just a list of your drivers and trucks. We handle the setup and import." },
  { q: "Can I change plans later?", a: "Yes. Upgrade or downgrade any time — the change applies from your next bill." },
  { q: "Is there a contract or setup fee?", a: "No contract and no setup fee. Monthly plans can be cancelled whenever you like." },
  { q: "Is my data and payment safe?", a: "Checkout is handled by Stripe — we never see your card. Your data is encrypted and only your team can see it." },
  { q: "Does it work with my other tools?", a: "Enterprise includes custom integrations. Tell us what you use and we'll confirm before you buy." },
  { q: "Can I see a demo first?", a: "Of course. Email info@enroutops.com and we'll book a 15-minute walkthrough." },
];

/* ───────────── Helpers ───────────── */

const darkBg = { background: "linear-gradient(168deg, var(--ink) 0%, oklch(22% 0.02 55) 100%)" };
const h2Style = { fontSize: "var(--sz-h2)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.06 } as const;
const pad = { paddingBlock: "clamp(72px, 12vh, 140px)" };

function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function CTA({ children, to = "plans" }: { children: React.ReactNode; to?: string }) {
  return (
    <button
      type="button"
      onClick={() => goTo(to)}
      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-[16px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
      style={{ background: "var(--sds-accent)", boxShadow: "0 8px 24px -6px oklch(70% 0.165 55 / 0.55)" }}
    >
      {children} <span aria-hidden>→</span>
    </button>
  );
}

function SectionHead({ eyebrow, title, sub, dark = false }: { eyebrow: string; title: React.ReactNode; sub?: string; dark?: boolean }) {
  return (
    <Reveal>
      <div className="text-center max-w-[680px] mx-auto">
        <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        <h2 className={`mt-5 ${dark ? "text-white" : "text-ink"}`} style={h2Style}>{title}</h2>
        {sub && <p className={`mt-5 ${dark ? "text-white/55" : "text-ink-3"}`} style={{ fontSize: "clamp(15px, 1.2vw, 18px)" }}>{sub}</p>}
      </div>
    </Reveal>
  );
}

/* Small product mock for the hero — a load card being created by AI */
function HeroMock() {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-[oklch(22%_0.02_55/0.92)] p-4 text-left backdrop-blur shadow-2xl">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/40">Rate con → Load</span>
        <span className="flex items-center gap-1.5 text-[12px] text-white/60">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--ok)" }} /> AI read in 8s
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {[
          ["Pickup", "Dallas, TX"],
          ["Delivery", "Atlanta, GA"],
          ["Rate", "$2,850"],
          ["Profit", "$1,120"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-white/[0.06] px-3 py-2">
            <span className="block text-[11px] text-white/40">{k}</span>
            <span className={`block mt-0.5 text-[13px] font-semibold ${k === "Profit" ? "text-sds-accent" : "text-white"}`}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Cost-of-doing-nothing calculator */
function CostCalculator() {
  const [trucks, setTrucks] = useState(10);
  const [minutes, setMinutes] = useState(20);
  const hoursPerMonth = Math.round((trucks * minutes * 22) / 60); // 22 working days
  const cost = hoursPerMonth * 25; // $25/hr dispatcher time

  return (
    <div className="rounded-2xl border border-line bg-bg-card p-7 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div className="flex flex-col gap-8">
        <label className="block">
          <span className="flex justify-between text-[14px] text-ink-2 font-medium">
            Trucks in your fleet <span className="text-ink font-semibold">{trucks}</span>
          </span>
          <input type="range" min={1} max={100} value={trucks} onChange={(e) => setTrucks(+e.target.value)} className="mt-3 w-full accent-[var(--sds-accent)]" />
        </label>
        <label className="block">
          <span className="flex justify-between text-[14px] text-ink-2 font-medium">
            Minutes per truck, per day, on calls & paperwork <span className="text-ink font-semibold">{minutes}</span>
          </span>
          <input type="range" min={5} max={60} step={5} value={minutes} onChange={(e) => setMinutes(+e.target.value)} className="mt-3 w-full accent-[var(--sds-accent)]" />
        </label>
      </div>
      <div className="rounded-2xl p-8 text-center" style={darkBg}>
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/45">Manual work costs you about</span>
        <div className="mt-3 text-white font-semibold" style={{ fontSize: "clamp(44px, 5vw, 64px)", letterSpacing: "-0.04em" }}>
          ${cost.toLocaleString()}
          <span className="text-[16px] font-normal text-white/50"> / month</span>
        </div>
        <p className="mt-2 text-[14px] text-white/55">{hoursPerMonth} hours of dispatcher time</p>
        <p className="mt-6 text-[14px] text-white/80">Enrout Ops starts at <b className="text-sds-accent">$20/month</b>.</p>
      </div>
    </div>
  );
}

/* ───────────── Page ───────────── */

export function Funnel() {
  const [yearly, setYearly] = useState(false);
  const [fleet, setFleet] = useState<Plan["id"]>("pro");

  const pickFleet = (id: Plan["id"]) => {
    setFleet(id);
    setTimeout(() => goTo("plans"), 150);
  };

  return (
    <div className="funnel bg-bg">
      {/* Header: logo + one button, no menu */}
      <header className="sticky top-0 z-40 backdrop-blur-md border-b border-line-2" style={{ background: "oklch(98.6% 0.004 80 / 0.85)" }}>
        <div className="page-wrap flex items-center justify-between h-16">
          <Logo />
          <button type="button" onClick={() => goTo("plans")} className="h-10 px-5 rounded-lg bg-ink text-white text-[14px] font-semibold hover:opacity-90">
            See plans
          </button>
        </div>
      </header>

      <main>
        {/* 1 — Hook: same promise as the ad, one action */}
        <section className="overflow-hidden" style={darkBg}>
          <div className="page-wrap grid grid-cols-1 lg:grid-cols-2 gap-14 items-center" style={pad}>
            <Reveal>
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
                  <span className="w-2 h-2 rounded-full" style={{ background: "var(--sds-accent)", boxShadow: "0 0 8px var(--sds-accent)" }} />
                  <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-white/60">AI dispatch for trucking</span>
                </div>
                <h1 className="mt-7 text-white" style={{ fontSize: "clamp(40px, 5.5vw, 76px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.02 }}>
                  Dispatch more loads. <span style={{ color: "var(--sds-accent)" }}>Make fewer calls.</span>
                </h1>
                <p className="mt-6 max-w-[520px] mx-auto lg:mx-0 text-white/60" style={{ fontSize: "clamp(16px, 1.4vw, 20px)" }}>
                  Enrout Ops reads your rate cons, tracks your drivers and shows profit on every load — so your team runs more trucks with less work.
                </p>
                <div className="mt-10 flex flex-col items-center lg:items-start gap-4">
                  <CTA to="fit">Find my plan</CTA>
                  <span className="text-[13px] text-white/40">From $20/month · No contract · Live in one day</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={150} variant="fade">
              <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[320px] lg:max-w-[360px]">
                <ReelPlayer src="/videos/overview.mp4" poster="/videos/overview.jpg" title="Watch: Enrout Ops in 30 seconds" />
                <div className="hidden lg:block absolute -left-32 bottom-16 w-[260px] origin-bottom-left"><HeroMock /></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 2 — Problem: make the cost of doing nothing concrete */}
        <section className="page-wrap" style={pad}>
          <SectionHead
            eyebrow="The problem"
            title={<>Phone calls and paperwork <span className="text-ink-4">are eating your margin</span></>}
            sub="Every check call, every rate con typed by hand, every missing POD is time you pay for. See what it costs you:"
          />
          <Reveal><div className="mt-14 max-w-[1120px] mx-auto"><CostCalculator /></div></Reveal>
        </section>

        {/* 3 — Solution: features as outcomes, with the plan they come in */}
        <section style={{ background: "var(--bg-soft)" }}>
          <div className="page-wrap" style={pad}>
            <SectionHead eyebrow="The fix" title="One screen that does the busywork for you" />
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[1120px] mx-auto">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-line bg-bg-card p-7 flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-sds-accent">{f.tag}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-bg-soft text-ink-3">{f.plan}</span>
                    </div>
                    <h3 className="mt-4 text-ink text-[19px] font-semibold leading-snug">{f.title}</h3>
                    <p className="mt-2 text-ink-3 text-[15px] leading-relaxed">{f.text}</p>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={400}>
                <div className="h-full rounded-2xl p-7 flex flex-col justify-center items-start" style={darkBg}>
                  <h3 className="text-white text-[19px] font-semibold">Ready to stop the busywork?</h3>
                  <p className="mt-2 text-white/55 text-[15px]">Tell us your fleet size and we&apos;ll show the right plan.</p>
                  <div className="mt-6"><CTA to="fit">Find my plan</CTA></div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 4 — Fit: self-select fleet size → recommended plan */}
        <section id="fit" className="scroll-mt-16 page-wrap" style={pad}>
          <SectionHead eyebrow="Find your plan" title="Which describes you?" sub="Pick one and we'll highlight the plan that fits." />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1120px] mx-auto">
            {fleetTypes.map((t, i) => {
              const active = fleet === t.id;
              return (
                <Reveal key={t.id} delay={i * 80}>
                  <button
                    type="button"
                    onClick={() => pickFleet(t.id)}
                    className={`w-full h-full text-left rounded-2xl border p-7 transition-all duration-200 hover:-translate-y-1 ${active ? "border-sds-accent ring-1 ring-sds-accent bg-accent-soft/50" : "border-line bg-bg-card hover:border-ink-4"}`}
                  >
                    <span className="font-mono text-[12px] text-ink-3">{t.size}</span>
                    <h3 className="mt-2 text-ink text-[19px] font-semibold">{t.title}</h3>
                    <p className="mt-2 text-ink-3 text-[15px] leading-relaxed">{t.need}</p>
                    <span className="mt-5 inline-block text-[14px] font-semibold text-accent-ink">
                      {plans.find((p) => p.id === t.id)?.name} plan →
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* 5 — Offer: plans + checkout, recommended plan highlighted */}
        <section id="plans" className="scroll-mt-16" style={{ background: "var(--bg-soft)" }}>
          <div className="page-wrap" style={pad}>
            <SectionHead eyebrow="Plans" title="Simple pricing. No surprises." />
            <div className="mt-8 flex justify-center">
              <div className="inline-flex items-center p-1 rounded-full border border-line bg-bg-card">
                {[{ label: "Monthly", value: false }, { label: "Yearly · 2 months free", value: true }].map((o) => (
                  <button
                    key={o.label}
                    type="button"
                    onClick={() => setYearly(o.value)}
                    className={`h-10 px-5 rounded-full text-[14px] font-medium transition-all ${yearly === o.value ? "bg-ink text-white" : "text-ink-3 hover:text-ink"}`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-[1120px] mx-auto">
              {plans.map((p, i) => (
                <Reveal key={p.id} delay={i * 100} className={`h-full ${p.id === fleet ? "order-first md:order-none" : ""}`}>
                  <PlanCard plan={{ ...p, featured: p.id === fleet }} yearly={yearly} buy />
                </Reveal>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13px] text-ink-3">
              <span>🔒 Secure checkout by Stripe</span>
              <span>✓ No contract, cancel any time</span>
              <span>✓ Free setup & data import</span>
            </div>
          </div>
        </section>

        {/* 6 — Remove switching fear */}
        <section className="page-wrap" style={pad}>
          <SectionHead eyebrow="Switching is easy" title="We do the setup. You keep driving." />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1120px] mx-auto">
            {switching.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div>
                  <span className="font-mono text-[32px] font-semibold text-sds-accent leading-none">0{i + 1}</span>
                  <h3 className="mt-4 text-ink text-[18px] font-semibold">{s.title}</h3>
                  <p className="mt-2 text-ink-3 text-[15px] leading-relaxed">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 7 — Objections */}
        <section style={{ background: "var(--bg-soft)" }}>
          <div className="page-wrap" style={pad}>
            <SectionHead eyebrow="Questions" title="Before you buy" />
            <div className="mt-10 max-w-[760px] mx-auto divide-y divide-line border-y border-line">
              {faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex items-center justify-between cursor-pointer list-none text-ink font-medium text-[16px]">
                    {f.q}
                    <span className="ml-4 text-ink-3 text-[20px] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-ink-3 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 8 — Close */}
        <section className="text-center" style={darkBg}>
          <div className="page-wrap" style={pad}>
            <h2 className="text-white" style={h2Style}>Start today. Dispatch tomorrow.</h2>
            <p className="mt-4 text-white/55">Plans from $20/month. Setup and data import included.</p>
            <div className="mt-9"><CTA>Choose my plan</CTA></div>
            <p className="mt-8 text-[14px] text-white/45">
              Want a demo first? <a href="mailto:info@enroutops.com" className="text-white/80 underline underline-offset-4">info@enroutops.com</a>
            </p>
          </div>
        </section>
      </main>

      <footer className="page-wrap py-8 pb-24 md:pb-8 flex flex-wrap justify-between gap-4 text-[13px] text-ink-3">
        <span>© {new Date().getFullYear()} Enrout Ops</span>
        <a href="/privacy" className="hover:text-ink">Privacy</a>
      </footer>

      {/* Mobile: always-visible buy bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-line bg-bg-card/95 backdrop-blur px-4 py-3 flex items-center justify-between gap-3">
        <span className="text-[13px] text-ink-2">From <b className="text-ink">$20</b>/month</span>
        <button type="button" onClick={() => goTo("plans")} className="h-11 px-6 rounded-xl text-white text-[15px] font-semibold" style={{ background: "var(--sds-accent)" }}>
          See plans
        </button>
      </div>
    </div>
  );
}
