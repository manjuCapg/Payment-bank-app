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
        // configure: (proxy, _options) => {
        //   proxy.on("error", (err, _req, _res) => {
        //     console.log("proxy error", err);
        //   });
        //   proxy.on("proxyReq", (proxyReq, req, _res) => {
        //     console.log(
        //       "Sending Request:",
        //       req.method,
        //       req.url,
        //       " => TO THE TARGET =>  ",
        //       proxyReq.method,
        //       proxyReq.protocol,
        //       proxyReq.host,
        //       proxyReq.path,
        //       JSON.stringify(proxyReq.getHeaders())
        //     );
        //   });
        //   proxy.on("proxyRes", (proxyRes, req, _res) => {
        //     console.log(
        //       "Received Response from the Target:",
        //       proxyRes.statusCode,
        //       req.url,
        //       JSON.stringify(proxyRes.headers)
        //     );
        //   });
        // },
      },
    },
  },
});
