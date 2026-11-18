/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        zinc: {
          950: '#09090b',
        },
        darkCard: '#0c0c0f',
        darkBorder: '#1e1e24',
        accent: {
          teal: '#2dd4bf',
          blue: '#2563eb',
          emerald: '#059669',
        }
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', '"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
};
