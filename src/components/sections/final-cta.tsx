import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

export function FinalCTA() {
  return (
    <section id="demo" className="bg-bg-soft border-t border-line" style={{ paddingBlock: "clamp(96px, 10vh, 128px)" }}>
      <div className="page-wrap">
        <Reveal variant="fade">
          <Eyebrow>Demo · 20 minutes · live walkthrough</Eyebrow>
        </Reveal>

        <Reveal delay={80}>
          <h2
            className="mt-5 max-w-[900px]"
            style={{
              fontSize: "var(--sz-h1)",
              fontWeight: 540,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              textWrap: "balance",
            }}
          >
            Make your dispatchers{" "}
            <em className="italic font-[460] text-sds-accent">superhuman.</em>
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p
            className="mt-5 max-w-[520px] text-ink-2"
            style={{
              fontSize: "var(--sz-body)",
              lineHeight: 1.45,
            }}
          >
            14-day free trial. No credit card. Up and running in under a day.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="flex gap-3 mt-9 flex-wrap">
            <a
              href="#book"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-ink text-bg text-[14.5px] font-medium tracking-tight whitespace-nowrap transition-all duration-150 hover:bg-ink-2 hover:-translate-y-px"
            >
              Book a demo
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#trial"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-transparent text-ink border border-line text-[14.5px] font-medium tracking-tight whitespace-nowrap transition-all duration-150 hover:bg-bg-soft hover:border-ink-4 hover:-translate-y-px"
            >
              Start free trial
            </a>
          </div>
        </Reveal>

        <Reveal delay={320} variant="fade">
          <div className="flex flex-wrap gap-x-7 gap-y-3 mt-9 text-[13px] text-ink-3">
            <span>sds-software.com</span>
            <span>hello@sds-software.com</span>
            <span>1-800-SDS-HAUL</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
