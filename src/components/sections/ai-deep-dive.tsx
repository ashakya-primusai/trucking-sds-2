"use client";

import { useRef, useEffect, useCallback } from "react";
import Image, { type StaticImageData } from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { AIChatDemo } from "./ai-chat-demo";
import { MOBILE_PREVIEWS } from "./ai-mobile-previews";

import screenshotDashboard from "@/assets/screenshots/load_dashboard.png";
import screenshotLoadMgmt from "@/assets/screenshots/load_management.png";
import screenshotTracking from "@/assets/screenshots/load_tracking.png";
import screenshotLeads from "@/assets/screenshots/lead_management.png";
import screenshotCreateLead from "@/assets/screenshots/create_lead.png";
import screenshotComms from "@/assets/screenshots/communication_hub.png";
import screenshotScheduling from "@/assets/screenshots/scheduling.png";
import screenshotPdUpdates from "@/assets/screenshots/p&dupdates.png";

import lDashboard from "@/assets/last_mile/l_dashboard.png";
import lLoadDashboard from "@/assets/last_mile/l_load_dashboard.png";
import lLoadMgmt from "@/assets/last_mile/l_load_management.png";
import lTracking from "@/assets/last_mile/l_load_tracking.png";
import lDriverAssign from "@/assets/last_mile/l_driver_assignment.png";
import lComms from "@/assets/last_mile/l_communication.png";
import lBudget from "@/assets/last_mile/l_budget.png";
import lDocs from "@/assets/last_mile/l_documents.png";

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
    id: "leads",
    label: "Lead Management",
    tag: "Sales pipeline",
    title: "No lead falls through the cracks.",
    desc: "Track every opportunity from discovery through agreement. Priority, stage, rate, and customer — all at a glance.",
    screenshot: screenshotLeads,
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

];

const LASTMILE_DEMOS = [
  {
    id: "lm-ops-dashboard",
    label: "Operations",
    tag: "Command center",
    title: "Your delivery pulse at a glance.",
    desc: "Active loads, stuck deliveries, critical messages, and driver status — everything you need to run the day from one screen.",
    screenshot: lLoadDashboard,
  },
  {
    id: "lm-live-map",
    label: "Live Map",
    tag: "Fleet visibility",
    title: "Every driver, every route, one map.",
    desc: "Track your entire fleet in real time — see who's en route, who's delayed, and where every delivery stands across all zones.",
    screenshot: lDashboard,
  },

  {
    id: "lm-route-mgmt",
    label: "Route Management",
    tag: "Full lifecycle",
    title: "Every route, pickup to proof.",
    desc: "Manage loads from creation through delivery. Track stages, assign drivers, and monitor rates — all in one table view.",
    screenshot: lLoadMgmt,
  },
  {
    id: "lm-assign",
    label: "Driver Assignment",
    tag: "AI-powered matching",
    title: "The right driver, every time.",
    desc: "AI recommends the best driver based on location, HOS, and route efficiency. Select a load, review options, assign in one click.",
    screenshot: lDriverAssign,
  },
  {
    id: "lm-comms",
    label: "Communication",
    tag: "Unified messaging",
    title: "All channels, one hub.",
    desc: "Email, WhatsApp, SMS — every conversation in one place. AI summarizes threads, flags urgency, and drafts replies.",
    screenshot: lComms,
  },
];

const ALL_INDUSTRIES = [
  { key: "trucking", slides: DEMOS },
  { key: "last-mile", slides: LASTMILE_DEMOS },
] as const;

