import type { App } from "vue";
import { LottieAnimation } from "./components";

export default {
  install: (app: App) => {
    app.component("LottieAnimation", LottieAnimation);
  },
};

export { LottieAnimation };
