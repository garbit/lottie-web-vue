import { defineConfig } from "@playwright/test"

export default defineConfig({
  testDir: "e2e",
  // packs the library, installs the tarball into playground/, builds the app
  globalSetup: "./e2e/setup.ts",
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: "http://localhost:4173",
  },
  webServer: {
    command: "npx vite preview --port 4173 --strictPort",
    cwd: "playground",
    port: 4173,
    reuseExistingServer: false,
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
})
