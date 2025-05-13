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
  build: {
    rollupOptions: {
      output: {
        // Убираем автоматическое добавление crossorigin
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
  server: {
    host: true,
    open: true,
  },
});
