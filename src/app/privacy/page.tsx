import type { Metadata } from "next";
import { FontProvider } from "@/components/font-provider";
import { HeroBackgroundProvider } from "@/components/hero-background-provider";
import { TypeScaleProvider } from "@/components/type-scale-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Enrout Ops",
  description:
    "How Enrout Ops collects, uses, discloses, and protects personal information across our website and dispatch platform.",
};

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-line last:border-b-0 pb-12 last:pb-0">
      <h2
        className="text-ink"
        style={{
          fontSize: "var(--sz-h3)",
          fontWeight: 560,
          letterSpacing: "-0.015em",
          lineHeight: 1.2,
        }}
      >
        {title}
      </h2>
      <div
        className="mt-4 flex flex-col gap-4 text-ink-2"
        style={{ fontSize: "var(--sz-body)", lineHeight: 1.6 }}
      >
        {children}
      </div>
    </div>
  );
}

function PolicySubheading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="m-0 font-medium text-ink" style={{ fontSize: "17px", lineHeight: 1.4 }}>
      {children}
    </h3>
  );
}

const linkClass =
  "text-ink underline underline-offset-2 hover:text-sds-accent transition-colors";

export default function PrivacyPage() {
  return (
    <TypeScaleProvider>
      <FontProvider>
        <HeroBackgroundProvider>
          <Nav />
          <main>
            <section
              className="content-section bg-bg border-b border-line scroll-mt-16"
              style={{ paddingBlock: "clamp(56px, 8vh, 100px)" }}
            >
              <div className="page-wrap">
                <div className="max-w-[800px] mx-auto text-center">
                  <span className="font-mono text-[11px] tracking-widest uppercase text-sds-accent">
                    Legal
                  </span>
                  <h1
                    className="mt-4"
                    style={{
                      fontSize: "var(--sz-h1)",
                      fontWeight: 580,
                      letterSpacing: "-0.035em",
                      lineHeight: 1.05,
                      textWrap: "balance",
                    }}
                  >
                    Privacy Policy
                  </h1>
                  <p
                    className="mt-6 text-ink-2 max-w-[640px] mx-auto"
                    style={{ fontSize: "var(--sz-body)", lineHeight: 1.55 }}
                  >
                    This Privacy Policy describes how Enrout Ops Inc. (&ldquo;Enrout Ops,&rdquo;
                    &ldquo;Enrout,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
                    collects, uses, discloses, and otherwise processes personal information in
                    connection with our website at enroutops.com, our platform at enrout.ai, and
                    related products and services (collectively, the &ldquo;Services&rdquo;).
                  </p>
                  <p className="mt-3 font-mono text-xs text-ink-3">
                    Effective date: June 15, 2026 · Last updated: June 15, 2026
                  </p>
                </div>
              </div>
            </section>

            <section
              className="content-section bg-bg-soft"
              style={{ paddingBlock: "clamp(48px, 6vh, 80px)" }}
            >
              <div className="page-wrap">
                <div className="max-w-[800px] mx-auto flex flex-col gap-12">
                  <PolicySection title="1. Introduction">
                    <p className="m-0">
                      We respect your privacy and are committed to handling personal information
                      responsibly. This policy is designed to help you understand what information
                      we collect, why we collect it, how we use and share it, and what choices and
                      rights you may have.
                    </p>
                    <p className="m-0">
                      By accessing or using our Services, you acknowledge that you have read and
                      understand this Privacy Policy. If you do not agree with our practices,
                      please do not use the Services.
                    </p>
                    <p className="m-0">
                      This policy does not apply to third-party websites, applications, or
                      services that may be linked from our Services or integrated at your
                      direction. Those third parties are governed by their own privacy policies.
                    </p>
                  </PolicySection>

                  <PolicySection title="2. Definitions">
                    <ul className="m-0 pl-5 list-disc flex flex-col gap-2">
                      <li>
                        <strong className="font-medium text-ink">Personal information</strong>{" "}
                        means information that identifies, relates to, describes, is reasonably
                        capable of being associated with, or could reasonably be linked, directly or
                        indirectly, with a particular individual or household.
                      </li>
                      <li>
                        <strong className="font-medium text-ink">Customer data</strong> means
                        personal information and business data that our customers and their
                        authorized users submit to, store in, or process through the Enrout Ops
                        platform.
                      </li>
                      <li>
                        <strong className="font-medium text-ink">Controller</strong> means the
                        entity that determines the purposes and means of processing personal
                        information.
                      </li>
                      <li>
                        <strong className="font-medium text-ink">Processor</strong> means the
                        entity that processes personal information on behalf of a controller.
                      </li>
                      <li>
                        <strong className="font-medium text-ink">You</strong> or{" "}
                        <strong className="font-medium text-ink">your</strong> means a website
                        visitor, prospective customer, account holder, authorized user, driver,
                        dispatcher, or other individual whose personal information we process.
                      </li>
                    </ul>
                  </PolicySection>

                  <PolicySection title="3. Who is responsible for your information">
                    <p className="m-0">
                      For personal information collected through our marketing website, sales
                      process, and direct relationships with individual contacts, Enrout Ops Inc.
                      acts as the data controller.
                    </p>
                    <p className="m-0">
                      For Customer data processed within the Enrout Ops platform on behalf of a
                      subscribing organization, that organization is generally the data controller
                      and Enrout Ops acts as a data processor. In those cases, our processing is
                      governed by our customer agreements and Data Processing Addendum (DPA),
                      which supplement this policy.
                    </p>
                    <p className="m-0">
                      Privacy inquiries:{" "}
                      <a href="mailto:privacy@enroutops.com" className={linkClass}>
                        privacy@enroutops.com
                      </a>
                      <br />
                      Security incidents:{" "}
                      <a href="mailto:security@enroutops.com" className={linkClass}>
                        security@enroutops.com
                      </a>
                      <br />
                      General contact:{" "}
                      <a href="mailto:info@enroutops.com" className={linkClass}>
                        info@enroutops.com
                      </a>
                    </p>
                  </PolicySection>

                  <PolicySection title="4. Information we collect">
                    <p className="m-0">
                      The categories of personal information we collect depend on how you interact
                      with us. The table below summarizes the main categories, examples, and
                      typical sources.
                    </p>

                    <div className="overflow-x-auto -mx-1 px-1">
                      <table className="w-full min-w-[640px] border-collapse text-left text-[14px]">
                        <thead>
                          <tr className="border-b border-line">
                            <th className="py-3 pr-4 font-medium text-ink align-top">Category</th>
                            <th className="py-3 pr-4 font-medium text-ink align-top">Examples</th>
                            <th className="py-3 font-medium text-ink align-top">Sources</th>
                          </tr>
                        </thead>
                        <tbody className="text-ink-2">
                          <tr className="border-b border-line/70">
                            <td className="py-3 pr-4 align-top font-medium text-ink">Identifiers &amp; contact</td>
                            <td className="py-3 pr-4 align-top">Name, business email, phone number, company name, job title, mailing address</td>
                            <td className="py-3 align-top">You, your organization, public business directories</td>
                          </tr>
                          <tr className="border-b border-line/70">
                            <td className="py-3 pr-4 align-top font-medium text-ink">Account &amp; authentication</td>
                            <td className="py-3 pr-4 align-top">Username, password hash, role, permissions, login history, MFA tokens</td>
                            <td className="py-3 align-top">You, your organization, automated systems</td>
                          </tr>
                          <tr className="border-b border-line/70">
                            <td className="py-3 pr-4 align-top font-medium text-ink">Commercial &amp; operational</td>
                            <td className="py-3 pr-4 align-top">Load details, lanes, rates, customer and carrier records, invoices, settlements, lead pipeline data, dispatch notes</td>
                            <td className="py-3 align-top">You, your organization, authorized integrations</td>
                          </tr>
                          <tr className="border-b border-line/70">
                            <td className="py-3 pr-4 align-top font-medium text-ink">Driver &amp; workforce</td>
                            <td className="py-3 pr-4 align-top">Driver name, contact details, license or qualification references, assignment history, hours-of-service data where connected</td>
                            <td className="py-3 align-top">You, your organization, ELD/telematics integrations</td>
                          </tr>
                          <tr className="border-b border-line/70">
                            <td className="py-3 pr-4 align-top font-medium text-ink">Location &amp; telematics</td>
                            <td className="py-3 pr-4 align-top">GPS coordinates, vehicle location history, ETA data, geofence events, engine or trip status from connected fleet systems</td>
                            <td className="py-3 align-top">ELD and fleet integrations (e.g., Samsara, Motive, Verizon Connect), mobile tracking features</td>
                          </tr>
                          <tr className="border-b border-line/70">
                            <td className="py-3 pr-4 align-top font-medium text-ink">Communications</td>
                            <td className="py-3 pr-4 align-top">Emails, SMS, in-app messages, call logs, and message content sent or received through the platform</td>
                            <td className="py-3 align-top">You, your organization, integrated communication channels</td>
                          </tr>
                          <tr className="border-b border-line/70">
                            <td className="py-3 pr-4 align-top font-medium text-ink">Documents &amp; files</td>
                            <td className="py-3 pr-4 align-top">Bills of lading, rate confirmations, proof of delivery, insurance certificates, contracts, and uploaded attachments</td>
                            <td className="py-3 align-top">You, your organization, document integrations</td>
                          </tr>
                          <tr className="border-b border-line/70">
                            <td className="py-3 pr-4 align-top font-medium text-ink">Payment &amp; billing</td>
                            <td className="py-3 pr-4 align-top">Billing contact details, subscription plan, invoices, payment method metadata (processed by payment providers)</td>
                            <td className="py-3 align-top">You, payment processors, accounting integrations</td>
                          </tr>
                          <tr className="border-b border-line/70">
                            <td className="py-3 pr-4 align-top font-medium text-ink">Device &amp; usage</td>
                            <td className="py-3 pr-4 align-top">IP address, browser type, device identifiers, operating system, pages viewed, clickstream, feature usage, error logs, timestamps</td>
                            <td className="py-3 align-top">Automated technologies when you use our website or platform</td>
                          </tr>
                          <tr>
                            <td className="py-3 pr-4 align-top font-medium text-ink">Support &amp; feedback</td>
                            <td className="py-3 pr-4 align-top">Support tickets, survey responses, demo requests, product feedback, recordings or transcripts where disclosed</td>
                            <td className="py-3 align-top">You, customer success interactions</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="m-0">
                      We do not intentionally collect sensitive personal information such as
                      government ID numbers, financial account numbers, or precise health
                      information through our marketing website. Customers may upload documents
                      containing sensitive information into the platform at their discretion; in
                      those cases, processing is governed by the customer&apos;s instructions and
                      applicable agreements.
                    </p>
                  </PolicySection>

                  <PolicySection title="5. How we collect information">
                    <PolicySubheading>Directly from you</PolicySubheading>
                    <p className="m-0">
                      When you fill out our contact form, request a demo, create an account,
                      configure integrations, upload documents, send messages, or contact support,
                      you provide information directly to us.
                    </p>

                    <PolicySubheading>Automatically</PolicySubheading>
                    <p className="m-0">
                      We automatically collect certain technical and usage information through
                      cookies, log files, and similar technologies when you browse our website or
                      use authenticated areas of the platform.
                    </p>

                    <PolicySubheading>From your organization</PolicySubheading>
                    <p className="m-0">
                      If your employer or customer provisions your account, they may provide your
                      name, email, role, and permissions.
                    </p>

                    <PolicySubheading>From third-party integrations</PolicySubheading>
                    <p className="m-0">
                      When you or your organization authorizes connections to third-party
                      services, we receive data from those services. Examples include load boards
                      (DAT, Truckstop), ELD and fleet providers (Samsara, Motive, Verizon
                      Connect), accounting systems (QuickBooks, Microsoft Dynamics), factoring
                      partners (OTR Solutions, RTS Financial, Triumph), and custom integrations
                      via our REST API and webhooks.
                    </p>
                  </PolicySection>

                  <PolicySection title="6. Legal bases for processing">
                    <p className="m-0">
                      Where applicable law requires a legal basis (such as under the EU or UK
                      GDPR), we rely on one or more of the following:
                    </p>
                    <ul className="m-0 pl-5 list-disc flex flex-col gap-2">
                      <li>
                        <strong className="font-medium text-ink">Contract performance:</strong>{" "}
                        to provide the Services you or your organization have requested, including
                        account setup, dispatch operations, tracking, invoicing, and support.
                      </li>
                      <li>
                        <strong className="font-medium text-ink">Legitimate interests:</strong>{" "}
                        to operate, secure, and improve our Services; prevent fraud and abuse;
                        understand product usage; and communicate with business contacts, balanced
                        against your rights and expectations.
                      </li>
                      <li>
                        <strong className="font-medium text-ink">Consent:</strong>{" "}
                        where required for optional cookies, certain marketing communications, or
                        other processing for which we request your consent. You may withdraw
                        consent at any time without affecting the lawfulness of processing before
                        withdrawal.
                      </li>
                      <li>
                        <strong className="font-medium text-ink">Legal obligation:</strong>{" "}
                        to comply with applicable laws, regulations, lawful requests, tax
                        requirements, and transportation or safety recordkeeping obligations where
                        applicable.
                      </li>
                      <li>
                        <strong className="font-medium text-ink">Vital interests or public interest:</strong>{" "}
                        in rare cases where necessary to protect an individual&apos;s vital
                        interests or comply with regulatory requirements.
                      </li>
                    </ul>
                    <p className="m-0">
                      When we process Customer data as a processor, the customer determines the
                      applicable legal basis and provides instructions to us through the
                      subscription agreement and DPA.
                    </p>
                  </PolicySection>

                  <PolicySection title="7. How we use personal information">
                    <p className="m-0">We use personal information for the following purposes:</p>
                    <ul className="m-0 pl-5 list-disc flex flex-col gap-2">
                      <li>Providing, operating, maintaining, and securing the Services.</li>
                      <li>
                        Enabling core TMS and dispatch functionality: load management, live
                        tracking, driver assignment, customer communication, document management,
                        lead management, invoicing, and reporting.
                      </li>
                      <li>
                        Powering AI-assisted features, including Bella, for negotiation support,
                        load monitoring, automated follow-ups, operational summaries, and
                        productivity tools based on data authorized by you or your organization.
                      </li>
                      <li>Authenticating users and managing access controls.</li>
                      <li>Processing demo requests, sales inquiries, and support requests.</li>
                      <li>
                        Sending transactional messages, service announcements, security alerts,
                        billing notices, and product updates.
                      </li>
                      <li>
                        Analyzing usage trends, diagnosing technical issues, and improving
                        performance, reliability, and user experience.
                      </li>
                      <li>
                        Detecting, investigating, and preventing security incidents, fraud, abuse,
                        and violations of our terms.
                      </li>
                      <li>Complying with legal obligations and enforcing our agreements.</li>
                      <li>
                        With consent or as permitted by law, sending marketing communications
                        about Enrout Ops products, events, and resources.
                      </li>
                    </ul>
                  </PolicySection>

                  <PolicySection title="8. AI and automated processing">
                    <p className="m-0">
                      Enrout Ops uses machine learning and artificial intelligence to deliver
                      features such as load recommendations, ETA forecasting, communication
                      assistance, and operational insights. These features process data you or your
                      organization provide or authorize, including load details, communications,
                      location data, and historical operational patterns.
                    </p>
                    <p className="m-0">
                      Our AI features are designed to assist human operators. They do not make
                      legally binding decisions without human review unless your organization
                      explicitly configures automated workflows. You should review AI-generated
                      outputs before relying on them for safety-critical, financial, or regulatory
                      decisions.
                    </p>
                    <p className="m-0">
                      We do not sell Customer data. We do not use identifiable Customer data to
                      train general-purpose models shared with unrelated customers without
                      appropriate contractual restrictions, customer authorization, and
                      de-identification or aggregation where applicable. We may use aggregated and
                      de-identified data to improve service quality, reliability, and security.
                    </p>
                  </PolicySection>

                  <PolicySection title="9. How we disclose personal information">
                    <p className="m-0">
                      We may disclose personal information to the following categories of
                      recipients:
                    </p>
                    <ul className="m-0 pl-5 list-disc flex flex-col gap-2">
                      <li>
                        <strong className="font-medium text-ink">Service providers and sub-processors</strong>{" "}
                        that host infrastructure, provide cloud computing, deliver email and
                        notifications, process website forms, provide analytics, offer customer
                        support tools, or assist with security monitoring, under written
                        confidentiality and data protection obligations.
                      </li>
                      <li>
                        <strong className="font-medium text-ink">Integration partners</strong> you
                        or your organization connect to the platform, solely to provide the
                        integration functionality you authorize.
                      </li>
                      <li>
                        <strong className="font-medium text-ink">Your organization</strong> and
                        other authorized users within your account, based on role-based access
                        controls.
                      </li>
                      <li>
                        <strong className="font-medium text-ink">Professional advisors</strong>{" "}
                        such as lawyers, accountants, auditors, and insurers, subject to
                        confidentiality duties.
                      </li>
                      <li>
                        <strong className="font-medium text-ink">Authorities and law enforcement</strong>{" "}
                        when required by law, regulation, legal process, or to protect the rights,
                        property, safety, and security of Enrout Ops, our customers, or others.
                      </li>
                      <li>
                        <strong className="font-medium text-ink">Business transferees</strong> in
                        connection with a merger, acquisition, financing, reorganization,
                        bankruptcy, or sale of assets, subject to this policy or equivalent
                        protections.
                      </li>
                    </ul>
                    <p className="m-0">
                      Our website contact form submissions are transmitted through Web3Forms, a
                      third-party form processing service, to deliver inquiries to our team.
                    </p>
                  </PolicySection>

                  <PolicySection title="10. Cookies and similar technologies">
                    <p className="m-0">
                      We use cookies, local storage, and similar technologies on our website and
                      platform. These technologies help us:
                    </p>
                    <ul className="m-0 pl-5 list-disc flex flex-col gap-2">
                      <li>Keep you signed in and maintain session security.</li>
                      <li>Remember preferences such as language and display settings.</li>
                      <li>Understand how visitors use our website and which features are used.</li>
                      <li>Measure marketing effectiveness and improve content.</li>
                    </ul>

                    <PolicySubheading>Types of cookies we use</PolicySubheading>
                    <ul className="m-0 pl-5 list-disc flex flex-col gap-2">
                      <li>
                        <strong className="font-medium text-ink">Strictly necessary:</strong>{" "}
                        required for authentication, security, and core site functionality.
                      </li>
                      <li>
                        <strong className="font-medium text-ink">Functional:</strong>{" "}
                        remember choices and enhance usability.
                      </li>
                      <li>
                        <strong className="font-medium text-ink">Analytics:</strong>{" "}
                        help us understand traffic patterns and product usage in aggregate.
                      </li>
                      <li>
                        <strong className="font-medium text-ink">Marketing (if enabled):</strong>{" "}
                        may be used to measure campaign performance. We do not use invasive
                        cross-site tracking without appropriate notice and consent where required.
                      </li>
                    </ul>
                    <p className="m-0">
                      You can manage cookies through your browser settings. Blocking certain
                      cookies may affect website functionality. Where required by law, we will
                      present a cookie consent mechanism before placing non-essential cookies.
                    </p>
                  </PolicySection>

                  <PolicySection title="11. Data retention">
                    <p className="m-0">
                      We retain personal information only for as long as reasonably necessary to
                      fulfill the purposes described in this policy, unless a longer retention
                      period is required or permitted by law.
                    </p>
                    <ul className="m-0 pl-5 list-disc flex flex-col gap-2">
                      <li>
                        <strong className="font-medium text-ink">Website and sales inquiries:</strong>{" "}
                        typically retained for the duration of our business relationship and a
                        reasonable period thereafter for follow-up, unless you request deletion
                        sooner and we have no legal obligation to retain the data.
                      </li>
                      <li>
                        <strong className="font-medium text-ink">Platform Customer data:</strong>{" "}
                        retained for the term of the subscription and as specified in the customer
                        agreement, DPA, and backup schedules. Customers may request export or
                        deletion subject to contractual terms and legal requirements.
                      </li>
                      <li>
                        <strong className="font-medium text-ink">Security and audit logs:</strong>{" "}
                        retained for a limited period to investigate incidents, meet compliance
                        obligations, and maintain system integrity.
                      </li>
                    </ul>
                    <p className="m-0">
                      When personal information is no longer needed, we delete, anonymize, or
                      securely isolate it in accordance with our retention and disposal
                      procedures.
                    </p>
                  </PolicySection>

                  <PolicySection title="12. Security">
                    <p className="m-0">
                      We maintain administrative, technical, and organizational safeguards designed
                      to protect personal information, including:
                    </p>
                    <ul className="m-0 pl-5 list-disc flex flex-col gap-2">
                      <li>Encryption of data in transit using TLS and encryption at rest for stored data.</li>
                      <li>Role-based access controls, multi-factor authentication options, and least-privilege access policies.</li>
                      <li>Network segmentation, monitoring, vulnerability management, and incident response procedures.</li>
                      <li>Employee security training and confidentiality obligations.</li>
                      <li>Annual third-party audits supporting our SOC 2 Type II certification.</li>
                      <li>HIPAA-ready and GDPR-aligned controls for customers with applicable regulatory requirements.</li>
                    </ul>
                    <p className="m-0">
                      No security program can guarantee absolute security. If you believe your
                      account has been compromised or you discover a vulnerability, contact{" "}
                      <a href="mailto:security@enroutops.com" className={linkClass}>
                        security@enroutops.com
                      </a>{" "}
                      promptly.
                    </p>
                  </PolicySection>

                  <PolicySection title="13. International data transfers">
                    <p className="m-0">
                      Enrout Ops is headquartered in North America. We and our service providers may
                      process personal information in the United States, Canada, and other
                      countries where we or our subprocessors maintain facilities.
                    </p>
                    <p className="m-0">
                      When we transfer personal information from the European Economic Area, United
                      Kingdom, or Switzerland to countries that have not received an adequacy
                      decision, we implement appropriate safeguards such as the European
                      Commission&apos;s Standard Contractual Clauses, the UK International Data
                      Transfer Addendum, or other lawful transfer mechanisms required by
                      applicable law.
                    </p>
                    <p className="m-0">
                      A copy of relevant transfer safeguards may be requested by contacting{" "}
                      <a href="mailto:privacy@enroutops.com" className={linkClass}>
                        privacy@enroutops.com
                      </a>
                      .
                    </p>
                  </PolicySection>

                  <PolicySection title="14. Your privacy rights">
                    <p className="m-0">
                      Depending on your location and applicable law, you may have some or all of
                      the following rights regarding your personal information:
                    </p>
                    <ul className="m-0 pl-5 list-disc flex flex-col gap-2">
                      <li>Right to know what personal information we collect, use, and disclose.</li>
                      <li>Right to access and receive a copy of your personal information.</li>
                      <li>Right to correct inaccurate or incomplete information.</li>
                      <li>Right to delete personal information, subject to legal exceptions.</li>
                      <li>Right to restrict or object to certain processing.</li>
                      <li>Right to data portability where technically feasible.</li>
                      <li>Right to withdraw consent where processing is based on consent.</li>
                      <li>Right to opt out of certain targeted advertising, sale, or sharing of personal information.</li>
                      <li>Right to non-discrimination for exercising privacy rights.</li>
                    </ul>

                    <PolicySubheading>Platform users</PolicySubheading>
                    <p className="m-0">
                      If you use Enrout Ops through an employer or customer account, operational
                      data is typically controlled by that organization. Please contact your
                      organization&apos;s administrator first for access, correction, or deletion
                      requests relating to platform data. We will assist our customers in
                      responding to such requests as required by our agreements and applicable law.
                    </p>

                    <PolicySubheading>How to submit a request</PolicySubheading>
                    <p className="m-0">
                      Email{" "}
                      <a href="mailto:privacy@enroutops.com" className={linkClass}>
                        privacy@enroutops.com
                      </a>{" "}
                      with the subject line &ldquo;Privacy Rights Request.&rdquo; We may need to
                      verify your identity before fulfilling a request. Authorized agents may
                      submit requests on your behalf where permitted by law. We will respond within
                      the timeframe required by applicable law (for example, 30 days under GDPR or
                      45 days under CCPA, with permitted extensions where necessary).
                    </p>

                    <PolicySubheading>EEA and UK residents</PolicySubheading>
                    <p className="m-0">
                      You have the right to lodge a complaint with your local supervisory
                      authority if you believe our processing violates applicable data protection
                      law. We encourage you to contact us first so we can address your concerns.
                    </p>

                    <PolicySubheading>California residents (CCPA/CPRA)</PolicySubheading>
                    <p className="m-0">
                      In the preceding 12 months, we may have collected the categories of personal
                      information listed in Section 4 for the business purposes described in this
                      policy. We disclose personal information to service providers and integration
                      partners as described in Section 9.
                    </p>
                    <p className="m-0">
                      <strong className="font-medium text-ink">We do not sell personal information.</strong>{" "}
                      We do not share personal information for cross-context behavioral advertising
                      as those terms are defined under California law. We will not discriminate
                      against you for exercising your CCPA/CPRA rights.
                    </p>
                    <p className="m-0">
                      California residents may submit requests to know, delete, or correct personal
                      information by emailing{" "}
                      <a href="mailto:privacy@enroutops.com" className={linkClass}>
                        privacy@enroutops.com
                      </a>
                      .
                    </p>

                    <PolicySubheading>Canadian residents</PolicySubheading>
                    <p className="m-0">
                      If you are located in Canada, you may have rights under applicable provincial
                      and federal privacy laws, including the right to access and challenge the
                      accuracy of your personal information. Contact us at{" "}
                      <a href="mailto:privacy@enroutops.com" className={linkClass}>
                        privacy@enroutops.com
                      </a>{" "}
                      to exercise these rights.
                    </p>
                  </PolicySection>

                  <PolicySection title="15. Marketing communications">
                    <p className="m-0">
                      We may send marketing emails about Enrout Ops products, webinars, and
                      industry resources to business contacts who have expressed interest or with
                      whom we have an existing business relationship, where permitted by law. You
                      may opt out at any time by clicking the unsubscribe link in our emails or by
                      contacting{" "}
                      <a href="mailto:privacy@enroutops.com" className={linkClass}>
                        privacy@enroutops.com
                      </a>
                      . Opting out of marketing does not affect transactional or service-related
                      communications necessary to administer your account or respond to inquiries.
                    </p>
                  </PolicySection>

                  <PolicySection title="16. Children's privacy">
                    <p className="m-0">
                      The Services are intended for business use and are not directed to individuals
                      under 16 years of age. We do not knowingly collect personal information from
                      children. If you believe we have inadvertently collected information from a
                      child, please contact us at{" "}
                      <a href="mailto:privacy@enroutops.com" className={linkClass}>
                        privacy@enroutops.com
                      </a>{" "}
                      and we will take steps to delete it.
                    </p>
                  </PolicySection>

                  <PolicySection title="17. Data breach notification">
                    <p className="m-0">
                      In the event of a personal data breach that poses a risk to individuals, we
                      will notify affected customers and, where required by law, relevant
                      supervisory authorities and affected individuals without undue delay and in
                      accordance with applicable breach notification obligations.
                    </p>
                  </PolicySection>

                  <PolicySection title="18. Changes to this policy">
                    <p className="m-0">
                      We may update this Privacy Policy from time to time to reflect changes in
                      our practices, technologies, legal requirements, or Services. When we make
                      material changes, we will post the updated policy on this page and revise
                      the &ldquo;Last updated&rdquo; date. Where required by law, we will provide
                      additional notice (such as by email or in-product notification). Your
                      continued use of the Services after the effective date of an updated policy
                      constitutes acceptance of the changes, except where further consent is
                      required by law.
                    </p>
                  </PolicySection>

                  <PolicySection title="19. Contact us">
                    <p className="m-0">
                      If you have questions, concerns, or requests regarding this Privacy Policy
                      or our privacy practices, contact:
                    </p>
                    <p className="m-0">
                      <strong className="font-medium text-ink">Enrout Ops Inc.</strong>
                      <br />
                      Privacy Team
                      <br />
                      Email:{" "}
                      <a href="mailto:privacy@enroutops.com" className={linkClass}>
                        privacy@enroutops.com
                      </a>
                      <br />
                      General inquiries:{" "}
                      <a href="mailto:info@enroutops.com" className={linkClass}>
                        info@enroutops.com
                      </a>
                      <br />
                      Website:{" "}
                      <a href="https://enroutops.com" className={linkClass}>
                        enroutops.com
                      </a>
                      <br />
                      Platform:{" "}
                      <a href="https://enrout.ai" className={linkClass}>
                        enrout.ai
                      </a>
                    </p>
                    <p className="m-0 text-ink-3 text-[14px]">
                      This Privacy Policy is provided for informational purposes and does not
                      constitute legal advice. Organizations using Enrout Ops should review this
                      policy alongside their own privacy notices and our customer agreements.
                    </p>
                  </PolicySection>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </HeroBackgroundProvider>
      </FontProvider>
    </TypeScaleProvider>
  );
}
