<script setup lang="ts">
import { onMounted, ref } from "vue"
import WatermelonJSON from "./assets/watermelon.json"
import LottieAnimation from './components/lottie-web-vue.vue'

let anim = ref()

onMounted(() => {
  setTimeout(() => {
    console.log(anim.value.goToAndPlay(150, true))
    anim.value
  }, 500)
})
</script>

<template>
  <LottieAnimation :animation-data="WatermelonJSON" :auto-play="true" :loop="true" :speed="1" ref="anim" />
</template>

<style scoped></style>
