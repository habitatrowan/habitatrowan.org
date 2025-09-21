import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, HelpCircle } from 'lucide-react';

/** Scroll-reveal helper */
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

// Theme tokens (aligned with other pages)
const NEUTRAL_TEXT   = 'text-neutral-900 dark:text-neutral-50';
const NEUTRAL_MUTED  = 'text-neutral-600 dark:text-neutral-300';
const NEUTRAL_CARD   = 'bg-white dark:bg-neutral-900';
const NEUTRAL_BORDER = 'border border-neutral-200 dark:border-neutral-700';

const CARD_BASE = `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)]`;
const GRADIENT_BG = { background: 'linear-gradient(90deg, #005596 0%, #54B948 100%)' };

const Contact: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      info: '(704) 642-1222',
      href: 'tel:7046421222',
      description: 'Monday–Friday, 9:00 AM–5:00 PM',
    },
    {
      icon: Mail,
      title: 'Email',
      info: 'info@habitatrowan.org',
      href: 'mailto:info@habitatrowan.org',
      description: 'We typically respond within 1 business day',
    },
    {
      icon: MapPin,
      title: 'Office Address',
      info: '1707 S Main St, Salisbury, NC 28144',
      href: 'https://maps.google.com/?q=1707 S Main St, Salisbury, NC 28144',
      description: 'Visit during office hours',
    },
  ];

  const socialLinks = [
    { name: 'Facebook',  icon: Facebook,  url: '#', color: 'text-[#005596]' },
    { name: 'Twitter',   icon: Twitter,   url: '#', color: 'text-[#005596]' },
    { name: 'Instagram', icon: Instagram, url: '#', color: 'text-[#54B948]' },
    { name: 'YouTube',   icon: Youtube,   url: '#', color: 'text-[#54B948]' },
  ];

  // Store/Hours/Who-to-talk-to FAQ
  const faqs = [
    {
      q: 'What are the ReStore hours?',
      a: 'Typical hours are Tuesday–Saturday, 10:00 AM–5:00 PM. Donation drop-offs are accepted until 4:30 PM. Hours may vary on holidays.',
    },
    {
      q: 'When is the main office open?',
      a: 'The administrative office is open Monday–Friday, 9:00 AM–5:00 PM.',
    },
    {
      q: 'Who do I talk to about donating items?',
      a: 'For furniture, appliances, or building materials, ask for the ReStore Donations Desk or the ReStore Manager during ReStore hours.',
    },
    {
      q: 'Who handles homeownership questions?',
      a: 'Ask for Family Services during office hours. They can help with eligibility, application timelines, and information sessions.',
    },
    {
      q: 'Who should I contact about construction volunteering?',
      a: 'Speak with our Volunteer Coordinator during office hours. They’ll share safety guidelines and schedule options.',
    },
  ];

  const headerRef = useReveal<HTMLDivElement>();
  const infoRef   = useReveal<HTMLDivElement>();
  const socialRef = useReveal<HTMLDivElement>();
  const hoursRef  = useReveal<HTMLDivElement>();
  const faqRef    = useReveal<HTMLDivElement>();

  return (
    <div className={`min-h-screen py-16 ${NEUTRAL_TEXT}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 reveal">
          <h1 className="text-4xl font-extrabold mb-4">
            <span className="text-[#005596]">Contact</span>{' '}
            <span className="text-[#54B948]">Us</span>
          </h1>
          <p className={`text-xl ${NEUTRAL_MUTED} max-w-3xl mx-auto`}>
            Clean, simple ways to get in touch. Find phone and email, social links, office hours, and quick answers about the ReStore and who to talk to.
          </p>
        </div>

        {/* One blended wrapper card with clear sections */}
        <div className={`${CARD_BASE} p-8 space-y-12`}>

          {/* Get in Touch */}
          <section ref={infoRef} className="reveal">
            <h2 className="text-3xl font-extrabold mb-6">
              <span className="text-[#005596]">Get</span> <span className="text-[#54B948]">in Touch</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactInfo.map((c, i) => {
                const Icon = c.icon;
                return (
                  <a
                    key={i}
                    href={c.href}
                    className={`${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl p-6 block transition-transform hover:-translate-y-0.5`}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-[0_2px_12px_rgba(0,0,0,0.12)]"
                      style={GRADIENT_BG}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-1 text-[#005596] dark:text-[#54B948]">{c.title}</h3>
                    <p className="font-medium">{c.info}</p>
                    <p className={`${NEUTRAL_MUTED} text-sm`}>{c.description}</p>
                  </a>
                );
              })}
            </div>
          </section>

          {/* Divider */}
          <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

          {/* Socials */}
          <section ref={socialRef} className="reveal">
            <h2 className="text-3xl font-extrabold mb-6">
              <span className="text-[#005596]">Follow</span> <span className="text-[#54B948]">Along</span>
            </h2>
            <p className={`${NEUTRAL_MUTED} mb-4`}>Stay connected with updates, events, and stories.</p>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    aria-label={s.name}
                    className={`w-14 h-14 ${s.color} ${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-full flex items-center justify-center transition-transform hover:scale-110`}
                  >
                    <Icon className="w-7 h-7" />
                  </a>
                );
              })}
            </div>
          </section>

          {/* Divider */}
          <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

          {/* Office Hours */}
          <section ref={hoursRef} className="reveal">
            <h2 className="text-3xl font-extrabold mb-6">
              <span className="text-[#005596]">Office</span> <span className="text-[#54B948]">Hours</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className={`${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl p-5`}>
                <div className="text-sm font-semibold mb-1">Monday–Friday</div>
                <div className={`${NEUTRAL_MUTED}`}>9:00 AM–5:00 PM</div>
              </div>
              <div className={`${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl p-5`}>
                <div className="text-sm font-semibold mb-1">Saturday</div>
                <div className={`${NEUTRAL_MUTED}`}>By Appointment</div>
              </div>
              <div className={`${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl p-5`}>
                <div className="text-sm font-semibold mb-1">Sunday</div>
                <div className={`${NEUTRAL_MUTED}`}>Closed</div>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

          {/* FAQ */}
          <section ref={faqRef} className="reveal">
            <h2 className="text-3xl font-extrabold mb-6">
              <span className="text-[#005596]">FAQ:</span> <span className="text-[#54B948]">Store, Hours & Contacts</span>
            </h2>

            <div className={`${CARD_BASE} p-2`}>
              {faqs.map((item, i) => (
                <div key={i} className={`${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-lg overflow-hidden mb-2 last:mb-0`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors focus:outline-none"
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

      {/* Local reveal styles */}
      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); }
        .reveal-in { opacity: 1; transform: translateY(0); transition:
          opacity 600ms cubic-bezier(.22,.61,.36,1),
          transform 600ms cubic-bezier(.22,.61,.36,1); }
      `}</style>
    </div>
  );
};

export default Contact;
