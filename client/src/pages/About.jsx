import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Compass, UserCheck, Flame, Users, Calendar } from 'lucide-react';
import TiltCard from '../components/TiltCard';

const values = [
  {
    icon: Flame,
    title: 'Velocity',
    desc: 'Speed is our primary sales metric. By cutting callback delays down to minutes, we maximize conversation conversions.',
    color: '#ef4444'
  },
  {
    icon: ShieldCheck,
    title: 'Absolute Security',
    desc: 'Customer conversations and phone logs are encrypted and stored inside isolated, compliant database configurations.',
    color: '#10b981'
  },
  {
    icon: UserCheck,
    title: 'Client-First focus',
    desc: 'We integrate directly into your existing flows. Our engineers customize database schemas so your business workflow remains intact.',
    color: '#0ea5e9'
  }
];

const team = [
  {
    name: 'Abhishek',
    role: 'Founder & CEO',
    bio: 'Visionary founder of Spike Marketing Solutions. Drives corporate expansion, strategic marketing partnerships, and aligns CAPI data attribution flows with CRM engines.',
    avatar: '💼',
    phone: '+91 7988831125',
    email: 'garg.abhi999@gmail.com'
  },
  {
    name: 'Lakshay',
    role: 'Senior Developer & Tech Expert',
    bio: 'Lead developer of Spike Marketing Solutions. Designed the real-time WhatsApp scraping listeners, fine-tuned the LLM intent classification models, and built the secure isolated CRM pipeline integration channels.',
    avatar: '💻',
    phone: '+91 8295886832',
    email: 'lakshayb057@gmail.com'
  }
];

const history = [
  {
    year: '2024',
    title: 'The Custom API Agency',
    desc: 'Spike started as a specialized coding studio building custom database connections, webhooks, and automation scripts for local retail businesses.'
  },
  {
    year: '2025',
    title: 'ChatLeads Beta Launch',
    desc: 'Recognizing that over 60% of customer inquiries came from WhatsApp chats, we launched ChatLeads v1 to auto-scrape numbers and intents.'
  },
  {
    year: '2026',
    title: 'Spike CRM & Conversions API',
    desc: 'Consolidated our parser bots, visual pipelines, and agent dashboards into a unified SaaS portal, integrating server-side Conversions API channels for Meta & Google campaigns.'
  }
];

export default function About() {
  return (
    <motion.div 
      className="page-about container"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '120px 20px 60px' }}
    >
      {/* Intro Hero */}
      <div className="section-header">
        <span className="badge badge-primary">Our Story</span>
        <h1 className="section-title">
          Empowering Sales Teams to <span className="gradient-text">Capture Every Deal</span>
        </h1>
        <p className="section-subtitle">
          Spike is built by software developers and sales experts committed to resolving pipeline leakages and maximizing conversion speeds.
        </p>
      </div>

      {/* Core Values */}
      <div className="about-values-section">
        <h2 className="about-sub-title text-center">Our Core Pillars</h2>
        <div className="values-grid">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <TiltCard key={idx} className="value-card glass-panel">
                <div className="val-icon-wrap" style={{ backgroundColor: `${val.color}15`, color: val.color }}>
                  <Icon size={22} />
                </div>
                <h3 className="val-title">{val.title}</h3>
                <p className="val-desc">{val.desc}</p>
              </TiltCard>
            );
          })}
        </div>
      </div>

      {/* Brand Logo Philosophy Segment */}
      <TiltCard style={{ width: '100%', marginTop: '50px' }}>
        <div className="brand-logo-showcase glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '40px', padding: '30px', borderRadius: '16px', margin: 0, background: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.5)', flexWrap: 'wrap', height: '100%' }}>
        <div style={{ flex: '1 1 200px', display: 'flex', justifyContent: 'center' }}>
          <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg-logo">
            <defs>
              <linearGradient id="spikeGrad" x1="20" y1="130" x2="130" y2="20">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* Background circles */}
            <circle cx="75" cy="75" r="65" stroke="rgba(79, 70, 229, 0.08)" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="75" cy="75" r="45" stroke="rgba(79, 70, 229, 0.12)" strokeWidth="1" />
            
            {/* The Spike paths */}
            <path 
              d="M 35 115 L 75 75 L 115 115 Z" 
              fill="rgba(79, 70, 229, 0.05)" 
              stroke="rgba(79, 70, 229, 0.2)"
              strokeWidth="1.5"
            />
            {/* Upward spike arrow */}
            <motion.path 
              d="M 75 125 L 75 35 M 75 35 L 50 60 M 75 35 L 100 60" 
              stroke="url(#spikeGrad)" 
              strokeWidth="6" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              filter="url(#glow)"
              animate={{
                pathLength: [0.1, 1, 1],
                pathOffset: [0, 0, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Pulse circle on the tip */}
            <motion.circle 
              cx="75" 
              cy="35" 
              r="6" 
              fill="#0ea5e9"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.8, 0.2, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </svg>
        </div>
        <div style={{ flex: '2 1 300px' }}>
          <span className="badge badge-primary">Brand Identity</span>
          <h3 style={{ fontSize: '20px', fontWeight: '800', marginTop: '10px', color: 'var(--text-primary)' }}>The Spike Philosophy</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', marginTop: '10px' }}>
            Our name and logo represent the vertical acceleration we bring to client sales curves. The upward-pointing arrow indicates the sudden, sharp, and sustainable growth peak that happens when marketing attribution is aligned with high-velocity conversational lead scraping.
          </p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Attribution accuracy</span>
              <span style={{ fontSize: '14px', fontWeight: '800', color: '#10b981' }}>100% Server Sync</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Callback velocity</span>
              <span style={{ fontSize: '14px', fontWeight: '800', color: '#8b5cf6' }}>&lt; 5 Minutes</span>
            </div>
          </div>
        </div>
      </div>
      </TiltCard>

      {/* Evolution Timeline */}
      <div className="about-timeline-section">
        <h2 className="about-sub-title text-center">Our Journey</h2>
        <div className="timeline-container">
          <div className="timeline-line-track" />
          
          <div className="timeline-list">
            {history.map((hist, idx) => (
              <div key={idx} className="timeline-node-item">
                <div className="timeline-marker">
                  <Calendar size={14} />
                  <span>{hist.year}</span>
                </div>
                <div className="timeline-content-card glass-panel">
                  <h4 className="timeline-node-title">{hist.title}</h4>
                  <p className="timeline-node-desc">{hist.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="about-team-section">
        <div className="team-header text-center">
          <div className="badge badge-primary" style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }}>
            <Users size={12} /> The Brains
          </div>
          <h2 className="about-sub-title" style={{ marginTop: '10px' }}>Meet Our Leadership</h2>
        </div>

        <div className="team-members-grid">
          {team.map((member, idx) => (
            <TiltCard key={idx} className="team-member-card glass-panel">
              <div className="member-avatar-col">
                <div className="member-avatar-box">
                  {member.avatar}
                </div>
              </div>
              <div className="member-info-col">
                <h3 className="member-name">{member.name}</h3>
                <span className="member-role">{member.role}</span>
                <p className="member-bio">{member.bio}</p>
                <div className="member-contact-details" style={{ marginTop: '12px', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '10px', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--text-muted)' }}>
                  {member.phone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: '700' }}>Phone:</span>
                      <a href={`tel:${member.phone.replace(/\s+/g, '')}`} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '800' }}>{member.phone}</a>
                    </div>
                  )}
                  {member.email && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: '700' }}>Email:</span>
                      <a href={`mailto:${member.email}`} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '800' }}>{member.email}</a>
                    </div>
                  )}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
