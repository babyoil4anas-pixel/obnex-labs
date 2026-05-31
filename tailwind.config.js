/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        obsidian: "#121212",
        primary: {
          DEFAULT: "#00FF94", // Terminal green / Success
          glow: "rgba(0, 255, 148, 0.4)",
        },
        danger: {
          DEFAULT: "#FF3366", // Danger / ROI loss
          glow: "rgba(255, 51, 102, 0.4)",
        },
        amethyst: {
          DEFAULT: "#9933FF", // Tech aesthetic accent
          glow: "rgba(153, 51, 255, 0.4)",
        },
      },
      fontFamily: {
        sans: ["Tajawal", "system-ui", "sans-serif"], 
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        'glass-panel': 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
      }
    },
  },
  plugins: [],
}
