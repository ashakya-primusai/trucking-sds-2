import type { CSSProperties, ElementType } from "react";
import { wordFill } from "@/lib/scroll-highlight";

type ScrollHighlightWordsProps = {
  words: readonly string[];
  progress: number;
  variant?: "hero" | "light";
  accentWords?: readonly string[];
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

function wordColor(
  fill: number,
  accent: boolean,
  variant: "hero" | "light",
) {
  if (variant === "hero") {
    if (accent) {
      return fill > 0.05
        ? `color-mix(in oklch, var(--sds-accent) ${fill * 100}%, rgba(255,255,255,0.22))`
        : "rgba(255,255,255,0.22)";
    }
    return `rgba(255,255,255,${0.22 + fill * 0.78})`;
  }

  if (accent) {
    return fill > 0.05
      ? `color-mix(in oklch, var(--sds-accent) ${fill * 100}%, color-mix(in oklch, var(--ink) 22%, transparent))`
      : "color-mix(in oklch, var(--ink) 22%, transparent)";
  }
  return `color-mix(in oklch, var(--ink) ${22 + fill * 78}%, transparent)`;
}

function wordShadow(fill: number, accent: boolean, variant: "hero" | "light") {
  if (fill <= 0.85) return undefined;
  if (variant === "hero") {
    return accent
      ? "0 0 48px color-mix(in oklch, var(--sds-accent) 45%, transparent)"
      : "0 0 36px rgba(255,255,255,0.12)";
  }
  return accent
    ? "0 0 32px color-mix(in oklch, var(--sds-accent) 35%, transparent)"
    : undefined;
}

export function ScrollHighlightWords({
  words,
  progress,
  variant = "light",
  accentWords = [],
  as: Tag = "span",
  className,
  style,
}: ScrollHighlightWordsProps) {
  const accentSet = new Set(accentWords);

  return (
    <Tag className={className} style={style}>
      {words.map((word, i) => {
        const fill = wordFill(i, progress, words.length);
        const accent = accentSet.has(word);

        return (
          <span
            key={`${word}-${i}`}
            className="scroll-highlight__word"
            style={{
              color: wordColor(fill, accent, variant),
              textShadow: wordShadow(fill, accent, variant),
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        );
      })}
    </Tag>
  );
}
