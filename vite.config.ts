import { defineConfig } from "vitest/config"
import { resolve } from "node:path"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // emit type declarations for the public surface only
    dts({
      include: ["src/index.ts", "src/components/lottie-web-vue.vue"],
      processor: "vue",
    }),
  ],
  build: {
    // don't copy public/ assets (vite.svg) into the library output
    copyPublicDir: false,
    lib: {
      // src/index.ts is where we have exported the component(s)
      entry: resolve(__dirname, "src/index.ts"),
      name: "LottieAnimation",
      // the name of the output files when the build is run
      fileName: "lottie-web-vue",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue", "lottie-web"],
      output: {
        // named + default exports both exist; silence the UMD interop warning
        exports: "named",
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
          "lottie-web": "lottie",
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["test/**/*.spec.ts"],
    coverage: { provider: "v8" },
  },
})
