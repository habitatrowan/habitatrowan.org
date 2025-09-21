import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Clock, Phone, Mail, Navigation } from 'lucide-react';

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

const CARD_BASE =
  `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)] transition-all duration-300 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.18)] hover:ring-2 ring-neutral-300 dark:ring-neutral-700`;

const BTN_BASE =
  'inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-200 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)] hover:ring-2 ring-offset-0 ring-neutral-300 dark:ring-neutral-700 focus:outline-none';

const Locations = () => {
  // Single campus (one physical address)
  const campus = {
    name: 'Habitat Rowan — ReStore & Housing Ministry Office',
    address: '1707 S Main St, Salisbury, NC 28144',
    description:
      'Visit our Rowan County campus. You’ll find our community ReStore as well as our Habitat for Humanity Housing Ministry Office under one roof.',
  };

  // Two distinct sections at the same location
  const units = [
    {
      id: 'office' as const,
      title: 'Housing Ministry Office',
      description:
        'Home applications, volunteer coordination, family services and general Habitat inquiries. We’re here to help you get involved or apply.',
      phone: '(704) 642-1222',
      email: 'info@habitatrowan.org',
      hours: {
        'Monday – Friday': '9:00 AM – 5:00 PM',
        Saturday: 'By Appointment',
        Sunday: 'Closed',
      },
      ctaLabel: 'Contact Office',
      ctaHref: '/contact',
    },
    {
      id: 'restore' as const,
      title: 'ReStore',
      description:
        'New and gently used furniture, home accessories, building materials and appliances at a fraction of retail prices. Your purchases help build homes locally.',
      phone: '(704) 642-1222',
      email: 'restore@habitatrowan.org',
      hours: {
        'Monday – Friday': '9:00 AM – 6:00 PM',
        Saturday: '9:00 AM – 5:00 PM',
        Sunday: 'Closed',
      },
      ctaLabel: 'Shop ReStore',
      ctaHref: '/locations#restore', // adjust if you have a ReStore page/anchor
    },
  ];

  const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(campus.address)}&output=embed`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(campus.address)}`;

  // reveal refs
  const headerRef = useReveal<HTMLDivElement>();
  const detailsRef = useReveal<HTMLDivElement>();
  const mapRef = useReveal<HTMLDivElement>();
  const contactRef = useReveal<HTMLDivElement>();

  return (
    <div className={`min-h-screen py-16 ${NEUTRAL_TEXT}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 reveal">
          <h1 className="text-4xl font-extrabold mb-4">
            <span className="text-[#005596]">Our</span> <span className="text-[#54B948]">Location</span>
          </h1>
          <p className={`text-xl ${NEUTRAL_MUTED} max-w-3xl mx-auto`}>
            {campus.description}
          </p>
        </div>

        {/* Campus Address Card */}
        <div className={`${CARD_BASE} p-8 mb-10`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 mt-1" style={{ color: '#54B948' }} />
              <div>
                <p className="font-semibold text-lg">Address</p>
                <p className={`${NEUTRAL_MUTED}`}>{campus.address}</p>
              </div>
            </div>

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
        </div>

        {/* Two-unit grid (ReStore + Office) */}
        <div ref={detailsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 reveal">
          {units.map((u) => (
            <section key={u.id} id={u.id} className={`${CARD_BASE} p-8`}>
              <h2 className="text-3xl font-extrabold mb-3">
                <span className="text-[#005596]">{u.title.split(' ')[0]}</span>{' '}
                <span className="text-[#54B948]">{u.title.split(' ').slice(1).join(' ')}</span>
              </h2>

              <p className={`${NEUTRAL_MUTED} mb-6`}>{u.description}</p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#54B948' }} />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className={`${NEUTRAL_MUTED}`}>{u.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#54B948' }} />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className={`${NEUTRAL_MUTED}`}>{u.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#54B948' }} />
                  <div className="w-full">
                    <p className="font-medium mb-2">Hours</p>
                    <div className="space-y-1">
                      {Object.entries(u.hours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between">
                          <span className={`${NEUTRAL_MUTED}`}>{day}:</span>
                          <span className="font-medium">{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={`tel:${u.phone.replace(/[^\d]/g, '')}`} className={`${BTN_BASE} bg-[#005596] text-white`}>
                  Call {u.title}
                </a>
                <a href={`mailto:${u.email}`} className={`${BTN_BASE} text-white`} style={{ backgroundColor: '#54B948' }}>
                  Email {u.title}
                </a>
                <a href={u.ctaHref} className={`${BTN_BASE} ${NEUTRAL_CARD} ${NEUTRAL_BORDER}`}>
                  {u.ctaLabel}
                </a>
              </div>
            </section>
          ))}
        </div>

        {/* Map (full focus) */}
        <div ref={mapRef} className={`${CARD_BASE} p-4 mb-16 reveal`}>
          <div className="w-full h-96 rounded-lg overflow-hidden">
            <iframe
              title="Habitat Rowan Campus Map"
              src={mapsEmbedSrc}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Contact CTA */}
        <section ref={contactRef} className="text-center reveal">
          <div
            className="p-8 rounded-xl"
            style={{ background: 'linear-gradient(90deg, #005596 0%, #54B948 100%)' }}
          >
            <h2 className="text-2xl font-extrabold text-white mb-4">Need More Information?</h2>
            <p className="text-lg text-white/90 mb-6">
              Call us or reach out to the office with any questions about visiting our campus.
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
