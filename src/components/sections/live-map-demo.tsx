"use client";

import { useEffect, useState } from "react";
import { Chip } from "@/components/ui/chip";

const cities = [
  { id: "lax", x: 110, y: 290, name: "LAX" },
  { id: "phx", x: 195, y: 305, name: "PHX" },
  { id: "slc", x: 215, y: 195, name: "SLC" },
  { id: "den", x: 305, y: 240, name: "DEN" },
  { id: "dal", x: 395, y: 335, name: "DAL" },
  { id: "hou", x: 425, y: 380, name: "HOU" },
  { id: "mem", x: 470, y: 295, name: "MEM" },
  { id: "chi", x: 510, y: 195, name: "CHI" },
  { id: "atl", x: 540, y: 320, name: "ATL" },
  { id: "nyc", x: 645, y: 195, name: "NYC" },
  { id: "bos", x: 685, y: 165, name: "BOS" },
];

const routes = [
  { id: "r1", from: "mem", to: "chi", label: "L-4821", driver: "Johnson", dur: 14 },
  { id: "r2", from: "dal", to: "phx", label: "L-4822", driver: "Patel", dur: 18 },
  { id: "r3", from: "atl", to: "bos", label: "L-4823", driver: "Rivera", dur: 20 },
  { id: "r4", from: "lax", to: "den", label: "L-4827", driver: "Hayes", dur: 22 },
];

const cityMap = Object.fromEntries(cities.map((c) => [c.id, c]));

export function LiveMapDemo() {
  const [t, setT] = useState(0);

  useEffect(() => {
    let raf: number;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setT((v) => v + dt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="h-full bg-bg-card border border-line rounded-[20px] overflow-hidden shadow-[0_24px_60px_-30px_oklch(20%_0.02_60/0.18)] flex flex-col">
      {/* Header */}
      <div className="shrink-0 flex justify-between items-end p-[18px] px-5 border-b border-line bg-bg min-h-[76px]">
        <div>
          <div className="font-mono text-[11px] text-ink-3 uppercase tracking-[0.08em]">
            Live · USA
          </div>
          <div
            className="text-[22px] font-semibold tracking-tight mt-1"
            style={{ letterSpacing: "-0.015em" }}
          >
            Know what&apos;s late before it is
          </div>
        </div>
        <div className="flex gap-2">
          <Chip status="ok">3 on time</Chip>
          <Chip status="warn">1 behind</Chip>
        </div>
      </div>

      {/* Map SVG */}
      <svg
        className="w-full flex-1 min-h-0 bg-bg-soft block"
        viewBox="0 0 780 460"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="mapgrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="var(--line)" strokeWidth="0.5" />
          </pattern>
          <radialGradient id="mapglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--sds-accent)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--sds-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="780" height="460" fill="url(#mapgrid)" />
        {/* US outline */}
        <path
          d="M70 250 Q 95 170 200 150 Q 320 130 470 145 Q 600 160 690 175 Q 720 200 705 250 Q 720 320 660 360 Q 540 410 400 405 Q 270 410 170 380 Q 85 360 70 310 Z"
          fill="none"
          stroke="var(--line)"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          opacity="0.7"
        />

        {/* Routes + Trucks */}
        {routes.map((r) => {
          const a = cityMap[r.from];
          const b = cityMap[r.to];
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2 - Math.abs(b.x - a.x) * 0.15;
          const d = `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`;
          const prog = ((t + r.id.charCodeAt(1) * 0.7) % r.dur) / r.dur;
          const u = 1 - prog;
          const px = u * u * a.x + 2 * u * prog * mx + prog * prog * b.x;
          const py = u * u * a.y + 2 * u * prog * my + prog * prog * b.y;
          const isLate = r.id === "r3";
          return (
            <g key={r.id}>
              <path d={d} fill="none" stroke="var(--line)" strokeWidth="1.5" />
              <path
                d={d}
                fill="none"
                stroke={isLate ? "var(--warn)" : "var(--sds-accent)"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${prog * 400} 400`}
              />
              <g transform={`translate(${px}, ${py})`}>
                <circle r="10" fill="url(#mapglow)" />
                <rect
                  x="-7"
                  y="-5"
                  width="14"
                  height="10"
                  rx="2"
                  fill={isLate ? "var(--warn)" : "var(--sds-accent)"}
                />
                <rect x="-5" y="-3" width="3" height="6" fill="rgba(255,255,255,.6)" />
              </g>
            </g>
          );
        })}

        {/* Cities */}
        {cities.map((c) => (
          <g key={c.id} transform={`translate(${c.x}, ${c.y})`}>
            <circle r="4" fill="var(--bg)" stroke="var(--ink-2)" strokeWidth="1.2" />
            <text
              x="7"
              y="-6"
              fontFamily="var(--font-geist-mono)"
              fontSize="9.5"
              fill="var(--ink-3)"
              style={{ letterSpacing: "0.06em" }}
            >
              {c.name}
            </text>
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="shrink-0 p-3.5 px-4 border-t border-line flex flex-col gap-2 max-h-[148px] overflow-y-auto">
        {routes.map((r) => (
          <div
            key={r.id}
            className="grid grid-cols-[70px_1fr_1fr_auto] gap-3.5 items-center text-[13px]"
          >
            <span className="font-mono text-[11px] text-ink-3">{r.label}</span>
            <span className="font-medium">{r.driver}</span>
            <span className="font-mono tabular-nums text-xs text-ink-3">
              {cityMap[r.from].name} → {cityMap[r.to].name}
            </span>
            <Chip status={r.id === "r3" ? "warn" : "ok"}>
              {r.id === "r3" ? "45m late" : "On time"}
            </Chip>
          </div>
        ))}
      </div>
    </div>
  );
}
