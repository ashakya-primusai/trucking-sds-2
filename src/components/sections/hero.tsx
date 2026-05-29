"use client";

import { useRef, useEffect, useState } from "react";
import { HeroBackgroundImage } from "@/components/hero-background-image";
import { ScrollHighlightHeading } from "@/components/ui/scroll-highlight-heading";

const HEADLINE = [ "AI", "TMS", "For", "Dispatchers"] as const;

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

  const subtextIn = Math.min(1, Math.max(0, (progress - 0.68) / 0.2));
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
          <div
            className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-sm px-4 py-1.5"
            style={{
              opacity: 0.55 + progress * 0.45,
              transform: `translateY(${(1 - Math.min(1, progress * 4)) * 8}px)`,
            }}
          >
            <span className="text-[14px] font-semibold tracking-[0.1em] uppercase text-white/50">
              Scroll to continue
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
              opacity: subtextIn,
              transform: `translateY(${(1 - subtextIn) * 14}px)`,
            }}
          >
            Enrout AI is the AI-powered dispatch platform for trucking teams who need to move
            faster, with less. Dispatch, track, bill, and forecast — on one screen.
          </p>

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
