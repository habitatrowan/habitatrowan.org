import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar, Download, Users, Hammer, ShoppingCart, GraduationCap,
  Star, Heart, Gift, Home, Phone, Mail, ExternalLink
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

// True-neutral tokens (closer to black, no blue cast)
const NEUTRAL_TEXT = 'text-neutral-900 dark:text-neutral-50';
const NEUTRAL_MUTED = 'text-neutral-600 dark:text-neutral-300';
const NEUTRAL_CARD = 'bg-white dark:bg-neutral-900';
const NEUTRAL_BORDER = 'border border-neutral-200 dark:border-neutral-700';
const SECTION_BG_SOFT = 'bg-neutral-50 dark:bg-neutral-950';

const CARD_BASE =
  `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)] transition-all duration-300 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.18)] hover:ring-2 ring-neutral-300 dark:ring-neutral-700`;

const BTN_BASE =
  'inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-200 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)] hover:ring-2 ring-offset-0 ring-neutral-300 dark:ring-neutral-700 focus:outline-none';

const INPUT_BASE =
  'w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 ' +
  'text-neutral-900 dark:text-neutral-50 placeholder-neutral-500 focus:ring-2 focus:ring-[#005596] focus:border-transparent';

const GetInvolved = () => {
  const [selectedOpportunity, setSelectedOpportunity] = useState('');
  const [donationType, setDonationType] = useState<'monetary' | 'land' | 'professional' | 'commodities'>('monetary');
  const [donationAmount, setDonationAmount] = useState('');
  const [isMemorial, setIsMemorial] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    availability: '',
    experience: '',
    interests: [] as string[],
  });
  const [memorialInfo, setMemorialInfo] = useState({
    honoree: '',
    notifyName: '',
    notifyAddress: ''
  });

  useEffect(() => {
    // Handle hash navigation
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const opportunities = [
    {
      id: 'construction',
      title: 'Construction Volunteers',
      icon: Hammer,
      description: 'Help build homes with hands-on construction work including framing, roofing, painting, and finishing work.',
      requirements: 'No experience necessary - we provide training and supervision.',
      schedule: 'Saturdays 8:00 AM - 4:00 PM'
    },
    {
      id: 'restore',
      title: 'ReStore Volunteers',
      icon: ShoppingCart,
      description: 'Assist customers, organize inventory, and help with donations at our ReStore location.',
      requirements: 'Customer service skills helpful but not required.',
      schedule: 'Flexible weekday and weekend shifts available'
    },
    {
      id: 'committees',
      title: 'Committee Work',
      icon: Users,
      description: 'Join our Family Selection, Fundraising, or Public Relations committees.',
      requirements: 'Professional skills in relevant areas preferred.',
      schedule: 'Monthly meetings and ongoing project work'
    },
    {
      id: 'students',
      title: 'Student Groups',
      icon: GraduationCap,
      description: 'Special volunteer opportunities for high school and college student groups.',
      requirements: 'Adult supervision required for groups under 18.',
      schedule: 'Flexible scheduling for group projects'
    }
  ];

  const safetyRules = [
    'All volunteers must be at least 16 years old for construction sites',
    'Closed-toe shoes required at all times on construction sites',
    'Hard hats and safety glasses provided and must be worn',
    'No volunteers under the influence of drugs or alcohol',
    'Follow all supervisor instructions and safety protocols',
    'Report any injuries or unsafe conditions immediately',
    'Stay hydrated and take breaks as needed',
    'Dress appropriately for weather and work conditions'
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      quote: 'Volunteering with Habitat has been incredibly rewarding. Seeing families receive their keys is priceless.',
      role: 'Construction Volunteer'
    },
    {
      name: 'Mike Johnson',
      quote: 'The ReStore is a great place to volunteer. You meet wonderful people and support a great cause.',
      role: 'ReStore Volunteer'
    },
    {
      name: 'Lisa Chen',
      quote: 'Being part of the Family Selection Committee lets me help families achieve their homeownership dreams.',
      role: 'Committee Member'
    }
  ];

  const donationOptions = [
    { id: 'monetary' as const, name: 'Monetary Donations', icon: Heart },
    { id: 'land' as const, name: 'Land Donations', icon: Home },
    { id: 'professional' as const, name: 'Professional Services', icon: Hammer },
    { id: 'commodities' as const, name: 'Commodities & Materials', icon: Gift }
  ];
  const suggestedAmounts = [25, 50, 100, 250, 500, 1000];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your interest in volunteering! We will contact you soon.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMemorialInfoChange = (field: keyof typeof memorialInfo, value: string) => {
    setMemorialInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your generous donation! You will be redirected to PayPal to complete your donation.');
  };

  /** ---------- Donation content (colors locked, hover = motion/ring only) ---------- */
  const renderDonationContent = () => {
    switch (donationType) {
      case 'monetary':
        return (
          <div className="space-y-8">
            <div className={`${CARD_BASE} p-6`}>
              <h3 className="text-xl font-bold mb-3">
                <span className="text-[#005596]">Tax-Deductible</span> <span className="text-[#54B948]">Donations</span>
              </h3>
              <p className={`${NEUTRAL_MUTED} mb-4`}>
                All monetary donations to Habitat for Humanity of Rowan County are tax-deductible.
                You will receive a receipt for your records after completing your donation.
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Tax ID: 56-1234567 (Example — replace with actual EIN)
              </p>
            </div>

            <form onSubmit={handleDonationSubmit} className={`${CARD_BASE} p-8`}>
              <h3 className="text-2xl font-extrabold mb-6">
                <span className="text-[#005596]">Make</span> <span className="text-[#54B948]">a Donation</span>
              </h3>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">
                  <span className="text-[#005596]">Select</span> <span className="text-[#54B948]">Amount</span>
                </label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                  {suggestedAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setDonationAmount(amount.toString())}
                      className={`p-3 rounded-lg border text-center font-medium transition-all ${donationAmount === amount.toString()
                        ? 'text-white' : `${NEUTRAL_TEXT}`} hover:-translate-y-0.5 hover:ring-2 ring-neutral-300 dark:ring-neutral-700`}
                      style={{
                        backgroundColor: donationAmount === amount.toString() ? '#005596' : 'transparent',
                        borderColor: donationAmount === amount.toString() ? '#005596' : 'currentColor'
                      }}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`${NEUTRAL_TEXT}`}>$</span>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="Enter custom amount"
                    className={INPUT_BASE}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isMemorial}
                    onChange={(e) => setIsMemorial(e.target.checked)}
                    className="w-4 h-4 text-[#005596] border-neutral-300 dark:border-neutral-700 rounded focus:ring-[#005596]"
                  />
                  <span className={`${NEUTRAL_TEXT}`}>This is a memorial or honor donation</span>
                </label>
              </div>

              {isMemorial && (
                <div className="mb-6 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">In Honor/Memory of</label>
                      <input
                        type="text"
                        value={memorialInfo.honoree}
                        onChange={(e) => handleMemorialInfoChange('honoree', e.target.value)}
                        className={INPUT_BASE}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Notify (Name)</label>
                      <input
                        type="text"
                        value={memorialInfo.notifyName}
                        onChange={(e) => handleMemorialInfoChange('notifyName', e.target.value)}
                        className={INPUT_BASE}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Notify Address</label>
                      <textarea
                        value={memorialInfo.notifyAddress}
                        onChange={(e) => handleMemorialInfoChange('notifyAddress', e.target.value)}
                        rows={3}
                        className={INPUT_BASE}
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={!donationAmount}
                className={`${BTN_BASE} w-full text-white disabled:opacity-60 disabled:cursor-not-allowed`}
                style={{ backgroundColor: '#54B948' }}
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Donate via PayPal
              </button>
            </form>

            <div className={`${CARD_BASE} p-6`}>
              <h3 className="text-xl font-bold mb-4">
                <span className="text-[#005596]">Mail</span> <span className="text-[#54B948]">Your Donation</span>
              </h3>
              <p className={`${NEUTRAL_MUTED} mb-4`}>
                Prefer to mail a check? Send your tax-deductible donation to:
              </p>
              <address className={`${NEUTRAL_MUTED} not-italic bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg`}>
                Habitat for Humanity of Rowan County<br />
                P.O. Box 3356<br />
                Salisbury, NC 28145-3356
              </address>
            </div>
          </div>
        );

      case 'land':
        return (
          <div className="space-y-6">
            <div className={`${CARD_BASE} p-8`}>
              <h3 className="text-2xl font-extrabold mb-4">
                <span className="text-[#005596]">Land</span> <span className="text-[#54B948]">Donations</span>
              </h3>
              <p className={`${NEUTRAL_MUTED} mb-6`}>
                Donating land is one of the most impactful ways to support our mission. Your land donation
                can provide the foundation for multiple families to achieve homeownership.
              </p>

              <div className="space-y-4 mb-6">
                <h4 className="text-lg font-semibold">
                  <span className="text-[#005596]">Land</span> <span className="text-[#54B948]">Donation Criteria</span>
                </h4>
                <ul className={`space-y-2 ${NEUTRAL_MUTED}`}>
                  <li>• Located within Rowan County</li>
                  <li>• Suitable for residential construction</li>
                  <li>• Clear title with no liens or encumbrances</li>
                  <li>• Access to utilities (water, sewer, electricity)</li>
                  <li>• Meets local zoning requirements</li>
                  <li>• Environmental assessment may be required</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 mb-6">
                <h4 className="text-lg font-semibold mb-2">
                  <span className="text-[#005596]">Tax</span> <span className="text-[#54B948]">Benefits</span>
                </h4>
                <p className={`${NEUTRAL_MUTED}`}>
                  Land donations are tax-deductible at fair market value. We recommend consulting
                  with your tax advisor to understand the full benefits of your generous donation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:704-642-1222" className={`${BTN_BASE} text-white`} style={{ backgroundColor: '#005596' }}>
                  <Phone className="w-5 h-5 mr-2" />
                  Call (704) 642-1222
                </a>
                <a href="/contact" className={`${BTN_BASE} text-white`} style={{ backgroundColor: '#54B948' }}>
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        );

      case 'professional':
        return (
          <div className="space-y-6">
            <div className={`${CARD_BASE} p-8`}>
              <h3 className="text-2xl font-extrabold mb-4">
                <span className="text-[#005596]">Professional</span> <span className="text-[#54B948]">Services</span>
              </h3>
              <p className={`${NEUTRAL_MUTED} mb-6`}>
                Share your professional expertise to support our mission. We welcome volunteers
                with specialized skills to help with various aspects of our operations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3">
                    <span className="text-[#005596]">Construction</span> <span className="text-[#54B948]">Services</span>
                  </h4>
                  <ul className={`space-y-2 ${NEUTRAL_MUTED}`}>
                    <li>• Electrical work</li>
                    <li>• Plumbing</li>
                    <li>• HVAC installation</li>
                    <li>• Roofing</li>
                    <li>• Flooring</li>
                    <li>• Painting</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3">
                    <span className="text-[#005596]">Professional</span> <span className="text-[#54B948]">Services</span>
                  </h4>
                  <ul className={`space-y-2 ${NEUTRAL_MUTED}`}>
                    <li>• Legal services</li>
                    <li>• Accounting</li>
                    <li>• Marketing & PR</li>
                    <li>• Photography</li>
                    <li>• Web development</li>
                    <li>• Grant writing</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 mb-6">
                <h4 className="text-lg font-semibold mb-2">
                  <span className="text-[#005596]">Construction</span> <span className="text-[#54B948]">Volunteer Lunch Program</span>
                </h4>
                <p className={`${NEUTRAL_MUTED}`}>
                  Support our construction volunteers by providing lunch on build days. This program
                  helps keep our volunteers energized and shows appreciation for their hard work.
                </p>
              </div>

              <a href="#volunteer" className={`${BTN_BASE} text-white`} style={{ backgroundColor: '#54B948' }}>
                <Users className="w-5 h-5 mr-2" />
                Sign Up to Volunteer
              </a>
            </div>
          </div>
        );

      case 'commodities':
        return (
          <div className="space-y-6">
            <div className={`${CARD_BASE} p-8`}>
              <h3 className="text-2xl font-extrabold mb-4">
                <span className="text-[#005596]">Commodities</span> <span className="text-[#54B948]">& Materials</span>
              </h3>
              <p className={`${NEUTRAL_MUTED} mb-6`}>
                Donate building materials, appliances, and other commodities to support our construction
                projects and ReStore operations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3">
                    <span className="text-[#005596]">Building</span> <span className="text-[#54B948]">Materials</span>
                  </h4>
                  <ul className={`space-y-2 ${NEUTRAL_MUTED}`}>
                    <li>• Lumber and framing materials</li>
                    <li>• Roofing materials</li>
                    <li>• Windows and doors</li>
                    <li>• Flooring materials</li>
                    <li>• Plumbing fixtures</li>
                    <li>• Electrical supplies</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3">
                    <span className="text-[#005596]">Appliances</span> <span className="text-[#54B948]">& More</span>
                  </h4>
                  <ul className={`space-y-2 ${NEUTRAL_MUTED}`}>
                    <li>• Kitchen appliances</li>
                    <li>• Washers and dryers</li>
                    <li>• Furniture</li>
                    <li>• Home décor items</li>
                    <li>• Tools and hardware</li>
                    <li>• Paint and supplies</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 mb-6">
                <h4 className="text-lg font-semibold mb-2">
                  <span className="text-[#005596]">Contact</span> <span className="text-[#54B948]">for Large Donations</span>
                </h4>
                <p className={`${NEUTRAL_MUTED} mb-3`}>
                  For large commodity donations or construction materials, please contact our Construction Manager:
                </p>
                <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                  <Phone className="w-4 h-4" />
                  <span>Nate Wrights: 704-642-1222 ext. 103</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:704-642-1222" className={`${BTN_BASE} text-white`} style={{ backgroundColor: '#005596' }}>
                  <Phone className="w-5 h-5 mr-2" />
                  Call (704) 642-1222
                </a>
                <a href="/locations" className={`${BTN_BASE} text-white`} style={{ backgroundColor: '#54B948' }}>
                  <Home className="w-5 h-5 mr-2" />
                  Visit ReStore
                </a>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // reveal refs
  const headerRef = useReveal<HTMLDivElement>();
  const volunteerRef = useReveal<HTMLDivElement>();
  const oppsRef = useReveal<HTMLDivElement>();
  const formRef = useReveal<HTMLDivElement>();
  const safetyRef = useReveal<HTMLDivElement>();
  const storiesRef = useReveal<HTMLDivElement>();
  const donateHeaderRef = useReveal<HTMLDivElement>();
  const donateNavRef = useReveal<HTMLDivElement>();
  const donateContentRef = useReveal<HTMLDivElement>();
  const shopRef = useReveal<HTMLDivElement>();
  const bottomCTARef = useReveal<HTMLDivElement>();
  const helpRef = useReveal<HTMLDivElement>();

  return (
    <div className={`min-h-screen py-16 ${NEUTRAL_TEXT}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 reveal">
          <h1 className="text-4xl font-extrabold mb-4">
            <span className="text-[#005596]">Get</span> <span className="text-[#54B948]">Involved</span>
          </h1>
          <p className={`text-xl ${NEUTRAL_MUTED} max-w-3xl mx-auto`}>
            Join our community of volunteers and supporters to help us build homes, communities, and hope in Rowan County.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-16" />

        {/* Volunteer Section */}
        <section id="volunteer" className="mb-20">
          <div ref={volunteerRef} className="text-center mb-12 reveal">
            <h2 className="text-3xl font-extrabold mb-4">
              <span className="text-[#005596]">Volunteer</span> <span className="text-[#54B948]">with Us</span>
            </h2>
            <p className={`text-xl ${NEUTRAL_MUTED} max-w-3xl mx-auto`}>
              Join our community of volunteers and help us build homes, communities, and hope in Rowan County.
            </p>
          </div>

          {/* Volunteer Opportunities */}
          <div ref={oppsRef} className="mb-16 reveal">
            <h3 className="text-2xl font-extrabold text-center mb-8">
              <span className="text-[#005596]">Volunteer</span> <span className="text-[#54B948]">Opportunities</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {opportunities.map((opportunity) => {
                const Icon = opportunity.icon;
                return (
                  <div key={opportunity.id} className={`${CARD_BASE} p-6`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.12)]"
                        style={{ background: 'linear-gradient(90deg, #005596 0%, #54B948 100%)' }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold">
                        <span className="text-[#005596]">{opportunity.title.split(' ')[0]}</span>{' '}
                        <span className="text-[#54B948]">{opportunity.title.split(' ').slice(1).join(' ')}</span>
                      </h4>
                    </div>
                    <p className={`${NEUTRAL_MUTED} mb-4`}>{opportunity.description}</p>
                    <div className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                      <p><strong>Requirements:</strong> {opportunity.requirements}</p>
                      <p><strong>Schedule:</strong> {opportunity.schedule}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Volunteer Signup Form */}
          <div ref={formRef} className="mb-16 reveal">
            <div className={`${CARD_BASE} max-w-2xl mx-auto p-8`}>
              <h3 className="text-2xl font-extrabold text-center mb-6">
                <span className="text-[#005596]">Volunteer</span> <span className="text-[#54B948]">Signup</span>
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className={INPUT_BASE} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className={INPUT_BASE} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={INPUT_BASE} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Volunteer Interest</label>
                  <select
                    name="interests"
                    value={selectedOpportunity}
                    onChange={(e) => setSelectedOpportunity(e.target.value)}
                    className={INPUT_BASE}
                  >
                    <option value="">Select an opportunity</option>
                    {opportunities.map((opp) => (
                      <option key={opp.id} value={opp.id}>{opp.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Availability</label>
                  <textarea
                    name="availability"
                    rows={3}
                    value={formData.availability}
                    onChange={handleInputChange}
                    placeholder="Tell us about your availability (days, times, frequency)"
                    className={INPUT_BASE}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Experience & Skills</label>
                  <textarea
                    name="experience"
                    rows={3}
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="Tell us about any relevant experience or skills you have"
                    className={INPUT_BASE}
                  />
                </div>
                <button type="submit" className={`${BTN_BASE} w-full text-white`} style={{ backgroundColor: '#54B948' }}>
                  Submit Volunteer Application
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">Prefer to fill out a paper form?</p>
                <button className={`${NEUTRAL_TEXT} inline-flex items-center hover:translate-x-0.5 transition-transform`}>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF Signup Form
                </button>
              </div>
            </div>
          </div>

          {/* Safety Rules */}
          <div ref={safetyRef} className="mb-16 reveal">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-extrabold text-center mb-8">
                <span className="text-[#005596]">Safety</span> <span className="text-[#54B948]">First</span>
              </h3>
              <div className={`${SECTION_BG_SOFT} border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl`}>
                <h4 className="text-xl font-bold mb-4">
                  <span className="text-[#005596]">Volunteer</span> <span className="text-[#54B948]">Safety Rules</span>
                </h4>
                <ul className="space-y-2">
                  {safetyRules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#54B948' }} />
                      <span className={`${NEUTRAL_MUTED}`}>{rule}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <button className={`${NEUTRAL_TEXT} inline-flex items-center hover:translate-x-0.5 transition-transform`}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Safety Checklist
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div ref={storiesRef} className="reveal">
            <h3 className="text-2xl font-extrabold text-center mb-8">
              <span className="text-[#005596]">Volunteer</span> <span className="text-[#54B948]">Stories</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className={`${CARD_BASE} p-6`}>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className={`${NEUTRAL_MUTED} mb-4 italic`}>&quot;{testimonial.quote}&quot;</p>
                  <div>
                    <p className="font-semibold">
                      <span className="text-[#005596]">{testimonial.name.split(' ')[0]}</span>{' '}
                      <span className="text-[#54B948]">{testimonial.name.split(' ').slice(1).join(' ')}</span>
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-16" />

        {/* Donate Section */}
        <section id="donate" className="mb-16">
          <div ref={donateHeaderRef} className="text-center mb-12 reveal">
            <h2 className="text-3xl font-extrabold mb-4">
              <span className="text-[#005596]">Ways</span> <span className="text-[#54B948]">to Donate</span>
            </h2>
            <p className={`text-xl ${NEUTRAL_MUTED} max-w-3xl mx-auto`}>
              Your generous donations help us build homes, communities, and hope in Rowan County.
              Every contribution makes a difference in a family&apos;s life.
            </p>

            {/* Top Donate CTA */}
            <div className="mt-8">
              <a href="#monetary" className={`${BTN_BASE} text-white`} style={{ backgroundColor: '#54B948' }}>
                <Heart className="w-6 h-6 mr-2" />
                Donate Now
              </a>
            </div>
          </div>

          {/* Donation Type Navigation */}
          <div ref={donateNavRef} className="mb-8 reveal">
            <div className="flex flex-wrap gap-2 justify-center">
              {donationOptions.map((option) => {
                const Icon = option.icon;
                const active = donationType === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setDonationType(option.id)}
                    className={`${BTN_BASE} font-medium ${active ? 'text-white' : `${NEUTRAL_TEXT}`}`}
                    style={{
                      backgroundColor: active ? '#005596' : 'transparent',
                      border: active ? '1px solid #005596' : '1px solid rgba(0,0,0,0.15)'
                    }}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    <span>{option.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div id="monetary" ref={donateContentRef} className="max-w-4xl mx-auto reveal">
            {renderDonationContent()}
          </div>

          {/* eBay Giving Works */}
          <div ref={shopRef} className="mt-16 max-w-4xl mx-auto reveal">
            <div className={`${CARD_BASE} p-8 text-center`}>
              <h3 className="text-2xl font-extrabold mb-4">
                <span className="text-[#005596]">Shop</span> <span className="text-[#54B948]">& Support</span>
              </h3>
              <p className={`${NEUTRAL_MUTED} mb-6`}>
                Support Habitat for Humanity of Rowan County through eBay Giving Works.
                Shop from our eBay store or donate a percentage of your eBay purchases to our cause.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.ebay.com/usr/habitatrowan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${BTN_BASE} text-white`}
                  style={{ backgroundColor: '#005596' }}
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Visit Our eBay Store
                </a>
                <a
                  href="https://charity.ebay.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${BTN_BASE} text-white`}
                  style={{ backgroundColor: '#54B948' }}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  eBay Giving Works
                </a>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-4">
                eBay seller name: <strong>habitatrowan</strong>
              </p>
            </div>
          </div>

          {/* Bottom Donate CTA */}
          <div ref={bottomCTARef} className="mt-12 text-center reveal">
            <a href="#monetary" className={`${BTN_BASE} text-white`} style={{ backgroundColor: '#54B948' }}>
              <Heart className="w-6 h-6 mr-2" />
              Make a Donation
            </a>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-16" />

        {/* Additional Resources */}
        <section className="max-w-4xl mx-auto">
          <div ref={helpRef} className="reveal">
            <div className={`${CARD_BASE} p-8`}>
              <h2 className="text-2xl font-extrabold text-center mb-6">
                <span className="text-[#005596]">Need</span> <span className="text-[#54B948]">Help?</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <Phone className="w-8 h-8 mx-auto mb-3" style={{ color: '#54B948' }} />
                  <h3 className="font-semibold mb-2">Call Us</h3>
                  <p className={`${NEUTRAL_MUTED}`}>704-642-1222</p>
                </div>
                <div>
                  <Mail className="w-8 h-8 mx-auto mb-3" style={{ color: '#54B948' }} />
                  <h3 className="font-semibold mb-2">Email Us</h3>
                  <p className={`${NEUTRAL_MUTED}`}>info@habitatrowan.org</p>
                </div>
                <div>
                  <Download className="w-8 h-8 mx-auto mb-3" style={{ color: '#54B948' }} />
                  <h3 className="font-semibold mb-2">Forms</h3>
                  <p className={`${NEUTRAL_MUTED}`}>Download donation forms</p>
                </div>
              </div>
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

export default GetInvolved;
