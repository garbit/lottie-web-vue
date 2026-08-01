<script setup lang="ts">
import { ref } from "vue"
import { LottieAnimation } from "lottie-web-vue"
import WatermelonJSON from "../../../../src/assets/watermelon.json"

const anim = ref<InstanceType<typeof LottieAnimation>>()
const log = ref<string[]>([])
let frameCount = 0

function record(event: string) {
  log.value.unshift(`@${event}`)
  if (log.value.length > 8) log.value.pop()
}

// enterFrame fires ~60x/second — sample it so the log stays readable
function onEnterFrame() {
  frameCount++
  if (frameCount % 60 === 0) record(`enterFrame (×${frameCount})`)
}
</script>

<template>
  <div class="demo-box">
    <div class="demo-stage">
      <LottieAnimation
        ref="anim"
        :animation-data="WatermelonJSON"
        :auto-play="true"
        :loop="true"
        @loop-complete="record('loopComplete')"
        @complete="record('complete')"
        @enter-frame="onEnterFrame"
        @segment-start="record('segmentStart')"
        @stopped="record('stopped')"
      />
    </div>
    <div class="demo-controls">
      <button @click="anim?.goToAndStop(0, true)">goToAndStop(0, true) — emits @stopped</button>
      <button @click="anim?.play()">play()</button>
    </div>
    <div class="demo-log" aria-live="polite">
      <div v-if="log.length === 0">Waiting for events…</div>
      <div v-for="(entry, i) in log" :key="log.length - i">{{ entry }}</div>
    </div>
  </div>
</template>
