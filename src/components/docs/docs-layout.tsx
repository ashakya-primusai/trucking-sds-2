import Link from "next/link";
import { FontProvider } from "@/components/font-provider";
import { HeroBackgroundProvider } from "@/components/hero-background-provider";
import { TypeScaleProvider } from "@/components/type-scale-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getDocCatalog } from "@/lib/enroutai-docs";
import { cn } from "@/lib/utils";

export function DocsLayout({
  children,
  activeSlug,
}: {
  children: React.ReactNode;
  activeSlug?: string;
}) {
  const catalog = getDocCatalog();

  return (
    <TypeScaleProvider>
      <FontProvider>
        <HeroBackgroundProvider>
          <Nav />
          <main className="flex flex-col">
            <section
              className="content-section border-b border-line bg-bg"
              style={{ paddingBlock: "clamp(40px, 6vh, 72px)" }}
            >
              <div className="page-wrap">
                <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-sds-accent">
                  Documentation
                </span>
                <h1
                  className="mt-3 max-w-[720px]"
                  style={{
                    fontSize: "clamp(36px, 4.5vw, 56px)",
                    fontWeight: 580,
                    letterSpacing: "-0.035em",
                    lineHeight: 1.05,
                  }}
                >
                  EnroutAI
                </h1>
                <p
                  className="mt-4 max-w-[640px] text-ink-2"
                  style={{ fontSize: "var(--sz-body)", lineHeight: 1.55 }}
                >
                  Guides for dispatchers and operators — setup, workflows, and daily
                  operations.
                </p>
              </div>
            </section>

            <section
              className="content-section bg-bg flex-1"
              style={{ paddingBlock: "clamp(32px, 5vh, 64px)", paddingBottom: "clamp(64px, 8vh, 96px)" }}
            >
              <div className="page-wrap h-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-10 lg:gap-16 items-start">
                  <aside className="lg:sticky lg:top-[calc(var(--nav-height)+24px)] lg:max-h-[calc(100svh-var(--nav-height)-48px)] lg:overflow-y-auto self-start">
                    <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink-3 mb-3">
                      On this site
                    </p>
                    <nav className="flex flex-col gap-1" aria-label="Documentation">
                      <Link
                        href="/docs"
                        className={cn(
                          "rounded-lg px-3 py-2 text-sm transition-colors",
                          !activeSlug
                            ? "bg-bg-soft text-ink font-medium"
                            : "text-ink-2 hover:bg-bg-soft hover:text-ink"
                        )}
                      >
                        Introduction
                      </Link>
                      {catalog.map((doc) => (
                        <Link
                          key={doc.slug}
                          href={`/docs/${doc.slug}`}
                          className={cn(
                            "rounded-lg px-3 py-2 text-sm transition-colors",
                            activeSlug === doc.slug
                              ? "bg-bg-soft text-ink font-medium"
                              : "text-ink-2 hover:bg-bg-soft hover:text-ink"
                          )}
                        >
                          {doc.title}
                        </Link>
                      ))}
                    </nav>
                  </aside>

                  <div className="min-w-0 pb-8">{children}</div>
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
