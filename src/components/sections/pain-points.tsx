import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { PAIN_POINTS, solutionAnchor } from "./product-narrative";

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
            This is what dispatch looks like on spreadsheets, phone calls, and{" "}
            <em className="italic font-[460] text-ink-3">legacy TMS.</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-line">
          {PAIN_POINTS.map((point, i) => (
            <Reveal key={point.id} delay={i * 70} variant="up">
              <article className="p-7 pb-9 border-r border-b border-line flex flex-col gap-3.5 bg-bg h-full">
                <span className="font-mono text-[11.5px] text-ink-3 tracking-[0.08em]">
                  {String(i + 1).padStart(2, "0")}
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
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
