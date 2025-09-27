import React from "react";

const NEUTRAL_MUTED = "text-neutral-600 dark:text-neutral-300";
const NEUTRAL_CARD = "bg-white dark:bg-neutral-900";
const NEUTRAL_BORDER = "border border-neutral-200 dark:border-neutral-700";
const CARD_BASE = `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)]`;
const BTN_BASE = "inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-200 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)] focus:outline-none";

type Props = { prequalUrl: string };

const steps = [
  { step: 1, title: "Pre-Qualification Document", description: "Complete and submit the pre-qualification document with required supporting materials." },
  { step: 2, title: "Complete Full Application", description: "If pre-qualified, you’ll be invited to complete a comprehensive application." },
  { step: 3, title: "Home Visit & Interview", description: "Our staff will conduct a home visit and interview with your family." },
  { step: 4, title: "Selection Committee Review", description: "Your application is reviewed by our volunteer Family Selection Committee." },
  { step: 5, title: "Begin Partnership", description: "If selected, begin sweat equity hours and homeownership education." },
  { step: 6, title: "Home Construction", description: "Work alongside volunteers to build your home." },
  { step: 7, title: "Home Dedication", description: "Celebrate receiving the keys to your new home!" }
];

const OwnHome_App: React.FC<Props> = ({ prequalUrl }) => {
  return (
    <section id="process" className={`${CARD_BASE} p-8 space-y-8`}>
      <div>
        <h2 className="text-3xl font-extrabold mb-4">Application Process</h2>
        <p className={`${NEUTRAL_MUTED} mb-6`}>Our program follows a comprehensive process to prepare families for successful homeownership:</p>
        <ol className="space-y-5">
          {steps.map((s) => (
            <li key={s.step} className="flex gap-5 items-start">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white bg-gradient-to-r from-[#005596] to-[#54B948]">
                {s.step}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1">{s.title}</h3>
                <p className={NEUTRAL_MUTED}>{s.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div id="apply" className="rounded-xl p-8 text-center bg-gradient-to-r from-[#005596] to-[#54B948]">
        <h3 className="text-2xl font-extrabold mb-3 text-white">Ready to Apply?</h3>
        <p className="mb-6 text-white/90">If you meet the eligibility criteria, download the pre-qualification form to start the process.</p>
        <a
          href="/qualification_form.pdf"
          target="_blank"
          className={`${BTN_BASE} border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20`}
        >
          Download Pre-Qualification Form (PDF)
        </a>
      </div>
    </section>
  );
};

export default OwnHome_App;
