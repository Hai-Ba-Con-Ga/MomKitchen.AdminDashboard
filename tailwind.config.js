/** @type {import('tailwindcss').Config} */
export default {
  mode: ["jit"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // colors: {
    //   'blue': '#1fb6ff',
    //   'purple': '#7e5bef',
    //   'pink': '#ff49db',
    //   'orange': '#ff7849',
    //   'green': '#13ce66',
    //   'yellow': '#ffc82c',
    //   'gray-dark': '#273444',
    //   'gray': '#8492a6',
    //   'gray-light': '#d3dce6',
    // },
    // fontFamily: {
    //   sans: ["Graphik", "sans-serif"],
    //   serif: ["Merriweather", "serif"],
    // },
    extend: {
      zIndex: {
        inputDropdown: 5,
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        sm: "5px",
        md: "7px",
        lg: "12px",
        full: "50%",
      },
      height: {
        "header-sm": "6rem",
        "header-md": "7rem",
        "header-lg": "8rem",
      },
      backgroundColor: {
        hightlight: "#9DBEBB",
      },
    },
  },
  plugins: [],
};
