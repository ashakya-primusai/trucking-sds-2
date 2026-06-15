import { FontProvider } from "@/components/font-provider";
import { HeroBackgroundProvider } from "@/components/hero-background-provider";
import { TypeScaleProvider } from "@/components/type-scale-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function AboutPage() {
  return (
    <TypeScaleProvider>
      <FontProvider>
        <HeroBackgroundProvider>
          <Nav />
          <main>
            {/* Hero */}
            <section className="content-section bg-bg border-b border-line scroll-mt-16" style={{ paddingBlock: "clamp(56px, 8vh, 140px)" }}>
              <div className="page-wrap">
                <div className="max-w-[800px]">
                  <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-sds-accent">
                    About Enrout AI
                  </span>
                  <h1
                    className="mt-4"
                    style={{
                      fontSize: "var(--sz-h1)",
                      fontWeight: 580,
                      letterSpacing: "-0.035em",
                      lineHeight: 1.05,
                      textWrap: "balance",
                    }}
                  >
                    Built by dispatchers,{" "}
                    <em className="italic font-[460] text-ink-2">for dispatchers.</em>
                  </h1>
                  <p
                    className="mt-6 text-ink-2 max-w-[640px]"
                    style={{ fontSize: "var(--sz-body)", lineHeight: 1.55 }}
                  >
                    Enrout AI started on the dispatch floor — not in a boardroom. We saw teams
                    juggling spreadsheets, phone calls, and legacy TMS tools just to move one load.
                    Enrout AI is the system we wished existed.
                  </p>
                </div>
              </div>
            </section>

            {/* Our Story */}
            <section className="content-section bg-bg-soft border-b border-line" style={{ paddingBlock: "clamp(64px, 8vh, 112px)" }}>
              <div className="page-wrap">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                  <div>
                    <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-sds-accent">
                      Our Story
                    </span>
                    <h2
                      className="mt-4"
                      style={{
                        fontSize: "var(--sz-h2)",
                        fontWeight: 540,
                        letterSpacing: "-0.025em",
                        lineHeight: 1.1,
                      }}
                    >
                      From the dispatch floor to the product.
                    </h2>
                  </div>
                  <div className="flex flex-col gap-5">
                    <p className="text-ink-2 m-0" style={{ fontSize: "var(--sz-body)", lineHeight: 1.55 }}>
                      We started as dispatchers ourselves — running loads, chasing paperwork, and
                      watching good teams burn out on bad tools. The TMS market was full of software
                      built by people who had never sat in a dispatch chair.
                    </p>
                    <p className="text-ink-2 m-0" style={{ fontSize: "var(--sz-body)", lineHeight: 1.55 }}>
                      So we built what we needed: a platform that handles the entire lifecycle of a
                      load — from lead discovery and rate negotiation to dispatch, tracking, communication,
                      document management, and settlement. All connected. All on one screen.
                    </p>
                    <p className="text-ink-2 m-0" style={{ fontSize: "var(--sz-body)", lineHeight: 1.55 }}>
                      Today, Enrout AI powers trucking carriers and last-mile fleets across
                      North America. Our AI assistant Bella handles negotiation, communication,
                      and monitoring around the clock — so operators spend less time clicking and
                      more time moving freight.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Numbers */}
            <section className="content-section bg-bg border-b border-line" style={{ paddingBlock: "clamp(64px, 8vh, 112px)" }}>
              <div className="page-wrap">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { value: "10,000+", label: "Dispatchers on the platform" },
                    { value: "Founded 2019", label: "Built from real dispatch experience" },
                    { value: "$1.8B+", label: "Freight moved through Enrout AI" },
                    { value: "99.99%", label: "Platform uptime" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div
                        className="font-semibold text-ink"
                        style={{ fontSize: "var(--sz-h2)", letterSpacing: "-0.025em" }}
                      >
                        {stat.value}
                      </div>
                      <p className="mt-2 text-ink-3 text-[15px] leading-relaxed">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* What We Believe */}
            <section className="content-section bg-bg-soft border-b border-line" style={{ paddingBlock: "clamp(64px, 8vh, 112px)" }}>
              <div className="page-wrap">
                <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-sds-accent">
                  What We Believe
                </span>
                <h2
                  className="mt-4 max-w-[600px]"
                  style={{
                    fontSize: "var(--sz-h2)",
                    fontWeight: 540,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.1,
                  }}
                >
                  Principles that shape every feature we ship.
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line mt-10 border border-line">
                  {[
                    {
                      title: "Dispatchers first",
                      body: "Every feature starts with a real dispatcher problem. If it doesn't make their day easier, it doesn't ship.",
                    },
                    {
                      title: "One screen, not ten tabs",
                      body: "Context switching kills productivity. We keep everything — loads, tracking, comms, docs — in one connected view.",
                    },
                    {
                      title: "AI that acts, not just answers",
                      body: "Bella doesn't just surface data — she negotiates rates, coordinates drivers, monitors loads, and handles follow-ups autonomously.",
                    },
                    {
                      title: "Earned trust",
                      body: "SOC 2 Type II certified. Your data is encrypted, access-controlled, and never shared. We earn trust with every deployment.",
                    },
                    {
                      title: "Built for speed",
                      body: "99.99% uptime. Sub-second load times. Real-time updates. Your operation doesn't wait, and neither should your software.",
                    },
                    {
                      title: "Open & connected",
                      body: "Integrations with DAT, Truckstop, Samsara, Motive, QuickBooks, and more. REST API and webhooks for everything else.",
                    },
                  ].map((v) => (
                    <div key={v.title} className="p-7 bg-bg">
                      <h3
                        className="font-semibold tracking-tight"
                        style={{ fontSize: "var(--sz-h3)", letterSpacing: "-0.015em" }}
                      >
                        {v.title}
                      </h3>
                      <p className="mt-3 text-ink-2 text-[15px] leading-relaxed">
                        {v.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Compliance */}
            <section className="content-section bg-bg border-b border-line" style={{ paddingBlock: "clamp(64px, 8vh, 112px)" }}>
              <div className="page-wrap">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
                  <div>
                    <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-sds-accent">
                      Security & Compliance
                    </span>
                    <h2
                      className="mt-4"
                      style={{
                        fontSize: "var(--sz-h2)",
                        fontWeight: 540,
                        letterSpacing: "-0.025em",
                        lineHeight: 1.1,
                      }}
                    >
                      Your data is safe with us.
                    </h2>
                    <p className="mt-4 text-ink-2" style={{ fontSize: "var(--sz-body)", lineHeight: 1.55 }}>
                      We take security seriously because your business depends on it. Our infrastructure
                      is designed for enterprise-grade reliability and compliance.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { badge: "SOC 2", desc: "Type II certified. Annual audits by independent third parties." },
                      { badge: "HIPAA-ready", desc: "Compliant infrastructure for sensitive logistics data." },
                      { badge: "GDPR", desc: "Full data protection compliance for international operations." },
                    ].map((c) => (
                      <div key={c.badge} className="p-5 bg-bg-soft border border-line rounded-xl text-center">
                        <div className="font-mono text-[18px] font-bold text-ink">{c.badge}</div>
                        <p className="mt-2 text-[13px] text-ink-3 leading-relaxed">{c.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="content-section bg-ink text-bg" style={{ paddingBlock: "clamp(72px, 9vh, 120px)" }}>
              <div className="page-wrap text-center">
                <h2
                  style={{
                    fontSize: "var(--sz-h2)",
                    fontWeight: 540,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.1,
                  }}
                >
                  Ready to see Enrout AI in action?
                </h2>
                <p className="mt-4 text-white/60 max-w-[480px] mx-auto" style={{ fontSize: "var(--sz-body)", lineHeight: 1.5 }}>
                  Book a 15-minute demo and see how your dispatch team can move more freight with less effort.
                </p>
                <div className="mt-8 flex gap-3 justify-center flex-wrap">
                  <a
                    href="#demo"
                    className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-sds-accent text-ink text-[15px] font-semibold tracking-tight whitespace-nowrap transition-all duration-150 hover:brightness-110 hover:-translate-y-px"
                  >
                    Book a demo
                    <span aria-hidden="true">→</span>
                  </a>
                  <a
                    href="mailto:info@enroutops.com"
                    className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-white/20 text-white/80 text-[15px] font-medium tracking-tight whitespace-nowrap transition-all duration-150 hover:border-white/40 hover:text-white"
                  >
                    Contact us
                  </a>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </HeroBackgroundProvider>
      </FontProvider>
    </TypeScaleProvider>
  );
}
