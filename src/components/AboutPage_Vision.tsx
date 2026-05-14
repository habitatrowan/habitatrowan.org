import React from "react";
import { Eye } from "lucide-react";

const NEUTRAL_MUTED = "text-neutral-600";
const NEUTRAL_CARD = "bg-white";
const NEUTRAL_BORDER = "border border-neutral-200";

const OurVision: React.FC = () => {
  return (
    <div
      className={`${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-2xl p-8 shadow-sm flex items-center justify-left gap-4`}
    >
      <Eye className="w-10 h-10 shrink-0 text-black" />
      <p className={`${NEUTRAL_MUTED} text-center leading-relaxed`}>
        &ldquo;A world where everyone has a decent place to live.&rdquo;
      </p>
    </div>
  );
};

export default OurVision;
