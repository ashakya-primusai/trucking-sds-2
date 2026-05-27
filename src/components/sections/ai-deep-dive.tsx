"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { AIChatDemo } from "./ai-chat-demo";
import { DispatchBoardDemo } from "./dispatch-board-demo";
import { LiveMapDemo } from "./live-map-demo";

const DEMOS = [
  {
    id: "dispatch",
    label: "Dispatch Board",
    tag: "Smart load matching",
    title: "The best driver for every load.",
    desc: "HOS, location, load type, customer history — TOS ranks every driver against every open load. You decide, or let it auto-assign.",
    Component: DispatchBoardDemo,
  },
  {
    id: "etas",
    label: "Predictive ETAs",
    tag: "Live tracking",
    title: "Know what's late before it is.",
    desc: "Traffic, weather, driver patterns, dwell time — TOS forecasts ETAs and flags delay risk while there's still time to act.",
    Component: LiveMapDemo,
  },
] as const;

export function AIDeepDive() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const count = DEMOS.length;
  const active = Math.min(count - 1, Math.floor(scrollProgress * count));
  const slideProgress = scrollProgress * count;

  const scrollToSlide = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      if (!section) return;
      const clamped = Math.max(0, Math.min(count - 1, index));
      const scrollable = section.offsetHeight - window.innerHeight;
      const target =
        section.offsetTop + (count <= 1 ? 0 : (clamped / (count - 1)) * scrollable);
      window.scrollTo({ top: target, behavior: "smooth" });
    },
    [count],
  );

  const goTo = (index: number) => {
    scrollToSlide((index + count) % count);
  };

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

  const slideMotion = (index: number, layer: "demo" | "copy" = "demo") => {
    const offset = slideProgress - index;
    const abs = Math.abs(offset);
    const opacity = Math.max(0, 1 - abs * 1.35);

    if (layer === "demo") {
      const translateY = -offset * 220;
      const scale = 1 - abs * 0.14;
      const rotateX = offset * -10;
      const blur = abs * 5;
      return { opacity, translateY, scale, rotateX, blur };
    }

    const translateY = offset * 96;
    return { opacity, translateY, scale: 1 - abs * 0.04, rotateX: 0, blur: 0 };
  };

  return (
    <section
      ref={sectionRef}
      id="ai"
      className="bg-bg border-y border-line ai-scroll-section"
      style={{ "--ai-slide-count": count } as React.CSSProperties}
    >
      <div className="ai-scroll-pin">
        <div className="page-wrap section-stack">
        <div className="section-stack__column">
          <div className="demo-carousel-wrap">
            <div className="demo-frame border border-line shadow-[0_24px_60px_-30px_oklch(20%_0.02_60/0.12)]">
              {DEMOS.map((d, i) => {
                const Demo = d.Component;
                const { opacity, translateY, scale, rotateX, blur } = slideMotion(i, "demo");
                return (
                  <div
                    key={d.id}
                    className="demo-slide will-change-transform"
                    style={{
                      opacity,
                      filter: blur > 0.1 ? `blur(${blur}px)` : undefined,
                      transform: `perspective(1200px) translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg)`,
                      pointerEvents: opacity > 0.45 ? "auto" : "none",
                      zIndex: opacity > 0.5 ? 2 : 1,
                    }}
                    aria-hidden={opacity < 0.5}
                  >
                    <Demo />
                  </div>
                );
              })}
            </div>

            <div className="shrink-0 flex justify-center gap-2 mt-3">
              {DEMOS.map((d, i) => {
                const fill = Math.max(0, 1 - Math.abs(slideProgress - i));
                return (
                <button
                  key={d.id}
                  type="button"
                  aria-label={`Go to ${d.label}`}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => scrollToSlide(i)}
                  className="h-1.5 rounded-full"
                  style={{
                    width: 6 + fill * 18,
                    background: fill > 0.4 ? "var(--sds-accent)" : "var(--line)",
                    opacity: 0.35 + fill * 0.65,
                  }}
                />
              );
              })}
            </div>
          </div>

          <div className="carousel-content">
            <div className="carousel-content__slide">
              {DEMOS.map((d, i) => {
                const { opacity, translateY, scale } = slideMotion(i, "copy");
                return (
                <div
                  key={d.id}
                  className="will-change-transform absolute inset-0"
                  style={{
                    opacity,
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    pointerEvents: opacity > 0.45 ? "auto" : "none",
                  }}
                  aria-hidden={opacity < 0.5}
                >
                  <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-sds-accent">
                    {d.tag}
                  </span>
                  <h3
                    className="mt-1 font-semibold"
                    style={{
                      fontSize: "var(--sz-h3)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                    }}
                  >
                    {d.title}
                  </h3>
                  <p
                    className="mt-2 text-ink-2 max-w-[640px]"
                    style={{ fontSize: "var(--sz-body)", lineHeight: 1.45 }}
                  >
                    {d.desc}
                  </p>
                </div>
              );
              })}
            </div>

            <div className="carousel-content__nav">
              <div className="flex gap-1 rounded-full border border-line bg-bg-soft p-1">
                {DEMOS.map((d, i) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => scrollToSlide(i)}
                    aria-pressed={i === active}
                    className={`h-8 px-4 rounded-full text-[12.5px] font-medium transition-all duration-150 whitespace-nowrap ${
                      i === active
                        ? "bg-ink text-bg shadow-sm"
                        : "text-ink-3 hover:text-ink"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous demo"
                  onClick={() => goTo(active - 1)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg text-ink-2 transition-colors hover:border-ink-4 hover:text-ink"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Next demo"
                  onClick={() => goTo(active + 1)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg text-ink-2 transition-colors hover:border-ink-4 hover:text-ink"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="ai-scroll-progress"
          aria-hidden
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>
    </div>
    </section>
  );
}

export function BellaAISection() {
  return (
    <section id="bella" className="bg-bg border-b border-line">
      <div className="page-wrap bella-section">
        <div className="bella-panel">
          <div className="bella-panel__copy">
            <Eyebrow>AI Assistant · Bella</Eyebrow>
            <h2
              className="mt-5"
              style={{
                fontSize: "var(--sz-h1)",
                fontWeight: 640,
                letterSpacing: "-0.04em",
                lineHeight: 0.98,
                textWrap: "balance",
              }}
            >
              Talk to{" "}
              <em className="italic font-[520] text-sds-accent">Bella.</em>
            </h2>
            <p
              className="mt-5 font-semibold text-ink"
              style={{
                fontSize: "var(--sz-h3)",
                letterSpacing: "-0.022em",
                lineHeight: 1.15,
                maxWidth: "22ch",
              }}
            >
              Your dispatch copilot — ask, assign, alert.
            </p>
            <p
              className="mt-4 text-ink-3"
              style={{ fontSize: "var(--sz-body)", lineHeight: 1.5, maxWidth: "32ch" }}
            >
              Fleet, loads, drivers, revenue — in plain English.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {["Live fleet context", "Acts on answers", "No dashboards"].map((tag) => (
                <span
                  key={tag}
                  className="text-[12px] font-medium py-1.5 px-3 rounded-full border border-line bg-bg text-ink-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bella-panel__chat">
            <p className="bella-panel__chat-label">Live demo</p>
            <div className="bella-chat-wrap">
              <AIChatDemo mobile />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
