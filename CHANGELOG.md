# Changelog

## 3.0.0 (2026-08-01)

### Breaking

- **`lottie-web` is no longer bundled into the library output.** Bundler
  users (Vite, webpack, etc.) are unaffected — it is installed automatically
  as a dependency and resolved from `node_modules`. **UMD / CDN `<script>`
  users must now load `lottie-web` before this library** so the `lottie`
  global exists:
  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js"></script>
  <script src="https://unpkg.com/lottie-web-vue/dist/lottie-web-vue.umd.cjs"></script>
  ```
  This shrinks the published package from ~752 kB to ~21 kB unpacked and lets
  your bundler dedupe `lottie-web`.
- `vue` moved from `dependencies` to `peerDependencies` (`^3.3.0`). npm 7+
  installs peers automatically; this stops a second copy of Vue being
  installed into consumer projects.
- Node >= 22 is required to build the library (no runtime impact on the
  published dist files, which are plain ES2020).

### Fixed

- **Default import works again**: `import LottieAnimation from "lottie-web-vue"`
  was `undefined` in 2.0.7 (the shipped type declarations said otherwise).
- **`app.use(LottieAnimation)` now registers the component globally** — the
  plugin `install()` previously existed in the source but was unreachable
  from the package entry.
- The npm tarball no longer ships stray files (`dist/vite.svg`,
  `dist/components/HelloWorld.vue.d.ts`).
- The animation is destroyed exactly once on unmount (a duplicate
  `onBeforeUnmount` previously ran `destroy()` twice).
- Changing the `speed` prop now applies to the running animation via
  `setSpeed` (previously it was read once at mount and ignored afterwards).
- Removed the unused `path` runtime dependency.

### Internal

- Test suite added: 28 unit tests (Vitest + @vue/test-utils), a
  pack-and-install smoke test against the real tarball, and a Playwright
  browser E2E running a playground app that consumes the packed tarball.
- Tag-triggered GitHub Actions release with npm provenance via OIDC
  Trusted Publishing; CI on Node 20/22/24.
- Toolchain: Vite 7, TypeScript 5.9, vue-tsc 3, vite-plugin-dts.

### Known limitations

- Changing `animationData`, `loop`, or `autoPlay` after mount does not
  re-initialise the animation (unchanged from 2.x). Planned for a future
  release.

## 2.0.7 (2023-06-18)

Last 2.x release. See git history for earlier changes.
