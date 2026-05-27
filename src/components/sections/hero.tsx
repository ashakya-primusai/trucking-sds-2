import { HeroBackgroundImage } from "@/components/hero-background-image";

export function Hero() {
  return (
    <section className="relative isolate h-screen flex flex-col items-center justify-center">
      <HeroBackgroundImage />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.50) 42%, rgba(0,0,0,0.0) 100%)",
          height: "100%",
          top: 0,
        }}
      />


      <div
        className="flex items-center justify-center overflow-hidden mb-[300px]"
        style={{ maxWidth: "var(--content-w)", paddingInline: "var(--content-px)" }}
      >
        <div className="mx-auto w-full flex items-center flex-col relative z-10 text-white">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-sm px-4 py-1.5">
            <span className="text-[14px] font-semibold tracking-[0.1em] uppercase text-white/50">What is TOS?</span>
          </div>

          <h1
            className="mt-6 font-medium text-white text-center"
            style={{
              fontSize: "var(--sz-h1)",
              fontWeight: 440,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              textWrap: "balance",
            }}
          >
            One Last TMS  For Dispatchers
          </h1>



          <p
            className="mt-6 text-white/85 text-center max-w-[900px] font-medium"
            style={{
              fontSize: "var(--sz-body)",
              lineHeight: 1.45,
              letterSpacing: "-0.005em",
            }}
          >
            The AI-powered Transport Operating System for trucking teams who
            need to move faster, with less. Dispatch, track, bill, and
            forecast — on one screen.
          </p>

          {/* <div className="flex gap-3 mt-[60px] flex-wrap justify-center" style={{ gap: "1.2em", marginTop: "1.2em" }}>
            <a
              href="#demo"
              className="inline-flex items-center gap-[calc(2*1.2)] h-[calc(44px*1.2)] px-[calc(20px*1.2)] rounded-full bg-white text-[var(--ink)] text-[17.4px] font-medium tracking-tight whitespace-nowrap transition-all duration-150 hover:bg-white/90 hover:-translate-y-px"
              style={{ fontSize: "17.4px", height: "52.8px", paddingLeft: "24px", paddingRight: "24px", gap: "2.4px" }}
            >
              Book a 20-min demo
              <span aria-hidden="true" style={{ fontSize: "120%" }}>→</span>
            </a>
            <a
              href="#trial"
              className="inline-flex items-center gap-[calc(2*1.2)] h-[calc(44px*1.2)] px-[calc(20px*1.2)] rounded-full bg-white/[0.06] text-white border border-white/40 text-[17.4px] font-medium tracking-tight whitespace-nowrap transition-all duration-150 hover:bg-white/[0.14] hover:border-white/70 hover:-translate-y-px"
              style={{ fontSize: "17.4px", height: "52.8px", paddingLeft: "24px", paddingRight: "24px", gap: "2.4px" }}
            >
              Start free trial
            </a>
          </div> */}



          {/* <div className="flex gap-3 mt-9 flex-wrap justify-center">
            <a
              href="#demo"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white text-[var(--ink)] text-[14.5px] font-medium tracking-tight whitespace-nowrap transition-all duration-150 hover:bg-white/90 hover:-translate-y-px"
            >
              Book a 20-min demo
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#trial"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white/[0.06] text-white border border-white/40 text-[14.5px] font-medium tracking-tight whitespace-nowrap transition-all duration-150 hover:bg-white/[0.14] hover:border-white/70 hover:-translate-y-px"
            >
              Start free trial
            </a>
          </div> */}

          {/* <div className="flex flex-wrap gap-x-7 gap-y-3 mt-7 text-[13.5px] text-white/75">
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex gap-0.5 text-sds-accent">
                ★★★★★
              </span>
              <span>
                <b className="text-white/90">4.8</b> on G2 · 240+ reviews
              </span>
            </span>
            <span>14-day trial, no credit card</span>
            <span>SOC 2 Type II</span>
          </div> */}

        </div>
      </div>
    </section>
  );
}
