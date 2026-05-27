import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 font-semibold tracking-tight text-base"
      aria-label="SDS Software home"
    >
      <span
        className="w-7 h-7 rounded-lg bg-ink text-bg grid place-items-center font-mono text-[11px] font-semibold"
        aria-hidden="true"
      >
        SDS
      </span>
      <span>
        SDS<span className="text-ink-3 font-[450]">·TOS</span>
      </span>
    </Link>
  );
}
