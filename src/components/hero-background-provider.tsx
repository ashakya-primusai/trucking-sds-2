"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { StaticImageData } from "next/image";
import truckImg from "@/assets/truck.jpg";
import truck2Img from "@/assets/truck2.jpg";
import truck3Img from "@/assets/truck3.jpg";

export const HERO_BACKGROUNDS = [
  { id: "truck", label: "Scene 1", src: truckImg },
  { id: "truck2", label: "Scene 2", src: truck2Img },
  { id: "truck3", label: "Scene 3", src: truck3Img },
] as const;

export type HeroBackgroundId = (typeof HERO_BACKGROUNDS)[number]["id"];

type HeroBackgroundContextValue = {
  backgroundId: HeroBackgroundId;
  background: (typeof HERO_BACKGROUNDS)[number];
  setBackgroundId: (id: HeroBackgroundId) => void;
};

const STORAGE_KEY = "sds-hero-background";

const HeroBackgroundContext = createContext<HeroBackgroundContextValue | null>(
  null,
);

export function HeroBackgroundProvider({ children }: { children: ReactNode }) {
  const [backgroundId, setBackgroundIdState] =
    useState<HeroBackgroundId>("truck");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (
      stored &&
      HERO_BACKGROUNDS.some((background) => background.id === stored)
    ) {
      setBackgroundIdState(stored as HeroBackgroundId);
    }
  }, []);

  const setBackgroundId = (id: HeroBackgroundId) => {
    setBackgroundIdState(id);
    localStorage.setItem(STORAGE_KEY, id);
  };

  const background = useMemo(
    () =>
      HERO_BACKGROUNDS.find((item) => item.id === backgroundId) ??
      HERO_BACKGROUNDS[0],
    [backgroundId],
  );

  return (
    <HeroBackgroundContext.Provider
      value={{ backgroundId, background, setBackgroundId }}
    >
      {children}
    </HeroBackgroundContext.Provider>
  );
}

export function useHeroBackground() {
  const context = useContext(HeroBackgroundContext);
  if (!context) {
    throw new Error(
      "useHeroBackground must be used within HeroBackgroundProvider",
    );
  }
  return context;
}

export function getHeroBackgroundSrc(id: HeroBackgroundId): StaticImageData {
  return (
    HERO_BACKGROUNDS.find((background) => background.id === id)?.src ??
    HERO_BACKGROUNDS[0].src
  );
}
