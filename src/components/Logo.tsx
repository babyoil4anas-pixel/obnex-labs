import { motion } from 'framer-motion';

export function Logo() {
  return (
    <div className="relative flex items-center justify-center w-32 h-32">
      {/* Outer Ring */}
      <motion.svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute"
      >
        <circle cx="60" cy="60" r="58" stroke="#00FF94" strokeWidth="1" strokeDasharray="4 12" className="opacity-40" />
      </motion.svg>
      
      {/* Inner Hexagon / Abstract 'O' */}
      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute"
      >
        <path d="M40 5L70.3109 22.5V57.5L40 75L9.68911 57.5V22.5L40 5Z" stroke="#00FF94" strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(0,255,148,0.8)]" />
        <path d="M40 15L61.6506 27.5V52.5L40 65L18.3494 52.5V27.5L40 15Z" stroke="#FF3366" strokeWidth="1" strokeDasharray="2 4" className="opacity-60" />
      </motion.svg>

      {/* Core Node */}
      <motion.div 
        className="w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_#00FF94]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
