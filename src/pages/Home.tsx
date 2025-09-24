import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Home as HomeIcon, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { fetchJson } from '../utils/fetchJson'; // adjust path if your utils live elsewhere

/** --------- tiny in-file scroll reveal helper (no deps) ---------- */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('reveal-in');
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

type UpdateItem = { title: string; body: string; time: string };
type ImpactItem = { number: string; label: string; icon: 'Home' | 'Users' };

const ICONS = {
  Home: HomeIcon,
  Users,
};

const NEUTRAL_TEXT = 'text-neutral-900 dark:text-neutral-50';
const NEUTRAL_MUTED = 'text-neutral-600 dark:text-neutral-300';
const NEUTRAL_CARD = 'bg-white dark:bg-neutral-900';
const NEUTRAL_BORDER = 'border border-neutral-200 dark:border-neutral-700';
const CARD_BASE =
  `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)] transition-all duration-300 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.18)] hover:ring-2 ring-neutral-300 dark:ring-neutral-700`;

const BTN_BASE =
  'inline-flex items-center justify-center px-4 md:px-5 py-2.5 md:py-3 rounded-xl font-semibold shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-200 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)] ring-offset-0 focus:outline-none text-sm md:text-base';

// ===== Defaults used as graceful fallback if JSON is missing/malformed =====
const DEFAULT_UPDATES: UpdateItem[] = [
  {
    title: 'Weather Closure',
    body: 'We are closed today due to severe weather. Stay safe — we’ll post when we reopen.',
    time: 'Mar 12, 2025 • 8:05 AM',
  },
  {
    title: 'Milestone!',
    body: 'We just finished our 155th home. Huge thanks to every volunteer and partner who swung a hammer.',
    time: 'Mar 8, 2025 • 4:20 PM',
  },
  {
    title: 'ReStore Donation Day',
    body: 'Extra hands needed this Saturday for a big donation intake. Stop by if you can lend an hour.',
    time: 'Mar 6, 2025 • 9:10 AM',
  },
  {
    title: 'Info Session Reminder',
    body: 'Homeownership info session this Saturday at 10:00 AM at our office. No registration required.',
    time: 'Mar 1, 2025 • 2:00 PM',
  },
];

