<script setup lang="ts">
import { ref, onMounted } from "vue"
import { LottieAnimation } from "lottie-web-vue"
import WatermelonJSON from "../../../../src/assets/watermelon.json"

const anim = ref<InstanceType<typeof LottieAnimation>>()
const duration = ref(0)
const durationFrames = ref(0)
const direction = ref<1 | -1>(1)

onMounted(() => {
  duration.value = anim.value?.getDuration(false) ?? 0
  durationFrames.value = anim.value?.getDuration(true) ?? 0
})

function toggleDirection() {
  direction.value = direction.value === 1 ? -1 : 1
  anim.value?.setDirection(direction.value)
  anim.value?.play()
}
</script>

<template>
  <div class="demo-box">
    <div class="demo-stage">
      <LottieAnimation ref="anim" :animation-data="WatermelonJSON" :auto-play="true" :loop="true" />
    </div>
    <div class="demo-controls">
      <button @click="anim?.play()">play()</button>
      <button @click="anim?.pause()">pause()</button>
      <button @click="anim?.stop()">stop()</button>
      <button @click="toggleDirection()">setDirection({{ direction === 1 ? -1 : 1 }})</button>
      <button @click="anim?.goToAndStop(60, true)">goToAndStop(60, true)</button>
      <button @click="anim?.goToAndPlay(150, true)">goToAndPlay(150, true)</button>
    </div>
    <p class="demo-meta">
      getDuration(false) → {{ duration.toFixed(2) }}s · getDuration(true) → {{ durationFrames }} frames
    </p>
  </div>
</template>
