import { useEffect, useRef } from "react";
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
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const HomePage = () => {
  const partnersRef  = useReveal<HTMLDivElement>();
  const galleryRef   = useReveal<HTMLDivElement>();
  const missionRef   = useReveal<HTMLDivElement>();
  const reviewsRef   = useReveal<HTMLDivElement>();

  const featuredImages = ["/images/Home_googler2.png", "/images/Home_googler3.png", "/images/Home_googler4.png"];
  const photoGallery   = ["/images/DevTeam.jpg", "/images/Home_gallery2.jpg", "/images/Home_gallery7.JPG"];

  const partnerLogos: Logo[] = [
    { src: "/logos/cte.png",           alt: "CTE",                          href: "https://www.rssed.org/career-technical-education-cte" },
    { src: "/logos/foodlion.png",      alt: "Food Lion",                    href: "https://stores.foodlion.com/nc/salisbury/251-faith-rd" },
    { src: "/logos/merrittmason.png",  alt: "Merritt Mason",                href: "https://www.merrittmason.com/" },
    { src: "/logos/neimanmarcus.png",  alt: "Neiman Marcus",               href: "https://www.neimanmarcus.com" },
    { src: "/logos/natekiflemariam.png",alt: "Nate Kiflemariam",           href: "https://www.linkedin.com/in/nate-kiflemariam/" },
    { src: "/logos/sun.png",           alt: "Sun Warehouse and Distribution",href: "https://www.sun-wd.com/" },
    { src: "/logos/claytonhomes.png",  alt: "Clayton Homes",               href: "https://www.claytonhomes.com" },
    { src: "/logos/macys.png",         alt: "Macy's",                      href: "https://www.macys.com" },
    { src: "/logos/chewy.png",         alt: "Chewy",                       href: "https://www.chewy.com" },
    { src: "/logos/cozart.png",        alt: "Cozart Lumber",               href: "https://www.cozartlumber.com" },
    { src: "/logos/hobbylobby.png",    alt: "Hobby Lobby",                 href: "https://www.hobbylobby.com" },
    { src: "/logos/lowes.png",         alt: "Lowe's",                      href: "https://www.lowes.com" },
    { src: "/logos/kirklands.png",     alt: "Kirkland's",                  href: "https://www.kirklands.com" },
    { src: "/logos/horchow.png",       alt: "Horchow",                     href: "https://www.horchow.com" },
  ];

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="allow-motion">
      {/* ── Hero ─────────────────────────────────────────── */}
      <Hero bgSrc="/images/heroimage.jpg" />

      {/* ── Updates ──────────────────────────────────────── */}
      <Updates dataUrl="/data/home_updates.json" />

      {/* ── Partners ─────────────────────────────────────── */}
      <section
        id="partners"
        className="py-20 scroll-mt-28"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div ref={partnersRef} className="max-w-6xl mx-auto px-4 text-center reveal">
          <h2 className="font-display font-black leading-tight mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            <span style={{ color: "#005596" }}>Our</span>{" "}
            <span style={{ color: "#54B948" }}>Partners</span>
          </h2>
          <p className="font-body text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: "var(--text-secondary)" }}>
            We're deeply thankful for our incredible partners, who contribute in countless ways to make our mission possible.
          </p>

          <LogoMarquee logos={partnerLogos} height={150} gapClass="gap-0" />
        </div>
      </section>

      {/* ── Photo gallery ────────────────────────────────── */}
      <section id="gallery" className="py-14 scroll-mt-28" style={{ background: "var(--bg-primary)" }}>
        <div ref={galleryRef} className="max-w-6xl mx-auto px-4 reveal">
          <FadeCarousel images={photoGallery} intervalMs={13500} aspect="aspect-[16/9]" rounded="rounded-2xl" />
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────── */}
      <section id="mission" className="py-24 scroll-mt-28 relative overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
        {/* Decorative quote mark */}
        <div
          className="absolute -top-8 left-1/2 -translate-x-1/2 font-display font-black select-none pointer-events-none"
          style={{ fontSize: "20rem", lineHeight: 1, color: "#005596", opacity: 0.04 }}
          aria-hidden="true"
        >
          "
        </div>
        <div ref={missionRef} className="relative max-w-4xl mx-auto px-4 text-center reveal">
          <h2 className="font-display font-black leading-tight mb-8" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            <span style={{ color: "#005596" }}>Mission</span>{" "}
            <span style={{ color: "#54B948" }}>Statement</span>
          </h2>
          <p
            className="font-body leading-relaxed italic"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: "var(--text-secondary)" }}
          >
            "Seeking to put God's love into action, Habitat for Humanity brings people together to build homes, communities, and hope."
          </p>

          {/* Divider flourish */}
          <div className="flex items-center justify-center gap-3 mt-10">
            <div className="h-px w-16 rounded-full" style={{ background: "linear-gradient(90deg, transparent, #005596)" }} />
            <div className="w-2 h-2 rounded-full" style={{ background: "linear-gradient(135deg, #005596, #54B948)" }} />
            <div className="h-px w-16 rounded-full" style={{ background: "linear-gradient(90deg, #54B948, transparent)" }} />
          </div>

          <div className="mt-10">
            <Link
              to="/about#mission"
              className="inline-flex items-center gap-2 font-body font-semibold text-sm tracking-wide px-7 py-3 rounded-xl border-2 border-[#005596] text-[#005596] hover:bg-[#005596] hover:text-white transition-all duration-200"
            >
              Learn more about us
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Impact stats ─────────────────────────────────── */}
      <ImpactGrid dataUrl="/data/home_impact.json" />

      {/* ── Community Reviews ────────────────────────────── */}
      <section
        id="testimonials"
        className="py-20 scroll-mt-28"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div ref={reviewsRef} className="max-w-6xl mx-auto px-4 reveal">
          <div className="text-center mb-12">
            <h2 className="font-display font-black leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              <span style={{ color: "#005596" }}>Community</span>{" "}
              <span style={{ color: "#54B948" }}>Reviews</span>
            </h2>
          </div>
          <FadeCarousel images={featuredImages} intervalMs={5000} aspect="aspect-[16/9]" rounded="rounded-2xl" />
        </div>
      </section>

      <style>{`
        .reveal { opacity: 0; transform: translateY(28px); }
        .reveal-in { opacity: 1; transform: translateY(0); transition: opacity 700ms cubic-bezier(.22,.61,.36,1), transform 700ms cubic-bezier(.22,.61,.36,1); }
        @media (prefers-reduced-motion: reduce) {
          .allow-motion .fade-layer { transition: opacity 700ms cubic-bezier(.22,.61,.36,1) !important; }
          .allow-motion .reveal-in  { transition: opacity 600ms cubic-bezier(.22,.61,.36,1), transform 600ms cubic-bezier(.22,.61,.36,1) !important; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
