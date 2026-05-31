import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Link, Webhook, Settings, Target, Info } from 'lucide-react';

const industries = [
  { id: 'saas', label: 'SaaS / B2B' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'finance', label: 'Finance' },
];

const industryOutcomes: Record<string, { problem: string; insight: string; action: string; impact: string }> = {
  saas: {
    problem: 'Analyzing 15,000 active subscription logs for silent churn signals.',
    insight: 'Identified 12% of accounts displaying pre-churn behavior patterns 30 days out.',
    action: 'Triggered automated preemptive retention workflows.',
    impact: '+$85,000 MRR Retained',
  },
  ecommerce: {
    problem: 'Processing 2.4M session events with unexplained cart abandonment.',
    insight: 'Discovered hidden correlation between checkout latency and drop-off rate.',
    action: 'Deployed dynamic edge-caching specifically for high-risk checkout nodes.',
    impact: '+$420,000 Recouped / Mo',
  },
  healthcare: {
    problem: 'Parsing 14,000 patient records to predict readmission risks.',
    insight: 'Found 3 specific vital-sign trajectories correlating to 60% of 30-day readmissions.',
    action: 'Integrated ML alert system directly into clinician dashboards.',
    impact: '32% Drop in Readmissions',
  },
  finance: {
    problem: 'Monitoring 500K daily transactions for subtle anomaly patterns.',
    insight: 'Legacy static rules blocked 12% of legitimate high-value transactions.',
    action: 'Replaced rules with bespoke Anomaly Detection ML model tailored to user behavior.',
    impact: '$1.2M Saved + 80% Drop in False Alarms',
  },
};

const sourceNodes = [
  { label: 'Raw Data Lake', icon: Database },
  { label: 'Live Event Streams', icon: Link },
  { label: '3rd Party APIs', icon: Webhook },
];

