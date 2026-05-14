import React, { useEffect, useRef } from "react";

type Props = {
  id?: string;
  bgSrc?: string;
  titleLine1?: React.ReactNode;
  titleLine2?: React.ReactNode;
  subtitle?: React.ReactNode;
};

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("hero-reveal-in");
            obs.unobserve(el);
          }
        }),
      { threshold: 0.05 }
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
      Building{" "}
      <em className="not-italic" style={{ color: "#FFFFFF", textDecoration: "underline", textDecorationColor: "#005596", textDecorationThickness: "4px", textUnderlineOffset: "6px" }}>
        Homes
      </em>
      ,
    </>
  ),
  titleLine2 = (
    <>
      Building{" "}
      <em className="not-italic" style={{ color: "#FFFFFF", textDecoration: "underline", textDecorationColor: "#54B948", textDecorationThickness: "4px", textUnderlineOffset: "6px" }}>
        Hope
      </em>
      .
    </>
  ),
  subtitle = (
    <>
      Seeking to put God&apos;s love into action, bringing people together to
      build homes, communities, and hope in Rowan County.
    </>
  ),
}) => {
  const heroRef = useReveal<HTMLDivElement>();

  return (
    <section id={id} className="relative w-full overflow-hidden scroll-mt-28">
      {/* Background image */}
      <img
        src={bgSrc}
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Multi-layer overlay for depth and atmosphere */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(165deg, rgba(0,30,60,0.30) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.75) 100%)" }} />
      {/* Bottom vignette to anchor content */}
      <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent)" }} />

      <div
        ref={heroRef}
        className="relative z-10 hero-reveal"
        style={{ minHeight: "88vh", display: "grid", placeItems: "center", padding: "6rem 1rem 4rem" }}
      >
        <div className="max-w-4xl text-center text-white">
          {/* Eyebrow label */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm">
            <span className="text-xs sm:text-sm font-body font-semibold tracking-widest uppercase text-white/90">
              Habitat for Humanity · Rowan County
            </span>
          </div>

          <h1
            className="font-display font-black text-white leading-[0.95] mb-6"
            style={{ fontSize: "clamp(3rem, 9vw, 6.5rem)" }}
          >
            <div>{titleLine1}</div>
            <div>{titleLine2}</div>
          </h1>

          <p
            className="font-body text-white/90 leading-relaxed mb-10 mx-auto"
            style={{ fontSize: "clamp(1rem, 2.2vw, 1.35rem)", maxWidth: "38rem" }}
          >
            {subtitle}
          </p>

        </div>
      </div>

      <style>{`
        .hero-reveal { opacity: 0; transform: translateY(32px); }
        .hero-reveal-in {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 900ms cubic-bezier(.22,.61,.36,1), transform 900ms cubic-bezier(.22,.61,.36,1);
        }
      `}</style>
    </section>
  );
};

export default Hero;
