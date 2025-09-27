import React from "react";
import { Link } from "react-router-dom";

type Props = {
  /** Destination link.
   *
   * Examples:
   * - `"/about#mission"` → Goes to the Mission section of the About page
   * - `"/get-involved"` → Goes to the Get Involved page
   * - `"#impact"` → Scrolls to the Impact section on the current page
   * - `"https://habitat.org"` → Opens external site (if extended for external links)
   */
  to: string;
};

const BTN_BASE =
  "inline-flex items-center justify-center rounded-full font-semibold " +
  "border-4 border-white text-white " + // thicker outline
  "px-36 py-3 text-base md:text-lg " +  // extra wide button
  "bg-white/1 backdrop-blur-lg " +     // glass effect
  "transition-all duration-200 ease-[cubic-bezier(.22,.61,.36,1)] " +
  "hover:-translate-y-0.5 hover:bg-white/20 " +
  "focus:outline-none shadow-[0_4px_24px_rgba(0,0,0,0.25)]";

const LearnMore: React.FC<Props> = ({ to }) => {
  return (
    <Link to={to} className={BTN_BASE}>
      LEARN MORE
    </Link>
  );
};

export default LearnMore;
