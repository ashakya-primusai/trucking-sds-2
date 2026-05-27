"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image, { type StaticImageData } from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { AIChatDemo } from "./ai-chat-demo";

import screenshotDashboard from "@/assets/screenshots/load_dashboard.png";
import screenshotLoadMgmt from "@/assets/screenshots/load_management.png";
import screenshotTracking from "@/assets/screenshots/load_tracking.png";
import screenshotLeads from "@/assets/screenshots/lead_management.png";
import screenshotCreateLead from "@/assets/screenshots/create_lead.png";
import screenshotComms from "@/assets/screenshots/communication_hub.png";
import screenshotScheduling from "@/assets/screenshots/scheduling.png";
import screenshotPdUpdates from "@/assets/screenshots/p&dupdates.png";

function ScreenshotSlide({
  src,
  alt,
  priority = false,
}: {
  src: StaticImageData;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="screenshot-slide h-full w-full">
      <Image
        src={src}
        alt={alt}
        fill
        placeholder="blur"
        priority={priority}
        className="screenshot-slide__img rounded-2xl"
        sizes="(max-width: 768px) 100vw, 900px"
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
    label: "Lead Management",
    tag: "Sales pipeline",
    title: "No lead falls through the cracks.",
    desc: "Track every opportunity from discovery through agreement. Priority, stage, rate, and customer — all at a glance.",
    screenshot: screenshotLeads,
  },
  {
    id: "create-lead",
    label: "Create Lead",
    tag: "Faster intake",
    title: "New leads in seconds, not spreadsheets.",
    desc: "Capture customer, route, equipment, and rate details in one form — ready for negotiation and dispatch.",
    screenshot: screenshotCreateLead,
  },
  {
    id: "comms",
    label: "Comm Hub",
    tag: "Unified messaging",
    title: "Every conversation, one inbox.",
    desc: "Clients, carriers, drivers — all channels flow in one hub. AI summarizes context, flags urgency, and suggests responses.",
    screenshot: screenshotComms,
  },
  {
    id: "scheduling",
    label: "Scheduling",
    tag: "Smart planning",
    title: "Plan pickups and deliveries with confidence.",
    desc: "Visual scheduling across drivers and windows — see conflicts before they become late loads.",
    screenshot: screenshotScheduling,
  },
  {
    id: "pd-updates",
    label: "P&D Updates",
    tag: "Pickup & delivery",
    title: "Stop-level visibility in real time.",
    desc: "Pickup and delivery updates flow in automatically — status, exceptions, and proof tied to every stop.",
    screenshot: screenshotPdUpdates,
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
            <div className="demo-frame">
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
                    <ScreenshotSlide src={d.screenshot} alt={d.label} priority={i === 0} />
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
              <div className="carousel-content__nav-pills overflow-x-auto max-w-full pb-1 -mx-1 px-1">
              <div className="flex gap-1 rounded-full border border-line bg-bg-soft p-1 w-max min-w-0">
                {DEMOS.map((d, i) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => scrollToSlide(i)}
                    aria-pressed={i === active}
                    className={`h-8 px-3 sm:px-4 rounded-full text-[11px] sm:text-[12.5px] font-medium transition-all duration-150 whitespace-nowrap ${
                      i === active
                        ? "bg-ink text-bg shadow-sm"
                        : "text-ink-3 hover:text-ink"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
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
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2v16M6 6c0-1.66 1.79-3 4-3s4 1.34 4 3-1.79 3-4 3-4 1.34-4 3 1.79 3 4 3 4-1.34 4-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    problem: "Loads going silent",
    solution: "Monitors every shipment",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    problem: "Driver assignment delays",
    solution: "Dispatches the right driver",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 13l2-6h10l2 6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <rect x="3" y="13" width="14" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="6" cy="17" r="1.5" fill="currentColor"/>
        <circle cx="14" cy="17" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    problem: "Inbox overflow",
    solution: "Replies around the clock",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 6v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export function BellaAISection() {
  return (
    <section id="bella" className="bg-bg-soft border-b border-line">
      <div className="page-wrap bella-section">
        <Reveal variant="scale" className="bella-panel w-full">

          {/* Top: heading row — text left, chat right on desktop; stacked on mobile */}
          <div className="bella-panel__top">
            <div className="bella-panel__copy">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-2 h-2 rounded-full bg-sds-accent" style={{ animation: "pulse-dot 1.8s ease-out infinite" }} />
                <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-3">AI&nbsp;Assistant</span>
              </div>
              <h2
                style={{
                  fontSize: "clamp(44px, 5.5vw, 80px)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                }}
              >
                <em className="not-italic text-ink">Bella</em>{" "}
                <em className="italic font-[500] text-sds-accent">AI.</em>
              </h2>
              <p className="mt-4 text-ink-2 leading-relaxed max-w-[30ch]" style={{ fontSize: "clamp(14px, 1.2vw, 17px)" }}>
                The problems eating your margin — Bella solves them automatically.
              </p>
            </div>

            <div className="bella-panel__chat">
              <div className="bella-chat-wrap bella-chat-float">
                <AIChatDemo mobile />
              </div>
            </div>
          </div>

          {/* Bottom: capability cards grid */}
          <div className="bella-caps-grid">
            {BELLA_CAPABILITIES.map((cap) => (
              <div key={cap.solution} className="bella-cap-card group">
                <span className="bella-cap-icon">
                  {cap.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] text-ink-4 font-mono line-through leading-tight">{cap.problem}</p>
                  <p className="text-[14px] font-medium text-ink leading-tight mt-0.5">{cap.solution}</p>
                </div>
              </div>
            ))}
          </div>

        </Reveal>
      </div>
    </section>
  );
}
