import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// vite and the plugin resolve from the repo root's node_modules
export default defineConfig({
  plugins: [vue()],
})
