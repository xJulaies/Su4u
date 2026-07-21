import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    clearMocks: true,
    restoreMocks: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.test.{ts,tsx}",
        "src/**/*.types.ts",
        "src/**/test/**",
        "src/routeTree.gen.ts",
      ],
      thresholds: {
        "src/features/game/lib/**/*.ts": {
          lines: 90,
          statements: 90,
          functions: 90,
          branches: 80,
        },
        "src/features/game/hooks/**/*.ts": {
          lines: 90,
          statements: 90,
          functions: 90,
          branches: 80,
        },
      },
    },
  },
});
