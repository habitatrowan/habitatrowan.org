import React, { useState } from "react";

const NEUTRAL_MUTED = "text-neutral-600";
const NEUTRAL_CARD = "bg-white";
const NEUTRAL_BORDER = "border border-neutral-200";
const CARD_BASE = `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)]`;

const faqs = [
  {
    q: "Who is eligible to apply for a Habitat for Humanity home in Rowan County?",
    a: "Families must be residents of Rowan County for at least 12 consecutive months, demonstrate the need for decent and affordable housing, and have a household income between 40–80% of the area median income. Applicants must also show the ability to pay an affordable, interest-free mortgage, maintain good credit, and be first-time homeowners."
  },
  {
    q: "What does \"sweat equity\" mean in the application process?",
    a: "Sweat equity refers to the volunteer hours that future homeowners contribute by working on their own home, helping with other Habitat projects, or attending homeownership education classes. It's part of partnering with Habitat and investing directly in your homeownership journey."
  },
  {
    q: "How do I start the application process?",
    a: "The first step is to complete and submit the Pre-Qualification Document along with required supporting materials. If you pre-qualify, Habitat Rowan will invite you to complete a full application."
  },
  {
    q: "What happens after I submit my full application?",
    a: "Once a full application is submitted, Habitat Rowan staff will conduct a home visit and family interview. After that, the volunteer Family Selection Committee reviews the application and determines eligibility."
  },
  {
    q: "What happens if my family is selected?",
    a: "If approved, your family begins the partnership process, including sweat equity hours and homeownership education. You’ll then help build your home alongside volunteers, and the process concludes with a Home Dedication ceremony where you receive the keys to your new home."
  }
];

const OwnHome_FAQ: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="faq" className={`${CARD_BASE} p-8`}>
      <h2 className="text-2xl font-extrabold mb-4">Frequently Asked Questions</h2>

      <div className="space-y-2">
        {faqs.map((item, i) => {
          const isOpen = openFaq === i;
          return (
            <div
              key={i}
              className={`${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-lg overflow-hidden`}
            >
              <button
                onClick={() => setOpenFaq(isOpen ? null : i)}
                className="w-full px-5 py-4 flex items-start justify-between gap-3 text-left hover:bg-neutral-50:bg-neutral-800 transition-colors focus:outline-none"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
              >
                <h3 className="text-base md:text-lg font-semibold">{item.q}</h3>
                <span className="w-2.5 h-2.5 rounded-full mt-2 shrink-0 bg-neutral-900" />
              </button>

              {isOpen && (
                <div id={`faq-panel-${i}`} className="px-5 pb-5">
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

export default OwnHome_FAQ;
