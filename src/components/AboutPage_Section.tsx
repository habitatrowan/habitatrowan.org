import React from "react";

const NEUTRAL_TEXT = "text-neutral-900 dark:text-neutral-50";
const NEUTRAL_MUTED = "text-neutral-600 dark:text-neutral-300";
const NEUTRAL_CARD = "bg-white dark:bg-neutral-900";
const NEUTRAL_BORDER = "border border-neutral-200 dark:border-neutral-700";
const CARD_BASE = `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-2xl shadow-sm`;

type Props = { introCount: number };

const AboutStatements: React.FC<Props> = ({ introCount }) => {
  return (
    <div className={`${CARD_BASE} p-8 md:p-12`}>
      <div className="max-w-4xl mx-auto space-y-6 text-left">
        <h2 className={`text-3xl font-extrabold ${NEUTRAL_TEXT}`}>
          About Habitat for Humanity of Rowan County
        </h2>

        <p className={`${NEUTRAL_MUTED} leading-relaxed`}>
          Habitat for Humanity of Rowan County is a local affiliate of Habitat for Humanity International, dedicated to
          bringing people together to build homes, communities, and hope. Since 1985, we have worked to eliminate poverty
          housing and homelessness by building and renovating decent, affordable housing.
        </p>

        <p className={`${NEUTRAL_MUTED} leading-relaxed`}>
          Our work is possible through the support of volunteers, donors, and community partners. Together, we have built{" "}
          <strong>{introCount}</strong> homes in Rowan County, providing safe, decent, and affordable housing for families
          in need. We continue to build 6–8 homes annually with the help of hundreds of volunteers each year.
        </p>

        <div className="rounded-xl p-6 md:p-7 shadow-[0_6px_24px_rgba(0,0,0,0.12)] text-left bg-gradient-to-r from-[#005596] to-[#54B948]">
          <h3 className="text-xl font-bold mb-3 text-white">All Are Welcome</h3>
          <p className="text-white leading-relaxed">
            Habitat for Humanity of Rowan County welcomes volunteers and supporters from all backgrounds. We do not
            discriminate based on race, religion, nationality, political affiliation, sexual orientation, or gender identity.
            All are welcome to join our mission of building homes, communities, and hope.
          </p>
        </div>

        <h3 className={`text-2xl font-bold ${NEUTRAL_TEXT}`}>
          About Habitat for Humanity International
        </h3>
        <p className={`${NEUTRAL_MUTED} leading-relaxed`}>
          Habitat for Humanity International is a global nonprofit housing organization working in local communities across
          all 50 states in the U.S. and in more than 70 countries around the world. Since 1976, Habitat has helped more than
          39 million people construct, rehabilitate, or preserve homes.
        </p>
      </div>
    </div>
  );
};

export default AboutStatements;
