import React, { useEffect, useRef, useState } from "react";
import { fetchJson } from "../utils/fetchJson";
import AboutStatements from "../components/AboutPage_Section";
import PresidentCard from "../components/AboutPage_President";
import StaffGrid, { Staff } from "../components/AboutPage_Staff";
import HistoryTimeline, { HistoryMilestone } from "../components/AboutPage_Timeline";
import OurMission from "../components/AboutPage_Mission";
import OurVision from "../components/AboutPage_Vision";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("reveal-in");
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

const NEUTRAL_TEXT = "text-neutral-900 dark:text-neutral-50";
const NEUTRAL_MUTED = "text-neutral-600 dark:text-neutral-300";
const MAIN_PHONE = "(704) 642-1222";

const SectionHeader = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <div className="my-8">
    <h2 id={id} className="text-3xl font-extrabold text-center whitespace-nowrap scroll-mt-28 mb-4">
      {children}
    </h2>
    <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />
  </div>
);

const About = () => {
  const [staffMembers, setStaffMembers] = useState<Staff[]>([]);
  const [historyMilestones, setHistoryMilestones] = useState<HistoryMilestone[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const staff = await fetchJson<Staff[]>("/data/about_staff.json");
        if (Array.isArray(staff)) {
          const augmented = staff.map((s) => {
            if (s.name === "Coleman Emerson") return { ...s, ext: "100", phone: MAIN_PHONE };
            if (s.name === "Jane Hartness") return { ...s, ext: "101", phone: MAIN_PHONE };
            if (s.name === "Elizabeth Brady") return { ...s, ext: "102", phone: MAIN_PHONE };
            if (s.name === "Nate Wrights") return { ...s, ext: "103", phone: MAIN_PHONE };
            return s;
          });
          setStaffMembers(augmented);
        }
      } catch {}
      try {
        const history = await fetchJson<HistoryMilestone[]>("/data/about_history.json");
        if (Array.isArray(history)) setHistoryMilestones(history);
      } catch {}
    })();
  }, []);

  const headerRef = useReveal<HTMLDivElement>();
  const aboutRef = useReveal<HTMLDivElement>();
  const missionRef = useReveal<HTMLDivElement>();
  const visionRef = useReveal<HTMLDivElement>();
  const presRef = useReveal<HTMLDivElement>();
  const historyRef = useReveal<HTMLDivElement>();

  return (
    <div className={`min-h-screen py-16 ${NEUTRAL_TEXT}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <header ref={headerRef} className="text-center reveal">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
            <span className="text-[#005596]">About</span>{" "}
            <span className="text-[#54B948]">Us</span>
          </h1>
          <p className={`text-lg ${NEUTRAL_MUTED} max-w-2xl mx-auto`}>
            Who we are, what we believe, and the people behind the work.
          </p>
        </header>

        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

        <section ref={aboutRef} className="reveal">
          <AboutStatements introCount={152} />
        </section>

        <SectionHeader id="mission">
          <span className="text-[#005596]">Our</span>{" "}
          <span className="text-[#54B948]">Mission</span>
        </SectionHeader>
        <section ref={missionRef} className="reveal">
          <div className="max-w-3xl mx-auto">
            <OurMission />
          </div>
        </section>

        <SectionHeader id="vision">
          <span className="text-[#005596]">Our</span>{" "}
          <span className="text-[#54B948]">Vision</span>
        </SectionHeader>
        <section ref={visionRef} className="reveal">
          <div className="max-w-3xl mx-auto">
            <OurVision />
          </div>
        </section>

        <SectionHeader id="president">
          <span className="text-[#005596]">Our</span>{" "}
          <span className="text-[#54B948]">President</span>
        </SectionHeader>
        <section ref={presRef} className="reveal">
          <div className="max-w-4xl mx-auto">
            <PresidentCard nameFirst="Jeff" nameLast="Wetmore" title="President" showContact={false} />
          </div>
        </section>

        <SectionHeader id="staff">
          <span className="text-[#005596]">Our</span>{" "}
          <span className="text-[#54B948]">Staff</span>
        </SectionHeader>
        <section>
          <div className="max-w-6xl mx-auto">
            <StaffGrid items={staffMembers} mainPhone={MAIN_PHONE} />
          </div>
        </section>

        <SectionHeader id="history">
          <span className="text-[#005596]">Our</span>{" "}
          <span className="text-[#54B948]">History</span>
        </SectionHeader>
        <section ref={historyRef} className="reveal">
          <div className="max-w-4xl mx-auto">
            <HistoryTimeline items={historyMilestones} />
          </div>
        </section>
      </div>

      <style>{`
        .reveal { opacity: 0; transform: translateY(20px); }
        .reveal-in { opacity: 1; transform: translateY(0);
          transition: opacity 600ms cubic-bezier(.22,.61,.36,1),
                      transform 600ms cubic-bezier(.22,.61,.36,1); }
        html:focus-within { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
};

export default About;
