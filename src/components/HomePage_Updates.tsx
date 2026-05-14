import React, { useEffect, useRef, useState } from "react";
import { Clock } from "lucide-react";
import { fetchJson } from "../utils/fetchJson";

type UpdateItem = { title: string; body: string; time: string };

const DEFAULT_UPDATES: UpdateItem[] = [
  { title: "Weather Closure",      body: "We are closed today due to severe weather. Stay safe — we'll post when we reopen.",                   time: "Mar 12, 2025 • 8:05 AM" },
  { title: "Milestone!",           body: "We just finished our 155th home. Huge thanks to every volunteer and partner who swung a hammer.",      time: "Mar 8, 2025 • 4:20 PM" },
  { title: "ReStore Donation Day", body: "Extra hands needed this Saturday for a big donation intake. Stop by if you can lend an hour.",          time: "Mar 6, 2025 • 9:10 AM" },
  { title: "Info Session Reminder",body: "Homeownership info session this Saturday at 10:00 AM at our office. No registration required.",         time: "Mar 1, 2025 • 2:00 PM" },
];

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

type Props = {
  dataUrl?:   string;
  id?:        string;
  className?: string;
  heading?:   React.ReactNode;
};

const Updates: React.FC<Props> = ({
  dataUrl   = "/data/home_updates.json",
  id        = "updates",
  className = "",
  heading,
}) => {
  const [items, setItems] = useState<UpdateItem[]>(DEFAULT_UPDATES);
  const sectionRef = useReveal<HTMLDivElement>();

  useEffect(() => {
    (async () => {
      try {
        const updates = await fetchJson<UpdateItem[]>(dataUrl);
        if (Array.isArray(updates) && updates.every((u) => u?.title && u?.body && u?.time)) {
          setItems(updates);
        }
      } catch {}
    })();
  }, [dataUrl]);

  const defaultHeading = (
    <div className="text-center mb-10">
      <span className="inline-block text-xs font-body font-semibold tracking-widest uppercase text-[#54B948] mb-3">
        Stay in the loop
      </span>
      <h2 className="font-display font-black leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
        <span style={{ color: "#005596" }}>Latest</span>{" "}
        <span style={{ color: "#54B948" }}>Updates</span>
      </h2>
    </div>
  );

  return (
    <section id={id} className={`py-16 sm:py-20 scroll-mt-28 ${className}`}>
      <div ref={sectionRef} className="max-w-6xl mx-auto px-4 reveal">
        {heading ?? defaultHeading}

        <div
          className="updates-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory px-1 py-2"
          style={{ scrollBehavior: "smooth" }}
        >
          {items.map((t, i) => (
            <article
              key={i}
              className="group relative min-w-[85%] xs:min-w-[70%] sm:min-w-[360px] max-w-[480px] snap-start rounded-2xl overflow-hidden flex-shrink-0"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-primary)",
                boxShadow: "0 4px 20px -6px var(--shadow)",
                transition: "box-shadow 300ms ease, transform 300ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px -8px var(--shadow)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px -6px var(--shadow)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {/* Top accent bar */}
              <div
                className="h-1 w-full"
                style={{ background: "linear-gradient(90deg, #005596 0%, #54B948 100%)" }}
              />

              <div className="p-6 sm:p-7">
                {/* Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-body font-semibold tracking-wider uppercase px-3 py-1 rounded-full"
                    style={{ background: "rgba(0,85,150,0.08)", color: "#005596" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#54B948]" />
                    Update
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-display font-bold mb-3 leading-snug"
                  style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)", color: "#005596" }}
                >
                  {t.title}
                </h3>

                {/* Body */}
                <p
                  className="font-body text-sm sm:text-base leading-relaxed mb-5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {t.body}
                </p>

                {/* Timestamp */}
                <div
                  className="flex items-center gap-2 text-xs font-body"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                  <time>{t.time}</time>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); }
        .reveal-in { opacity: 1; transform: translateY(0); transition: opacity 700ms cubic-bezier(.22,.61,.36,1), transform 700ms cubic-bezier(.22,.61,.36,1); }
        .updates-scrollbar { scrollbar-width: none; }
        .updates-scrollbar:hover { scrollbar-width: thin; scrollbar-color: rgba(163,163,163,0.6) transparent; }
        .updates-scrollbar::-webkit-scrollbar { height: 6px; }
        .updates-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .updates-scrollbar::-webkit-scrollbar-thumb { background: transparent; border-radius: 8px; }
        .updates-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(163,163,163,0.6); }
      `}</style>
    </section>
  );
};

export default Updates;
