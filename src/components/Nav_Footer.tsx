import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const navigationLinks = [
    { name: 'Home',         href: '/' },
    { name: 'About',        href: '/about' },
    { name: 'Get Involved', href: '/get-involved' },
    { name: 'Own a Home',   href: '/own-home' },
    { name: 'Gallery',      href: '/gallery' },
    { name: 'Locations',    href: '/locations' },
    { name: 'Contact',      href: '/contact' },
  ];

  const donateLinks = [
    { name: 'Volunteer',             href: '/get-involved#volunteer' },
    { name: 'Support Us',            href: '/get-involved#support' },
    { name: 'Monetary Donations',    href: '/get-involved#support-donate' },
    { name: 'Land Donations',        href: '/get-involved#support-land' },
    { name: 'Professional Services', href: '/get-involved#support-professional' },
    { name: 'Donate Items',          href: '/get-involved#donate-items' },
    { name: 'Cars for Homes',        href: '/get-involved#cars-for-homes' },
  ];

  const quickLinks = [
    { name: 'Our Mission',   href: '/about#mission' },
    { name: 'Our Vision',    href: '/about#vision' },
    { name: 'Our President', href: '/about#president' },
    { name: 'Our Staff',     href: '/about#staff' },
    { name: 'Our History',   href: '/about#history' },
  ];

  const legalLinks = [
    { name: 'Terms of Service', href: '/tos' },
    { name: 'Privacy Policy',   href: '/privacy' },
    { name: 'Data Use',         href: '/data' },
    { name: 'Security',         href: '/security' },
  ];

  const socials = [
    { name: 'Facebook',  href: 'https://www.facebook.com/habitatrowannc',                                                         icon: Facebook },
    { name: 'Instagram', href: 'https://www.instagram.com/habitatrowan',                                                          icon: Instagram },
    { name: 'LinkedIn',  href: 'https://www.linkedin.com/company/habitat-for-humanity-restore-of-rowan-county-nc/', icon: Linkedin },
  ];

  const colLabel = "text-xs font-body font-semibold tracking-widest uppercase mb-3 text-[#005596]";
  const colLink  = "block w-fit text-sm font-body font-medium text-[var(--text-secondary)] hover:text-[#005596] hover:translate-x-0.5 transition-all duration-150";

  return (
    <footer className="relative" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-primary)" }}>
      {/* Brand gradient accent line at top */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-gradient-r" />

      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 items-start text-sm">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Link to="/" className="inline-flex items-center">
              <img
                src="/images/rowanlogo.png"
                alt="Habitat Rowan Logo"
                className="w-20 h-20 rounded-xl object-contain"
              />
            </Link>

            <p className="text-sm font-body leading-relaxed max-w-[200px]" style={{ color: "var(--text-tertiary)" }}>
              Building homes, communities, and hope in Rowan County.
            </p>

            <div>
              <div className={colLabel}>Connect</div>
              <div className="flex gap-2.5">
                {socials.map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    aria-label={name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl flex items-center justify-center border border-[var(--border-secondary)] text-[var(--text-secondary)] hover:bg-[#005596] hover:border-[#005596] hover:text-white transition-all duration-200"
                    style={{ background: "var(--bg-tertiary)" }}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav>
            <div className={colLabel}>Navigation</div>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className={colLink}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get Involved */}
          <div>
            <div className={colLabel}>Get Involved</div>
            <ul className="space-y-2">
              {donateLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className={colLink}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <div className={colLabel}>Quick Links</div>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className={colLink}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className={colLabel}>Legal</div>
            <ul className="space-y-2">
              {legalLinks.map((l) => (
                <li key={l.name}>
                  <Link to={l.href} className={colLink}>{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar — no divider line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm font-body text-center sm:text-left" style={{ color: "var(--text-tertiary)" }}>
            © 2026 Habitat for Humanity of Rowan County
          </p>
          <a
            href="https://merrittmason.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-body transition-colors text-center hover:text-[#005596]"
            style={{ color: "var(--text-tertiary)" }}
          >
            Designed by Merritt Mason
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
