export type SolutionId =
  | "dashboard"
  | "load-management"
  | "load-tracking"
  | "communication"
  | "lead-management"
  | "document-management";

export type PainPoint = {
  id: string;
  title: string;
  body: string;
  solutionId: SolutionId;
  solutionLabel: string;
};

export const PAIN_POINTS: PainPoint[] = [
  {
    id: "triple-entry",
    title: "Triple data entry",
    body: "Same load goes into your TMS, load board, and accounting — separately. Change one detail, update three systems.",
    solutionId: "load-management",
    solutionLabel: "One load record",
  },
  {
    id: "phone-tag",
    title: "Status by phone tag",
    body: "Drivers skip the portal. You call, text, wait — then type it in yourself. Legacy TMS \"tracking\" is whatever you logged last.",
    solutionId: "load-tracking",
    solutionLabel: "Live map tracking",
  },
  {
    id: "stale-board",
    title: "No real-time visibility",
    body: "Other tools refresh every 15 minutes — if you're lucky. You're moving freight on yesterday's picture while customers ask where the truck is now.",
    solutionId: "dashboard",
    solutionLabel: "Live dashboard",
  },
  {
    id: "scattered-comms",
    title: "Scattered communication",
    body: "Calls, texts, emails, WhatsApp — conversations are everywhere. Context is lost, follow-ups slip, and nothing ties back to the load.",
    solutionId: "communication",
    solutionLabel: "Unified comm hub",
  },
  {
    id: "lead-chaos",
    title: "Leads fall through the cracks",
    body: "New business comes in by email and phone. Without a pipeline, quotes go stale, follow-ups are missed, and revenue walks out the door.",
    solutionId: "lead-management",
    solutionLabel: "Lead pipeline",
  },
  {
    id: "rate-cons",
    title: "Documents buried in email",
    body: "BOLs, rate cons, agreements, PODs — scattered across inboxes and folders. Matching the right doc to the right load eats hours every week.",
    solutionId: "document-management",
    solutionLabel: "Organized docs",
  },
];

export function solutionAnchor(id: SolutionId) {
  return `#${id}`;
}
