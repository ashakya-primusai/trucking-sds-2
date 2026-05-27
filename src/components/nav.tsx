"use client";

import { useEffect, useState } from "react";
import { FontSwitcher } from "./font-switcher";
import { HeroBackgroundSwitcher } from "./hero-background-switcher";
import { TypeScaleTweaker } from "./type-scale-tweaker";
import { Logo } from "./logo";

const navLinks = [
  { href: "/about", label: "About Us", sectionId: "" },
  { href: "#bento", label: "Product", sectionId: "bento" },
  { href: "#industries", label: "Industries", sectionId: "industries" },
  { href: "#ai", label: "AI", sectionId: "ai" },
  { href: "#bella", label: "Bella", sectionId: "bella" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);

      const marker = window.scrollY + window.innerHeight * 0.28;
      let current = "hero";

      for (const link of navLinks) {
        const section = document.getElementById(link.sectionId);
        if (section && section.offsetTop <= marker) {
          current = link.sectionId;
        }
      }

      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-[14px] backdrop-saturate-[160%] transition-[border-color] duration-200 border-b ${
        scrolled ? "border-line" : "border-transparent"
      }`}
      style={{ background: "color-mix(in oklch, var(--bg) 78%, transparent)" }}
    >
      <div className="page-wrap">
        <div className="h-16 flex items-center justify-between gap-6">
          <a href="#hero" aria-label="SDS home">
            <Logo />
          </a>

          <nav className="hidden lg:flex gap-1" aria-label="Primary">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`font-mono text-[12.5px] tracking-[0.02em] font-medium px-2.5 py-1.5 rounded-md whitespace-nowrap transition-colors duration-150 group ${
                    isActive
                      ? "text-ink bg-bg-soft"
                      : "text-ink-2 hover:text-ink hover:bg-bg-soft"
                  }`}
                >
                  <span
                    className={`mr-0.5 transition-colors duration-150 ${
                      isActive ? "text-sds-accent" : "text-ink-4 group-hover:text-sds-accent"
                    }`}
                  >
                    [
                  </span>
                  {" "}
                  {link.label}
                  {" "}
                  <span
                    className={`ml-0.5 transition-colors duration-150 ${
                      isActive ? "text-sds-accent" : "text-ink-4 group-hover:text-sds-accent"
                    }`}
                  >
                    ]
                  </span>
                </a>
              );
            })}
          </nav>

          <div className="flex gap-2.5 items-center">
            <TypeScaleTweaker />
            <FontSwitcher />
            <HeroBackgroundSwitcher />
            <a
              href="#login"
              className="mr-1 font-mono text-[12.5px] text-ink-2 hover:text-ink transition-colors hidden sm:inline"
            >
              Sign in
            </a>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-ink text-bg text-[14.5px] font-medium tracking-tight whitespace-nowrap transition-all duration-150 hover:bg-ink-2 hover:-translate-y-px"
            >
              Book a demo
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
