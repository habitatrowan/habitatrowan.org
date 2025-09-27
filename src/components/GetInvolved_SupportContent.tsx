// components/GetInvolved_SupportContent.tsx
import React from "react";

const NEUTRAL_MUTED = "text-neutral-600 dark:text-neutral-300";

type Props = { donateUrl: string };

const GetInvolved_SupportContent: React.FC<Props> = ({ donateUrl }) => {
  return (
    <>
      <div id="support-donate" className="scroll-mt-[var(--header-offset)]">
        <h3 className="text-2xl font-extrabold mb-3">Make a Donation</h3>
        <p className={`${NEUTRAL_MUTED} mb-2`}>
          We receive online gifts through PayPal. You can use a PayPal account or any major debit/credit card. A receipt will be emailed to you.
        </p>
        <p className={`${NEUTRAL_MUTED}`}>
          Donate online:&nbsp;
          <a href={donateUrl} target="_blank" rel="noopener noreferrer" className="underline text-[#005596]">
            PayPal Donation Page
          </a>
          .
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
          Prefer to mail a check? Send to: <strong>P.O. Box 3356, Salisbury, NC 28145-3356</strong>
        </p>
      </div>

      <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

      <div id="support-land" className="scroll-mt-[var(--header-offset)]">
        <h3 className="text-2xl font-extrabold mb-3">Land Donations</h3>
        <p className={`${NEUTRAL_MUTED} mb-4`}>
          Land gifts are highly impactful. Typical criteria include Rowan County location, residential suitability, clear title, access to utilities, and compliance with local zoning.
        </p>
        <ul className="space-y-2">
          <li className="flex items-start gap-3">
            <span className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 bg-gradient-to-r from-[#005596] to-[#54B948]" />
            <span className={NEUTRAL_MUTED}>Located within Rowan County</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 bg-gradient-to-r from-[#005596] to-[#54B948]" />
            <span className={NEUTRAL_MUTED}>Suitable for residential construction</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 bg-gradient-to-r from-[#005596] to-[#54B948]" />
            <span className={NEUTRAL_MUTED}>Clear title; no liens</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 bg-gradient-to-r from-[#005596] to-[#54B948]" />
            <span className={NEUTRAL_MUTED}>Utilities access; meets zoning</span>
          </li>
        </ul>
        <p className={`${NEUTRAL_MUTED} mt-4`}>
          Reach out via our <a href="/contact" className="underline text-[#005596]">Contact</a> page to discuss a prospective land gift.
        </p>
      </div>

      <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

      <div id="support-professional" className="scroll-mt-[var(--header-offset)]">
        <h3 className="text-2xl font-extrabold mb-3">Professional Services</h3>
        <p className={`${NEUTRAL_MUTED} mb-4`}>
          Share specialized skills to amplify our impact—construction trades (electrical, plumbing, HVAC, roofing, flooring, painting), as well as legal, accounting, marketing/PR, photography, web development, and grant writing.
        </p>
        <p className={`${NEUTRAL_MUTED}`}>
          To offer services, use our <a href="/contact" className="underline text-[#005596]">Contact</a> page.
        </p>
      </div>

      <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

      <div id="support-ebay" className="scroll-mt-[var(--header-offset)]">
        <h3 className="text-2xl font-extrabold mb-3">Shop &amp; Support</h3>
        <p className={`${NEUTRAL_MUTED}`}>
          Support us through <strong>eBay for Charities</strong> by shopping our store or donating a percentage of your sales. Visit our store:&nbsp;
          <a href="https://www.ebay.com/usr/habitatrowan" target="_blank" rel="noopener noreferrer" className="underline text-[#005596]">
            ebay.com/usr/habitatrowan
          </a>
          .
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          eBay seller name: <strong>habitatrowan</strong>
        </p>
      </div>
    </>
  );
};

export default GetInvolved_SupportContent;
