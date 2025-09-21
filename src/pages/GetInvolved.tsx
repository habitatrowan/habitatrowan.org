import React, { useState, useEffect, useRef } from 'react';
import BottomCTA from "../components/BottomCTA";
import {
  Download, Users, Hammer, ShoppingCart, GraduationCap,
  Heart, Home, Phone, Mail, ExternalLink, Gift,
  ChevronLeft, ChevronRight
} from 'lucide-react';

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

// >>> UPDATE THESE <<<
const SIGNUP_PDF_URL = '/docs/volunteer-signup.pdf';
const PAYPAL_DONATE_URL = 'https://www.paypal.com/donate/?hosted_button_id=YOUR_BUTTON_ID';

// Theme tokens
const NEUTRAL_TEXT    = 'text-neutral-900 dark:text-neutral-50';
const NEUTRAL_MUTED   = 'text-neutral-600 dark:text-neutral-300';
const NEUTRAL_CARD    = 'bg-white dark:bg-neutral-900';
const NEUTRAL_BORDER  = 'border border-neutral-200 dark:border-neutral-700';
const SECTION_BG_SOFT = 'bg-neutral-50 dark:bg-neutral-950';

const CARD_BASE =
  `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)]`;

const GRADIENT_BG = { background: 'linear-gradient(90deg, #005596 0%, #54B948 100%)' };

const SUPPORT_SECTIONS = [
  { id: 'support-donate',       label: 'Make a Donation',      icon: Heart },
  { id: 'support-items',        label: 'Donating Items',       icon: Gift },
  { id: 'support-land',         label: 'Land Donations',       icon: Home },
  { id: 'support-professional', label: 'Professional Services',icon: Hammer },
  { id: 'support-ebay',         label: 'eBay',                 icon: ExternalLink },
];

// optional: alias old/incorrect hashes to the new anchor
const HASH_ALIASES: Record<string, string> = {
  '#support-us': '#support-nav',
  '#supportus': '#support-nav',
};

const acceptedItems = [
  'Furniture (sofas, chairs, tables, dressers)',
  'Appliances (working condition)',
  'Building materials (lumber, doors, windows)',
  'Home décor and accessories',
  'Tools and hardware',
  'Lighting fixtures',
  'Plumbing fixtures',
  'Flooring materials',
  'Paint and supplies',
  'Kitchen cabinets and countertops',
];

const notAcceptedItems = [
  'Mattresses and box springs',
  'Clothing and shoes',
  'Books and magazines',
  'Electronics (TVs, computers)',
  'Hazardous materials',
  'Baby cribs and car seats',
  'Upholstered items with stains/odors',
  'Broken or damaged items',
  'Personal hygiene items',
  'Food items',
];

