module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // ✅ Centralized Color Palette
      colors: {
        // Primary Brand Colors
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c3d66",
        },
        // Accent Colors
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        // Dark Theme
        dark: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#030712",
        },
        // Background
        bg: {
          primary: "#05080f",
          secondary: "#0a0e1a",
          tertiary: "#0f1419",
        },
        // Text
        text: {
          primary: "#e8eaf0",
          secondary: "#a8adb8",
          muted: "#6b7280",
        },
      },
      fontFamily: {
        sans: ["Outfit", "system-ui", "sans-serif"],
        serif: ["DM Serif Display", "serif"],
        mono: ["DM Mono", "monospace"],
        signature: ["Great Vibes", "cursive"],
      },
      keyframes: {
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        customRotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(14, 165, 233, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(14, 165, 233, 0.6)" },
        },
      },
      animation: {
        bounce: "bounce 10s infinite",
        customRotate: "customRotate 20s linear infinite",
        fadeInUp: "fadeInUp 0.6s ease-out",
        glow: "glow 2s ease-in-out infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(14, 165, 233, 0.4)",
        "glow-lg": "0 0 40px rgba(14, 165, 233, 0.5)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
