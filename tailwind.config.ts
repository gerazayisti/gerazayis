import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Violet royal — couleur primaire du site actuel
        royal: {
          50: "#F4F0FC",
          100: "#E7DEFA",
          200: "#C9B4F1",
          300: "#A889E5",
          400: "#8B62D6",
          500: "#6E3FC4",
          600: "#5A2CA8",
          700: "#4C1D95",
          800: "#3B1573",
          900: "#2A0E54",
        },
        // Bleu — couleur secondaire du site actuel
        azure: {
          50: "#EAF1FE",
          100: "#CFE0FD",
          400: "#4C7CF0",
          500: "#2E5FE0",
          600: "#1D4ED8",
          700: "#173FAD",
        },
        // Violet académique — accent Swiss Neo-Brutalist UY1
        violet: {
          DEFAULT: "#5A2CA8",
          hover: "#431C82",
          light: "#A78BFA",
          50: "#F4F0FC",
          100: "#E7DEFA",
          200: "#C9B4F1",
          300: "#A889E5",
          400: "#8B5CF6",
          500: "#5A2CA8",
          600: "#4C1D95",
          700: "#3B1573",
        },
        // Noir légèrement gris — fond sombre lisible avec le violet
        charcoal: "#18181B",
        ink: "#18181B",
      },
      fontFamily: {
        display: ["var(--font-newsreader)", "Georgia", "serif"],
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "1280px",
      },
      backgroundImage: {
        "orbit-pattern": "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.14) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};

export default config;
