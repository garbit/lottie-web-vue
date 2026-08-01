---
description: "Use lottie-web-vue with the Vue 3 Composition API and <script setup>: typed template refs, calling playback methods, and listening to events in TypeScript."
---

# Composition API

The component works naturally with `<script setup>`. Grab a template ref to call [methods](/api/methods), and bind [events](/api/events) with `@`:

```vue
<script setup lang="ts">
import { ref, onMounted } from "vue"
import { LottieAnimation } from "lottie-web-vue"
import WatermelonJSON from "./assets/watermelon.json"

const anim = ref<InstanceType<typeof LottieAnimation>>()

onMounted(() => {
  // jump to frame 150 and play from there
  anim.value?.goToAndPlay(150, true)
})

function onLoopComplete() {
  console.log("loop finished")
}
</script>

<template>
  <LottieAnimation
    ref="anim"
    :animation-data="WatermelonJSON"
    :loop="true"
    :auto-play="true"
    :speed="1"
    @loop-complete="onLoopComplete"
  />
</template>
```

::: tip Typing the ref
The package doesn't export a separate instance type; `InstanceType<typeof LottieAnimation>` gives you full typing for every exposed method. A plain `ref()` also works if you don't need the types.

On Vue 3.5+ you can use [`useTemplateRef`](https://vuejs.org/api/composition-api-helpers.html#usetemplateref) instead:

```ts
import { useTemplateRef } from "vue"
const anim = useTemplateRef<InstanceType<typeof LottieAnimation>>("anim")
```
:::

## Driving playback from user interaction

A common pattern — play an animation when the user clicks:

```vue
<script setup lang="ts">
import { ref } from "vue"
import { LottieAnimation } from "lottie-web-vue"
import CheckmarkJSON from "./assets/checkmark.json"

const anim = ref<InstanceType<typeof LottieAnimation>>()

function celebrate() {
  anim.value?.stop() // rewind to the first frame
  anim.value?.play()
}
</script>

<template>
  <button @click="celebrate">Save</button>
  <LottieAnimation ref="anim" :animation-data="CheckmarkJSON" :auto-play="false" />
</template>
```

Try the full set of controls live:

<ClientOnly><MethodsDemo /></ClientOnly>

## Reactive speed

`speed` is the one prop that's watched after mount — bind it to a ref and playback speed updates live, no remount needed:

```vue
<script setup lang="ts">
import { ref } from "vue"
import { LottieAnimation } from "lottie-web-vue"
import WatermelonJSON from "./assets/watermelon.json"

const speed = ref(1)
</script>

<template>
  <input type="range" min="0.1" max="3" step="0.1" v-model.number="speed" />
  <LottieAnimation :animation-data="WatermelonJSON" :loop="true" :speed="speed" />
</template>
```

For the other props (`animationData`, `loop`, `autoPlay`), see [the reactivity note on the Props page](/api/props#reactivity-what-updates-after-mount).
