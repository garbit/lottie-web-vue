---
description: "Install lottie-web-vue in a Vue 3 project and render your first Lottie animation with global (plugin) or local component registration."
---

# Getting Started

`lottie-web-vue` wraps Airbnb's [lottie-web](https://github.com/airbnb/lottie-web) — the renderer for animations exported from Adobe After Effects with the [Bodymovin](https://aescripts.com/bodymovin/) plugin — in a single Vue 3 component. You import an animation `.json` file, pass it as a prop, and control playback through props, events, and exposed methods.

## Requirements

- Vue `^3.3.0` (a peer dependency — your project provides it)
- Vue 2? Use `lottie-web-vue@1.2.1` — see [Migrating](/guide/migrating#vue-2)

## Installation

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

`lottie-web` is a regular dependency of the package, so npm installs it automatically — there is nothing else to add for bundler users. (Loading from a CDN instead? See [CDN / UMD usage](/guide/cdn-umd).)

## Your first animation

Download an animation as JSON (see [Finding Animations](/guide/animations)), save it in your project (e.g. `src/assets/watermelon.json`), then:

```vue
<script setup lang="ts">
import { LottieAnimation } from "lottie-web-vue"
import WatermelonJSON from "./assets/watermelon.json"
</script>

<template>
  <LottieAnimation :animation-data="WatermelonJSON" :auto-play="true" :loop="true" />
</template>
```

<ClientOnly><BasicDemo /></ClientOnly>

## Registration options

### Local registration (recommended)

Import the named export where you need it, as above. This keeps the component tree explicit and tree-shakeable.

```ts
import { LottieAnimation } from "lottie-web-vue"
```

### Global registration (plugin)

The default export doubles as a Vue plugin. `app.use()` registers `<LottieAnimation>` in every component of your app:

```ts
import { createApp } from "vue"
import LottieAnimation from "lottie-web-vue"
import App from "./App.vue"

createApp(App)
  .use(LottieAnimation) // <LottieAnimation> is now available everywhere
  .mount("#app")
```

## Sizing the animation

The component renders a single `<div>` wrapper containing the SVG. Any class, style, or attribute you put on `<LottieAnimation>` falls through to that div — size it the way you'd size any element:

```vue
<LottieAnimation class="hero-anim" :animation-data="WatermelonJSON" />

<style>
.hero-anim {
  width: 320px;
  height: 320px;
}
</style>
```

## Next steps

- Control playback from your code — [Methods](/api/methods)
- React to playback lifecycle — [Events](/api/events)
- All configuration options — [Props](/api/props)
