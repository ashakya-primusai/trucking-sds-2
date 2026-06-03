/** Scroll progress (0–1) at which headline highlight animation completes */
export const HIGHLIGHT_SCROLL_END = 0.82;

export function wordFill(
  index: number,
  progress: number,
  count: number,
  highlightEnd = HIGHLIGHT_SCROLL_END,
) {
  const p = Math.min(1, progress / highlightEnd);
  const segment = 1 / count;
  const start = index * segment;
  return Math.min(1, Math.max(0, (p - start) / segment));
}

export type HighlightTheme = "dark" | "light";

export function highlightWordColor(
  fill: number,
  theme: HighlightTheme,
  accent = false,
) {
  if (theme === "dark") {
    if (accent) {
      return fill > 0.05
        ? `color-mix(in oklch, var(--sds-accent) ${fill * 100}%, rgba(255,255,255,0.22))`
        : "rgba(255,255,255,0.22)";
    }
    return `rgba(255,255,255,${0.22 + fill * 0.78})`;
  }

  if (accent) {
    return fill > 0.05
      ? `color-mix(in oklch, var(--sds-accent) ${fill * 100}%, var(--ink-4))`
      : "var(--ink-4)";
  }
  return `color-mix(in oklch, var(--ink) ${22 + fill * 78}%, var(--ink-4))`;
}

export function highlightWordShadow(
  fill: number,
  theme: HighlightTheme,
  accent = false,
) {
  if (fill <= 0.85) return undefined;
  if (theme === "dark") {
    return accent
      ? "0 0 48px color-mix(in oklch, var(--sds-accent) 45%, transparent)"
      : "0 0 36px rgba(255,255,255,0.12)";
  }
  return accent
    ? "0 0 32px color-mix(in oklch, var(--sds-accent) 35%, transparent)"
    : undefined;
}
