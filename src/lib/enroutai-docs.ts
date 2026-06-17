export type DocMeta = {
  slug: string;
  title: string;
  description: string;
  order: number;
};

const DOC_CATALOG: DocMeta[] = [
  {
    slug: "overview",
    title: "Overview",
    description: "What the platform does and key terms",
    order: 1,
  },
  {
    slug: "getting-started",
    title: "Getting Started",
    description: "Sign in, setup, and your first dispatch steps",
    order: 2,
  },
  {
    slug: "how-it-helps",
    title: "How EnroutAI Helps You",
    description: "AI and platform features that save dispatch time",
    order: 3,
  },
  {
    slug: "configuration",
    title: "Configuration",
    description: "Tenant setup and settings reference",
    order: 4,
  },
  {
    slug: "workflows",
    title: "Workflows",
    description: "Lead-to-delivery operational flows",
    order: 5,
  },
  {
    slug: "modules",
    title: "Modules",
    description: "Application pages and features",
    order: 6,
  },
  {
    slug: "lifecycle",
    title: "Lifecycle",
    description: "Lead and load stage reference",
    order: 7,
  },
];

export function getDocCatalog(): DocMeta[] {
  return [...DOC_CATALOG].sort((a, b) => a.order - b.order);
}

export function getDocMeta(slug: string): DocMeta | undefined {
  return DOC_CATALOG.find((d) => d.slug === slug);
}
