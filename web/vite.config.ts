import react from "@vitejs/plugin-react-swc"

import path from "path"
import { defineConfig } from "vite"
// const __dirname = path.dirname(new URL(import.meta.url).pathname)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    port: parseInt(process.env.PORT) || 3001,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(path.join(__dirname, "./src")),
    },
  },
})
