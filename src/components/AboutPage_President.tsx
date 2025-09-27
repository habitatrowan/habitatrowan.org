import React from "react";

const NEUTRAL_TEXT = "text-neutral-900 dark:text-neutral-50";
const NEUTRAL_MUTED = "text-neutral-600 dark:text-neutral-300";
const NEUTRAL_CARD = "bg-white dark:bg-neutral-900";
const NEUTRAL_BORDER = "border border-neutral-200 dark:border-neutral-700";
const CARD_BASE = `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)]
                   transition-all duration-300 ease-[cubic-bezier(.22,.61,.36,1)]
                   hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.18)] hover:ring-2
                   ring-neutral-300 dark:ring-neutral-700`;

type Props = {
  nameFirst: string;
  nameLast: string;
  title: string;
  showContact?: boolean;
  email?: string;
  phone?: string;
};

const PresidentCard: React.FC<Props> = ({
  nameFirst,
  nameLast,
  title,
  showContact = false,
  email,
  phone,
}) => {
  return (
    <div className={`${CARD_BASE} p-8`}>
      <div className="flex flex-col items-start gap-6">
        <div className="flex-1">
          <h2 className={`text-3xl font-extrabold mb-2 ${NEUTRAL_TEXT}`}>
            {nameFirst} {nameLast}
          </h2>
          <h3 className={`text-lg mb-4 ${NEUTRAL_MUTED}`}>{title}</h3>

          <p className={`${NEUTRAL_MUTED} leading-relaxed mb-4`}>
            {nameFirst} {nameLast} has been serving as {title} of Habitat for Humanity of Rowan County.
            With deep experience in nonprofit management and community development, {nameFirst} brings
            passionate leadership to our mission of building homes, communities, and hope.
          </p>

          <p className={`${NEUTRAL_MUTED} leading-relaxed`}>
            Under this leadership, our affiliate has continued to grow and expand its impact in the community,
            maintaining our commitment to building quality, affordable housing while fostering strong partnerships
            with volunteers, donors, and local organizations.
          </p>

          {showContact && (email || phone) ? (
            <div className="flex flex-col sm:flex-row gap-4 text-sm mt-6">
              {email && <span className={`${NEUTRAL_MUTED}`}>{email}</span>}
              {phone && <span className={`${NEUTRAL_MUTED}`}>{phone}</span>}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PresidentCard;
