import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Nav_Header';
import Footer from './components/Nav_Footer';
import Home from './pages/Home';
import About from './pages/About';
import OwnHome from './pages/OwnHome';
import Contact from './pages/Contact';
import Locations from './pages/Location';
import News from './pages/Gallery';
import GetInvolved from './pages/GetInvolved';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ToS from './pages/ToS';
import DataUse from './pages/DataUse';
import Security from './pages/Security';
import './styles/theme.css';

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-primary text-primary">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/volunteer" element={<GetInvolved />} />
              <Route path="/donate" element={<GetInvolved />} />
              <Route path="/own-home" element={<OwnHome />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/gallery" element={<News />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/tos" element={<ToS />} />
              <Route path="/data" element={<DataUse />} />
              <Route path="/security" element={<Security />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
