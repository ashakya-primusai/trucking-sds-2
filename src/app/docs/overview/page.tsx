import { OverviewPage } from "@/components/docs/pages/overview-page";
import { DocRoute } from "@/components/docs/doc-route";

export const metadata = {
  title: "Overview — Enrout Ops Docs",
  description: "What Enrout Ops does and how your team uses it",
};

export default function Page() {
  return (
    <DocRoute slug="overview">
      <OverviewPage />
    </DocRoute>
  );
}
