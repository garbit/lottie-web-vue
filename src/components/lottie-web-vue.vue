<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import Lottie, {
  type AnimationDirection,
  type AnimationItem,
} from "lottie-web";

const animation = ref<Element>();

let anim = ref<AnimationItem>();

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
  (e: "stopped"): void;
}>();

onMounted(() => {
  if (animation.value) init(animation.value);
});

onBeforeUnmount(() => {
  destroy();
});

function init(container: Element) {
  anim.value = Lottie.loadAnimation({
    container: container,
    renderer: "svg",
    loop: props.loop,
    autoplay: props.autoPlay,
    animationData: JSON.parse(JSON.stringify(props.animationData)),
  });

  anim.value.setSpeed(props.speed);

  anim.value.addEventListener("loopComplete", () => {
    emit("loopComplete");
  });
  anim.value.addEventListener("complete", () => {
    emit("complete");
  });
  anim.value.addEventListener("enterFrame", () => {
    emit("enterFrame");
  });
  anim.value.addEventListener("segmentStart", () => {
    emit("segmentStart");
  });
}

function play(): void {
  if (anim.value) anim.value.play();
}

function stop(): void {
  if (anim.value) anim.value.stop();
}

function pause(): void {
  if (anim.value) anim.value.pause();
}

function setSpeed(speed: number): void {
  if (anim.value) anim.value.setSpeed(speed);
}

function setDirection(direction: AnimationDirection) {
  if (anim.value) anim.value.setDirection(direction);
}

function getDuration(inFrames: boolean): number {
  if (anim.value) return anim.value.getDuration(inFrames);
  return 0;
}

function goToAndStop(position: number, isFrame: boolean): void {
  if (anim.value) {
    anim.value.goToAndStop(position, isFrame);
    emit("stopped");
  }
}

function goToAndPlay(position: number, isFrame: boolean): void {
  if (anim.value) anim.value.goToAndPlay(position, isFrame);
}

function destroy(): void {
  if (anim.value) anim.value.destroy();
}

onBeforeUnmount(() => {
  if (anim.value) anim.value.destroy();
});

defineExpose({
  play,
  pause,
  stop,
  setSpeed,
  setDirection,
  getDuration,
  goToAndStop,
  goToAndPlay,
  destroy,
});
</script>

<template>
  <div ref="animation"></div>
</template>

<style></style>
