"use client";

import { useState, DragEvent } from "react";
import { Chip } from "@/components/ui/chip";

type LoadData = {
  code: string;
  lane: string;
  miles: number;
  rate: string;
  cust: string;
};

type DriverData = {
  id: string;
  name: string;
  loc: string;
  hos: string;
  status: "ok" | "warn";
  loads: string[];
};

type BoardState = {
  drivers: DriverData[];
  loads: Record<string, LoadData>;
  unassigned: string[];
};

const initial: BoardState = {
  drivers: [
    { id: "d1", name: "Johnson, J.", loc: "Memphis, TN", hos: "9h 12m", status: "ok", loads: ["l1"] },
    { id: "d2", name: "Patel, K.", loc: "Dallas, TX", hos: "6h 02m", status: "ok", loads: ["l2"] },
    { id: "d3", name: "Rivera, M.", loc: "Atlanta, GA", hos: "3h 45m", status: "warn", loads: ["l3"] },
    { id: "d4", name: "Okafor, D.", loc: "Southaven, MS", hos: "11h", status: "ok", loads: [] },
    { id: "d5", name: "Hayes, T.", loc: "Phoenix, AZ", hos: "8h 30m", status: "ok", loads: [] },
  ],
  loads: {
    l1: { code: "L-4821", lane: "MEM → CHI", miles: 532, rate: "$1,418", cust: "Acme Foods" },
    l2: { code: "L-4822", lane: "DAL → PHX", miles: 887, rate: "$2,094", cust: "NorthCo" },
    l3: { code: "L-4823", lane: "ATL → BOS", miles: 1098, rate: "$2,612", cust: "PrimeShip" },
    u1: { code: "L-4824", lane: "LAX → SFO", miles: 381, rate: "$1,012", cust: "BluePort" },
    u2: { code: "L-4825", lane: "HOU → NOL", miles: 348, rate: "$948", cust: "Acme Foods" },
    u3: { code: "L-4826", lane: "SLC → DEN", miles: 525, rate: "$1,386", cust: "CargoLine" },
  },
  unassigned: ["u1", "u2", "u3"],
};

function LoadCard({
  load,
  compact,
  onDragStart,
  onDragEnd,
  dragging,
}: {
  load: LoadData;
  compact?: boolean;
  onDragStart: (e: DragEvent) => void;
  onDragEnd?: () => void;
  dragging?: boolean;
}) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`${compact ? "p-2 px-2.5 min-w-[150px]" : "p-2.5 px-3 min-w-[180px]"} bg-bg border border-line rounded-[10px] cursor-grab active:cursor-grabbing select-none transition-all duration-150 hover:border-ink-3 hover:-translate-y-px hover:shadow-[0_6px_14px_-8px_oklch(20%_0.02_60/0.2)] ${dragging ? "opacity-45" : ""}`}
    >
      <div className="flex justify-between gap-2 items-baseline">
        <span className="font-mono text-[11px] text-ink-3">{load.code}</span>
        <span className="font-mono tabular-nums text-xs font-semibold">{load.rate}</span>
      </div>
      <div className="text-[13.5px] font-semibold mt-0.5">{load.lane}</div>
      <div className="flex justify-between gap-2 mt-1 text-[11.5px] text-ink-3">
        <span>{load.cust}</span>
        <span className="font-mono tabular-nums">{load.miles} mi</span>
      </div>
    </div>
  );
}

