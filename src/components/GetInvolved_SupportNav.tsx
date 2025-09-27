import React from "react";

const NEUTRAL_TEXT = "text-neutral-900 dark:text-neutral-50";

type Section = { id: string; label: string };

type Props = {
  sections: Section[];
  activeId: string;
  onSelect: (id: string) => void;
};

const GetInvolved_SupportNav: React.FC<Props> = ({ sections, activeId, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {sections.map(({ id, label }) => {
        const active = activeId === id;
        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            aria-current={active ? "true" : "false"}
            className={`group relative inline-flex items-center justify-center h-11 min-w-[200px] px-5 rounded-xl font-medium overflow-hidden border backdrop-blur-sm transition-all whitespace-nowrap text-center ${NEUTRAL_TEXT} ${active ? "ring-2 ring-neutral-300 dark:ring-neutral-600" : "ring-0"} border-neutral-300 dark:border-neutral-700 bg-white/10 dark:bg-white/10`}
          >
            <span className="relative z-10 transition-colors group-hover:text-white">{label}</span>
            <span
              className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: "linear-gradient(90deg, #005596 0%, #54B948 100%)" }}
            />
          </button>
        );
      })}
    </div>
  );
};

export default GetInvolved_SupportNav;
