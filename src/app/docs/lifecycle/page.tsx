import { LifecyclePage } from "@/components/docs/pages/lifecycle-page";
import { DocRoute } from "@/components/docs/doc-route";

export const metadata = {
  title: "Lifecycle — EnroutAI Docs",
  description: "Lead and load checkpoint reference",
};

export default function Page() {
  return (
    <DocRoute slug="lifecycle">
      <LifecyclePage />
    </DocRoute>
  );
}
