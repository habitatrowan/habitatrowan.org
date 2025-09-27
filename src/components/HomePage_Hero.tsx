import React, { useEffect, useRef } from "react";
import LearnMore from "./HomePage_HeroCTA";

type Props = {
  id?: string;
  bgSrc?: string;
  titleLine1?: React.ReactNode;
  titleLine2?: React.ReactNode;
  subtitle?: React.ReactNode;
  learnMoreTo?: "/about";
};

const NEUTRAL_MUTED = "text-neutral-600 dark:text-neutral-300";

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

const Hero: React.FC<Props> = ({
  id = "hero",
  bgSrc = "/images/heroimage.jpg",
  titleLine1 = (
    <>
      Building <span className="text-[#005596]">Homes</span>,
    </>
  ),
  titleLine2 = (
    <>
      Building <span className="text-[#54B948]">Hope</span>.
    </>
  ),
  subtitle = (
    <>
      Seeking to put God&apos;s love into action, bringing people together to
      build homes, communities and hope in Rowan County.
    </>
  ),
  learnMoreTo = "/about",
}) => {
  const heroRef = useReveal<HTMLDivElement>();

  return (
    <section id={id} className="relative w-full overflow-hidden scroll-mt-28">
      <img
        src={bgSrc}
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />

      <div
        ref={heroRef}
        className="relative z-10 min-h-[78vh] sm:min-h-[72vh] lg:aspect-[16/9] grid place-items-center px-4 sm:px-6 reveal"
      >
        <div className="max-w-3xl md:max-w-4xl text-center font-semibold text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 md:mb-6 leading-tight">
            {titleLine1}
            <span className="hidden sm:inline">
              <br />
            </span>
            <span className="sm:hidden"> </span>
            {titleLine2}
          </h1>

          <p
            className={`text-base sm:text-lg md:text-2xl mb-6 md:mb-8 max-w-2xl mx-auto text-white/95 ${NEUTRAL_MUTED}`}
          >
            {subtitle}
          </p>

          {/* Learn More button */}
          <div className="flex justify-center">
            <LearnMore to={learnMoreTo} />
          </div>
        </div>
      </div>

      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); }
        .reveal-in { opacity: 1; transform: translateY(0); transition: opacity 600ms cubic-bezier(.22,.61,.36,1), transform 600ms cubic-bezier(.22,.61,.36,1); }
      `}</style>
    </section>
  );
};

export default Hero;
