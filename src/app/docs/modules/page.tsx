import { ModulesPage } from "@/components/docs/pages/modules-page";
import { DocRoute } from "@/components/docs/doc-route";

export const metadata = {
  title: "Modules — Enrout Ops Docs",
  description: "Application pages and features",
};

export default function Page() {
  return (
    <DocRoute slug="modules">
      <ModulesPage />
    </DocRoute>
  );
}
