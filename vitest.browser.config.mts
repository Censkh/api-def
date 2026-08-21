import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const chromeExecutablePath = process.env.VITEST_CHROME_EXECUTABLE_PATH;

export default defineConfig({
  test: {
    globals: true,
    include: ["src/tests/**/*.test.ts"],
    setupFiles: ["./src/tests/browserSetup.ts"],
    browser: {
      enabled: true,
      provider: playwright({
        launchOptions: chromeExecutablePath ? { executablePath: chromeExecutablePath } : undefined,
      }),
      instances: [{ browser: "chromium" }, { browser: "firefox" }, { browser: "webkit" }],
    },
  },
});
