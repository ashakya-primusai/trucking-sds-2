import {
  DocH2,
  DocH3,
  DocPageHeader,
  DocP,
  DocTable,
  DocUl,
} from "../doc-primitives";

export function ConfigurationPage() {
  return (
    <div className="max-w-[760px]">
      <DocPageHeader
        title="Configuration"
        description="Set up your company before dispatching"
      />

      <DocP>
        Open <strong className="text-ink">Configuration</strong> from the sidebar.
        Save each section with <strong className="text-ink">Save &amp; Continue</strong>{" "}
        before moving on.
      </DocP>

      <DocH2>Settings sections</DocH2>

      <DocH3>Overview</DocH3>
      <DocP>See which setup steps are complete and jump to any section.</DocP>

      <DocH3>Company Info</DocH3>
      <DocUl
        items={[
          "Legal and operating business details",
          "Company address",
          "Fleet lot location (used for driver travel-time estimates)",
        ]}
      />

      <DocH3>Fleet</DocH3>
      <DocUl
        items={[
          "Vehicles and trailer types in your operation",
          "Helps with capacity planning and dispatch accuracy",
        ]}
      />

      <DocH3>Drivers</DocH3>
      <DocUl
        items={[
          "Driver roster — name, phone, email, and status",
          <><strong className="text-ink">Required</strong> before you can assign loads</>,
          "Drivers marked off duty or on maintenance cannot be assigned",
        ]}
      />

      <DocH3>Load Boards</DocH3>
      <DocP>Connect external load boards you use to find freight.</DocP>

      <DocH3>Broker Emails</DocH3>
      <DocP>Two types of broker email addresses:</DocP>
      <DocTable
        headers={["Type", "Purpose"]}
        rows={[
          ["Load", "Inbound load offers from brokers; used when creating a load from an existing broker"],
          ["Border", "Border-crossing related broker communication"],
        ]}
      />
      <DocP>
        You can also add broker partner companies (name, contacts, documents) for
        partners you work with regularly.
      </DocP>

      <DocH3>Documents</DocH3>
      <DocUl items={["Company compliance and operating documents", "Stored securely in your tenant library"]} />

      <DocH3>AI Automation</DocH3>
      <DocUl
        items={[
          "Controls how Bella responds to emails and chats",
          "Defines when automation runs vs. when a dispatcher takes over",
        ]}
      />

      <DocH3>Services</DocH3>
      <DocP>Optional integrations with third-party services.</DocP>

      <DocH2>Before creating loads from brokers</DocH2>
      <DocP>
        Add at least one <strong className="text-ink">load</strong> broker email under{" "}
        <strong className="text-ink">Broker Emails</strong>. That lets you select the
        broker when using <strong className="text-ink">Create Load → Existing Broker</strong>.
      </DocP>
    </div>
  );
}
