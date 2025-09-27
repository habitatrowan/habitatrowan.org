import React from "react";

const NEUTRAL_CARD = "bg-white dark:bg-neutral-900";
const NEUTRAL_BORDER = "border border-neutral-200 dark:border-neutral-700";
const CARD_BASE = `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)] transition-all duration-300 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.18)] hover:ring-2 ring-neutral-300 dark:ring-neutral-700`;

type Props = { address: string; title?: string };

const Location_Map: React.FC<Props> = ({ address, title = "Map" }) => {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  return (
    <section className={`${CARD_BASE} p-4`}>
      <div className="w-full h-96 rounded-lg overflow-hidden">
        <iframe
          title={title}
          src={src}
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg"
        />
      </div>
    </section>
  );
};

export default Location_Map;
