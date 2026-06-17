import Link from "next/link";
import { DocsLayout } from "@/components/docs/docs-layout";
import { getDocCatalog } from "@/lib/enroutai-docs";

export const metadata = {
  title: "Documentation — EnroutAI",
  description:
    "EnroutAI guides for dispatchers: setup, workflows, and daily operations.",
};

export default function DocsIndexPage() {
  const catalog = getDocCatalog();

  return (
    <DocsLayout>
      <div className="max-w-[760px]">
        <h2
          className="font-semibold tracking-tight text-ink"
          style={{ fontSize: "clamp(24px, 2.5vw, 32px)", letterSpacing: "-0.02em" }}
        >
          Introduction
        </h2>
        <p
          className="mt-4 text-ink-2"
          style={{ fontSize: "var(--sz-body)", lineHeight: 1.55 }}
        >
          EnroutAI helps your team manage leads, loads, drivers, and
          customer communication from one screen. These guides walk through setup,
          how the platform and AI support your work, daily workflows, and every module
          in the app.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {catalog.map((doc) => (
            <Link
              key={doc.slug}
              href={`/docs/${doc.slug}`}
              className="group rounded-xl border border-line bg-bg-soft p-5 transition-colors hover:border-ink-4 hover:bg-bg"
            >
              <h3 className="font-semibold text-ink tracking-tight">{doc.title}</h3>
              <p className="mt-2 text-sm text-ink-3 leading-relaxed">{doc.description}</p>
              <span className="mt-4 inline-flex text-sm font-medium text-sds-accent group-hover:text-ink">
                Read →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </DocsLayout>
  );
}
