<script setup lang="ts">
import { ref } from "vue"
import { LottieAnimation } from "lottie-web-vue"
import WatermelonJSON from "../../../../src/assets/watermelon.json"

const speed = ref(1)
const loop = ref(true)
const autoPlay = ref(true)

// loop and autoPlay are not reactive after mount — remount via :key to apply them.
// speed IS watched by the component, so the slider applies live without a remount.
const remountKey = ref(0)

function applyLoop(value: boolean) {
  loop.value = value
  remountKey.value++
}

function applyAutoPlay(value: boolean) {
  autoPlay.value = value
  remountKey.value++
}
</script>

<template>
  <div class="demo-box">
    <div class="demo-stage">
      <LottieAnimation
        :key="remountKey"
        :animation-data="WatermelonJSON"
        :auto-play="autoPlay"
        :loop="loop"
        :speed="speed"
      />
    </div>
    <div class="demo-controls">
      <label>
        speed: {{ speed.toFixed(1) }}
        <input type="range" min="0.1" max="3" step="0.1" v-model.number="speed" />
      </label>
      <label>
        loop
        <input type="checkbox" :checked="loop" @change="applyLoop(($event.target as HTMLInputElement).checked)" />
      </label>
      <label>
        autoPlay
        <input type="checkbox" :checked="autoPlay" @change="applyAutoPlay(($event.target as HTMLInputElement).checked)" />
      </label>
    </div>
    <p class="demo-meta">
      <code>speed</code> applies live (it is watched). <code>loop</code> / <code>autoPlay</code> remount the
      component via <code>:key</code> — see the note on reactivity below.
    </p>
  </div>
</template>
