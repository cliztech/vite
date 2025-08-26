import type { Config } from "tailwindcss";
import poodyConfig from "@poody/config/tailwind-config";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
    "../../packages/games/src/**/*.{ts,tsx}"
  ],
  presets: [poodyConfig]
} satisfies Config;

