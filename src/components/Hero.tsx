import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

const headlineWords = ['Architecting', 'Data', 'Into', 'Predictable', 'Revenue.'];

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 px-4 md:px-8"
    >
      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center text-center space-y-8">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 justify-center"
        >
          <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(0,255,163,0.8)] animate-pulse" />
          <span className="text-xs font-mono text-text-secondary tracking-widest uppercase">
            Applied Data Science &bull; Mathematical Certainty
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold leading-[1.05] tracking-tight text-center max-w-3xl">
          {headlineWords.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`inline-block mr-3 md:mr-4 ${
                word === 'Data' ? 'text-accent' :
                word === 'Revenue.' ? 'bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent' :
                'text-white'
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle - Chris Voss Style */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
        >
          It seems you're leaving your data's true value to chance. I engineer mathematical certainty into your decision-making. No guesswork, no vanity metrics — just predictable, extracted revenue.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full pt-4"
        >
          <MagneticButton>
            <a
              href="#cta"
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-accent text-black font-bold rounded-xl hover:shadow-[0_0_30px_rgba(0,255,163,0.4)] transition-all duration-300 text-sm"
            >
              <span>Start a Project →</span>
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#simulation"
              className="flex items-center justify-center gap-3 px-8 py-4 glass rounded-xl text-white hover:bg-white/[0.05] transition-all duration-300 font-semibold text-sm border-white/10"
            >
              Explore Dashboard
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.15);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.15);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} style={{ x: springX, y: springY }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {children}
    </motion.div>
  );
}
