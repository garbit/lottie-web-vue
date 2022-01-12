<div style="text-align: center">
  <h1>Lottie-Web-Vue</h1>
  <img src="lottie-web-vue-animation.gif" style="height: 300px; width: 300px"/>
  
  [![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
  [![npm](https://img.shields.io/npm/dt/lottie-web-vue.svg?style=flat-square)](https://www.npmjs.com/package/lottie-web-vue)

  > Lottie-web-vue is an Airbnb Lottie-web component for Vue.js projects
</div>

*** 
Airbnb's [Lottie-web](https://github.com/airbnb/lottie-web) is a library for rendering animations exported from Adobe After Effects using the BodyMovin plugin. This package allows you to easily import animation files (available in .json format) into your Vue.js project.  

<br />

# Animations
You can browse and download animations from [LottieFiles](https://lottiefiles.com/). First, find an animation you like > signup > click `export JSON` and save to your project. In vue you can save these under `assets` and then use `require('@/assets/animation.json')` to load them into the `LottieAnimator` as part of the `lottie-web-vue` component.

Example: [https://lottiefiles.com/38726-stagger-rainbow](https://lottiefiles.com/38726-stagger-rainbow)

<img src="lottie-file.png" style="width: 300px"/>

<br />
<br />

# Installation
Add lottie-web-vue to your project package using:
```bash
npm install --save lottie-web-vue
```
or
```
yarn add lottie-web-vue
```

Add to global scope

```js
import Vue from 'vue'
import LottieAnimation from 'lottie-web-vue'
 
Vue.use(LottieAnimation); // add lottie-animation to your global scope
 
new Vue({
  render: h => h(App)
}).$mount('#app')
```

or

Add to view file

```html
<template>
  <div>
    <lottie-animation
      ref="anim"
      :animationData="require('@/assets/animation.json')"
    />
  </div>
</template>
<script>
import LottieAnimation from 'lottie-web-vue' // import lottie-web-vue
 
export default {
  components: {
      LottieAnimation
  },
  data: () => ({
    ...
  })
};
</script> 
```
<br />

# Usage
Basic:
```html
<lottie-animation
  ref="anim"
  :animationData="require('@/assets/animation.json')"
/>
```

Full available props and events:
```html
<lottie-animation
  ref="anim"
  :animationData="require('@/assets/animation.json')"
  :loop="false"
  :autoPlay="false"
  :speed="1"
  @loopComplete="loopComplete"
  @complete="complete"
  @enterFrame="enterFrame"
/>
```

## Props
The component has a number of props you can use to control the animation playback.

**You must pass animationData** to load the animation prior to the component being played.

### animationData
Type: `Object`<br />
Required: `true`<br />

Include animation data from a require statement that imports the `.json` file from your assets folder. e.g. `require('@/assets/animation.json')` (save you animation as a.json file and put under src/assets in your project)

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

<br />

## Playback Methods
You can call animation playback methods directly on the component if you wish to trigger playback on an event (i.e. when a user clicks the button, play the animation). You need to use the `this.$refs` syntax and give your LottieAnimation a `ref` id to use in the `this.$refs.[your-name-here]`.

```html
<lottie-animation
      ref="anim"
      :animationData="require('@/assets/animation.json')"
/>
```
Once your component (in the parent view) has a `ref` id you can then use this in a method of your choosing:

```js
... // in your parent .vue file
methods: {
  buttonClicked() {
    this.$refs.anim.play() // .play, .pause, .stop available
  }
}
```
### Play
Using `this.$refs.anim.play()` will play the animation. 

### Pause
Using `this.$refs.anim.pause()` will pause the animation. 

### Stop
Using `this.$refs.anim.stop()` will stop the animation. 

<br />

## Full example
See here for an example:
```html
<template>
  <div id="app">
    <lottie-animation
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

## Vue 3 Composition API with Setup
To use this in a Vue 3 project that uses the ```setup``` Composition API use the following:

```html
<template>
  <div id="app">
    <lottie-animation
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
import { onMounted, ref } from 'vue'

export default {
  components: {
      LottieAnimation
  },
  setup() {
    const anim = ref(null)

    const loopComplete = () => {
      console.log('loopComplete')
    }

    const complete = () => {
      console.log('complete')
    }

    const enterFrame = () => {
      console.log('enterFrame')
    }

    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      anim.value.play()
    })

    return {
      anim, 
      loopComplete,
      complete,
      enterFrame
    }
  }
}
</script>
```