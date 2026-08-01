<script setup lang="ts">
import { LottieAnimation } from "lottie-web-vue"
import WatermelonJSON from "../../../../src/assets/watermelon.json"
</script>

<template>
  <div class="demo-box">
    <div class="demo-stage">
      <LottieAnimation :animation-data="WatermelonJSON" :auto-play="true" :loop="true" />
    </div>
  </div>
</template>
