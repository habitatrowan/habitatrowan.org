import React, { useEffect, useRef, useState } from "react";
import ZCarousel from "../components/z_Carousel";
import OwnHome_Nav from "../components/OwnHome_Nav";
import OwnHome_Checklist from "../components/OwnHome_Checklist";
import OwnHome_App from "../components/OwnHome_App";
import OwnHome_FAQ from "../components/OwnHome_FAQ";

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

const PREQUAL_PDF_URL = "/docs/pre-qualification.pdf";
const NEUTRAL_TEXT = "text-neutral-900 dark:text-neutral-50";
const NEUTRAL_MUTED = "text-neutral-600 dark:text-neutral-300";

const NAV = [
  { id: "eligibility", label: "Eligibility" },
  { id: "process", label: "Application Process" },
  { id: "apply", label: "Ready to Apply" },
  { id: "faq", label: "FAQ" }
];

const photoGallery = [
  "/images/OwnHome_carousel1.JPG",
  "/images/OwnHome_carousel2.JPG",
  "/images/OwnHome_carousel3.jpg",
  "/images/OwnHome_carousel4.jpg"
];

const OwnHome: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(NAV[0].id);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis?.target?.id) setActiveId(vis.target.id);
      },
      { root: null, rootMargin: "0px 0px -60% 0px", threshold: [0.15, 0.3, 0.6] }
    );
    NAV.forEach((s) => {
      const n = document.getElementById(s.id);
      if (n) observer.observe(n);
    });
    return () => observer.disconnect();
  }, []);

  const headerRef = useReveal<HTMLDivElement>();
  const navRef = useReveal<HTMLDivElement>();
  const carouselRef = useReveal<HTMLDivElement>();
  const contentRef = useReveal<HTMLDivElement>();

  return (
    <div className={`min-h-screen py-16 ${NEUTRAL_TEXT}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-10 reveal">
          <h1 className="text-4xl font-extrabold mb-3">
            <span className="text-[#005596]">Housing</span> <span className="text-[#54B948]">Ministry</span>
          </h1>
          <p className={`text-xl ${NEUTRAL_MUTED} max-w-3xl mx-auto`}>Habitat partners with families to help them achieve the strength, stability, and independence of homeownership.</p>
        </div>

        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-16" />

        <div ref={navRef} className="mb-8 reveal">
          <OwnHome_Nav sections={NAV} activeId={activeId} onSelect={scrollToId} />
        </div>

        <div ref={contentRef} className="space-y-12 reveal max-w-5xl mx-auto">
          <OwnHome_Checklist />
          <OwnHome_App prequalUrl={PREQUAL_PDF_URL} />
          <OwnHome_FAQ />
        </div>

        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 my-16" />

        <section ref={carouselRef} className="mt-0 mb-12 reveal">
          <ZCarousel images={photoGallery} intervalMs={5000} aspect="aspect-[16/9]" rounded="rounded-xl" alt="Habitat program highlights" />
        </section>
      </div>

      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); }
        .reveal-in { opacity: 1; transform: translateY(0); transition: opacity 600ms cubic-bezier(.22,.61,.36,1), transform 600ms cubic-bezier(.22,.61,.36,1); }
      `}</style>
    </div>
  );
};

export default OwnHome;
