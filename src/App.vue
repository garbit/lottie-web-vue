<script setup lang="ts">
import { ref } from "vue";
import WatermelonJSON from "./assets/watermelon.json";

let anim = ref();
</script>

<template>
  <lottie-web-vue
    :animation-data="WatermelonJSON"
    :auto-play="true"
    :loop="true"
    :speed="1"
    ref="anim"
  />
</template>

<style></style>
