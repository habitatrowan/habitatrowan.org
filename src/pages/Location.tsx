import React, { useEffect, useRef } from "react";
import Location_Address from "../components/Location_Address";
import Location_Map from "../components/Location_Map";
import Location_Box from "../components/Location_Box";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { el.classList.add("reveal-in"); obs.unobserve(el); } }),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const NEUTRAL_TEXT = "text-neutral-900 dark:text-neutral-50";
const NEUTRAL_MUTED = "text-neutral-600 dark:text-neutral-300";

const address = "1707 S Main St, Salisbury, NC 28144";

const Locations: React.FC = () => {
  const headerRef = useReveal<HTMLDivElement>();
  const addressRef = useReveal<HTMLDivElement>();
  const mapRef = useReveal<HTMLDivElement>();
  const boxRef = useReveal<HTMLDivElement>();

  return (
    <div className={`min-h-screen py-16 ${NEUTRAL_TEXT}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-12 reveal">
          <h1 className="text-4xl font-extrabold mb-4">
            <span className="text-[#005596]">Our</span> <span className="text-[#54B948]">Location</span>
          </h1>
          <p className={`text-xl ${NEUTRAL_MUTED} max-w-3xl mx-auto`}>
            Visit our Rowan County campus for homeowner services, volunteer coordination, and community support.
          </p>
        </div>

        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-12" />

        <div ref={addressRef} className="reveal mb-12">
          <Location_Address />
        </div>

        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 my-12" />

        <div ref={mapRef} className="reveal mb-12">

          <Location_Map address={address} title="Habitat Rowan Campus Map" />
        </div>


        <div ref={boxRef} className="reveal">
          <Location_Box />
        </div>
      </div>

      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); }
        .reveal-in { opacity: 1; transform: translateY(0); transition: opacity 600ms cubic-bezier(.22,.61,.36,1), transform 600ms cubic-bezier(.22,.61,.36,1); }
      `}</style>
    </div>
  );
};

export default Locations;
