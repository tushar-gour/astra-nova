import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  esbuild: {
    loader: "jsx", // or 'js'
    include: /\.jsx?$/, // Ensure JavSAcript files are correctly included
    exclude: [], // No exclusions here, unless you need to exclude specific files
  },
  plugins: [react()],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  server: {
    hmr: {
      overlay: false, // Disable the HMR error overlay in development
    },
  },
  build: {
    outDir: "dist", // Vercel expects the `dist/` folder as the default output
  },
});
