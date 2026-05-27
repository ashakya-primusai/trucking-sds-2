"use client";

import { useState, type ReactNode } from "react";
import { DispatchBoardDemo } from "./dispatch-board-demo";
import { LiveMapDemo } from "./live-map-demo";

type Slide = {
  id: string;
  label: string;
  demo: ReactNode;
  eyebrow: string;
  title: string;
  desc: string;
};

const SLIDES: Slide[] = [
  {
    id: "dispatch",
    label: "Dispatch board",
    demo: <DispatchBoardDemo />,
    eyebrow: "02 · Smart load matching",
    title: "The best driver for every load.",
    desc: "HOS, location, load type, customer history, lane familiarity. TOS ranks every available driver against every open load — you make the call, or let it auto-assign.",
  },
  {
    id: "etas",
    label: "Predictive ETAs",
    demo: <LiveMapDemo />,
    eyebrow: "03 · Predictive ETAs",
    title: "Know what's late before it is.",
    desc: "Traffic, weather, driver patterns, customer dwell time — TOS forecasts ETAs and flags risk while there's still time to act.",
  },
];

const DEMO_HEIGHT = 580;
const CONTENT_MIN_HEIGHT = 220;

export function DemoCarousel() {
  const [active, setActive] = useState(0);

  const goTo = (index: number) => {
    setActive((index + SLIDES.length) % SLIDES.length);
  };

  return (
    <div
    >
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex gap-1 rounded-full border border-line bg-bg p-1">
          {SLIDES.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={index === active}
              className={`h-8 px-4 rounded-full text-[12.5px] font-medium transition-all duration-150 whitespace-nowrap ${index === active
                ? "bg-ink text-bg shadow-sm"
                : "text-ink-3 hover:text-ink"
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous demo"
            onClick={() => goTo(active - 1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg text-ink-2 transition-colors duration-150 hover:border-ink-4 hover:text-ink"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next demo"
            onClick={() => goTo(active + 1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg text-ink-2 transition-colors duration-150 hover:border-ink-4 hover:text-ink"
          >
            →
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div
          className="relative w-full overflow-hidden"
          style={{ height: DEMO_HEIGHT }}
        >
          {SLIDES.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-300 ${index === active
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
                }`}
              aria-hidden={index !== active}
            >
              {item.demo}
            </div>
          ))}
        </div>

        <div
          className="relative max-w-[640px]"
          style={{ minHeight: CONTENT_MIN_HEIGHT }}
        >
          {SLIDES.map((item, index) => (
            <div
              key={`${item.id}-content`}
              className={`transition-opacity duration-300 ${index === active
                ? "opacity-100"
                : "opacity-0 absolute inset-0 pointer-events-none"
                }`}
              aria-hidden={index !== active}
            >
              <span className="font-mono text-[12px] text-ink-3 tracking-[0.08em] uppercase">
                {item.eyebrow}
              </span>
              <h3
                className="mt-3"
                style={{
                  fontSize: "clamp(28px, 3vw, 40px)",
                  fontWeight: 540,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.05,
                }}
              >
                {item.title}
              </h3>
              <p
                className="mt-4 text-ink-2"
                style={{
                  fontSize: "clamp(18px, 1.5vw, 22px)",
                  lineHeight: 1.45,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {SLIDES.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Go to ${item.label}`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => setActive(index)}
            className={`h-1.5 rounded-full transition-all duration-200 ${index === active ? "w-6 bg-sds-accent" : "w-1.5 bg-line hover:bg-ink-4"
              }`}
          />
        ))}
      </div>
    </div>
  );
}
