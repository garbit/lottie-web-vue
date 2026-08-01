import { h } from "vue"
import DefaultTheme from "vitepress/theme"
import type { Theme } from "vitepress"
import BasicDemo from "./components/BasicDemo.vue"
import PropsDemo from "./components/PropsDemo.vue"
import MethodsDemo from "./components/MethodsDemo.vue"
import EventsDemo from "./components/EventsDemo.vue"
import NavLogo from "./components/NavLogo.vue"
import "./custom.css"

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // live watermelon Lottie animation as the navbar logo
      "nav-bar-title-before": () => h(NavLogo),
    })
  },
  enhanceApp({ app }) {
    app.component("BasicDemo", BasicDemo)
    app.component("PropsDemo", PropsDemo)
    app.component("MethodsDemo", MethodsDemo)
    app.component("EventsDemo", EventsDemo)
  },
} satisfies Theme
