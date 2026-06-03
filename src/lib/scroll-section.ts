/** Shared scroll progress for tall sticky sections (bento, AI carousel, hero). */
export function getSectionScrollState(section: HTMLElement) {
  const sectionTop = section.getBoundingClientRect().top + window.scrollY;
  const scrollable = section.offsetHeight - window.innerHeight;
  const progress =
    scrollable <= 0
      ? 0
      : Math.min(1, Math.max(0, (window.scrollY - sectionTop) / scrollable));

  return { sectionTop, scrollable, progress };
}

export function scrollToSectionProgress(
  section: HTMLElement,
  progress: number,
  behavior: ScrollBehavior = "smooth",
) {
  const { sectionTop, scrollable } = getSectionScrollState(section);
  const target = sectionTop + Math.min(1, Math.max(0, progress)) * scrollable;
  window.scrollTo({ top: target, behavior });
}
