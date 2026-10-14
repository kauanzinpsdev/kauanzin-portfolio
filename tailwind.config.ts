import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        surface: "#111111",
        muted: "#A1A1AA",
        accent: {
          DEFAULT: "#22D3EE",
          soft: "#67E8F9",
          deep: "#0891B2",
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        camera: {
          "0%": { transform: "scale(1.02) translate3d(0, 0, 0)" },
          "100%": { transform: "scale(1.08) translate3d(-1%, 0.5%, 0)" },
        },
        cue: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(200%)" },
        },
      },
      animation: {
        camera: "camera 24s ease-in-out infinite alternate",
        cue: "cue 2.2s cubic-bezier(0.65, 0, 0.35, 1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
