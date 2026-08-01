import { test, expect, type Page } from "@playwright/test"

// The playground installs the packed tarball and registers the component via
// app.use(defaultExport) — so every assertion here runs against the built
// package exactly as a consumer receives it.

let pageErrors: string[]

test.beforeEach(async ({ page }) => {
  pageErrors = []
  page.on("pageerror", (err) => pageErrors.push(String(err)))
  await page.goto("/")
})

test.afterEach(() => {
  expect(pageErrors, "no uncaught page errors").toEqual([])
})

async function frameCount(page: Page): Promise<number> {
  return Number(await page.getByTestId("frame-count").textContent())
}

test("lottie initialises: an svg is rendered inside the component", async ({ page }) => {
  const svg = page.getByTestId("lottie").locator("svg")
  await expect(svg).toBeVisible()
})

test("animation is actually playing: frame counter advances", async ({ page }) => {
  await expect(page.getByTestId("frame-count")).not.toHaveText("0")
  const before = await frameCount(page)
  await page.waitForTimeout(300)
  expect(await frameCount(page)).toBeGreaterThan(before)
})

test("pause halts the animation, play resumes it", async ({ page }) => {
  await page.getByTestId("pause").click()
  await page.waitForTimeout(150) // let any in-flight frame land
  const paused = await frameCount(page)
  await page.waitForTimeout(400)
  expect(await frameCount(page)).toBe(paused)

  await page.getByTestId("play").click()
  await expect
    .poll(async () => frameCount(page), { timeout: 3000 })
    .toBeGreaterThan(paused)
})

test("loopComplete events are forwarded through the built bundle", async ({ page }) => {
  await expect(page.getByTestId("loop-count")).not.toHaveText("0", { timeout: 20000 })
})

test("goToAndStop halts playback via the exposed method", async ({ page }) => {
  await page.getByTestId("go-to-and-stop").click()
  await page.waitForTimeout(150)
  const stopped = await frameCount(page)
  await page.waitForTimeout(400)
  expect(await frameCount(page)).toBe(stopped)
})
