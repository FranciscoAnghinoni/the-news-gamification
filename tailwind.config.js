/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        amarelo: {
          DEFAULT: "#FFCE04", // C0 M19 Y99 K0 / R255 G255 B3 / #FFCE04
        },
        preto: {
          DEFAULT: "#000000", // C0 M0 Y0 K0 / R0 G0 B0 / #000000
        },
        marrom: {
          DEFAULT: "#240E0B", // C0 M61 Y69 K86 / R36 G14 B11 / #240E0B
        },
        cinza: {
          DEFAULT: "#615A5A", // C0 M7 Y7 K62 / R97 G90 B90 / #615A5A
        },
        branco: {
          DEFAULT: "#FFFFFF", // C0 M0 Y0 K0 / R255 G255 B255 / #FFFFFF
        },
      },
    },
  },
  plugins: [],
};
