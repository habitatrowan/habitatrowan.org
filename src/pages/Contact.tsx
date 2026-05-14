import React, { useEffect, useRef } from "react";
import Contact_Info from "../components/Contact_GIT.tsx";
import Contact_Connect from "../components/Contact_Connect";
import Contact_Careers from "../components/Contact_Careers";
import Contact_FAQ from "../components/Contact_FAQ.tsx";

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

const NEUTRAL_TEXT = "text-neutral-900";
const NEUTRAL_MUTED = "text-neutral-600";
const NEUTRAL_CARD = "bg-white";
const NEUTRAL_BORDER = "border border-neutral-200";
const CARD_BASE = `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)]`;

const Contact: React.FC = () => {
  const headerRef = useReveal<HTMLDivElement>();
  const wrapperRef = useReveal<HTMLDivElement>();
  const faqRef = useReveal<HTMLDivElement>();

  return (
    <div className={`min-h-screen py-16 ${NEUTRAL_TEXT}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-12 reveal">
          <h1 className="text-4xl font-extrabold mb-4 text-neutral-900">
            Contact Us
          </h1>
          <p className={`text-xl ${NEUTRAL_MUTED} max-w-3xl mx-auto`}>
            Clean, simple ways to get in touch. Find phone and email, social links, and quick answers.
          </p>
        </div>

        <div className="h-px w-full bg-neutral-200 mb-16" />

        <div ref={wrapperRef} className={`${CARD_BASE} p-8 space-y-12 reveal`}>
          <Contact_Info />
          <div className="h-px w-full bg-neutral-200" />
          <Contact_Connect />
          <div className="h-px w-full bg-neutral-200" />
          <Contact_Careers />
        </div>

        <div className="h-px w-full bg-neutral-200 my-12" />

        <section ref={faqRef} className="reveal">
          <Contact_FAQ />
        </section>
      </div>

      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); }
        .reveal-in { opacity: 1; transform: translateY(0); transition: opacity 600ms cubic-bezier(.22,.61,.36,1), transform 600ms cubic-bezier(.22,.61,.36,1); }
      `}</style>
    </div>
  );
};

export default Contact;
