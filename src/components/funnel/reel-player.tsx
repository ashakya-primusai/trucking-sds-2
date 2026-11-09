"use client";

import { useRef, useState } from "react";

// Only one reel plays at a time across the page
let current: HTMLVideoElement | null = null;

export function ReelPlayer({ src, poster, title, className = "" }: { src: string; poster: string; title: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      if (current && current !== v) current.pause();
      current = v;
      v.play();
    } else {
      v.pause();
    }
  };

  return (
    <div className={`relative aspect-[9/16] overflow-hidden rounded-[28px] bg-ink shadow-[0_24px_48px_-16px_rgba(0,0,0,0.45)] ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        preload="none"
        playsInline
        controls={playing}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        className="absolute inset-0 w-full h-full object-cover"
        aria-label={title}
      />
      {!playing && (
        <button type="button" onClick={toggle} className="absolute inset-0 flex flex-col items-center justify-end gap-3 p-5 bg-gradient-to-t from-black/70 via-black/10 to-transparent text-left" aria-label={`Play: ${title}`}>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110" style={{ background: "var(--sds-accent)", boxShadow: "0 8px 24px -4px oklch(70% 0.165 55 / 0.6)" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
          </span>
          <span className="w-full text-white text-[15px] font-semibold leading-snug">{title}</span>
        </button>
      )}
    </div>
  );
}
