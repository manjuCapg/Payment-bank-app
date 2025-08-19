import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

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
          "https://genaipayment-backend-719673130781.europe-west1.run.app/proxy/8000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/mongoapi/, ""),
      },
    },
  },
});
