import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, HelpCircle, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import TiltCard from '../components/TiltCard';

const plans = [
  {
    name: 'Starter',
    desc: 'Perfect for small sales teams tracking basic operations.',
    priceMonthly: 12500,
    priceAnnually: 10000,
    features: [
      'Custom Spike CRM access',
      '1 Shared Sales Pipeline',
      'Up to 1,000 Leads/month limit',
      'Basic Email Callback logs',
      'Standard Email Support',
      'Expected Revenue calculator',
      'Facebook Pixel tracking integration'
    ],
    cta: 'Get Started',
    popular: false,
    color: '#64748b'
  },
  {
    name: 'Growth',
    desc: 'Automate lead extraction and intent analysis.',
    priceMonthly: 35000,
    priceAnnually: 28000,
    features: [
      'All features in Starter Plan',
      'ChatLeads AI (1 active WhatsApp number)',
      'Unlimited CRM Pipelines',
      'Up to 10,000 Leads/month limit',
      'AI Intent Scoring (Hot/Warm/Cold)',
      '15-minute Callback SLA tracking',
      'Priority 24h Email & Chat Support',
      'Meta Conversions API (CAPI) sync'
    ],
    cta: 'Start 7-Day Free Trial',
    popular: true,
    color: '#8b5cf6'
  },
  {
    name: 'Enterprise',
    desc: 'Custom workflows and dedicated database infrastructure.',
    priceMonthly: 85000,
    priceAnnually: 68000,
    features: [
      'All features in Growth Plan',
      'Multi-number WhatsApp AI listening',
      'Custom LLM intent tuning',
      'Dedicated PostgreSQL database',
      'Full API Access & Webhook pushes',
      'Dedicated Slack Account Manager',
      'Custom SLA dashboard metrics',
      'Meta & Google Ads Manager Retainer'
    ],
    cta: 'Contact Enterprise Sales',
    popular: false,
    color: '#1e1b4b'
  }
];

const faqs = [
  {
    q: 'How fast is the onboarding and setup process?',
    a: 'Basic CRM accounts and dashboard setup are done instantly. Integrating the ChatLeads AI WhatsApp listeners onto your numbers takes about 24 to 48 hours for provisioning, webhook mapping, and verification.'
  },
  {
    q: 'Does ChatLeads AI risk blocking my WhatsApp number?',
    a: 'No. Our scraping engine uses custom read-only listeners that mimic standard WhatsApp Web client sessions. It does not send bulk spam messages or trigger high-velocity outbound automation, ensuring 100% account compliance and safety.'
  },
  {
    q: 'Can I upgrade or downgrade my plan at any time?',
    a: 'Yes, you can manage your subscription directly from your settings dashboard. Plan upgrades take effect instantly with pro-rated billing, while downgrades take effect at the end of your current billing cycle.'
  },
  {
    q: 'Are marketing campaigns managed by Spike directly?',
    a: 'Platform Campaign handling (Facebook/Google click-to-WhatsApp ads) is offered as a dedicated monthly agency retainer or included inside custom high-tier Enterprise plans. Contact us for custom scopes.'
  },
  {
    q: 'How does Spike decrease my Cost Per Lead (CPL) for Meta & Instagram Ads?',
    a: 'Traditional browser pixels lose up to 30% of conversion data due to ad-blockers, private browser settings, and cookie deletions. Spike integrates a server-to-server Conversions API (CAPI) that feeds lead status updates directly from our server back to the Meta Ads Manager. This ensures 100% accurate attribution, allowing ad algorithms to optimize budgets and lower CPL by an average of 28%.'
  }
];

