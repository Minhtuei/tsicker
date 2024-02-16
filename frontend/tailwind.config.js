const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
        },
        fontFamily: {
            sans: ["Inter", "sans-serif"],
        },
        borderRadius: {
            none: "0",
            sm: "0.125rem",
            DEFAULT: "0.25rem",
            DEFAULT: "4px",
            md: "0.375rem",
            lg: "0.5rem",
            full: "9999px",
            large: "12px",
            "3xl": "2.5rem",
        },
    },
    plugins: [],
});
