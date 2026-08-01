import { describe, it, expect, vi, beforeEach } from "vitest"
import { mount } from "@vue/test-utils"
import LottieAnimation from "../src/components/lottie-web-vue.vue"
import { mockLoadAnimation, currentAnim } from "./lottie-mock"
import watermelon from "../src/assets/watermelon.json"

vi.mock("lottie-web", () => ({
  default: { loadAnimation: (options: unknown) => mockLoadAnimation(options) },
}))

beforeEach(() => {
  mockLoadAnimation.mockClear()
})

function mounted() {
  return mount(LottieAnimation, { props: { animationData: watermelon } })
}

describe("exposed methods delegate to the AnimationItem", () => {
  it("play()", () => {
    mounted().vm.play()
    expect(currentAnim.play).toHaveBeenCalledTimes(1)
  })

  it("pause()", () => {
    mounted().vm.pause()
    expect(currentAnim.pause).toHaveBeenCalledTimes(1)
  })

  it("stop()", () => {
    mounted().vm.stop()
    expect(currentAnim.stop).toHaveBeenCalledTimes(1)
  })

  it("setSpeed(speed)", () => {
    mounted().vm.setSpeed(3)
    expect(currentAnim.setSpeed).toHaveBeenCalledWith(3)
  })

  it("setDirection(direction)", () => {
    mounted().vm.setDirection(-1)
    expect(currentAnim.setDirection).toHaveBeenCalledWith(-1)
  })

  it("getDuration(inFrames) returns the AnimationItem value", () => {
    expect(mounted().vm.getDuration(true)).toBe(4.2)
    expect(currentAnim.getDuration).toHaveBeenCalledWith(true)
  })

  it("goToAndStop(position, isFrame)", () => {
    mounted().vm.goToAndStop(30, true)
    expect(currentAnim.goToAndStop).toHaveBeenCalledWith(30, true)
  })

  it("goToAndPlay(position, isFrame)", () => {
    mounted().vm.goToAndPlay(150, false)
    expect(currentAnim.goToAndPlay).toHaveBeenCalledWith(150, false)
  })

  it("destroy()", () => {
    const wrapper = mounted()
    wrapper.vm.destroy()
    expect(currentAnim.destroy).toHaveBeenCalledTimes(1)
  })
})

describe("uninitialised guards (before onMounted ran)", () => {
  // The guarded state is "setup ran, init hasn't" — reachable in real apps
  // between setup and mount (or under SSR). Reproduce it by invoking the
  // compiled SFC's setup() directly and capturing what defineExpose exposed;
  // onMounted never fires outside a component instance, so anim stays unset.
  type Exposed = {
    play(): void
    pause(): void
    stop(): void
    setSpeed(speed: number): void
    setDirection(direction: 1 | -1): void
    getDuration(inFrames: boolean): number
    goToAndStop(position: number, isFrame: boolean): void
    goToAndPlay(position: number, isFrame: boolean): void
    destroy(): void
  }

  function preMountExposed(): Exposed {
    // Lifecycle registration outside an instance triggers Vue warnings; hush them.
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
    let exposed: Exposed | undefined
    const setup = (LottieAnimation as unknown as {
      setup: (props: object, ctx: object) => unknown
    }).setup
    setup(
      { animationData: watermelon, loop: false, autoPlay: true, speed: 1 },
      { expose: (e: Exposed) => (exposed = e), emit: vi.fn(), attrs: {}, slots: {} }
    )
    warn.mockRestore()
    expect(mockLoadAnimation).not.toHaveBeenCalled()
    return exposed!
  }

  it("all methods are safe no-ops", () => {
    const vm = preMountExposed()
    expect(() => {
      vm.play()
      vm.pause()
      vm.stop()
      vm.setSpeed(2)
      vm.setDirection(1)
      vm.goToAndStop(1, true)
      vm.goToAndPlay(1, true)
      vm.destroy()
    }).not.toThrow()
  })

  it("getDuration returns the 0 sentinel", () => {
    expect(preMountExposed().getDuration(true)).toBe(0)
  })
})
