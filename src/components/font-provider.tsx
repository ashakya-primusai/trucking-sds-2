"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { FONTS, type FontId } from "@/lib/fonts";

type FontContextValue = {
  fontId: FontId;
  setFontId: (id: FontId) => void;
};

const STORAGE_KEY = "sds-heading-font";
const DEFAULT: FontId = "geist";

const FontContext = createContext<FontContextValue | null>(null);

export function FontProvider({ children }: { children: ReactNode }) {
  const [fontId, setFontIdState] = useState<FontId>(DEFAULT);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as FontId | null;
    if (stored && FONTS.some((f) => f.id === stored)) setFontIdState(stored);
  }, []);

  useEffect(() => {
    const font = FONTS.find((f) => f.id === fontId) ?? FONTS[0];
    document.documentElement.style.setProperty(
      "--font-heading",
      `var(${font.cssVar})`,
    );
  }, [fontId]);

  const setFontId = (id: FontId) => {
    setFontIdState(id);
    localStorage.setItem(STORAGE_KEY, id);
  };

  return (
    <FontContext.Provider value={{ fontId, setFontId }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFontSwitcher() {
  const ctx = useContext(FontContext);
  if (!ctx) throw new Error("useFontSwitcher must be used within FontProvider");
  return ctx;
}
