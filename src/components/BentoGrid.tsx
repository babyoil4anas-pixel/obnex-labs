import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Target, Database, Magnet, ShieldCheck, Cpu } from 'lucide-react';
import React from 'react';

const cards = [
  {
    title: 'Predictive Modeling',
    description: 'We build bespoke machine learning models to forecast user behavior, demand peaks, and market volatility with surgical precision.',
    icon: Target,
    span: 'md:col-span-1',
    accentColor: '#00FFA3', // accent
  },
  {
    title: 'Behavioral Intelligence',
    description: 'Isolate customer decay and high-churn risk cohorts early. Pinpoint exactly who will purchase and who is leaving before it occurs.',
    icon: Magnet,
    span: 'md:col-span-1',
    accentColor: '#00D4FF', // cyan
  },
  {
    title: 'Statistical Audits',
    description: 'Uncover hidden revenue leaks and performance drops. We translate complex datasets into absolute mathematical certainty for operational audits.',
    icon: Database,
    span: 'md:col-span-1',
    accentColor: '#9945FF', // purple
  },
  {
    title: 'A/B Optimization',
    description: 'Design mathematically rigorous experimentation frameworks. Never guess if an operational update succeeded—measure the precise lift.',
    icon: ShieldCheck,
    span: 'md:col-span-1 lg:col-span-1',
    accentColor: '#00FFA3', // accent
  },
  {
    title: 'Operational AI Strategy',
    description: 'We do not just hand you a raw Jupyter notebook and walk away. We integrate predictive engines directly into your workflows to guarantee high-value returns.',
    icon: Cpu,
    span: 'md:col-span-2 lg:col-span-2',
    accentColor: '#FFB800', // amber
  },
];

export function BentoGrid() {
  return (
    <section id="capabilities" className="py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-cyan shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
            <span className="text-xs font-mono text-text-secondary tracking-widest uppercase">Capabilities</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            The Bento Grid of <span className="text-purple drop-shadow-[0_0_15px_rgba(153,69,255,0.2)]">Outcomes</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl text-sm md:text-base">
            It's easy to deploy models. It's much harder to guarantee they actually move the needle. Everything we build is engineered for one specific result: measurable growth.
          </p>
        </motion.div>

        {/* Grid (3 top, 2 bottom) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <SpotlightCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SpotlightCard({ card, index }: { card: typeof cards[0]; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }
  function handleMouseLeave() { mouseX.set(-100); mouseY.set(-100); }

  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${card.span} bg-[#0A0A0A] rounded-2xl p-6 md:p-8 relative overflow-hidden group cursor-default border border-white/5 transition-all duration-500`}
    >
      {/* Spotlight Gradient */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${card.accentColor}10, transparent 80%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#141414] border border-white/5 flex items-center justify-center transition-colors duration-500" style={{ borderColor: `${card.accentColor}20` }}>
            <Icon className="w-5 h-5" style={{ color: card.accentColor }} />
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed flex-1">{card.description}</p>
      </div>

      <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" style={{ background: card.accentColor }} />
    </motion.div>
  );
}
