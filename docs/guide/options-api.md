---
description: "Use lottie-web-vue with the Vue Options API: component registration, this.$refs playback control, and event handlers."
---

# Options API

Prefer the Options API? Register the component in `components` and drive playback through `this.$refs`:

```vue
<template>
  <div id="app">
    <LottieAnimation
      ref="anim"
      :animation-data="animationJson"
      :loop="true"
      :auto-play="false"
      @loop-complete="onLoopComplete"
      @complete="onComplete"
    />
  </div>
</template>

<script>
import { LottieAnimation } from "lottie-web-vue"
import animationJson from "@/assets/animation.json"

export default {
  components: {
    LottieAnimation,
  },
  data() {
    return { animationJson }
  },
  mounted() {
    this.$refs.anim.play()
  },
  methods: {
    onLoopComplete() {
      console.log("loopComplete")
    },
    onComplete() {
      console.log("complete")
    },
  },
}
</script>
```

All [methods](/api/methods) are available on the ref: `this.$refs.anim.play()`, `.pause()`, `.stop()`, `.setSpeed(2)`, `.setDirection(-1)`, `.goToAndPlay(150, true)`, `.goToAndStop(60, true)`, `.getDuration(false)`, `.destroy()`.

If you registered the component globally with `app.use(LottieAnimation)` (see [Getting Started](/guide/getting-started#global-registration-plugin)), you can skip the `components` block entirely.
