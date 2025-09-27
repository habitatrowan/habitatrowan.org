import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import FadeCarousel from "../components/z_Carousel";
import LogoMarquee, { Logo } from "../components/HomePage_Partners";
import Updates from "../components/HomePage_Updates";
import ImpactGrid from "../components/HomePage_Stats";
import Hero from "../components/HomePage_Hero";

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

const HomePage = () => {
  const partnersRef = useReveal<HTMLDivElement>();
  const galleryRef = useReveal<HTMLDivElement>();
  const missionRef = useReveal<HTMLDivElement>();
  const featuredRef = useReveal<HTMLDivElement>();

  const featuredImages = ["/images/Home_googler2.png", "/images/Home_googler3.png", "/images/Home_googler4.png"];
  const photoGallery = [
    "/images/Home_gallery1.jpg",
    "/images/Home_gallery2.jpg",
    "/images/Home_gallery3.jpg",
    "/images/Home_gallery4.jpg",
    "/images/Home_gallery5.jpg",
    "/images/Home_gallery6.JPG",
    "/images/Home_gallery7.JPG",
  ];

  const partnerLogos: Logo[] = [
    { src: "/logos/cte.png", alt: "CTE", href: "https://www.cte.com" },
    { src: "/logos/foodlion.png", alt: "Food Lion", href: "https://www.foodlion.com" },
    { src: "/logos/merrittmason.png", alt: "Merritt Mason", href: "https://www.merrittmason.com/" },
    { src: "/logos/neimanmarcus.png", alt: "Neiman Marcus", href: "https://www.neimanmarcus.com" },
    { src: "/logos/natekiflemariam.png", alt: "Nate Kiflemariam", href: "https://www.linkedin.com/in/nate-kiflemariam/" },
    { src: "/logos/sun.png", alt: "Sun Warehouse and Distribution", href: "https://www.sun.com" },
    { src: "/logos/claytonhomes.png", alt: "Clayton Homes", href: "https://www.claytonhomes.com" },
    { src: "/logos/macys.png", alt: "Macy's", href: "https://www.macys.com" },
    { src: "/logos/chewy.png", alt: "Chewy", href: "https://www.chewy.com" },
    { src: "/logos/cozart.png", alt: "Cozart Lumber", href: "https://www.cozartlumber.com" },
    { src: "/logos/hobbylobby.png", alt: "Hobby Lobby", href: "https://www.hobbylobby.com" },
    { src: "/logos/lowes.png", alt: "Lowe's", href: "https://www.lowes.com" },
    { src: "/logos/kirklands.png", alt: "Kirkland's", href: "https://www.kirklands.com" },
    { src: "/logos/horchow.png", alt: "Horchow", href: "https://www.horchow.com" },
  ];

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className={`${NEUTRAL_TEXT} allow-motion`}>
      <Hero
        bgSrc="/images/heroimage.jpg"
      />

      <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

      <Updates dataUrl="/data/home_updates.json" />

      <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

      <section id="partners" className="py-16 bg-neutral-50 dark:bg-neutral-950 scroll-mt-28">
        <div ref={partnersRef} className="max-w-6xl mx-auto px-4 text-center reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8">
            <span className="text-[#005596]">Our</span> <span className="text-[#54B948]">Partners</span>
          </h2>

          <LogoMarquee logos={partnerLogos} speedSec={35} height={150} gapClass="gap-0" />

          <p className={`${NEUTRAL_MUTED} mt-6 max-w-2xl mx-auto`}>
            We're deeply thankful for our incredible partners, who contribute in countless ways to make our mission possible.
          </p>
        </div>
      </section>

      <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

      <section id="gallery" className="py-10 scroll-mt-28">
        <div ref={galleryRef} className="max-w-6xl mx-auto px-4 reveal">
          <FadeCarousel images={photoGallery} intervalMs={4500} aspect="aspect-[16/9]" rounded="rounded-xl" />
        </div>
      </section>

      <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

      <section id="mission" className="py-16 bg-neutral-100 dark:bg-neutral-950 scroll-mt-28">
        <div ref={missionRef} className="max-w-4xl mx-auto px-4 text-center reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 leading-tight">
            <span className="text-[#005596]">Mission</span> <span className="text-[#54B948]">Statement</span>
          </h2>
          <p className={`text-lg sm:text-xl ${NEUTRAL_MUTED} leading-relaxed`}>
            Seeking to put God&apos;s love into action, Habitat for Humanity brings people together to build homes, communities and hope.
          </p>
        </div>
      </section>

      <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

      <ImpactGrid dataUrl="/data/home_impact.json" />

      <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

      <section id="testimonials" className="py-16 bg-neutral-50 dark:bg-neutral-950 scroll-mt-28">
        <div ref={featuredRef} className="max-w-6xl mx-auto px-4 reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12">
            <span className="text-[#005596]">Community</span> <span className="text-[#54B948]">Reviews</span>
          </h2>
        </div>
        <div className="max-w-6xl mx-auto px-4">
          <FadeCarousel images={featuredImages} intervalMs={5000} aspect="aspect-[16/9]" rounded="rounded-xl" />
        </div>
      </section>

      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); }
        .reveal-in { opacity: 1; transform: translateY(0); transition: opacity 600ms cubic-bezier(.22,.61,.36,1), transform 600ms cubic-bezier(.22,.61,.36,1); }
        .scrollbar-thin { scrollbar-width: thin; }
        .scrollbar-thumb-neutral-300::-webkit-scrollbar { height: 8px; }
        .scrollbar-thumb-neutral-300::-webkit-scrollbar-thumb { background-color: rgba(163,163,163,0.8); border-radius: 8px; }
        .dark .scrollbar-thumb-neutral-700::-webkit-scrollbar-thumb { background-color: rgba(64,64,64,0.8); }
        @media (prefers-reduced-motion: reduce) {
          .allow-motion .fade-layer { transition: opacity 700ms cubic-bezier(.22,.61,.36,1) !important; }
          .allow-motion .reveal-in { transition: opacity 600ms cubic-bezier(.22,.61,.36,1), transform 600ms cubic-bezier(.22,.61,.36,1) !important; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
