import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function LiveLog() {
  const [latency, setLatency] = useState("0.004");
  const [dataFormatted, setDataFormatted] = useState(4.210);
  const [threats, setThreats] = useState("99.98");

  useEffect(() => {
    // Latency fluctuation
    const latencyInterval = setInterval(() => {
      const val = (0.003 + Math.random() * 0.002).toFixed(3);
      setLatency(val);
    }, 800);

    // Data formatted climbing
    const dataInterval = setInterval(() => {
      setDataFormatted(prev => +(prev + 0.001).toFixed(3));
    }, 2000);

    // Threats flicker slightly
    const threatsInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setThreats("99.99");
        setTimeout(() => setThreats("99.98"), 100);
      }
    }, 3000);

    return () => {
      clearInterval(latencyInterval);
      clearInterval(dataInterval);
      clearInterval(threatsInterval);
    };
  }, []);

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card rounded-2xl p-8 md:p-12 border-primary/20 relative overflow-hidden"
      >
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,148,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,148,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        
        <h2 className="text-3xl font-bold mb-10 text-white relative z-10 flex items-center gap-3">
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
          المحرك الحي (Live Pipeline Engine)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono relative z-10">
          
          <div className="bg-black/50 border border-white/5 rounded-xl p-6 glow-primary">
            <div className="text-primary/60 text-sm mb-2">Threats Deflected</div>
            <div className="text-4xl font-bold text-primary">{threats}%</div>
          </div>

          <div className="bg-black/50 border border-white/5 rounded-xl p-6">
            <div className="text-primary/60 text-sm mb-2">Data Pipeline Latency</div>
            <div className="text-4xl font-bold text-white">{latency}s</div>
          </div>

          <div className="bg-black/50 border border-white/5 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent to-primary opacity-50"></div>
            <div className="text-primary/60 text-sm mb-2">Unstructured Chaos Formatted Today</div>
            <div className="text-4xl font-bold text-white">{dataFormatted} <span className="text-xl text-gray-500">TB</span></div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
