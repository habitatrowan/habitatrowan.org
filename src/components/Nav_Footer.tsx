import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { theme, setTheme } = useTheme();

  const navigationLinks = [
    { name: 'About', href: '/about' },
    { name: 'Get Involved', href: '/get-involved' },
    { name: 'Own a Home', href: '/own-home' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Locations', href: '/locations' },
    { name: 'Contact', href: '/contact' },
    { name: 'Donate', href: '/get-involved#support-donate' },
  ];

  const donateLinks = [
    { name: 'Volunteer', href: '/get-involved#volunteer' },
    { name: 'Support Us', href: '/get-involved#support' },
    { name: 'Monetary Donations', href: '/get-involved#support-donate' },
    { name: 'Land Donations', href: '/get-involved#support-land' },
    { name: 'Professional Services', href: '/get-involved#support-professional' },
    { name: 'eBay', href: '/get-involved#support-ebay' },
    { name: 'Donate Items', href: '/get-involved#donate-items' },
  ];

  const quickLinks = [
    { name: 'Our Mission', href: '/about#mission' },
    { name: 'Our Vision', href: '/about#vision' },
    { name: 'Our President', href: '/about#president' },
    { name: 'Our Staff', href: '/about#staff' },
    { name: 'Our History', href: '/about#history' },
  ];

  const legalLinks = [
    { name: 'Terms of Service', href: '/tos' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Data Use', href: '/data' },
    { name: 'Security', href: '/security' },
  ];

  const socials = [
    { name: 'Facebook', href: 'https://www.facebook.com/habitatrowannc', icon: Facebook },
    { name: 'Instagram', href: 'https://www.instagram.com/habitatrowan', icon: Instagram },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/habitat-for-humanity-of-rowan-county', icon: Linkedin },
  ];

  const themeOptions = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ] as const;

  return (
    <footer className="text-neutral-900 dark:text-neutral-50 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 items-start text-sm">
          <div className="flex flex-col">
            <Link to="/" className="inline-flex items-center mb-3">
              <img
                src="/images/rowanlogo.png"
                alt="Habitat Rowan Logo"
                className="w-20 h-20 rounded-md shadow-sm object-contain"
              />
            </Link>
            <div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                Connect
              </div>
              <div className="flex gap-2">
                {socials.map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    aria-label={name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 ring-1 ring-neutral-200 dark:ring-neutral-800 text-neutral-700 dark:text-neutral-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <nav>
            <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
              Navigation
            </div>
            <ul className="space-y-1">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="block w-fit font-semibold text-neutral-800 dark:text-neutral-100 hover:translate-x-0.5 transition-transform"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
              Donate
            </div>
            <ul className="space-y-1">
              {donateLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="block w-fit font-semibold text-neutral-800 dark:text-neutral-100 hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
              Quick Links
            </div>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="block w-fit font-semibold text-neutral-800 dark:text-neutral-100 hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
              Legal
            </div>
            <ul className="space-y-1">
              {legalLinks.map((l) => (
                <li key={l.name}>
                  <Link
                    to={l.href}
                    className="block w-fit font-semibold text-neutral-800 dark:text-neutral-100 hover:translate-x-0.5 transition-transform"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              © 2025 Habitat for Humanity of Rowan County, NC
            </p>
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                {themeOptions.map(({ value, icon: Icon, label }) => (
                  <button
                    key={value}
                    onClick={() => setTheme(value as any)}
                    title={label}
                    className={`p-1.5 rounded-md ring-1 ring-neutral-200 dark:ring-neutral-800 ${
                      theme === value ? 'bg-neutral-100 dark:bg-neutral-900' : 'bg-white dark:bg-neutral-950'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
              <a
                href="https://merrittmason.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:underline"
              >
                Designed by Merritt Mason
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
