import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Database, Globe, Check, ArrowRight, Zap, Settings, ShieldCheck, Megaphone } from 'lucide-react';
import TiltCard from '../components/TiltCard';

const serviceDetails = {
  chatleads: {
    id: 'chatleads',
    title: 'ChatLeads AI',
    subtitle: 'WhatsApp Lead Extraction & Parsing',
    icon: Smartphone,
    color: '#0ea5e9',
    badge: 'Flagship AI Solution',
    summary: 'Turn unorganized group chats and personal WhatsApp messages into structured, qualified sales opportunities. ChatLeads monitors your inbound channels, extracts contact details, and scores lead intent automatically.',
    features: [
      'Automatic Contact Card & vCard parsing',
      'Real-time message streaming via WebSockets',
      'Urgency & Intent categorisation (Hot, Warm, Cold)',
      'Multi-group monitoring (scrapes details from multiple active groups)',
      'Spam filtering and verification algorithms',
      'Automated template response dispatchers'
    ],
    techSpecs: [
      { key: 'Classification Model', val: 'Proprietary Fine-tuned LLM API' },
      { key: 'Message Queue', val: 'Redis Pub/Sub' },
      { key: 'Scraping Protocol', val: 'Headless Listener Sockets' },
      { key: 'Average Scoring Latency', val: '< 650ms per message' },
      { key: 'Integrations Supported', val: 'WhatsApp Business API, Web Webhooks' }
    ],
    useCase: 'A retail brand receiving 1,500 messages daily across 15 WhatsApp groups. ChatLeads AI captures name, numbers, and orders, reducing lead entry time from 8 hours to 0 seconds.'
  },
  crm: {
    id: 'crm',
    title: 'Spike CRM',
    subtitle: 'High-Converting Sales Pipeline & Analytics',
    icon: Database,
    color: '#8b5cf6',
    badge: 'Enterprise Sales Engine',
    summary: 'The dashboard center that keeps your team on track. Monitor agent activities, pipeline progression, expected contract values, and callback metrics. Engineered for fast callbacks and zero dropped leads.',
    features: [
      'Visual Drag-and-Drop Kanban Deal Pipelines',
      'Live Agent Leaderboard with performance metrics',
      'Expected Revenue ARR/MRR forecast calculators',
      'SLA Callbacks tracking (alerts when lead isn\'t contacted in 15m)',
      'Custom fields builder for specialized industry attributes',
      'Daily automated PDF sales performance reports'
    ],
    techSpecs: [
      { key: 'Frontend Chart Engine', val: 'Recharts (Canvas + WebGL)' },
      { key: 'Database Layer', val: 'PostgreSQL with timescaledb' },
      { key: 'Security Protocol', val: 'AES-256 Encryption & Role-Based Access' },
      { key: 'Real-time Feeds', val: 'WebSocket / Server-Sent Events' },
      { key: 'Export Formats', val: 'JSON, CSV, PDF, Excel' }
    ],
    useCase: 'A sales team of 25 agents dealing with high ticket sizes. Spike CRM enforces a 15-minute response SLA, resulting in a 42% uplift in converted customer calls.'
  },
  platform: {
    id: 'platform',
    title: 'Platform Campaigns',
    subtitle: 'Digital Marketing & Traffic Routing',
    icon: Globe,
    color: '#6366f1',
    badge: 'Omnichannel Growth Stack',
    summary: 'Drive targeted, high-intent traffic directly into your WhatsApp and CRM funnels. We manage campaigns across Facebook, Instagram, LinkedIn, and Google Ads, setting up conversational ads that convert instantly.',
    features: [
      'Click-to-WhatsApp Meta campaign setup',
      'LinkedIn Sales Navigator list exports & target syncing',
      'Lookalike audience modeling based on CRM Hot Leads',
      'UTM tracking integrated down to individual agent deals',
      'A/B testing for creative ad copies and conversational flows',
      'Weekly marketing ROI review meetings'
    ],
    techSpecs: [
      { key: 'Ad Networks', val: 'Meta, LinkedIn, Google Search, YouTube' },
      { key: 'Conversion Sync', val: 'Meta Conversions API (CAPI)' },
      { key: 'Tracking Suffixes', val: 'Custom CRM-linked UTM identifiers' },
      { key: 'Attribution Model', val: 'First-Touch WhatsApp attribution' },
      { key: 'Reports Dashboard', val: 'Omnichannel Google Looker integrations' }
    ],
    useCase: 'An educational institution generating student inquiries. We set up Click-to-WhatsApp Facebook ads that route students straight into a ChatLeads extractor, driving a 3x lower Cost Per Acquisition (CPA).'
  },
  ads: {
    id: 'ads',
    title: 'Online Advertisements',
    subtitle: 'Paid Social & PPC Campaign Handling',
    icon: Megaphone,
    color: '#10b981',
    badge: 'Performance Marketing Retainer',
    summary: 'Scale customer acquisition channels. We run, optimize, and scale paid advertisements across Instagram, Facebook (Meta), LinkedIn, and Google Ads. Backed by our Conversions API integrations to eliminate ad attribution leakage.',
    features: [
      'Meta Conversions API (CAPI) backend tracking integration',
      'Click-to-WhatsApp Meta campaign setup and copywriting',
      'Lookalike audience generation modeled from CRM data',
      'Google Search intent keyword bidding strategy handling',
      'Interactive dashboard for ad spend and acquisition cost tracking',
      'Dynamic automated conversion tracking event handlers'
    ],
    techSpecs: [
      { key: 'Campaign Channels', val: 'Meta, Instagram, LinkedIn, Google Search' },
      { key: 'Attribution Protocol', val: 'Server-to-Server Conversions API' },
      { key: 'Average CPA Reduction', val: '28% budget saving' },
      { key: 'Creative Deliverables', val: 'Copywriting, Graphic Ads, Lead Funnels' },
      { key: 'Reports Engine', val: 'Weekly performance metrics syncing' }
    ],
    useCase: 'A D2C retailer spending ₹1.5L/month on Instagram ads. Deploying Spike Conversions API and Click-to-WhatsApp ads resulted in a 38% increase in qualified sales inquiries and a 28% reduction in CPA.'
  }
};

