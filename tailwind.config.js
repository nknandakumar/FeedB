/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        colorChange: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        colorChange: "colorChange 3s ease infinite",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/Fight.gif')",
        "shivaji": "url('/src/assets/shivaji.gif')",
        "wave": "url('/src/assets/t.gif')",
        "pattren": "url('/src/assets/edge_design-removebg-preview.png')",
      },
    },
  },
  plugins: [daisyui],
};
