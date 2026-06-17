"use client";

import { useState, useRef, useEffect } from "react";
import { PulseDot } from "@/components/ui/pulse-dot";
import { Chip } from "@/components/ui/chip";

type Block =
  | { type: "text"; text: string }
  | { type: "typing" }
  | {
    type: "drivers";
    items: {
      name: string;
      loc: string;
      hos: string;
      miles: string;
      best?: boolean;
    }[];
  }
  | {
    type: "risks";
    items: { code: string; issue: string; sev: "warn" | "bad" }[];
  }
  | {
    type: "lane";
    code: string;
    market: string;
    yours: string;
    delta: string;
    miss: string;
  };

type Message = { who: "ai" | "user"; blocks: Block[] };

const seeds: { q: string; a: Block[] }[] = [
  {
    q: "Who's available near Memphis right now?",
    a: [
      { type: "text", text: "3 drivers within 40 miles." },
      {
        type: "drivers",
        items: [
          { name: "Johnson, J.", loc: "Memphis, TN", hos: "9h 12m", miles: "2 mi", best: true },
          { name: "Okafor, D.", loc: "Southaven, MS", hos: "6h 45m", miles: "18 mi" },
          { name: "Reyes, M.", loc: "West Memphis, AR", hos: "4h 30m", miles: "11 mi" },
        ],
      },
      { type: "text", text: "Johnson just dropped — best match for your Chicago run. Want me to assign?" },
    ],
  },
  {
    q: "Any loads at risk today?",
    a: [
      { type: "text", text: "Two at-risk loads right now:" },
      {
        type: "risks",
        items: [
          { code: "L-4821", issue: "45m behind on I-40 · weather", sev: "warn" },
          { code: "L-4814", issue: "POD pending · 11h since delivery", sev: "bad" },
        ],
      },
      { type: "text", text: "Customer for L-4821 auto-notified at 10:42. Want me to update the ETA?" },
    ],
  },
  {
    q: "What lane am I underpricing?",
    a: [
      { type: "text", text: "DAL → PHX is your biggest gap." },
      { type: "lane", code: "DAL → PHX", market: "$2.18/mi", yours: "$1.94/mi", delta: "-11%", miss: "$184 / load" },
      { type: "text", text: "You ran 32 loads on this lane last quarter — about $5.9K left on the table." },
    ],
  },
];

