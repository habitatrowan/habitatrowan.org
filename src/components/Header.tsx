import React, { useState } from 'react';
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
    { name: 'Support Us', href: '/get-involved#donate' }
  ];

  const navigation = [
    { name: 'About', href: '/about', dropdown: aboutDropdownItems },
    { name: 'Get Involved', href: '/get-involved', dropdown: getInvolvedDropdownItems },
    { name: 'Own a Home', href: '/own-home' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Locations', href: '/locations' },
    { name: 'Contact', href: '/contact' }
  ];

  const handleDropdownEnter = (name: string) => setActiveDropdown(name);
  const handleDropdownLeave = () => setActiveDropdown(null);

  const isActive = (href: string) => {
    if (href === '/about') return location.pathname === '/about';
    if (href === '/get-involved')
      return (
        location.pathname === '/get-involved' ||
        location.pathname === '/volunteer' ||
        location.pathname === '/donate'
      );
    return location.pathname === href;
  };

  return (
    <header className="bg-primary border-b border-primary shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* LEFT: Logo -> Home */}
          <Link
            to="/"
            className="flex items-center shrink-0 hover:opacity-90 transition-opacity focus:outline-none focus:ring-0"
          >
            <img
              src="/images/rowanlogo_long.png"
              alt="Habitat for Humanity of Rowan County"
              className="h-12 md:h-32 lg:h-36 xl:h-40 2xl:h-44 w-auto object-contain"
            />
          </Link>



          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => {
              const active = isActive(item.href);

              if (item.dropdown) {
                return (
                  <div
                    key={item.name}
                    className="relative dropdown"
                    onMouseEnter={() => handleDropdownEnter(item.name)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      to={item.href}
                      className={`nav-no-wrap flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${active
                          ? 'habitat-blue bg-blue-50 dark:bg-blue-900/20'
                          : 'text-secondary hover:habitat-blue hover:bg-secondary'
                        }`}
                    >
                      {item.name}
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </Link>

                    <div
                      className={`dropdown-menu absolute top-full left-0 mt-1 w-52 bg-primary border border-primary rounded-lg shadow-lg py-2 transition-all duration-150 ease-out ${activeDropdown === item.name
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible -translate-y-1'
                        }`}
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          className="block px-4 py-2 text-sm text-secondary hover:habitat-blue hover:bg-secondary transition-colors"
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
                  className={`nav-no-wrap px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${active
                      ? 'habitat-blue bg-blue-50 dark:bg-blue-900/20'
                      : 'text-secondary hover:habitat-blue hover:bg-secondary'
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}

            {/* Donate Button with gradient */}
            <Link
              to="/get-involved#donate"
              className="bg-gradient-to-r from-[#005596] to-[#54B948] hover:opacity-90 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
            >
              Donate
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-secondary hover:bg-secondary ml-4"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-primary">
            {navigation.map((item) => {
              const active = isActive(item.href);

              return (
                <div key={item.name} className="mb-2">
                  <Link
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 text-base font-medium transition-colors ${active
                        ? 'habitat-blue bg-blue-50 dark:bg-blue-900/20'
                        : 'text-secondary hover:habitat-blue hover:bg-secondary'
                      }`}
                  >
                    {item.name}
                  </Link>

                  {item.dropdown && (
                    <div className="ml-8 space-y-1">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-tertiary hover:habitat-blue hover:bg-secondary transition-colors"
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Mobile Donate Button */}
            <Link
              to="/get-involved#donate"
              onClick={() => setIsMenuOpen(false)}
              className="block mx-4 mt-4 bg-gradient-to-r from-[#005596] to-[#54B948] hover:opacity-90 text-white px-4 py-3 rounded-lg font-semibold transition-colors duration-200 text-center"
            >
              Donate
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
