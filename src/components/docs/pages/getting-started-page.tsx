import {
  DocH2,
  DocOl,
  DocPageHeader,
  DocP,
  DocTable,
  DocUl,
} from "../doc-primitives";

export function GettingStartedPage() {
  return (
    <div className="max-w-[760px]">
      <DocPageHeader
        title="Getting Started"
        description="Sign in, set up your company, and start dispatching"
      />

      <DocH2>Sign in</DocH2>
      <DocOl
        items={[
          "Open Enrout Ops and go to the login page",
          "Enter your work email and click Send OTP",
          "Check your inbox for the 6-digit code, enter it, and click Verify & sign in",
          "After login you land on the Dashboard — your home screen for leads, loads, and alerts",
        ]}
      />

      <DocH2>First-time setup</DocH2>
      <DocP>
        Before creating loads or assigning drivers, complete{" "}
        <strong className="text-ink">Configuration</strong> in the sidebar. Work
        through each section and click <strong className="text-ink">Save &amp; Continue</strong>{" "}
        before moving on.
      </DocP>
      <DocOl
        items={[
          "Company Info — business details and fleet lot address",
          "Fleet — trucks and trailer types in your operation",
          "Drivers — your driver roster (required for assignment)",
          "Broker Emails — inbound broker addresses for load offers",
          "Documents — company compliance files",
          "AI Automation — how Bella handles email and chat",
        ]}
      />

      <DocH2>Recommended first steps</DocH2>
      <DocTable
        headers={["Step", "Where", "Why"]}
        rows={[
          ["1", "Configuration", "Set up company, fleet, and drivers"],
          ["2", "Driver Management", "Confirm every active driver is listed"],
          ["3", "Broker Emails", "Add at least one load broker email if you book through brokers"],
          ["4", "Leads or Create Load", "Enter your first opportunity"],
          ["5", "Assign Load", "Match an approved load to a driver"],
        ]}
      />

      <DocH2>Daily workflow at a glance</DocH2>
      <DocUl
        items={[
          "Check the Dashboard for critical messages and pipeline status",
          "Work leads in Leads — negotiate, then promote when approved",
          "Upload documents and assign drivers from Load Management",
          "Track active freight in P&D Updates and Load Tracking",
          "Handle broker and driver messages in Communication",
        ]}
      />

      <DocH2>Need help?</DocH2>
      <DocP>
        Contact your account administrator for login issues, user access, or billing.
        For product questions, reach out to{" "}
        <a
          href="mailto:info@enroutops.com"
          className="text-sds-accent underline underline-offset-2 hover:text-ink"
        >
          info@enroutops.com
        </a>
        .
      </DocP>
    </div>
  );
}
