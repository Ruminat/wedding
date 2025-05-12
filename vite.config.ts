import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";
import pugPlugin from "vite-plugin-pug";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [pugPlugin()],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  server: {
    host: true,
    open: true,
  },
});