const GetInvolved = () => {
  const [activeSupportId, setActiveSupportId] = useState<string>(SUPPORT_SECTIONS[0].id);

  // Header image carousel (like Home)
  const carouselImages = [
    '/images/gallery1.jpg',
    '/images/gallery2.jpg',
    '/images/gallery3.jpg',
    '/images/gallery4.jpg',
  ];
  const [carouselIndex, setCarouselIndex] = useState(0);
  const nextCarousel = () => setCarouselIndex((p) => (p + 1) % carouselImages.length);
  const prevCarousel = () => setCarouselIndex((p) => (p - 1 + carouselImages.length) % carouselImages.length);

  // Smooth scroll handler (respects scroll-margin-top on targets)
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Sticky-header friendly hash scrolling on mount
  useEffect(() => {
    let hash = window.location.hash;
    if (!hash) return;
    // normalize with aliases
    if (HASH_ALIASES[hash]) hash = HASH_ALIASES[hash];
    const el = document.querySelector(hash) as HTMLElement | null;
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Observe support sections to update active nav on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSupportId(visible.target.id);
      },
      // top 40% of the viewport is treated as "header space" so we don't mark late sections active too soon
      { root: null, rootMargin: '-40% 0px -50% 0px', threshold: [0.15, 0.3, 0.6] }
    );
    SUPPORT_SECTIONS.forEach(s => {
      const node = document.getElementById(s.id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCarouselIndex((p) => (p + 1) % carouselImages.length), 5000);
    return () => clearInterval(t);
  }, []);

  // reveal refs
  const headerRef        = useReveal<HTMLDivElement>();
  const carouselRef      = useReveal<HTMLDivElement>();
  const volunteerRef     = useReveal<HTMLDivElement>();
  const oppsRef          = useReveal<HTMLDivElement>();
  const safetyRef        = useReveal<HTMLDivElement>();
  const signupRef        = useReveal<HTMLDivElement>();
  const supportHeaderRef = useReveal<HTMLDivElement>();
  const supportNavRef    = useReveal<HTMLDivElement>();
  const helpRef          = useReveal<HTMLDivElement>();

  const opportunities = [
    {
      id: 'construction',
      title: 'Construction Volunteers',
      icon: Hammer,
      description: 'Help build homes with hands-on construction work including framing, roofing, painting, and finishing work.',
      requirements: 'No experience necessary — we provide training and supervision.',
      schedule: 'Saturdays 8:00 AM – 4:00 PM',
    },
    {
      id: 'restore',
      title: 'ReStore Volunteers',
      icon: ShoppingCart,
      description: 'Assist customers, organize inventory, and help with donations at our ReStore location.',
      requirements: 'Customer service skills helpful but not required.',
      schedule: 'Flexible weekday and weekend shifts available',
    },
    {
      id: 'committees',
      title: 'Committee Work',
      icon: Users,
      description: 'Join our Family Selection, Fundraising, or Public Relations committees.',
      requirements: 'Professional skills in relevant areas preferred.',
      schedule: 'Monthly meetings and ongoing project work',
    },
    {
      id: 'students',
      title: 'Student Groups',
      icon: GraduationCap,
      description: 'Special volunteer opportunities for high school and college student groups.',
      requirements: 'Adult supervision required for groups under 18.',
      schedule: 'Flexible scheduling for group projects',
    },
  ];

  const safetyRules = [
    'All volunteers must be at least 16 years old for construction sites',
    'Closed-toe shoes required at all times on construction sites',
    'Hard hats and safety glasses provided and must be worn',
    'No volunteers under the influence of drugs or alcohol',
    'Follow all supervisor instructions and safety protocols',
    'Report any injuries or unsafe conditions immediately',
    'Stay hydrated and take breaks as needed',
    'Dress appropriately for weather and work conditions',
  ];

  return (
    <div className={`min-h-screen py-16 ${NEUTRAL_TEXT}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-8 reveal">
          <h1 className="text-4xl font-extrabold mb-4">
            <span className="text-[#005596]">Get</span> <span className="text-[#54B948]">Involved</span>
          </h1>
          <p className={`text-xl ${NEUTRAL_MUTED} max-w-3xl mx-auto`}>
            Join our community of volunteers and supporters to help us build homes, communities, and hope in Rowan County.
          </p>
        </div>

        {/* Header Image Carousel */}
        <section ref={carouselRef} className="mb-16 reveal">
          <div className="relative max-w-6xl mx-auto">
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.12)]">
              <img
                src={carouselImages[carouselIndex]}
                alt="Habitat activity"
                className="w-full h-full object-cover transition-opacity duration-700"
              />
            </div>

            <button
              onClick={prevCarousel}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/25 hover:bg-black/35 text-white p-2 rounded-full transition-all focus:outline-none"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextCarousel}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/25 hover:bg-black/35 text-white p-2 rounded-full transition-all focus:outline-none"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="flex justify-center mt-4 space-x-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCarouselIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === carouselIndex ? 'bg-neutral-400 dark:bg-neutral-900' : 'bg-neutral-300 dark:bg-neutral-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-16" />

        {/* Volunteer Section (single, blended) */}
        <section id="volunteer" className="mb-20 scroll-mt-[var(--header-offset)]">
          <div ref={volunteerRef} className="text-center mb-10 reveal">
            <h2 className="text-3xl font-extrabold mb-4">
              <span className="text-[#005596]">Volunteer</span> <span className="text-[#54B948]">with Us</span>
            </h2>
            <p className={`text-xl ${NEUTRAL_MUTED} max-w-3xl mx-auto`}>
              Explore ways to help—on construction sites, at our ReStore, with committees, or in student groups.
            </p>
          </div>

          <div ref={oppsRef} className={`max-w-5xl mx-auto reveal ${CARD_BASE} p-8`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {opportunities.map((op) => {
                const Icon = op.icon;
                return (
                  <div key={op.id} className="rounded-lg p-4 border border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={GRADIENT_BG}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-lg font-bold">{op.title}</h4>
                    </div>
                    <p className={`${NEUTRAL_MUTED} mb-2`}>{op.description}</p>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300"><strong>Requirements:</strong> {op.requirements}</p>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300"><strong>Schedule:</strong> {op.schedule}</p>
                  </div>
                );
              })}
            </div>

            {/* Safety + PDF box blended into same card */}
            <div ref={safetyRef} className="mt-10">
              <h3 className="text-2xl font-extrabold mb-4">
                <span className="text-[#005596]">Safety</span> <span className="text-[#54B948]">First</span>
              </h3>
              <ul className="space-y-2">
                {safetyRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" style={GRADIENT_BG} />
                    <span className={`${NEUTRAL_MUTED}`}>{rule}</span>
                  </li>
                ))}
              </ul>

              <div ref={signupRef} className="mt-8 rounded-xl p-6" style={GRADIENT_BG}>
                <h4 className="text-xl font-bold text-white mb-2">Volunteer Signup (PDF)</h4>
                <p className="text-white/90">
                  Prefer paper? Download and print the volunteer signup form:&nbsp;
                  <a href={SIGNUP_PDF_URL} className="underline text-white" download>
                    Download PDF
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-16" />

        {/* Support Section (one big component, inline sections with anchors) */}
        <section id="support" className="mb-16 scroll-mt-[var(--header-offset)]">
          {/* anchor for header nav – link your header to /get-involved#support-nav */}
          <span id="support-nav" className="block h-0" />

          <div ref={supportHeaderRef} className="text-center mb-6 reveal">
            <h2 className="text-3xl font-extrabold mb-3">
              <span className="text-[#005596]">Support</span> <span className="text-[#54B948]">Us</span>
            </h2>
            <p className={`text-lg ${NEUTRAL_MUTED} max-w-3xl mx-auto`}>
              Everything below is on one page. Use the quick nav to jump around.
            </p>
          </div>

          {/* Top navigation buttons (KEEP) */}
          <div ref={supportNavRef} className="mb-8 reveal">
            <div className="flex flex-wrap gap-2 justify-center">
              {SUPPORT_SECTIONS.map(({ id, label, icon: Icon }) => {
                const active = activeSupportId === id;
                return (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveSupportId(id);
                      scrollToId(id);
                    }}
                    className={`inline-flex items-center justify-center px-5 py-2 rounded-xl font-medium transition-all ${
                      active ? 'text-white' : `${NEUTRAL_TEXT}`
                    }`}
                    style={active ? GRADIENT_BG : { border: '1px solid rgba(0,0,0,0.15)' }}
                    aria-current={active ? 'true' : 'false'}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Single blended card with all support content */}
          <div className={`max-w-5xl mx-auto ${CARD_BASE} p-8 space-y-10`}>
            {/* Make a Donation */}
            <div id="support-donate" className="scroll-mt-[var(--header-offset)]">
              <h3 className="text-2xl font-extrabold mb-3">
                <span className="text-[#005596]">Make</span> <span className="text-[#54B948]">a Donation</span>
              </h3>
              <p className={`${NEUTRAL_MUTED} mb-2`}>
                We receive online gifts through PayPal. You can use a PayPal account or any major debit/credit card. A receipt will be emailed to you.
              </p>
              <p className={`${NEUTRAL_MUTED}`}>
                Donate online:&nbsp;
                <a href={PAYPAL_DONATE_URL} target="_blank" rel="noopener noreferrer" className="underline text-[#005596]">
                  PayPal Donation Page
                </a>.
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                Prefer to mail a check? Send to: <strong>P.O. Box 3356, Salisbury, NC 28145-3356</strong>
              </p>
            </div>

            <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

            {/* Donating Items */}
            <div id="support-items" className="scroll-mt-[var(--header-offset)]">
              <h3 className="text-2xl font-extrabold mb-3">
                <span className="text-[#005596]">Donating</span> <span className="text-[#54B948]">Items</span>
              </h3>
              <p className={`${NEUTRAL_MUTED} mb-6`}>
                Items should be clean and in working condition. Receipts are available for tax purposes. For large donations, please call ahead.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-lg p-6 border border-neutral-200 dark:border-neutral-800">
                  <h4 className="text-lg font-semibold mb-4" style={{ color: '#54B948' }}>We Accept</h4>
                  <ul className="space-y-2">
                    {acceptedItems.map((item, i) => (
                      <li key={i} className={`${NEUTRAL_MUTED}`}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg p-6 border border-neutral-200 dark:border-neutral-800">
                  <h4 className="text-lg font-semibold mb-4 text-red-500">We Cannot Accept</h4>
                  <ul className="space-y-2">
                    {notAcceptedItems.map((item, i) => (
                      <li key={i} className={`${NEUTRAL_MUTED}`}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className={`${NEUTRAL_MUTED} mt-6`}>
                ReStore locations and phone numbers are listed on our&nbsp;
                <a href="/locations" className="underline text-[#005596]">Locations</a> page.
              </p>
              <p className={`${NEUTRAL_MUTED}`}>
                For the full list of guidelines, see our&nbsp;
                <a href="/donation-guidelines" className="underline text-[#005596]">Donation Guidelines</a>.
              </p>
            </div>

            <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

            {/* Land Donations */}
            <div id="support-land" className="scroll-mt-[var(--header-offset)]">
              <h3 className="text-2xl font-extrabold mb-3">
                <span className="text-[#005596]">Land</span> <span className="text-[#54B948]">Donations</span>
              </h3>
              <p className={`${NEUTRAL_MUTED} mb-4`}>
                Land gifts are highly impactful. Typical criteria include Rowan County location, residential suitability, clear title, access to utilities, and compliance with local zoning. Environmental assessment may be required.
              </p>
              <ul className={`space-y-2 ${NEUTRAL_MUTED}`}>
                <li>• Located within Rowan County</li>
                <li>• Suitable for residential construction</li>
                <li>• Clear title; no liens</li>
                <li>• Utilities access; meets zoning</li>
                <li>• Environmental review as needed</li>
              </ul>
              <p className={`${NEUTRAL_MUTED} mt-4`}>
                Reach out via our <a href="/contact" className="underline text-[#005596]">Contact</a> page to discuss a prospective land gift.
              </p>
            </div>

            <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

            {/* Professional Services */}
            <div id="support-professional" className="scroll-mt-[var(--header-offset)]">
              <h3 className="text-2xl font-extrabold mb-3">
                <span className="text-[#005596]">Professional</span> <span className="text-[#54B948]">Services</span>
              </h3>
              <p className={`${NEUTRAL_MUTED} mb-4`}>
                Share specialized skills to amplify our impact—construction trades (electrical, plumbing, HVAC, roofing, flooring, painting), as well as legal, accounting, marketing/PR, photography, web development, and grant writing.
              </p>
              <p className={`${NEUTRAL_MUTED}`}>
                To offer services, use our <a href="/contact" className="underline text-[#005596]">Contact</a> page.
              </p>
            </div>

            <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

            {/* eBay */}
            <div id="support-ebay" className="scroll-mt-[var(--header-offset)]">
              <h3 className="text-2xl font-extrabold mb-3">
                <span className="text-[#005596]">Shop</span> <span className="text-[#54B948]">& Support</span>
              </h3>
              <p className={`${NEUTRAL_MUTED}`}>
                Support us through eBay Giving Works by shopping our store or donating a percentage of your sales. Visit our store:
                &nbsp;
                <a
                  href="https://www.ebay.com/usr/habitatrowan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[#005596]"
                >
                  ebay.com/usr/habitatrowan
                </a>.
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                eBay seller name: <strong>habitatrowan</strong>
              </p>
            </div>
          </div>

          {/* Bottom CTAs (ONLY place with buttons besides top nav) */}
          {/* <BottomCTA />  — uncomment when you want it rendered here */}
        </section>

      </div>

      {/* legacy anchor so old /get-involved#donate links still work */}
      <div id="donate" aria-hidden="true" className="h-0 w-0 overflow-hidden" />

      {/* Scroll reveal styles + global sticky header offset */}
      <style>{`
        :root {
          /* Tweak this once to match your sticky header height */
          --header-offset: 96px;
        }
        .reveal { opacity: 0; transform: translateY(24px); }
        .reveal-in { opacity: 1; transform: translateY(0); transition: opacity 600ms cubic-bezier(.22,.61,.36,1), transform 600ms cubic-bezier(.22,.61,.36,1); }
      `}</style>
    </div>
  );
};

export default GetInvolved;
