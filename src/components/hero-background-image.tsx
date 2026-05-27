"use client";

import Image from "next/image";
import { useHeroBackground } from "@/components/hero-background-provider";

export function HeroBackgroundImage() {
  const { background } = useHeroBackground();

  return (
    <Image
      key={background.id}
      src={background.src}
      alt=""
      fill
      priority
      className="object-cover object-center -z-10 h-screen animate-in fade-in duration-500"
      sizes="100vw"
    />
  );
}
