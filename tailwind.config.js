/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2D1B69", // Dark purple
          50: "#F5F3FA",
          100: "#E9E4F5",
          200: "#D3C9EB",
          300: "#BDAEE1",
          400: "#A793D7",
          500: "#9178CD",
          600: "#7B5DC3",
          700: "#2D1B69", // Main dark purple
          800: "#231452",
          900: "#190D3B",
        },
        secondary: {
          DEFAULT: "#FFFFFF", // White
          50: "#FFFFFF",
          100: "#F8F8F8",
          200: "#F0F0F0",
          300: "#E8E8E8",
          400: "#E0E0E0",
          500: "#D8D8D8",
          600: "#D0D0D0",
          700: "#C8C8C8",
          800: "#C0C0C0",
          900: "#B8B8B8",
        },
      },
    },
  },
  plugins: [],
};
