"use client";

import Image from "next/image";
import { useHeroBackground } from "@/components/hero-background-provider";

export function HeroBackgroundImage() {
  const { background } = useHeroBackground();

  return (
    <div className="absolute inset-0 -z-10">
      <Image
        key={background.id}
        src={background.src}
        alt=""
        fill
        priority
        className="object-cover object-center animate-in fade-in duration-500"
        sizes="100vw"
      />
    </div>
  );
}
