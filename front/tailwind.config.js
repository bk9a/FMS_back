module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      mobile: "640px",
      tablet: "768px",
      laptop: "1024px",
      desktop: "1280px",
    },
    container: {
      padding: {
        DEFAULT: "2rem",
        mobile: "2rem",
        tablet: "2rem",
        laptop: "0.5rem",
        desktop: "0.5rem",
      },
      center: true,
    },
    extend: {
      fontFamily: {
        confortaa: ["Comfortaa", "cursive"],
        fira: ["Fira Sans", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        roboto: ["Roboto Slab", "serif"],
        mono: ["PT Mono", "monospace"],
        rbflex: ["Roboto Flex", "sans-serif"],
        firaSans: ["Fira Sans Condensed", "sans-serif"],
      },
      animation: {
        fadeTrans: "fadeTrans 0.4s ease-out",
        fade: "fade 0.7s",
        fadeTransRight: "fadeTransRight 0.5s ease-out",
        fadeTransLeft: "fadeTransLeft 0.5s ease-out",
      },

      keyframes: {
        fadeTrans: {
          "0%": { transform: "translateY(-30px)", opacity: 0 },
          "25%": { opacity: 0.1 },
          "50%": { opacity: 0.3 },
          "75%": { opacity: 0.5 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        fadeTransRight: {
          "0%": { transform: "translateX(80px)", opacity: 0.1 },
          "50%": { opacity: 0.5 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        fadeTransLeft: {
          "0%": { transform: "translateX(-50px)", opacity: 0.1 },
          "50%": { opacity: 0.5 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        fade: {
          "0%": { opacity: 0.5 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
