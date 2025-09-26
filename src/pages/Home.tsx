import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Users, Home as HomeIcon, Clock } from "lucide-react";
import { fetchJson } from "../utils/fetchJson"; // adjust if needed
import FadeCarousel from "../components/ui/FadeCarousel";

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

/** ====== Partner Logos Marquee (bigger + links + contrast ribbon) ====== */
type Logo = { src: string; alt: string; href?: string };

const PartnerLogosMarquee: React.FC<{
  logos: Logo[];
  speedSec?: number;
  height?: number;  // logo strip height
  ribbon?: boolean; // show contrast ribbon behind
}> = ({ logos, speedSec = 35, height = 112, ribbon = true }) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [shiftPx, setShiftPx] = useState(0);

  // duplicate list so end meets start
  const track = [...logos, ...logos];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const update = () => {
      const total = el.scrollWidth;
      setShiftPx(total / 2);
      el.style.setProperty("--shift", `-${total / 2}px`);
      el.style.setProperty("--marquee-duration", `${speedSec}s`);
    };

    // recalc after images load
    const imgs = Array.from(el.querySelectorAll("img"));
    let pending = imgs.length;
    const onDone = () => {
      pending -= 1;
      if (pending <= 0) update();
    };
    imgs.forEach((img) => {
      if (img.complete) return;
      img.addEventListener("load", onDone);
      img.addEventListener("error", onDone);
    });

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => {
      imgs.forEach((img) => {
        img.removeEventListener("load", onDone);
        img.removeEventListener("error", onDone);
      });
      ro.disconnect();
    };
  }, [logos.length, speedSec]);

  return (
    <div className="relative w-full">
      {/* Contrast ribbon behind logos */}
      {ribbon && (
        <>
          <div
            className="absolute inset-0 -z-10 rounded-xl"
            style={{ background: "linear-gradient(90deg, rgba(245,245,245,0.95) 0%, rgba(245,245,245,0.95) 100%)" }}
          />
          <div
            className="absolute inset-0 -z-10 rounded-xl hidden dark:block"
            style={{ background: "linear-gradient(90deg, rgba(38,38,38,0.9) 0%, rgba(38,38,38,0.9) 100%)" }}
          />
        </>
      )}

      {/* Edge fade mask */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      />

      <div className="overflow-hidden" style={{ height }}>
        <div className="group">
          <div
            ref={trackRef}
            className="flex items-center gap-12 will-change-transform marquee-track select-none is-animating"
            data-fallback={shiftPx ? "false" : "true"} // if we couldn't measure yet, use 50% fallback
            aria-label="Partner logos"
          >
            {track.map((logo, i) => {
              const imgEl = (
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  className="h-full w-auto max-h-full object-contain block opacity-90 hover:opacity-100 transition-opacity"
                  style={{ maxHeight: height }}
                />
              );
              return (
                <div key={`${logo.alt}-${i}`} className="shrink-0 flex items-center justify-center px-2" style={{ height }}>
                  {logo.href ? (
                    <a
                      href={logo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center h-full"
                      aria-label={logo.alt}
                      title={logo.alt}
                    >
                      {imgEl}
                    </a>
                  ) : (
                    imgEl
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Local styles for marquee keyframes + forced motion */}
      <style>{`
        @keyframes logos-scroll-50 {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes logos-scroll-px {
          from { transform: translateX(0); }
          to   { transform: translateX(var(--shift, -50%)); }
        }

        /* Force animation ON inside .allow-motion, even if a global reduced-motion reset tries to kill it */
        .allow-motion .marquee-track.is-animating {
          animation: logos-scroll-px var(--marquee-duration, 35s) linear infinite !important;
        }
        .allow-motion .marquee-track.is-animating[data-fallback="true"] {
          animation: logos-scroll-50 var(--marquee-duration, 35s) linear infinite !important;
        }
        .group:hover .marquee-track.is-animating { animation-play-state: paused; }
      `}</style>
    </div>
  );
};

type UpdateItem = { title: string; body: string; time: string };
type ImpactItem = { number: string; label: string; icon: "Home" | "Users" };

const ICONS = {
  Home: HomeIcon,
  Users,
};

const NEUTRAL_TEXT = "text-neutral-900 dark:text-neutral-50";
const NEUTRAL_MUTED = "text-neutral-600 dark:text-neutral-300";
const NEUTRAL_CARD = "bg-white dark:bg-neutral-900";
const NEUTRAL_BORDER = "border border-neutral-200 dark:border-neutral-700";
const CARD_BASE = `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)] transition-all duration-300 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.18)] hover:ring-2 ring-neutral-300 dark:ring-neutral-700`;
const BTN_BASE =
  "inline-flex items-center justify-center px-4 md:px-5 py-2.5 md:py-3 rounded-xl font-semibold shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-200 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)] ring-offset-0 focus:outline-none text-sm md:text-base";

// ===== Defaults (fallback) =====
const DEFAULT_UPDATES: UpdateItem[] = [
  { title: "Weather Closure", body: "We are closed today due to severe weather. Stay safe — we’ll post when we reopen.", time: "Mar 12, 2025 • 8:05 AM" },
  { title: "Milestone!", body: "We just finished our 155th home. Huge thanks to every volunteer and partner who swung a hammer.", time: "Mar 8, 2025 • 4:20 PM" },
  { title: "ReStore Donation Day", body: "Extra hands needed this Saturday for a big donation intake. Stop by if you can lend an hour.", time: "Mar 6, 2025 • 9:10 AM" },
  { title: "Info Session Reminder", body: "Homeownership info session this Saturday at 10:00 AM at our office. No registration required.", time: "Mar 1, 2025 • 2:00 PM" },
];

const DEFAULT_IMPACT: ImpactItem[] = [
  { number: "143", label: "Homes Built", icon: "Home" },
  { number: "6-8", label: "Homes Built Annually", icon: "Home" },
  { number: "500+", label: "Volunteers Annually", icon: "Users" },
];

const HomePage = () => {
  const [updatesState, setUpdatesState] = useState<UpdateItem[]>(DEFAULT_UPDATES);
  const [impactState, setImpactState] = useState<ImpactItem[]>(DEFAULT_IMPACT);

  const featuredImages = ["/images/googler2.png", "/images/googler3.png", "/images/googler4.png"];

  const photoGallery = [
    "/images/gallery1.jpg",
    "/images/gallery2.jpg",
    "/images/gallery3.jpg",
    "/images/gallery4.jpg",
    "/images/gallery5.jpg",
    "/images/gallery6.JPG",
    "/images/gallery7.JPG",
  ];

  // Bigger logos + proper hrefs
  const partnerLogos: Logo[] = [
    { src: "/logos/cte.png",         alt: "CTE",                           href: "https://www.cte.com" },
    { src: "/logos/foodlion.png",    alt: "Food Lion",                     href: "https://www.foodlion.com" },
    { src: "/logos/neimanmarcus.png",alt: "Neiman Marcus",                 href: "https://www.neimanmarcus.com" },
    { src: "/logos/sun.png",         alt: "Sun Warehouse and Distribution",href: "https://www.sun.com" },
    { src: "/logos/claytonhomes.png",alt: "Clayton Homes",                 href: "https://www.claytonhomes.com" },
    { src: "/logos/macys.png",       alt: "Macy's",                        href: "https://www.macys.com" },
    { src: "/logos/chewy.png",       alt: "Chewy",                         href: "https://www.chewy.com" },
    { src: "/logos/cozart.png",      alt: "Cozart Lumber",                 href: "https://www.cozartlumber.com" },
    { src: "/logos/hobbylobby.png",  alt: "Hobby Lobby",                   href: "https://www.hobbylobby.com" },
    { src: "/logos/lowes.png",       alt: "Lowe's",                        href: "https://www.lowes.com" },
    { src: "/logos/kirklands.png",   alt: "Kirkland’s",                    href: "https://www.kirklands.com" },
    { src: "/logos/horchow.png",     alt: "Horchow",                       href: "https://www.horchow.com" },
  ];

  // sticky-header friendly hash scrolling
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // reveal refs
  const heroRef = useReveal<HTMLDivElement>();
  const updatesRef = useReveal<HTMLDivElement>();
  const partnersRef = useReveal<HTMLDivElement>();
  const galleryRef = useReveal<HTMLDivElement>();
  const missionRef = useReveal<HTMLDivElement>();
  const impactRef = useReveal<HTMLDivElement>();
  const featuredRef = useReveal<HTMLDivElement>();

  // Fetch JSON (Latest Updates + Impact) with fallback to defaults
  useEffect(() => {
    (async () => {
      try {
        const updates = await fetchJson<UpdateItem[]>("/data/home_updates.json");
        if (Array.isArray(updates) && updates.every((u) => u.title && u.body && u.time)) {
          setUpdatesState(updates);
        }
      } catch {}
      try {
        const impact = await fetchJson<ImpactItem[]>("/data/home_impact.json");
        if (Array.isArray(impact) && impact.every((i) => i.number && i.label && i.icon && ICONS[i.icon])) {
          setImpactState(impact);
        }
      } catch {}
    })();
  }, []);

  return (
    // add allow-motion to scope our "!important" overrides
    <div className={`${NEUTRAL_TEXT} allow-motion`}>
      {/* ===== Hero ===== */}
      <section id="hero" className="relative w-full overflow-hidden scroll-mt-28">
        <img src="/images/heroimage.jpg" alt="Habitat Rowan hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/45" />

        <div ref={heroRef} className="relative z-10 min-h-[78vh] sm:min-h-[72vh] lg:aspect-[16/9] grid place-items-center px-4 sm:px-6 reveal">
          <div className="max-w-3xl md:max-w-4xl text-center text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 md:mb-6 leading-tight">
              Building <span className="text-[#005596]">Homes</span>,
              <span className="hidden sm:inline"><br/></span>
              <span className="sm:hidden"> </span>
              Building <span className="text-[#54B948]">Hope</span>.
            </h1>

            <p className="text-base sm:text-lg md:text-2xl mb-6 md:mb-8 max-w-2xl mx-auto text-white/95">
              Seeking to put God&apos;s love into action, bringing people together to build homes, communities and hope in Rowan County.
            </p>

            <div className="flex flex-col xs:flex-row gap-2.5 sm:gap-3 justify-center items-center">
              <Link to="/get-involved#donate" className={`${BTN_BASE} w-full xs:w-auto text-white`} style={{ backgroundColor: "#005596" }}>
                Donate Now
              </Link>
              <Link to="/get-involved#volunteer" className={`${BTN_BASE} w-full xs:w-auto text-white`} style={{ backgroundColor: "#54B948" }}>
                Volunteer Today
              </Link>
              <Link to="/own-home" className={`${BTN_BASE} w-full xs:w-auto ${NEUTRAL_TEXT} ${NEUTRAL_CARD} ${NEUTRAL_BORDER}`}>
                Apply for a Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

      {/* ===== Latest Updates ===== */}
      <section id="updates" className="py-12 sm:py-16 scroll-mt-28">
        <div ref={updatesRef} className="max-w-6xl mx-auto px-4 reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 sm:mb-10">
            <span className="text-[#005596]">Latest</span> <span className="text-[#54B948]">Updates</span>
          </h2>

          <div
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory px-1 py-1 scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700"
            style={{ scrollBehavior: "smooth" }}
          >
            {updatesState.map((t, i) => (
              <article key={i} className={`${CARD_BASE} min-w-[85%] xs:min-w-[70%] sm:min-w-[360px] max-w-[480px] snap-start p-5 sm:p-6`}>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: "linear-gradient(90deg, #005596 0%, #54B948 100%)" }} />
                  <span>Update</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  <span className="text-[#005596]">{t.title.split(" ")[0]}</span>{" "}
                  <span className="text-[#54B948]">{t.title.split(" ").slice(1).join(" ")}</span>
                </h3>
                <p className={`${NEUTRAL_MUTED} text-sm sm:text-base mb-3`}>{t.body}</p>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                  <Clock className="w-4 h-4" />
                  <time>{t.time}</time>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

      {/* ===== Partners (bigger logos + ribbon + links) ===== */}
      <section id="partners" className="py-16 bg-neutral-50 dark:bg-neutral-950 scroll-mt-28">
        <div ref={partnersRef} className="max-w-6xl mx-auto px-4 text-center reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8">
            <span className="text-[#005596]">Our</span> <span className="text-[#54B948]">Partners</span>
          </h2>

          <PartnerLogosMarquee logos={partnerLogos} speedSec={35} height={112} ribbon />

          <p className={`${NEUTRAL_MUTED} mt-6 max-w-2xl mx-auto`}>
            We’re grateful for the generous support of these organizations helping us build homes and hope.
          </p>
        </div>
      </section>

      <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

      {/* ===== Photo Gallery (fade) ===== */}
      <section id="gallery" className="py-10 scroll-mt-28">
        <div ref={galleryRef} className="max-w-6xl mx-auto px-4 reveal">
          <FadeCarousel images={photoGallery} intervalMs={4500} aspect="aspect-[16/9]" rounded="rounded-xl" />
        </div>
      </section>

      <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

      {/* ===== Mission ===== */}
      <section id="mission" className="py-16 bg-neutral-100 dark:bg-neutral-950 scroll-mt-28">
        <div ref={missionRef} className="max-w-4xl mx-auto px-4 text-center reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 leading-tight">
            <span className="text-[#005596]">Our</span> <span className="text-[#54B948]">Mission</span>
          </h2>
          <p className={`text-lg sm:text-xl ${NEUTRAL_MUTED} leading-relaxed`}>
            Seeking to put God&apos;s love into action, Habitat for Humanity brings people together to build homes, communities and hope.
          </p>
        </div>
      </section>

      <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

      {/* ===== Impact Statistics ===== */}
      <section id="impact" className="py-16 scroll-mt-28">
        <div ref={impactRef} className="max-w-6xl mx-auto px-4 reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12">
            <span className="text-[#005596]">Our</span> <span className="text-[#54B948]">Impact</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactState.map((stat, index) => {
              const Icon = ICONS[stat.icon] || HomeIcon;
              return (
                <div key={index} className={`${CARD_BASE} text-center p-8`}>
                  <div className="flex justify-center mb-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.12)]"
                      style={{ background: "linear-gradient(90deg, #005596 0%, #54B948 100%)" }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-4xl font-extrabold text-[#005596] dark:text-[#54B948] mb-2">{stat.number}</h3>
                  <p className={`${NEUTRAL_MUTED} text-lg`}>{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

      {/* ===== Featured / Testimonials (fade) ===== */}
      <section id="testimonials" className="py-16 bg-neutral-50 dark:bg-neutral-950 scroll-mt-28">
        <div ref={featuredRef} className="max-w-6xl mx-auto px-4 reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12">
            <span className="text-[#005596]">What</span> <span className="text-[#54B948]">the Community Says</span>
          </h2>
        </div>
        <div className="max-w-6xl mx-auto px-4">
          <FadeCarousel images={featuredImages} intervalMs={5000} aspect="aspect-[16/9]" rounded="rounded-xl" />
        </div>
      </section>

      {/* local styles for reveal + scrollbar + FORCED MOTION OVERRIDES */}
      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); }
        .reveal-in { opacity: 1; transform: translateY(0); transition: opacity 600ms cubic-bezier(.22,.61,.36,1), transform 600ms cubic-bezier(.22,.61,.36,1); }
        .scrollbar-thin { scrollbar-width: thin; }
        .scrollbar-thumb-neutral-300::-webkit-scrollbar { height: 8px; }
        .scrollbar-thumb-neutral-300::-webkit-scrollbar-thumb { background-color: rgba(163,163,163,0.8); border-radius: 8px; }
        .dark .scrollbar-thumb-neutral-700::-webkit-scrollbar-thumb { background-color: rgba(64,64,64,0.8); }

        /* If a global reduce-motion reset is active, force our animations on inside .allow-motion */
        @media (prefers-reduced-motion: reduce) {
          .allow-motion .fade-layer { transition: opacity 700ms cubic-bezier(.22,.61,.36,1) !important; }
          .allow-motion .reveal-in { transition: opacity 600ms cubic-bezier(.22,.61,.36,1), transform 600ms cubic-bezier(.22,.61,.36,1) !important; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
