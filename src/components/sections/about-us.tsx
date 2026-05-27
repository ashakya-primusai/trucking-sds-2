import { Eyebrow } from "@/components/ui/eyebrow";

export function AboutUs() {
  return (
    <section id="about" className="bg-bg-soft border-b border-line scroll-mt-16">
      <div className="page-wrap" style={{ paddingBlock: "clamp(72px, 9vh, 112px)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
          <div className="max-w-[520px]">
            <Eyebrow>About SDS</Eyebrow>
            <h2
              className="mt-4"
              style={{
                fontSize: "var(--sz-h2)",
                fontWeight: 540,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                textWrap: "balance",
              }}
            >
              Built by dispatchers, for dispatchers.
            </h2>
          </div>

          <div className="flex flex-col gap-5 max-w-[640px]">
            <p className="text-ink-2 m-0" style={{ fontSize: "var(--sz-body)", lineHeight: 1.55 }}>
              SDS Software started on the dispatch floor — not in a boardroom. We saw teams
              juggling spreadsheets, phone calls, and legacy TMS tools just to move one load.
              TOS is the system we wished existed.
            </p>
            <p className="text-ink-2 m-0" style={{ fontSize: "var(--sz-body)", lineHeight: 1.55 }}>
              Today we help trucking carriers and last-mile fleets run dispatch, tracking,
              billing, and AI-assisted decisions on one connected platform — so operators
              spend less time clicking and more time moving freight.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {["10,000+ dispatchers", "Founded 2019", "SOC 2 Type II"].map((tag) => (
                <span
                  key={tag}
                  className="text-[12px] font-medium py-1.5 px-3 rounded-full border border-line bg-bg text-ink-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
