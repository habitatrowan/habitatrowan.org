import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const NEUTRAL_TEXT = "text-neutral-900";
const NEUTRAL_MUTED = "text-neutral-600";
const NEUTRAL_CARD = "bg-white";
const NEUTRAL_BORDER = "border border-neutral-200";
const CARD_BASE = `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)] transition-all duration-300 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.18)] hover:ring-2 ring-neutral-300`;
const GRAD_BG = { background: "transparent", border: "2px solid #171717" };

const address = "1707 S Main St, Salisbury, NC 28144";

const entries = [
  {
    name: "ReStore",
    address,
    phone: "(704) 642-1222",
    email: "store@habitatrowan.org",
    hours: [
      { label: "Monday", value: "9:00 AM – 5:00 PM" },
      { label: "Tuesday", value: "9:00 AM – 5:00 PM" },
      { label: "Wednesday", value: "9:00 AM – 5:00 PM" },
      { label: "Thursday", value: "9:00 AM – 5:00 PM" },
      { label: "Friday", value: "9:00 AM – 5:00 PM" },
      { label: "Saturday", value: "9:00 AM – 5:00 PM" },
      { label: "Sunday", value: "Closed" }
    ]
  },
  {
    name: "Housing Ministry",
    address,
    phone: "(704) 642-6292",
    email: "habitat@habitatrowan.org",
    hours: [
      { label: "Monday", value: "9:00 AM – 5:00 PM" },
      { label: "Tuesday", value: "9:00 AM – 5:00 PM" },
      { label: "Wednesday", value: "9:00 AM – 5:00 PM" },
      { label: "Thursday", value: "9:00 AM – 5:00 PM" },
      { label: "Friday", value: "9:00 AM – 5:00 PM" },
      { label: "Saturday", value: "Closed" },
      { label: "Sunday", value: "Closed" }
    ]
  }
];

const Location_Address: React.FC = () => {
  return (
    <section className={`${CARD_BASE} p-8`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {entries.map((e) => (
          <div key={e.name} className="space-y-6">
            <h3 className={`text-2xl font-extrabold ${NEUTRAL_TEXT}`}>{e.name}</h3>

            <div className="grid grid-cols-[3rem,1fr] gap-4 items-start">
              <span className="w-12 h-12 rounded-full flex items-center justify-center" style={GRAD_BG}>
                <MapPin className="w-5 h-5 text-neutral-900" />
              </span>
              <div>
                <p className="font-semibold">Address</p>
                <p className={NEUTRAL_MUTED}>{e.address}</p>
              </div>
            </div>

            <div className="grid grid-cols-[3rem,1fr] gap-4 items-start">
              <span className="w-12 h-12 rounded-full flex items-center justify-center" style={GRAD_BG}>
                <Phone className="w-5 h-5 text-neutral-900" />
              </span>
              <div>
                <p className="font-semibold">Phone</p>
                <p className={NEUTRAL_MUTED}>{e.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-[3rem,1fr] gap-4 items-start">
              <span className="w-12 h-12 rounded-full flex items-center justify-center" style={GRAD_BG}>
                <Mail className="w-5 h-5 text-neutral-900" />
              </span>
              <div>
                <p className="font-semibold">Email</p>
                <p className={NEUTRAL_MUTED}>{e.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-[3rem,1fr] gap-4 items-start">
              <span className="w-12 h-12 rounded-full flex items-center justify-center" style={GRAD_BG}>
                <Clock className="w-5 h-5 text-neutral-900" />
              </span>
              <div>
                <p className="font-semibold mb-1">Hours</p>
                <dl className="grid grid-cols-[120px,1fr] gap-x-2 gap-y-0">
                  {e.hours.map((h) => (
                    <React.Fragment key={h.label}>
                      <dt className={`${NEUTRAL_MUTED} leading-tight`}>{h.label}:</dt>
                      <dd className="font-medium leading-tight">{h.value}</dd>
                    </React.Fragment>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Location_Address;
