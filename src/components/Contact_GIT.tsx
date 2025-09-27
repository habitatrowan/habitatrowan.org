// components/Contact_Info.tsx
import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const NEUTRAL_MUTED = "text-neutral-600 dark:text-neutral-300";
const NEUTRAL_CARD = "bg-white dark:bg-neutral-900";
const NEUTRAL_BORDER = "border border-neutral-200 dark:border-neutral-700";
const CARD_BASE = `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl p-6 transition-transform hover:-translate-y-0.5 shadow-[0_6px_24px_rgba(0,0,0,0.12)]`;
const ICON_GRADIENT = { background: "linear-gradient(90deg, #005596 0%, #54B948 100%)" };

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
          return (
            <a
              key={c.title}
              href={c.href}
              className={`${CARD_BASE} block`}
              {...(c.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-[0_2px_12px_rgba(0,0,0,0.12)]"
                style={ICON_GRADIENT}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-1">{c.title}</h3>
              <p className="font-medium">{c.info}</p>
              <p className={`${NEUTRAL_MUTED} text-sm`}>{c.description}</p>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default Contact_Info;
