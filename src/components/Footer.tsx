import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { theme, setTheme } = useTheme();

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Instagram', href: '#', icon: Instagram },
  ];

  const navigationLinks = [
    { name: 'About', href: '/about' },
    { name: 'Get Involved', href: '/get-involved' },
    { name: 'Own a Home', href: '/own-home' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Locations', href: '/locations' },
    { name: 'Contact', href: '/contact' },
    { name: 'Donate', href: '/get-involved#donate' },
  ];

  const themeOptions = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ];

  return (
    <footer className="text-neutral-900 dark:text-neutral-50 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
      {/* Top accent gradient */}
      <div
        className="h-1 w-full"
        style={{ background: 'linear-gradient(90deg, #005596 0%, #54B948 100%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo + Org Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4 group">
              <img
                src="/images/rowanlogo.png"
                alt="Habitat Rowan Logo"
                className="w-24 h-24 rounded-md shadow-sm transition-transform group-hover:-translate-y-0.5 object-contain"
              />
            </Link>

            <p className="text-neutral-600 dark:text-neutral-300 mb-4 max-w-md">
              Seeking to put God&apos;s love into action, Habitat for Humanity brings people together to build homes, communities and hope.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <address className="not-italic">
                <div className="font-bold">Address</div>
                <div className="text-neutral-700 dark:text-neutral-200">
                  1707 S Main St<br />Salisbury, NC 28144
                </div>
              </address>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-neutral-700 dark:text-neutral-300">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-300 hover:translate-x-0.5 transition-transform"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Theme */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-neutral-700 dark:text-neutral-300">
              Connect
            </h3>
            <div className="flex gap-3 mb-6">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all hover:-translate-y-0.5 hover:ring-2"
                  title={name}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{
                      color: name === 'Facebook' ? '#005596' : '#54B948',
                    }}
                  />
                </a>
              ))}
            </div>

            <h4 className="text-sm font-semibold mb-2 text-neutral-700 dark:text-neutral-300">
              Theme
            </h4>
            <div className="flex gap-2">
              {themeOptions.map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  onClick={() => setTheme(value as any)}
                  className={`p-2 rounded-lg ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all hover:-translate-y-0.5 hover:ring-2 ${
                    theme === value
                      ? 'bg-neutral-100 dark:bg-neutral-900'
                      : 'bg-white dark:bg-neutral-950'
                  }`}
                  title={label}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              © 2025 Habitat of Rowan County, NC
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-neutral-600 dark:text-neutral-400 hover:underline">
                Privacy Policy
              </Link>
              <Link to="/tos" className="text-neutral-600 dark:text-neutral-400 hover:underline">
                Terms of Service
              </Link>
              <a
                href="https://merrittmason.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:underline"
              >
                <span>Designed by</span>
                <span className="font-semibold">Merritt Mason</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
