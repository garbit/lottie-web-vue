import { createApp } from "vue";
import App from "./App.vue";
import LottieWebVuePlugin from "./LottieWebVuePlugin";

const app = createApp(App);

app.use(LottieWebVuePlugin);

app.mount("#app");
