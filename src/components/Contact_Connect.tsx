import React from "react";
import { Facebook, Instagram } from "lucide-react";

const NEUTRAL_MUTED = "text-neutral-600 dark:text-neutral-300";

const igLinks = [
  { name: "Instagram — Rowan ReStore", url: "https://www.instagram.com/rowanrestore/" },
  { name: "Instagram — Furniture Finds", url: "https://www.instagram.com/restorefurniturefinds/" },
  { name: "Instagram — Habitat Rowan", url: "https://www.instagram.com/habitatrowan/" }
];

const fbLinks = [
  { name: "Facebook — Rowan ReStore", url: "https://www.facebook.com/rowanrestore" },
  { name: "Facebook — Furniture Finds", url: "https://www.facebook.com/restorefurniturefinds/" },
  { name: "Facebook — Habitat Rowan", url: "https://www.facebook.com/habitatrowannc" }
];

const igGradient = { background: "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)" };
const fbGradient = { background: "linear-gradient(90deg, #1877F2 0%, #0E5AAB 100%)" };

const Contact_Connect: React.FC = () => {
  return (
    <>
      <h2 className="text-3xl font-extrabold mb-2">Connect with us!</h2>
      <p className={`${NEUTRAL_MUTED} mb-6`}>Follow our ReStore and Affiliate accounts for updates, events, and stories.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Instagram</h3>
          <div className="space-y-3">
            {igLinks.map((l) => (
              <a
                key={l.name}
                href={l.url}
                className="rounded-xl p-4 flex items-center gap-3 text-white transition-transform hover:-translate-y-0.5"
                style={igGradient}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-white" />
                </span>
                <span className="font-medium">{l.name}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Facebook</h3>
          <div className="space-y-3">
            {fbLinks.map((l) => (
              <a
                key={l.name}
                href={l.url}
                className="rounded-xl p-4 flex items-center gap-3 text-white transition-transform hover:-translate-y-0.5"
                style={fbGradient}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                  <Facebook className="w-5 h-5 text-white" />
                </span>
                <span className="font-medium">{l.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact_Connect;
