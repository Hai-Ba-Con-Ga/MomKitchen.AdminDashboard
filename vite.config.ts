import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
   /* 
   Micro-frontend
   federation({
      name: "app",
      remotes: {
        remoteApp: "http://localhost:5001/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }), */
  ],
  build:{
  },

  resolve: {
    alias: {
      "@ui": "/src/components/",
      "@": "/src",
      "@base" :"/src/base/"
    },
  },
});
