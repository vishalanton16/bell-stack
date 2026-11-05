import { defineAgent } from "eve";

export default defineAgent({
  model: process.env.BELL_MODEL ?? "openai/gpt-6-luna",
  build: {
    externalDependencies: [
      "@browserbasehq/sdk",
      "@browserbasehq/stagehand",
      "playwright-core",
      "pg",
    ],
  },
  limits: { sessionTimeoutMs: 24 * 60 * 60 * 1_000 },
});
