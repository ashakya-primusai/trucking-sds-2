"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

export type Plan = {
  id: "starter" | "pro" | "enterprise";
  name: string;
  price: number;
  blurb: string;
  features: string[];
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 20,
    blurb: "The basics to run dispatch without spreadsheets.",
    features: ["Load board & dispatch", "Driver mobile app", "Live GPS tracking", "Email support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 40,
    blurb: "AI that takes repetitive work off your team.",
    features: ["Everything in Starter", "AI rate con reading", "Automatic driver updates", "Profit per load", "Priority support"],
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 60,
    blurb: "Full automation for large operations.",
    features: ["Everything in Pro", "Bella AI voice agent", "Custom integrations", "Dedicated account manager"],
  },
];

// Comparison rows: which plans include each feature (Starter, Pro, Enterprise)
const rows: { label: string; has: [boolean, boolean, boolean] }[] = [
  { label: "Load board & dispatch", has: [true, true, true] },
  { label: "Driver mobile app", has: [true, true, true] },
  { label: "Live GPS tracking", has: [true, true, true] },
  { label: "AI rate con reading", has: [false, true, true] },
  { label: "Automatic driver updates", has: [false, true, true] },
  { label: "Profit per load", has: [false, true, true] },
  { label: "Bella AI voice agent", has: [false, false, true] },
  { label: "Custom integrations", has: [false, false, true] },
  { label: "Dedicated account manager", has: [false, false, true] },
];

const faqs = [
  { q: "Can I change plans later?", a: "Yes. Upgrade or downgrade any time — the change applies from your next bill." },
  { q: "Is there a contract?", a: "No. Monthly plans can be cancelled whenever you like." },
  { q: "How does yearly billing work?", a: "Pay for the year up front and get 2 months free." },
  { q: "Do you help with setup?", a: "Every plan includes onboarding. We import your data and get your team running." },
];

export const YEARLY_DISCOUNT = 10 / 12; // 2 months free

// Stripe Payment Links — set these in .env.local (one per plan and billing period)
const checkoutLinks: Record<string, string | undefined> = {
  "starter-monthly": process.env.NEXT_PUBLIC_STRIPE_STARTER_MONTHLY,
  "starter-yearly": process.env.NEXT_PUBLIC_STRIPE_STARTER_YEARLY,
  "pro-monthly": process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY,
  "pro-yearly": process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY,
  "enterprise-monthly": process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY,
  "enterprise-yearly": process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_YEARLY,
};

