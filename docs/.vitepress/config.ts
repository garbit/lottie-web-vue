import { defineConfig, type HeadConfig } from "vitepress"
import { fileURLToPath, URL } from "node:url"

const SITE_URL = "https://garbit.github.io/lottie-web-vue"
const SITE_TITLE = "lottie-web-vue"
const SITE_DESCRIPTION =
  "Airbnb Lottie-web animation component for Vue 3. Play After Effects animations exported with Bodymovin in your Vue app with a single component."

export default defineConfig({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  base: "/lottie-web-vue/",
  lastUpdated: true,
  cleanUrls: true,

  // SEO: generate sitemap.xml at the site root
  sitemap: {
    hostname: `${SITE_URL}/`,
  },

  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/lottie-web-vue/logo.svg" }],
    ["meta", { name: "theme-color", content: "#41b883" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: SITE_TITLE }],
    ["meta", { property: "og:image", content: `${SITE_URL}/og-image.png` }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:image", content: `${SITE_URL}/og-image.png` }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "lottie, lottie-web, vue, vue 3, vuejs, lottie vue component, bodymovin, after effects, animation, lottiefiles, vue-lottie, lottie player",
      },
    ],
    // JSON-LD: describe the library so search engines and AI agents understand it
    [
      "script",
      { type: "application/ld+json" },
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: "lottie-web-vue",
        description: SITE_DESCRIPTION,
        codeRepository: "https://github.com/garbit/lottie-web-vue",
        programmingLanguage: ["TypeScript", "Vue"],
        runtimePlatform: "Vue 3",
        license: "https://opensource.org/licenses/MIT",
        author: { "@type": "Person", name: "Andy Garbett" },
        url: `${SITE_URL}/`,
        installUrl: "https://www.npmjs.com/package/lottie-web-vue",
      }),
    ],
  ],

  // SEO: per-page canonical URL + og:title/og:description/og:url
  transformPageData(pageData) {
    const canonicalUrl = `${SITE_URL}/${pageData.relativePath}`
      .replace(/index\.md$/, "")
      .replace(/\.md$/, "")
    const title = pageData.frontmatter.layout === "home"
      ? SITE_TITLE
      : `${pageData.title} | ${SITE_TITLE}`
    const description = pageData.frontmatter.description || SITE_DESCRIPTION

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ["link", { rel: "canonical", href: canonicalUrl }] as HeadConfig,
      ["meta", { property: "og:title", content: title }] as HeadConfig,
      ["meta", { property: "og:description", content: description }] as HeadConfig,
      ["meta", { property: "og:url", content: canonicalUrl }] as HeadConfig,
    )
  },

  vite: {
    resolve: {
      alias: {
        // demos import the real public entry, exactly as consumers do
        "lottie-web-vue": fileURLToPath(new URL("../../src/index.ts", import.meta.url)),
      },
    },
    ssr: { noExternal: ["lottie-web"] },
  },

  themeConfig: {
    // navbar logo is the live watermelon Lottie animation — see theme/index.ts
    nav: [
      { text: "Guide", link: "/guide/getting-started", activeMatch: "/guide/" },
      { text: "API", link: "/api/props", activeMatch: "/api/" },
      {
        text: "v3.0.0",
        items: [
          { text: "Changelog", link: "https://github.com/garbit/lottie-web-vue/blob/main/CHANGELOG.md" },
          { text: "npm", link: "https://www.npmjs.com/package/lottie-web-vue" },
        ],
      },
    ],
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Getting Started", link: "/guide/getting-started" },
          { text: "Finding Animations", link: "/guide/animations" },
          { text: "Composition API", link: "/guide/composition-api" },
          { text: "Options API", link: "/guide/options-api" },
          { text: "CDN / UMD Usage", link: "/guide/cdn-umd" },
          { text: "Migrating from 2.x", link: "/guide/migrating" },
        ],
      },
      {
        text: "API Reference",
        items: [
          { text: "Props", link: "/api/props" },
          { text: "Events", link: "/api/events" },
          { text: "Methods", link: "/api/methods" },
        ],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/garbit/lottie-web-vue" }],
    editLink: {
      pattern: "https://github.com/garbit/lottie-web-vue/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
    search: { provider: "local" },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © Andy Garbett",
    },
  },
})
