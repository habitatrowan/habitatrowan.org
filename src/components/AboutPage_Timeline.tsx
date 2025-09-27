import React from "react";

export type HistoryMilestone = { year: string; event: string };

const NEUTRAL_MUTED = "text-neutral-600 dark:text-neutral-300";
const NEUTRAL_CARD = "bg-white dark:bg-neutral-900";
const NEUTRAL_BORDER = "border border-neutral-200 dark:border-neutral-700";
const CARD_BASE = `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)]
                   transition-all duration-300 ease-[cubic-bezier(.22,.61,.36,1)]
                   hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.18)] hover:ring-2
                   ring-neutral-300 dark:ring-neutral-700`;

type Props = {
  items: HistoryMilestone[];
};

const HistoryTimeline: React.FC<Props> = ({ items }) => {
  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#54B948]" />
      <div className="space-y-8">
        {items.map((m) => (
          <div key={`${m.year}-${m.event}`} className="flex gap-6 items-start">
            <div
              className="w-16 h-16 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 relative z-10 shadow-[0_2px_12px_rgba(0,0,0,0.12)]"
              style={{ background: "linear-gradient(90deg, #005596 0%, #54B948 100%)" }}
            >
              {m.year}
            </div>
            <div className={`${CARD_BASE} p-6 flex-1`}>
              <p className={`${NEUTRAL_MUTED} leading-relaxed`}>{m.event}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryTimeline;
