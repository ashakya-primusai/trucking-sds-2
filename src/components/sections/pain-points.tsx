"use client";

import { useState } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { PAIN_POINTS, solutionAnchor } from "./product-narrative";

function PainPointCard({ point, index }: { point: (typeof PAIN_POINTS)[number]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={index * 70} variant="up">
      <article className="pain-point-card border-r border-b border-line bg-bg h-full">
        {/* Desktop: always expanded */}
        <div className="hidden sm:flex flex-col gap-3.5 p-7 pb-9 h-full">
          <span className="font-mono text-[11.5px] text-ink-3 tracking-[0.08em]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className="font-semibold tracking-tight"
            style={{ fontSize: "var(--sz-h3)", letterSpacing: "-0.015em" }}
          >
            {point.title}
          </h3>
          <p className="text-ink-2 text-[15px] leading-relaxed m-0">
            {point.body}
          </p>
          <Link
            href={solutionAnchor(point.solutionId)}
            className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-3 hover:text-sds-accent transition-colors duration-150 group"
          >
            <span className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-sds-accent/80 group-hover:text-sds-accent">
              {point.solutionLabel}
            </span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* Mobile: collapsible accordion */}
        <div className="sm:hidden">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
            aria-expanded={open}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-mono text-[11px] text-ink-3 tracking-[0.08em] shrink-0">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3
                className="font-semibold tracking-tight text-[17px]"
                style={{ letterSpacing: "-0.015em" }}
              >
                {point.title}
              </h3>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={`shrink-0 text-ink-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            >
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div
            className="grid transition-[grid-template-rows] duration-200 ease-out"
            style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <div className="px-5 pb-5 flex flex-col gap-3">
                <p className="text-ink-2 text-[14px] leading-relaxed m-0">
                  {point.body}
                </p>
                <Link
                  href={solutionAnchor(point.solutionId)}
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-3"
                >
                  <span className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-sds-accent/80">
                    {point.solutionLabel}
                  </span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function PainPoints() {
  return (
    <section id="pain" className="scroll-mt-16" style={{ paddingBlock: "clamp(64px, 8vh, 128px)" }}>
      <div className="page-wrap">
        <Reveal className="mb-14">
          <Eyebrow>Without Enrout.ai</Eyebrow>
          <h2
            className="mt-4 max-w-[720px]"
            style={{
              fontSize: "var(--sz-h2)",
              fontWeight: 540,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              textWrap: "balance",
            }}
          >
            The problems with{" "}
            <em className="italic font-[460] text-ink-3">today&apos;s dispatch.</em>
          </h2>
        </Reveal>

        <div className="pain-points-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-line">
          {PAIN_POINTS.map((point, i) => (
            <PainPointCard key={point.id} point={point} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
