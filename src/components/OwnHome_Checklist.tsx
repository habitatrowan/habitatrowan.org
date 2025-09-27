import React from "react";

const NEUTRAL_MUTED = "text-neutral-600 dark:text-neutral-300";
const NEUTRAL_CARD = "bg-white dark:bg-neutral-900";
const NEUTRAL_BORDER = "border border-neutral-200 dark:border-neutral-700";
const CARD_BASE = `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)]`;

const items = [
  "Demonstrate need for decent, affordable housing",
  "Show ability to pay an affordable interest free mortgage",
  "Be willing to partner with Habitat (sweat equity hours)",
  "Be a resident of Rowan County for at least 12 consecutive months",
  "Have household income between 40-80% of area median income",
  "Have a history of and maintain good credit",
  "Be a first time homeowner"
];

const OwnHome_Checklist: React.FC = () => {
  return (
    <section id="eligibility" className={`${CARD_BASE} p-8`}>
      <h2 className="text-3xl font-extrabold mb-4">Eligibility Checklist</h2>
      <p className={`${NEUTRAL_MUTED} mb-6`}>To qualify for a Habitat home, families generally must meet the following:</p>
      <ul className="space-y-3">
        {items.map((t, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 bg-gradient-to-r from-[#005596] to-[#54B948]" />
            <span className={NEUTRAL_MUTED}>{t}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default OwnHome_Checklist;
