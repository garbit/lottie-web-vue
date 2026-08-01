import { createApp } from "vue"
// Default import + app.use() on purpose: this exercises the exact export
// surface that was broken in 2.0.7.
import LottieAnimation from "lottie-web-vue"
import App from "./App.vue"

createApp(App).use(LottieAnimation).mount("#app")
