import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://cfb-dynasty-tracker-backend-bb5f204eb1fd.herokuapp.com/",

        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
