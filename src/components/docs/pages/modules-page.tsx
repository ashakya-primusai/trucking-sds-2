import {
  DocH2,
  DocLink,
  DocPageHeader,
  DocP,
  DocTable,
  DocUl,
} from "../doc-primitives";

export function ModulesPage() {
  return (
    <div className="max-w-[760px]">
      <DocPageHeader
        title="Modules"
        description="Every page in the sidebar and what it does"
      />

      <DocH2>Navigation map</DocH2>
      <DocTable
        headers={["Sidebar", "Purpose"]}
        rows={[
          ["Dashboard", "KPIs, critical messages, pipeline summary"],
          ["Leads", "Sales pipeline — list, filter, and open lead details"],
          ["Load Management", "Operational loads, documents, and actions"],
          ["Load Tracking", "Map view, routes, and stop updates"],
          ["Communication", "Unified inbox for email, WhatsApp, and Bella chat"],
          ["P&D Updates", "Pickup/delivery ETAs, delays, and issues"],
          ["Scheduling", "Calendar and load scheduling"],
          ["Driver Management", "Add and edit your driver roster"],
          ["Budget", "Cost and margin overview"],
          ["Documents", "Company document library"],
          ["Configuration", "Company, fleet, drivers, and broker setup"],
          ["Recurring Loads", "Templates for repeat lanes"],
          ["Create Lead", "Wizard to enter a new sales opportunity"],
          ["Create Load", "Wizard to enter a confirmed load directly"],
          ["Assign Load", "Match unassigned loads to available drivers"],
        ]}
      />

      <DocH2>Dashboard</DocH2>
      <DocUl
        items={[
          "Summary cards for leads, loads, and operational health",
          "Critical messages that need immediate attention",
          "Shortcuts into filtered lists",
        ]}
      />

      <DocH2>Leads</DocH2>
      <DocUl
        items={[
          "Summary filters: Total, Negotiating, Approved, Agreement Pending",
          "Search, export CSV, and filter by priority, stage, or source",
          "Open a lead for details, chat, activity, and financials",
          "Promote to load when the lead is Approved or Agreement Pending",
        ]}
      />

      <DocH2>Load Management</DocH2>
      <DocUl
        items={[
          "See stage, priority, route, and rate for every load",
          "Detail panel tabs: Details, Route Planning, Financials, Documents, Chat, Activity",
          "Notify driver via WhatsApp, close, or delete from row actions",
        ]}
      />

      <DocH2>Assign Load</DocH2>
      <DocUl
        items={[
          "Select an eligible load on the left",
          "Review ranked drivers on the right with travel time and availability",
          "Past pickups and schedule conflicts block assignment",
        ]}
      />

      <DocH2>Communication</DocH2>
      <DocUl
        items={[
          "Conversation list with unread badges",
          "Reply with AI-suggested responses and quick actions",
          "Bella tab for driver chat",
          "Floating chat widget on most pages",
        ]}
      />

      <DocH2>P&amp;D Updates</DocH2>
      <DocUl
        items={[
          "Filter active pickups, en-route, delivery, and delayed loads",
          "ETA comparison and active issues in the detail panel",
          "Jump to a conversation in Communication with one click",
        ]}
      />

      <DocH2>Configuration</DocH2>
      <DocP>
        Step-by-step company setup. See the{" "}
        <DocLink href="/docs/configuration">Configuration guide</DocLink>.
      </DocP>
    </div>
  );
}
