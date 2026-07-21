import { env } from "node:process";
import { defineConfig, devices } from "@playwright/test";

const BASE_URL = "http://127.0.0.1:4173/Su4u/";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(env.CI),
  retries: env.CI ? 2 : 0,
  workers: env.CI ? 1 : undefined,
  reporter: env.CI ? "line" : "html",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "mobile-safari",
      use: { ...devices["iPhone 15"] },
    },
  ],
  webServer: {
    command: env.CI
      ? "npm run preview -- --host 127.0.0.1 --port 4173 --strictPort"
      : "npm run build && npm run preview -- --host 127.0.0.1 --port 4173 --strictPort",
    url: BASE_URL,
    reuseExistingServer: !env.CI,
    timeout: 120_000,
  },
});
