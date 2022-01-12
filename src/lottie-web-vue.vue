<template>
  <div ref="animation"></div>
</template>
<script>
import lottie from 'lottie-web'

export default {
  props: {
    animationData: { type: [Object, String], required: true },
    loop: { type: [Boolean, Number], default: false },
    autoPlay: { type: Boolean, default: true },
    renderer: { type: String, default: 'svg' },
    speed: { type: Number, default: 1 },
  }, 
  data() {
    return {
      anim: null
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    if (this.anim) 
      this.anim.destroy()
  },
  methods: {
    init() {
      let settings = {
        container: this.$refs.animation,
        renderer: this.renderer,
        loop: this.loop,
        autoplay: this.autoPlay,
        animationData: this.animationData
      }

      this.anim = lottie.loadAnimation(settings)

      this.anim.addEventListener('loopComplete', () => {
        this.$emit('loopComplete', this.anim)
      })
      this.anim.addEventListener('complete', () => {
        this.$emit('complete', this.anim)
      })
      this.anim.addEventListener('enterFrame', () => {
        this.$emit('enterFrame', this.anim)
      })
    },
    play() {
      if(this.anim)
        this.anim.play()
    },
    stop() {
      if(this.anim)
        this.anim.stop()
    },
    pause() {
      if(this.anim)
        this.anim.pause()
    }
  }
}
</script>
