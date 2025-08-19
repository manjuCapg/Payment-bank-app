import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), "tailwind-scrollbar"],

  server: {
    proxy: {
      "/api": {
        target:
          "https://genaipayment-backend-719673130781.europe-west1.run.app/proxy/8000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/mongoapi": {
        target:
          "https://15673827115c716f-dot-europe-west2.notebooks.googleusercontent.com/proxy/8000/docs",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/mongoapi/, ""),
      },
    },
  },
});
