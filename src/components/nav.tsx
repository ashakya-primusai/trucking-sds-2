"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";

const navLinks = [
  { href: "/about", label: "About Us", sectionId: "" },
  { href: "/#bento", label: "Product", sectionId: "bento" },
  { href: "/#industries", label: "Industries", sectionId: "industries" },
  { href: "/#ai", label: "AI", sectionId: "ai" },
  { href: "/#bella", label: "Bella", sectionId: "bella" },
] as const;

function NavLink({
  href,
  label,
  isActive,
  onNavigate,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={`font-mono text-[13px] tracking-[0.02em] font-medium px-3 py-2.5 rounded-md transition-colors duration-150 group ${
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
      {label}
      <span
        className={`ml-0.5 transition-colors duration-150 ${
          isActive ? "text-sds-accent" : "text-ink-4 group-hover:text-sds-accent"
        }`}
      >
        ]
      </span>
    </Link>
  );
}

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);

      if (!isHome) return;

      const marker = window.scrollY + window.innerHeight * 0.28;
      let current = "hero";

      for (const link of navLinks) {
        if (!link.sectionId) continue;
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
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`sticky top-0 z-50 backdrop-blur-[14px] backdrop-saturate-[160%] transition-[border-color] duration-200 border-b ${
          scrolled || menuOpen ? "border-line" : "border-transparent"
        }`}
        style={{ background: "color-mix(in oklch, var(--bg) 78%, transparent)" }}
      >
        <div className="page-wrap">
          <div className="h-14 sm:h-16 flex items-center justify-between gap-3">
            <Logo />

            <nav className="hidden lg:flex gap-1" aria-label="Primary">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  href={link.href}
                  label={link.label}
                  isActive={isHome && activeSection === link.sectionId}
                />
              ))}
            </nav>

            <div className="flex gap-2 items-center shrink-0">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-1.5 h-9 sm:h-11 px-3.5 sm:px-5 rounded-full bg-ink text-bg text-[13px] sm:text-[14.5px] font-medium tracking-tight whitespace-nowrap transition-all duration-150 hover:bg-ink-2 hover:-translate-y-px"
              >
                Contact Us
              </Link>

              <button
                type="button"
                className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-line bg-bg text-ink"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
                {menuOpen ? (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                    <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                    <path d="M3 5.5h12M3 9h12M3 12.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-40 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/20 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <div className="absolute top-14 sm:top-16 left-0 right-0 bottom-0 bg-bg border-t border-line flex flex-col overflow-y-auto">
            <nav className="flex flex-col p-4 gap-1" aria-label="Mobile primary">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  href={link.href}
                  label={link.label}
                  isActive={isHome && activeSection === link.sectionId}
                  onNavigate={closeMenu}
                />
              ))}
            </nav>

            <div className="mt-auto p-4 border-t border-line">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-1.5 h-11 px-5 rounded-full bg-ink text-bg text-[14.5px] font-medium tracking-tight whitespace-nowrap transition-all duration-150 hover:bg-ink-2 hover:-translate-y-px"
                onClick={closeMenu}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
