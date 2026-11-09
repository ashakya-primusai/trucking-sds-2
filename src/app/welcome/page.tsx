import type { Metadata } from "next";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Welcome — Enrout Ops",
  robots: { index: false },
};

const steps = [
  "Check your email for your receipt and login link.",
  "Our team will reach out within 24 hours to set up your account.",
  "We import your drivers, trucks and customers — you start dispatching.",
];

export default function WelcomePage() {
  return (
    <main className="min-h-screen flex flex-col" style={{ background: "var(--bg-soft)" }}>
      <header className="page-wrap py-6"><Logo /></header>
      <div className="flex-1 flex items-center justify-center px-5 pb-20">
        <div className="max-w-[520px] w-full rounded-2xl border border-line bg-bg-card p-8 sm:p-12 text-center">
          <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "var(--accent-soft)" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--sds-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h1 className="mt-6 text-ink" style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 600, letterSpacing: "-0.03em" }}>
            You&apos;re in. Welcome aboard.
          </h1>
          <p className="mt-3 text-ink-3">Your payment went through. Here&apos;s what happens next:</p>
          <ol className="mt-8 flex flex-col gap-4 text-left">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-4 text-[15px] text-ink-2">
                <span className="w-7 h-7 shrink-0 rounded-full bg-ink text-white text-[13px] font-semibold flex items-center justify-center">{i + 1}</span>
                <span className="pt-0.5">{s}</span>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-[14px] text-ink-3">
            Questions? <a href="mailto:info@enroutops.com" className="text-accent-ink font-medium underline underline-offset-4">info@enroutops.com</a>
          </p>
        </div>
      </div>
    </main>
  );
}
