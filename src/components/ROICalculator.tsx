import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const industries = [
  { id: 'ecommerce', label: 'E-Commerce', multiplier: 0.15 },
  { id: 'healthcare', label: 'Healthcare', multiplier: 0.12 },
  { id: 'finance', label: 'Finance', multiplier: 0.18 },
  { id: 'saas', label: 'SaaS / B2B', multiplier: 0.16 },
  { id: 'logistics', label: 'Logistics', multiplier: 0.14 },
];

export function ROICalculator() {
  const [revenue, setRevenue] = useState(5000000);
  const [intuitionRate, setIntuitionRate] = useState(42);
  const [industryId, setIndustryId] = useState('ecommerce');

  const industry = industries.find(i => i.id === industryId)!;
  const loss = revenue * (intuitionRate / 100) * industry.multiplier;
  
  const isLowRisk = intuitionRate <= 15;

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  const formatRevenue = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
    return formatCurrency(val);
  };

  return (
    <section id="roi" className="py-20 md:py-32 px-4 md:px-8 relative">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 text-center">
          <div className="flex justify-center items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-danger shadow-[0_0_8px_rgba(255,51,102,0.8)] animate-pulse" />
            <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase">The Forensic ROI Calculator</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            The Cost of <span className="text-danger drop-shadow-[0_0_15px_rgba(255,51,102,0.2)]">Guesswork</span>
          </h2>
          <p className="text-text-secondary mt-3 max-w-xl mx-auto text-sm">
            It seems like you might be underestimating how much unstructured data is costing you. Adjust the sliders to see the exact financial bleed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#0A0A0A] rounded-[2rem] p-8 md:p-12 relative overflow-hidden border border-white/5 shadow-[0_10px_50px_rgba(0,0,0,0.5)]"
        >
          <div className="space-y-10 relative z-10">
            
            {/* Industry Selector */}
            <div>
              <label className="text-xs font-mono text-text-muted uppercase tracking-widest block mb-4">Operational Sector</label>
              <div className="flex flex-wrap gap-2">
                {industries.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => setIndustryId(ind.id)}
                    className={`px-3 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-300 border ${
                      industryId === ind.id
                        ? 'bg-danger/10 border-danger/40 text-danger shadow-[0_0_10px_rgba(255,51,102,0.15)]'
                        : 'bg-surface border-white/5 text-text-secondary hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {ind.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 1: Revenue */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-mono text-text-muted uppercase tracking-widest">Annual Revenue / Budget</label>
                <span className="text-lg font-bold font-mono text-accent">{formatRevenue(revenue)}</span>
              </div>
              <input
                type="range"
                min={100000}
                max={10000000}
                step={50000}
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: '#00FFA3' }}
              />
            </div>

            {/* Slider 2: Intuition Rate */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-mono text-text-muted uppercase tracking-widest">Intuition-Based Decisions (%)</label>
                <span className={`text-lg font-bold font-mono ${isLowRisk ? 'text-accent' : 'text-danger'}`}>{intuitionRate}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={intuitionRate}
                onChange={(e) => setIntuitionRate(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: isLowRisk ? '#00FFA3' : '#FF3366' }}
              />
            </div>

            {/* Output Box */}
            <AnimatePresence mode="wait">
              {isLowRisk ? (
                <motion.div
                  key="low-risk"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="mt-12 p-8 rounded-xl bg-[#030303] border border-accent/20 text-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/[0.02] to-transparent pointer-events-none" />
                  <div className="text-[10px] font-mono text-accent uppercase tracking-widest mb-4 font-bold relative z-10">
                    Data Maturity: Elite
                  </div>
                  <div className="text-xl font-bold text-white relative z-10 tracking-tight mb-2">
                    Are you absolutely sure you need my help?
                  </div>
                  <div className="text-xs text-text-secondary font-mono relative z-10 max-w-md mx-auto leading-relaxed">
                    It seems your data architecture is already highly disciplined. We typically only partner with organizations where we can guarantee a massive asymmetric return. If you're just looking for marginal tweaks, we might not be the right fit.
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={`loss-${Math.round(loss)}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="mt-12 p-8 rounded-xl bg-[#030303] border border-danger/20 text-center relative overflow-hidden glow-danger"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-danger/[0.05] to-transparent pointer-events-none" />
                  <div className="text-[10px] font-mono text-danger uppercase tracking-widest mb-2 font-bold relative z-10">
                    Estimated Annual Revenue Leakage
                  </div>
                  <div className="text-4xl md:text-6xl font-bold font-mono text-white relative z-10 tracking-tight">
                    {formatCurrency(loss)}
                  </div>
                  <div className="text-[10px] text-text-muted mt-2 font-mono relative z-10">
                    LOST TO UNSTRUCTURED DATA IN {industry.label.toUpperCase()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA */}
            <div className="flex justify-center pt-2">
              <motion.a
                href="#cta"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-8 py-3 rounded-lg font-bold font-mono tracking-wider uppercase text-sm transition-all duration-300 border ${
                  isLowRisk 
                  ? 'bg-accent/10 text-accent border-accent/20 hover:bg-accent hover:text-black hover:shadow-[0_0_20px_rgba(0,255,163,0.4)]'
                  : 'bg-danger/10 text-danger border-danger/20 hover:bg-danger hover:text-white hover:shadow-[0_0_20px_rgba(255,51,102,0.4)]'
                }`}
              >
                {isLowRisk ? 'Push For The Final 10%' : 'Stop the Bleeding'}
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
