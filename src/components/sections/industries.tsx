import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

import lastMileScreenshot from "@/assets/screenshots/last_mile.png";
import loadManagementScreenshot from "@/assets/screenshots/load-management.png";

const INDUSTRIES = [
  {
    id: "trucking",
    title: "Trucking Industry",
    tag: "For carriers & fleet operators",
    desc: "Full-truckload and LTL carriers run dispatch, tracking, billing, and fleet ops on one connected platform.",
    dark: false,
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
    dark: true,
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
    <div className="h-full rounded-xl overflow-hidden shadow-[0_1px_8px_-2px_oklch(20%_0.02_60/0.1)]">
      <Image
        src={loadManagementScreenshot}
        alt="Load Management screenshot"
        className="w-full h-full object-cover object-top"
        placeholder="blur"
      />
    </div>
  );
}

function PreviewLastMile() {
  return (
    <div className="h-full rounded-xl overflow-hidden shadow-[0_1px_8px_-2px_oklch(20%_0.02_60/0.1)]">
      <Image
        src={lastMileScreenshot}
        alt="Last Mile Delivery screenshot"
        className="w-full h-full object-cover object-top"
        placeholder="blur"
      />
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
  dark,
  points,
  index,
}: (typeof INDUSTRIES)[number] & { index: number }) {
  const Preview = PREVIEWS[id];

  return (
    <Reveal delay={index * 90} variant="scale" className="min-h-0 h-full">
      <article
        className={`industry-card group flex flex-col min-h-0 h-full rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 ${
          dark
            ? "bg-ink shadow-[0_2px_24px_-4px_oklch(10%_0.01_60/0.3)] hover:shadow-[0_12px_40px_-8px_oklch(10%_0.01_60/0.45)]"
            : "bg-bg-card shadow-[0_2px_24px_-4px_oklch(20%_0.02_60/0.08),0_0_0_1px_oklch(20%_0.01_60/0.04)] hover:shadow-[0_12px_40px_-8px_oklch(20%_0.02_60/0.16),0_0_0_1px_oklch(20%_0.01_60/0.06)]"
        }`}
      >
        <div className="industry-card__preview p-5 pb-0 min-h-0">
          <Preview />
        </div>
        <div className="flex flex-col flex-1 p-6 pt-5 gap-4 min-h-0">
          <div>
            <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-sds-accent">
              {tag}
            </p>
            <h3
              className={`mt-2 font-semibold tracking-tight ${dark ? "text-white" : ""}`}
              style={{ fontSize: "var(--sz-h3)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
            >
              {title}
            </h3>
            <p className={`mt-2 text-[15px] leading-relaxed ${dark ? "text-white/60" : "text-ink-2"}`}>{desc}</p>
          </div>
          <ul className="space-y-2">
            {points.map((point) => (
              <li key={point} className={`flex items-center gap-2.5 text-[14px] ${dark ? "text-white/55" : "text-ink-2"}`}>
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
