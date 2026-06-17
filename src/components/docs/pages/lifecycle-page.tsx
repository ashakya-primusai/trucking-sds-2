import {
  DocH2,
  DocPageHeader,
  DocP,
  DocTable,
  DocUl,
} from "../doc-primitives";

export function LifecyclePage() {
  return (
    <div className="max-w-[760px]">
      <DocPageHeader
        title="Lifecycle"
        description="Lead and load stages explained"
      />

      <DocP>
        Every record is either a <strong className="text-ink">lead</strong> (still in
        the sales pipeline) or a <strong className="text-ink">load</strong> (operational
        freight). The <strong className="text-ink">stage</strong> shows exactly where it
        sits and what to do next.
      </DocP>

      <DocH2>Lead stages</DocH2>
      <DocTable
        headers={["Stage", "What it means"]}
        rows={[
          ["Discovered", "Load found or identified"],
          ["Email Initiated", "Initial interest email sent"],
          ["Negotiation", "Rate or terms being negotiated"],
          ["Rejected", "Lead declined or lost"],
          ["Approved", "Load verbally or formally approved"],
          ["Agreement Pending", "Rate confirmation awaiting signature"],
        ]}
      />
      <DocP>
        <strong className="text-ink">Promote to Load</strong> is available at Approved
        or Agreement Pending. After promotion the record becomes a load at{" "}
        <strong className="text-ink">Docs Pending</strong>.
      </DocP>

      <DocH2>Load stages</DocH2>
      <DocTable
        headers={["Stage", "Typical next step"]}
        rows={[
          ["Docs Pending", "Upload rate confirmation, BOL, customs documents"],
          ["Border Approval", "Complete border crossing paperwork"],
          ["Ready to Assign", "Assign a driver"],
          ["Pickup Scheduled", "Confirm pickup window with driver"],
          ["At Pickup", "Driver at pickup location"],
          ["In Transit", "Freight en route to delivery"],
          ["Delivery Scheduled", "Confirm delivery window"],
          ["At Delivery", "Driver at delivery location"],
          ["Delivered", "Freight delivered"],
          ["Cancelled", "Load cancelled"],
          ["Closed", "Load complete and settled"],
        ]}
      />

      <DocH2>When can you assign a driver?</DocH2>
      <DocP>From the Assign Load page, loads must be at one of these stages:</DocP>
      <DocUl
        items={[
          "Docs Pending",
          "Border Approval",
          "Ready to Assign",
        ]}
      />
      <DocP>
        The load must have no driver yet, and the pickup must not be in the past.
      </DocP>

      <DocH2>Creating a lead</DocH2>
      <DocP>
        When you create a lead, choose the stage it is at today. Earlier stages
        auto-complete. Bella resumes automation from your selection. Driver assignment
        happens later — not during lead creation.
      </DocP>

      <DocH2>Creating a load directly</DocH2>
      <DocP>
        Skips the lead pipeline. The load enters operational flow ready for documents
        and dispatch.
      </DocP>

      <DocH2>Load and lead IDs</DocH2>
      <DocTable
        headers={["Type", "Format"]}
        rows={[
          ["Lead", "LEAD-XXXXXX"],
          ["Load", "LOAD-XXXXXX"],
        ]}
      />
      <DocP>
        XXXXXX is the last six characters of the record ID — use it when searching or
        referencing loads with your team.
      </DocP>
    </div>
  );
}
