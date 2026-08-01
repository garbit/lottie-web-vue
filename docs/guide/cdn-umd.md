---
description: "Use lottie-web-vue from a CDN with a <script> tag: required script order since 3.0.0, the lottie global, and a full working UMD example."
---

# CDN / UMD Usage

You can use `lottie-web-vue` without a bundler via `<script>` tags. The UMD build exposes the component as the global `LottieAnimation`.

## Script order matters (3.0.0+) {#script-order}

::: warning Breaking change in 3.0.0
Since 3.0.0, `lottie-web` is **no longer bundled** into the library output (the package shrank from ~752 kB to ~21 kB). If you load the UMD build via a `<script>` tag, you must load `lottie-web` first so the `lottie` global exists:
:::

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js"></script>
<script src="https://unpkg.com/lottie-web-vue/dist/lottie-web-vue.umd.cjs"></script>
```

If you use a bundler (Vite, webpack, etc.) none of this applies — `lottie-web` is installed automatically and resolved from `node_modules`.

## Full example

```html
<!doctype html>
<html>
  <body>
    <div id="app">
      <lottie-animation v-if="animationJson" :animation-data="animationJson" :loop="true"></lottie-animation>
    </div>

    <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js"></script>
    <script src="https://unpkg.com/lottie-web-vue/dist/lottie-web-vue.umd.cjs"></script>
    <script>
      const { createApp } = Vue

      createApp({
        data() {
          return { animationJson: null }
        },
        async created() {
          const res = await fetch("./animation.json")
          this.animationJson = await res.json()
        },
      })
        .use(LottieAnimation.default) // registers <lottie-animation> globally
        .mount("#app")
    </script>
  </body>
</html>
```

The UMD global is namespaced: `LottieAnimation.default` (also available as `LottieAnimation.LottieAnimation`) is the component/plugin.
