import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import OwnHome from './pages/OwnHome';
import Contact from './pages/Contact';
import Locations from './pages/Locations';
import News from './pages/News';
import GetInvolved from './pages/GetInvolved';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ToS from './pages/ToS';
import './styles/theme.css';

/** Scroll to top or to hash on every route change */
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // If the URL has a #hash, scroll to that element smoothly
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    // Otherwise, always reset to the very top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        {/* Ensures every navigation jumps to top (or to hash) */}
        <ScrollToTop />

        <div className="min-h-screen bg-primary text-primary">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              {/* Legacy redirects */}
              <Route path="/volunteer" element={<GetInvolved />} />
              <Route path="/donate" element={<GetInvolved />} />
              <Route path="/own-home" element={<OwnHome />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/news" element={<News />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/tos" element={<ToS />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
