import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ShieldCheck, ArrowUp, Menu, X } from 'lucide-react';
import Home from './pages/Home';
import ServicesDetail from './pages/ServicesDetail';
import Pricing from './pages/Pricing';
import CaseStudies from './pages/CaseStudies';
import About from './pages/About';
import ParticleBackground from './components/ParticleBackground';

export default function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'services', 'pricing', 'cases', 'about'
  const [videoError, setVideoError] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (pageId, anchorId = null) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
    if (anchorId) {
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax translation mapping
  const yParallax1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yParallax2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const rotateParallax = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div className="app-root">
      {/* 3D Digital Particle Video Background or Canvas Fallback */}
      {!videoError ? (
        <div className="background-video-container">
          <video
            className="background-video-loop"
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
            src="https://cdn.pixabay.com/video/2021/04/17/71337-538435133_large.mp4"
          />
        </div>
      ) : (
        <ParticleBackground />
      )}
      <div className="background-video-overlay" />

      {/* Floating Scroll Parallax Elements */}
      <div className="floating-parallax-container">
        <motion.div
          className="parallax-shape parallax-shape-ring"
          style={{ y: yParallax1, rotate: rotateParallax, top: '15%', left: '8%' }}
        />
        <motion.div
          className="parallax-shape parallax-shape-grid"
          style={{ y: yParallax2, bottom: '15%', right: '5%' }}
        />
        <motion.div
          className="parallax-shape parallax-shape-ring"
          style={{ y: yParallax2, top: '55%', right: '12%', scale: 0.7 }}
        />
      </div>

      {/* Scroll Progress Bar */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />

      {/* Floating Glassmorphic Navigation Bar */}
      <nav className={`floating-nav ${navScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo-block" onClick={() => handleNavigation('home')} style={{ cursor: 'pointer' }}>
            <span className="nav-logo-label">SPIKE</span>
          </div>

          <div className="nav-links">
            <button 
              onClick={() => handleNavigation('home')} 
              className={`nav-link-btn ${currentPage === 'home' ? 'active' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('services')} 
              className={`nav-link-btn ${currentPage === 'services' ? 'active' : ''}`}
            >
              Services
            </button>
            <button 
              onClick={() => handleNavigation('pricing')} 
              className={`nav-link-btn ${currentPage === 'pricing' ? 'active' : ''}`}
            >
              Pricing
            </button>
            <button 
              onClick={() => handleNavigation('cases')} 
              className={`nav-link-btn ${currentPage === 'cases' ? 'active' : ''}`}
            >
              Case Studies
            </button>
            <button 
              onClick={() => handleNavigation('about')} 
              className={`nav-link-btn ${currentPage === 'about' ? 'active' : ''}`}
            >
              About Us
            </button>
            <button 
              onClick={() => handleNavigation('home', 'contact')} 
              className="btn btn-primary nav-cta-btn"
            >
              Book Demo
            </button>
          </div>

          {/* Mobile Navigation Elements */}
          <div className="nav-mobile-actions">
            {/* Hamburger Toggle Button */}
            <button 
              className="mobile-nav-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Navigation Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="mobile-nav-overlay"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <div className="mobile-nav-links">
                <button 
                  onClick={() => handleNavigation('home')} 
                  className={`mobile-nav-link ${currentPage === 'home' ? 'active' : ''}`}
                >
                  Home
                </button>
                <button 
                  onClick={() => handleNavigation('services')} 
                  className={`mobile-nav-link ${currentPage === 'services' ? 'active' : ''}`}
                >
                  Services
                </button>
                <button 
                  onClick={() => handleNavigation('pricing')} 
                  className={`mobile-nav-link ${currentPage === 'pricing' ? 'active' : ''}`}
                >
                  Pricing
                </button>
                <button 
                  onClick={() => handleNavigation('cases')} 
                  className={`mobile-nav-link ${currentPage === 'cases' ? 'active' : ''}`}
                >
                  Case Studies
                </button>
                <button 
                  onClick={() => handleNavigation('about')} 
                  className={`mobile-nav-link ${currentPage === 'about' ? 'active' : ''}`}
                >
                  About Us
                </button>
                <button 
                  onClick={() => handleNavigation('home', 'contact')} 
                  className="btn btn-primary mobile-nav-cta"
                >
                  Book Demo
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content Area with Page Transitions */}
      <main className="main-content-layout">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <Home key="home" onNavigate={handleNavigation} />
          )}
          {currentPage === 'services' && (
            <ServicesDetail key="services" onNavigate={handleNavigation} />
          )}
          {currentPage === 'pricing' && (
            <Pricing key="pricing" onNavigate={handleNavigation} />
          )}
          {currentPage === 'cases' && (
            <CaseStudies key="cases" onNavigate={handleNavigation} />
          )}
          {currentPage === 'about' && (
            <About key="about" />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="footer-area">
        <div className="container footer-grid-container">
          
          {/* Column 1: Brand & Socials */}
          <div className="footer-col-brand">
            <div className="footer-logo" onClick={() => handleNavigation('home')} style={{ cursor: 'pointer' }}>
              <img src="/assets/logo.png" alt="Spike Marketing Solutions" className="footer-logo-img" />
            </div>
            <p className="footer-brand-desc">
              Building next-generation sales systems, real-time WhatsApp scraping listeners, and customized CRM databases to capture raw conversations and accelerate growth.
            </p>
            <div style={{ marginTop: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Email: </strong>
              <a href="mailto:Spikemarketingsolutions25@gmail.com" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '700' }}>
                Spikemarketingsolutions25@gmail.com
              </a>
            </div>
            <div className="footer-socials">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className="footer-col-links">
            <h4 className="footer-col-title">Platform</h4>
            <div className="footer-col-links-stack">
              <button className="footer-subpage-link" onClick={() => handleNavigation('home')}>Home</button>
              <button className="footer-subpage-link" onClick={() => handleNavigation('services')}>Services Details</button>
              <button className="footer-subpage-link" onClick={() => handleNavigation('pricing')}>Subscription Plans</button>
              <button className="footer-subpage-link" onClick={() => handleNavigation('cases')}>Case Studies</button>
              <button className="footer-subpage-link" onClick={() => handleNavigation('about')}>Our Story</button>
            </div>
          </div>

          {/* Column 3: Tech Offerings */}
          <div className="footer-col-links">
            <h4 className="footer-col-title">Solutions</h4>
            <div className="footer-col-links-stack">
              <button className="footer-subpage-link" onClick={() => handleNavigation('services')}>ChatLeads AI Scraper</button>
              <button className="footer-subpage-link" onClick={() => handleNavigation('services')}>Spike CRM Pipeline</button>
              <button className="footer-subpage-link" onClick={() => handleNavigation('services')}>Click-to-WhatsApp</button>
              <button className="footer-subpage-link" onClick={() => handleNavigation('home', 'roi')}>ROI Assessment</button>
              <button className="footer-subpage-link" onClick={() => handleNavigation('home', 'demo')}>Live Developer Sandbox</button>
            </div>
          </div>

          {/* Column 4: Compliance & Trust */}
          <div className="footer-col-trust">
            <h4 className="footer-col-title">Trust & Security</h4>
            <div className="trust-badges-stack">
              <div className="trust-badge-item">
                <ShieldCheck size={16} className="trust-icon" />
                <span>GDPR Compliant Data</span>
              </div>
              <div className="trust-badge-item">
                <ShieldCheck size={16} className="trust-icon" />
                <span>ISO 27001 Secure Hosting</span>
              </div>
              <div className="trust-badge-item">
                <ShieldCheck size={16} className="trust-icon" />
                <span>99.9% Uptime Guarantee</span>
              </div>
              <div className="trust-badge-item">
                <ShieldCheck size={16} className="trust-icon" />
                <span>Custom Enterprise SLAs</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="container footer-bottom-flex">
            <p className="footer-copyright-text">
              © 2026 Spike Marketing Solutions Private Limited. All systems fully operational.
            </p>
            <div className="footer-policy-links">
              <span>Privacy Policy</span>
              <span className="dot-divider">•</span>
              <span>Terms of Service</span>
              <span className="dot-divider">•</span>
              <span>Cookie Settings</span>
            </div>
            <button className="back-to-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
