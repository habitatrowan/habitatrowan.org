// components/GetInvolved_Volunteers.tsx
import React from "react";
import { Hammer, ShoppingCart, Users, GraduationCap } from "lucide-react";

const NEUTRAL_MUTED = "text-neutral-600 dark:text-neutral-300";
const BORDER_SOFT = "border border-neutral-200 dark:border-neutral-800";
const ICON_BG = "bg-gradient-to-r from-[#005596] to-[#54B948]";

const opportunities = [
  {
    id: "construction",
    title: "Construction Volunteers",
    description: "Hands-on homebuilding: framing, roofing, painting, and finish work.",
    requirements: "No experience necessary. Training and supervision provided.",
    schedule: "8:00 AM – 5:00 PM Monday – Saturday",
    icon: Hammer
  },
  {
    id: "restore",
    title: "ReStore Volunteers",
    description: "Customer support, organizing inventory, processing donations at the ReStore.",
    requirements: "Customer-service skills helpful but not required.",
    schedule: "Flexible weekday and weekend shifts available",
    icon: ShoppingCart
  },
  {
    id: "committees",
    title: "Committee Work",
    description: "Help guide programs and support families: Family Support, Construction, and Warranty committees.",
    requirements: "Professional skills in relevant areas preferred.",
    schedule: "Monthly meetings and ongoing project work",
    icon: Users
  },
  {
    id: "students",
    title: "Student Groups",
    description: "Group opportunities for high school and college students.",
    requirements: "Adult supervision required for groups under 18.",
    schedule: "Flexible scheduling for group projects",
    icon: GraduationCap
  }
];

const safetyRules = [
  "All volunteers must be at least 16 years old for construction sites",
  "Closed-toe shoes required at all times on construction sites",
  "Hard hats and safety glasses provided and must be worn",
  "No volunteers under the influence of drugs or alcohol",
  "Follow all supervisor instructions and safety protocols",
  "Report any injuries or unsafe conditions immediately",
  "Stay hydrated and take breaks as needed",
  "Dress appropriately for weather and work conditions"
];

const GetInvolved_Volunteers: React.FC = () => {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {opportunities.map((op) => {
          const Icon = op.icon;
          return (
            <div key={op.id} className={`rounded-xl p-6 ${BORDER_SOFT} flex flex-col h-full`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${ICON_BG}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-bold">{op.title}</h4>
              </div>

              <div className="mb-4">
                <p className={`${NEUTRAL_MUTED}`}>{op.description}</p>
              </div>

              <ul className="mt-auto space-y-2 text-sm">
                <li className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 bg-gradient-to-r from-[#005596] to-[#54B948]" />
                  <span className={NEUTRAL_MUTED}><strong>Requirements:</strong> {op.requirements}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 bg-gradient-to-r from-[#005596] to-[#54B948]" />
                  <span className={NEUTRAL_MUTED}><strong>Schedule:</strong> {op.schedule}</span>
                </li>
              </ul>
            </div>
          );
        })}
      </div>

      <div>
        <h3 className="text-2xl font-extrabold mb-4">Qualifications</h3>
        <ul className="space-y-2">
          {safetyRules.map((rule, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 bg-gradient-to-r from-[#005596] to-[#54B948]" />
              <span className={NEUTRAL_MUTED}>{rule}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GetInvolved_Volunteers;
