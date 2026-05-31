import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LivePipeline } from './components/LivePipeline';
import { BentoGrid } from './components/BentoGrid';
import { ROICalculator } from './components/ROICalculator';
import { CTA } from './components/CTA';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

function App() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <main className="min-h-screen bg-black relative text-text-primary selection:bg-accent/20 overflow-hidden">
      {/* ── Interactive Pro Max Background ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
        
        {/* Cursor tracking spotlight */}
        <motion.div
          className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20 mix-blend-screen"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
            background: 'radial-gradient(circle, rgba(0,255,163,0.15) 0%, rgba(0,212,255,0.05) 50%, transparent 70%)',
          }}
        />

        {/* Floating particles */}
        <Particles />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center w-full">
        <Navbar />
        
        <div className="w-full">
          <Hero />
          <Divider />
          
          <LivePipeline />
          <Divider />
          
          <BentoGrid />
          <Divider />
          
          <ROICalculator />
          <Divider />
          
          <CTA />
        </div>
      </div>
    </main>
  );
}

function Particles() {
  const [particles] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>(() => 
    Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
    }))
  );

  return (
    <>
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/10"
          style={{ width: p.size, height: p.size, left: `${p.x}vw`, top: `${p.y}vh` }}
          animate={{
            y: [`${p.y}vh`, `${p.y - 20}vh`, `${p.y}vh`],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </>
  );
}

function Divider() {
  return (
    <div className="w-full max-w-[100px] mx-auto opacity-30 flex flex-col items-center justify-center my-10 pointer-events-none">
      <div className="w-1 h-1 rounded-full bg-text-muted" />
      <div className="w-[1px] h-8 bg-gradient-to-b from-text-muted to-transparent mt-2" />
    </div>
  );
}

export default App;
