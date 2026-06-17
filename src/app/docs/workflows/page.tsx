import { WorkflowsPage } from "@/components/docs/pages/workflows-page";
import { DocRoute } from "@/components/docs/doc-route";

export const metadata = {
  title: "Workflows — EnroutAI Docs",
  description: "Lead-to-delivery operational flows",
};

export default function Page() {
  return (
    <DocRoute slug="workflows">
      <WorkflowsPage />
    </DocRoute>
  );
}
