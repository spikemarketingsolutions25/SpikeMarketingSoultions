import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Cpu, Users, TrendingUp, Sparkles, CheckCircle, Megaphone, Smartphone } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "1. Ad Campaign Placement",
    subtitle: "Meta & Google Ad Sourcing",
    icon: Megaphone,
    color: "#6366f1", // Indigo
    desc: "Spike builds targeted conversational ads across Meta (Facebook & Instagram), LinkedIn, and Google. We deploy Click-to-WhatsApp hooks that prompt leads to start a direct message thread instantly."
  },
  {
    id: 2,
    title: "2. Capture Inbound Leads",
    subtitle: "Real-time WhatsApp Listening",
    icon: MessageSquare,
    color: "#0ea5e9", // Sky Blue
    desc: "ChatLeads AI automatically scrapes incoming WhatsApp inquiries, group discussions, and support queries in real time. It monitors high-velocity chats and registers contact cards instantly."
  },
  {
    id: 3,
    title: "3. AI Intent Scoring",
    subtitle: "Deep-Learning Classification",
    icon: Cpu,
    color: "#8b5cf6", // Violet
    desc: "Our LLM-driven parsing engine analyzes the chat history. It extracts details (Name, Contact, Product interest, Urgency) and labels lead intent: HOT (immediate callback), WARM, or COLD."
  },
  {
    id: 4,
    title: "4. Smart Routing",
    subtitle: "Real-time Agent Distribution",
    icon: Users,
    color: "#06b6d4", // Cyan
    desc: "Spike routes the structured lead profile directly to the best-suited sales agent based on availability, campaign source, or timezone. Notification pushes to agent dashboard instantly."
  },
  {
    id: 5,
    title: "5. CRM Sync & Close",
    subtitle: "Expected Revenue Growth",
    icon: TrendingUp,
    color: "#10b981", // Emerald
    desc: "The agent interacts using automated templates. Every call, note, and deal progression is synced in Spike CRM. Live pipeline updates show immediate closed-won revenue gains."
  }
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="how-it-works-container">
      <div className="section-header">
        <span className="badge badge-primary">Process Flow</span>
        <h2 className="section-title">
          How Spike <span className="gradient-text">Dominates the Pipeline</span>
        </h2>
        <p className="section-subtitle">
          See how our integrated AI engines capture raw campaign data and turn it into structured, high-paying closed deals.
        </p>
      </div>

      <div className="how-grid">
        {/* Left: Step Selector Buttons */}
        <div className="how-steps-pane">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`how-step-btn ${isActive ? 'active' : ''}`}
                style={{ '--step-theme': step.color }}
              >
                <div className="how-step-icon-wrap">
                  <Icon size={20} />
                </div>
                <div className="how-step-text">
                  <span className="how-step-subtitle">{step.subtitle}</span>
                  <h4 className="how-step-title">{step.title}</h4>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activeStepIndicator"
                    className="how-active-indicator"
                    style={{ backgroundColor: step.color }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Live Interactive Diagram & Details */}
        <div className="how-diagram-pane glass-panel">
          <div className="how-diagram-canvas">
            <AnimatePresence mode="wait">
              {activeStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="diagram-view"
                >
                  <div className="ad-sourcing-visual">
                    <div className="instagram-mockup glass-panel">
                      <div className="ig-header">
                        <div className="ig-avatar">S</div>
                        <div className="ig-user-col">
                          <span className="ig-username">spike_marketing</span>
                          <span className="ig-sponsored">Sponsored</span>
                        </div>
                      </div>
                      <div className="ig-image-area">
                        <div className="ig-promo-graphic">
                          <span className="promo-badge">ROI: +38%</span>
                          <h3>Scale Your Sales In 48 Hours</h3>
                          <p>AI WhatsApp Scraping + Custom CRM</p>
                        </div>
                      </div>
                      <div className="ig-footer-cta">
                        <div className="cta-left">
                          <span className="cta-action-title">Send message on WhatsApp</span>
                          <span className="cta-action-desc">Fast, secure conversational setup</span>
                        </div>
                        <button className="cta-whatsapp-btn" onClick={() => setActiveStep(2)}>
                          <span>Chat</span>
                          <MessageSquare size={12} />
                        </button>
                      </div>
                    </div>

                    <div className="visual-connector-horizontal">
                      <motion.div 
                        className="pulse-packet" 
                        animate={{ left: ['0%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      />
                    </div>

                    <div className="spike-collector-node">
                      <div className="node-icon-glow">
                        <Megaphone size={24} className="glow-icon text-indigo" />
                      </div>
                      <span className="node-label">Ad Attribution API</span>
                      <div className="mini-tag">TRACKING</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="diagram-view"
                >
                  <div className="whatsapp-capture-visual">
                    <div className="phone-outline">
                      <div className="phone-screen">
                        <div className="chat-header">
                          <div className="chat-avatar" />
                          <div className="chat-name-col">
                            <span className="chat-name">Customer Group</span>
                            <span className="chat-status">Online</span>
                          </div>
                        </div>
                        <div className="chat-bubbles">
                          <div className="bubble received">
                            <span>Hey, we need a CRM system for 15 sales agents. Can you quote?</span>
                            <span className="bubble-time">10:42 AM</span>
                          </div>
                          <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="bubble received highlight-whatsapp"
                          >
                            <span>Yes, please share pricing on my WhatsApp +91 9823012345</span>
                            <span className="bubble-time">10:43 AM</span>
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    <div className="visual-connector-horizontal">
                      <motion.div 
                        className="pulse-packet" 
                        animate={{ left: ['0%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      />
                    </div>

                    <div className="spike-collector-node">
                      <div className="node-icon-glow">
                        <Sparkles size={24} className="glow-icon" />
                      </div>
                      <span className="node-label">ChatLeads Listener</span>
                      <div className="mini-tag">ACTIVE</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="diagram-view"
                >
                  <div className="ai-scoring-visual">
                    <div className="raw-input-card">
                      <span className="card-label">Incoming Message</span>
                      <p className="card-txt">"...pricing on my WhatsApp +91 9823012345"</p>
                    </div>

                    <div className="ai-processing-chip">
                      <Cpu size={32} className="ai-chip-icon rotate-slow" />
                      <div className="ai-scan-line" />
                      <span>AI parsing...</span>
                    </div>

                    <motion.div 
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="parsed-output-card"
                    >
                      <div className="intent-badge-row">
                        <span className="intent-badge hot">HOT INTENT 🔥</span>
                        <span className="intent-pct">98% Match</span>
                      </div>
                      <div className="parsed-field">
                        <span className="f-label">Phone:</span>
                        <span className="f-val">+91 98230 12345</span>
                      </div>
                      <div className="parsed-field">
                        <span className="f-label">Interest:</span>
                        <span className="f-val">CRM Integration (15 seats)</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="diagram-view"
                >
                  <div className="smart-routing-visual">
                    <div className="routed-lead-node">
                      <div className="hot-flame">🔥</div>
                      <span className="lead-node-lbl">Hot Lead Captured</span>
                    </div>

                    <div className="routing-lines">
                      <svg width="120" height="100" viewBox="0 0 120 100">
                        <path d="M 0 50 Q 60 50 120 10" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                        <path d="M 0 50 Q 60 50 120 50" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                        <path d="M 0 50 Q 60 50 120 90" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                        
                        {/* Animated dash line for active route */}
                        <path d="M 0 50 Q 60 50 120 10" fill="none" stroke="var(--primary)" strokeWidth="3" strokeDasharray="6,6" className="active-dash-route" />
                      </svg>
                    </div>

                    <div className="agents-stack">
                      <div className="agent-pill active-route">
                        <div className="agent-status-dot online" />
                        <span className="agent-name">Vikram (Enterprise Sales)</span>
                        <div className="route-check"><CheckCircle size={12} /></div>
                      </div>
                      <div className="agent-pill muted">
                        <div className="agent-status-dot busy" />
                        <span className="agent-name">Priya (SME Sales)</span>
                      </div>
                      <div className="agent-pill muted">
                        <div className="agent-status-dot online" />
                        <span className="agent-name">Rahul (Support)</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 5 && (
                <motion.div
                  key="step-5"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="diagram-view"
                >
                  <div className="crm-close-visual">
                    <div className="crm-record-update">
                      <div className="crm-record-header">
                        <span className="badge badge-success">Closed-Won</span>
                        <span className="record-date">Just Now</span>
                      </div>
                      <h4 className="record-name">Enterprise CRM Contract</h4>
                      <p className="record-value">+₹85,000 Expected ARR</p>
                    </div>

                    <div className="visual-connector-horizontal success-color">
                      <motion.div 
                        className="pulse-packet success-bg" 
                        animate={{ left: ['0%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      />
                    </div>

                    <div className="crm-chart-grow">
                      <div className="bar-grow-track">
                        <motion.div 
                          className="bar-grow-fill"
                          initial={{ height: "30%" }}
                          animate={{ height: "90%" }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                      <span className="bar-label">Revenue Flow</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Pane: Description */}
          <div className="how-diagram-desc-pane">
            <span className="badge" style={{ backgroundColor: `${steps[activeStep-1].color}15`, color: steps[activeStep-1].color }}>
              Detailed Insights
            </span>
            <p className="how-step-desc-text">
              {steps[activeStep-1].desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