const DEFAULT_IMPACT: ImpactItem[] = [
  { number: '143', label: 'Homes Built', icon: 'Home' },
  { number: '6-8', label: 'Homes Built Annually', icon: 'Home' },
  { number: '500+', label: 'Volunteers Annually', icon: 'Users' },
];

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const [updatesState, setUpdatesState] = useState<UpdateItem[]>(DEFAULT_UPDATES);
  const [impactState, setImpactState] = useState<ImpactItem[]>(DEFAULT_IMPACT);

  const featuredImages = [
    '/images/googler2.png',
    '/images/googler3.png',
    '/images/googler4.png',
  ];

  const photoGallery = [
    '/images/gallery1.jpg',
    '/images/gallery2.jpg',
    '/images/gallery3.jpg',
    '/images/gallery4.jpg',
    '/images/gallery5.jpg',
    '/images/gallery6.JPG',
    '/images/gallery7.JPG',
  ];

  const partners = [
    'CTE',
    'Merritt Mason',
    'City of Salisbury',
    'First Baptist Church',
    'Truist',
  ];

  // ---------- sticky-header friendly hash scrolling ----------
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // timers
  useEffect(() => {
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % featuredImages.length);
    }, 5000);

    const partnerTimer = setInterval(() => {
      setCurrentPartnerIndex((prev) => (prev + 1) % partners.length);
    }, 3000);

    const galleryTimer = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % photoGallery.length);
    }, 4500);

    return () => {
      clearInterval(imageTimer);
      clearInterval(partnerTimer);
      clearInterval(galleryTimer);
    };
  }, []);

  const nextImage = () => setCurrentImageIndex((p) => (p + 1) % featuredImages.length);
  const prevImage = () => setCurrentImageIndex((p) => (p - 1 + featuredImages.length) % featuredImages.length);

  const nextGallery = () => setGalleryIndex((p) => (p + 1) % photoGallery.length);
  const prevGallery = () => setGalleryIndex((p) => (p - 1 + photoGallery.length) % photoGallery.length);

  // tweet carousel logic (no scrollIntoView; uses container.scrollTo to avoid page jump)
  const tweetsRef = useRef<HTMLDivElement | null>(null);
  const [tweetIndex, setTweetIndex] = useState(0);

  useEffect(() => {
    const el = tweetsRef.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll('.tweet-card')) as HTMLElement[];
    if (!items.length) return;

    const scrollToIndex = (idx: number) => {
      const safe = (idx + items.length) % items.length;
      setTweetIndex(safe);
      const target = items[safe];
      const targetLeft = target.offsetLeft - el.offsetLeft;
      el.scrollTo({ left: targetLeft, behavior: 'smooth' });
    };

    const id = setInterval(() => scrollToIndex(tweetIndex + 1), 4500);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tweetIndex, updatesState.length]);

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
      const updates = await fetchJson<UpdateItem[]>('/data/home_updates.json');
      if (Array.isArray(updates) && updates.every(u => u.title && u.body && u.time)) {
        setUpdatesState(updates);
      }
      const impact = await fetchJson<ImpactItem[]>('/data/home_impact.json');
      if (Array.isArray(impact) && impact.every(i => i.number && i.label && i.icon && ICONS[i.icon])) {
        setImpactState(impact);
      }
    })();
  }, []);

  return (
    <div className={`${NEUTRAL_TEXT}`}>
      {/* ===== Hero (centered, mobile-optimized) ===== */}
      <section id="hero" className="relative w-full overflow-hidden scroll-mt-28">
        {/* background image */}
        <img
          src="/images/heroimage.jpg"
          alt="Habitat Rowan hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />

        {/* centering container */}
        <div ref={heroRef} className="relative z-10 min-h-[78vh] sm:min-h-[72vh] lg:aspect-[16/9] grid place-items-center px-4 sm:px-6 reveal">
          <div className="max-w-3xl md:max-w-4xl text-center text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 md:mb-6 leading-tight">
              Building <span className="text-[#005596]">Homes</span>,
              <span className="hidden sm:inline"><br/></span>
              <span className="sm:hidden"> </span>
              Building <span className="text-[#54B948]">Hope</span>
            </h1>

            <p className="text-base sm:text-lg md:text-2xl mb-6 md:mb-8 max-w-2xl mx-auto text-white/95">
              Seeking to put God&apos;s love into action, bringing people together to build homes, communities and hope in Rowan County.
            </p>

            {/* small CTAs */}
            <div className="flex flex-col xs:flex-row gap-2.5 sm:gap-3 justify-center items-center">
              <Link
                to="/get-involved#donate"
                className={`${BTN_BASE} w-full xs:w-auto text-white`}
                style={{ backgroundColor: '#005596' }}
              >
                Donate Now
              </Link>
              <Link
                to="/get-involved#volunteer"
                className={`${BTN_BASE} w-full xs:w-auto text-white`}
                style={{ backgroundColor: '#54B948' }}
              >
                Volunteer Today
              </Link>
              <Link
                to="/own-home"
                className={`${BTN_BASE} w-full xs:w-auto ${NEUTRAL_TEXT} ${NEUTRAL_CARD} ${NEUTRAL_BORDER}`}
              >
                Apply for a Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

      {/* ===== Latest Updates → Tweet Carousel ===== */}
      <section id="updates" className="py-12 sm:py-16 scroll-mt-28">
        <div ref={updatesRef} className="max-w-6xl mx-auto px-4 reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 sm:mb-10">
            <span className="text-[#005596]">Latest</span> <span className="text-[#54B948]">Updates</span>
          </h2>

          <div
            ref={tweetsRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory px-1 py-1 scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700"
            style={{ scrollBehavior: 'smooth' }}
          >
            {updatesState.map((t, i) => (
              <article
                key={i}
                className={`${CARD_BASE} tweet-card min-w-[85%] xs:min-w-[70%] sm:min-w-[360px] max-w-[480px] snap-start p-5 sm:p-6`}
              >
                <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #005596 0%, #54B948 100%)' }}
                  />
                  <span>Update</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  <span className="text-[#005596]">{t.title.split(' ')[0]}</span>{' '}
                  <span className="text-[#54B948]">{t.title.split(' ').slice(1).join(' ')}</span>
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

      {/* ===== Partners (text carousel) ===== */}
      <section id="partners" className="py-16 bg-neutral-50 dark:bg-neutral-950 scroll-mt-28">
        <div ref={partnersRef} className="max-w-4xl mx-auto px-4 text-center reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8">
            <span className="text-[#005596]">Our</span> <span className="text-[#54B948]">Partners</span>
          </h2>
          <div className="h-16 sm:h-20 flex items-center justify-center">
            <h3 className={`text-2xl font-semibold ${NEUTRAL_TEXT} transition-opacity duration-500`}>
              {partners[currentPartnerIndex]}
            </h3>
          </div>
          <p className={`${NEUTRAL_MUTED} mt-4 max-w-2xl mx-auto`}>
            Working together with local businesses, organizations, and faith communities to build stronger neighborhoods.
          </p>
        </div>
      </section>

      <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

      {/* ===== Photo Gallery Image Carousel ===== */}
      <section id="gallery" className="py-10 scroll-mt-28">
        <div ref={galleryRef} className="max-w-6xl mx-auto px-4 reveal">
          <div className="relative">
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.12)]">
              <img
                src={photoGallery[galleryIndex]}
                alt="Partner highlights"
                className="w-full h-full object-cover transition-opacity duration-700"
              />
            </div>

            <button
              onClick={prevGallery}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/25 hover:bg-black/35 text-white p-2 rounded-full transition-all focus:outline-none hover:ring-2 ring-neutral-300 dark:ring-neutral-700"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextGallery}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/25 hover:bg-black/35 text-white p-2 rounded-full transition-all focus:outline-none hover:ring-2 ring-neutral-300 dark:ring-neutral-700"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="flex justify-center mt-4 space-x-2">
              {photoGallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setGalleryIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === galleryIndex
                      ? 'bg-neutral-400 dark:bg-neutral-900'
                      : 'bg-neutral-300 dark:bg-neutral-600'
                  }`}
                  aria-label={`Go to gallery slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
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
                      style={{ background: 'linear-gradient(90deg, #005596 0%, #54B948 100%)' }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-4xl font-extrabold text-[#005596] dark:text-[#54B948] mb-2">
                    {stat.number}
                  </h3>
                  <p className={`${NEUTRAL_MUTED} text-lg`}>{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

      {/* ===== Testimonials / Community Says ===== */}
      <section id="testimonials" className="py-16 bg-neutral-50 dark:bg-neutral-950 scroll-mt-28">
        <div ref={featuredRef} className="max-w-6xl mx-auto px-4 reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12">
            <span className="text-[#005596]">What</span> <span className="text-[#54B948]">the Community Says</span>
          </h2>

          <div className="relative">
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.12)]">
              <img
                src={featuredImages[currentImageIndex]}
                alt="Habitat for Humanity work"
                className="w-full h-full object-cover transition-opacity duration-1000"
              />
            </div>

            <button
              onClick={() => setCurrentImageIndex((p) => (p - 1 + featuredImages.length) % featuredImages.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 dark:bg-black/20 hover:-translate-y-[55%] hover:ring-2 ring-neutral-300 dark:ring-neutral-700 text-white p-2 rounded-full transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => setCurrentImageIndex((p) => (p + 1) % featuredImages.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 dark:bg-black/20 hover:-translate-y-[55%] hover:ring-2 ring-neutral-300 dark:ring-neutral-700 text-white p-2 rounded-full transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="flex justify-center mt-4 space-x-2">
              {featuredImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'bg-neutral-400 dark:bg-neutral-900'
                      : 'bg-neutral-300 dark:bg-neutral-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* local styles for reveal + motion */}
      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); }
        .reveal-in { opacity: 1; transform: translateY(0); transition: opacity 600ms cubic-bezier(.22,.61,.36,1), transform 600ms cubic-bezier(.22,.61,.36,1); }
        /* Optional: nicer mobile scrollbar for the tweets strip */
        .scrollbar-thin { scrollbar-width: thin; }
        .scrollbar-thumb-neutral-300::-webkit-scrollbar { height: 8px; }
        .scrollbar-thumb-neutral-300::-webkit-scrollbar-thumb { background-color: rgba(163,163,163,0.8); border-radius: 8px; }
        .dark .scrollbar-thumb-neutral-700::-webkit-scrollbar-thumb { background-color: rgba(64,64,64,0.8); }
      `}</style>
    </div>
  );
};

export default HomePage;
 