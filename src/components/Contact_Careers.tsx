import React from "react";
import { Linkedin } from "lucide-react";

const linkedinUrl = "#";
const liGradient = { background: "linear-gradient(90deg, #0A66C2 0%, #004182 100%)" };

const Contact_Careers: React.FC = () => {
  return (
    <>
      <h2 className="text-3xl font-extrabold mb-2">Careers</h2>
      <p className="text-neutral-600 dark:text-neutral-300 mb-6">Explore opportunities to work with Habitat for Humanity of Rowan County.</p>
      <div className="max-w-xl">
        <a
          href={linkedinUrl}
          className="rounded-xl p-4 flex items-center gap-3 text-white transition-transform hover:-translate-y-0.5"
          style={liGradient}
          aria-disabled={linkedinUrl === "#"}
        >
          <span className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
            <Linkedin className="w-5 h-5 text-white" />
          </span>
          <span className="font-medium">{linkedinUrl === "#" ? "LinkedIn (coming soon)" : "Habitat Rowan on LinkedIn"}</span>
        </a>
      </div>
    </>
  );
};

export default Contact_Careers;
