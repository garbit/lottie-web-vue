<div style="text-align: center" align="center">
  <h1>Lottie-Web-Vue</h1>
  <img src="lottie-web-vue-animation.gif" style="width: 50%"/>
  
  [![npm](https://img.shields.io/npm/dt/lottie-web-vue.svg?style=flat-square)](https://www.npmjs.com/package/lottie-web-vue)
  ![npm](https://img.shields.io/npm/dw/lottie-web-vue)
  ![GitHub contributors](https://img.shields.io/github/contributors/garbit/lottie-web-vue?color=%23007ec6)
  [![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

  > Lottie-web-vue is an Airbnb Lottie-web component for Vue.js projects
</div>

*** 
Airbnb's [Lottie-web](https://github.com/airbnb/lottie-web) is a library for rendering animations exported from Adobe After Effects using the BodyMovin plugin. This package allows you to easily import animation files (available in .json format) into your Vue.js project.

# Vue 3 + Typescript Support
```lottie-web-vue``` supports Vue 3 + Typescript typing. If you are using Vue 2.x **ensure to use version 1.2.1** (see below)

```js
npm install lottie-web-vue
```

# ⚠️ Breaking change in 3.0.0 (UMD / CDN users only)
`lottie-web` is no longer bundled into the library output — the published package went from ~752 kB to ~21 kB. **If you consume the UMD build via a `<script>` tag you must load `lottie-web` first** so the `lottie` global exists:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js"></script>
<script src="https://unpkg.com/lottie-web-vue/dist/lottie-web-vue.umd.cjs"></script>
```

If you use a bundler (Vite, webpack, etc.) nothing changes — `lottie-web` is installed automatically and resolved from `node_modules`. See [CHANGELOG.md](CHANGELOG.md) for the full list of changes.

# Vue 2
Please install ```v1.2.1``` of the plugin. This plugin will focus on maintaining Vue 3 now that it has been officially released.

```js
npm install lottie-web-vue@1.2.1 
```

<br />

# Animations
You can browse and download animations from [LottieFiles](https://lottiefiles.com/). First, find an animation you like > signup > click `export JSON` and save to your project. In vue you can save these under `assets` and then use `require('@/assets/animation.json')` to load them into the `LottieAnimator` as part of the `lottie-web-vue` component.

Example: [https://lottiefiles.com/38726-stagger-rainbow](https://lottiefiles.com/38726-stagger-rainbow)

<p align="center">
  <img src="lottie-file.png" style="width: 50%" />
</p>

<br />
<br />

# Installation
Add lottie-web-vue to your Vue 3.x project package using:
```bash
npm install --save lottie-web-vue
```
or
```
yarn add lottie-web-vue
```

To use Vue 2.x use:
```js
npm install lottie-web-vue@1.2.1 
```

## Vue 2.x
Please install ```v1.2.1``` of the plugin (this will no longer be maintained)
```js
import Vue from 'vue'
import LottieAnimation from 'lottie-web-vue'
 
Vue.use(LottieAnimation); // add lottie-animation to your global scope
 
new Vue({
  render: h => h(App)
}).$mount('#app')
```
<br />

# Usage

## Global registration (plugin)
Register the component once for the whole app with `app.use()`:

```js
import { createApp } from 'vue'
import LottieAnimation from 'lottie-web-vue'
import App from './App.vue'

createApp(App)
  .use(LottieAnimation) // <LottieAnimation> is now available in every component
  .mount('#app')
```

## Local registration
Basic:
```html
<script setup lang="ts">
  import { onMounted, ref } from "vue"
  import { LottieAnimation } from "lottie-web-vue"
  import WatermelonJSON from "./assets/watermelon.json"

  let anim = ref()

  onMounted(() => {
    setTimeout(() => {
      console.log(anim.value.goToAndPlay(150, true))
      anim.value
    }, 500)
  })
</script>
<template>
  <LottieAnimation 
    :animation-data="WatermelonJSON"
    :auto-play="true"
    :loop="true"
    :speed="1"
    ref="anim" />
</template>
```

Full available props and events:
```html
<script setup>
  import { onMounted, ref } from "vue"
import { LottieAnimation } from "lottie-web-vue"
import WatermelonJSON from "./assets/watermelon.json"

let anim = ref()

onMounted(() => {
  setTimeout(() => {
    console.log(anim.value.goToAndPlay(150, true))
    anim.value
  }, 500)
})

// called after each loop
const loopComplete = () => {
  console.log('Loop complete')
}

// called after first loop
const complete = () => {
  console.log('First loop complete')
}

// called after first frame entered
const enterFrame = () => {
  console.log('Entered first frame')
}

// called after segment started
const segmentStart = () => {
  console.log('Segment started')
}

// called after animation stopped
const stopped = () => {
  console.log('Stopped')
}
</script>
<template>
  <LottieAnimation
    ref="anim"
    :animation-data="WatermelonJSON"
    :loop="true"
    :auto-play="true"
    :speed="1"
    @loopComplete="loopComplete"
    @complete="complete"
    @enterFrame="enterFrame"
    @segmentStart="segmentStart"
    @stopped="stopped"/>
</template>
```

## Props
The component has a number of props you can use to control the animation playback.

**You must pass animationData** to load the animation prior to the component being played.

### animationData
Type: `Object`<br />
Required: `true`<br />

Include animation data from an import or require statement that imports the `.json` file from your assets folder. e.g. `require('@/assets/animation.json')` (save you animation as a.json file and put under src/assets in your project)

### loop
Type: `[Boolean, Number]`<br />
Required: `false`<br />
Default: `false`

`True`: Animation continously loops
`False`: Animation plays only once
`[number e.g. 3]`: Animation plays N number of times before stopping (pass an integer)

### autoPlay
Type: `Boolean`<br />
Required: `false`<br />
Default: `true`

`True`: Animation will play as soon as it has finished loading
`False`: Animation will play only when you call `this.$refs.lottieAnimation.play()` (see below for playback controls)

### speed
Type: `Number`<br />
Required: `false`<br />
Default: `1`

The speed that the animation will play back.
<br />

## Events
You can listen for events emitted by the component by using the `@` syntax, passing in the parent method you wish to trigger. For more documentation about the Lottie-web events see [here](https://github.com/airbnb/lottie-web#events).

### @loopComplete
Fired once a complete loop of the animation has occurred

### @complete
Fired once the animation has completed (only fired when loop = false)

### @enterFrame
As each frame is played this event is fired. Warning - this fires very frequently.

### @segmentStart
Event is fired when the animation enters each animation segment.

### @stopped
Playing the animation using ```goToAndStop()``` function will raise an event once the animation has stopped at the designated frame.
<br />

## Methods
You can call animation playback methods directly on the component if you wish to trigger playback on an event (i.e. when a user clicks the button, play the animation). You need to use the `this.$refs` syntax and give your LottieAnimation a `ref` id to use in the `this.$refs.[your-name-here]`.

```html
<script setup>
  import { LottieAnimation } from "lottie-web-vue"
  import WatermelonJSON from "./assets/watermelon.json"
</script>
<template>
  <LottieAnimation
    ref="anim"
    :animationData="animation"
  />
</template>
```
Once your component (in the parent view) has a `ref` id you can then use this in a method of your choosing:

```html
... // in your parent .vue file
<script setup lang="ts">
  const buttonClicked = () => {
    this.$refs.anim.play() // .play, .pause, .stop available
  }
</script>
```
### Play
Using `this.$refs.anim.play()` will play the animation. 

### Pause
Using `this.$refs.anim.pause()` will pause the animation. 

### Stop
Using `this.$refs.anim.stop()` will stop the animation. 

### setSpeed [number: speed]
Using ```this.$refs.anim.setSpeed(2)``` you can set the playback speed to ```2```. Default speed is set to 1.
- number: Set the speed playback rate

### goToAndStop [Position: frame number or seconds, isFrame: boolean]
Using ```this.$refs.anim.goToAndStop(10, true``` you can set the specific frame you wish the animation to stop at. Pass in the frame number or seconds to play and if the first value is a frame or a time as true/false. This function will raise an emit (add @stopped="Yourfunction()" to your lottie-animation listen for it).
- position: numeric value (specific frame number or second to stop)
- isFrame: defines if first argument is a time based value or a frame based (default false).

### goToAndPlay [Position: frame number or seconds, isFrame: boolean]
Using ```this.$refs.anim.goToAndPlay(50, true)``` allows you to specify the start time of the animation in either frame number (passing isFrame true/false if value is a frame or in seconds).
- position: numeric value (specific frame number or second to stop)
- isFrame: defines if first argument is a time based value or a frame based (default false).
### setDirection [Direction: -1: reverse, 1: forwards]
Using ```this.$refs.anim.setDirection(-1)``` you can reverse your animation. You can pass in either ```AnimationDirection.``` to reverse the animation or ```1``` to play forwards. Default playback is ```1```.
- Direction:
  - -1 (reverse playback)
  - 1 (play forwards)

### getDuration [inFrames: true/false]
Using ```this.$refs.anim.getDuration(true)``` you can retrieve the current duration of the animation in frames or seconds (false). If you pass true, function returns duration in frames, if false, duration is passed back in seconds. Default is false (returned in seconds).
- inFrames: boolean to request current duration in either frames (inFrames: true) or in seconds (inFrames: false)
### destroy
Using ```this.$refs.anim.destroy()``` you can destroy the animation from the DOM.

<br />

## Options API Example
See here for an example:
```html
<template>
  <div id="app">
    <LottieAnimation
      ref="anim"
      :animationData="require('@/assets/animation.json')"
      :loop="true"
      :autoPlay="true"
      @loopComplete="loopComplete"
      @complete="complete"
      @enterFrame="enterFrame"
    />
  </div>
</template>

<script>
import LottieAnimation from 'lottie-web-vue'

export default {
  components: {
    LottieAnimation
  },
  mounted() {
    this.$refs.anim.play()
  },
  methods: {
    loopComplete() {
      console.log('loopComplete')
    },
    complete() {
      console.log('complete')
    },
    enterFrame() {
      console.log('enterFrame')
    }
  }
}
</script>
```
## Vue 3 Composition API with Setup + Typescript
To use this in a Vue 3 project that uses the ```setup``` Composition API use the following:

### Script setup
```html
<script setup lang="ts">
import { onMounted, ref } from "vue"
import { LottieAnimation } from "lottie-web-vue"
import WatermelonJSON from "./assets/watermelon.json"

let anim = ref()

onMounted(() => {
  setTimeout(() => {
    console.log(anim.value.goToAndPlay(150, true))
    anim.value
  }, 500)
})

</script>
<template>
  <LottieAnimation
    ref="anim"
    :animation-data="WatermelonJSON"
    :loop="true"
    :auto-play="true"
    :speed="1"
    @loopComplete="loopComplete"
    @complete="complete"
    @enterFrame="enterFrame"
    @segmentStart="segmentStart"
    @stopped="stopped"/>
</template>
```

<br />

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
```

First E2E run needs a browser: `npx playwright install chromium`.

# Contributing

PRs welcome! Please make sure `npm run verify` passes locally. CI runs the same checks (lint, typecheck, unit tests, build, package smoke test, browser E2E) on every pull request.

# Releasing (maintainers)

Releases are automated via GitHub Actions and published to npm with provenance:

1. Update the version: `npm version 3.x.x --no-git-tag-version`, update [CHANGELOG.md](CHANGELOG.md), commit.
2. Verify locally: `npm run verify`.
3. Tag and push: `git tag v3.x.x && git push --follow-tags`.
4. The [release workflow](.github/workflows/release.yml) re-runs the full verification and publishes to npm. Prerelease tags (e.g. `v3.1.0-rc.0`) publish under the `next` dist-tag; stable tags publish as `latest`.

The workflow fails if the tag doesn't match `package.json`'s version. To test a release end-to-end without touching `latest`, cut an `-rc` prerelease first and `npm install lottie-web-vue@next` in a scratch project.
