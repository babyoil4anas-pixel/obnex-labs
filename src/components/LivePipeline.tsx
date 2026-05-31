import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, AlertTriangle, ShieldCheck, Cpu, ArrowUpRight, CheckCircle2, Info, X } from 'lucide-react';

type TabType = 'forecast' | 'anomalies' | 'retention';

interface NodeInfo {
  title: string;
  details: string;
  status: 'success' | 'warning' | 'info';
  value: string;
}

export function LivePipeline() {
  const [activeTab, setActiveTab] = useState<TabType>('forecast');
  const [confidence, setConfidence] = useState<number>(95);
  const [isOptimized, setIsOptimized] = useState<boolean>(true);
  const [selectedNode, setSelectedNode] = useState<NodeInfo | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Tab configurations & outcomes
  const tabData = {
    forecast: {
      title: 'Predictive Growth Engine',
      badge: 'PROPHET MODEL v3.2',
      metric: isOptimized ? '+34.2%' : '+2.4%',
      metricLabel: 'Predicted Revenue Lift',
      kpis: [
        { label: 'Model Confidence', value: isOptimized ? `${confidence}%` : 'N/A' },
        { label: 'R² Accuracy Score', value: isOptimized ? '0.982' : '0.410 (Low)' },
        { label: 'Forecast Range', value: '90 Days' }
      ],
      description: 'Drag the slider to adjust the model confidence interval. See how the predictive upper/lower bounds dynamically expand as the model accounts for market volatility.'
    },
    anomalies: {
      title: 'Real-Time Anomaly Isolation',
      badge: 'ML THREAT SENSOR',
      metric: isOptimized ? '0.02%' : '8.4%',
      metricLabel: 'False Alarm Rate',
      kpis: [
        { label: 'Threats Blocked Today', value: isOptimized ? '14 Active' : '0 (Disabled)' },
        { label: 'Isolation Latency', value: isOptimized ? '1.2ms' : '1,200ms (Rule-based)' },
        { label: 'Filter Accuracy', value: isOptimized ? '99.8%' : '76.2%' }
      ],
      description: 'Hover or tap on the highlighted peak anomaly node to view isolated fraud vectors caught in production streams before they hit your checkout.'
    },
    retention: {
      title: 'SaaS Churn Cohort Optimizer',
      badge: 'RETENTION FLOW v1.8',
      metric: isOptimized ? '94.6%' : '42.1%',
      metricLabel: 'Account Protection Rate',
      kpis: [
        { label: 'Churn Signals Isolated', value: isOptimized ? '1,840' : '0' },
        { label: 'MRR Rescued', value: isOptimized ? '$85,000/mo' : '$0' },
        { label: 'Preemptive Win-Back', value: isOptimized ? '88% Conversion' : 'N/A' }
      ],
      description: 'Compare the retention decay curve of standard industry pipelines against our optimized preemptive model.'
    }
  };

  const activeInfo = tabData[activeTab];

  // Helper to generate dynamic SVG path for forecast confidence interval
  const getConfidencePath = () => {
    // Height variation based on slider value
    const factor = (confidence - 80) * 1.5;
    return `M 150 110 
            Q 220 ${100 - factor}, 300 ${70 - factor * 1.5} 
            T 450 ${50 - factor * 2}
            L 450 ${50 + factor * 2} 
            Q 300 ${70 + factor * 1.5}, 220 ${100 + factor} 
            Z`;
  };

  // Node descriptions for interactive clicks on SVG
  const handleNodeClick = (title: string, details: string, status: 'success' | 'warning' | 'info', value: string) => {
    setSelectedNode({ title, details, status, value });
  };

  return (
    <section id="simulation" className="py-20 md:py-32 px-4 md:px-8 bg-black relative" ref={ref}>
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6 }} 
          className="mb-16 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-3 mb-3">
            <div className="inline-flex items-center gap-3 bg-[#0A0A0A] border border-white/5 px-4 py-1.5 rounded-full">
              <Cpu className="w-3.5 h-3.5 text-accent animate-pulse" />
              <span className="text-[10px] font-mono text-text-secondary tracking-widest uppercase">Interactive Analytics Showcase</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-purple/10 border border-purple/30 px-3 py-1.5 rounded-full cursor-help group relative">
              <Info className="w-3.5 h-3.5 text-purple" />
              <span className="text-[10px] font-mono text-purple tracking-widest uppercase font-bold">Simulated Data</span>
              {/* Tooltip */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[240px] bg-[#111] border border-white/10 p-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl text-center">
                <p className="text-[9px] text-text-secondary font-sans leading-relaxed normal-case tracking-normal">
                  For demonstration purposes, this dashboard uses synthetic telemetry to illustrate our capabilities while protecting real client confidentiality.
                </p>
              </div>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            The Interactive <span className="text-accent drop-shadow-[0_0_15px_rgba(0,255,163,0.2)]">Analytics Dashboard</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Click anywhere inside the graph nodes or toggle the ML engine below to see how our custom analytics architecture dynamically restructures live telemetry.
          </p>
        </motion.div>

        {/* Dashboard Frame */}
        <div className="bg-[#080808] border border-white/5 rounded-3xl overflow-hidden shadow-[0_15px_60px_rgba(0,0,0,0.8)] grid grid-cols-1 lg:grid-cols-12 relative min-h-[580px]">
          {/* Top subtle highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

          {/* 1. Sidebar Tabs Controls */}
          <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-white/5 bg-[#0B0B0B] p-6 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible shrink-0">
            <div className="hidden lg:block text-[10px] font-mono text-text-muted uppercase tracking-widest mb-6">Select Analytical Metric:</div>
            
            {(['forecast', 'anomalies', 'retention'] as TabType[]).map((tab) => {
              const isActive = activeTab === tab;
              const icons = { forecast: TrendingUp, anomalies: AlertTriangle, retention: ShieldCheck };
              const Icon = icons[tab];
              const labels = { forecast: 'Revenue Forecast', anomalies: 'Anomaly Isolation', retention: 'Retention Flow' };
              
              return (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setSelectedNode(null); }}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-xs font-mono uppercase tracking-wider transition-all duration-300 w-full whitespace-nowrap lg:whitespace-normal ${
                    isActive 
                      ? 'bg-accent/5 border-accent/20 text-accent shadow-[0_0_15px_rgba(0,255,163,0.08)]' 
                      : 'bg-transparent border-transparent text-text-secondary hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-accent' : 'text-text-muted'}`} />
                  <span className="text-left">{labels[tab]}</span>
                </button>
              );
            })}

            {/* In-Depth Interactive Instruction Card */}
            <div className="hidden lg:block mt-auto bg-white/[0.01] border border-white/5 p-4 rounded-xl">
              <span className="text-[9px] font-mono text-accent uppercase tracking-widest block mb-2 font-semibold">💡 Developer Tip</span>
              <p className="text-[11px] text-text-secondary leading-relaxed font-mono">
                Toggle the ML Optimization engine switch on the right side to compare raw legacy performance directly against our custom models.
              </p>
            </div>
          </div>

          {/* 2. Main Visualization Canvas */}
          <div className="lg:col-span-6 p-6 md:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5 relative">
            {/* Visualizer Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-mono text-accent bg-accent/5 border border-accent/15 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {activeInfo.badge}
                </span>
                <h3 className="text-lg font-bold text-white mt-2 font-mono tracking-tight">{activeInfo.title}</h3>
              </div>

              {/* Dynamic Map Legend */}
              <div className="flex items-center gap-4 text-[10px] font-mono text-text-secondary">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-0.5 bg-accent" />
                  <span>Obnex Optimized</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-0.5 bg-[#FF5F57] opacity-60" />
                  <span>Legacy Baseline</span>
                </div>
              </div>
            </div>

            {/* Interactive SVG Chart Area */}
            <div className="bg-[#050505] border border-white/5 rounded-2xl p-4 flex-1 flex flex-col justify-center min-h-[260px] relative overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab + '-' + isOptimized}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex items-center justify-center relative"
                >
                  {/* Grid Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

                  {/* SVG Chart rendering */}
                  <svg className="w-full h-[220px] overflow-visible" viewBox="0 0 500 200" fill="none">
                    
                    {/* XY Graph Axes */}
                    <line x1="45" y1="20" x2="45" y2="175" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <line x1="45" y1="175" x2="480" y2="175" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    
                    {/* Y-Axis Labels */}
                    <text x="38" y="25" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace" textAnchor="end">HIGH IMPACT</text>
                    <text x="38" y="95" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="monospace" textAnchor="end">NORMAL</text>
                    <text x="38" y="170" fill="rgba(255,255,255,0.15)" fontSize="8" fontFamily="monospace" textAnchor="end">0</text>
                    
                    {/* X-Axis Labels */}
                    <text x="50" y="190" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace">HISTORICAL PAST</text>
                    <text x="250" y="190" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace" textAnchor="middle">NOW</text>
                    <text x="450" y="190" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace" textAnchor="end">90-DAY PREDICTION</text>

                    {/* A. Revenue Forecast Tab Visualization */}
                    {activeTab === 'forecast' && (
                      <>
                        {/* Shaded Confidence Interval (Visible only when optimized) */}
                        {isOptimized && (
                          <motion.path
                            d={getConfidencePath()}
                            fill="url(#forecast-glow)"
                            opacity="0.15"
                            className="transition-all duration-300"
                          />
                        )}
                        
                        {/* Historical Line */}
                        <path 
                          d="M 50 150 Q 100 130, 150 110" 
                          stroke="#888888" 
                          strokeWidth="2.5" 
                          strokeDasharray="4 4"
                          className="cursor-pointer hover:stroke-white transition-colors"
                          onClick={() => handleNodeClick('Historical Actuals', 'Verified financial stream over the past 6 months before pipeline audit.', 'info', '$150,000')}
                        />
                        
                        {/* Prediction Line (Optimized vs Flat based on isOptimized toggle) */}
                        {isOptimized ? (
                          <motion.path
                            d="M 150 110 Q 220 100, 300 70 T 450 50"
                            stroke="#00FFA3"
                            strokeWidth="3.5"
                            className="drop-shadow-[0_0_8px_rgba(0,255,163,0.5)] cursor-pointer"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.8 }}
                            onClick={() => handleNodeClick('Optimized Target Growth', 'Bayesian ML forecast model trending high due to seasonal scaling and resolved compute lag.', 'success', '$320,000 / Mo')}
                          />
                        ) : (
                          <motion.path
                            d="M 150 110 Q 220 120, 300 125 T 450 130"
                            stroke="#FF5F57"
                            strokeWidth="2.5"
                            className="cursor-pointer"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.8 }}
                            onClick={() => handleNodeClick('Legacy Baseline Stream', 'Unoptimized projection. High latency flatlines sales pipeline growth.', 'warning', '$130,000 / Mo')}
                          />
                        )}

                        {/* Baseline standard line (Always visible as reference) */}
                        <path d="M 150 110 Q 220 120, 300 130 T 450 145" stroke="#FF5F57" strokeWidth="1.5" opacity="0.25" />
                        
                        {/* Clickable Interactive Nodes */}
                        <circle 
                          cx="150" cy="110" r="8" fill="rgba(0,255,163,0.15)" className="cursor-pointer hover:fill-accent/40"
                          onClick={() => handleNodeClick('Pipeline Integration Node', 'The precise moment Obnex ML pipeline was integrated into the client stream.', 'success', 'Day 0')}
                        />
                        <circle cx="150" cy="110" r="3.5" fill="#00FFA3" className="pointer-events-none" />

                        {isOptimized && (
                          <circle 
                            cx="450" cy="50" r="8" fill="rgba(0,255,163,0.15)" className="cursor-pointer hover:fill-accent/40"
                            onClick={() => handleNodeClick('90-Day Peak Target', 'Highest forecasted revenue bound with resolved operational blockages.', 'success', '$348,000')}
                          />
                        )}
                        {isOptimized && <circle cx="450" cy="50" r="3.5" fill="#00FFA3" className="pointer-events-none" />}
                      </>
                    )}

                    {/* B. Anomaly Isolation Tab Visualization */}
                    {activeTab === 'anomalies' && (
                      <>
                        {/* Standard Transaction Wave */}
                        <path 
                          d="M 50 130 T 110 130 T 170 130 T 230 130 T 290 40 T 350 130 T 410 130 T 470 130" 
                          stroke="#FF5F57" 
                          strokeWidth="2" 
                          opacity={isOptimized ? 0.3 : 0.9} 
                          className="cursor-pointer"
                          onClick={() => handleNodeClick('Unfiltered Raw Attack Wave', 'Malicious transaction attempting checkout without validation filters.', 'warning', 'SQL injection injection payload')}
                        />

                        {/* ML Filtered Wave (Smooth, only green if optimized) */}
                        {isOptimized ? (
                          <motion.path
                            d="M 50 130 T 110 130 T 170 130 T 230 130 T 290 130 T 350 130 T 410 130 T 470 130"
                            stroke="#00FFA3"
                            strokeWidth="2.5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1 }}
                            className="cursor-pointer"
                            onClick={() => handleNodeClick('Filtered Secure Stream', 'Clean, legitimate transaction wave successfully cleaned by inline ML node.', 'success', 'All Approved')}
                          />
                        ) : (
                          <path d="M 50 130 T 110 130 T 170 130 T 230 130 T 290 40 T 350 130 T 410 130 T 470 130" stroke="#FF5F57" strokeWidth="2.5" />
                        )}

                        {/* Threat Highlight Circle */}
                        {isOptimized && (
                          <>
                            <circle 
                              cx="290" cy="40" r="24" fill="rgba(255,95,87,0.06)" className="animate-pulse cursor-pointer"
                              onClick={() => handleNodeClick('SQL Injection isolated', 'Our ML model immediately spotted malicious injection patterns in checkout payloads and quarantined it.', 'warning', 'Isolated in 1.2ms')}
                            />
                            <circle cx="290" cy="40" r="8" fill="rgba(255,95,87,0.2)" />
                            <circle cx="290" cy="40" r="4" fill="#FF5F57" />

                            {/* Text Threat Flag */}
                            <foreignObject x="310" y="20" width="160" height="40" className="cursor-pointer" onClick={() => handleNodeClick('Threat Isolation Log', 'Real-time alert details: API Signature mismatched on payload block.', 'warning', 'ID: #4092-A')}>
                              <div className="bg-[#FF5F57]/10 border border-[#FF5F57]/20 rounded-md p-1.5 text-[9px] font-mono text-[#FF5F57] uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#FF5F57]/20 transition-colors">
                                <span className="relative flex h-1.5 w-1.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5F57] opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF5F57]"></span>
                                </span>
                                Security Threat Blocked
                              </div>
                            </foreignObject>
                          </>
                        )}

                        {/* Clickable normal nodes */}
                        <circle 
                          cx="110" cy="130" r="7" fill="rgba(0,255,163,0.15)" className="cursor-pointer hover:fill-accent/40"
                          onClick={() => handleNodeClick('Legitimate Checkout', 'Safe customer transaction processed, verified, and finalized.', 'success', '$148.00')}
                        />
                        <circle cx="110" cy="130" r="3" fill="#00FFA3" className="pointer-events-none" />
                      </>
                    )}

                    {/* C. Retention cohort visualization */}
                    {activeTab === 'retention' && (
                      <>
                        {/* Standard Churn Decay Curve */}
                        <path 
                          d="M 50 40 Q 150 140, 450 170" 
                          stroke="#FF5F57" 
                          strokeWidth="2" 
                          strokeDasharray="3 3" 
                          opacity="0.5" 
                          className="cursor-pointer hover:stroke-[#FF5F57]/80"
                          onClick={() => handleNodeClick('Standard Churn decay', 'Historical churn behavior. Without prompt-based interventions, 58% of cohort is lost in 30 days.', 'warning', '58% Churn')}
                        />
                        
                        {/* Optimized Retention Curve */}
                        {isOptimized ? (
                          <motion.path
                            d="M 50 40 Q 180 50, 450 65"
                            stroke="#00FFA3"
                            strokeWidth="3.5"
                            className="drop-shadow-[0_0_8px_rgba(0,255,163,0.3)] cursor-pointer"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.8 }}
                            onClick={() => handleNodeClick('Obnex Retention cohort', 'Prophet-based prediction curve factoring in smart, automated trigger win-backs.', 'success', '94% Protection')}
                          />
                        ) : (
                          <path d="M 50 40 Q 150 140, 450 170" stroke="#FF5F57" strokeWidth="3" />
                        )}

                        {isOptimized && <path d="M 450 65 L 450 170" stroke="rgba(0,255,163,0.15)" strokeWidth="1.5" strokeDasharray="2 2" />}

                        {/* Benefit Tag */}
                        {isOptimized && (
                          <foreignObject x="320" y="80" width="120" height="45" className="cursor-pointer" onClick={() => handleNodeClick('Net Conversion Boost', 'Calculated difference between our optimized flow and standard industry churn.', 'success', '+$85,000 Saved')}>
                            <div className="text-right hover:text-white transition-colors">
                              <div className="text-xs font-mono font-bold text-accent">+120% Retention</div>
                              <div className="text-[8px] text-text-secondary">MRR Protection Boost</div>
                            </div>
                          </foreignObject>
                        )}

                        {/* Clickable trigger node */}
                        {isOptimized && (
                          <>
                            <circle 
                              cx="180" cy="50" r="8" fill="rgba(0,255,163,0.15)" className="cursor-pointer hover:fill-accent/40"
                              onClick={() => handleNodeClick('Early Churn trigger', 'The algorithm detects active warning patterns (drop in session length) and triggers warning flag.', 'success', 'Triggered Day 14')}
                            />
                            <circle cx="180" cy="50" r="3" fill="#00FFA3" className="pointer-events-none" />
                          </>
                        )}
                      </>
                    )}

                    {/* Gradients */}
                    <defs>
                      <linearGradient id="forecast-glow" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#00FFA3" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* ── Interactive Floating Tooltip Card (Inside SVG Container) ── */}
                  <AnimatePresence>
                    {selectedNode && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bg-[#0C0C0C]/95 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-2xl max-w-[240px] z-20 left-6 top-6 text-left"
                      >
                        <button 
                          onClick={() => setSelectedNode(null)}
                          className="absolute top-2.5 right-2.5 text-text-muted hover:text-white transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        
                        <div className="flex items-center gap-1.5 mb-1 text-[9px] font-mono text-accent">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            selectedNode.status === 'success' ? 'bg-accent' :
                            selectedNode.status === 'warning' ? 'bg-[#FF5F57]' : 'bg-blue-400'
                          }`} />
                          {selectedNode.status.toUpperCase()} METRIC
                        </div>
                        
                        <h5 className="text-xs font-bold text-white font-mono tracking-tight">{selectedNode.title}</h5>
                        <p className="text-[10px] text-text-secondary mt-1.5 leading-relaxed font-sans">{selectedNode.details}</p>
                        
                        <div className="mt-3 pt-2 border-t border-white/5 flex justify-between items-center text-[10px] font-mono">
                          <span className="text-text-muted">VALUE:</span>
                          <span className="text-white font-bold">{selectedNode.value}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Business Takeaway Guide ── */}
            <div className="mt-4 bg-[#0A0A0A] border border-white/5 p-4 rounded-xl flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-accent/5 border border-accent/10 text-accent shrink-0">
                {activeTab === 'forecast' && <TrendingUp className="w-4 h-4" />}
                {activeTab === 'anomalies' && <AlertTriangle className="w-4 h-4" />}
                {activeTab === 'retention' && <ShieldCheck className="w-4 h-4" />}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                  Business Takeaway (Plain English)
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed mt-1">
                  {activeTab === 'forecast' && (
                    <>
                      {isOptimized ? (
                        <>
                          The <span className="text-accent font-semibold">Green Line</span> shows how our predictive modeling continuously optimizes and projects your revenues upward. The <span className="text-[#FF5F57] font-semibold">Red Line</span> is the old way, which flatlines under growth bottlenecks. Adjust the slider above to see how we calculate safety margins to protect your operations.
                        </>
                      ) : (
                        <>
                          With the optimization engine turned <span className="text-[#FF5F57] font-semibold">OFF</span>, your pipeline runs on legacy flat rules. Your business has no confidence interval buffer, making it blind to seasonality spikes or product supply lag.
                        </>
                      )}
                    </>
                  )}
                  {activeTab === 'anomalies' && (
                    <>
                      {isOptimized ? (
                        <>
                          Notice the <span className="text-[#FF5F57] font-semibold">Red Spike</span>—that is a checkout transaction threat. While legacy pipelines allow security fraud or crash entirely, our ML sensor intercepts the spike in 1.2 milliseconds, keeping your systems running smooth and uninterrupted (the <span className="text-accent font-semibold">Green Line</span>).
                        </>
                      ) : (
                        <>
                          With optimization <span className="text-[#FF5F57] font-semibold">OFF</span>, your system is vulnerable. The SQL threat spike goes entirely undetected, creating high false alarms (8.4%) and chargeback exposures on your gateways.
                        </>
                      )}
                    </>
                  )}
                  {activeTab === 'retention' && (
                    <>
                      {isOptimized ? (
                        <>
                          Rather than reacting after users quit (the dropping <span className="text-[#FF5F57] font-semibold">Red Line</span>), our algorithms analyze active session patterns to spot warning signals, allowing your team to automatically target high-risk accounts and protect your recurring monthly revenue (the <span className="text-accent font-semibold">Green Line</span>).
                        </>
                      ) : (
                        <>
                          With optimization <span className="text-[#FF5F57] font-semibold">OFF</span>, there are no preemptive signal triggers. High-value accounts churn undetected, dropping your protection rate down to standard baseline averages (42%).
                        </>
                      )}
                    </>
                  )}
                </p>
              </div>
            </div>

          </div>

          {/* 3. Right: Control Panel & KPIs */}
          <div className="lg:col-span-3 bg-[#090909] p-6 md:p-8 flex flex-col justify-between">
            {/* Live Primary metric */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block">
                  {activeInfo.metricLabel}
                </span>
                
                {/* Engine Optimization Toggle Switch (Ultra Premium UX) */}
                <div className="flex items-center gap-1.5">
                  <span className={`text-[8px] font-mono ${isOptimized ? 'text-accent' : 'text-[#FF5F57]'} uppercase`}>
                    {isOptimized ? 'ML ON' : 'ML OFF'}
                  </span>
                  <button 
                    onClick={() => { setIsOptimized(!isOptimized); setSelectedNode(null); }}
                    className={`w-8 h-4 rounded-full relative transition-colors duration-300 p-0.5 ${isOptimized ? 'bg-accent/20 border border-accent/30' : 'bg-white/5 border border-white/10'}`}
                  >
                    <motion.div 
                      layout
                      className={`w-2.5 h-2.5 rounded-full ${isOptimized ? 'bg-accent shadow-[0_0_8px_rgba(0,255,163,0.8)]' : 'bg-text-muted'}`}
                      animate={{ x: isOptimized ? 14 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>
              </div>
              
              <div className="text-4xl font-bold font-mono text-white mt-2 tracking-tight flex items-baseline gap-1">
                {activeInfo.metric}
                <ArrowUpRight className="w-4 h-4 text-accent" />
              </div>
            </div>

            {/* Interactive sliders / widgets */}
            <div className="my-6 pt-6 border-t border-white/5">
              {activeTab === 'forecast' && isOptimized ? (
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-3">
                    <span className="text-text-secondary uppercase">Confidence Interval:</span>
                    <span className="text-accent font-bold">{confidence}%</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="99"
                    value={confidence}
                    onChange={(e) => setConfidence(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <p className="text-[9px] text-text-muted font-mono leading-relaxed mt-4">
                    {activeInfo.description}
                  </p>
                </div>
              ) : (
                <div>
                  <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider block mb-2">How It Works:</span>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {activeInfo.description}
                  </p>
                </div>
              )}
            </div>

            {/* Metrics Checklist */}
            <div className="space-y-3 pt-6 border-t border-white/5">
              {activeInfo.kpis.map((kpi, idx) => (
                <div key={idx} className="flex justify-between items-center bg-black/30 border border-white/[0.02] p-2.5 rounded-xl">
                  <span className="text-[9px] font-mono text-text-secondary uppercase tracking-wider">{kpi.label}</span>
                  <span className="text-xs font-mono font-bold text-white">{kpi.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
