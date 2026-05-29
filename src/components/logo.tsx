import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 font-semibold tracking-tight text-base"
      aria-label="Enrout AI home"
    >
      <span
        className="w-7 h-7 rounded-lg bg-ink text-bg grid place-items-center font-mono text-[10px] font-semibold"
        aria-hidden="true"
      >
        E
      </span>
      <span>
        Enrout <span className="text-sds-accent font-[520]">AI</span>
      </span>
    </Link>
  );
}
