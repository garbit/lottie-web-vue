<div style="text-align: center" align="center">
  <h1>Lottie-Web-Vue</h1>
  <img src="lottie-web-vue-animation.gif" style="width: 50%"/>
  
  [![npm](https://img.shields.io/npm/dt/lottie-web-vue.svg?style=flat-square)](https://www.npmjs.com/package/lottie-web-vue)
  ![npm](https://img.shields.io/npm/dw/lottie-web-vue)
  ![GitHub contributors](https://img.shields.io/github/contributors/garbit/lottie-web-vue?color=%23007ec6)
  [![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

  > Lottie-web-vue is an Airbnb Lottie-web component for Vue.js projects

  **📖 [Documentation & live demos → garbit.github.io/lottie-web-vue](https://garbit.github.io/lottie-web-vue/)**
</div>

*** 
Airbnb's [Lottie-web](https://github.com/airbnb/lottie-web) is a library for rendering animations exported from Adobe After Effects using the BodyMovin plugin. This package allows you to easily import animation files (available in .json format) into your Vue 3 project. TypeScript-ready and SSR-safe.

# Quick start

```bash
npm install lottie-web-vue
```

```vue
<script setup lang="ts">
import { LottieAnimation } from "lottie-web-vue"
import WatermelonJSON from "./assets/watermelon.json"
</script>

<template>
  <LottieAnimation :animation-data="WatermelonJSON" :auto-play="true" :loop="true" />
</template>
```

Full guides — installation, props, events, playback methods, CDN usage, and interactive examples — live on the **[documentation site](https://garbit.github.io/lottie-web-vue/)**:

- [Getting Started](https://garbit.github.io/lottie-web-vue/guide/getting-started)
- [Props](https://garbit.github.io/lottie-web-vue/api/props) · [Events](https://garbit.github.io/lottie-web-vue/api/events) · [Methods](https://garbit.github.io/lottie-web-vue/api/methods)
- [CDN / UMD usage](https://garbit.github.io/lottie-web-vue/guide/cdn-umd) — **⚠️ since 3.0.0 you must load `lottie-web` before the UMD build**
- [Migrating from 2.x](https://garbit.github.io/lottie-web-vue/guide/migrating)

# Vue 2

Vue 2 projects should use `v1.2.1` of the plugin (no longer maintained) — this package targets Vue 3:

```bash
npm install lottie-web-vue@1.2.1
```

# Development

Requires Node >= 22 (see [.nvmrc](.nvmrc) — `nvm use` picks it up). Dependency updates arrive weekly via Dependabot and are gated by the full CI suite.

```bash
npm install          # install dependencies
npm run dev          # demo app with hot reload
npm run test         # unit tests (Vitest + @vue/test-utils)
npm run test:watch   # unit tests in watch mode
npm run build        # build the library into dist/
npm run test:pack    # pack the tarball + install it into a throwaway consumer and verify it
npm run test:e2e     # browser E2E: playground app consuming the packed tarball (Playwright)
npm run verify       # everything: lint + typecheck + test + build + test:pack + test:e2e
npm run docs:dev     # documentation site (VitePress) with hot reload
npm run docs:build   # build the documentation site
```

First E2E run needs a browser: `npx playwright install chromium`.

The documentation site lives in [docs/](docs/) and deploys to GitHub Pages automatically on push to `main` via the [docs workflow](.github/workflows/docs.yml).

# Contributing

PRs welcome! Please make sure `npm run verify` passes locally. CI runs the same checks (lint, typecheck, unit tests, build, package smoke test, browser E2E) on every pull request.

# Releasing (maintainers)

Releases are automated via GitHub Actions and published to npm with provenance:

1. Update the version: `npm version 3.x.x --no-git-tag-version`, update [CHANGELOG.md](CHANGELOG.md), commit.
2. Verify locally: `npm run verify`.
3. Tag and push: `git tag v3.x.x && git push --follow-tags`.
4. The [release workflow](.github/workflows/release.yml) re-runs the full verification and publishes to npm. Prerelease tags (e.g. `v3.1.0-rc.0`) publish under the `next` dist-tag; stable tags publish as `latest`.

The workflow fails if the tag doesn't match `package.json`'s version. To test a release end-to-end without touching `latest`, cut an `-rc` prerelease first and `npm install lottie-web-vue@next` in a scratch project.
