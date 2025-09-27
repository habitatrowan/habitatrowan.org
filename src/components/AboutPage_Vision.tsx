import React from "react";
import { Eye } from "lucide-react";

const NEUTRAL_MUTED = "text-neutral-600 dark:text-neutral-300";
const NEUTRAL_CARD = "bg-white dark:bg-neutral-900";
const NEUTRAL_BORDER = "border border-neutral-200 dark:border-neutral-700";

const OurVision: React.FC = () => {
  return (
    <div
      className={`${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-2xl p-8 shadow-sm flex items-center justify-left gap-4`}
    >
      <svg className="w-10 h-10 shrink-0" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="sharedGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#005596" />
            <stop offset="100%" stopColor="#54B948" />
          </linearGradient>
        </defs>
        <Eye stroke="url(#sharedGradient)" fill="none" />
      </svg>
      <p className={`${NEUTRAL_MUTED} text-left leading-relaxed`}>
        A world where everyone has a decent place to live.
      </p>
    </div>
  );
};

export default OurVision;
