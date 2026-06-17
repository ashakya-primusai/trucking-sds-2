import {
  DocH2,
  DocH3,
  DocLink,
  DocPageHeader,
  DocP,
  DocTable,
  DocUl,
} from "../doc-primitives";

export function HowItHelpsPage() {
  return (
    <div className="max-w-[760px]">
      <DocPageHeader
        title="How Enrout Ops Helps You"
        description="What the platform and AI do for your dispatch team every day"
      />

      <DocP>
        Enrout Ops is built to cut the busywork out of dispatch — fewer tabs, fewer
        missed messages, and faster decisions from lead to delivery. You stay in
        control; the software and AI handle the repetitive parts.
      </DocP>

      <DocH2>One place for the whole operation</DocH2>
      <DocUl
        items={[
          "Leads, loads, drivers, documents, and messages live in one app — not scattered across email, spreadsheets, and phone calls",
          "Every load has a clear stage so you always know what needs to happen next",
          "Dashboard highlights critical items that need attention right now",
          "Open any load or lead for route, financials, chat, and activity in a single panel",
        ]}
      />

      <DocH2>AI and automation</DocH2>
      <DocP>
        Enrout Ops uses AI where it saves you the most time — communication,
        monitoring, and early pipeline work — while you approve important decisions.
      </DocP>

      <DocH3>Lead pipeline automation</DocH3>
      <DocUl
        items={[
          "When you create a lead, pick the current stage — earlier stages auto-complete",
          "Automation resumes from that point (e.g. negotiation emails, follow-ups)",
          "Configure rules under Configuration → AI Automation",
        ]}
      />

      <DocH3>Bella — your dispatch assistant</DocH3>
      <DocUl
        items={[
          "Ask questions from the dashboard chatbot: load summaries, delayed loads, critical messages, lead stats",
          "Use quick prompts or type your own question",
          "Chat with drivers through Bella in the Communication hub",
        ]}
      />

      <DocH3>Smarter communication</DocH3>
      <DocUl
        items={[
          "Email, broker, and driver WhatsApp threads in one inbox",
          "AI-suggested replies and quick actions on conversations",
          "Draft emails faster instead of writing every response from scratch",
          "Mark threads resolved when done so nothing slips through",
        ]}
      />

      <DocH3>Broker load intake</DocH3>
      <DocP>
        Configure broker emails under Configuration → Broker Emails. Inbound load
        offers can flow into your workflow so you spend less time copying details
        manually.
      </DocP>

      <DocH2>Dispatch decisions made faster</DocH2>
      <DocTable
        headers={["Situation", "How Enrout Ops helps"]}
        rows={[
          [
            "Choosing a driver",
            "Assign Load ranks available drivers by schedule fit and travel time — no overlapping assignments",
          ],
          [
            "Tracking freight",
            "Load Tracking shows routes and stop progress on a map",
          ],
          [
            "Pickup or delivery running late",
            "P&D Updates compares original vs current ETA and surfaces driver-reported delays",
          ],
          [
            "Something urgent",
            "Critical messages on the Dashboard and Communication filters flag what needs action",
          ],
          [
            "Repeat lanes",
            "Recurring Loads templates save time on freight you run often",
          ],
        ]}
      />

      <DocH2>What you still control</DocH2>
      <DocP>
        AI suggests and automates — it does not replace your judgment on rates,
        driver choice, or customer commitments. You promote leads, assign drivers,
        approve messages, and close loads. Enrout Ops removes friction so you can focus
        on moving freight.
      </DocP>

      <DocH2>Where to start</DocH2>
      <DocUl
        items={[
          <>
            New user? See <DocLink href="/docs/getting-started">Getting Started</DocLink>
          </>,
          <>
            Daily steps? See <DocLink href="/docs/workflows">Workflows</DocLink>
          </>,
          <>
            Set up automation? See{" "}
            <DocLink href="/docs/configuration">Configuration</DocLink> → AI Automation
          </>,
        ]}
      />
    </div>
  );
}
