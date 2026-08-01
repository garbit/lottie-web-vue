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

describe("mount", () => {
  it("calls loadAnimation once with the rendered div, svg renderer, and prop-derived options", () => {
    const wrapper = mount(LottieAnimation, {
      props: { animationData: watermelon, loop: 3, autoPlay: false },
    })

    expect(mockLoadAnimation).toHaveBeenCalledTimes(1)
    const options = mockLoadAnimation.mock.calls[0][0] as Record<string, unknown>
    expect(options.container).toBe(wrapper.element)
    expect(options.renderer).toBe("svg")
    expect(options.loop).toBe(3)
    expect(options.autoplay).toBe(false)
  })

  it("applies prop defaults: loop=false, autoPlay=true, speed=1", () => {
    mount(LottieAnimation, { props: { animationData: watermelon } })

    const options = mockLoadAnimation.mock.calls[0][0] as Record<string, unknown>
    expect(options.loop).toBe(false)
    expect(options.autoplay).toBe(true)
    expect(currentAnim.setSpeed).toHaveBeenCalledWith(1)
  })

  it("calls setSpeed immediately after load with the speed prop", () => {
    mount(LottieAnimation, { props: { animationData: watermelon, speed: 2.5 } })

    expect(currentAnim.setSpeed).toHaveBeenCalledTimes(1)
    expect(currentAnim.setSpeed).toHaveBeenCalledWith(2.5)
  })

  it("deep-clones animationData so later mutation of the source does not leak in", () => {
    const source = { v: "5.5.7", layers: [{ ty: 4 }] }
    mount(LottieAnimation, { props: { animationData: source } })

    const passed = (mockLoadAnimation.mock.calls[0][0] as Record<string, unknown>)
      .animationData as typeof source

    expect(passed).not.toBe(source)
    expect(passed).toEqual(source)

    source.layers.push({ ty: 1 })
    expect(passed.layers).toHaveLength(1)
  })
})
