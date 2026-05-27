"use client";

import Image from "next/image";
import {
  HERO_BACKGROUNDS,
  useHeroBackground,
} from "@/components/hero-background-provider";

export function HeroBackgroundSwitcher() {
  const { backgroundId, setBackgroundId } = useHeroBackground();

  return (
    <div
      className="hidden md:flex items-center gap-1 rounded-full border border-line bg-bg-soft/80 p-1"
      role="group"
      aria-label="Hero background"
    >
      {HERO_BACKGROUNDS.map((background) => {
        const isActive = background.id === backgroundId;

        return (
          <button
            key={background.id}
            type="button"
            aria-label={`Use ${background.label}`}
            aria-pressed={isActive}
            onClick={() => setBackgroundId(background.id)}
            className={`relative h-8 w-11 overflow-hidden rounded-full border transition-all duration-150 ${
              isActive
                ? "border-sds-accent ring-2 ring-sds-accent/30"
                : "border-line hover:border-ink-4"
            }`}
          >
            <Image
              src={background.src}
              alt=""
              fill
              className="object-cover"
              sizes="44px"
            />
          </button>
        );
      })}
    </div>
  );
}
