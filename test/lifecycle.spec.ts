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

describe("lifecycle", () => {
  it("unmount destroys the animation exactly once", () => {
    // Regression test: onBeforeUnmount used to be registered twice,
    // so destroy() ran twice per unmount.
    const wrapper = mount(LottieAnimation, { props: { animationData: watermelon } })
    const anim = currentAnim

    wrapper.unmount()

    expect(anim.destroy).toHaveBeenCalledTimes(1)
  })

  it("changing the speed prop calls setSpeed on the live animation", async () => {
    const wrapper = mount(LottieAnimation, {
      props: { animationData: watermelon, speed: 1 },
    })
    currentAnim.setSpeed.mockClear() // drop the init-time call

    await wrapper.setProps({ speed: 2 })

    expect(currentAnim.setSpeed).toHaveBeenCalledTimes(1)
    expect(currentAnim.setSpeed).toHaveBeenCalledWith(2)
  })
})
