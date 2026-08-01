---
description: "lottie-web-vue methods reference: play, pause, stop, setSpeed, setDirection, getDuration, goToAndStop, goToAndPlay, and destroy — called via a template ref, with a live demo."
---

# Methods

Playback methods are exposed on the component instance. Give the component a template ref and call them from your code:

```vue
<script setup lang="ts">
import { ref } from "vue"
import { LottieAnimation } from "lottie-web-vue"
import AnimationJSON from "@/assets/animation.json"

const anim = ref<InstanceType<typeof LottieAnimation>>()

function onButtonClick() {
  anim.value?.play()
}
</script>

<template>
  <button @click="onButtonClick">Play</button>
  <LottieAnimation ref="anim" :animation-data="AnimationJSON" :auto-play="false" />
</template>
```

(Options API: same methods via `this.$refs.anim.play()` — see the [Options API guide](/guide/options-api).)

Try them live:

<ClientOnly><MethodsDemo /></ClientOnly>

All methods are safe to call before the animation has initialised — they no-op (and `getDuration` returns `0`).

## play()

Starts or resumes playback from the current frame.

## pause()

Pauses playback, holding the current frame. Resume with `play()`.

## stop()

Stops playback and rewinds to the first frame.

## setSpeed(speed)

- **speed** `number` — playback rate; `1` is normal, `2` double, `0.5` half.

Sets the playback speed of the running animation. Equivalent to updating the reactive [`speed` prop](/api/props#speed).

## setDirection(direction)

- **direction** `1 | -1` — `1` plays forwards, `-1` plays in reverse.

Sets the playback direction. The parameter is lottie-web's `AnimationDirection` type.

```ts
anim.value?.setDirection(-1) // play backwards
anim.value?.play()
```

## getDuration(inFrames)

- **inFrames** `boolean` — `true` returns the duration in frames, `false` in seconds.
- **Returns** `number` — `0` if the animation hasn't initialised yet.

```ts
const seconds = anim.value?.getDuration(false) // e.g. 4.2
const frames = anim.value?.getDuration(true)   // e.g. 252
```

## goToAndStop(position, isFrame) {#gotoandstop}

- **position** `number` — target position: a frame number or a time in seconds.
- **isFrame** `boolean` — `true` treats `position` as a frame number, `false` as seconds.

Jumps to the given position and stops there. Emits [`@stopped`](/api/events#stopped) once positioned.

```ts
anim.value?.goToAndStop(60, true) // stop parked on frame 60
```

## goToAndPlay(position, isFrame) {#gotoandplay}

- **position** `number` — start position: a frame number or a time in seconds.
- **isFrame** `boolean` — `true` treats `position` as a frame number, `false` as seconds.

Jumps to the given position and plays from there.

```ts
anim.value?.goToAndPlay(150, true) // play from frame 150
```

## destroy()

Removes the animation from the DOM and releases lottie-web's resources. You rarely need this — **the component calls `destroy()` automatically when it unmounts.**
