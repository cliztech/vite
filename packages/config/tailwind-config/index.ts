import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        brand: {
          pink: {
            50: "#fff1f7",
            100: "#ffe4ef",
            600: "#db2777",
            700: "#be185d"
          }
        }
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem"
      },
      boxShadow: {
        lg: "0 10px 20px -5px rgba(219,39,119,.2)"
      }
    }
  },
  plugins: [],
  darkMode: ["class", "media"]
} satisfies Config;

