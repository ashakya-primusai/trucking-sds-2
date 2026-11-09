import type { Metadata } from "next";
import { Funnel } from "@/components/funnel/funnel";

export const metadata: Metadata = {
  title: "Get Started — Enrout Ops",
  description: "AI dispatch for trucking fleets. Plans from $20/month. Start today.",
  robots: { index: false }, // ad landing page — keep it out of search results
};

export default function GetStartedPage() {
  return <Funnel />;
}
