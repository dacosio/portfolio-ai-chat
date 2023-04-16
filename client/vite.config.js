import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";
import path from "path";

export default defineConfig({
  plugins: [react(), commonjs()],
  build: {
    outDir: "dist",
  },
  // ssr: false,
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }], //this will always lead to src wherever directory you are
  },
});
