import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/** --- reveal animation helper (no deps) --- */
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

// Neutral + brand tokens (consistent with other pages)
const NEUTRAL_TEXT   = 'text-neutral-900 dark:text-neutral-50';
const NEUTRAL_MUTED  = 'text-neutral-600 dark:text-neutral-300';
const NEUTRAL_CARD   = 'bg-white dark:bg-neutral-900';
const NEUTRAL_BORDER = 'border border-neutral-200 dark:border-neutral-700';

const CARD_BASE =
  `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)]`;

const SECTION_DIVIDER = <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 my-12" />;

// ---- Reusable Fade Carousel ----
type FadeCarouselProps = {
  images: string[];
  altPrefix: string;
  autoMs?: number;
};

const FadeCarousel: React.FC<FadeCarouselProps> = ({ images, altPrefix, autoMs = 5000 }) => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = (nextIndex: number) => {
    if (isAnimating || nextIndex === current) return;
    setPrev(current);
    setCurrent(nextIndex);
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 750);
    return () => clearTimeout(timer);
  };

  const next = () => goTo((current + 1) % images.length);
  const prevSlide = () => goTo((current - 1 + images.length) % images.length);

  useEffect(() => {
    const t = setInterval(next, autoMs);
    return () => clearInterval(t);
  }, [current, autoMs]); // keep autoplay rolling

  return (
    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.12)]">
      {/* previous frame (fading out) */}
      {prev !== null && (
        <img
          key={`prev-${prev}`}
          src={images[prev]}
          alt={`${altPrefix} - previous`}
          className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-700 ease-in-out pointer-events-none will-change-[opacity]"
          style={{ opacity: isAnimating ? 0 : 1 }}
        />
      )}
      {/* current frame (fading in) */}
      <img
        key={`current-${current}`}
        src={images[current]}
        alt={`${altPrefix} - ${current + 1}`}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out pointer-events-none will-change-[opacity]"
        style={{ opacity: 1 }}
      />

      {/* Controls (not CTAs) */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/40 text-white p-2 rounded-full transition-all focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/40 text-white p-2 rounded-full transition-all focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-white/90' : 'bg-white/60'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// ---- Update these image arrays to your assets ----
const housingImages = [
  '/images/housing1.jpg',
  '/images/housing2.jpg',
  '/images/housing3.jpg',
  '/images/housing4.jpg',
];

const restoreImages = [
  '/images/restore1.jpg',
  '/images/restore2.jpg',
  '/images/restore3.jpg',
  '/images/restore4.jpg',
];

const partnerImages = [
  '/images/partner1.jpg',
  '/images/partner2.jpg',
  '/images/partner3.jpg',
  '/images/partner4.jpg',
];

const News: React.FC = () => {
  const headerRef   = useReveal<HTMLDivElement>();
  const housingRef  = useReveal<HTMLDivElement>();
  const restoreRef  = useReveal<HTMLDivElement>();
  const partnerRef  = useReveal<HTMLDivElement>();

  return (
    <div className={`min-h-screen py-16 ${NEUTRAL_TEXT}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 reveal">
          <h1 className="text-4xl font-extrabold mb-4">
            <span className="text-[#005596]">Photo</span>{' '}
            <span className="text-[#54B948]">Gallery</span>
          </h1>
          <p className={`text-xl ${NEUTRAL_MUTED} max-w-3xl mx-auto`}>
            A look at our work across Rowan County — from build days and home dedications to ReStore life and the partners who make it possible.
          </p>
        </div>

        {/* HOUSING MINISTRY */}
        <section ref={housingRef} className="reveal">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold">
              <span className="text-[#005596]">Housing</span> <span className="text-[#54B948]">Ministry</span>
            </h2>
            <p className={`${NEUTRAL_MUTED} mt-2 max-w-3xl`}>
              Build days, sweat equity, and key ceremonies — moments where volunteers and partner families work side by side to create stability and hope.
            </p>
          </div>
          <div className={`${CARD_BASE} p-4`}>
            <FadeCarousel images={housingImages} altPrefix="Housing Ministry slide" />
          </div>
        </section>

        {SECTION_DIVIDER}

        {/* RESTORE */}
        <section ref={restoreRef} className="reveal">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold">
              <span className="text-[#005596]">Re</span><span className="text-[#54B948]">Store</span>
            </h2>
            <p className={`${NEUTRAL_MUTED} mt-2 max-w-3xl`}>
              Donations, deals, and a whole lot of reuse. Sales support our builds while keeping quality items out of the landfill.
            </p>
          </div>
          <div className={`${CARD_BASE} p-4`}>
            <FadeCarousel images={restoreImages} altPrefix="ReStore slide" />
          </div>
        </section>

        {SECTION_DIVIDER}

        {/* PARTNERS */}
        <section ref={partnerRef} className="reveal">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold">
              <span className="text-[#005596]">Community</span> <span className="text-[#54B948]">Partners</span>
            </h2>
            <p className={`${NEUTRAL_MUTED} mt-2 max-w-3xl`}>
              Faith groups, schools, businesses, and civic organizations — these partnerships power our mission year after year.
            </p>
          </div>
          <div className={`${CARD_BASE} p-4`}>
            <FadeCarousel images={partnerImages} altPrefix="Partners slide" />
          </div>
        </section>

      </div>

      {/* local styles for reveal motion */}
      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); }
        .reveal-in { opacity: 1; transform: translateY(0); transition:
          opacity 600ms cubic-bezier(.22,.61,.36,1),
          transform 600ms cubic-bezier(.22,.61,.36,1); }
      `}</style>
    </div>
  );
};

export default News;
