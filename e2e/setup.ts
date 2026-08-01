import { execFileSync } from "node:child_process"
import { mkdtempSync, readdirSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const playground = join(root, "playground")

function run(cmd: string, args: string[], cwd: string) {
  execFileSync(cmd, args, { cwd, stdio: "inherit" })
}

export default function globalSetup() {
  // 1. Pack the library — prepack builds, so this is always a fresh dist/
  const packDir = mkdtempSync(join(tmpdir(), "lwv-e2e-"))
  run("npm", ["pack", "--pack-destination", packDir], root)
  const tarball = readdirSync(packDir).find((f) => f.endsWith(".tgz"))
  if (!tarball) throw new Error("npm pack produced no tarball")

  // 2. Install the real tarball into the playground (vue arrives as a peer);
  //    --no-save keeps playground/package.json clean
  run(
    "npm",
    ["install", "--no-save", "--no-audit", "--no-fund", join(packDir, tarball)],
    playground
  )
  rmSync(packDir, { recursive: true, force: true })

  // 3. Build the playground app against the installed package
  run("npx", ["vite", "build"], playground)
}
