"use client";

import { TYPE_SCALES } from "@/lib/type-scale";
import { useTypeScale } from "./type-scale-provider";

export function TypeScaleTweaker() {
  const { scaleId, setScaleId } = useTypeScale();

  return (
    <div className="hidden md:flex items-center">
      <select
        aria-label="Text size"
        value={scaleId}
        onChange={(e) =>
          setScaleId(e.target.value as Parameters<typeof setScaleId>[0])
        }
        className="h-8 pl-3 pr-7 rounded-full border border-line bg-bg-soft text-[12px] text-ink-2 font-medium appearance-none cursor-pointer transition-colors duration-150 hover:border-ink-4 focus:outline-none focus:ring-2 focus:ring-sds-accent/30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23999' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 10px center",
        }}
      >
        {TYPE_SCALES.map((scale) => (
          <option key={scale.id} value={scale.id}>
            {scale.label}
          </option>
        ))}
      </select>
    </div>
  );
}
