import { Eyebrow } from "@/components/ui/eyebrow";

export function Testimonial() {
  return (
    <section id="customers" style={{ paddingBlock: "clamp(96px, 10vh, 128px)" }}>
      <div className="page-wrap">
        <figure className="max-w-[1000px]">
          <Eyebrow>Customer · 40-truck fleet · Houston</Eyebrow>
          <blockquote
            className="mt-6 text-ink"
            style={{
              fontSize: "var(--sz-h3)",
              lineHeight: 1.25,
              fontWeight: 460,
              letterSpacing: "-0.02em",
              textWrap: "balance",
            }}
          >
            &ldquo;The AI matching alone saved us two hours a day. It just knows
            which driver fits which load. I don&apos;t know how I ran 40 trucks
            without it.&rdquo;
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full border border-line relative overflow-hidden"
              style={{
                background: `repeating-linear-gradient(135deg, var(--bg-soft) 0 14px, var(--bg-card) 14px 28px)`,
              }}
            >
              <span className="absolute inset-0 grid place-items-center font-mono text-[10px] tracking-[0.08em] uppercase text-ink-3">
                // photo
              </span>
            </div>
            <div>
              <div className="font-semibold text-[14.5px]">
                Fleet dispatcher
              </div>
              <div className="text-[13px] text-ink-3">
                Texas-based carrier
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
