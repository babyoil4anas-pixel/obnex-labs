import { motion } from 'framer-motion';
import { useState } from 'react';

const navLinks = [
  { label: 'Dashboard', href: '#simulation' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'ROI', href: '#roi' },
];

export function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4"
    >
      <div className="glass rounded-xl px-5 md:px-6 py-3 flex items-center justify-between max-w-7xl mx-auto border border-white/5 shadow-2xl">
        {/* Logo */}
        <a href="#" className="flex items-baseline gap-0 select-none group">
          <span className="text-[20px] md:text-[24px] font-bold tracking-tight text-white">
            Obne
          </span>
          <span className="text-[24px] md:text-[28px] font-bold text-accent leading-none transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(0,255,163,0.5)]">
            ∞
          </span>
          <span className="text-[9px] md:text-[10px] font-bold text-text-secondary tracking-[0.2em] uppercase self-end mb-[3px] ml-1.5">
            Labs
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-4 py-2 text-xs font-mono tracking-wide text-text-secondary hover:text-white transition-colors uppercase"
            >
              {hoveredIndex === i && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/5 rounded-lg border border-white/10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#cta"
          className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-white text-black text-xs font-bold font-mono uppercase tracking-wider rounded-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-[1.02]"
        >
          Start Project
        </a>

        {/* Mobile burger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 flex flex-col gap-1.5" aria-label="Menu">
          <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }} className="block w-6 h-[2px] bg-white rounded-full" />
          <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} className="block w-6 h-[2px] bg-white rounded-full" />
          <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }} className="block w-6 h-[2px] bg-white rounded-full" />
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: mobileOpen ? 'auto' : 0, opacity: mobileOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden max-w-7xl mx-auto"
      >
        <div className="glass rounded-xl mt-2 p-4 flex flex-col gap-1 border border-white/5">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="px-4 py-3 text-sm font-mono uppercase tracking-wider text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              {link.label}
            </a>
          ))}
          <a href="#cta" onClick={() => setMobileOpen(false)} className="mt-2 px-4 py-3 bg-white text-black text-center font-bold font-mono uppercase tracking-wider rounded-lg">
            Start Project
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
}
