"use client";

import { useState } from "react";
import { Industries } from "./industries";
import { AIDeepDive } from "./ai-deep-dive";

export function IndustriesWithDeepDive() {
  const [activeIndustry, setActiveIndustry] = useState<string | null>("trucking");

  const handleToggle = (id: string) => {
    setActiveIndustry((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <Industries activeId={activeIndustry} onToggle={handleToggle} />
      <AIDeepDive activeIndustry={activeIndustry} />
    </>
  );
}
