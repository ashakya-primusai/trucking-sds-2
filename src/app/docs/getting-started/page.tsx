import { GettingStartedPage } from "@/components/docs/pages/getting-started-page";
import { DocRoute } from "@/components/docs/doc-route";

export const metadata = {
  title: "Getting Started — Enrout Ops Docs",
  description: "Sign in, set up your company, and start dispatching",
};

export default function Page() {
  return (
    <DocRoute slug="getting-started">
      <GettingStartedPage />
    </DocRoute>
  );
}
