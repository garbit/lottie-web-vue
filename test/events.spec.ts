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

const forwarded = ["loopComplete", "complete", "enterFrame", "segmentStart"] as const

describe("event forwarding", () => {
  it.each(forwarded)("re-emits lottie '%s' exactly once with no payload", (event) => {
    const wrapper = mount(LottieAnimation, { props: { animationData: watermelon } })

    currentAnim.fire(event)

    expect(wrapper.emitted(event)).toHaveLength(1)
    expect(wrapper.emitted(event)![0]).toEqual([])
  })

  it("does not emit anything before the lottie event fires", () => {
    const wrapper = mount(LottieAnimation, { props: { animationData: watermelon } })

    for (const event of forwarded) {
      expect(wrapper.emitted(event)).toBeUndefined()
    }
  })

  it("emits synthetic 'stopped' from goToAndStop()", () => {
    const wrapper = mount(LottieAnimation, { props: { animationData: watermelon } })

    wrapper.vm.goToAndStop(30, true)

    expect(wrapper.emitted("stopped")).toHaveLength(1)
  })

  it("does NOT emit 'stopped' from stop()", () => {
    const wrapper = mount(LottieAnimation, { props: { animationData: watermelon } })

    wrapper.vm.stop()

    expect(wrapper.emitted("stopped")).toBeUndefined()
  })
})
