import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, TrendingUp, HelpCircle, AlertCircle } from 'lucide-react';

export default function ROICalculator() {
  const [leads, setLeads] = useState(800);
  const [conversionRate, setConversionRate] = useState(2.5);
  const [dealValue, setDealValue] = useState(35000);

  const [includeAds, setIncludeAds] = useState(false);
  const [adSpend, setAdSpend] = useState(50000);
  const [currentCPL, setCurrentCPL] = useState(250);

  // Calculations:
  // Spike CRM + ChatLeads AI WhatsApp Scraping delivers an average 42% uplift in conversion rates
  // by auto-capturing warm contacts in real-time, enforcing SLAs, and automating callbacks.
  const currentConversions = Math.max(1, Math.floor(leads * (conversionRate / 100)));
  const spikeConversionRate = parseFloat((conversionRate * 1.42).toFixed(2));
  const spikeConversions = Math.max(currentConversions + 1, Math.floor(leads * (spikeConversionRate / 100)));
  
  const additionalDeals = spikeConversions - currentConversions;
  const currentRevenue = currentConversions * dealValue;
  const spikeRevenue = spikeConversions * dealValue;
  const additionalRevenue = additionalDeals * dealValue;

  // Spike's Conversions API corrects attribution data to reduce CPL by an average of 28%
  const wastedSpendRecovered = includeAds ? Math.floor(adSpend * 0.28) : 0;
  const totalFinancialBenefit = additionalRevenue + wastedSpendRecovered;

  // Assume platform cost is ₹12,500/month
  const monthlyCost = 12500;
  const roiMultiplier = totalFinancialBenefit > 0 ? (totalFinancialBenefit / monthlyCost).toFixed(1) : 0;

  return (
    <div className="roi-calculator-card glass-panel">
      <div className="roi-grid-container">
        {/* Left Side: Inputs & Sliders */}
        <div className="roi-inputs-pane">
          <div className="roi-header-block">
            <span className="badge badge-primary">ROI Assessment</span>
            <h3 className="roi-panel-title">Growth & Revenue Calculator</h3>
            <p className="roi-panel-desc">
              Estimate the monthly pipeline revenue currently leaking from your workflows, and see how Spike recovers it.
            </p>
          </div>

          <div className="roi-slider-group">
            {/* Slider 1: Monthly Leads */}
            <div className="roi-slider-item">
              <div className="roi-slider-header">
                <label>Monthly Inbound Leads</label>
                <span className="roi-slider-val">{leads.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="5000" 
                step="50"
                value={leads} 
                onChange={(e) => setLeads(parseInt(e.target.value))}
                className="roi-range-slider"
              />
              <div className="roi-slider-labels">
                <span>100</span>
                <span>5,000</span>
              </div>
            </div>

            {/* Slider 2: Conversion Rate */}
            <div className="roi-slider-item">
              <div className="roi-slider-header">
                <label>Current Conversion Rate</label>
                <span className="roi-slider-val">{conversionRate}%</span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="15" 
                step="0.1"
                value={conversionRate} 
                onChange={(e) => setConversionRate(parseFloat(e.target.value))}
                className="roi-range-slider"
              />
              <div className="roi-slider-labels">
                <span>0.5%</span>
                <span>15%</span>
              </div>
            </div>

            {/* Slider 3: Average Deal Value */}
            <div className="roi-slider-item">
              <div className="roi-slider-header">
                <label>Average Ticket / Deal Value</label>
                <span className="roi-slider-val">₹{dealValue.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="5000" 
                max="250000" 
                step="5000"
                value={dealValue} 
                onChange={(e) => setDealValue(parseInt(e.target.value))}
                className="roi-range-slider"
              />
              <div className="roi-slider-labels">
                <span>₹5,000</span>
                <span>₹2,50,000</span>
              </div>
            </div>

            {/* Toggle: Include Ad Spend Analysis */}
            <div className="roi-toggle-container" style={{ marginTop: '20px', padding: '12px', borderRadius: '12px', background: 'rgba(79, 70, 229, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(79, 70, 229, 0.15)' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>Analyze Ad Spend ROI</span>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Include Meta & Google Conversions API (CAPI) metrics</span>
              </div>
              <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '40px', height: '22px' }}>
                <input 
                  type="checkbox" 
                  checked={includeAds}
                  onChange={(e) => setIncludeAds(e.target.checked)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span className="slider round" style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: includeAds ? 'var(--primary)' : '#ccc', transition: '.3s', borderRadius: '34px' }} />
              </label>
            </div>

            {includeAds && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.2 }}
                style={{ marginTop: '15px' }}
              >
                {/* Slider 4: Monthly Ad Spend */}
                <div className="roi-slider-item" style={{ marginBottom: '15px' }}>
                  <div className="roi-slider-header">
                    <label>Monthly Ad Spend</label>
                    <span className="roi-slider-val">₹{adSpend.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10000" 
                    max="1000000" 
                    step="10000"
                    value={adSpend} 
                    onChange={(e) => setAdSpend(parseInt(e.target.value))}
                    className="roi-range-slider"
                  />
                  <div className="roi-slider-labels">
                    <span>₹10,000</span>
                    <span>₹10,00,000</span>
                  </div>
                </div>

                {/* Slider 5: Current CPL */}
                <div className="roi-slider-item">
                  <div className="roi-slider-header">
                    <label>Current Cost Per Lead (CPL)</label>
                    <span className="roi-slider-val">₹{currentCPL}</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="1500" 
                    step="10"
                    value={currentCPL} 
                    onChange={(e) => setCurrentCPL(parseInt(e.target.value))}
                    className="roi-range-slider"
                  />
                  <div className="roi-slider-labels">
                    <span>₹50</span>
                    <span>₹1,500</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Side: Results Display */}
        <div className="roi-results-pane">
          <div className="roi-metric-banner">
            <span className="roi-metric-label">Recoverable Revenue / Month</span>
            <div className="roi-metric-val">
              <IndianRupee size={28} className="roi-rupee-icon" />
              <span>{totalFinancialBenefit.toLocaleString()}</span>
            </div>
            <div className="roi-badge-pill">
              <TrendingUp size={12} />
              <span>+{additionalDeals} Converted Deals {includeAds && '& CAPI Saved'}</span>
            </div>
            {includeAds && (
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '10px', borderTop: '1px dashed rgba(255,255,255,0.2)', paddingTop: '8px', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Pipeline Revenue Lift:</span>
                  <span style={{ fontWeight: '700', color: '#c792ea' }}>+₹{additionalRevenue.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Ad Spend Waste Saved:</span>
                  <span style={{ fontWeight: '700', color: '#10b981' }}>+₹{wastedSpendRecovered.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>

          {/* Visual Bar Comparison Chart */}
          <div className="roi-bar-chart-container">
            <h4 className="roi-chart-title">Estimated Monthly Pipeline Value</h4>
            <div className="roi-bars-wrapper">
              
              {/* Bar 1: Current */}
              <div className="roi-bar-item">
                <div className="roi-bar-label-row">
                  <span>Current Flow</span>
                  <span className="roi-bar-val-txt">₹{currentRevenue.toLocaleString()}</span>
                </div>
                <div className="roi-bar-track">
                  <motion.div 
                    className="roi-bar-fill current"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentRevenue / (spikeRevenue + wastedSpendRecovered)) * 100}%` }}
                    transition={{ type: 'spring', stiffness: 50 }}
                  />
                </div>
              </div>

              {/* Bar 2: Spike */}
              <div className="roi-bar-item">
                <div className="roi-bar-label-row font-bold">
                  <span className="text-indigo">Spike Optimization</span>
                  <span className="roi-bar-val-txt text-indigo">₹{(spikeRevenue + wastedSpendRecovered).toLocaleString()}</span>
                </div>
                <div className="roi-bar-track">
                  <motion.div 
                    className="roi-bar-fill spike"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ type: 'spring', stiffness: 50 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ROI Stats Box */}
          <div className="roi-stats-footer">
            <div className="roi-stat-cell">
              <span className="roi-stat-sub">Conversion Rate Boost</span>
              <span className="roi-stat-main text-emerald">{conversionRate}% → {spikeConversionRate}%</span>
            </div>
            {includeAds && (
              <div className="roi-stat-cell">
                <span className="roi-stat-sub">CPL Optimization</span>
                <span className="roi-stat-main text-cyan">₹{currentCPL} → ₹{Math.round(currentCPL * 0.72)} (-28%)</span>
              </div>
            )}
            <div className="roi-stat-cell">
              <span className="roi-stat-sub">Estimated Monthly ROI</span>
              <span className="roi-stat-main text-indigo">{roiMultiplier}x Return</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