export function InteractiveSandbox() {
  const [selectedIndustry, setSelectedIndustry] = useState('saas');
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const outcome = industryOutcomes[selectedIndustry];

  const handleExtract = () => {
    if (isRunning) return;
    setIsRunning(true);
    setShowResults(false);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowResults(true);
            setIsRunning(false);
          }, 400);
          return 100;
        }
        return prev + 3;
      });
    }, 40);
  };

  const reset = () => {
    setShowResults(false);
    setProgress(0);
    setIsRunning(false);
  };

  return (
    <section id="sandbox" className="py-24 md:py-32 px-4 md:px-8" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-purple shadow-[0_0_8px_rgba(153,69,255,0.8)] animate-pulse" />
              <span className="text-xs font-mono text-text-secondary tracking-widest uppercase">Business Impact Simulation</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full cursor-help group relative">
              <Info className="w-3.5 h-3.5 text-accent" />
              <span className="text-[9px] font-mono text-accent tracking-widest uppercase font-bold">Synthetic Models</span>
              {/* Tooltip */}
              <div className="absolute top-full left-0 mt-2 w-[240px] bg-[#111] border border-white/10 p-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
                <p className="text-[9px] text-text-secondary font-sans leading-relaxed normal-case tracking-normal text-left">
                  We use synthetic data models to showcase our problem-solving strategies without exposing sensitive proprietary data of our real-world clients.
                </p>
              </div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            The Premium Interactive <span className="text-purple drop-shadow-[0_0_15px_rgba(153,69,255,0.2)]">Sandbox</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl text-sm md:text-base">
            It's easy to claim "AI optimization." But how are you currently translating raw data into hard cash? Select your sector and see how we execute the transition.
          </p>
        </motion.div>

        <div className="bg-[#0A0A0A] rounded-3xl p-6 md:p-10 border border-white/5 relative overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
          {/* Top highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple/20 to-transparent" />

          {/* Industry Selector */}
          <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-white/5">
            <span className="text-xs font-mono text-text-muted uppercase tracking-widest mr-4 self-center">Target Vector:</span>
            {industries.map((ind) => (
              <button
                key={ind.id}
                onClick={() => { setSelectedIndustry(ind.id); setShowResults(false); setProgress(0); }}
                className={`px-4 py-2 rounded-lg text-xs md:text-sm font-mono uppercase tracking-wider transition-all duration-300 border ${
                  selectedIndustry === ind.id
                    ? 'bg-purple/10 border-purple/40 text-purple shadow-[0_0_15px_rgba(153,69,255,0.15)]'
                    : 'bg-transparent border-white/10 text-text-secondary hover:border-white/30 hover:text-white'
                }`}
              >
                {ind.label}
              </button>
            ))}
          </div>

          {/* ── Pipeline Visualization ── */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
            
            {/* 1. Source Nodes */}
            <div className="w-full lg:w-1/3 space-y-3 relative">
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block mb-4">Input: The Chaos</span>
              <div className="text-sm font-medium text-white mb-4 h-10">{outcome.problem}</div>
              {sourceNodes.map((node) => (
                <div key={node.label} className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 ${isRunning ? 'bg-accent/5 border-accent/20' : 'bg-surface border-white/5'}`}>
                  <node.icon className={`w-4 h-4 ${isRunning ? 'text-accent' : 'text-text-muted'}`} />
                  <span className="text-xs font-medium text-text-secondary">{node.label}</span>
                </div>
              ))}
            </div>

            {/* 2. Arrows & Engine */}
            <div className="flex-1 flex items-center justify-center px-4 w-full lg:w-auto my-8 lg:my-0">
              <div className="relative w-full lg:w-1/3 h-[2px] bg-white/5 rounded-full overflow-hidden hidden lg:block">
                <motion.div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-accent to-cyan" animate={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
              </div>
              
              <div className="flex flex-col items-center justify-center shrink-0 mx-4">
                <motion.div
                  animate={isRunning ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 2, repeat: isRunning ? Infinity : 0, ease: "linear" }}
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-500 ${isRunning ? 'bg-cyan/10 border-cyan/30 shadow-[0_0_20px_rgba(0,212,255,0.2)] text-cyan' : 'bg-[#141414] border-white/5 text-text-muted'}`}
                >
                  <Settings className="w-6 h-6" />
                </motion.div>
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest mt-4">ML Engine</span>
              </div>

              <div className="relative w-full lg:w-1/3 h-[2px] bg-white/5 rounded-full overflow-hidden hidden lg:block">
                <motion.div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-cyan to-purple" animate={{ width: showResults ? '100%' : '0%' }} transition={{ duration: 0.5 }} />
              </div>
            </div>

            {/* 3. Output Box */}
            <div className="w-full lg:w-1/4 flex flex-col justify-center">
               <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block mb-4 text-center lg:text-left">Output: The Certainty</span>
              <div className={`p-4 rounded-xl border text-center transition-all duration-500 h-full flex flex-col justify-center min-h-[140px] ${showResults ? 'bg-purple/10 border-purple/30 shadow-[0_0_30px_rgba(153,69,255,0.15)]' : 'bg-surface border-white/5'}`}>
                {showResults ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
                    <Target className="w-6 h-6 text-purple mb-3" />
                    <span className="text-sm font-bold font-mono text-white tracking-wide">Actionable Financial Outcome</span>
                  </motion.div>
                ) : (
                  <span className="text-xs font-mono text-text-muted uppercase tracking-widest">Awaiting Extraction</span>
                )}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleExtract}
              disabled={isRunning || showResults}
              className={`px-8 py-3.5 font-bold font-mono uppercase tracking-wider rounded-xl text-sm transition-all duration-300 ${
                isRunning ? 'bg-accent/10 text-accent cursor-not-allowed border border-accent/20' 
                : showResults ? 'bg-[#141414] text-text-muted cursor-not-allowed border border-white/5'
                : 'bg-accent text-black hover:shadow-[0_0_20px_rgba(0,255,163,0.3)]'
              }`}
            >
              {isRunning ? `PROCESSING... ${progress}%` : showResults ? 'EXTRACTION COMPLETE' : 'INITIATE EXTRACTION'}
            </motion.button>
            {showResults && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={reset}
                className="px-6 py-3.5 bg-surface border border-white/5 rounded-xl text-sm font-mono uppercase tracking-wider text-text-secondary hover:text-white transition-colors"
              >
                Reset
              </motion.button>
            )}
          </div>

          {/* Results Impact Cards */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-white/5"
              >
                {/* AI Insight */}
                <div className="bg-[#141414] border border-white/5 p-6 rounded-xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-cyan/50" />
                  <div className="text-[10px] font-mono text-cyan uppercase tracking-widest mb-3">01. Hidden Insight Discovered</div>
                  <p className="text-sm text-text-primary leading-relaxed">{outcome.insight}</p>
                </div>

                {/* Action */}
                <div className="bg-[#141414] border border-white/5 p-6 rounded-xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-accent/50" />
                  <div className="text-[10px] font-mono text-accent uppercase tracking-widest mb-3">02. Automated Action Deployed</div>
                  <p className="text-sm text-text-primary leading-relaxed">{outcome.action}</p>
                </div>

                {/* Impact */}
                <div className="bg-purple/10 border border-purple/30 p-6 rounded-xl relative overflow-hidden glow-purple flex flex-col justify-center">
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple/20 rounded-full blur-[40px] pointer-events-none" />
                  <div className="text-[10px] font-mono text-purple uppercase tracking-widest mb-2 relative z-10">03. Financial Impact</div>
                  <p className="text-2xl font-bold font-mono text-white relative z-10">{outcome.impact}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