export default function ServicesDetail({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('chatleads');
  const currentService = serviceDetails[activeTab];

  return (
    <motion.div 
      className="page-services-detail container"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '120px 20px 60px' }}
    >
      <div className="section-header">
        <span className="badge badge-primary">Technical Specs</span>
        <h1 className="section-title">
          Explore Our <span className="gradient-text">Core Technologies</span>
        </h1>
        <p className="section-subtitle">
          A deep dive into the systems, specifications, and architecture driving revenue capture for our clients.
        </p>
      </div>

      {/* Tab Selectors */}
      <div className="services-tabs-container">
        {Object.values(serviceDetails).map((service) => {
          const Icon = service.icon;
          const isSelected = activeTab === service.id;
          return (
            <button
              key={service.id}
              onClick={() => setActiveTab(service.id)}
              className={`service-tab-btn ${isSelected ? 'active' : ''}`}
              style={{ '--service-theme': service.color }}
            >
              <Icon size={18} />
              <span>{service.title}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      <div className="services-tab-content-panel glass-panel">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="services-detail-grid"
          >
            {/* Left side: Info overview */}
            <TiltCard style={{ height: '100%' }}>
              <div className="service-info-col" style={{ padding: '32px', background: 'rgba(255, 255, 255, 0.45)', borderRadius: '16px', border: '1px solid rgba(0, 0, 0, 0.03)', height: '100%', display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <div className="service-heading-row">
                  <span className="badge" style={{ backgroundColor: `${currentService.color}15`, color: currentService.color }}>
                    {currentService.badge}
                  </span>
                  <h2 className="service-detail-title">{currentService.title}</h2>
                  <h4 className="service-detail-subtitle">{currentService.subtitle}</h4>
                </div>

                <p className="service-detail-summary-txt">
                  {currentService.summary}
                </p>

                <div className="service-features-list">
                  <h3>Key Capabilities</h3>
                  <ul>
                    {currentService.features.map((feat, idx) => (
                      <li key={idx}>
                        <span className="feat-icon-check" style={{ color: currentService.color }}>
                          <Check size={14} />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="service-use-case-box" style={{ marginTop: 'auto' }}>
                  <div className="use-case-header">
                    <ShieldCheck size={16} />
                    <span>Real-World Application</span>
                  </div>
                  <p className="use-case-text">{currentService.useCase}</p>
                </div>
              </div>
            </TiltCard>

            {/* Right side: Tech specs table */}
            <div className="service-spec-col">
              <TiltCard style={{ height: '100%' }}>
                <div className="specs-card-wrap" style={{ height: '100%', margin: 0 }}>
                  <div className="specs-card-header">
                    <Settings size={18} />
                    <h3>Infrastructure & Specs</h3>
                  </div>
                  <table className="specs-table">
                    <tbody>
                      {currentService.techSpecs.map((spec, idx) => (
                        <tr key={idx}>
                          <td className="spec-label">{spec.key}</td>
                          <td className="spec-val">{spec.val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="specs-cta-box" style={{ marginTop: 'auto' }}>
                    <h4 className="cta-box-title">Interested in integration?</h4>
                    <p className="cta-box-desc">Our engineers setup and proxy the database channels in 48 hours.</p>
                    <button onClick={() => onNavigate('home', 'contact')} className="btn btn-primary cta-box-btn">
                      Book Technical Demo
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </TiltCard>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
