import { Fragment, type CSSProperties, type ElementType } from "react";
import {
  highlightWordColor,
  highlightWordShadow,
  type HighlightTheme,
  wordFill,
} from "@/lib/scroll-highlight";

type ScrollHighlightHeadingProps = {
  words?: readonly string[];
  lines?: readonly (readonly string[])[];
  progress: number;
  theme: HighlightTheme;
  accentWords?: readonly string[];
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

function renderWord(
  word: string,
  index: number,
  wordCount: number,
  progress: number,
  theme: HighlightTheme,
  accentWords: readonly string[],
  separator: string | null,
) {
  const fill = wordFill(index, progress, wordCount);
  const accent = accentWords.includes(word);

  return (
    <Fragment key={`${word}-${index}`}>
      <span
        className="scroll-highlight__word"
        style={{
          color: highlightWordColor(fill, theme, accent),
          textShadow: highlightWordShadow(fill, theme, accent),
        }}
      >
        {word}
      </span>
      {separator}
    </Fragment>
  );
}

export function ScrollHighlightHeading({
  words,
  lines,
  progress,
  theme,
  accentWords = [],
  as: Tag = "h2",
  className,
  style,
}: ScrollHighlightHeadingProps) {
  const flatWords = lines ? lines.flat() : words ?? [];
  const wordCount = flatWords.length;

  return (
    <Tag className={className} style={style}>
      {lines
        ? lines.map((line, lineIndex) => {
            const offset = lines.slice(0, lineIndex).reduce((n, l) => n + l.length, 0);

            return (
              <Fragment key={`line-${lineIndex}`}>
                {lineIndex > 0 && <br />}
                {line.map((word, i) =>
                  renderWord(
                    word,
                    offset + i,
                    wordCount,
                    progress,
                    theme,
                    accentWords,
                    i < line.length - 1 ? " " : null,
                  ),
                )}
              </Fragment>
            );
          })
        : words?.map((word, i) =>
            renderWord(
              word,
              i,
              wordCount,
              progress,
              theme,
              accentWords,
              i < words.length - 1 ? " " : null,
            ),
          )}
    </Tag>
  );
}
