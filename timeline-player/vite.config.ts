import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { corpHeadersPlugin } from "./vite-plugins/corpHeadersPlugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), corpHeadersPlugin()],
});
