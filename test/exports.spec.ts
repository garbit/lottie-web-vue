import { describe, it, expect, vi } from "vitest"
import { createApp } from "vue"
import DefaultExport, { LottieAnimation } from "../src/index"
import { mockLoadAnimation } from "./lottie-mock"

vi.mock("lottie-web", () => ({
  default: { loadAnimation: (options: unknown) => mockLoadAnimation(options) },
}))

// Pins the export surface of src/index.ts. The same checks run against the
// built tarball in scripts/smoke-test.mjs — 2.0.7 shipped with src and dist
// disagreeing on exactly this.
describe("package export surface", () => {
  it("has a named LottieAnimation export", () => {
    expect(LottieAnimation).toBeDefined()
  })

  it("default export exists and is the same object as the named export", () => {
    expect(DefaultExport).toBeDefined()
    expect(DefaultExport).toBe(LottieAnimation)
  })

  it("exposes a plugin install function", () => {
    expect(typeof LottieAnimation.install).toBe("function")
  })

  it("app.use(LottieAnimation) registers a global 'LottieAnimation' component", () => {
    const app = createApp({ template: "<div />" })
    app.use(LottieAnimation)
    expect(app.component("LottieAnimation")).toBe(LottieAnimation)
  })
})
