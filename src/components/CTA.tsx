import { motion } from 'framer-motion';
import { useState } from 'react';

export function CTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const formEndpoint = "https://formspree.io/f/xdajvzjp";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === 'loading') return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setSubmitted(true);
        setStatus('success');
        setTimeout(() => {
          setSubmitted(false);
          setStatus('idle');
        }, 5000);
        setEmail('');
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Formspree error details:", errorData);
        
        // Show actual error message if possible
        const msg = errorData.error || "Failed to connect to Formspree. Make sure your Form is active.";
        setErrorMsg(msg);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 8000);
      }
    } catch (error) {
      console.error("Form submission error", error);
      setErrorMsg("Network error. Please check your internet connection.");
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="cta" className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden flex flex-col items-center">
      {/* Abstract Background Element */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
        <div className="w-[800px] h-[400px] bg-accent/[0.02] rounded-[100%] blur-[100px]" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(0,255,163,0.8)] animate-pulse" />
            <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase">Start a Project</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            Have you given up on extracting <br /><span className="text-accent drop-shadow-[0_0_15px_rgba(0,255,163,0.2)]">Your True Value?</span>
          </h2>

          {/* Subtext */}
          <p className="text-sm md:text-base text-text-secondary max-w-lg mx-auto mb-10 leading-relaxed">
            Stop letting your competitors exploit data patterns you already own. Enter your email below to initiate a secure, no-BS architecture review.
          </p>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto w-full relative"
          >
            <div className="relative flex p-1.5 bg-[#0A0A0A] rounded-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your business email..."
                required
                className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-text-muted focus:outline-none"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-3 font-bold rounded-lg text-sm transition-all duration-300 ${
                  status === 'error' ? 'bg-[#FF5F57] text-white' :
                  status === 'success' ? 'bg-accent text-black hover:shadow-[0_0_15px_rgba(0,255,163,0.4)]' :
                  status === 'loading' ? 'bg-white/10 text-white/50 cursor-wait' :
                  'bg-white text-black hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                }`}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : 
                 status === 'success' ? 'Received ✓' : 
                 status === 'error' ? 'Error ✗' : 'Get Started'}
              </motion.button>
            </div>

            {errorMsg && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-mono text-[#FF5F57] mt-3">
                {errorMsg}
              </motion.div>
            )}

            {/* Form Context */}
            <div className="mt-4 text-[10px] font-mono text-text-muted uppercase tracking-wider text-center">
              No Commitment • Secure Infrastructure • 24h Response
            </div>
          </motion.form>
        </motion.div>
      </div>

      {/* Grand Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-32 w-full max-w-5xl flex flex-col items-center gap-4 text-center"
      >
        {/* Logo */}
        <div className="flex items-baseline gap-0 select-none">
          <span className="text-xl font-bold text-white">Obne</span>
          <span className="text-2xl font-bold text-accent leading-none">∞</span>
          <span className="text-[9px] font-bold text-text-secondary tracking-[0.2em] uppercase self-end mb-1 ml-1.5">Labs</span>
        </div>

        {/* Minimalist Social Links */}
        <div className="flex items-center gap-6 mt-2">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-text-secondary opacity-40 hover:opacity-100 hover:text-accent transition-all duration-300"
            aria-label="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-text-secondary opacity-40 hover:opacity-100 hover:text-accent transition-all duration-300"
            aria-label="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a 
            href="https://wa.me/yourphone" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-text-secondary opacity-40 hover:opacity-100 hover:text-accent transition-all duration-300"
            aria-label="WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </a>
        </div>

        <div className="text-[10px] text-text-muted font-mono uppercase tracking-widest mt-2">
          © {new Date().getFullYear()} Obnex Labs. Architected for Scale.
        </div>
      </motion.div>
    </section>
  );
}
