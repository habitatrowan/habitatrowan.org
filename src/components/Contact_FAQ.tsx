// components/Contact_FAQ.tsx
import React, { useState } from "react";

const NEUTRAL_MUTED = "text-neutral-600 dark:text-neutral-300";
const NEUTRAL_CARD = "bg-white dark:bg-neutral-900";
const NEUTRAL_BORDER = "border border-neutral-200 dark:border-neutral-700";
const CARD_BASE = `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)]`;

const faqs = [
  {
    q: "What are the ReStore hours?",
    a: "Typical hours are Tuesday–Saturday, 10:00 AM–5:00 PM. Donation drop-offs are accepted until 4:30 PM. Hours may vary on holidays."
  },
  {
    q: "When is the main office open?",
    a: "The administrative office is open Monday–Friday, 9:00 AM–5:00 PM."
  },
  {
    q: "Who do I talk to about donating items?",
    a: "For furniture, appliances, or building materials, ask for the ReStore Donations Desk or the ReStore Manager during ReStore hours."
  },
  {
    q: "Who handles homeownership questions?",
    a: "Ask for Family Services during office hours. They can help with eligibility, application timelines, and information sessions."
  },
  {
    q: "Who should I contact about construction volunteering?",
    a: "Speak with our Volunteer Coordinator during office hours. They’ll share safety guidelines and schedule options."
  }
];

const Contact_FAQ: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className={`${CARD_BASE} p-8`}>
      <h2 className="text-2xl font-extrabold mb-4">Frequently Asked Questions</h2>

      <div className="space-y-2">
        {faqs.map((item, i) => {
          const isOpen = openFaq === i;
          return (
            <div key={i} className={`${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-lg overflow-hidden`}>
              <button
                onClick={() => setOpenFaq(isOpen ? null : i)}
                className="w-full px-5 py-4 flex items-start justify-between gap-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors focus:outline-none"
              >
                <h3 className="text-base md:text-lg font-semibold">{item.q}</h3>
                <span className="w-2.5 h-2.5 rounded-full mt-1 shrink-0 bg-gradient-to-r from-[#005596] to-[#54B948]" />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-0">
                  <p className={NEUTRAL_MUTED}>{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Contact_FAQ;
