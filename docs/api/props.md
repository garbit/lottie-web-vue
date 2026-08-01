---
description: "lottie-web-vue props reference: animationData, loop, autoPlay, and speed — types, defaults, live examples, and which props are reactive after mount."
---

# Props

<ClientOnly><PropsDemo /></ClientOnly>

| Prop | Type | Required | Default | Reactive after mount |
| --- | --- | --- | --- | --- |
| [`animationData`](#animationdata) | `Object` | yes | — | no |
| [`loop`](#loop) | `Boolean \| Number` | no | `false` | no |
| [`autoPlay`](#autoplay) | `Boolean` | no | `true` | no |
| [`speed`](#speed) | `Number` | no | `1` | **yes** |

## animationData

- **Type:** `Object` · **Required**

The parsed Lottie animation JSON. Import the `.json` file and pass it directly:

```vue
<script setup lang="ts">
import { LottieAnimation } from "lottie-web-vue"
import WatermelonJSON from "@/assets/watermelon.json"
</script>

<template>
  <LottieAnimation :animation-data="WatermelonJSON" />
</template>
```

The component deep-clones the object before handing it to lottie-web, so the same imported JSON can safely feed multiple component instances.

## loop

- **Type:** `Boolean | Number` · **Default:** `false`

| Value | Behaviour |
| --- | --- |
| `true` | Loops continuously |
| `false` | Plays once |
| `3` (any integer) | Plays that many times, then stops |

## autoPlay

- **Type:** `Boolean` · **Default:** `true`

When `true`, playback starts as soon as the animation has loaded. When `false`, nothing plays until you call [`play()`](/api/methods#play) on the component ref.

## speed

- **Type:** `Number` · **Default:** `1`

Playback rate: `1` is normal speed, `2` double, `0.5` half. This is the only prop that's watched — updating the bound value changes the running animation immediately via `setSpeed`.

## Reactivity: what updates after mount {#reactivity-what-updates-after-mount}

Only `speed` is reactive. The animation is initialised once in `onMounted`, so later changes to `animationData`, `loop`, or `autoPlay` have no effect on the running animation.

To apply a new value for those props, force a remount with `:key`:

```vue
<script setup lang="ts">
import { ref } from "vue"
import { LottieAnimation } from "lottie-web-vue"
import AnimationJSON from "@/assets/animation.json"

const loop = ref(true)
const animKey = ref(0)

function setLoop(value: boolean) {
  loop.value = value
  animKey.value++ // remount the component so the new value takes effect
}
</script>

<template>
  <LottieAnimation :key="animKey" :animation-data="AnimationJSON" :loop="loop" />
</template>
```

## Attribute fallthrough

The component renders exactly one root `<div>` (which hosts the SVG). Classes, styles, and other attributes on `<LottieAnimation>` fall through to it — that's how you size and position the animation:

```vue
<LottieAnimation class="w-64 h-64" :animation-data="AnimationJSON" />
```

There are no slots.
