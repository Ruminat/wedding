import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  reporter: "line",
  use: {
    baseURL: "http://127.0.0.1:5278",
    colorScheme: "light",
    reducedMotion: "reduce",
  },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 5278 --strictPort",
    url: "http://127.0.0.1:5278",
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
