import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const scrollLockY = useRef(0);

  const aboutDropdownItems = [
    { name: 'About Habitat', href: '/about#about-habitat' },
    { name: 'Our Mission',   href: '/about#mission' },
    { name: 'Our Vision',    href: '/about#vision' },
    { name: 'Our President', href: '/about#president' },
    { name: 'Our Staff',     href: '/about#staff' },
    { name: 'History',       href: '/about#history' }
  ];

  const getInvolvedDropdownItems = [
    { name: 'Volunteer',       href: '/get-involved#volunteer' },
    { name: 'Support Us',      href: '/get-involved#support' },
    { name: 'Donate Items',    href: '/get-involved#donate-items' },
    { name: 'Cars for Homes',  href: '/get-involved#cars-for-homes' }
  ];

  const navigation = [
    { name: 'About',       href: '/about',        dropdown: aboutDropdownItems },
    { name: 'Get Involved',href: '/get-involved',  dropdown: getInvolvedDropdownItems },
    { name: 'Own a Home',  href: '/own-home' },
    { name: 'Gallery',     href: '/gallery' },
    { name: 'Location',    href: '/locations' },
    { name: 'Contact',     href: '/contact' }
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDropdownEnter = (name: string) => setActiveDropdown(name);
  const handleDropdownLeave = () => setActiveDropdown(null);

  const isActive = (href: string) => {
    if (href === '/about') return location.pathname === '/about';
    if (href === '/get-involved') {
      return (
        location.pathname === '/get-involved' ||
        location.pathname === '/volunteer' ||
        location.pathname === '/donate'
      );
    }
    return location.pathname === href;
  };

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (isMenuOpen) {
      scrollLockY.current = window.scrollY || window.pageYOffset || 0;
      const body = document.body as HTMLBodyElement;
      body.style.position = 'fixed';
      body.style.top = `-${scrollLockY.current}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
      body.style.overflow = 'hidden';
    } else {
      const body = document.body as HTMLBodyElement;
      const y = Math.abs(parseInt(body.style.top || '0', 10)) || scrollLockY.current;
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overflow = '';
      if (y) window.scrollTo(0, y);
    }
    return () => {
      const body = document.body as HTMLBodyElement;
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const baseLink =
    'nav-no-wrap px-3 py-2 rounded-lg text-sm font-semibold font-body tracking-wide transition-all duration-200 focus-visible:outline-none';
  const idleLink = 'text-secondary';
  const hoverLink = 'hover:text-[#005596] hover:bg-[#005596]/8';
  const activeLink = 'text-[#005596] bg-[#005596]/8';

  return (
    <header
      className={[
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'nav-glass border-b border-transparent'
          : 'bg-primary border-b border-primary',
      ].join(' ')}
    >

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link
            to="/"
            onClick={() => { setIsMenuOpen(false); setActiveDropdown(null); }}
            className="flex items-center shrink-0 transition-opacity"
          >
            <img
              src="/images/rowanlogo_long.webp"
              alt="Habitat for Humanity of Rowan County"
              className="h-32 md:h-32 lg:h-36 xl:h-40 2xl:h-44 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const active = isActive(item.href);

              if (item.dropdown) {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter(item.name)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      to={item.href}
                      className={`${baseLink} ${active ? activeLink : `${idleLink} ${hoverLink}`} flex items-center gap-1`}
                    >
                      {item.name}
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-0' : '-rotate-90'}`}
                      />
                    </Link>
                    <div
                      className={[
                        'absolute top-full left-0 mt-2 w-56 rounded-xl shadow-xl py-2 z-50',
                        'bg-[var(--surface)] border border-[var(--border-primary)]',
                        'transition-all duration-150 ease-out',
                        activeDropdown === item.name
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible -translate-y-2',
                      ].join(' ')}
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          className="block px-4 py-2.5 text-sm font-body font-medium text-secondary hover:text-[#005596] hover:bg-[#005596]/6 transition-colors"
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${baseLink} ${active ? activeLink : `${idleLink} ${hoverLink}`}`}
                >
                  {item.name}
                </Link>
              );
            })}

            <Link
              to="/get-involved#support"
              className="ml-4 bg-brand-gradient text-white px-6 py-2.5 rounded-xl text-sm font-semibold font-body tracking-wide shadow-[0_4px_16px_rgba(0,85,150,0.35)] hover:shadow-[0_6px_24px_rgba(0,85,150,0.45)] hover:-translate-y-px transition-all duration-200"
            >
              Donate
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            className="lg:hidden p-2 rounded-xl text-secondary hover:bg-secondary ml-4"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 top-20 bg-black/0 z-40"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
            <div className="fixed inset-x-0 top-20 bottom-0 z-50 bg-primary border-t border-primary overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
              <div className="py-4">
                {navigation.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <div key={item.name} className="mb-1">
                      <Link
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-4 py-3 text-base font-body font-semibold tracking-wide ${active ? activeLink : `${idleLink} ${hoverLink}`}`}
                      >
                        {item.name}
                      </Link>
                      {item.dropdown && (
                        <div className="ml-6 space-y-0.5">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="block px-4 py-2 text-sm font-body text-tertiary hover:text-[#005596] hover:bg-[#005596]/6 transition-colors"
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                <Link
                  to="/get-involved#support"
                  onClick={() => setIsMenuOpen(false)}
                  className="block mx-4 mt-4 mb-2 bg-brand-gradient text-white px-4 py-3 rounded-xl font-semibold font-body text-center shadow-[0_4px_16px_rgba(0,85,150,0.30)]"
                >
                  Donate
                </Link>
                <div className="h-2" />
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