// Falls back to the contact form if a link isn't set yet
function checkoutHref(plan: Plan, yearly: boolean) {
  return checkoutLinks[`${plan.id}-${yearly ? "yearly" : "monthly"}`] ?? "/#contact";
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 text-sds-accent`}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function PlanCard({ plan, yearly, buy }: { plan: Plan; yearly: boolean; buy?: boolean }) {
  const price = yearly ? Math.round(plan.price * YEARLY_DISCOUNT) : plan.price;
  const dark = plan.featured;

  return (
    <div
      className={`relative h-full flex flex-col rounded-2xl p-8 sm:p-9 transition-transform duration-300 hover:-translate-y-1 ${dark ? "" : "border border-line"}`}
      style={{
        background: dark ? "linear-gradient(168deg, var(--ink) 0%, oklch(22% 0.02 55) 100%)" : "var(--bg-card)",
        boxShadow: dark ? "0 32px 64px -20px oklch(30% 0.08 55 / 0.55)" : "0 1px 2px oklch(0% 0 0 / 0.04)",
      }}
    >
      <div className="flex items-center justify-between">
        <h3 className={`text-[18px] font-semibold ${dark ? "text-white" : "text-ink"}`}>{plan.name}</h3>
        {dark && (
          <span className="px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.1em] text-white" style={{ background: "var(--sds-accent)" }}>
            Most popular
          </span>
        )}
      </div>
      <p className={`mt-2 text-[14px] leading-relaxed ${dark ? "text-white/55" : "text-ink-3"}`}>{plan.blurb}</p>

      <div className="mt-8 flex items-end gap-1.5">
        <span className={`font-semibold leading-none ${dark ? "text-white" : "text-ink"}`} style={{ fontSize: "clamp(48px, 5vw, 64px)", letterSpacing: "-0.04em" }}>
          ${price}
        </span>
        <span className={`pb-1.5 text-[14px] ${dark ? "text-white/50" : "text-ink-3"}`}>/ month</span>
      </div>
      <p className={`mt-2 h-5 text-[12px] ${dark ? "text-white/40" : "text-ink-4"}`}>
        {yearly ? `$${price * 12} billed yearly` : "Billed monthly"}
      </p>

      <a
        href={buy ? checkoutHref(plan, yearly) : "/#contact"}
        className={`mt-8 inline-flex items-center justify-center gap-2 h-12 rounded-xl text-[15px] font-semibold transition-all duration-200 ${
          dark ? "text-white hover:brightness-110" : "text-ink border border-line hover:border-sds-accent hover:text-accent-ink"
        }`}
        style={dark ? { background: "var(--sds-accent)", boxShadow: "0 6px 20px -4px oklch(70% 0.165 55 / 0.5)" } : undefined}
      >
        {buy ? `Buy ${plan.name}` : "Get started"}
        <span aria-hidden>→</span>
      </a>

      <div className={`mt-8 pt-8 border-t ${dark ? "border-white/10" : "border-line-2"}`}>
        <ul className="flex flex-col gap-3.5">
          {plan.features.map((f) => (
            <li key={f} className={`flex items-center gap-3 text-[14px] ${dark ? "text-white/80" : "text-ink-2"}`}>
              <Check />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="content-section scroll-mt-16" style={{ background: "var(--bg-soft)" }}>
      <div className="page-wrap" style={{ paddingBlock: "clamp(72px, 12vh, 140px)" }}>
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-[620px] mx-auto">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="mt-5 text-ink" style={{ fontSize: "var(--sz-h2)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.06 }}>
              Pick a plan. <span className="text-ink-4">Upgrade when you grow.</span>
            </h2>
            <p className="mt-5 text-ink-3" style={{ fontSize: "clamp(15px, 1.2vw, 18px)" }}>
              Every plan includes onboarding and the driver app. No setup fees.
            </p>

            {/* Billing toggle */}
            <div className="mt-9 inline-flex items-center p-1 rounded-full border border-line bg-bg-card">
              {[
                { label: "Monthly", value: false },
                { label: "Yearly", value: true },
              ].map((o) => (
                <button
                  key={o.label}
                  type="button"
                  onClick={() => setYearly(o.value)}
                  className={`h-10 px-5 rounded-full text-[14px] font-medium transition-all duration-200 ${
                    yearly === o.value ? "bg-ink text-white shadow-sm" : "text-ink-3 hover:text-ink"
                  }`}
                >
                  {o.label}
                  {o.value && (
                    <span className={`ml-2 px-1.5 py-0.5 rounded-md text-[11px] font-semibold ${yearly ? "bg-white/15 text-white" : "bg-accent-soft text-accent-ink"}`}>
                      2 months free
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Plan cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-[1120px] mx-auto">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 100} className="h-full">
              <PlanCard plan={p} yearly={yearly} />
            </Reveal>
          ))}
        </div>

        {/* Comparison table */}
        <Reveal>
          <div className="mt-28 max-w-[1120px] mx-auto">
            <h3 className="text-ink text-center" style={{ fontSize: "var(--sz-h3)", fontWeight: 600, letterSpacing: "-0.02em" }}>
              Compare plans
            </h3>
            <div className="mt-10 overflow-x-auto rounded-2xl border border-line bg-bg-card">
              <table className="w-full min-w-[560px] text-[14px]">
                <thead>
                  <tr className="border-b border-line">
                    <th className="text-left font-medium text-ink-3 px-6 py-5">Features</th>
                    {plans.map((p) => (
                      <th key={p.name} className={`px-6 py-5 font-semibold text-center ${p.featured ? "text-accent-ink bg-accent-soft/60" : "text-ink"}`}>
                        {p.name}
                        <span className="block text-[12px] font-normal text-ink-3 mt-0.5">${p.price}/mo</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label} className="border-b border-line-2 last:border-0">
                      <td className="px-6 py-4 text-ink-2">{r.label}</td>
                      {r.has.map((yes, i) => (
                        <td key={i} className={`px-6 py-4 ${plans[i].featured ? "bg-accent-soft/40" : ""}`}>
                          <div className="flex justify-center">
                            {yes ? <Check /> : <span className="text-ink-4">—</span>}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        {/* FAQ */}
        <Reveal>
          <div className="mt-28 max-w-[760px] mx-auto">
            <h3 className="text-ink text-center" style={{ fontSize: "var(--sz-h3)", fontWeight: 600, letterSpacing: "-0.02em" }}>
              Questions
            </h3>
            <div className="mt-10 divide-y divide-line border-y border-line">
              {faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex items-center justify-between cursor-pointer list-none text-ink font-medium text-[16px]">
                    {f.q}
                    <span className="ml-4 text-ink-3 text-[20px] transition-transform duration-200 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-ink-3 text-[15px] leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-10 text-center text-ink-3 text-[14px]">
              Running more than 100 trucks?{" "}
              <a href="/#contact" className="text-accent-ink font-medium underline underline-offset-4 hover:text-sds-accent">
                Talk to us about volume pricing
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
