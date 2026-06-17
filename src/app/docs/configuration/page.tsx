import { ConfigurationPage } from "@/components/docs/pages/configuration-page";
import { DocRoute } from "@/components/docs/doc-route";

export const metadata = {
  title: "Configuration — EnroutAI Docs",
  description: "Tenant setup and settings reference",
};

export default function Page() {
  return (
    <DocRoute slug="configuration">
      <ConfigurationPage />
    </DocRoute>
  );
}
