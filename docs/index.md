---
layout: home
description: "Airbnb Lottie-web animation component for Vue 3. Play After Effects animations exported with Bodymovin in your Vue app with a single component."

hero:
  name: lottie-web-vue
  text: Lottie animations for Vue 3
  tagline: Play Airbnb Lottie-web animations exported from After Effects with a single Vue component. TypeScript-ready, SSR-safe, 21 kB.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: API Reference
      link: /api/props
    - theme: alt
      text: View on GitHub
      link: https://github.com/garbit/lottie-web-vue

features:
  - icon: 🎬
    title: One component, full control
    details: Pass your Lottie JSON as a prop and control playback with play(), pause(), stop(), goToAndPlay() and more via a template ref.
  - icon: 🧩
    title: Vue 3 + TypeScript
    details: Ships typed declarations, works with script setup, the Options API, and app.use() global registration.
  - icon: 🪶
    title: Tiny by design
    details: lottie-web is a peer of your bundler graph, not bundled in — the package is ~21 kB unpacked and your bundler dedupes lottie-web.
  - icon: 🖥️
    title: SSR-safe
    details: Initialises lottie-web only in onMounted, so server-side rendering and static site generation work out of the box.
---

## See it running

<ClientOnly><BasicDemo /></ClientOnly>

```vue
<script setup lang="ts">
import { LottieAnimation } from "lottie-web-vue"
import WatermelonJSON from "./assets/watermelon.json"
</script>

<template>
  <LottieAnimation :animation-data="WatermelonJSON" :auto-play="true" :loop="true" />
</template>
```

Install it:

::: code-group

```bash [npm]
npm install lottie-web-vue
```

```bash [yarn]
yarn add lottie-web-vue
```

```bash [pnpm]
pnpm add lottie-web-vue
```

:::
