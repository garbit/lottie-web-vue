<script setup lang="ts">
import { ref } from "vue"
import WatermelonJSON from "./assets/watermelon.json"

// <LottieAnimation> is globally registered via app.use() in main.ts —
// deliberately not imported here, so the E2E proves plugin registration.
const anim = ref()
const loops = ref(0)
const frames = ref(0)
</script>

<template>
  <LottieAnimation
    ref="anim"
    class="lottie-box"
    data-testid="lottie"
    :animation-data="WatermelonJSON"
    :loop="true"
    :auto-play="true"
    :speed="10"
    @loop-complete="loops++"
    @enter-frame="frames++"
  />
  <div data-testid="loop-count">{{ loops }}</div>
  <div data-testid="frame-count">{{ frames }}</div>
  <button data-testid="play" @click="anim.play()">play</button>
  <button data-testid="pause" @click="anim.pause()">pause</button>
  <button data-testid="go-to-and-stop" @click="anim.goToAndStop(10, true)">goToAndStop</button>
</template>

<style>
.lottie-box {
  width: 400px;
  height: 400px;
}
</style>
