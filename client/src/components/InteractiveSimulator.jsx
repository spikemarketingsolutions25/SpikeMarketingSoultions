import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, Database, PhoneCall, Star, TrendingUp, Clock,
  MessageSquare, Smartphone, Activity, Sparkles, Shield, Megaphone, Target, Globe
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default function InteractiveSimulator() {
  const [activeTab, setActiveTab] = useState('crm'); // 'crm' or 'chatleads'
  
  // CRM States
  const [crmStats, setCrmStats] = useState(null);
  const [crmLoading, setCrmLoading] = useState(true);

  // ChatLeads States
  const [whatsappStats, setWhatsappStats] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [extractedLeads, setExtractedLeads] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Ads States
  const [adsStats, setAdsStats] = useState(null);
  const [adsLoading, setAdsLoading] = useState(true);

  const chatMessagesRef = useRef(null);

  // Fetch CRM simulation data
  useEffect(() => {
    const fetchCrmData = async () => {
      try {
        const res = await fetch('/api/simulation/crm');
        if (!res.ok) throw new Error('Offline');
        const data = await res.json();
        setCrmStats(data);
      } catch (err) {
        const mockSecs = new Date().getSeconds();
        setCrmStats({
          totalContacts: 1248,
          pendingQueue: Math.max(5, 24 - Math.floor(mockSecs / 5)),
          callsToday: 142 + Math.floor(mockSecs / 2),
          totalLeads: 78 + Math.floor(mockSecs / 4),
          expectedRevenue: 845000 + (mockSecs * 1200),
          convertedLeads: 48,
          convertedRevenue: 412000 + (mockSecs * 900),
          agentCalls: [
            { name: 'Amit Sharma', callsCount: 42 + Math.floor(mockSecs / 6), revenue: 125000, progress: 85 },
            { name: 'Priya Patel', callsCount: 38 + Math.floor(mockSecs / 8), revenue: 98000, progress: 72 },
            { name: 'Raj Malhotra', callsCount: 35 + Math.floor(mockSecs / 10), revenue: 110000, progress: 91 },
            { name: 'Neha Gupta', callsCount: 27 + Math.floor(mockSecs / 7), revenue: 79000, progress: 60 }
          ]
        });
      } finally {
        setCrmLoading(false);
      }
    };

    fetchCrmData();
    const interval = setInterval(fetchCrmData, 4000);
    return () => clearInterval(interval);
  }, []);

  // Fetch ChatLeads WhatsApp stream
  useEffect(() => {
    let mockStreamsCatalog = [];
    const fetchWhatsappData = async () => {
      try {
        const res = await fetch('/api/simulation/whatsapp');
        if (!res.ok) throw new Error('Offline');
        const data = await res.json();
        setWhatsappStats(data);
        mockStreamsCatalog = data.streams;
      } catch (err) {
        const defaultStreams = [
          {
            id: 1,
            sender: "+91 98765 43210",
            message: "Hello, I am interested in your WhatsApp automation service. Please share pricing and details. I run a retail business. - Rahul Mehta",
            extracted: { name: "Rahul Mehta", phone: "+91 98765 43210", company: "Retail Business", intent: "HOT", extractedFields: ["Name", "Phone", "Intent: Retail WhatsApp Automation"] }
          },
          {
            id: 2,
            sender: "+91 87654 32109",
            message: "Hi Spike team, can we schedule a demo of your CRM integration tomorrow at 3 PM? Contact me at preeti.sharma@nexus.com",
            extracted: { name: "Preeti Sharma", phone: "+91 87654 32109", company: "Nexus", intent: "HOT", extractedFields: ["Name", "Phone", "Email", "Meeting Request"] }
          },
          {
            id: 3,
            sender: "+91 76543 21098",
            message: "Need bulk whatsapp sender tool. Send details. Thanks, Rohan.",
            extracted: { name: "Rohan", phone: "+91 76543 21098", company: "Unknown", intent: "WARM", extractedFields: ["Name", "Phone", "Tool Inquiry"] }
          },
          {
            id: 4,
            sender: "+91 99887 76655",
            message: "Do you provide international numbers for promotion? Let me know.",
            extracted: { name: "Visitor", phone: "+91 99887 76655", company: "N/A", intent: "COLD", extractedFields: ["Phone", "International Promos"] }
          }
        ];
        setWhatsappStats({
          activeSessions: 12,
          leadsCapturedCount: 14820,
          accuracyRate: "99.2%",
          extractionSpeed: "380ms"
        });
        mockStreamsCatalog = defaultStreams;
      }
    };

    fetchWhatsappData();
    
    let messageIndex = 0;
    const streamInterval = setInterval(() => {
      if (mockStreamsCatalog.length === 0) return;
      
      const currentItem = mockStreamsCatalog[messageIndex % mockStreamsCatalog.length];
      
      const systemLog = {
        type: 'system',
        text: `Incoming message from ${currentItem.sender}...`
      };
      const userMessage = {
        type: 'incoming',
        sender: currentItem.sender,
        text: currentItem.message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatMessages(prev => [...prev.slice(-6), systemLog, userMessage]);
      setIsProcessing(true);
      
      setTimeout(() => {
        setExtractedLeads(prev => [
          {
            ...currentItem.extracted,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          },
          ...prev.slice(0, 4)
        ]);
        setIsProcessing(false);
      }, 1500);

      messageIndex++;
    }, 6000);

    return () => clearInterval(streamInterval);
  }, []);

  // Fetch Ads simulation data
  useEffect(() => {
    const fetchAdsData = async () => {
      try {
        const res = await fetch('/api/simulation/ads');
        if (!res.ok) throw new Error('Offline');
        const data = await res.json();
        setAdsStats(data);
      } catch (err) {
        const mockSecs = new Date().getSeconds();
        const avgCpl = parseFloat((50.8 - (mockSecs * 0.08)).toFixed(2));
        setAdsStats({
          totalSpent: 124500 + (mockSecs * 45),
          impressions: 845000 + (mockSecs * 220),
          leadsCaptured: 2450 + Math.floor(mockSecs / 2),
          avgCPL: avgCpl,
          avgCTR: parseFloat((3.45 + (mockSecs * 0.005)).toFixed(2)),
          activeCampaigns: [
            { name: 'Meta Click-to-WhatsApp Leads', spent: 54200 + (mockSecs * 20), leads: 1220 + Math.floor(mockSecs / 3), conversionRate: 14.2 },
            { name: 'Instagram Stories Direct Promo', spent: 38400 + (mockSecs * 15), leads: 830 + Math.floor(mockSecs / 4), conversionRate: 11.8 },
            { name: 'Google Search Intent Keywords', spent: 31900 + (mockSecs * 10), leads: 400 + Math.floor(mockSecs / 6), conversionRate: 18.5 }
          ],
          chartData: [
            { name: 'Mon', spend: 12000, cpl: 62 },
            { name: 'Tue', spend: 14500, cpl: 58 },
            { name: 'Wed', spend: 15000, cpl: 54 },
            { name: 'Thu', spend: 17200, cpl: 51 },
            { name: 'Fri', spend: 19000, cpl: 49 },
            { name: 'Sat', spend: 15500, cpl: 47 },
            { name: 'Sun', spend: 18000, cpl: avgCpl }
          ]
        });
      } finally {
        setAdsLoading(false);
      }
    };

    fetchAdsData();
    const interval = setInterval(fetchAdsData, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="simulator-card glass-panel">
      {/* Dynamic top gradient light effect */}
      <div className="simulator-glow-effect" />

      {/* Simulator Header */}
      <div className="simulator-header">
        <div className="simulator-header-text">
          <span className="badge badge-primary">Live Demo Sandbox</span>
          <h2 className="simulator-title">
            Interactive <span className="gradient-text">Product Suite</span>
          </h2>
          <p className="simulator-subtitle">Explore the live features and algorithms powering our tools.</p>
        </div>
        
        <div className="tab-pill-group">
          <button
            onClick={() => setActiveTab('crm')}
            className={`tab-btn ${activeTab === 'crm' ? 'active' : ''}`}
          >
            <Database size={15} />
            Spike CRM
          </button>
          <button
            onClick={() => setActiveTab('chatleads')}
            className={`tab-btn ${activeTab === 'chatleads' ? 'active' : ''}`}
          >
            <Smartphone size={15} />
            ChatLeads AI
          </button>
          <button
            onClick={() => setActiveTab('ads')}
            className={`tab-btn ${activeTab === 'ads' ? 'active' : ''}`}
          >
            <Megaphone size={15} />
            Ads Manager
          </button>
        </div>
      </div>

      {/* TAB CONTENT: SPIKE CRM */}
      <AnimatePresence mode="wait">
        {activeTab === 'crm' && (
          <motion.div
            key="crm-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {crmLoading ? (
              <div className="simulator-loading">
                <div className="loading-spinner" />
              </div>
            ) : (
              <div>
                {/* KPI Metrics Row */}
                <div className="kpi-grid">
                  {[
                    { label: 'Expected Value', value: `₹${crmStats?.expectedRevenue?.toLocaleString()}`, change: '+12.4%', icon: TrendingUp, status: 'indigo' },
                    { label: 'Today Calls', value: crmStats?.callsToday, change: 'Real-time', icon: PhoneCall, status: 'cyan' },
                    { label: 'Converted Revenue', value: `₹${crmStats?.convertedRevenue?.toLocaleString()}`, change: 'Closed Won', icon: Star, status: 'emerald' },
                    { label: 'Pending Contacts', value: crmStats?.pendingQueue, change: 'In Queue', icon: Clock, status: 'amber' }
                  ].map((stat, i) => (
                    <div key={i} className={`kpi-card status-${stat.status}`}>
                      <div className="kpi-card-header">
                        <span className="kpi-label">{stat.label}</span>
                        <div className="kpi-icon"><stat.icon size={15} /></div>
                      </div>
                      <div className="kpi-val">{stat.value}</div>
                      <div className="kpi-change">
                        <Activity size={10} /> {stat.change}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Core Graphs Split */}
                <div className="dashboard-split-layout">
                  {/* Left: Pipeline Chart */}
                  <div className="chart-wrapper-card">
                    <div className="chart-card-header">
                      <div>
                        <h3 className="chart-card-title">Conversion Pipeline</h3>
                        <p className="chart-card-subtitle">Projected vs Converted Lead Value (Real-time)</p>
                      </div>
                      <span className="badge badge-primary">Dynamic Graph</span>
                    </div>

                    <div className="chart-container-wrap">
                      <ResponsiveContainer width="99%" height="100%">
                        <AreaChart
                          data={[
                            { name: '10 AM', expected: (crmStats?.expectedRevenue || 845000) * 0.7, converted: (crmStats?.convertedRevenue || 412000) * 0.7 },
                            { name: '12 PM', expected: (crmStats?.expectedRevenue || 845000) * 0.82, converted: (crmStats?.convertedRevenue || 412000) * 0.8 },
                            { name: '2 PM', expected: (crmStats?.expectedRevenue || 845000) * 0.9, converted: (crmStats?.convertedRevenue || 412000) * 0.88 },
                            { name: '4 PM', expected: crmStats?.expectedRevenue, converted: crmStats?.convertedRevenue }
                          ]}
                          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorExpected" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25}/>
                              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorConverted" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.03)" vertical={false} />
                          <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                          <YAxis tickFormatter={(v) => `₹${v/1000}k`} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                          <Tooltip 
                            contentStyle={{ background: '#0f172a', border: 'none', borderRadius: 12, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                            itemStyle={{ color: '#fff', fontSize: 12 }}
                            labelStyle={{ color: '#94a3b8', fontSize: 11, fontWeight: 700 }}
                          />
                          <Area type="monotone" dataKey="expected" name="Expected" stroke="#4f46e5" strokeWidth={2.5} fillOpacity={1} fill="url(#colorExpected)" />
                          <Area type="monotone" dataKey="converted" name="Converted" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorConverted)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Right: Active Agents */}
                  <div className="agents-leaderboard-card">
                    <div className="agents-leaderboard-header">
                      <div className="agents-ping-container">
                        <div className="ping-dot" />
                        <h3 className="chart-card-title">Agent Performance</h3>
                      </div>
                    </div>
                    
                    <div className="agents-list">
                      {crmStats?.agentCalls?.map((agent, i) => (
                        <div key={i} className="agent-row">
                          <div className="agent-row-info">
                            <span className="agent-name">{agent.name}</span>
                            <span className="agent-stats">{agent.callsCount} calls (₹{agent.revenue / 1000}k)</span>
                          </div>
                          <div className="agent-progress-wrap">
                            <div className="agent-progress-track">
                              <div 
                                className="agent-progress-bar" 
                                style={{ width: `${agent.progress}%` }}
                              />
                            </div>
                            <span className="agent-progress-percent">{agent.progress}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB CONTENT: CHATLEADS AI */}
        {activeTab === 'chatleads' && (
          <motion.div
            key="chatleads-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Stats Pills row */}
            <div className="whatsapp-stats-row">
              {[
                { label: 'Active Sync Sessions', value: whatsappStats?.activeSessions || 12, icon: Smartphone, status: 'indigo' },
                { label: 'Accuracy Rating', value: whatsappStats?.accuracyRate || '99.2%', icon: Shield, status: 'emerald' },
                { label: 'Avg Extraction Speed', value: whatsappStats?.extractionSpeed || '380ms', icon: Activity, status: 'cyan' },
                { label: 'Captured Leads', value: `14,820+`, icon: Sparkles, status: 'purple' }
              ].map((pill, i) => (
                <div key={i} className="whatsapp-stat-pill">
                  <div className="whatsapp-pill-text">
                    <span className="whatsapp-pill-label">{pill.label}</span>
                    <div className="whatsapp-pill-val">{pill.value}</div>
                  </div>
                  <div className={`whatsapp-pill-icon status-${pill.status}`}>
                    <pill.icon size={15} />
                  </div>
                </div>
              ))}
            </div>

            {/* Split layout: WhatsApp Chat & Lead feed */}
            <div className="whatsapp-simulation-layout">
              {/* WhatsApp Live Feed chat box */}
              <div className="chat-window-wrapper">
                <div className="chat-window-header">
                  <div className="chat-window-header-left">
                    <div className="ping-dot" />
                    <span className="chat-window-header-title">WhatsApp Live Feed</span>
                  </div>
                  <span className="chat-window-header-sync">
                    <MessageSquare size={12} /> Syncing
                  </span>
                </div>

                <div ref={chatMessagesRef} className="chat-messages-scroll-area">
                  {chatMessages.length === 0 ? (
                    <div className="chat-placeholder">
                      <Clock size={20} className="spinner-rotate" />
                      <p className="chat-placeholder-text">Awaiting incoming text / image messages...</p>
                    </div>
                  ) : (
                    chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`chat-bubble ${msg.type === 'system' ? 'system' : 'incoming'}`}
                      >
                        {msg.type === 'system' ? (
                          <span>{msg.text}</span>
                        ) : (
                          <>
                            <div className="chat-bubble-meta">
                              <span className="chat-bubble-sender">{msg.sender}</span>
                              <span className="chat-bubble-time">{msg.time}</span>
                            </div>
                            <p className="chat-bubble-text">{msg.text}</p>
                          </>
                        )}
                      </div>
                    ))
                  )}
                  {/* Auto-scroll fixed: scrolling now restricted to message list only */}
                </div>
              </div>

              {/* AI Extracted Leads Column */}
              <div className="leads-column-wrapper">
                <div className="leads-column-header">
                  <h4 className="leads-column-title">
                    <Zap size={13} /> Real-Time Extracted Leads
                  </h4>
                  {isProcessing && (
                    <span className="leads-column-processing">
                      <Sparkles size={11} className="spinner-rotate" /> Processing AI...
                    </span>
                  )}
                </div>

                <div className="leads-scroll-area">
                  <AnimatePresence>
                    {extractedLeads.length === 0 ? (
                      <div className="leads-placeholder">
                        No profiles extracted yet. Waiting for incoming chat.
                      </div>
                    ) : (
                      extractedLeads.map((lead, i) => (
                        <motion.div
                          key={lead.timestamp + i}
                          initial={{ opacity: 0, x: 15, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.25 }}
                          className={`extracted-lead-card status-${lead.intent.toLowerCase()}`}
                        >
                          <div className="lead-card-header">
                            <div>
                              <h5 className="lead-card-name">{lead.name}</h5>
                              <span className="lead-card-phone">{lead.phone}</span>
                            </div>
                            
                            <span className={`lead-intent-badge intent-${lead.intent.toLowerCase()}`}>
                              {lead.intent === 'HOT' ? '🔥 HOT' : lead.intent === 'WARM' ? '⚡ WARM' : '❄️ COLD'}
                            </span>
                          </div>
                          
                          <div className="lead-card-company">
                            <strong>Company:</strong> {lead.company}
                          </div>
                          
                          <div className="lead-card-tags">
                            {lead.extractedFields?.map((f, k) => (
                              <span key={k} className="lead-tag">
                                {f}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB CONTENT: ADS MANAGER */}
        {activeTab === 'ads' && (
          <motion.div
            key="ads-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {adsLoading ? (
              <div className="simulator-loading">
                <div className="loading-spinner" />
              </div>
            ) : (
              <div>
                {/* KPI Metrics Row */}
                <div className="kpi-grid">
                  {[
                    { label: 'Total Ad Spend', value: `₹${adsStats?.totalSpent?.toLocaleString()}`, change: 'Paced Monthly', icon: TrendingUp, status: 'indigo' },
                    { label: 'Campaign Impressions', value: adsStats?.impressions?.toLocaleString(), change: 'Live Reach', icon: Globe, status: 'cyan' },
                    { label: 'Leads Generated', value: adsStats?.leadsCaptured?.toLocaleString(), change: 'From Conversions', icon: Sparkles, status: 'purple' },
                    { label: 'Average Cost / Lead', value: `₹${adsStats?.avgCPL}`, change: `CTR: ${adsStats?.avgCTR}%`, icon: Target, status: 'emerald' }
                  ].map((stat, i) => (
                    <div key={i} className={`kpi-card status-${stat.status}`}>
                      <div className="kpi-card-header">
                        <span className="kpi-label">{stat.label}</span>
                        <div className="kpi-icon"><stat.icon size={15} /></div>
                      </div>
                      <div className="kpi-val">{stat.value}</div>
                      <div className="kpi-change">
                        <Activity size={10} /> {stat.change}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Core Graphs Split */}
                <div className="dashboard-split-layout">
                  {/* Left: Spend vs CPL Chart */}
                  <div className="chart-wrapper-card">
                    <div className="chart-card-header">
                      <div>
                        <h3 className="chart-card-title">Ad Performance Trends</h3>
                        <p className="chart-card-subtitle">Daily Spend vs Cost Per Lead (CPL) Optimization</p>
                      </div>
                      <span className="badge badge-primary">Dynamic Graph</span>
                    </div>

                    <div className="chart-container-wrap">
                      <ResponsiveContainer width="99%" height="100%">
                        <AreaChart
                          data={adsStats?.chartData}
                          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25}/>
                              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorCPL" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.03)" vertical={false} />
                          <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                          <Tooltip 
                            contentStyle={{ background: '#0f172a', border: 'none', borderRadius: 12, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                            itemStyle={{ color: '#fff', fontSize: 12 }}
                            labelStyle={{ color: '#94a3b8', fontSize: 11, fontWeight: 700 }}
                          />
                          <Area type="monotone" dataKey="spend" name="Spend" stroke="#4f46e5" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSpend)" />
                          <Area type="monotone" dataKey="cpl" name="Cost Per Lead (CPL)" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCPL)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Right: Active Ad Campaigns */}
                  <div className="agents-leaderboard-card">
                    <div className="agents-leaderboard-header">
                      <div className="agents-ping-container">
                        <div className="ping-dot" />
                        <h3 className="chart-card-title">Active Social Campaigns</h3>
                      </div>
                    </div>
                    
                    <div className="agents-list">
                      {adsStats?.activeCampaigns?.map((camp, i) => (
                        <div key={i} className="agent-row">
                          <div className="agent-row-info">
                            <span className="agent-name" style={{ fontSize: '11px', fontWeight: 700 }}>{camp.name}</span>
                            <span className="agent-stats">₹{camp.spent.toLocaleString()} spent • {camp.leads} leads</span>
                          </div>
                          <div className="agent-progress-wrap">
                            <div className="agent-progress-track">
                              <div 
                                className="agent-progress-bar" 
                                style={{ width: `${camp.conversionRate * 5}%`, backgroundColor: '#10b981' }}
                              />
                            </div>
                            <span className="agent-progress-percent">{camp.conversionRate}% CVR</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
