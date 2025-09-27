import React from "react";

type Section = { id: string; label: string };
type Props = { sections: Section[]; activeId: string; onSelect: (id: string) => void };

const OwnHome_Nav: React.FC<Props> = ({ sections, activeId, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          aria-current={activeId === id ? "true" : "false"}
          className="group relative inline-flex items-center justify-center px-5 py-2 rounded-xl font-medium border border-neutral-300 dark:border-neutral-700 overflow-hidden transition-colors"
        >
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-[#005596] to-[#54B948]" />
          <span className="relative z-10 group-hover:text-white">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default OwnHome_Nav;
