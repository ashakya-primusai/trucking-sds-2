"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image, { type StaticImageData } from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { AIChatDemo } from "./ai-chat-demo";

import screenshotDashboard from "@/assets/screenshots/dashboard.png";
import screenshotLoadMgmt from "@/assets/screenshots/load-management.png";
import screenshotTracking from "@/assets/screenshots/load-tracking.png";
import screenshotLeads from "@/assets/screenshots/lead-management.png";
import screenshotComms from "@/assets/screenshots/communication-hub.png";
import screenshotDocs from "@/assets/screenshots/document-management.png";

function ScreenshotSlide({ src, alt }: { src: StaticImageData; alt: string }) {
  return (
    <div className="h-full w-full rounded-[20px] overflow-hidden border border-line bg-bg-card shadow-[0_24px_60px_-30px_oklch(20%_0.02_60/0.18)]">
      <Image
        src={src}
        alt={alt}
        placeholder="blur"
        className="w-full h-full object-cover object-top"
        sizes="(max-width: 768px) 100vw, 720px"
        priority
      />
    </div>
  );
}

const DEMOS = [
  {
    id: "dashboard",
    label: "Dashboard",
    tag: "Live operations",
    title: "Everything moving, one glance.",
    desc: "Load pipelines, critical alerts, driver status, and stuck loads — your entire operation's pulse on a single screen.",
    screenshot: screenshotDashboard,
  },
  {
    id: "loads",
    label: "Load Management",
    tag: "Full lifecycle",
    title: "Every load, creation to settlement.",
    desc: "Track stages, rates, drivers, and documents for every confirmed load. Filter, search, and act — no tab switching.",
    screenshot: screenshotLoadMgmt,
  },
  {
    id: "tracking",
    label: "Load Tracking",
    tag: "Live tracking",
    title: "Know what's late before it is.",
    desc: "Routes, stops, and real-time progress on a map. Select any load to see pickup and delivery status instantly.",
    screenshot: screenshotTracking,
  },
  {
    id: "leads",
    label: "Leads",
    tag: "Sales pipeline",
    title: "No lead falls through the cracks.",
    desc: "Track every opportunity from discovery through agreement. Priority, stage, rate, and customer — all at a glance.",
    screenshot: screenshotLeads,
  },
  {
    id: "comms",
    label: "Comm Hub",
    tag: "Unified messaging",
    title: "Every conversation, one inbox.",
    desc: "Clients, carriers, drivers — all channels flow into one hub. AI summarizes context, flags urgency, and suggests responses.",
    screenshot: screenshotComms,
  },
  {
    id: "docs",
    label: "Documents",
    tag: "Organized & linked",
    title: "No more digging through email.",
    desc: "BOLs, rate confirmations, agreements, PODs — automatically parsed, organized by type, and linked to the right load.",
    screenshot: screenshotDocs,
  },
];

export function AIDeepDive() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const count = DEMOS.length;
  // Map 0→1 scroll to 0→(count-1) so each slide index lands exactly on an integer
  const slideProgress = scrollProgress * (count - 1);
  const active = Math.min(count - 1, Math.round(slideProgress));

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
    let snapTimer: ReturnType<typeof setTimeout> | null = null;
    let isSnapping = false;

    const getProgress = () => {
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return 0;
      return Math.min(1, Math.max(0, (window.scrollY - section.offsetTop) / scrollable));
    };

    const snapToNearest = () => {
      const progress = getProgress();
      // Only snap if we're actually inside the section
      if (progress <= 0 || progress >= 1) return;
      const slidePos = progress * (count - 1);
      const nearest = Math.round(slidePos);
      // Only snap if we're meaningfully between slides (not already close to one)
      if (Math.abs(slidePos - nearest) < 0.08) return;
      isSnapping = true;
      scrollToSlide(nearest);
      // Release snap lock after animation settles
      setTimeout(() => { isSnapping = false; }, 600);
    };

    const onScroll = () => {
      setScrollProgress(getProgress());
      if (isSnapping) return;
      if (snapTimer) clearTimeout(snapTimer);
      snapTimer = setTimeout(snapToNearest, 150);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (snapTimer) clearTimeout(snapTimer);
    };
  }, [count, scrollToSlide]);

  const slideMotion = (index: number, layer: "demo" | "copy" = "demo") => {
    const offset = slideProgress - index;
    const abs = Math.abs(offset);
    // Hold full opacity in center 20% of each slide's zone, then fade quickly
    const fadeStart = Math.max(0, abs - 0.1) / 0.4; // 0 until |offset|>0.1, then ramps to 1
    const opacity = Math.max(0, 1 - fadeStart);

    if (layer === "demo") {
      const scale = 0.97 + opacity * 0.03;
      const translateY = offset * -14;
      return { opacity, translateY, scale };
    }

    const translateY = offset * 20;
    const scale = 0.98 + opacity * 0.02;
    return { opacity, translateY, scale };
  };

  return (
    <section
      ref={sectionRef}
      id="ai"
      className="bg-bg border-y border-line ai-scroll-section"
      style={{ "--ai-slide-count": count } as React.CSSProperties}
    >
      <div className="ai-scroll-pin">
        <Reveal className="page-wrap section-stack">
        <div className="section-stack__column">
          <div className="demo-carousel-wrap">
            <div className="demo-frame border border-line shadow-[0_24px_60px_-30px_oklch(20%_0.02_60/0.12)]">
              {DEMOS.map((d, i) => {
                const { opacity, translateY, scale } = slideMotion(i, "demo");
                return (
                  <div
                    key={d.id}
                    className="demo-slide will-change-[transform,opacity]"
                    style={{
                      opacity,
                      transform: `translateY(${translateY}px) scale(${scale})`,
                      pointerEvents: opacity > 0.3 ? "auto" : "none",
                      zIndex: opacity > 0.5 ? 2 : 1,
                      transition: "opacity 0.15s ease-out",
                    }}
                    aria-hidden={opacity < 0.5}
                  >
                    <ScreenshotSlide src={d.screenshot} alt={d.label} />
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
                  className="will-change-[transform,opacity] absolute inset-0"
                  style={{
                    opacity,
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    pointerEvents: opacity > 0.3 ? "auto" : "none",
                    transition: "opacity 0.15s ease-out",
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
      </Reveal>
    </div>
    </section>
  );
}

export function BellaAISection() {
  return (
    <section id="bella" className="bg-bg border-b border-line">
      <div className="page-wrap bella-section">
        <Reveal variant="scale" className="bella-panel w-full">
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
              className="mt-5 text-ink-2"
              style={{ fontSize: "var(--sz-body)", lineHeight: 1.5, maxWidth: "38ch" }}
            >
              Bella AI is at the core of TruckDispatch Pro. She operates around the clock — handling negotiation, communication, coordination, and monitoring — so your team can focus on growth, not admin.
            </p>

            <ul className="mt-5 flex flex-col gap-1.5 text-ink-2" style={{ fontSize: "clamp(14px, 1.1vw, 17px)", lineHeight: 1.5 }}>
              <li>Negotiates rates within your defined floor, target, and ceiling</li>
              <li>Communicates with clients, carriers, and drivers automatically</li>
              <li>Monitors every load for delays, issues, and opportunities</li>
              <li>Surfaces critical alerts before they become problems</li>
              <li>Coordinates driver assignments based on HOS and proximity</li>
              <li>Handles follow-ups, confirmations, and document delivery</li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {["Always on", "Negotiates rates", "Monitors loads", "Coordinates drivers"].map((tag) => (
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
        </Reveal>
      </div>
    </section>
  );
}
