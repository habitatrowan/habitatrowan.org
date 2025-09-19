import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Users, Home, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

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

const NEUTRAL_TEXT = 'text-neutral-900 dark:text-neutral-50';
const NEUTRAL_MUTED = 'text-neutral-600 dark:text-neutral-300';
const NEUTRAL_CARD = 'bg-white dark:bg-neutral-900';
const NEUTRAL_BORDER = 'border border-neutral-200 dark:border-neutral-700';
const CARD_BASE =
  `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)] transition-all duration-300 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.18)] hover:ring-2 ring-neutral-300 dark:ring-neutral-700`;

const BTN_BASE =
  'inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-200 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)] hover:ring-2 ring-offset-0 ring-neutral-300 dark:ring-neutral-700 focus:outline-none';

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const featuredImages = [
    '/images/googler2.png',
    '/images/googler3.png',
    '/images/googler4.png',
  ];

  // renamed from partnerGallery -> photoGallery
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

  const stats = [
    { number: '143', label: 'Homes Built', icon: Home },
    { number: '6-8', label: 'Homes Built Annually', icon: Home },
    { number: '500+', label: 'Volunteers Annually', icon: Users }
  ];

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

  // reveal refs (ordered to match layout)
  const heroRef = useReveal<HTMLDivElement>();
  const updatesRef = useReveal<HTMLDivElement>();
  const partnersRef = useReveal<HTMLDivElement>();
  const galleryRef = useReveal<HTMLDivElement>();
  const missionRef = useReveal<HTMLDivElement>();
  const impactRef = useReveal<HTMLDivElement>();
  const featuredRef = useReveal<HTMLDivElement>();

  return (
    <div className={`${NEUTRAL_TEXT}`}>
      {/* ===== Hero ===== */}
      <section className="relative w-full aspect-[16/9] overflow-hidden">
        {/* BG image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{ backgroundImage: "url('/images/heroimage.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* Content */}
        <div ref={heroRef} className="relative z-10 h-full flex items-center justify-center text-center text-white px-4 reveal">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-[1.05] drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]">
              Building <span className="text-[#005596]">Homes</span>,<br />
              Building <span className="text-[#54B948]">Hope</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white/95">
              Seeking to put God's love into action, bringing people together to build homes, communities and hope in Rowan County.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Link
                to="/get-involved#donate"
                className={`${BTN_BASE} text-white`}
                style={{ backgroundColor: '#005596' }}
              >
                Donate Now
              </Link>
              <Link
                to="/get-involved#volunteer"
                className={`${BTN_BASE} text-white`}
                style={{ backgroundColor: '#54B948' }}
              >
                Volunteer Today
              </Link>
              <Link
                to="/own-home"
                className={`${BTN_BASE} ${NEUTRAL_TEXT} ${NEUTRAL_CARD} ${NEUTRAL_BORDER}`}
              >
                Apply for a Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

      {/* ===== Latest Updates ===== */}
      <section className="py-16">
        <div ref={updatesRef} className="max-w-4xl mx-auto px-4 reveal">
          <h2 className="text-4xl font-extrabold text-center mb-12">
            <span className="text-[#005596]">Latest</span> <span className="text-[#54B948]">Updates</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`${CARD_BASE} p-6`}>
              <h3 className="text-xl font-bold mb-4 text-[#005596] dark:text-[#54B948]">ReStore Grand Opening</h3>
              <p className={`${NEUTRAL_MUTED} mb-4`}>
                Visit our newly renovated ReStore location featuring expanded inventory and improved shopping experience.
              </p>
              <Link to="/locations" className="inline-flex items-center text-[#005596] dark:text-[#54B948] hover:translate-x-0.5 transition-transform">
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <div className={`${CARD_BASE} p-6`}>
              <h3 className="text-xl font-bold mb-4 text-[#005596] dark:text-[#54B948]">Volunteer Appreciation Event</h3>
              <p className={`${NEUTRAL_MUTED} mb-4`}>
                Join us for our annual volunteer appreciation dinner celebrating all our amazing volunteers.
              </p>
              <Link to="/volunteer" className="inline-flex items-center text-[#005596] dark:text-[#54B948] hover:translate-x-0.5 transition-transform">
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

      {/* ===== Partners (text carousel) ===== */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-950">
        <div ref={partnersRef} className="max-w-4xl mx-auto px-4 text-center reveal">
          <h2 className="text-4xl font-extrabold text-center mb-8">
            <span className="text-[#005596]">Our</span> <span className="text-[#54B948]">Partners</span>
          </h2>
          <div className="h-20 flex items-center justify-center">
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


      {/* ===== Photo Gallery Image Carousel (renamed) ===== */}
      <section className="py-10">
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
                      ? 'bg-neutral-400 dark:bg-neutral-900'   // active: slightly darker than inactive
                      : 'bg-neutral-300 dark:bg-neutral-600'   // inactive
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
      <section className="py-16 bg-neutral-100 dark:bg-neutral-950">
        <div ref={missionRef} className="max-w-4xl mx-auto px-4 text-center reveal">
          <h2 className="text-4xl font-extrabold mb-6 leading-tight">
            <span className="text-[#005596]">Our</span> <span className="text-[#54B948]">Mission</span>
          </h2>
          <p className={`text-xl ${NEUTRAL_MUTED} leading-relaxed`}>
            Seeking to put God's love into action, Habitat for Humanity brings people together to build homes, communities and hope.
          </p>
        </div>
      </section>

      <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

      {/* ===== Impact Statistics ===== */}
      <section className="py-16">
        <div ref={impactRef} className="max-w-6xl mx-auto px-4 reveal">
          <h2 className="text-4xl font-extrabold text-center mb-12">
            <span className="text-[#005596]">Our</span> <span className="text-[#54B948]">Impact</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
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

      {/* ===== What the Community Says (featured images carousel) ===== */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-950">
        <div ref={featuredRef} className="max-w-6xl mx-auto px-4 reveal">
          <h2 className="text-4xl font-extrabold text-center mb-12">
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
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 dark:bg-black/20 hover:-translate-y-[55%] hover:ring-2 ring-neutral-300 dark:ring-neutral-700 text-white p-2 rounded-full transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
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
                      ? 'bg-neutral-400 dark:bg-neutral-900'   // active: slightly darker than inactive
                      : 'bg-neutral-300 dark:bg-neutral-600'   // inactive
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
      `}</style>
    </div>
  );
};

export default HomePage;
