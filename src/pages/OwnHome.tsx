import React, { useState, useRef, useEffect } from 'react';
import { Download, CheckCircle, HelpCircle, FileText } from 'lucide-react';

/** --- reveal animation helper --- */
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

// Neutral + brand tokens
const NEUTRAL_TEXT = 'text-neutral-900 dark:text-neutral-50';
const NEUTRAL_MUTED = 'text-neutral-600 dark:text-neutral-300';
const NEUTRAL_CARD = 'bg-white dark:bg-neutral-900';
const NEUTRAL_BORDER = 'border border-neutral-200 dark:border-neutral-700';

const CARD_BASE =
  `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)] transition-all duration-300 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.18)] hover:ring-2 ring-neutral-300 dark:ring-neutral-700`;

const BTN_BASE =
  'inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-200 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)] hover:ring-2 ring-offset-0 ring-neutral-300 dark:ring-neutral-700 focus:outline-none';

const OwnHome = () => {
  const [activeTab, setActiveTab] = useState('eligibility');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const eligibilityRequirements = [
    'Demonstrate need for decent, affordable housing',
    'Show ability to pay an affordable mortgage',
    'Be willing to partner with Habitat (sweat equity hours)',
    'Live or work in Rowan County',
    'Have household income between 30-80% of area median income',
    'Have acceptable credit history or be willing to work on credit repair',
    'Be a first-time homeowner or have not owned a home in the past 3 years'
  ];

  const applicationSteps = [
    { step: 1, title: 'Attend Information Session', description: 'Join our monthly information session to learn about the program and requirements.' },
    { step: 2, title: 'Submit Pre-Application', description: 'Complete and submit your pre-qualification form with required documentation.' },
    { step: 3, title: 'Complete Full Application', description: 'If pre-qualified, you will be invited to complete a comprehensive application.' },
    { step: 4, title: 'Home Visit & Interview', description: 'Our staff will conduct a home visit and interview with your family.' },
    { step: 5, title: 'Family Selection Committee Review', description: 'Your application will be reviewed by our volunteer selection committee.' },
    { step: 6, title: 'Begin Partnership', description: 'If selected, you will begin sweat equity hours and homeownership education.' },
    { step: 7, title: 'Home Construction', description: 'Work alongside volunteers to build your home.' },
    { step: 8, title: 'Home Dedication', description: 'Celebrate receiving the keys to your new home!' }
  ];

  const faqs = [
    { question: 'How much do Habitat homes cost?', answer: 'Habitat homes are sold at no profit with an affordable mortgage. Payments are typically 25-30% of household income.' },
    { question: 'What are sweat equity hours?', answer: 'Sweat equity hours are volunteer hours that partner families contribute. Typically 200-500 hours depending on family size.' },
    { question: 'How long does the application process take?', answer: 'Usually 3-6 months from initial application to final selection, depending on applications and home availability.' },
    { question: 'Can I choose the location of my home?', answer: 'Locations are based on available land and community partnerships. Families don’t choose exact sites.' },
    { question: 'What happens if I can’t make my mortgage payments?', answer: 'Habitat offers counseling and may restructure payments to help families stay in their homes.' }
  ];

  const tabs = [
    { id: 'eligibility', name: 'Eligibility', icon: CheckCircle },
    { id: 'process', name: 'Application Process', icon: FileText },
    { id: 'faq', name: 'FAQ', icon: HelpCircle }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'eligibility':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold">
              <span className="text-[#005596]">Eligibility</span> <span className="text-[#54B948]">Requirements</span>
            </h2>
            <p className={`text-lg ${NEUTRAL_MUTED}`}>
              To qualify for a Habitat for Humanity home, families must meet the following criteria:
            </p>
            <div className="space-y-4">
              {eligibilityRequirements.map((req, i) => (
                <div key={i} className={`${CARD_BASE} flex items-start gap-4 p-4`}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: '#54B948' }}>
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className={`${NEUTRAL_MUTED}`}>{req}</span>
                </div>
              ))}
            </div>

            <div className={`${CARD_BASE} p-6`}>
              <h3 className="text-xl font-extrabold mb-3">
                <span className="text-[#005596]">Ready</span> <span className="text-[#54B948]">to Apply?</span>
              </h3>
              <p className={`${NEUTRAL_MUTED} mb-4`}>
                If you meet these requirements, download our pre-qualification form to start the process.
              </p>
              <button className={`${BTN_BASE} text-white`} style={{ backgroundColor: '#005596' }}>
                <Download className="w-5 h-5 mr-2" />
                Download Pre-Qualification Form
              </button>
            </div>
          </div>
        );

      case 'process':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold">
              <span className="text-[#005596]">Application</span> <span className="text-[#54B948]">Process</span>
            </h2>
            <p className={`text-lg ${NEUTRAL_MUTED}`}>
              Our program follows a comprehensive process to prepare families for successful homeownership:
            </p>
            <div className="space-y-6">
              {applicationSteps.map((s, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg text-white" style={{ backgroundColor: '#005596' }}>
                    {s.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">
                      <span className="text-[#005596]">{s.title.split(' ')[0]}</span>{' '}
                      <span className="text-[#54B948]">{s.title.split(' ').slice(1).join(' ')}</span>
                    </h3>
                    <p className={`${NEUTRAL_MUTED}`}>{s.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={`${CARD_BASE} p-6`}>
              <h3 className="text-xl font-extrabold mb-3">
                <span className="text-[#005596]">Information</span> <span className="text-[#54B948]">Sessions</span>
              </h3>
              <p className={`${NEUTRAL_MUTED} mb-4`}>
                Held the second Saturday of each month at 10:00 AM at our office. Required for all applicants.
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Sessions last 1–2 hours and include time for questions. No registration required.
              </p>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold">
              <span className="text-[#005596]">Frequently</span> <span className="text-[#54B948]">Asked Questions</span>
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className={`${CARD_BASE} overflow-hidden`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <h3 className="text-lg font-semibold">
                      <span className="text-[#005596]">{faq.question.split(' ')[0]}</span>{' '}
                      <span className="text-[#54B948]">{faq.question.split(' ').slice(1).join(' ')}</span>
                    </h3>
                    <HelpCircle
                      className={`w-5 h-5 text-[#005596] dark:text-[#54B948] transform transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4">
                      <p className={`${NEUTRAL_MUTED}`}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className={`${NEUTRAL_MUTED} mb-4`}>
                Have a question not answered here? Contact us for more information.
              </p>
              <a href="/contact" className={`${BTN_BASE} text-white`} style={{ backgroundColor: '#54B948' }}>
                Contact Us
              </a>
            </div>
          </div>
        );
    }
  };

  const headerRef = useReveal<HTMLDivElement>();
  const tabsRef = useReveal<HTMLDivElement>();
  const contentRef = useReveal<HTMLDivElement>();

  return (
    <div className={`min-h-screen py-16 ${NEUTRAL_TEXT}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 reveal">
          <h1 className="text-4xl font-extrabold mb-4">
            <span className="text-[#005596]">Own</span> <span className="text-[#54B948]">a Home</span>
          </h1>
          <p className={`text-xl ${NEUTRAL_MUTED} max-w-3xl mx-auto`}>
            Habitat partners with families to help them achieve the strength, stability, and independence of homeownership.
          </p>
        </div>

        {/* Tabs */}
        <div ref={tabsRef} className="mb-8 reveal">
          <div className="flex flex-wrap gap-2 justify-center">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${BTN_BASE} font-medium ${active ? 'text-white' : `${NEUTRAL_TEXT}`}`}
                  style={{
                    backgroundColor: active ? '#005596' : 'transparent',
                    border: active ? '1px solid #005596' : '1px solid rgba(0,0,0,0.15)'
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-12" />

        {/* Content */}
        <div ref={contentRef} className="max-w-4xl mx-auto reveal">
          {renderTabContent()}
        </div>
      </div>

      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); }
        .reveal-in { opacity: 1; transform: translateY(0); transition: opacity 600ms cubic-bezier(.22,.61,.36,1), transform 600ms cubic-bezier(.22,.61,.36,1); }
      `}</style>
    </div>
  );
};

export default OwnHome;
