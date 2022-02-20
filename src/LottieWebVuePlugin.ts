import type { App } from "vue";
import { LottieWebVue } from "./components";

export default {
  install: (app: App) => {
    app.component("LottieWebVue", LottieWebVue);
  },
};

export { LottieWebVue };
