import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"
import { previewPath } from "../src/lib/logos.js"

const SIZE = 800
const QUALITY = 80
const PREVIEW = /^\/logos\/([a-z]+)\/previews\/([^/]+)\.webp$/

function sources(root) {
  const logos = JSON.parse(fs.readFileSync(path.join(root, "src", "data", "logos.json"), "utf8"))
  const map = new Map()
  for (const [category, { logos: list }] of Object.entries(logos)) {
    for (const { file } of list) {
      const url = previewPath(category, file)
      const source = path.join(root, "public", "logos", category, file)
      if (map.has(url) && map.get(url) !== source) throw new Error(`${map.get(url)} and ${source} would share the preview ${url}`)
      map.set(url, source)
    }
  }
  return map
}

function render(source) {
  return sharp(source, { density: source.endsWith(".svg") ? 300 : 72 }).resize({ width: SIZE, height: SIZE, fit: "inside", withoutEnlargement: true }).webp({ quality: QUALITY }).toBuffer()
}

export function logoPreviews() {
  let root
  const cache = new Map()
  return {
    name: "logo-previews",
    configResolved(config) {
      root = config.root
    },
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const url = decodeURIComponent(request.url.split("?")[0])
        if (!PREVIEW.test(url)) return next()
        try {
          const source = sources(root).get(url)
          if (!source) return next()
          if (!cache.has(url)) cache.set(url, await render(source))
          response.setHeader("Content-Type", "image/webp")
          response.end(cache.get(url))
        } catch (error) {
          next(error)
        }
      })
    },
    async generateBundle() {
      for (const [url, source] of sources(root)) this.emitFile({ type: "asset", fileName: url.slice(1), source: await render(source) })
    }
  }
}
