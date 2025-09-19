import React, { useState, useEffect, useRef } from 'react';
import { Calendar, User, ArrowRight, Mail, Search, Filter } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: 'news' | 'event' | 'press-release' | 'volunteer-spotlight';
  featured: boolean;
  image?: string;
}

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
  'w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 ' +
  'text-neutral-900 dark:text-neutral-50 placeholder-neutral-500 focus:ring-2 focus:ring-[#005596] focus:border-transparent';

const SELECT_BASE =
  'px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 ' +
  'text-neutral-900 dark:text-neutral-50 focus:ring-2 focus:ring-[#005596] focus:border-transparent';

const PILL_BASE =
  'px-2 py-1 rounded-full text-xs font-medium border border-neutral-200 dark:border-neutral-700 ' +
  'bg-neutral-100 dark:bg-neutral-800';

// BLUE for news/press, GREEN for events/volunteers. Nothing else.
const categoryTextColor = (category: string) => {
  switch (category) {
    case 'news':
    case 'press-release':
      return 'text-[#005596]';
    case 'event':
    case 'volunteer-spotlight':
      return 'text-[#54B948]';
    default:
      return 'text-neutral-700 dark:text-neutral-300';
  }
};

const News = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [email, setEmail] = useState('');

  // Sample articles - in production, load from JSON or API
  const sampleArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'New Home Dedication Ceremony This Saturday',
      excerpt:
        'Join us as we celebrate another family achieving homeownership through our partnership program.',
      content:
        'We are excited to invite the community to our home dedication ceremony this Saturday at 10:00 AM. The Johnson family will receive the keys to their new home after completing 300 hours of sweat equity and homeownership education.',
      author: 'Jeff Wetmore',
      date: '2025-01-15',
      category: 'event',
      featured: true,
      image:
        'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    },
    {
      id: '2',
      title: 'ReStore Receives Major Appliance Donation',
      excerpt:
        'Local business donates 20 new appliances to support our mission of affordable homeownership.',
      content:
        'Thanks to the generous donation from Appliance World, our ReStore now has a wide selection of new refrigerators, washers, and dryers available at discounted prices.',
      author: 'Mike Thompson',
      date: '2025-01-12',
      category: 'news',
      featured: false,
      image:
        'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    },
    {
      id: '3',
      title: 'Volunteer Appreciation Dinner - February 14th',
      excerpt:
        'Save the date for our annual volunteer appreciation dinner celebrating all our amazing volunteers.',
      content:
        'Mark your calendars for February 14th at 6:00 PM for our annual volunteer appreciation dinner. We will be recognizing volunteers who have contributed significant hours to our mission.',
      author: 'Sarah Johnson',
      date: '2025-01-10',
      category: 'event',
      featured: true,
    },
    {
      id: '4',
      title: 'Habitat Rowan County Receives Community Grant',
      excerpt:
        'Local foundation awards $50,000 grant to support our home building program.',
      content:
        'We are grateful to announce that the Community Foundation of Rowan County has awarded us a $50,000 grant to support our home building initiatives for 2025.',
      author: 'Jeff Wetmore',
      date: '2025-01-08',
      category: 'press-release',
      featured: false,
    },
  ];

  useEffect(() => {
    setArticles(sampleArticles);
    setFilteredArticles(sampleArticles);
  }, []);

  useEffect(() => {
    let filtered = articles;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((a) => a.category === selectedCategory);
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q)
      );
    }
    setFilteredArticles(filtered);
  }, [articles, selectedCategory, searchTerm]);

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  const categories = [
    { value: 'all', label: 'All News' },
    { value: 'news', label: 'News' },
    { value: 'event', label: 'Events' },
    { value: 'press-release', label: 'Press Releases' },
    { value: 'volunteer-spotlight', label: 'Volunteer Spotlight' },
  ];

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const featuredArticles = filteredArticles.filter((a) => a.featured);
  const regularArticles = filteredArticles.filter((a) => !a.featured);

  // reveal refs
  const headerRef = useReveal<HTMLDivElement>();
  const controlsRef = useReveal<HTMLDivElement>();
  const featuredRef = useReveal<HTMLDivElement>();
  const regularRef = useReveal<HTMLDivElement>();
  const newsletterRef = useReveal<HTMLDivElement>();

  return (
    <div className={`min-h-screen py-16 ${NEUTRAL_TEXT}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 reveal">
          <h1 className="text-4xl font-extrabold mb-4">
            <span className="text-[#005596]">News</span>{' '}
            <span className="text-[#54B948]">& Updates</span>
          </h1>
          <p className={`text-xl ${NEUTRAL_MUTED} max-w-3xl mx-auto`}>
            Stay informed about our latest news, upcoming events, and stories of impact in our community.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-8" />

        {/* Search + Filter */}
        <div ref={controlsRef} className="mb-10 flex flex-col md:flex-row gap-4 justify-between items-center reveal">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={INPUT_BASE}
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={SELECT_BASE}
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Featured */}
        {featuredArticles.length > 0 && (
          <section ref={featuredRef} className="mb-12 reveal">
            <h2 className="text-2xl font-extrabold mb-6">
              <span className="text-[#005596]">Featured</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((a) => (
                <article key={a.id} className={`${CARD_BASE} overflow-hidden`}>
                  {a.image && (
                    <img src={a.image} alt={a.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`${PILL_BASE} ${categoryTextColor(a.category)}`}>
                        {a.category.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                      <div className={`flex items-center text-sm ${NEUTRAL_MUTED}`}>
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(a.date)}
                      </div>
                    </div>
                    <h3 className="text-xl font-extrabold mb-3">
                      <span className="text-[#005596]">{a.title.split(' ')[0]}</span>{' '}
                      <span className="text-[#54B948]">{a.title.split(' ').slice(1).join(' ')}</span>
                    </h3>
                    <p className={`${NEUTRAL_MUTED} mb-4`}>{a.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className={`flex items-center text-sm ${NEUTRAL_MUTED}`}>
                        <User className="w-4 h-4 mr-1" />
                        {a.author}
                      </div>
                      <button className={`${NEUTRAL_TEXT} inline-flex items-center hover:translate-x-0.5 transition-transform`}>
                        Read More <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Latest */}
        <section ref={regularRef} className="mb-12 reveal">
          <h2 className="text-2xl font-extrabold mb-6">
            <span className="text-[#005596]">Latest</span> <span className="text-[#54B948]">News</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((a) => (
              <article key={a.id} className={`${CARD_BASE} overflow-hidden`}>
                {a.image && (
                  <img src={a.image} alt={a.title} className="w-full h-32 object-cover" />
                )}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`${PILL_BASE} ${categoryTextColor(a.category)}`}>
                      {a.category.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold mb-2">
                    <span className="text-[#005596]">{a.title.split(' ')[0]}</span>{' '}
                    <span className="text-[#54B948]">{a.title.split(' ').slice(1).join(' ')}</span>
                  </h3>
                  <p className={`${NEUTRAL_MUTED} text-sm mb-3`}>{a.excerpt}</p>
                  <div className={`flex items-center justify-between text-xs ${NEUTRAL_MUTED}`}>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(a.date)}
                    </div>
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {a.author}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section ref={newsletterRef} className="reveal">
          <div
            className="p-8 rounded-xl text-center"
            style={{ background: 'linear-gradient(90deg, #005596 0%, #54B948 100%)' }}
          >
            <h2 className="text-2xl font-extrabold text-white mb-4">Stay Connected</h2>
            <p className="text-lg text-white/90 mb-6">
              Subscribe to our newsletter to receive the latest updates, event announcements, and stories of impact.
            </p>
            <form onSubmit={handleNewsletterSignup} className="max-w-md mx-auto flex gap-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full pl-10 px-4 py-3 rounded-lg text-neutral-900 placeholder-neutral-500 focus:ring-2 focus:ring-white/70 focus:outline-none"
                />
              </div>
              <button type="submit" className={`${BTN_BASE} text-white`} style={{ backgroundColor: '#005596' }}>
                Subscribe
              </button>
            </form>
            <p className="text-sm text-white/80 mt-4">
              We respect your privacy and will never share your email address.
            </p>
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
