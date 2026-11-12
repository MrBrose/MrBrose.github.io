import { createRouter, createWebHistory } from "vue-router"
import { PAGES } from "./pages.js"
import { pageRoutes, routed } from "./routes.js"

const PAGE_FILES = import.meta.glob("./pages/*.vue")

function component(name) {
  const file = `./pages/${name.split("-").map(part => part[0].toUpperCase() + part.slice(1)).join("")}.vue`
  if (!PAGE_FILES[file]) throw new Error(`the page "${name}" has no component at ${file}`)
  return PAGE_FILES[file]
}

export const router = createRouter({
  history: createWebHistory(),
  routes: pageRoutes(Object.fromEntries(PAGES.map(page => [page.name, component(page.name)]))),
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash }
    return { top: 0 }
  }
})

function setHead(selector, attribute, value) {
  const element = document.head.querySelector(selector)
  if (!element) throw new Error(`the page shell has no ${selector}`)
  element.setAttribute(attribute, value)
}

function setDescription(text) {
  let description = document.head.querySelector("meta[name=description]")
  if (!text) return description?.remove()
  if (!description) {
    description = document.createElement("meta")
    description.name = "description"
    document.head.querySelector("title").before(description)
  }
  description.content = text
}

router.afterEach((to, from, failure) => {
  if (failure) return
  const page = to.meta
  document.title = page.title
  setHead("meta[property=\"og:title\"]", "content", page.ogTitle)
  setHead("meta[property=\"og:description\"]", "content", page.ogDescription)
  setHead("meta[property=\"og:image\"]", "content", page.image)
  setHead("link[rel=icon]", "href", page.icon)
  setDescription(page.description)
  document.body.className = page.bodyClass
  document.body.toggleAttribute("no-header", Boolean(page.noHeader))
})

export function followLinks(root) {
  root.addEventListener("click", event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const anchor = event.target.closest("a[href]")
    const target = anchor && routed(anchor, location, path => router.resolve(path))
    if (!target) return
    event.preventDefault()
    router.push(target)
  })
}
