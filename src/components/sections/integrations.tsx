import { Eyebrow } from "@/components/ui/eyebrow";

const items = [
  "DAT", "Truckstop", "Samsara", "Motive", "Verizon Connect",
  "QuickBooks", "OTR Solutions", "RTS Financial", "Triumph",
  "MS Dynamics", "REST API", "Webhooks",
];

export function Integrations() {
  return (
    <section id="integrations" style={{ paddingBlock: "clamp(96px, 10vh, 128px)" }}>
      <div className="page-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-20 items-center">
          <div>
            <Eyebrow>Integrations</Eyebrow>
            <h2
              className="mt-4 max-w-[520px]"
              style={{
                fontSize: "var(--sz-h2)",
                fontWeight: 540,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                textWrap: "balance",
              }}
            >
              Plugs into your{" "}
              <em className="italic font-[460] text-ink-3">existing stack.</em>
            </h2>
            <p
              className="mt-4 max-w-[460px] text-ink-2"
              style={{
                fontSize: "var(--sz-body)",
                lineHeight: 1.45,
              }}
            >
              We meet your load boards, ELDs, factoring, and accounting where
              they already live. Open REST API + webhooks for everything else.
            </p>
            <a
              href="#docs"
              className="inline-flex items-center gap-1.5 mt-5 font-medium text-[14.5px] text-ink group"
            >
              See all integrations{" "}
              <span className="inline-block transition-transform duration-150 group-hover:translate-x-[3px]">
                →
              </span>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-l border-line">
            {items.map((it) => (
              <div
                key={it}
                className="flex items-center gap-2.5 p-4 border-r border-b border-line bg-bg text-sm text-ink-2 font-medium"
              >
                <span className="w-6 h-6 bg-bg-soft border border-line rounded-md shrink-0" />
                <span>{it}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
