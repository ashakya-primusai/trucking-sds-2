import { HowItHelpsPage } from "@/components/docs/pages/how-it-helps-page";
import { DocRoute } from "@/components/docs/doc-route";

export const metadata = {
  title: "How Enrout Ops Helps You — Enrout Ops Docs",
  description: "What the platform and AI do for your dispatch team every day",
};

export default function Page() {
  return (
    <DocRoute slug="how-it-helps">
      <HowItHelpsPage />
    </DocRoute>
  );
}
