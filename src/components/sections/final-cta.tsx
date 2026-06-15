"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";

export function FinalCTA() {
  const [result, setResult] = useState("");
  const [sending, setSending] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setResult("");
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "257bb0a6-6327-4ca4-bd06-23c08f7f656c");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setSending(false);
    if (data.success) {
      setResult("success");
      event.currentTarget.reset();
    } else {
      setResult("error");
    }
  };

  const inputClass =
    "w-full h-12 px-4 rounded-xl border border-line bg-bg text-ink text-[15px] outline-none transition-all duration-200 placeholder:text-ink-4 focus:border-sds-accent focus:ring-2 focus:ring-sds-accent/20";
  const labelClass =
    "block text-[12px] font-semibold text-ink-3 uppercase tracking-wider mb-2";

  return (
    <section
      id="contact"
      className="scroll-mt-16 overflow-hidden"
      style={{
        background: "linear-gradient(168deg, var(--ink) 0%, oklch(22% 0.02 55) 100%)",
      }}
    >
      <div className="page-wrap" style={{ paddingBlock: "clamp(64px, 10vh, 120px)" }}>
        {/* Decorative grid dots */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — copy & contact info */}
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "var(--sds-accent)",
                    boxShadow: "0 0 8px var(--sds-accent)",
                  }}
                />
                <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-white/60">
                  Get in touch
                </span>
              </div>

              <h2
                style={{
                  fontSize: "clamp(32px, 4vw, 56px)",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.08,
                  color: "#fff",
                }}
              >
                Ready to transform
                <br />
                your logistics?
              </h2>

              <p
                className="mt-5 leading-relaxed max-w-[420px]"
                style={{ fontSize: "clamp(15px, 1.2vw, 18px)", color: "rgba(255,255,255,0.55)" }}
              >
                Whether you&apos;re running 5 trucks or 500, we&apos;d love to show you
                what Enrout AI can do for your operation.
              </p>
            </Reveal>

            <Reveal delay={120} variant="fade">
              <div className="mt-10 flex flex-col gap-5">
                <a
                  href="mailto:info@enroutops.com"
                  className="group flex items-center gap-4 transition-transform duration-200 hover:translate-x-1"
                >
                  <span className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-sds-accent/20 group-hover:border-sds-accent/30 transition-all duration-200">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white/50 group-hover:text-sds-accent transition-colors"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                  <div>
                    <span className="block text-[14px] font-medium text-white/90 group-hover:text-sds-accent transition-colors">
                      info@enroutops.com
                    </span>
                    <span className="block text-[12px] text-white/35 mt-0.5">
                      We respond within 24 hours
                    </span>
                  </div>
                </a>

                <a
                  href="https://enrout.ai"
                  className="group flex items-center gap-4 transition-transform duration-200 hover:translate-x-1"
                >
                  <span className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-sds-accent/20 group-hover:border-sds-accent/30 transition-all duration-200">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white/50 group-hover:text-sds-accent transition-colors"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </span>
                  <div>
                    <span className="block text-[14px] font-medium text-white/90 group-hover:text-sds-accent transition-colors">
                      Enrout AI
                    </span>
                    <span className="block text-[12px] text-white/35 mt-0.5">
                      Explore our platform
                    </span>
                  </div>
                </a>
              </div>
            </Reveal>

            {/* Trust signals */}
            <Reveal delay={200} variant="fade">
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sds-accent">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span className="text-[13px] text-white/45">Enterprise-grade security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sds-accent">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span className="text-[13px] text-white/45">No commitment required</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — form card */}
          <div>
            <Reveal delay={100}>
              <div
                className="rounded-2xl p-8 sm:p-10"
                style={{
                  background: "var(--bg-card)",
                  boxShadow:
                    "0 32px 64px -12px rgba(0,0,0,0.4), 0 0 0 1px var(--line)",
                }}
              >
                <div className="mb-7">
                  <h3
                    className="text-ink"
                    style={{
                      fontSize: "clamp(20px, 1.8vw, 26px)",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Send us a message
                  </h3>
                  <p className="text-ink-3 text-[14px] mt-1.5">
                    Fill out the form and our team will get back to you shortly.
                  </p>
                </div>

                <form onSubmit={onSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="cta-name" className={labelClass}>
                        Name
                      </label>
                      <input
                        id="cta-name"
                        name="name"
                        type="text"
                        required
                        placeholder="John Doe"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="cta-email" className={labelClass}>
                        Email
                      </label>
                      <input
                        id="cta-email"
                        name="email"
                        type="email"
                        required
                        placeholder="john@company.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cta-company" className={labelClass}>
                      Company <span className="text-ink-4 font-normal normal-case tracking-normal">(optional)</span>
                    </label>
                    <input
                      id="cta-company"
                      name="company"
                      type="text"
                      placeholder="Company name"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="cta-message" className={labelClass}>
                      Message
                    </label>
                    <textarea
                      id="cta-message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Tell us about your fleet size, current tools, and what you're looking for..."
                      className="w-full px-4 py-3 rounded-xl border border-line bg-bg text-ink text-[15px] outline-none transition-all duration-200 resize-none placeholder:text-ink-4 leading-relaxed focus:border-sds-accent focus:ring-2 focus:ring-sds-accent/20"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={sending}
                      className="group relative inline-flex items-center justify-center gap-2.5 h-12 px-8 rounded-xl text-[15px] font-semibold tracking-tight transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
                      style={{
                        background: "var(--sds-accent)",
                        color: "#fff",
                        boxShadow: "0 4px 16px -2px oklch(70% 0.165 55 / 0.35)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 8px 24px -4px oklch(70% 0.165 55 / 0.45)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 16px -2px oklch(70% 0.165 55 / 0.35)";
                      }}
                    >
                      {sending ? (
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send message
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </>
                      )}
                    </button>

                    {result === "success" && (
                      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span className="text-[13px] text-emerald-700 font-medium">
                          Sent! We&apos;ll be in touch soon.
                        </span>
                      </div>
                    )}
                    {result === "error" && (
                      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 border border-red-200">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="15" y1="9" x2="9" y2="15" />
                          <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                        <span className="text-[13px] text-red-700 font-medium">
                          Something went wrong. Please try again.
                        </span>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
