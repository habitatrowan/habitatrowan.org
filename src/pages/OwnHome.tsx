import React, { useEffect, useRef, useState } from 'react';
import { Download, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';

/** --- tiny in-file scroll reveal helper (no deps) --- */
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

// >>> UPDATE THIS <<<
const PREQUAL_PDF_URL = '/docs/pre-qualification.pdf';

// Theme tokens
const NEUTRAL_TEXT = 'text-neutral-900 dark:text-neutral-50';
const NEUTRAL_MUTED = 'text-neutral-600 dark:text-neutral-300';
const NEUTRAL_CARD = 'bg-white dark:bg-neutral-900';
const NEUTRAL_BORDER = 'border border-neutral-200 dark:border-neutral-700';

const CARD_BASE =
  `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)]`;

const BTN_BASE =
  'inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-200 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)] focus:outline-none';

const GRADIENT_BG = { background: 'linear-gradient(90deg, #005596 0%, #54B948 100%)' };

// Top anchor nav
const NAV = [
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'process', label: 'Application Process' },
  { id: 'apply', label: 'Ready to Apply' },
  { id: 'faq', label: 'FAQ' },
];

// Content
const eligibilityRequirements = [
  'Demonstrate need for decent, affordable housing',
  'Show ability to pay an affordable mortgage',
  'Be willing to partner with Habitat (sweat equity hours)',
  'Live or work in Rowan County',
  'Have household income between 30–80% of area median income',
  'Have acceptable credit history or be willing to work on credit repair',
  'Be a first-time homeowner or have not owned a home in the past 3 years',
];

const applicationSteps = [
  { step: 1, title: 'Attend Information Session', description: 'Join our monthly info session to learn about the program and requirements.' },
  { step: 2, title: 'Submit Pre-Application', description: 'Complete and submit your pre-qualification form with required documentation.' },
  { step: 3, title: 'Complete Full Application', description: 'If pre-qualified, you’ll be invited to complete a comprehensive application.' },
  { step: 4, title: 'Home Visit & Interview', description: 'Our staff will conduct a home visit and interview with your family.' },
  { step: 5, title: 'Selection Committee Review', description: 'Your application is reviewed by our volunteer Family Selection Committee.' },
  { step: 6, title: 'Begin Partnership', description: 'If selected, begin sweat equity hours and homeownership education.' },
  { step: 7, title: 'Home Construction', description: 'Work alongside volunteers to build your home.' },
  { step: 8, title: 'Home Dedication', description: 'Celebrate receiving the keys to your new home!' },
];

const faqs = [
  { q: 'How much do Habitat homes cost?', a: 'Habitat homes are sold at no profit with an affordable mortgage. Payments are typically 25–30% of household income.' },
  { q: 'What are sweat equity hours?', a: 'Volunteer hours partner families contribute. Typically 200–500 hours depending on family size.' },
  { q: 'How long does the application process take?', a: 'Usually 3–6 months from initial application to final selection, depending on applications and home availability.' },
  { q: 'Can I choose the location of my home?', a: 'Locations depend on available land and partnerships. Families don’t choose exact sites.' },
  { q: 'What if I can’t make a mortgage payment?', a: 'Habitat offers counseling and may restructure payments to help families stay in their homes.' },
];

// >>> Update these image paths <<<
const carouselImages = [
  '/images/gallery1.jpg',
  '/images/gallery2.jpg',
  '/images/gallery3.jpg',
  '/images/gallery4.jpg',
];

