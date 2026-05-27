"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image, { type StaticImageData } from "next/image";
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
        className="w-full h-full object-contain object-top"
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

const BELLA_CAPABILITIES = [
  {
    problem: "Chasing rate confirmations",
    solution: "Negotiates & locks rates",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2v14M5.5 5.5C5.5 4.12 7.07 3 9 3s3.5 1.12 3.5 2.5S10.93 8 9 8s-3.5 1.12-3.5 2.5S7.07 14 9 14s3.5-1.12 3.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    problem: "Loads going silent",
    solution: "Monitors every shipment",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 9c0 0 2.5-5 7-5s7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    problem: "Driver assignment delays",
    solution: "Dispatches the right driver",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="10" width="14" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 12l2-5h10l2 5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="5.5" cy="15" r="1.5" fill="currentColor"/>
        <circle cx="12.5" cy="15" r="1.5" fill="currentColor"/>
        <path d="M9 3v4M7 5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    problem: "Inbox overflow",
    solution: "Replies around the clock",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 5.5V9l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export function BellaAISection() {
  return (
    <section id="bella" className="bg-bg border-b border-line">
      <div className="page-wrap bella-section">
        <Reveal variant="scale" className="bella-panel w-full">

          {/* Left copy */}
          <div className="bella-panel__copy">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-sds-accent" style={{ animation: "pulse-dot 1.8s ease-out infinite" }} />
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-white/40">AI Assistant</span>
            </div>

            <h2
              style={{
                fontSize: "clamp(52px, 6vw, 88px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
              }}
            >
              <span className="text-white/25 block text-[0.55em] font-[500] tracking-[-0.02em] mb-2" style={{ fontSize: "clamp(18px, 2vw, 28px)" }}>Meet</span>
              <em className="not-italic text-white">Bella</em>{" "}
              <em className="italic font-[500] text-sds-accent">AI.</em>
            </h2>

            <p className="mt-5 text-white/50 text-[15px] leading-relaxed max-w-[28ch]">
              The problems eating your margin — Bella solves them automatically.
            </p>

            <div className="mt-8 flex flex-col gap-2">
              {BELLA_CAPABILITIES.map((cap) => (
                <div key={cap.solution} className="bella-cap-card group flex items-center gap-4 rounded-xl px-4 py-3.5">
                  <span className="shrink-0 w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/60 group-hover:text-sds-accent group-hover:border-sds-accent/30 transition-colors duration-200">
                    {cap.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] text-white/35 font-mono line-through leading-none mb-0.5">{cap.problem}</p>
                    <p className="text-[14px] font-medium text-white/85 leading-none">{cap.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right chat */}
          <div className="bella-panel__chat">
            <div className="bella-chat-wrap bella-chat-float">
              <AIChatDemo mobile />
            </div>
          </div>

        </Reveal>
      </div>
    </section>
  );
}