export function DispatchBoardDemo() {
  const [state, setState] = useState<BoardState>(initial);
  const [drag, setDrag] = useState<{ loadId: string; from: string } | null>(null);
  const [hover, setHover] = useState<string | null>(null);

  const startDrag = (loadId: string, from: string) => (e: DragEvent) => {
    setDrag({ loadId, from });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", loadId);
  };

  const onDragOver = (target: string) => (e: DragEvent) => {
    e.preventDefault();
    setHover(target);
  };

  const onDrop = (target: string) => (e: DragEvent) => {
    e.preventDefault();
    if (!drag) return;
    setState((s) => {
      const next = JSON.parse(JSON.stringify(s)) as BoardState;
      if (drag.from === "unassigned") {
        next.unassigned = next.unassigned.filter((id) => id !== drag.loadId);
      } else {
        const fd = next.drivers.find((d) => d.id === drag.from);
        if (fd) fd.loads = fd.loads.filter((id) => id !== drag.loadId);
      }
      if (target === "unassigned") {
        next.unassigned.unshift(drag.loadId);
      } else {
        const td = next.drivers.find((d) => d.id === target);
        if (td) td.loads.push(drag.loadId);
      }
      return next;
    });
    setDrag(null);
    setHover(null);
  };

  const endDrag = () => {
    setDrag(null);
    setHover(null);
  };

  return (
    <div className="h-full bg-bg-card border border-line rounded-[20px] overflow-hidden shadow-[0_24px_60px_-30px_oklch(20%_0.02_60/0.18)] flex flex-col">
      {/* Header */}
      <div className="shrink-0 flex justify-between items-end p-[18px] px-5 border-b border-line bg-bg min-h-[76px]">
        <div>
          <div className="font-mono text-[11px] text-ink-3 tracking-[0.08em] uppercase">
            Dispatch · Tue 26 May
          </div>
          <div className="text-[22px] font-semibold tracking-tight mt-1" style={{ letterSpacing: "-0.015em" }}>
            Drag loads onto drivers
          </div>
        </div>
        <div className="flex gap-2">
          <Chip status="ok">
            {state.drivers.filter((d) => d.loads.length).length}/{state.drivers.length} assigned
          </Chip>
          <Chip>{state.unassigned.length} unassigned</Chip>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-[280px_1fr] overflow-hidden">
        {/* Unassigned column */}
        <div className="border-r border-line flex flex-col min-h-0">
          <div className="flex justify-between p-3 px-4 font-mono text-[11px] tracking-[0.08em] uppercase text-ink-3 bg-bg-soft border-b border-line">
            <span>Unassigned</span>
            <span>{state.unassigned.length}</span>
          </div>
          <div
            className={`p-3.5 flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto transition-colors duration-150 ${hover === "unassigned" ? "bg-sds-accent/[0.08]" : ""}`}
            style={{ background: hover === "unassigned" ? undefined : "linear-gradient(180deg, var(--bg) 0%, var(--bg-soft) 100%)" }}
            onDragOver={onDragOver("unassigned")}
            onDragLeave={() => setHover(null)}
            onDrop={onDrop("unassigned")}
          >
            {state.unassigned.map((id) => (
              <LoadCard
                key={id}
                load={state.loads[id]}
                onDragStart={startDrag(id, "unassigned")}
                onDragEnd={endDrag}
                dragging={drag?.loadId === id}
              />
            ))}
            {state.unassigned.length === 0 && (
              <div className="text-[13px] text-ink-3 p-8 text-center">
                All loads assigned
              </div>
            )}
          </div>
        </div>

        {/* Drivers column */}
        <div className="flex flex-col min-h-0">
          <div className="flex justify-between p-3 px-4 font-mono text-[11px] tracking-[0.08em] uppercase text-ink-3 bg-bg-soft border-b border-line shrink-0">
            <span>Drivers</span>
            <span>{state.drivers.length}</span>
          </div>
          <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
            {state.drivers.map((d) => (
              <div
                key={d.id}
                className={`grid grid-cols-1 md:grid-cols-[200px_140px_1fr] gap-4 p-3.5 px-[18px] border-b border-line last:border-0 items-center min-h-[88px] transition-colors duration-150 ${hover === d.id ? "bg-sds-accent/[0.08]" : ""}`}
                onDragOver={onDragOver(d.id)}
                onDragLeave={() => setHover(null)}
                onDrop={onDrop(d.id)}
              >
                <div className="flex gap-3 items-center min-w-0">
                  <div className="w-8 h-8 rounded-full bg-bg-soft border border-line text-ink-2 grid place-items-center font-mono text-[11px] font-semibold shrink-0">
                    {d.name.split(",")[0][0]}
                    {d.name.split(",")[1]?.trim()[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-semibold whitespace-nowrap">
                      {d.name}
                    </div>
                    <div className="text-[11.5px] text-ink-3">{d.loc}</div>
                  </div>
                </div>
                <div>
                  <Chip status={d.status}>HOS {d.hos}</Chip>
                </div>
                <div className="flex gap-2 flex-wrap min-h-[56px] items-center">
                  {d.loads.length === 0 && (
                    <div className="text-xs text-ink-4 font-mono p-3.5 px-4 border border-dashed border-line rounded-lg flex-1 text-center">
                      Drop a load here
                    </div>
                  )}
                  {d.loads.map((id) => (
                    <LoadCard
                      key={id}
                      load={state.loads[id]}
                      compact
                      onDragStart={startDrag(id, d.id)}
                      onDragEnd={endDrag}
                      dragging={drag?.loadId === id}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
