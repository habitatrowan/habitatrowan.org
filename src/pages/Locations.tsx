import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Clock, Phone, Mail, CheckCircle, X, Navigation } from 'lucide-react';

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

// True-neutral tokens + common surfaces (match other pages)
const NEUTRAL_TEXT = 'text-neutral-900 dark:text-neutral-50';
const NEUTRAL_MUTED = 'text-neutral-600 dark:text-neutral-300';
const NEUTRAL_CARD = 'bg-white dark:bg-neutral-900';
const NEUTRAL_BORDER = 'border border-neutral-200 dark:border-neutral-700';
const SECTION_BG_SOFT = 'bg-neutral-50 dark:bg-neutral-950';

const CARD_BASE =
  `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)] transition-all duration-300 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.18)] hover:ring-2 ring-neutral-300 dark:ring-neutral-700`;

const BTN_BASE =
  'inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-200 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)] hover:ring-2 ring-offset-0 ring-neutral-300 dark:ring-neutral-700 focus:outline-none';

const Locations = () => {
  const [activeLocation, setActiveLocation] = useState<'restore' | 'office'>('restore');

  const locations = [
    {
      id: 'restore' as const,
      name: 'ReStore Location',
      address: '1707 S Main St, Salisbury, NC 28144',
      phone: '(704) 642-1222',
      email: 'restore@habitatrowan.org',
      hours: {
        'Monday - Friday': '9:00 AM - 6:00 PM',
        Saturday: '9:00 AM - 5:00 PM',
        Sunday: 'Closed',
      },
      description:
        'Our ReStore sells new and gently used furniture, home accessories, building materials and appliances to the public at a fraction of the retail price.',
      image:
        'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    },
    {
      id: 'office' as const,
      name: 'Main Office',
      address: 'P.O. Box 3356, Salisbury, NC 28145-3356',
      phone: '(704) 642-1222',
      email: 'info@habitatrowan.org',
      hours: {
        'Monday - Friday': '9:00 AM - 5:00 PM',
        Saturday: 'By Appointment',
        Sunday: 'Closed',
      },
      description:
        'Our main office handles home applications, volunteer coordination, and general inquiries about our programs.',
      image:
        'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    },
  ];

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

  const currentLocation = locations.find((loc) => loc.id === activeLocation)!;

  // reveal refs
  const headerRef = useReveal<HTMLDivElement>();
  const toggleRef = useReveal<HTMLDivElement>();
  const detailsRef = useReveal<HTMLDivElement>();
  const guidelinesRef = useReveal<HTMLDivElement>();
  const contactRef = useReveal<HTMLDivElement>();

  const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    currentLocation.address
  )}&output=embed`;

  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    currentLocation.address
  )}`;

  return (
    <div className={`min-h-screen py-16 ${NEUTRAL_TEXT}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 reveal">
          <h1 className="text-4xl font-extrabold mb-4">
            <span className="text-[#005596]">Our</span> <span className="text-[#54B948]">Locations</span>
          </h1>
          <p className={`text-xl ${NEUTRAL_MUTED} max-w-3xl mx-auto`}>
            Visit our ReStore for great deals on home goods, or stop by our office to learn more about our programs.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-12" />

        {/* Location Toggle */}
        <div ref={toggleRef} className="flex justify-center mb-8 reveal">
          <div className={`${NEUTRAL_CARD} ${NEUTRAL_BORDER} p-1 rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)]`}>
            {locations.map((location) => {
              const active = activeLocation === location.id;
              return (
                <button
                  key={location.id}
                  onClick={() => setActiveLocation(location.id)}
                  className={`${BTN_BASE} m-1 font-medium ${active ? 'text-white' : `${NEUTRAL_TEXT}`}`}
                  style={{
                    backgroundColor: active ? '#005596' : 'transparent',
                    border: active ? '1px solid #005596' : '1px solid rgba(0,0,0,0.15)',
                  }}
                >
                  {location.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Location Details */}
        <div ref={detailsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 reveal">
          {/* Location Info */}
          <div className="space-y-6">
            <div className={`${CARD_BASE} p-8`}>
              <h2 className="text-3xl font-extrabold mb-6">
                <span className="text-[#005596]">{currentLocation.name.split(' ')[0]}</span>{' '}
                <span className="text-[#54B948]">{currentLocation.name.split(' ').slice(1).join(' ')}</span>
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#54B948' }} />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className={`${NEUTRAL_MUTED}`}>{currentLocation.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#54B948' }} />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className={`${NEUTRAL_MUTED}`}>{currentLocation.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#54B948' }} />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className={`${NEUTRAL_MUTED}`}>{currentLocation.email}</p>
                  </div>
                </div>
              </div>

              <p className={`${NEUTRAL_MUTED} mb-6`}>{currentLocation.description}</p>

              <a
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`${BTN_BASE} text-white`}
                style={{ background: 'linear-gradient(90deg, #005596 0%, #54B948 100%)' }}
              >
                <Navigation className="w-5 h-5 mr-2" />
                Get Directions
              </a>
            </div>

            {/* Hours */}
            <div className={`${CARD_BASE} p-6`}>
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6" style={{ color: '#54B948' }} />
                <h3 className="text-xl font-extrabold">
                  <span className="text-[#005596]">Hours</span>
                </h3>
              </div>
              <div className="space-y-2">
                {Object.entries(currentLocation.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span className={`${NEUTRAL_MUTED}`}>{day}:</span>
                    <span className="font-medium">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Location Map Only */}
          <div className={`${CARD_BASE} p-4`}>
            <div className="w-full h-96 rounded-lg overflow-hidden">
              <iframe
                title={`${currentLocation.name} Map`}
                src={mapsEmbedSrc}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            </div>
          </div>

        </div>

        {/* Donation Guidelines - Only show for ReStore */}
        {activeLocation === 'restore' && (
          <section ref={guidelinesRef} className="mb-16 reveal">
            <h2 className="text-3xl font-extrabold text-center mb-8">
              <span className="text-[#005596]">Donation</span> <span className="text-[#54B948]">Guidelines</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Accepted Items */}
              <div className={`${CARD_BASE} p-8`}>
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="w-8 h-8" style={{ color: '#54B948' }} />
                  <h3 className="text-2xl font-extrabold" style={{ color: '#54B948' }}>
                    We Accept
                  </h3>
                </div>
                <ul className="space-y-3">
                  {acceptedItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#54B948' }} />
                      <span className={`${NEUTRAL_MUTED}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Not Accepted Items */}
              <div className={`${CARD_BASE} p-8`}>
                <div className="flex items-center gap-3 mb-6">
                  <X className="w-8 h-8 text-red-500" />
                  <h3 className="text-2xl font-extrabold text-red-500">We Cannot Accept</h3>
                </div>
                <ul className="space-y-3">
                  {notAcceptedItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <X className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-500" />
                      <span className={`${NEUTRAL_MUTED}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={`${SECTION_BG_SOFT} ${NEUTRAL_BORDER} mt-8 p-6 rounded-xl`}>
              <h4 className="text-lg font-extrabold mb-3">
                <span className="text-[#005596]">Donation</span> <span className="text-[#54B948]">Tips</span>
              </h4>
              <ul className={`space-y-2 ${NEUTRAL_MUTED}`}>
                <li>• Items should be in good, working condition</li>
                <li>• Clean items before donating</li>
                <li>• Call ahead for large item donations</li>
                <li>• Donation receipts available for tax purposes</li>
                <li>• We offer pickup services for large donations</li>
              </ul>
            </div>
          </section>
        )}

        {/* Divider */}
        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-16" />

        {/* Contact Information */}
        <section ref={contactRef} className="text-center reveal">
          <div
            className="p-8 rounded-xl"
            style={{ background: 'linear-gradient(90deg, #005596 0%, #54B948 100%)' }}
          >
            <h2 className="text-2xl font-extrabold text-white mb-4">Need More Information?</h2>
            <p className="text-lg text-white/90 mb-6">
              Contact us for directions, donation pickup, or any questions about our locations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:704-642-1222"
                className={`${BTN_BASE} bg-[#005596] text-white`}
                style={{ border: '1px solid rgba(0,0,0,0.15)' }}
              >
                Call (704) 642-1222
              </a>
              <a
                href="/contact"
                className={`${BTN_BASE} text-white`}
                style={{ backgroundColor: '#54B948' }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* local styles for reveal motion */}
      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); }
        .reveal-in { opacity: 1; transform: translateY(0); transition: opacity 600ms cubic-bezier(.22,.61,.36,1), transform 600ms cubic-bezier(.22,.61,.36,1); }
      `}</style>
    </div>
  );
};

export default Locations;