function ChatBlock({ block }: { block: Block }) {
  if (block.type === "text") return <p className="m-0">{block.text}</p>;

  if (block.type === "typing") {
    return (
      <div className="inline-flex gap-1 py-1">
        {[0, 1, 2].map((i) => (
          <i
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-ink-4"
            style={{
              animation: "typingDot 1.4s infinite ease-in-out both",
              animationDelay: `${i * 0.16}s`,
            }}
          />
        ))}
      </div>
    );
  }

  if (block.type === "drivers") {
    return (
      <div className="flex flex-col gap-1.5">
        {block.items.map((d, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-2.5 px-3 bg-bg-card border rounded-[10px] relative"
            style={{
              borderColor: d.best
                ? "color-mix(in oklch, var(--sds-accent) 50%, var(--line))"
                : "var(--line)",
              background: d.best
                ? "color-mix(in oklch, var(--sds-accent) 6%, var(--bg-card))"
                : "var(--bg-card)",
            }}
          >
            <div>
              <div className="font-semibold text-[13.5px]">{d.name}</div>
              <div className="text-xs text-ink-3">{d.loc} · {d.miles}</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-xs text-ink-3">HOS</div>
              <div className="font-mono tabular-nums text-[13px]">{d.hos}</div>
            </div>
            {d.best && (
              <div className="absolute -top-2 right-2.5 text-[10.5px] font-mono uppercase tracking-[0.06em] py-0.5 px-2 bg-sds-accent text-accent-fg rounded-full">
                Best match
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (block.type === "risks") {
    return (
      <div className="flex flex-col gap-1.5">
        {block.items.map((r, i) => (
          <div key={i} className="flex justify-between items-center gap-3 p-2.5 px-3 bg-bg-card border border-line rounded-[10px]">
            <div>
              <div className="font-mono text-xs text-ink-3">{r.code}</div>
              <div className="text-[13.5px] mt-0.5">{r.issue}</div>
            </div>
            <Chip status={r.sev}>{r.sev === "bad" ? "Critical" : "Behind"}</Chip>
          </div>
        ))}
      </div>
    );
  }

  if (block.type === "lane") {
    return (
      <div className="p-3.5 bg-bg-card border border-line rounded-[10px]">
        <div className="flex justify-between gap-6 items-end">
          <div>
            <div className="font-mono text-[11.5px] text-ink-3">{block.code}</div>
            <div className="text-[22px] font-semibold mt-0.5">{block.delta}</div>
            <div className="text-[12.5px] text-ink-3">{block.miss}</div>
          </div>
          <div className="grid gap-1 text-right text-[12.5px]">
            <div>Market <span className="font-mono tabular-nums text-ink">{block.market}</span></div>
            <div>You <span className="font-mono tabular-nums text-ink">{block.yours}</span></div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function ChatBubble({ who, blocks, mobile = false }: { who: "ai" | "user"; blocks: Block[]; mobile?: boolean }) {
  return (
    <div
      className={`flex items-start ${mobile ? "gap-2" : "gap-2.5"} ${who === "user" ? "justify-end" : ""}`}
      style={{ animation: "chatIn 0.35s cubic-bezier(0.2, 0.7, 0.2, 1)" }}
    >
      {who === "ai" && (
        <div
          className={`rounded-full bg-ink text-bg grid place-items-center shrink-0 ${mobile ? "w-[28px] h-[28px]" : "w-[30px] h-[30px]"
            }`}
        >
          <span className={`font-mono font-semibold ${mobile ? "text-[8px]" : "text-[7px]"}`}>E</span>
        </div>
      )}
      <div
        className={`max-w-[82%] border flex flex-col gap-2 ${mobile ? "p-3 px-3.5 text-[14px] leading-relaxed" : "p-3 px-3.5 text-[14.5px] leading-relaxed gap-3"
          }`}
        style={{
          background: who === "user" ? "var(--ink)" : "var(--bg-soft)",
          color: who === "user" ? "var(--bg)" : "var(--ink)",
          borderColor: who === "user" ? "var(--ink)" : "var(--line)",
          borderRadius:
            who === "user"
              ? "14px 14px 4px 14px"
              : "14px 14px 14px 4px",
        }}
      >
        {blocks.map((b, i) => (
          <ChatBlock key={i} block={b} />
        ))}
      </div>
    </div>
  );
}

export function AIChatDemo({ fill = false, mobile = false }: { fill?: boolean; mobile?: boolean }) {
  const [msgs, setMsgs] = useState<Message[]>([
    {
      who: "ai",
      blocks: [
        {
          type: "text",
          text: "Hey — I'm Bella AI. Ask me about your fleet, loads, drivers, or revenue. Try one of the suggestions below.",
        },
      ],
    },
  ]);
  const [pending, setPending] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [msgs, pending]);

  const ask = (q: string) => {
    if (pending) return;
    const seed = seeds.find((s) => s.q === q) || seeds[0];
    setMsgs((m) => [...m, { who: "user", blocks: [{ type: "text", text: q }] }]);
    setPending(true);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [...m, { who: "ai", blocks: seed.a }]);
      setPending(false);
    }, 900);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) ask(input.trim());
  };

  return (
    <div
      className={`bg-bg-card flex flex-col min-h-0 overflow-hidden ${mobile
        ? "h-full w-full rounded-none border-0 shadow-none"
        : fill
          ? "h-full w-full rounded-none border-0 shadow-none"
          : "border border-line rounded-[20px] shadow-[0_24px_60px_-30px_oklch(20%_0.02_60/0.18)] max-w-[580px] ml-auto"
        }`}
    >
      {/* Header */}
      <div
        className={`flex justify-between items-center border-b border-line bg-bg shrink-0 ${mobile ? "p-3.5 px-4" : "p-4 px-[18px]"
          }`}
      >
        <div className="flex items-center gap-2.5">
          <PulseDot />
          <div>
            <div className={`font-semibold ${mobile ? "text-[14px]" : "text-[13.5px]"}`}>
              BELLA AI
            </div>
            <div className={`text-ink-3 font-mono ${mobile ? "text-[11px]" : "text-[11.5px]"}`}>
              online · 42 loads
            </div>
          </div>
        </div>
        <Chip status="ok">Live</Chip>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className={`overflow-y-auto flex flex-col ${
          mobile
            ? "flex-1 min-h-0 p-4 gap-3"
            : fill
              ? "flex-1 min-h-0 p-[18px] gap-3.5"
              : "h-[440px] p-[18px] gap-3.5"
        }`}
        style={{ scrollBehavior: "smooth", scrollbarWidth: "thin" }}
      >
        {msgs.map((m, i) => (
          <ChatBubble key={i} who={m.who} blocks={m.blocks} mobile={mobile} />
        ))}
        {pending && (
          <ChatBubble who="ai" blocks={[{ type: "typing" }]} mobile={mobile} />
        )}
      </div>

      {/* Suggestions */}
      <div
        className={`shrink-0 border-t border-line bg-bg ${
          mobile
            ? "flex flex-wrap gap-2 px-4 py-3"
            : "flex gap-2 flex-wrap px-[18px] pb-3.5"
        }`}
      >
        {seeds.map((s) => (
          <button
            key={s.q}
            className={`bg-bg border border-line rounded-full text-ink-2 cursor-pointer transition-colors duration-150 hover:border-ink-3 hover:text-ink disabled:opacity-55 disabled:cursor-default ${
              mobile ? "text-[12px] py-2 px-3 leading-snug" : "text-[12.5px] py-[7px] px-3 whitespace-nowrap shrink-0"
            }`}
            onClick={() => ask(s.q)}
            disabled={pending}
          >
            {s.q}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        className={`flex gap-2 border-t border-line bg-bg shrink-0 ${mobile ? "p-3 px-4" : "p-3 px-3.5"
          }`}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder={mobile ? "Ask Bella anything…" : "Ask Enrout Ops about anything in your operation…"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={`flex-1 min-w-0 border border-line rounded-full bg-bg-card text-ink outline-none focus:border-ink-3 ${mobile ? "h-10 px-3.5 text-[14px]" : "h-10 px-3.5 text-sm"
            }`}
        />
        <button
          type="submit"
          className={`rounded-full border-0 bg-ink text-bg font-semibold grid place-items-center transition-colors duration-150 hover:bg-ink-2 disabled:opacity-50 disabled:cursor-default ${mobile ? "w-9 h-9 text-sm" : "w-10 h-10 text-base"
            }`}
          aria-label="Send"
          disabled={pending || !input.trim()}
        >
          <span aria-hidden="true">↑</span>
        </button>
      </form>
    </div>
  );
}
