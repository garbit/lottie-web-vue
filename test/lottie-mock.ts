import { vi } from "vitest"
import type { AnimationItem } from "lottie-web"

export interface MockAnimationItem {
  play: ReturnType<typeof vi.fn>
  pause: ReturnType<typeof vi.fn>
  stop: ReturnType<typeof vi.fn>
  setSpeed: ReturnType<typeof vi.fn>
  setDirection: ReturnType<typeof vi.fn>
  getDuration: ReturnType<typeof vi.fn>
  goToAndStop: ReturnType<typeof vi.fn>
  goToAndPlay: ReturnType<typeof vi.fn>
  destroy: ReturnType<typeof vi.fn>
  addEventListener: ReturnType<typeof vi.fn>
  /** Trigger a lottie event that the component registered a listener for. */
  fire: (event: string) => void
}

/** Create a fake AnimationItem whose addEventListener records handlers so
 *  tests can fire lottie events at the component. */
export function createMockAnim(): MockAnimationItem {
  const listeners = new Map<string, Array<() => void>>()
  return {
    play: vi.fn(),
    pause: vi.fn(),
    stop: vi.fn(),
    setSpeed: vi.fn(),
    setDirection: vi.fn(),
    getDuration: vi.fn(() => 4.2),
    goToAndStop: vi.fn(),
    goToAndPlay: vi.fn(),
    destroy: vi.fn(),
    addEventListener: vi.fn((event: string, handler: () => void) => {
      const existing = listeners.get(event) ?? []
      listeners.set(event, [...existing, handler])
    }),
    fire: (event: string) => {
      for (const handler of listeners.get(event) ?? []) handler()
    },
  }
}

/** The current mock instance; reassigned by mockLoadAnimation on each mount. */
export let currentAnim: MockAnimationItem

export const mockLoadAnimation = vi.fn((_options?: unknown) => {
  currentAnim = createMockAnim()
  return currentAnim as unknown as AnimationItem
})
