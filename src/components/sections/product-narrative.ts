export type SolutionId =
  | "load-planning"
  | "live-stops"
  | "live-board"
  | "document-inbox"
  | "ai-dispatch"
  | "billing";

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
    solutionId: "load-planning",
    solutionLabel: "One load record",
  },
  {
    id: "phone-tag",
    title: "Status by phone tag",
    body: "Drivers skip the portal. You call, text, wait — then type it in yourself. Legacy TMS \"tracking\" is whatever you logged last.",
    solutionId: "live-stops",
    solutionLabel: "Live stop updates",
  },
  {
    id: "stale-board",
    title: "Stale dispatch board",
    body: "Other tools refresh every 15 minutes — if you're lucky. You're moving freight on yesterday's picture while customers ask where the truck is now.",
    solutionId: "live-board",
    solutionLabel: "Live fleet view",
  },
  {
    id: "rate-cons",
    title: "Rate cons in the inbox",
    body: "Signed PDFs, email threads, WhatsApp photos — nothing ties back to the load. Matching POD to invoice eats hours every week.",
    solutionId: "document-inbox",
    solutionLabel: "Linked doc inbox",
  },
  {
    id: "tribal-knowledge",
    title: "One dispatcher holds it all",
    body: "Your best person runs the board from memory and sticky notes. The software captures none of it. Scaling means cloning them — which you can't.",
    solutionId: "ai-dispatch",
    solutionLabel: "AI dispatch memory",
  },
  {
    id: "slow-billing",
    title: "Billing waits on paperwork",
    body: "Delivered Tuesday, invoiced next week. Accessorials, PODs, and rate cons live in different places — none of them talking to your TMS.",
    solutionId: "billing",
    solutionLabel: "Same-day invoicing",
  },
];

export function solutionAnchor(id: SolutionId) {
  return `#${id}`;
}
