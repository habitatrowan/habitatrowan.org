import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const aboutDropdownItems = [
    { name: 'About Habitat', href: '/about#about-habitat' },
    { name: 'Our Mission', href: '/about#mission' },
    { name: 'Our Vision', href: '/about#vision' },
    { name: 'Our President', href: '/about#president' },
    { name: 'Our Staff', href: '/about#staff' },
    { name: 'History', href: '/about#history' }
  ];

  const getInvolvedDropdownItems = [
    { name: 'Volunteer', href: '/get-involved#volunteer' },
    { name: 'Support Us', href: '/get-involved#support' },
    { name: 'Donate Items', href: '/get-involved#donate-items' }
  ];

  const navigation = [
    { name: 'About', href: '/about', dropdown: aboutDropdownItems },
    { name: 'Get Involved', href: '/get-involved', dropdown: getInvolvedDropdownItems },
    { name: 'Own a Home', href: '/own-home' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Location', href: '/locations' },
    { name: 'Contact', href: '/contact' }
  ];

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

  const baseLink = 'nav-no-wrap px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-0';
  const idleLink = 'text-secondary';
  const hoverLink = 'hover:text-[#005596] hover:bg-blue-50 dark:hover:bg-blue-900/10';
  const activeLink = 'text-[#005596] bg-blue-50 dark:bg-blue-900/20';

  return (
    <header className="bg-primary border-b border-primary shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link
            to="/"
            onClick={() => {
              setIsMenuOpen(false);
              setActiveDropdown(null);
            }}
            className="flex items-center shrink-0 transition-opacity focus:outline-none focus:ring-0"
          >
            <img
              src="/images/rowanlogo_long.png"
              alt="Habitat for Humanity of Rowan County"
              className="h-32 md:h-32 lg:h-36 xl:h-40 2xl:h-44 w-auto object-contain"
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-6">
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
                      className={`${baseLink} ${active ? activeLink : `${idleLink} ${hoverLink}`} flex items-center`}
                    >
                      {item.name}
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </Link>
                    <div
                      className={`absolute top-full left-0 mt-1 w-56 bg-primary border border-primary rounded-lg shadow-lg py-2 transition-all duration-150 ease-out ${
                        activeDropdown === item.name
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible -translate-y-1'
                      }`}
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          className="block px-4 py-2 text-sm text-secondary hover:text-[#005596] hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors focus:outline-none focus:ring-0"
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
              className="bg-gradient-to-r from-[#005596] to-[#54B948] hover:opacity-90 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-0"
            >
              Donate
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            className="lg:hidden p-2 rounded-lg text-secondary hover:bg-secondary ml-4 focus:outline-none focus:ring-0"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <>
            <div
              className="fixed inset-x-0 top-20 bottom-0 bg-black/0 z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
            <div className="lg:hidden py-4 border-t border-primary relative z-50 bg-primary">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <div key={item.name} className="mb-2">
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-3 text-base font-medium ${active ? activeLink : `${idleLink} ${hoverLink}`} focus:outline-none focus:ring-0`}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <div className="ml-6 space-y-1">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            to={dropdownItem.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-tertiary hover:text-[#005596] hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors focus:outline-none focus:ring-0"
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
                className="block mx-4 mt-4 bg-gradient-to-r from-[#005596] to-[#54B948] hover:opacity-90 text-white px-4 py-3 rounded-lg font-semibold transition-colors duration-200 text-center focus:outline-none focus:ring-0"
              >
                Donate
              </Link>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
