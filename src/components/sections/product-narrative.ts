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
    title: "Juggling between tools",
    body: "Switching between your TMS, load board, accounting, and spreadsheets just to manage one load. Nothing talks to each other.",
    solutionId: "load-management",
    solutionLabel: "One load record",
  },
  {
    id: "phone-tag",
    title: "Manual status tracking",
    body: "Drivers rarely update the portal. Dispatchers spend hours calling and texting for location updates, then logging them manually.",
    solutionId: "load-tracking",
    solutionLabel: "Live map tracking",
  },
  {
    id: "stale-board",
    title: "No real-time visibility",
    body: "Most tools show you data that's already outdated. Customers are asking for updates and you're working off stale information.",
    solutionId: "dashboard",
    solutionLabel: "Live dashboard",
  },
  {
    id: "scattered-comms",
    title: "Messy communication",
    body: "Conversations happen across calls, texts, emails, and WhatsApp with no central thread. Important details get buried and follow-ups slip through.",
    solutionId: "communication",
    solutionLabel: "Unified comm hub",
  },
  {
    id: "lead-chaos",
    title: "Leads slipping away",
    body: "New opportunities come in by email and phone but there's no system to track them. Quotes go stale, follow-ups get missed, and business walks away.",
    solutionId: "lead-management",
    solutionLabel: "Lead pipeline",
  },
  {
    id: "rate-cons",
    title: "Scattered paperwork",
    body: "BOLs, rate confirmations, and PODs are spread across inboxes, shared drives, and group chats. Finding the right document for the right load takes too long.",
    solutionId: "document-management",
    solutionLabel: "Organized docs",
  },
];

export function solutionAnchor(id: SolutionId) {
  return `#${id}`;
}
