---
description: "lottie-web-vue events reference: @complete, @loopComplete, @enterFrame, @segmentStart, and @stopped — when each fires, with a live event log demo."
---

# Events

The component forwards lottie-web's playback events as Vue emits. Bind them with `@` (kebab-case in templates). None of them carry a payload.

<ClientOnly><EventsDemo /></ClientOnly>

| Event | Fires |
| --- | --- |
| [`@complete`](#complete) | when playback finishes (only when `loop` is `false`) |
| [`@loopComplete`](#loopcomplete) | at the end of each loop |
| [`@enterFrame`](#enterframe) | on every rendered frame — very frequently |
| [`@segmentStart`](#segmentstart) | when a new animation segment begins |
| [`@stopped`](#stopped) | after [`goToAndStop()`](/api/methods#gotoandstop) lands on its frame |

```vue
<script setup lang="ts">
import { LottieAnimation } from "lottie-web-vue"
import AnimationJSON from "@/assets/animation.json"

function onLoopComplete() {
  console.log("loop finished")
}
</script>

<template>
  <LottieAnimation
    :animation-data="AnimationJSON"
    :loop="true"
    @loop-complete="onLoopComplete"
  />
</template>
```

## @complete {#complete}

Fired once the animation has completed. Only fires when `loop` is `false` — a continuously looping animation never completes.

## @loopComplete {#loopcomplete}

Fired each time a full loop of the animation finishes.

## @enterFrame {#enterframe}

Fired on every frame as it renders. **Warning:** this fires at the animation's frame rate (typically 60×/second) — keep handlers cheap, or throttle.

## @segmentStart {#segmentstart}

Fired when the animation enters a new segment.

## @stopped {#stopped}

Fired by this component (not lottie-web) after a [`goToAndStop()`](/api/methods#gotoandstop) call has positioned the animation on its target frame.

For lottie-web's underlying event documentation, see the [lottie-web README](https://github.com/airbnb/lottie-web#events).
