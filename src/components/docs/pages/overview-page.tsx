import {
  DocH2,
  DocH3,
  DocPageHeader,
  DocP,
  DocTable,
  DocUl,
} from "../doc-primitives";

export function OverviewPage() {
  return (
    <div className="max-w-[760px]">
      <DocPageHeader
        title="Overview"
        description="What Enrout Ops does and how your team uses it"
      />

      <DocH2>Product summary</DocH2>
      <DocP>
        Enrout Ops helps your dispatch team run freight from first
        contact through delivery. Manage leads, convert them to loads, assign drivers,
        communicate with brokers and customers, and track pickups and deliveries — all
        in one place.
      </DocP>

      <DocH2>Core capabilities</DocH2>
      <DocTable
        headers={["Area", "What you can do"]}
        rows={[
          ["Lead management", "Track the sales pipeline from discovery through agreement"],
          ["Load management", "Run operational loads after promotion or direct entry"],
          ["Driver assignment", "Match loads to available drivers based on schedule and location"],
          ["Communication", "One inbox for email, broker, and driver conversations"],
          ["Tracking", "Live map tracking and pickup/delivery ETA monitoring"],
          ["Configuration", "Company profile, fleet, drivers, broker emails, and automation"],
          ["Automation", "Bella assists with email responses and workflow checkpoints"],
        ]}
      />

      <DocH2>Who uses the platform</DocH2>
      <DocH3>Dispatchers &amp; operators</DocH3>
      <DocP>
        Day-to-day users who create leads, manage loads, assign drivers, communicate
        with brokers and drivers, and monitor freight in transit. Everything in the
        sidebar — Leads, Load Management, Assign Load, Communication, and more — is
        built for this role.
      </DocP>

      <DocH2>Key terms</DocH2>
      <DocUl
        items={[
          <>
            <strong className="text-ink">Lead</strong> — an opportunity still in the
            sales pipeline (negotiation, approval, agreement)
          </>,
          <>
            <strong className="text-ink">Load</strong> — an operational shipment ready
            for documents, assignment, and tracking
          </>,
          <>
            <strong className="text-ink">Lifecycle checkpoint</strong> — where a lead
            or load sits in the workflow (e.g. Negotiation, Docs Pending, In Transit)
          </>,
          <>
            <strong className="text-ink">Promote</strong> — convert an approved lead
            into a load
          </>,
          <>
            <strong className="text-ink">P&amp;D</strong> — pickup and delivery
            status updates with ETA comparison
          </>,
        ]}
      />

      <DocH2>Load and lead IDs</DocH2>
      <DocTable
        headers={["Type", "How it appears"]}
        rows={[
          ["Load", "LOAD-XXXXXX (last 6 characters of the record ID)"],
          ["Lead", "LEAD-XXXXXX (last 6 characters of the record ID)"],
        ]}
      />
      <DocP>
        Use these IDs when searching lists, talking to drivers, or referencing loads
        in Communication.
      </DocP>
    </div>
  );
}