export function AIDeepDive({ activeIndustry }: { activeIndustry: string | null }) {
  const slides = ALL_INDUSTRIES.find((ind) => ind.key === activeIndustry)?.slides ?? DEMOS;
  const isVisible = activeIndustry !== null;
  const sectionRef = useRef<HTMLElement>(null);
  // Refs keyed per industry so they persist across switches
  const demoSlidesRef = useRef<Record<string, (HTMLDivElement | null)[]>>({});
  const copySlidesRef = useRef<Record<string, (HTMLDivElement | null)[]>>({});
  const dotsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const pillsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ progress: 0, active: 0 });
  const count = slides.length;
  const industryKey = activeIndustry ?? "trucking";

  const scrollToSlide = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      if (!section) return;
      const clamped = Math.max(0, Math.min(count - 1, index));
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const scrollable = section.offsetHeight - window.innerHeight;
      const target =
        sectionTop + (count <= 1 ? 0 : (clamped / (count - 1)) * scrollable);
      window.scrollTo({ top: target, behavior: "smooth" });
    },
    [count],
  );

  const goTo = useCallback(
    (index: number) => {
      scrollToSlide((index + count) % count);
    },
    [count, scrollToSlide],
  );

  // On industry switch, scroll to top of section to reset to slide 0 (skip initial mount)
  const hasMountedRef = useRef(false);
  useEffect(() => {
    if (!isVisible) return;
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: sectionTop, behavior: "smooth" });
  }, [isVisible, activeIndustry]);

  useEffect(() => {
    if (!isVisible) return;
    const section = sectionRef.current;
    if (!section) return;
    let snapTimer: ReturnType<typeof setTimeout> | null = null;
    let isSnapping = false;
    let rafId: number | null = null;
    const currentKey = industryKey;

    const PILL_BASE = "h-8 px-3 sm:px-4 rounded-full text-[11px] sm:text-[12.5px] font-medium transition-all duration-150 whitespace-nowrap";

    // Toggle visibility of industry slide sets
    for (const ind of ALL_INDUSTRIES) {
      const isActive = ind.key === currentKey;
      const dSlides = demoSlidesRef.current[ind.key] ?? [];
      const cSlides = copySlidesRef.current[ind.key] ?? [];
      for (const el of dSlides) {
        if (el) el.style.visibility = isActive ? "visible" : "hidden";
      }
      for (const el of cSlides) {
        if (el) el.style.visibility = isActive ? "visible" : "hidden";
      }
    }

    const getSectionTop = () => section.getBoundingClientRect().top + window.scrollY;

    const getProgress = () => {
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return 0;
      return Math.min(1, Math.max(0, (window.scrollY - getSectionTop()) / scrollable));
    };

    const slideMotion = (slideProgress: number, index: number, layer: "demo" | "copy") => {
      const offset = slideProgress - index;
      const abs = Math.abs(offset);
      const fadeStart = Math.max(0, abs - 0.1) / 0.4;
      const opacity = Math.max(0, 1 - fadeStart);

      if (layer === "demo") {
        return { opacity, translateY: offset * -14, scale: 0.97 + opacity * 0.03 };
      }
      return { opacity, translateY: offset * 20, scale: 0.98 + opacity * 0.02 };
    };

    const applyStyles = (progress: number) => {
      const slideProgress = progress * (count - 1);
      const active = Math.min(count - 1, Math.round(slideProgress));
      stateRef.current = { progress, active };

      const demos = demoSlidesRef.current[currentKey] ?? [];
      const copies = copySlidesRef.current[currentKey] ?? [];
      const dots = dotsRef.current;
      const pills = pillsRef.current;

      for (let i = 0; i < count; i++) {
        const dEl = demos[i];
        if (dEl) {
          const { opacity, translateY, scale } = slideMotion(slideProgress, i, "demo");
          dEl.style.cssText = `opacity:${opacity};transform:translateY(${translateY}px) scale(${scale});pointer-events:${opacity > 0.3 ? "auto" : "none"};z-index:${opacity > 0.5 ? 2 : 1}`;
          dEl.ariaHidden = String(opacity < 0.5);
        }

        const cEl = copies[i];
        if (cEl) {
          const { opacity, translateY, scale } = slideMotion(slideProgress, i, "copy");
          cEl.style.cssText = `opacity:${opacity};transform:translateY(${translateY}px) scale(${scale});pointer-events:${opacity > 0.3 ? "auto" : "none"};position:absolute;inset:0`;
          cEl.ariaHidden = String(opacity < 0.5);
        }

        const dot = dots[i];
        if (dot) {
          const fill = Math.max(0, 1 - Math.abs(slideProgress - i));
          dot.style.width = `${6 + fill * 18}px`;
          dot.style.background = fill > 0.4 ? "var(--sds-accent)" : "var(--line)";
          dot.style.opacity = String(0.35 + fill * 0.65);
        }

        const pill = pills[i];
        if (pill) {
          pill.className = i === active
            ? `${PILL_BASE} bg-ink text-bg shadow-sm`
            : `${PILL_BASE} text-ink-3 hover:text-ink hidden sm:block`;
        }
      }

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const snapToNearest = () => {
      const progress = getProgress();
      if (progress <= 0 || progress >= 1) return;
      const slidePos = progress * (count - 1);
      const nearest = Math.round(slidePos);
      if (Math.abs(slidePos - nearest) < 0.08) return;
      isSnapping = true;
      const sectionTop = getSectionTop();
      const scrollable = section.offsetHeight - window.innerHeight;
      const target = sectionTop + (count <= 1 ? 0 : (nearest / (count - 1)) * scrollable);
      window.scrollTo({ top: target, behavior: "smooth" });
      setTimeout(() => { isSnapping = false; }, 600);
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        applyStyles(getProgress());
        if (isSnapping) return;
        if (snapTimer) clearTimeout(snapTimer);
        snapTimer = setTimeout(snapToNearest, 150);
      });
    };

    const initId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        applyStyles(getProgress());
      });
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(initId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (snapTimer) clearTimeout(snapTimer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isVisible, activeIndustry, industryKey, count]);

  if (!isVisible) {
    return null;
  }

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
              <div className="demo-frame">
                {/* Pre-render all industry slides; hide inactive sets */}
                {ALL_INDUSTRIES.map((ind) => {
                  const isActive = ind.key === industryKey;
                  if (!demoSlidesRef.current[ind.key]) demoSlidesRef.current[ind.key] = [];
                  return ind.slides.map((d, i) => (
                    <div
                      key={d.id}
                      ref={(el) => { demoSlidesRef.current[ind.key]![i] = el; }}
                      className="demo-slide"
                      style={{
                        opacity: isActive && i === 0 ? 1 : 0,
                        transform: "translateY(0) scale(1)",
                        pointerEvents: isActive && i === 0 ? "auto" : "none",
                        zIndex: isActive && i === 0 ? 2 : 0,
                        visibility: isActive ? "visible" : "hidden",
                      }}
                      aria-hidden={!(isActive && i === 0)}
                    >
                      {/* Desktop: screenshot */}
                      <div className="hidden sm:block h-full">
                        <ScreenshotSlide src={d.screenshot} alt={d.label} priority={i === 0} />
                      </div>
                      {/* Mobile: coded UI preview */}
                      <div className="sm:hidden h-full overflow-hidden">
                        {MOBILE_PREVIEWS[d.id] ? (
                          <div className="h-full origin-top-left" style={{ zoom: 1.35 }}>
                            <div className="h-full p-2">
                              {MOBILE_PREVIEWS[d.id]()}
                            </div>
                          </div>
                        ) : (
                          <ScreenshotSlide src={d.screenshot} alt={d.label} priority={i === 0} />
                        )}
                      </div>
                    </div>
                  ));
                })}
              </div>

              <div className="shrink-0 flex justify-center gap-2 mt-3">
                {slides.map((d, i) => (
                  <button
                    key={d.id}
                    ref={(el) => { dotsRef.current[i] = el; }}
                    type="button"
                    aria-label={`Go to ${d.label}`}
                    onClick={() => scrollToSlide(i)}
                    className="h-1.5 rounded-full"
                    style={{
                      width: i === 0 ? 24 : 6,
                      background: i === 0 ? "var(--sds-accent)" : "var(--line)",
                      opacity: i === 0 ? 1 : 0.35,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="carousel-content">
              <div className="carousel-content__slide">
                {/* Pre-render all industry copy slides; hide inactive sets */}
                {ALL_INDUSTRIES.map((ind) => {
                  const isActive = ind.key === industryKey;
                  if (!copySlidesRef.current[ind.key]) copySlidesRef.current[ind.key] = [];
                  return ind.slides.map((d, i) => (
                    <div
                      key={d.id}
                      ref={(el) => { copySlidesRef.current[ind.key]![i] = el; }}
                      className="absolute inset-0"
                      style={{
                        opacity: isActive && i === 0 ? 1 : 0,
                        transform: "translateY(0) scale(1)",
                        pointerEvents: isActive && i === 0 ? "auto" : "none",
                        visibility: isActive ? "visible" : "hidden",
                      }}
                      aria-hidden={!(isActive && i === 0)}
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
                  ));
                })}
              </div>

              <div className="carousel-content__nav">
                <div className="carousel-content__nav-pills overflow-x-auto max-w-full pb-1 -mx-1 px-1">
                  <div className="flex gap-1 rounded-full border border-line bg-bg-soft p-1 w-max min-w-0">
                    {slides.map((d, i) => (
                      <button
                        key={d.id}
                        ref={(el) => { pillsRef.current[i] = el; }}
                        type="button"
                        onClick={() => scrollToSlide(i)}
                        className={`h-8 px-3 sm:px-4 rounded-full text-[11px] sm:text-[12.5px] font-medium transition-all duration-150 whitespace-nowrap ${i === 0
                          ? "bg-ink text-bg shadow-sm"
                          : "text-ink-3 hover:text-ink hidden sm:block"
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
                    onClick={() => goTo(stateRef.current.active - 1)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg text-ink-2 transition-colors hover:border-ink-4 hover:text-ink"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    aria-label="Next demo"
                    onClick={() => goTo(stateRef.current.active + 1)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg text-ink-2 transition-colors hover:border-ink-4 hover:text-ink"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={progressBarRef}
            className="ai-scroll-progress"
            aria-hidden
            style={{ transform: "scaleX(0)" }}
          />
        </div>
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
        <path d="M10 2v16M6 6c0-1.66 1.79-3 4-3s4 1.34 4 3-1.79 3-4 3-4 1.34-4 3 1.79 3 4 3 4-1.34 4-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    problem: "Loads going silent",
    solution: "Monitors every shipment",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    problem: "Driver assignment delays",
    solution: "Dispatches the right driver",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 13l2-6h10l2 6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="3" y="13" width="14" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="6" cy="17" r="1.5" fill="currentColor" />
        <circle cx="14" cy="17" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    problem: "Inbox overflow",
    solution: "Replies around the clock",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
