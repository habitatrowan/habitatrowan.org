import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const NEUTRAL_MUTED = "text-neutral-600 dark:text-neutral-300";
const NEUTRAL_CARD = "bg-white dark:bg-neutral-900";
const NEUTRAL_BORDER = "border border-neutral-200 dark:border-neutral-700";
const CARD_BASE = `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl p-6 shadow-[0_6px_24px_rgba(0,0,0,0.12)] flex flex-col justify-between`;
const ICON_GRADIENT = "bg-gradient-to-r from-[#005596] to-[#54B948]";

const Contact_Info: React.FC = () => {
  const address = "1707 S Main St, Salisbury, NC 28144";

  const cards = [
    {
      title: "Phone",
      info: "(704) 642-1222",
      href: "/about#staff",
      description: "See Staff Directory for extensions",
      icon: Phone,
      newTab: false
    },
    {
      title: "Email",
      info: "info@habitatrowan.org",
      href: "mailto:info@habitatrowan.org",
      description: "Response time 24–48 hours",
      icon: Mail,
      newTab: false
    },
    {
      title: "Habitat's Address",
      info: address,
      href: `https://maps.google.com/?q=${encodeURIComponent(address)}`,
      description: "Open in Google Maps",
      icon: MapPin,
      newTab: true
    }
  ];

  return (
    <section>
      <h2 className="text-3xl font-extrabold mb-6">Get in Touch</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c) => {
          const Icon = c.icon;
          const isInternal = !c.newTab && c.href.startsWith("/");

          const Inner = (
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.12)] ${ICON_GRADIENT}`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">{c.title}</h3>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <p className="font-medium text-center">{c.info}</p>
              </div>
              <p className={`${NEUTRAL_MUTED} text-sm mt-6 text-left`}>
                {c.description}
              </p>
            </div>
          );

          return isInternal ? (
            <Link key={c.title} to={c.href} className={`${CARD_BASE} block`}>
              {Inner}
            </Link>
          ) : (
            <a
              key={c.title}
              href={c.href}
              className={`${CARD_BASE} block`}
              {...(c.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {Inner}
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default Contact_Info;
