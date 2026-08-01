---
description: "Migrate to lottie-web-vue 3.0.0: UMD script order, Vue peer dependency, fixed default import and plugin registration, known reactivity limitations, and Vue 2 guidance."
---

# Migrating from 2.x

`3.0.0` is a packaging-focused release. **If you use a bundler (Vite, webpack, etc.), upgrading is a no-op** — install the new version and you're done:

```bash
npm install lottie-web-vue@latest
```

## Breaking changes

### UMD / CDN users: load lottie-web first

`lottie-web` is no longer bundled into the library output (the package went from ~752 kB to ~21 kB unpacked). If you consume the UMD build via a `<script>` tag, load `lottie-web` first so the `lottie` global exists — see [CDN / UMD Usage](/guide/cdn-umd#script-order).

### Vue is now a peer dependency

`vue` moved from `dependencies` to `peerDependencies` (`^3.3.0`). npm 7+ installs peers automatically; this stops a second copy of Vue being installed into your project. No action needed unless you're on npm 6.

### Node >= 22 to build

Only affects contributors building the library itself — the published dist files are plain ES2020 and run anywhere Vue 3 does.

## Fixed in 3.0.0

Things that were broken in 2.0.7 and now work:

- **Default import**: `import LottieAnimation from "lottie-web-vue"` was `undefined` in 2.0.7 (despite the type declarations saying otherwise). Both default and named imports now work.
- **Plugin registration**: `app.use(LottieAnimation)` now actually registers `<LottieAnimation>` globally — the `install()` existed in 2.x source but was unreachable from the package entry.
- **Reactive `speed`**: changing the `speed` prop now applies to the running animation (previously read once at mount and ignored).
- **Double-destroy on unmount** fixed; stray files removed from the npm tarball; unused `path` dependency removed.

## Known limitations

Changing `animationData`, `loop`, or `autoPlay` after mount does **not** re-initialise the animation (unchanged from 2.x). Remount with a `:key` to apply new values — see [Props → Reactivity](/api/props#reactivity-what-updates-after-mount).

## Vue 2

Vue 2 projects should stay on the final 1.x release, which is no longer maintained:

```bash
npm install lottie-web-vue@1.2.1
```

```js
import Vue from "vue"
import LottieAnimation from "lottie-web-vue"

Vue.use(LottieAnimation)

new Vue({
  render: (h) => h(App),
}).$mount("#app")
```
