"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { HeroBackgroundImage } from "@/components/hero-background-image";
import { ScrollHighlightHeading } from "@/components/ui/scroll-highlight-heading";

const HEADLINE = ["AI", "TMS", "For", "Dispatchers"] as const;

const heroSurface =
  "inline-flex items-center rounded-full border backdrop-blur-sm transition-all duration-150";
const heroBadge = `${heroSurface} gap-2.5 border-sds-accent/45 bg-sds-accent/12 px-4 py-2 shadow-[0_0_24px_color-mix(in_oklch,var(--sds-accent)_18%,transparent)]`;
const heroCtaPrimary = `${heroSurface} gap-2 h-12 px-7 border-sds-accent/40 bg-sds-accent/10 text-sds-accent text-[15px] font-semibold tracking-tight whitespace-nowrap hover:border-sds-accent/60 hover:bg-sds-accent/15 hover:-translate-y-px`;
const heroCtaSecondary = `${heroSurface} gap-2 h-12 px-7 border-white/20 bg-white/[0.08] text-white/80 text-[15px] font-medium tracking-tight whitespace-nowrap hover:border-white/40 hover:bg-white/[0.12] hover:text-white hover:-translate-y-px`;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(1, Math.max(0, window.scrollY / scrollable)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const hintOpacity = Math.max(0, 1 - progress / 0.35);

  return (
    <section ref={sectionRef} id="hero" className="hero-scroll-section relative isolate">
      <div className="hero-scroll-pin">
        <HeroBackgroundImage />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.50) 42%, rgba(0,0,0,0.0) 100%)",
          }}
        />

        <div
          className="relative z-20 flex flex-col items-center justify-center w-full h-full px-4 pb-20 sm:pb-24 md:mb-[120px]"
          style={{ maxWidth: "var(--content-w)", paddingInline: "var(--content-px)", marginInline: "auto" }}
        >
          <div className={heroBadge}>
            <span
              className="inline-flex items-center gap-2 text-[14px] font-semibold tracking-tight text-white"
              style={{ textShadow: "0 1px 12px color-mix(in oklch, var(--sds-accent) 35%, transparent)" }}
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-sds-accent"
                style={{ boxShadow: "0 0 8px var(--sds-accent)" }}
                aria-hidden="true"
              />
              30-day free trial
            </span>
            <span className="text-white/30" aria-hidden="true">·</span>
            <span className="text-[13px] font-medium text-white/80">
              No credit card required
            </span>
          </div>

          <ScrollHighlightHeading
            words={HEADLINE}
            progress={progress}
            theme="dark"
            accentWords={["TMS"]}
            as="h1"
            className="mt-6 font-medium text-center"
            style={{
              fontSize: "var(--sz-h1)",
              fontWeight: 440,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              textWrap: "balance",
            }}
          />

          <p
            className="mt-6 text-white/85 text-center max-w-[900px] font-medium"
            style={{
              fontSize: "var(--sz-body)",
              lineHeight: 1.45,
              letterSpacing: "-0.005em",
            }}
          >
            Enrout AI is the AI-powered dispatch platform for trucking teams who need to move
            faster, with less. Dispatch, track, bill, and forecast — on one screen.
          </p>

          <div className="mt-8 flex gap-3 justify-center flex-wrap">
            <Link href="/#contact" className={heroCtaPrimary}>
              Book a demo
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/#contact" className={heroCtaSecondary}>
              Contact us
            </Link>
          </div>

          <div
            className="hero-scroll-hint"
            aria-hidden={progress > 0.92}
            style={{ opacity: hintOpacity }}
          >
            <span>Scroll to continue</span>
            <span className="hero-scroll-hint__chevron">↓</span>
          </div>
        </div>

        <div
          className="hero-scroll-progress"
          aria-hidden
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </section>
  );
}