const OwnHome: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(NAV[0].id);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Smooth scroll
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Observe sections to highlight nav
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis?.target?.id) setActiveId(vis.target.id);
      },
      { root: null, rootMargin: '0px 0px -60% 0px', threshold: [0.15, 0.3, 0.6] }
    );
    NAV.forEach(s => {
      const n = document.getElementById(s.id);
      if (n) observer.observe(n);
    });
    return () => observer.disconnect();
  }, []);

  // reveal refs
  const headerRef = useReveal<HTMLDivElement>();
  const navRef = useReveal<HTMLDivElement>();
  const contentRef = useReveal<HTMLDivElement>();
  const carouselRef = useReveal<HTMLDivElement>();

  // --- Carousel state (true cross-fade using prev+current layers) ---
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = (nextIndex: number) => {
    if (isAnimating || nextIndex === current) return;
    setPrev(current);
    setCurrent(nextIndex);
    setIsAnimating(true);
    // end animation after duration (ms) + small buffer
    const timer = setTimeout(() => setIsAnimating(false), 750);
    return () => clearTimeout(timer);
  };

  const nextSlide = () => goTo((current + 1) % carouselImages.length);
  const prevSlide = () => goTo((current - 1 + carouselImages.length) % carouselImages.length);

  useEffect(() => {
    const t = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(t);
  }, [current]); // keep autoplay rolling

  return (
    <div className={`min-h-screen py-16 ${NEUTRAL_TEXT}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 reveal">
          <h1 className="text-4xl font-extrabold mb-3">
            <span className="text-[#005596]">Own</span> <span className="text-[#54B948]">a Home</span>
          </h1>
          <p className={`text-xl ${NEUTRAL_MUTED} max-w-3xl mx-auto`}>
            Habitat partners with families to help them achieve the strength, stability, and independence of homeownership.
          </p>
        </div>

        {/* Top navigation links */}
        <div ref={navRef} className="mb-8 reveal">
          <div className="flex flex-wrap gap-2 justify-center">
            {NAV.map(({ id, label }) => {
              const active = activeId === id;
              return (
                <button
                  key={id}
                  onClick={() => {
                    setActiveId(id);
                    scrollToId(id);
                  }}
                  className={`px-5 py-2 rounded-xl font-medium transition-all ${active ? 'text-white' : ''}`}
                  style={active ? GRADIENT_BG : { border: '1px solid rgba(0,0,0,0.15)' }}
                  aria-current={active ? 'true' : 'false'}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel directly under nav */}
        <section ref={carouselRef} className="mb-12 reveal" aria-label="Program Highlights Carousel">
          <div className="relative max-w-6xl mx-auto">
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.12)]">

              {/* Previous frame (fading out) */}
              {prev !== null && (
                <img
                  key={`prev-${prev}`}
                  src={carouselImages[prev]}
                  alt="Previous slide"
                  className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-700 ease-in-out pointer-events-none will-change-[opacity]"
                  style={{ opacity: isAnimating ? 0 : 1 }}
                />
              )}

              {/* Current frame (fading in) */}
              <img
                key={`current-${current}`}
                src={carouselImages[current]}
                alt="Current slide"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out pointer-events-none will-change-[opacity]"
                style={{ opacity: 1 }}
              />
            </div>

            {/* Controls (not CTAs) */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/40 text-white p-2 rounded-full transition-all focus:outline-none"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/40 text-white p-2 rounded-full transition-all focus:outline-none"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex justify-center mt-4 gap-2">
              {carouselImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-neutral-400 dark:bg-neutral-900' : 'bg-neutral-300 dark:bg-neutral-600'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Main content — one big blended card */}
        <div ref={contentRef} className={`max-w-5xl mx-auto ${CARD_BASE} p-8 space-y-12 reveal`}>

          {/* Eligibility */}
          <section id="eligibility">
            <h2 className="text-3xl font-extrabold mb-4">
              <span className="text-[#005596]">Eligibility</span> <span className="text-[#54B948]">Checklist</span>
            </h2>
            <p className={`${NEUTRAL_MUTED} mb-6`}>
              To qualify for a Habitat home, families generally must meet the following:
            </p>
            <ul className="space-y-3">
              {eligibilityRequirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" style={GRADIENT_BG} />
                  <span className={`${NEUTRAL_MUTED}`}>{req}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

          {/* Application Process */}
          <section id="process">
            <h2 className="text-3xl font-extrabold mb-4">
              <span className="text-[#005596]">Application</span> <span className="text-[#54B948]">Process</span>
            </h2>
            <p className={`${NEUTRAL_MUTED} mb-6`}>
              Our program follows a comprehensive process to prepare families for successful homeownership:
            </p>

            <ol className="space-y-5">
              {applicationSteps.map((s) => (
                <li key={s.step} className="flex gap-5 items-start">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white"
                    style={{ background: 'linear-gradient(90deg, #005596 0%, #54B948 100%)' }}
                  >
                    {s.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">
                      <span className="text-[#005596]">{s.title.split(' ')[0]}</span>{' '}
                      <span className="text-[#54B948]">{s.title.split(' ').slice(1).join(' ')}</span>
                    </h3>
                    <p className={`${NEUTRAL_MUTED}`}>{s.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className={`${CARD_BASE} p-6 mt-8`}>
              <h3 className="text-xl font-extrabold mb-2">
                <span className="text-[#005596]">Information</span> <span className="text-[#54B948]">Sessions</span>
              </h3>
              <p className={`${NEUTRAL_MUTED}`}>
                Held the second Saturday of each month at 10:00 AM at our office. Required for all applicants. Sessions last 1–2 hours and include time for questions. No registration required.
              </p>
            </div>
          </section>

          <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

          {/* Ready to Apply */}
          <section id="apply">
            <h2 className="text-3xl font-extrabold mb-4">
              <span className="text-[#005596]">Ready</span> <span className="text-[#54B948]">to Apply?</span>
            </h2>
            <p className={`${NEUTRAL_MUTED} mb-5`}>
              If you meet the eligibility criteria, download the pre-qualification form to start the process.
            </p>

            <a
              href={PREQUAL_PDF_URL}
              download
              className={`${BTN_BASE} text-white`}
              style={GRADIENT_BG}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Pre-Qualification Form (PDF)
            </a>
          </section>

          {/* FAQ — separate roomy box at the very bottom */}
          <section id="faq" className={`${CARD_BASE} p-6`}>
            <h2 className="text-2xl font-extrabold mb-4">
              <span className="text-[#005596]">Frequently</span> <span className="text-[#54B948]">Asked Questions</span>
            </h2>
            <div className="space-y-4">
              {faqs.map((item, i) => (
                <div key={i} className={`${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-lg overflow-hidden`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-0"
                  >

                    <h3 className="text-base md:text-lg font-semibold">
                      <span className="text-[#005596]">{item.q.split(' ')[0]}</span>{' '}
                      <span className="text-[#54B948]">{item.q.split(' ').slice(1).join(' ')}</span>
                    </h3>
                    <HelpCircle
                      className={`w-5 h-5 text-[#005596] dark:text-[#54B948] transform transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className={`${NEUTRAL_MUTED}`}>{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* local styles for reveal motion */}
      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); }
        .reveal-in { opacity: 1; transform: translateY(0); transition: opacity 600ms cubic-bezier(.22,.61,.36,1), transform 600ms cubic-bezier(.22,.61,.36,1); }
      `}</style>
    </div>
  );
};

export default OwnHome;
