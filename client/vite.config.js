import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }], //this will always lead to src wherever directory you are
  },
});
