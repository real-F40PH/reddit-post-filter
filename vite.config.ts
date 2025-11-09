import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
    rollupOptions: {
      input: "src/content.tsx",
      output: {
        entryFileNames: "content.js",
      },
      external: []
    },
    minify: false
  }
});
