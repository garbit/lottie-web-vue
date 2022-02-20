import { createApp } from "vue";
import App from "./App.vue";
import LottieAnimation from "./LottieAnimation";

const app = createApp(App);

app.use(LottieAnimation);

app.mount("#app");
