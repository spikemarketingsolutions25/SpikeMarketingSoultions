import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, ShieldCheck, Quote, ExternalLink } from 'lucide-react';
import TiltCard from '../components/TiltCard';

const cases = [
  {
    client: 'Nexus Retail',
    industry: 'D2C Fashion & Apparel',
    problem: 'Nexus Retail spent ₹1.5L/month on Instagram ads directing users to click and buy, but browser cookie blockages caused severe lead attribution drops and delayed customer callback logs by 4.5 hours.',
    solution: 'Spike integrated Facebook Conversions API (CAPI) on their Shopify store and ChatLeads AI on WhatsApp. Real-time server attribution corrected Meta ad tracking data, sending hot leads straight to agents in 0 seconds.',
    metrics: [
      { label: 'Monthly Revenue Lift', value: '₹2,40,000' },
      { label: 'Conversion Rate Boost', value: '+38%' },
      { label: 'Cost Per Lead (CPL) Cut', value: '-28%' }
    ],
    quote: 'Spike completely transformed how we handle customer ads. CAPI corrected our attribution, and ChatLeads AI captures our leads instantly, dropping our customer acquisition cost significantly.',
    author: 'Aditya Roy',
    role: 'Founder, Nexus Retail',
    theme: '#0ea5e9'
  },
  {
    client: 'Summit FinTech',
    industry: 'Financial Services & Loans',
    problem: 'Summit FinTech ran expensive Google Search ads for home loans. Inquiries from high-intent search keywords were captured via web forms but got delayed in agent dispatch queues, allowing competitors to capture leads first.',
    solution: 'Spike integrated Google Tag Manager triggers with our real-time smart routing queues. Active distributor groups on WhatsApp were also linked with custom scraper listeners to fast-track distributor notifications.',
    metrics: [
      { label: 'AI Capture Accuracy', value: '99.2%' },
      { label: 'Google Search Ads ROI', value: '5.2x' },
      { label: 'Average Response Time', value: '12 mins' }
    ],
    quote: 'Before Spike, we were wasting half our search ad budgets due to delayed callbacks. Now, hot loan opportunities are scraped and routed to our sales desk in seconds.',
    author: 'Preeti Sen',
    role: 'Director of Operations, Summit FinTech',
    theme: '#8b5cf6'
  },
  {
    client: 'Apex Health',
    industry: 'Healthcare Clinics Network',
    problem: 'Apex Health generated patient inquiries via Facebook local service ads. Booking duplicates, long clinic queues, and un-tracked ad spend leakage resulted in high patient acquisition costs and empty clinic hours.',
    solution: 'Provisioned Spike CRM and server-side pixel routing for Facebook service campaigns. Set up unified scheduler pipelines, automated slot confirmation templates, and active ad budget trackers.',
    metrics: [
      { label: 'Booking Duplications', value: '-90%' },
      { label: 'Ad Spend Optimization', value: '-30%' },
      { label: 'Monthly Appointments', value: '+45%' }
    ],
    quote: 'Spike CRM gave our clinics a clear visual pipeline for all our ad traffic. We no longer waste spend, and our patient scheduling operates like clockwork.',
    author: 'Dr. Amit Verma',
    role: 'Managing Director, Apex Health',
    theme: '#10b981'
  }
];

export default function CaseStudies({ onNavigate }) {
  return (
    <motion.div 
      className="page-case-studies container"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '120px 20px 60px' }}
    >
      <div className="section-header">
        <span className="badge badge-primary">Success Stories</span>
        <h1 className="section-title">
          Proven Results for <span className="gradient-text">Enterprise Brands</span>
        </h1>
        <p className="section-subtitle">
          See how companies across e-commerce, finance, and healthcare optimize their customer acquisition pipelines using Spike.
        </p>
      </div>

      <div className="case-studies-list-wrap">
        {cases.map((cs, idx) => (
          <TiltCard key={idx} className="case-study-card glass-panel" style={{ '--case-theme': cs.theme }}>
            <div className="case-card-grid">
              
              {/* Left Column: Story Details */}
              <div className="case-story-content">
                <div className="case-client-meta">
                  <span className="case-industry-tag" style={{ color: cs.theme, backgroundColor: `${cs.theme}10` }}>
                    {cs.industry}
                  </span>
                  <h2 className="case-client-name">{cs.client}</h2>
                </div>

                <div className="case-description-blocks">
                  <div className="case-desc-item">
                    <h4>The Challenge</h4>
                    <p>{cs.problem}</p>
                  </div>
                  <div className="case-desc-item">
                    <h4>The Solution</h4>
                    <p>{cs.solution}</p>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="case-quote-wrapper">
                  <Quote size={24} className="quote-icon" style={{ color: cs.theme }} />
                  <p className="quote-text">"{cs.quote}"</p>
                  <div className="quote-author">
                    <strong>{cs.author}</strong>
                    <span>{cs.role}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Glowing Metrics */}
              <div className="case-metrics-sidebar">
                <div className="metrics-box-header">
                  <TrendingUp size={16} />
                  <span>Key Outcomes</span>
                </div>

                <div className="metrics-grid-col">
                  {cs.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="metric-score-card">
                      <span className="metric-score-value" style={{ color: cs.theme }}>
                        {metric.value}
                      </span>
                      <span className="metric-score-label">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="case-action-box">
                  <button onClick={() => onNavigate('home', 'contact')} className="btn btn-primary case-action-btn">
                    Achieve Similar Results
                    <Sparkles size={14} />
                  </button>
                </div>
              </div>

            </div>
          </TiltCard>
        ))}
      </div>
    </motion.div>
  );
}
