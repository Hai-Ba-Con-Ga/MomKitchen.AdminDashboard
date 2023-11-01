// vite.config.ts
import { defineConfig } from "file:///X:/Project/chickies/mk_client/node_modules/.pnpm/vite@4.3.2_@types+node@20.1.4_less@4.2.0/node_modules/vite/dist/node/index.js";
import react from "file:///X:/Project/chickies/mk_client/node_modules/.pnpm/@vitejs+plugin-react-swc@3.0.0_vite@4.3.2/node_modules/@vitejs/plugin-react-swc/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react()
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
            return "vendor";
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      "@ui": "/src/base/components/",
      "@": "/src",
      "@base": "/src/base/"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJYOlxcXFxQcm9qZWN0XFxcXGNoaWNraWVzXFxcXG1rX2NsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiWDpcXFxcUHJvamVjdFxcXFxjaGlja2llc1xcXFxta19jbGllbnRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1g6L1Byb2plY3QvY2hpY2tpZXMvbWtfY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IGZlZGVyYXRpb24gZnJvbSBcIkBvcmlnaW5qcy92aXRlLXBsdWdpbi1mZWRlcmF0aW9uXCI7XHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIC8qIFxyXG4gICBNaWNyby1mcm9udGVuZFxyXG4gICBmZWRlcmF0aW9uKHtcclxuICAgICAgbmFtZTogXCJhcHBcIixcclxuICAgICAgcmVtb3Rlczoge1xyXG4gICAgICAgIHJlbW90ZUFwcDogXCJodHRwOi8vbG9jYWxob3N0OjUwMDEvYXNzZXRzL3JlbW90ZUVudHJ5LmpzXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHNoYXJlZDogW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIl0sXHJcbiAgICB9KSwgKi9cclxuICBdLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIG1hbnVhbENodW5rczogKGlkKSA9PiB7XHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJub2RlX21vZHVsZXNcIikpIHtcclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiQGF3cy1hbXBsaWZ5XCIpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFwidmVuZG9yX2F3c1wiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlkLmluY2x1ZGVzKFwiQG11aVwiKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBcInZlbmRvcl9tdWlcIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpZC5pbmNsdWRlcyhcIkBhbnQtZGVzaWduXCIpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFwidmVuZG9yX2FudFwiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlkLmluY2x1ZGVzKFwiQGZha2VyLWpzXCIpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFwidmVuZG9yX2Zha2VyXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaWQuaW5jbHVkZXMoXCJAaGVyZVwiKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBcInZlbmRvcl9oZXJlXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaWQuaW5jbHVkZXMoXCJAYXdzLXNka1wiKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBcInZlbmRvcl9hd3Nfc2RrXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBcInZlbmRvclwiOyAvLyBhbGwgb3RoZXIgcGFja2FnZSBnb2VzIGhlcmVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICBcIkB1aVwiOiBcIi9zcmMvYmFzZS9jb21wb25lbnRzL1wiLFxyXG4gICAgICBcIkBcIjogXCIvc3JjXCIsXHJcbiAgICAgIFwiQGJhc2VcIjogXCIvc3JjL2Jhc2UvXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlSLFNBQVMsb0JBQW9CO0FBQzlTLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFVUjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYyxDQUFDLE9BQU87QUFDcEIsY0FBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQy9CLGdCQUFJLEdBQUcsU0FBUyxjQUFjLEdBQUc7QUFDL0IscUJBQU87QUFBQSxZQUNULFdBQVcsR0FBRyxTQUFTLE1BQU0sR0FBRztBQUM5QixxQkFBTztBQUFBLFlBQ1QsV0FBVyxHQUFHLFNBQVMsYUFBYSxHQUFHO0FBQ3JDLHFCQUFPO0FBQUEsWUFDVCxXQUFXLEdBQUcsU0FBUyxXQUFXLEdBQUc7QUFDbkMscUJBQU87QUFBQSxZQUNULFdBQVcsR0FBRyxTQUFTLE9BQU8sR0FBRztBQUMvQixxQkFBTztBQUFBLFlBQ1QsV0FBVyxHQUFHLFNBQVMsVUFBVSxHQUFHO0FBQ2xDLHFCQUFPO0FBQUEsWUFDVDtBQUVBLG1CQUFPO0FBQUEsVUFDVDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLEtBQUs7QUFBQSxNQUNMLFNBQVM7QUFBQSxJQUNYO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
