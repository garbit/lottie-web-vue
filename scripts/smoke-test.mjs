#!/usr/bin/env node
/**
 * Pack-and-install smoke test.
 *
 * Packs the library (npm pack -> prepack -> fresh build), installs the real
 * tarball into a throwaway consumer app, and verifies the things that have
 * actually broken in shipped releases:
 *   - tarball contents (2.0.7 shipped HelloWorld.vue.d.ts and vite.svg)
 *   - ESM default + named import (2.0.7 shipped types with a default export
 *     the runtime didn't have)
 *   - consumer-side type-checking of the shipped .d.ts
 *   - CJS require of the UMD build, SSR renderToString
 */
import { execFileSync } from "node:child_process"
import { mkdtempSync, writeFileSync, readdirSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
let failures = 0

function pass(msg) {
  console.log(`  ✅ ${msg}`)
}
function fail(msg) {
  failures++
  console.error(`  ❌ ${msg}`)
}
function run(cmd, args, opts = {}) {
  return execFileSync(cmd, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...opts })
}

const work = mkdtempSync(join(tmpdir(), "lwv-smoke-"))
process.on("exit", () => rmSync(work, { recursive: true, force: true }))

// 1. Pack (prepack runs the build, so this always exercises a fresh dist/)
console.log("1) npm pack")
run("npm", ["pack", "--pack-destination", work], { cwd: root, stdio: ["ignore", "inherit", "inherit"] })
const tarball = readdirSync(work).find((f) => f.endsWith(".tgz"))
if (!tarball) {
  fail("npm pack produced no tarball")
  process.exit(1)
}
pass(`packed ${tarball}`)

// 2. Tarball contents
console.log("2) tarball contents")
const files = run("tar", ["-tf", join(work, tarball)])
  .trim()
  .split("\n")
  .map((f) => f.replace(/^package\//, ""))

const mustContain = [
  "dist/index.d.ts",
  "dist/lottie-web-vue.js",
  "dist/lottie-web-vue.umd.cjs",
  "README.md",
  "LICENSE",
  "package.json",
]
const mustNotMatch = [/vite\.svg/, /HelloWorld/, /^src\//]

for (const f of mustContain) {
  files.includes(f) ? pass(`contains ${f}`) : fail(`missing ${f}`)
}
for (const re of mustNotMatch) {
  const hit = files.find((f) => re.test(f))
  hit ? fail(`must not ship ${hit}`) : pass(`no ${re} in tarball`)
}

// 3. Throwaway consumer app
console.log("3) consumer install")
const consumer = join(work, "consumer")
run("mkdir", ["-p", consumer])
writeFileSync(
  join(consumer, "package.json"),
  JSON.stringify({ name: "consumer", private: true, type: "module" }, null, 2)
)
run("npm", ["install", "--no-audit", "--no-fund", join(work, tarball), "vue", "lottie-web", "typescript"], {
  cwd: consumer,
  stdio: ["ignore", "inherit", "inherit"],
})
pass("tarball + vue + lottie-web + typescript installed")

// 4. ESM import surface (hard fail — the 2.0.7 bug)
console.log("4) ESM import surface")
writeFileSync(
  join(consumer, "consumer.mjs"),
  `import DefaultExport, { LottieAnimation } from "lottie-web-vue"
if (!DefaultExport) throw new Error("default export is undefined")
if (!LottieAnimation) throw new Error("named export is undefined")
if (DefaultExport !== LottieAnimation) throw new Error("default !== named")
if (typeof DefaultExport.install !== "function") throw new Error("install() missing")
console.log("esm-ok")
`
)
try {
  const out = run("node", ["consumer.mjs"], { cwd: consumer })
  out.includes("esm-ok") ? pass("default + named import, same object, install()") : fail(`unexpected output: ${out}`)
} catch (e) {
  fail(`ESM import failed: ${e.stderr || e.message}`)
}

// 5. CJS require of the UMD build
console.log("5) CJS require")
writeFileSync(
  join(consumer, "consumer.cjs"),
  `const pkg = require("lottie-web-vue")
if (!pkg.LottieAnimation) throw new Error("named export missing from CJS")
if (!pkg.default) throw new Error("default missing from CJS")
console.log("cjs-ok")
`
)
try {
  const out = run("node", ["consumer.cjs"], { cwd: consumer })
  out.includes("cjs-ok") ? pass("require() resolves with named + default") : fail(`unexpected output: ${out}`)
} catch (e) {
  fail(`CJS require failed: ${(e.stderr || e.message).split("\n")[0]}`)
}

// 6. Consumer-side type-check of the shipped declarations (hard fail)
console.log("6) consumer type-check")
writeFileSync(
  join(consumer, "consumer.ts"),
  `import DefaultExport, { LottieAnimation } from "lottie-web-vue"
import { createApp } from "vue"

const app = createApp({})
app.use(DefaultExport)
app.component("Lottie", LottieAnimation)

// exposed-methods surface must be visible to consumers
type Instance = InstanceType<typeof LottieAnimation>
const assertMethods = (i: Instance) => {
  i.play(); i.pause(); i.stop()
  i.setSpeed(2)
  i.setDirection(-1)
  const d: number = i.getDuration(true)
  i.goToAndStop(10, true)
  i.goToAndPlay(10, true)
  i.destroy()
  return d
}
void assertMethods
`
)
writeFileSync(
  join(consumer, "tsconfig.json"),
  JSON.stringify(
    {
      compilerOptions: {
        target: "ES2020",
        module: "ESNext",
        moduleResolution: "bundler",
        strict: true,
        noEmit: true,
        skipLibCheck: true,
        types: [],
      },
      include: ["consumer.ts"],
    },
    null,
    2
  )
)
try {
  run("npx", ["tsc", "-p", "."], { cwd: consumer })
  pass("shipped .d.ts type-checks from a consumer project")
} catch (e) {
  fail(`consumer type-check failed:\n${e.stdout || e.message}`)
}

// 7. SSR renderToString
console.log("7) SSR renderToString")
writeFileSync(
  join(consumer, "ssr.mjs"),
  `import { createSSRApp, h } from "vue"
import { renderToString } from "vue/server-renderer"
import { LottieAnimation } from "lottie-web-vue"

const app = createSSRApp({ render: () => h(LottieAnimation, { animationData: {} }) })
const html = await renderToString(app)
if (!html.includes("<div")) throw new Error("no div rendered: " + html)
console.log("ssr-ok")
`
)
try {
  const out = run("node", ["ssr.mjs"], { cwd: consumer })
  out.includes("ssr-ok") ? pass("SSR renderToString works") : fail(`unexpected output: ${out}`)
} catch (e) {
  fail(`SSR failed: ${(e.stderr || e.message).split("\n")[0]}`)
}

// Summary
console.log("")
if (failures > 0) {
  console.error(`Smoke test FAILED: ${failures} failure(s)`)
  process.exit(1)
}
console.log("Smoke test passed.")
