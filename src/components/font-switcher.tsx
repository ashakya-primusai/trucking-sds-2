"use client";

import { FONTS } from "@/lib/fonts";
import { useFontSwitcher } from "./font-provider";

export function FontSwitcher() {
  const { fontId, setFontId } = useFontSwitcher();

  return (
    <div className="hidden md:flex items-center">
      <select
        aria-label="Heading font"
        value={fontId}
        onChange={(e) => setFontId(e.target.value as Parameters<typeof setFontId>[0])}
        className="h-8 pl-3 pr-7 rounded-full border border-line bg-bg-soft text-[12px] text-ink-2 font-medium appearance-none cursor-pointer transition-colors duration-150 hover:border-ink-4 focus:outline-none focus:ring-2 focus:ring-sds-accent/30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23999' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 10px center",
        }}
      >
        {FONTS.map((font) => (
          <option key={font.id} value={font.id}>
            {font.label}
          </option>
        ))}
      </select>
    </div>
  );
}
