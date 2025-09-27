import React from "react";
import { Mail, Phone, Home as HomeIcon, Users } from "lucide-react";

export type Staff = {
  name: string;
  title: string;
  email?: string;
  phone?: string;
  ext?: string;
  description?: string;
};

const ICONS = { Home: HomeIcon, Users };
const NEUTRAL_TEXT = "text-neutral-900 dark:text-neutral-50";
const NEUTRAL_MUTED = "text-neutral-600 dark:text-neutral-300";
const NEUTRAL_CARD = "bg-white dark:bg-neutral-900";
const NEUTRAL_BORDER = "border border-neutral-200 dark:border-neutral-700";
const CARD_BASE = `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)]
                   transition-all duration-300 ease-[cubic-bezier(.22,.61,.36,1)]
                   hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.18)] hover:ring-2
                   ring-neutral-300 dark:ring-neutral-700`;

type Props = {
  items: Staff[];
  mainPhone: string;
};

const StaffGrid: React.FC<Props> = ({ items, mainPhone }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {items.map((s) => (
        <article key={s.name} className={`${CARD_BASE} p-8`}>
          <header className="mb-4">
            <h3 className={`text-2xl font-extrabold leading-tight ${NEUTRAL_TEXT}`}>
              {s.name}
            </h3>
            <p className={`${NEUTRAL_MUTED} mt-1`}>{s.title}</p>
          </header>

          {s.description && (
            <p className={`${NEUTRAL_MUTED} leading-relaxed mb-6`}>{s.description}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 text-sm">
            {s.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                <span className={`${NEUTRAL_MUTED}`}>{s.email}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
              <span className={`${NEUTRAL_MUTED}`}>
                {(s.phone || mainPhone)}
                {s.ext ? ` ext. ${s.ext}` : ""}
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default StaffGrid;
