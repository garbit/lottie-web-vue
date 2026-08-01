import type { App, Plugin } from "vue"
import Component from "./components/lottie-web-vue.vue"

const LottieAnimation = Component as typeof Component & Plugin

LottieAnimation.install = (app: App) => {
  app.component("LottieAnimation", LottieAnimation)
}

export { LottieAnimation }
export default LottieAnimation
