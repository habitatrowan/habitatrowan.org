import React, { useEffect, useRef, useState } from "react";
import { fetchJson } from "../utils/fetchJson";

type ImpactItem = { number: string; label: string; icon: "Home" | "Users" | "Calendar" };

const DEFAULT_IMPACT: ImpactItem[] = [
  { number: "143",  label: "Homes Built",           icon: "Home" },
  { number: "6–8",  label: "Homes Built Annually",  icon: "Calendar" },
  { number: "500+", label: "Volunteers Annually",   icon: "Users" },
];

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.querySelectorAll(".stat-card").forEach((card, i) => {
              setTimeout(() => card.classList.add("stat-card-in"), i * 100);
            });
            obs.unobserve(el);
          }
        }),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

type Props = {
  dataUrl?:  string;
  id?:       string;
  className?: string;
  heading?:  React.ReactNode;
};

const ImpactGrid: React.FC<Props> = ({
  dataUrl   = "/data/home_impact.json",
  id        = "impact",
  className = "",
  heading,
}) => {
  const [items, setItems] = useState<ImpactItem[]>(DEFAULT_IMPACT);
  const sectionRef = useReveal<HTMLDivElement>();

  useEffect(() => {
    (async () => {
      try {
        const impact = await fetchJson<ImpactItem[]>(dataUrl);
        if (Array.isArray(impact) && impact.every((i) => i?.number && i?.label && i?.icon)) {
          setItems(impact);
        }
      } catch {}
    })();
  }, [dataUrl]);

  const defaultHeading = (
    <div className="text-center mb-14">
      <h2 className="font-display font-black leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
        <span style={{ color: "#005596" }}>Our</span>{" "}
        <span style={{ color: "#54B948" }}>Impact</span>
      </h2>
    </div>
  );

  return (
    <section id={id} className={`py-20 scroll-mt-28 ${className}`}>
      <div ref={sectionRef} className="max-w-6xl mx-auto px-4">
        {heading ?? defaultHeading}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((stat, index) => (
            <div
              key={index}
              className="stat-card group relative rounded-2xl overflow-hidden"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-primary)",
                boxShadow: "0 4px 24px -6px var(--shadow)",
              }}
            >
              {/* Left accent bar with brand gradient */}
              <div
                className="absolute inset-y-0 left-0 w-1 rounded-l-2xl transition-all duration-300 group-hover:w-1.5"
                style={{ background: "#171717" }}
              />

              <div className="px-8 py-10">
                {/* Stat number */}
                <div
                  className="font-display font-black leading-none mb-3"
                  style={{
                    fontSize: "clamp(3.5rem, 7vw, 5rem)",
                    color: "#171717",
                  }}
                >
                  {stat.number}
                </div>

                {/* Label */}
                <p className="font-body font-semibold text-lg" style={{ color: "var(--text-secondary)" }}>
                  {stat.label}
                </p>

                {/* Decorative bottom element */}
                <div
                  className="mt-6 h-px w-12 rounded-full transition-all duration-300 group-hover:w-20"
                  style={{ background: "#171717" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .stat-card {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 600ms cubic-bezier(.22,.61,.36,1), transform 600ms cubic-bezier(.22,.61,.36,1), box-shadow 300ms ease;
        }
        .stat-card-in { opacity: 1; transform: translateY(0); }
        .stat-card:hover {
          box-shadow: 0 12px 40px -8px var(--shadow) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
};

export default ImpactGrid;
