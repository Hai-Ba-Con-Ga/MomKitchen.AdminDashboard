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
  esbuild:{
    drop: ['console', 'debugger']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("@aws-amplify")) {
              return "vendor_aws";
            } else if (id.includes("@mui")) {
              return "vendor_mui";
            } else if (id.includes("@ant-design")) {
              return "vendor_ant";
            } else if (id.includes("@faker-js")) {
              return "vendor_faker";
            } else if (id.includes("@here")) {
              return "vendor_here";
            } else if (id.includes("@aws-sdk")) {
              return "vendor_aws_sdk";
            }

            return "vendor"; // all other package goes here
          }
        },
      },
    },
  },

  resolve: {
    alias: {
      "@ui": "/src/base/components/",
      "@": "/src",
      "@base": "/src/base/",
    },
  },
});
