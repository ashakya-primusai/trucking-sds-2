import Link from "next/link";
import type { ReactNode } from "react";

const bodyClass = "text-ink-2";
const bodyStyle = { fontSize: "var(--sz-body)", lineHeight: 1.55 } as const;

export function DocPageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="max-w-[760px] mb-8">
      <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-sds-accent">
        {title}
      </p>
      <h2
        className="mt-2 font-semibold tracking-tight text-ink"
        style={{
          fontSize: "clamp(28px, 3vw, 40px)",
          letterSpacing: "-0.025em",
          lineHeight: 1.1,
        }}
      >
        {title}
      </h2>
      <p className={`mt-3 ${bodyClass}`} style={bodyStyle}>
        {description}
      </p>
    </header>
  );
}

export function DocH2({ children }: { children: ReactNode }) {
  return (
    <h2
      className="mt-12 mb-4 font-semibold tracking-tight text-ink border-t border-line pt-10 first:mt-0 first:border-t-0 first:pt-0"
      style={{ fontSize: "clamp(22px, 2vw, 28px)", letterSpacing: "-0.02em" }}
    >
      {children}
    </h2>
  );
}

export function DocH3({ children }: { children: ReactNode }) {
  return (
    <h3
      className="mt-8 mb-3 font-semibold tracking-tight text-ink"
      style={{ fontSize: "var(--sz-h3)", letterSpacing: "-0.015em" }}
    >
      {children}
    </h3>
  );
}

export function DocP({ children }: { children: ReactNode }) {
  return (
    <p className={`my-4 ${bodyClass}`} style={bodyStyle}>
      {children}
    </p>
  );
}

export function DocUl({ items }: { items: ReactNode[] }) {
  return (
    <ul className="my-4 list-disc pl-6 space-y-2 text-ink-2" style={bodyStyle}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function DocOl({ items }: { items: ReactNode[] }) {
  return (
    <ol className="my-4 list-decimal pl-6 space-y-2 text-ink-2" style={bodyStyle}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ol>
  );
}

export function DocCode({ children }: { children: string }) {
  return (
    <code className="font-mono text-[0.9em] bg-bg-soft border border-line rounded px-1.5 py-0.5 text-ink">
      {children}
    </code>
  );
}

export function DocPre({ children }: { children: string }) {
  return (
    <pre className="my-6 overflow-x-auto rounded-xl border border-line bg-ink text-bg p-5 font-mono text-[13px] leading-relaxed">
      <code>{children}</code>
    </pre>
  );
}

export function DocFlow({ children }: { children: string }) {
  return (
    <div className="my-6 rounded-xl border border-line bg-bg-soft px-5 py-4 font-mono text-sm text-ink-2 leading-relaxed">
      {children}
    </div>
  );
}

export function DocDivider() {
  return <hr className="my-10 border-line" />;
}

export function DocLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  if (href.startsWith("/docs/")) {
    return (
      <Link href={href} className="text-sds-accent underline underline-offset-2 hover:text-ink">
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className="text-sds-accent underline underline-offset-2 hover:text-ink"
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export function DocTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-line">
      <table className="w-full text-left text-sm">
        <thead className="bg-bg-soft border-b border-line">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-medium text-ink-2">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-line last:border-b-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-ink-2 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
