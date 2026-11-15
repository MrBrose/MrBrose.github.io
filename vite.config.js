import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"
import { PAGES } from "./src/pages.js"
import { pageAt, shellHtml } from "./src/shell.js"
import { logoPreviews } from "./vite/logo-previews.js"

const shellPages = {
  name: "shell-pages",
  enforce: "post",
  transformIndexHtml: {
    order: "pre",
    handler(html, context) {
      if (!context.server) return html
      return shellHtml(html, pageAt(new URL(context.originalUrl ?? context.path, "http://localhost").pathname))
    }
  },
  generateBundle(_, bundle) {
    const shell = bundle["index.html"]
    if (!shell) throw new Error("the build has no index.html to make the pages from")
    const source = String(shell.source)
    for (const page of PAGES) {
      if (page.file === "index.html") shell.source = shellHtml(source, page)
      else this.emitFile({ type: "asset", fileName: page.file, source: shellHtml(source, page) })
    }
  }
}

export default defineConfig({
  plugins: [vue({ template: { transformAssetUrls: false, compilerOptions: { comments: true, whitespace: "preserve" } } }), shellPages, logoPreviews()],
  server: { host: "127.0.0.1", port: 5292, strictPort: true, watch: { ignored: ["**/dist/**"] } }
})
