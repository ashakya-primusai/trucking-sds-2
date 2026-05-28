import { Logo } from "./logo";

const footerLinks = {
  Product: [
    { label: "Dispatch board", href: "#" },
    { label: "Live tracking", href: "#" },
    { label: "Auto invoicing", href: "#" },
    { label: "AI features", href: "/#ai" },
    { label: "Integrations", href: "#integrations" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Customers", href: "#customers" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Blog", href: "#" },
  ],
  "Get in touch": [
    { label: "mahluwalia@primustechnologiesai.onmicrosoft.com", href: "mailto:mahluwalia@primustechnologiesai.onmicrosoft.com" },
    { label: "System status", href: "#" },
    { label: "Docs & API", href: "#" },
    { label: "Security", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-soft" style={{ paddingBlock: "clamp(40px, 8vh, 64px)" }}>
      <div className="page-wrap">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 sm:gap-12">
          <div>
            <Logo />
            <p className="text-ink-3 max-w-[320px] mt-4 text-sm leading-relaxed">
              The AI-powered dispatch platform for modern trucking teams.
            </p>
            <div className="flex gap-4 mt-5 font-mono text-xs text-ink-3">
              <span>SOC 2</span>
              <span>·</span>
              <span>HIPAA-ready</span>
              <span>·</span>
              <span>GDPR</span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h6 className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3 mb-4 font-medium">
                {title}
              </h6>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-ink-2 text-sm hover:text-ink transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-line flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px] text-ink-3">
          <span className="font-mono text-xs">
            © 2026 Enrout.ai · All rights reserved
          </span>
          <span className="flex gap-5">
            <a href="#" className="hover:text-ink transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-ink transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-ink transition-colors">
              DPA
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
