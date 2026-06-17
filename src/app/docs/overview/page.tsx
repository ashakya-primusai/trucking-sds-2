import { OverviewPage } from "@/components/docs/pages/overview-page";
import { DocRoute } from "@/components/docs/doc-route";

export const metadata = {
  title: "Overview — EnroutAI Docs",
  description: "What EnroutAI does and how your team uses it",
};

export default function Page() {
  return (
    <DocRoute slug="overview">
      <OverviewPage />
    </DocRoute>
  );
}
