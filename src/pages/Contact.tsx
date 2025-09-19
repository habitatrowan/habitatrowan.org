import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Send } from 'lucide-react';

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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      info: '(704) 642-1222',
      description: 'Monday - Friday: 9:00 AM - 5:00 PM'
    },
    {
      icon: Mail,
      title: 'Email',
      info: 'info@habitatrowan.org',
      description: 'We typically respond within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Office Address',
      info: '1707 S Main St, Salisbury, NC 28144',
      description: 'Visit us during office hours'
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: '#', color: 'text-[#005596]' },
    { name: 'Twitter', icon: Twitter, url: '#', color: 'text-[#005596]' },
    { name: 'Instagram', icon: Instagram, url: '#', color: 'text-[#54B948]' },
    { name: 'YouTube', icon: Youtube, url: '#', color: 'text-[#54B948]' }
  ];

  const subjects = [
    'General Inquiry',
    'Volunteer Opportunities',
    'Home Application',
    'Donations',
    'ReStore Information',
    'Partnership Opportunities',
    'Press/Media Inquiry',
    'Other'
  ];

  const headerRef = useReveal<HTMLDivElement>();
  const formRef = useReveal<HTMLDivElement>();
  const infoRef = useReveal<HTMLDivElement>();

  return (
    <div className="min-h-screen py-16 text-neutral-900 dark:text-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 reveal">
          <h1 className="text-4xl font-extrabold mb-4">
            <span className="text-[#005596]">Contact</span>{' '}
            <span className="text-[#54B948]">Us</span>
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            Have questions about our programs, want to volunteer, or need assistance? We're here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div ref={formRef} className="bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-lg reveal">
            <h2 className="text-2xl font-bold mb-6 text-[#005596] dark:text-[#54B948]">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-[#005596] bg-white dark:bg-neutral-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-[#005596] bg-white dark:bg-neutral-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject *</label>
                <select
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-[#005596] bg-white dark:bg-neutral-800"
                >
                  <option value="">Select a subject</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <textarea
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Please provide details about your inquiry..."
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-[#005596] bg-white dark:bg-neutral-800"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#54B948] hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-transform duration-200 hover:-translate-y-0.5"
              >
                <Send className="w-5 h-5 inline-block mr-2" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div ref={infoRef} className="space-y-8 reveal">
            {/* Contact Details */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#005596] dark:text-[#54B948]">
                Get in Touch
              </h2>
              <div className="space-y-6">
                {contactInfo.map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg"
                    >
                      <div className="w-12 h-12 bg-[#005596] rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1 text-[#005596] dark:text-[#54B948]">
                          {contact.title}
                        </h3>
                        <p className="font-medium">{contact.info}</p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {contact.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-[#005596] dark:text-[#54B948]">Follow Us</h3>
              <p className="mb-4 text-neutral-600 dark:text-neutral-300">
                Stay connected with our latest news, events, and stories of impact.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      className={`w-12 h-12 ${social.color} bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200`}
                      aria-label={social.name}
                    >
                      <Icon className="w-6 h-6" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-[#005596] dark:text-[#54B948]">Office Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>By Appointment</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
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
