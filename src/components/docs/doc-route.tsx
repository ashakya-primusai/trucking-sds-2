import { DocsLayout } from "@/components/docs/docs-layout";
import type { ReactNode } from "react";

export function DocRoute({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  return <DocsLayout activeSlug={slug}>{children}</DocsLayout>;
}
