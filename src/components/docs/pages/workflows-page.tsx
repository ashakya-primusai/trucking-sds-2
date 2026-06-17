import {
  DocDivider,
  DocFlow,
  DocH2,
  DocH3,
  DocPageHeader,
  DocP,
  DocTable,
  DocUl,
} from "../doc-primitives";

export function WorkflowsPage() {
  return (
    <div className="max-w-[760px]">
      <DocPageHeader
        title="Workflows"
        description="How to move freight from lead to delivery"
      />

      <DocH2>Standard lead-to-delivery flow</DocH2>
      <DocFlow>
        Create Lead → Negotiate → Approve → Promote to Load → Upload Documents →
        Assign Driver → Track P&amp;D → Close
      </DocFlow>

      <DocDivider />

      <DocH2>1. Create a lead</DocH2>
      <DocP>
        <strong className="text-ink">Where:</strong> Sidebar → Create Lead
      </DocP>
      <DocTable
        headers={["Wizard step", "What to enter"]}
        rows={[
          ["Customer & source", "Customer name, email, address, where the load came from, current stage, description"],
          ["Route", "Pickup and delivery stops"],
          ["Cargo", "Commodity, weight, trailer type, special requirements"],
          ["Rate", "Base rate, fuel surcharge, additional charges"],
        ]}
      />
      <DocUl
        items={[
          "You do not assign a driver when creating a lead",
          "Pick the current lifecycle stage — earlier stages auto-complete and automation picks up from there",
          "The lead appears on the Leads page",
        ]}
      />

      <DocDivider />

      <DocH2>2. Manage leads</DocH2>
      <DocP>
        <strong className="text-ink">Where:</strong> Sidebar → Leads
      </DocP>
      <DocUl
        items={[
          "Filter by stage, priority, source, or use summary cards (Negotiating, Approved, etc.)",
          "Click a row to open details, chat, activity log, and financials",
          "Export a CSV from the toolbar when needed",
        ]}
      />
      <DocH3>Promote to load</DocH3>
      <DocP>
        Available when the lead is <strong className="text-ink">Approved</strong> or{" "}
        <strong className="text-ink">Agreement Pending</strong>. Click Promote in the
        table or detail panel.
      </DocP>
      <DocUl
        items={[
          "The record becomes an operational load",
          "Stage moves to Docs Pending — ready for document upload",
        ]}
      />

      <DocDivider />

      <DocH2>3. Create a load directly</DocH2>
      <DocP>
        <strong className="text-ink">Where:</strong> Sidebar → Create Load
      </DocP>
      <DocP>
        Use when the load is already confirmed and does not need the lead pipeline.
        Source options: Personal, Existing Broker, Phone Call, Online Load Board,
        Reference, or Other. For Existing Broker, select from your configured broker
        emails or partner companies.
      </DocP>

      <DocDivider />

      <DocH2>4. Load management</DocH2>
      <DocP>
        <strong className="text-ink">Where:</strong> Sidebar → Load Management
      </DocP>
      <DocTable
        headers={["Action", "How"]}
        rows={[
          ["View details", "Click a row — panel with Details, Route, Financials, Documents, Chat, Activity"],
          ["Upload documents", "From the detail panel or Documents tab"],
          ["Assign driver", "From the detail panel"],
          ["Notify driver", "Send a WhatsApp message to the assigned driver"],
          ["Close load", "Mark the load complete"],
          ["Delete load", "Remove the record"],
        ]}
      />

      <DocDivider />

      <DocH2>5. Assign driver</DocH2>
      <DocP>
        <strong className="text-ink">Where:</strong> Sidebar → Assign Load
      </DocP>
      <DocH3>Eligible loads</DocH3>
      <DocUl
        items={[
          "Stage is Docs Pending, Border Approval, or Ready to Assign",
          "No driver assigned yet",
          "Pickup date and time are still in the future",
        ]}
      />
      <DocH3>How drivers are ranked</DocH3>
      <DocUl
        items={[
          "Drivers who fit the load's time window without overlapping other assignments",
          "Travel time from their last delivery or current location",
          "Off-duty and maintenance drivers are excluded",
        ]}
      />
      <DocP>If the pickup is in the past, no drivers will be shown.</DocP>

      <DocDivider />

      <DocH2>6. Tracking and communication</DocH2>
      <DocH3>Load Tracking</DocH3>
      <DocP>
        <strong className="text-ink">Sidebar → Load Tracking</strong> — map view, route,
        and stop-level updates.
      </DocP>
      <DocH3>P&amp;D Updates</DocH3>
      <DocUl
        items={[
          "Filter: All Active, At Pickup, En-route, At Delivery, Delayed",
          "Compare original vs current ETA",
          "Review active issues (delays, reschedule requests)",
          "Click a conversation card to open that thread in Communication",
        ]}
      />
      <DocH3>Communication</DocH3>
      <DocUl
        items={[
          "All email, WhatsApp, and Bella driver chats in one inbox",
          "Search, filter, and use quick actions on messages",
          "Mark threads resolved when done",
          "Floating chat available on most pages",
        ]}
      />

      <DocDivider />

      <DocH2>7. Recurring loads</DocH2>
      <DocP>
        <strong className="text-ink">Sidebar → Recurring Loads</strong> — save templates
        for lanes and schedules you run regularly.
      </DocP>
    </div>
  );
}
