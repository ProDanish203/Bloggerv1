import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: "class",
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        text: "#000000",
        bg: "#ffffff",
        accent: "#d41d6d",
        primary: "#8fb3ff",
        secondary: "#ebf1ff",
        textDark: "#ffffff",
        bgDark: "#000000",
        primaryDark: "#000000",
        accentDark: "#001952",
        secondaryDark: "#f199bf"
      }
    },
  },
  plugins: [],
}
export default config
