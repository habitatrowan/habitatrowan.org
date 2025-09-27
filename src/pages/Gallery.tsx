import React, { useEffect, useRef } from "react";
import ZCarousel from "../components/z_Carousel";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("reveal-in");
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const NEUTRAL_TEXT = "text-neutral-900 dark:text-neutral-50";
const NEUTRAL_MUTED = "text-neutral-600 dark:text-neutral-300";
const NEUTRAL_CARD = "bg-white dark:bg-neutral-900";
const NEUTRAL_BORDER = "border border-neutral-200 dark:border-neutral-700";
const CARD_BASE = `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)]`;

const housingImages = [
  "/images/OwnHome_carousel2.JPG",
  "/images/Home_gallery4.jpg",
  "/images/OwnHome_carousel4.jpg",
  "/images/OwnHome_carousel1.JPG",
];

const restoreImages = [
  "/images/Gallery_Restore1.JPG",
  "/images/Gallery_Restore2.JPG",
  "/images/Gallery_Restore3.JPG",
  "/images/Gallery_Restore4.JPG"
];

const partnerImages = [
  "/images/Gallery_Partner1.jpg",
  "/images/Gallery_Partner2.jpg",
  "/images/Home_gallery7.JPG",
  "/images/Home_gallery6.JPG",
  "/images/Home_gallery5.jpg",
  "/images/Home_gallery2.jpg"
];

const SECTION_DIVIDER = <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 my-12" />;

const News: React.FC = () => {
  const headerRef = useReveal<HTMLDivElement>();
  const housingRef = useReveal<HTMLDivElement>();
  const restoreRef = useReveal<HTMLDivElement>();
  const partnerRef = useReveal<HTMLDivElement>();

  return (
    <div className={`min-h-screen py-16 ${NEUTRAL_TEXT}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={headerRef} className="text-center mb-12 reveal">
          <h1 className="text-4xl font-extrabold mb-4">
            <span className="text-[#005596]">Photo</span>{" "}
            <span className="text-[#54B948]">Gallery</span>
          </h1>
          <p className={`text-xl ${NEUTRAL_MUTED} max-w-3xl mx-auto`}>
            A look at our work across Rowan County — from build days and home dedications to ReStore life and the partners who make it possible.
          </p>
        </div>
        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-16" />

        <section ref={housingRef} className="reveal">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold">Housing Ministry</h2>
            <p className={`${NEUTRAL_MUTED} mt-2 max-w-3xl`}>
              Build days, sweat equity, and key ceremonies — moments where volunteers and partner families work side by side to create stability and hope.
            </p>
          </div>

          <div className="relative">
            <div className="tile-bg pointer-events-none absolute inset-0 rounded-2xl" aria-hidden="true" />
            <div className={`${CARD_BASE} relative p-2 rounded-2xl`}>
              <ZCarousel
                images={housingImages}
                intervalMs={5000}
                aspect="aspect-[16/9]"
                rounded="rounded-xl"
                alt="Housing Ministry"
              />
            </div>
          </div>
        </section>

        {SECTION_DIVIDER}

        <section ref={restoreRef} className="reveal">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold">ReStore</h2>
            <p className={`${NEUTRAL_MUTED} mt-2 max-w-3xl`}>
              Donations, deals, and a whole lot of reuse. Sales support our builds while keeping quality items out of the landfill.
            </p>
          </div>

          <div className="relative">
            <div className="tile-bg pointer-events-none absolute inset-0 rounded-2xl" aria-hidden="true" />
            <div className={`${CARD_BASE} relative p-2 rounded-2xl`}>
              <ZCarousel
                images={restoreImages}
                intervalMs={5000}
                aspect="aspect-[16/9]"
                rounded="rounded-xl"
                alt="ReStore"
              />
            </div>
          </div>
        </section>

        {SECTION_DIVIDER}

        <section ref={partnerRef} className="reveal">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold">Community Partners</h2>
            <p className={`${NEUTRAL_MUTED} mt-2 max-w-3xl`}>
              Faith groups, schools, businesses, and civic organizations — these partnerships power our mission year after year.
            </p>
          </div>

          <div className="relative">
            <div className="tile-bg pointer-events-none absolute inset-0 rounded-2xl" aria-hidden="true" />
            <div className={`${CARD_BASE} relative p-2 rounded-2xl`}>
              <ZCarousel
                images={partnerImages}
                intervalMs={5000}
                aspect="aspect-[16/9]"
                rounded="rounded-xl"
                alt="Community Partners"
              />
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); }
        .reveal-in { opacity: 1; transform: translateY(0);
          transition: opacity 600ms cubic-bezier(.22,.61,.36,1),
                      transform 600ms cubic-bezier(.22,.61,.36,1); }

        /* Subtle tiles behind each gallery card */
        .tile-bg {
          background-image:
            linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 24px 24px, 24px 24px;
          filter: var(--tile-filter, none);
        }
        @media (prefers-color-scheme: dark) {
          .tile-bg {
            --tile-filter: brightness(0.8);
          }
        }
      `}</style>
    </div>
  );
};

export default News;
