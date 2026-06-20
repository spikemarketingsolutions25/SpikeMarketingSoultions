import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Database, Smartphone, Globe, 
  Send, Users, CheckCircle, AlertTriangle, ArrowRight, Sparkles, Megaphone, Calendar 
} from 'lucide-react';
import InteractiveSimulator from '../components/InteractiveSimulator';
import ROICalculator from '../components/ROICalculator';
import HowItWorks from '../components/HowItWorks';
import TiltCard from '../components/TiltCard';

function SyntaxFlyWord({ 
  word, 
  idx, 
  startDelay, 
  wordDelay, 
  type = "text", 
  prefix = "", 
  suffix = "", 
  finalColor = "" 
}) {
  const syntaxColors = {
    keyword: "#c792ea",
    string: "#10b981",
    function: "#4f46e5",
    variable: "#06b6d4",
    text: "#475569"
  };

  const flightColor = syntaxColors[type] || syntaxColors.text;
  const delay = startDelay + idx * wordDelay;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (isMobile) {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          marginRight: '0.28em',
          whiteSpace: 'nowrap',
          color: finalColor || flightColor
        }}
      >
        {prefix && (
          <span style={{ fontFamily: 'monospace', color: '#94a3b8', marginRight: '2px', fontSize: '0.75em' }}>
            {prefix}
          </span>
        )}
        <span>{word}</span>
        {suffix && (
          <span style={{ fontFamily: 'monospace', color: '#94a3b8', marginLeft: '2px', fontSize: '0.75em' }}>
            {suffix}
          </span>
        )}
      </span>
    );
  }

  return (
    <motion.span
      initial={{ 
        x: -400, 
        y: 60,
        opacity: 0, 
        scale: 0.45,
        rotate: -25,
        fontFamily: "monospace",
        color: flightColor,
        backgroundColor: "rgba(241, 245, 249, 0.95)",
        borderColor: "rgba(79, 70, 229, 0.25)",
        paddingLeft: "6px",
        paddingRight: "6px",
        paddingTop: "2px",
        paddingBottom: "2px",
        borderRadius: "6px",
        borderStyle: "solid",
        borderWidth: "1px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
        textShadow: "0 0 0px rgba(0,0,0,0)",
        fontSize: "inherit",
        fontWeight: "inherit",
        lineHeight: "inherit"
      }}
      animate={{ 
        x: 0, 
        y: 0, 
        opacity: 1, 
        scale: 1,
        rotate: 0,
        fontFamily: ["monospace", "monospace", "inherit"],
        color: [flightColor, flightColor, "#8b5cf6", "#06b6d4", finalColor || "inherit"],
        backgroundColor: ["rgba(241, 245, 249, 0.95)", "rgba(241, 245, 249, 0.95)", "rgba(241, 245, 249, 0)"],
        borderColor: ["rgba(79, 70, 229, 0.25)", "rgba(79, 70, 229, 0.25)", "rgba(79, 70, 229, 0)"],
        textShadow: [
          "0 0 0px rgba(0,0,0,0)",
          "0 0 10px rgba(139, 92, 246, 0.5)",
          "0 0 4px rgba(6, 182, 212, 0.3)",
          "0 0 0px rgba(0,0,0,0)"
        ],
        paddingLeft: ["6px", "6px", "0px"],
        paddingRight: ["6px", "6px", "0px"],
        paddingTop: ["2px", "2px", "0px"],
        paddingBottom: ["2px", "2px", "0px"],
        borderWidth: ["1px", "1px", "0px"],
        boxShadow: ["0 4px 10px rgba(0, 0, 0, 0.05)", "0 4px 10px rgba(0, 0, 0, 0.05)", "none"]
      }}
      transition={{
        x: { type: 'spring', stiffness: 70, damping: 13, delay: delay },
        y: { type: 'spring', stiffness: 70, damping: 13, delay: delay },
        scale: { type: 'spring', stiffness: 70, damping: 13, delay: delay },
        rotate: { type: 'spring', stiffness: 70, damping: 13, delay: delay },
        opacity: { duration: 0.6, delay: delay },
        color: { delay: delay, duration: 1.2, times: [0, 0.45, 0.7, 0.85, 1], ease: "easeInOut" },
        textShadow: { delay: delay, duration: 1.2, times: [0, 0.45, 0.7, 1], ease: "easeInOut" },
        fontFamily: { delay: delay + 0.75, duration: 0.1 },
        backgroundColor: { delay: delay + 0.75, duration: 0.45 },
        borderColor: { delay: delay + 0.75, duration: 0.45 },
        paddingLeft: { delay: delay + 0.75, duration: 0.35 },
        paddingRight: { delay: delay + 0.75, duration: 0.35 },
        paddingTop: { delay: delay + 0.75, duration: 0.35 },
        paddingBottom: { delay: delay + 0.75, duration: 0.35 },
        borderWidth: { delay: delay + 0.75, duration: 0.35 },
        boxShadow: { delay: delay + 0.75, duration: 0.35 }
      }}
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center',
        marginRight: '0.28em',
        whiteSpace: 'nowrap',
        position: 'relative'
      }}
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ 
          opacity: [0, 0.7, 0.3, 0],
          scale: [0.7, 1.4, 1.15, 1],
        }}
        transition={{
          delay: delay + 0.75,
          duration: 0.5,
          times: [0, 0.35, 0.75, 1]
        }}
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle, ${flightColor}33 0%, ${flightColor}00 80%)`,
          borderRadius: '8px',
          pointerEvents: 'none',
          zIndex: -1
        }}
      />

      {prefix && (
        <motion.span
          initial={{ opacity: 1, width: "auto" }}
          animate={{ opacity: 0, width: 0 }}
          transition={{ delay: delay + 0.75, duration: 0.35 }}
          style={{ 
            fontFamily: 'monospace', 
            color: '#94a3b8', 
            marginRight: '2px', 
            display: 'inline-block',
            overflow: 'hidden',
            fontSize: '0.75em',
            fontWeight: 'normal'
          }}
        >
          {prefix}
        </motion.span>
      )}

      <span>{word}</span>

      {suffix && (
        <motion.span
          initial={{ opacity: 1, width: "auto" }}
          animate={{ opacity: 0, width: 0 }}
          transition={{ delay: delay + 0.75, duration: 0.35 }}
          style={{ 
            fontFamily: 'monospace', 
            color: '#94a3b8', 
            marginLeft: '2px', 
            display: 'inline-block',
            overflow: 'hidden',
            fontSize: '0.75em',
            fontWeight: 'normal'
          }}
        >
          {suffix}
        </motion.span>
      )}
    </motion.span>
  );
}

const titlePart1 = [
  { word: "Accelerate", type: "keyword", prefix: "let ", finalColor: "#1e1b4b" },
  { word: "Growth.", type: "string", prefix: '"', suffix: '"', finalColor: "#1e1b4b" }
];

const titlePart2 = [
  { word: "Dominate", type: "function", suffix: "()", finalColor: "#8b5cf6" },
  { word: "the", type: "text", finalColor: "#1e1b4b" },
  { word: "Pipeline.", type: "variable", prefix: "const ", finalColor: "#06b6d4" }
];

const subtitleText = "Spike Marketing Solutions builds next-generation CRM technology, AI-powered WhatsApp scraping solutions, and custom digital marketing systems to turn raw conversations into revenue.";
const subtitleWords = subtitleText.split(" ");

const getSubtitleWordProps = (word, idx) => {
  if (idx % 7 === 0) return { type: "keyword" };
  if (idx % 7 === 2) return { type: "string" };
  if (idx % 7 === 4) return { type: "variable" };
  if (idx % 7 === 5) return { type: "function" };
  return { type: "text" };
};

export default function Home({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceInterest: 'ChatLeads AI',
    message: '',
    demoDay: 'Mon',
    demoTime: '10:00 AM'
  });
  const [formStatus, setFormStatus] = useState(null);
  const [formMsg, setFormMsg] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setFormStatus('success');
        setFormMsg(data.message);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          serviceInterest: 'ChatLeads AI',
          message: ''
        });
      } else {
        setFormStatus('error');
        setFormMsg(data.error || 'Failed to submit form.');
      }
    } catch (err) {
      setFormStatus('error');
      setFormMsg('Connection issue. Please try again later.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Intro Section */}
      <header className="hero-section">
        <div className="container hero-container">
          <div className="hero-split-layout">
            <div className="hero-logo-side">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotateY: [0, 6, 0],
                  rotateX: [0, -3, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ perspective: 1000 }}
              >
                <img src="/assets/logo.png" alt="Spike Marketing Solutions Logo" className="hero-logo-card-img" />
              </motion.div>
            </div>

            <div className="hero-text-side">
              <motion.div 
                initial={{ opacity: 0, x: -360 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 85, damping: 14, delay: 0.4 }}
                className="hero-badge"
                style={{ display: 'inline-flex', alignItems: 'center' }}
              >
                <Sparkles size={12} style={{ marginRight: '6px' }} /> Live AI Lead Engine Active
              </motion.div>

              <h1 className="hero-title" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 0' }}>
                {titlePart1.map((w, idx) => (
                  <SyntaxFlyWord 
                    key={idx}
                    word={w.word}
                    idx={idx}
                    startDelay={0.55}
                    wordDelay={0.08}
                    type={w.type}
                    prefix={w.prefix}
                    suffix={w.suffix}
                    finalColor={w.finalColor}
                  />
                ))}
                <br style={{ width: '100%' }} />
                <span style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 0' }}>
                  {titlePart2.map((w, idx) => (
                    <SyntaxFlyWord 
                      key={idx}
                      word={w.word}
                      idx={idx}
                      startDelay={0.8}
                      wordDelay={0.08}
                      type={w.type}
                      prefix={w.prefix}
                      suffix={w.suffix}
                      finalColor={w.finalColor}
                    />
                  ))}
                </span>
              </h1>

              <p className="hero-subtitle" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 0' }}>
                {subtitleWords.map((word, idx) => {
                  const props = getSubtitleWordProps(word, idx);
                  return (
                    <SyntaxFlyWord 
                      key={idx}
                      word={word}
                      idx={idx}
                      startDelay={1.1}
                      wordDelay={0.02}
                      type={props.type}
                      finalColor="var(--text-secondary)"
                    />
                  );
                })}
              </p>

              <motion.div 
                initial={{ opacity: 0, x: -360 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 85, damping: 14, delay: 1.7 }}
                className="hero-buttons"
              >
                <button onClick={() => onNavigate('home', 'demo')} className="btn btn-primary hero-btn">
                  Explore Live Sandbox
                  <ArrowRight size={15} />
                </button>
                <button onClick={() => onNavigate('home', 'contact')} className="btn btn-ghost hero-btn">
                  Get Started
                </button>
              </motion.div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 50, delay: 0.4 }}
            className="hero-showcase-3d"
          >
            <TiltCard style={{ width: '100%' }}>
              <div className="showcase-panel glass-panel" style={{ height: '100%', margin: 0 }}>
                <div className="showcase-header">
                  <div className="window-dots">
                    <div className="dot red" />
                    <div className="dot yellow" />
                    <div className="dot green" />
                  </div>
                  <div className="showcase-url">
                    spike-marketing-platform.io
                  </div>
                </div>
                <div className="showcase-body">
                  <div className="showcase-card crm">
                    <div className="showcase-card-title-row">
                      <span className="showcase-tag crm">Spike CRM</span>
                      <Database size={18} />
                    </div>
                    <img src="/assets/crm_showcase.png" alt="CRM Mockup" className="showcase-img" />
                  </div>
                  <div className="showcase-card chatleads">
                    <div className="showcase-card-title-row">
                      <span className="showcase-tag chatleads">ChatLeads AI</span>
                      <Smartphone size={18} />
                    </div>
                    <img src="/assets/whatsapp_showcase.png" alt="WhatsApp Mockup" className="showcase-img" />
                  </div>
                  <div className="showcase-card ads">
                    <div className="showcase-card-title-row">
                      <span className="showcase-tag ads">Spike Ads</span>
                      <Megaphone size={18} />
                    </div>
                    <img src="/assets/ads_showcase.png" alt="Ads Mockup" className="showcase-img" />
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Brand Logo Marquee */}
          <div className="logo-marquee-wrapper">
            <div className="marquee-fade-left" />
            <div className="marquee-container">
              <div className="marquee-track">
                {/* 1st iteration */}
                <div className="marquee-logo"><div className="marquee-logo-dot" />Nexus Retail</div>
                <div className="marquee-logo"><div className="marquee-logo-dot" />Summit FinTech</div>
                <div className="marquee-logo"><div className="marquee-logo-dot" />Apex Health</div>
                <div className="marquee-logo"><div className="marquee-logo-dot" />Zenith Digital</div>
                <div className="marquee-logo"><div className="marquee-logo-dot" />Horizon Energy</div>
                <div className="marquee-logo"><div className="marquee-logo-dot" />Vortex Tech</div>
                <div className="marquee-logo"><div className="marquee-logo-dot" />Stellar Corp</div>
                {/* 2nd iteration for seamless scrolling */}
                <div className="marquee-logo"><div className="marquee-logo-dot" />Nexus Retail</div>
                <div className="marquee-logo"><div className="marquee-logo-dot" />Summit FinTech</div>
                <div className="marquee-logo"><div className="marquee-logo-dot" />Apex Health</div>
                <div className="marquee-logo"><div className="marquee-logo-dot" />Zenith Digital</div>
                <div className="marquee-logo"><div className="marquee-logo-dot" />Horizon Energy</div>
                <div className="marquee-logo"><div className="marquee-logo-dot" />Vortex Tech</div>
                <div className="marquee-logo"><div className="marquee-logo-dot" />Stellar Corp</div>
              </div>
            </div>
            <div className="marquee-fade-right" />
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="services-section">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="container"
        >
          <div className="section-header">
            <span className="badge badge-primary">Company Workings</span>
            <h2 className="section-title">
              Our Integrated <span className="gradient-text">Services Suite</span>
            </h2>
            <p className="section-subtitle">
              We leverage proprietary technologies and customized strategies to handle all aspects of lead sourcing, tracking, and promotions.
            </p>
          </div>

          <div className="services-grid">
            <TiltCard className="glass-card service-card">
              <div>
                <div className="service-icon-box status-indigo">
                  <Database size={22} />
                </div>
                <h3 className="service-card-title">CRM Integration</h3>
                <p className="service-card-desc">
                  Always know where your deals stand. We provide customized, visual pipeline CRMs equipped with agent performance tracking, Expected Revenue analytics, callback logs, and automated email reporting.
                </p>
              </div>
              <button onClick={() => onNavigate('services')} className="service-card-link-btn" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}>
                Learn More <ArrowRight size={14} style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle' }} />
              </button>
            </TiltCard>

            <TiltCard className="glass-card service-card">
              <div>
                <div className="service-icon-box status-emerald">
                  <Smartphone size={22} />
                </div>
                <h3 className="service-card-title">ChatLeads AI</h3>
                <p className="service-card-desc">
                  Scrape, sync, and parse customer conversations in real-time. Our WhatsApp data extraction engine auto-identifies lead profiles, processes documents/cards, and scores lead intent (Hot/Warm/Cold) instantly.
                </p>
              </div>
              <button onClick={() => onNavigate('services')} className="service-card-link-btn" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}>
                Learn More <ArrowRight size={14} style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle' }} />
              </button>
            </TiltCard>

            <TiltCard className="glass-card service-card">
              <div>
                <div className="service-icon-box status-cyan">
                  <Globe size={22} />
                </div>
                <h3 className="service-card-title">Platform Handling</h3>
                <p className="service-card-desc">
                  Grow your digital presence. We direct campaigns across Facebook, LinkedIn, Instagram, and WhatsApp. Our systems target high-intent audiences and route conversions directly back to your Spike CRM.
                </p>
              </div>
              <button onClick={() => onNavigate('home', 'contact')} className="service-card-link-btn" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}>
                Inquire Service <ArrowRight size={14} style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle' }} />
              </button>
            </TiltCard>

            <TiltCard className="glass-card service-card">
              <div>
                <div className="service-icon-box status-indigo">
                  <Megaphone size={22} />
                </div>
                <h3 className="service-card-title">Online Advertisements</h3>
                <p className="service-card-desc">
                  Scale customer acquisition. We run conversions-focused campaigns on Meta, Instagram, LinkedIn, and Google Ads. Our custom Conversions API (CAPI) corrects attribution data, cutting your CPA by 28%.
                </p>
              </div>
              <button onClick={() => onNavigate('services')} className="service-card-link-btn" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}>
                Learn More <ArrowRight size={14} style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle' }} />
              </button>
            </TiltCard>
          </div>
        </motion.div>
      </section>

      {/* ROI Calculator Section */}
      <section id="roi" className="roi-section">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="container"
        >
          <ROICalculator />
        </motion.div>
      </section>

      {/* Sandbox Simulator Section */}
      <section id="demo" className="demo-section">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="container"
        >
          <InteractiveSimulator />
        </motion.div>
      </section>

      {/* How It Works Pipeline Section */}
      <section id="how-it-works" className="how-it-works-section">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="container"
        >
          <HowItWorks />
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="container contact-container"
        >
          <div className="contact-grid">
            <div className="contact-info-block">
              <span className="badge badge-primary">Get in Touch</span>
              <h2 className="contact-info-title">
                Schedule a <span className="gradient-text">Product Demo</span>
              </h2>
              <p className="contact-info-desc">
                Tell us about your sales workflows. Our integration engineers will design a custom dashboard package connecting ChatLeads AI directly into your Spike CRM channels.
              </p>
              
              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="benefit-icon"><CheckCircle size={14} /></div>
                  <span>99% AI Data Accuracy Rate</span>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon"><CheckCircle size={14} /></div>
                  <span>Real-time WebSocket Push Feeds</span>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon"><CheckCircle size={14} /></div>
                  <span>Instant Multi-channel CRM Sync</span>
                </div>
              </div>

              <div className="contact-details-box" style={{ marginTop: '24px', padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.45)', border: '1px solid rgba(0,0,0,0.03)' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '800', display: 'block', marginBottom: '4px' }}>Direct Support Email</span>
                <a href="mailto:Spikemarketingsolutions25@gmail.com" style={{ fontSize: '15px', color: 'var(--primary)', fontWeight: '800', textDecoration: 'none' }}>
                  Spikemarketingsolutions25@gmail.com
                </a>
              </div>
            </div>

            <TiltCard style={{ width: '100%' }}>
              <div className="form-card glass-panel" style={{ height: '100%', margin: 0 }}>
              <form onSubmit={handleFormSubmit}>
                <div className="form-row">
                  <div className="input-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      className="input-field" 
                      placeholder="Rahul Sharma" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="input-group">
                    <label>Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      className="input-field" 
                      placeholder="rahul@nexus.com" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label>Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      className="input-field" 
                      placeholder="+91 99999 99999" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="input-group">
                    <label>Company / Brand</label>
                    <input 
                      type="text" 
                      name="company" 
                      className="input-field" 
                      placeholder="Nexus Retail Ltd" 
                      value={formData.company} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Primary Service Interest</label>
                  <select 
                    name="serviceInterest" 
                    className="input-field select-field" 
                    value={formData.serviceInterest} 
                    onChange={handleInputChange}
                  >
                    <option value="ChatLeads AI">ChatLeads AI (WhatsApp Leads)</option>
                    <option value="Spike CRM">Spike CRM Integration</option>
                    <option value="Social Marketing">Social Promotions & Handling</option>
                    <option value="Online Advertisements">Online Advertisements Retainer</option>
                    <option value="All Services">All-in-One Growth Stack</option>
                  </select>
                </div>

                {/* Demo Time Slot Scheduler */}
                <div className="input-group scheduler-group" style={{ marginTop: '15px', marginBottom: '15px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontSize: '13px' }}>
                    <Calendar size={14} className="text-indigo" />
                    Select a Product Demo Slot (Optional)
                  </label>
                  
                  {/* Days Selector */}
                  <div className="scheduler-days-row" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => {
                      const isSelected = formData.demoDay === day;
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, demoDay: day }))}
                          className={`scheduler-pill-btn ${isSelected ? 'active' : ''}`}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            border: isSelected ? '1px solid var(--primary)' : '1px solid rgba(0,0,0,0.08)',
                            background: isSelected ? 'rgba(79, 70, 229, 0.08)' : 'rgba(255, 255, 255, 0.4)',
                            color: isSelected ? 'var(--primary)' : 'var(--text-secondary)',
                            fontWeight: isSelected ? '700' : '500',
                            fontSize: '11px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>

                  {/* Times Selector */}
                  <div className="scheduler-times-row" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                    {['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'].map((time) => {
                      const isSelected = formData.demoTime === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, demoTime: time }))}
                          className={`scheduler-pill-btn ${isSelected ? 'active' : ''}`}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            border: isSelected ? '1px solid var(--primary)' : '1px solid rgba(0,0,0,0.08)',
                            background: isSelected ? 'rgba(79, 70, 229, 0.08)' : 'rgba(255, 255, 255, 0.4)',
                            color: isSelected ? 'var(--primary)' : 'var(--text-secondary)',
                            fontWeight: isSelected ? '700' : '500',
                            fontSize: '11px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="input-group">
                  <label>Message / Workflows Description</label>
                  <textarea 
                    name="message" 
                    rows="3" 
                    className="input-field textarea-field" 
                    placeholder="Briefly describe your requirements..."
                    value={formData.message} 
                    onChange={handleInputChange} 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="btn btn-primary submit-btn"
                >
                  {formStatus === 'submitting' ? 'Submitting Inquiry...' : 'Submit Request'}
                  <Send size={15} />
                </button>
              </form>

              <AnimatePresence>
                {formStatus && formStatus !== 'submitting' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`form-alert-message ${formStatus === 'success' ? 'success' : 'error'}`}
                  >
                    {formStatus === 'success' ? (
                      <CheckCircle className="alert-icon" size={16} />
                    ) : (
                      <AlertTriangle className="alert-icon" size={16} />
                    )}
                    <span>{formMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
            </TiltCard>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
