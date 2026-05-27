"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { TYPE_SCALES, type TypeScaleId } from "@/lib/type-scale";

type TypeScaleContextValue = {
  scaleId: TypeScaleId;
  setScaleId: (id: TypeScaleId) => void;
};

const STORAGE_KEY = "sds-type-scale";
const DEFAULT: TypeScaleId = "default";

const TypeScaleContext = createContext<TypeScaleContextValue | null>(null);

export function TypeScaleProvider({ children }: { children: ReactNode }) {
  const [scaleId, setScaleIdState] = useState<TypeScaleId>(DEFAULT);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as TypeScaleId | null;
    if (stored && TYPE_SCALES.some((s) => s.id === stored)) {
      setScaleIdState(stored);
    }
  }, []);

  useEffect(() => {
    const scale = TYPE_SCALES.find((s) => s.id === scaleId) ?? TYPE_SCALES[1];
    const root = document.documentElement;
    Object.entries(scale.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  }, [scaleId]);

  const setScaleId = (id: TypeScaleId) => {
    setScaleIdState(id);
    localStorage.setItem(STORAGE_KEY, id);
  };

  return (
    <TypeScaleContext.Provider value={{ scaleId, setScaleId }}>
      {children}
    </TypeScaleContext.Provider>
  );
}

export function useTypeScale() {
  const ctx = useContext(TypeScaleContext);
  if (!ctx) throw new Error("useTypeScale must be used within TypeScaleProvider");
  return ctx;
}
