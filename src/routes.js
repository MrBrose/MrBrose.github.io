import { PAGES } from "./pages.js"

function aliases(page) {
  if (page.path.startsWith("/:")) return []
  return [`/${page.file}`]
}

export function pageRoutes(components) {
  return PAGES.map(page => ({ path: page.path, alias: aliases(page), name: page.name, component: components[page.name], meta: page }))
}

export function routed(anchor, here, resolve) {
  if (anchor.target && anchor.target !== "_self" || anchor.hasAttribute("download")) return null
  const url = new URL(anchor.href, here.href)
  if (url.origin !== here.origin) return null
  if (url.pathname === here.pathname && url.search === here.search && url.hash) return null
  const target = resolve(`${url.pathname}${url.search}${url.hash}`)
  return target.meta.name === "not-found" ? null : target
}
