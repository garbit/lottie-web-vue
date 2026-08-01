import pluginVue from "eslint-plugin-vue"
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript"

export default defineConfigWithVueTs(
  {
    ignores: ["dist/", "node_modules/", "playground/dist/", "playground/node_modules/", "playwright-report/", "test-results/"],
  },
  pluginVue.configs["flat/essential"],
  vueTsConfigs.recommended,
  {
    rules: {
      // the mock factory intentionally names its unused option param with _
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  }
)
