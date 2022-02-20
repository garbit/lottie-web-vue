<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import Lottie from "lottie-web";

const animation = ref<Element>();

let anim = ref();

const props = defineProps({
  animationData: { type: Object, required: true },
  loop: { type: [Number, Boolean], default: false },
  autoPlay: { type: Boolean, default: true },
  speed: { type: Number, default: 1 },
});

const emit = defineEmits<{
  (e: "complete"): void;
  (e: "loopComplete"): void;
  (e: "enterFrame"): void;
  (e: "segmentStart"): void;
}>();

onMounted(() => {
  if (animation.value) init(animation.value);
});

function init(container: Element) {
  anim.value = Lottie.loadAnimation({
    container: container,
    renderer: "svg",
    loop: props.loop,
    autoplay: props.autoPlay,
    animationData: JSON.parse(JSON.stringify(props.animationData)),
  });

  anim.value.addEventListener("loopComplete", () => {
    emit("loopComplete");
  });
  anim.value.addEventListener("complete", () => {
    emit("complete");
  });
  anim.value.addEventListener("enterFrame", () => {
    emit("enterFrame");
  });
}

function play() {
  if (anim.value) anim.value.play();
}

function stop() {
  if (anim.value) anim.value.stop();
}

function pause() {
  if (anim.value) anim.value.pause();
}

onBeforeUnmount(() => {
  if (anim.value) anim.value.destroy();
});

defineExpose({
  play,
  pause,
  stop,
});
</script>

<template>
  <div ref="animation"></div>
</template>

<style></style>