export default function Pricing({ onNavigate }) {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'annually'
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <motion.div 
      className="page-pricing container"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '120px 20px 60px' }}
    >
      <div className="section-header">
        <span className="badge badge-primary">Plans & Pricing</span>
        <h1 className="section-title">
          Flexible Pricing for <span className="gradient-text">High-Growth Teams</span>
        </h1>
        <p className="section-subtitle">
          Choose a plan that fits your pipeline scale. Save 20% by subscribing to our annual billing plans.
        </p>

        {/* Toggle Switch */}
        <div className="pricing-toggle-wrap">
          <button 
            className={`toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </button>
          <button 
            className={`toggle-btn ${billingCycle === 'annually' ? 'active' : ''}`}
            onClick={() => setBillingCycle('annually')}
          >
            Annually <span className="toggle-discount">Save 20%</span>
          </button>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="pricing-grid">
        {plans.map((plan, idx) => {
          const price = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceAnnually;
          return (
            <TiltCard 
              key={idx} 
              className={`pricing-card glass-panel ${plan.popular ? 'popular' : ''}`}
              style={{ '--plan-color': plan.color }}
            >
              {plan.popular && <div className="popular-badge">RECOMMENDED</div>}
              <div className="plan-header">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-desc">{plan.desc}</p>
                <div className="plan-price-block">
                  <span className="plan-currency">₹</span>
                  <span className="plan-price">{price.toLocaleString()}</span>
                  <span className="plan-period">/ month</span>
                </div>
                {billingCycle === 'annually' && (
                  <span className="annually-billed-indicator">Billed annually (₹{(price * 12).toLocaleString()}/yr)</span>
                )}
              </div>

              <div className="plan-body">
                <ul className="plan-features-list">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx}>
                      <span className="feature-check"><Check size={14} /></span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="plan-footer">
                <button 
                  onClick={() => onNavigate('home', 'contact')}
                  className={`btn plan-btn ${plan.popular ? 'btn-primary' : 'btn-ghost'}`}
                >
                  {plan.cta}
                </button>
              </div>
            </TiltCard>
          );
        })}
      </div>

      {/* Comparison table */}
      <div className="comparison-table-section">
        <h2 className="comparison-title text-center">Compare Subscription Features</h2>
        <div className="comparison-table-wrap glass-panel">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Starter</th>
                <th>Growth</th>
                <th>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="feat-lbl">Spike CRM Dashboard</td>
                <td>✓</td>
                <td>✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td className="feat-lbl">ChatLeads AI Scraper</td>
                <td>—</td>
                <td>1 Number</td>
                <td>Multi-Number</td>
              </tr>
              <tr>
                <td className="feat-lbl">Monthly Leads Tracked</td>
                <td>1,000</td>
                <td>10,000</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td className="feat-lbl">Custom Sales Pipelines</td>
                <td>1</td>
                <td>Unlimited</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td className="feat-lbl">SLA Callback Monitors</td>
                <td>—</td>
                <td>15 min SLA</td>
                <td>Custom SLAs</td>
              </tr>
              <tr>
                <td className="feat-lbl">Intent Categorisation</td>
                <td>—</td>
                <td>99% AI Intent</td>
                <td>Custom LLM Tune</td>
              </tr>
              <tr>
                <td className="feat-lbl">Database Isolation</td>
                <td>Shared</td>
                <td>Shared</td>
                <td>Isolated PG</td>
              </tr>
              <tr>
                <td className="feat-lbl">Meta Pixel Tracking</td>
                <td>✓</td>
                <td>✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td className="feat-lbl">Meta Conversions API (CAPI)</td>
                <td>—</td>
                <td>✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td className="feat-lbl">Meta/Google Ads Retainer</td>
                <td>—</td>
                <td>—</td>
                <td>✓</td>
              </tr>
              <tr>
                <td className="feat-lbl">Attribution CPA Savings</td>
                <td>—</td>
                <td>~28% Saved</td>
                <td>Full Retainer</td>
              </tr>
              <tr>
                <td className="feat-lbl">API & Webhooks Access</td>
                <td>—</td>
                <td>—</td>
                <td>✓</td>
              </tr>
              <tr>
                <td className="feat-lbl">Dedicated Manager</td>
                <td>—</td>
                <td>—</td>
                <td>Slack & Phone</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQs */}
      <div className="pricing-faq-section">
        <h2 className="faq-section-title text-center">Frequently Asked Questions</h2>
        <div className="faqs-list-wrapper">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="faq-item-row glass-panel">
                <button className="faq-question-btn" onClick={() => toggleFaq(idx)}>
                  <span className="faq-question-text">{faq.q}</span>
                  <span className="faq-icon-toggle">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="faq-answer-container"
                    >
                      <p className="faq-answer-text">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
