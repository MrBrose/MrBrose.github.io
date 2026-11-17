import { nextTick, ref } from "vue"
import { START_LOCATION, createRouter, createWebHistory } from "vue-router"
import { PAGES } from "./pages.js"
import { pageRoutes, routed } from "./routes.js"

const CAPTURE_WAIT = 200
const PAGE_FILES = import.meta.glob("./pages/*.vue")

function component(name) {
  const file = `./pages/${name.split("-").map(part => part[0].toUpperCase() + part.slice(1)).join("")}.vue`
  if (!PAGE_FILES[file]) throw new Error(`the page "${name}" has no component at ${file}`)
  return PAGE_FILES[file]
}

export const router = createRouter({
  history: createWebHistory(),
  routes: pageRoutes(Object.fromEntries(PAGES.map(page => [page.name, component(page.component ?? page.name)]))).concat({
    path: "/download-fonts/:creator?",
    redirect: to => {
      const creator = (to.params.creator ?? "").replace(/\.html$/, "").toLowerCase()
      return creator && creator !== "index" ? { path: "/fonts/", query: { creator } } : "/fonts/"
    }
  }, {
    path: "/making-a-logo/blockbench",
    alias: "/making-a-logo/blockbench.html",
    redirect: "/making-a-logo/minecraft-title-generator"
  }),
  scrollBehavior(to, from, saved) {
    if (saved) return { ...saved, behavior: "instant" }
    if (to.hash) return { el: to.hash }
    if (to.path === from.path) return false
    return { top: 0, behavior: "instant" }
  }
})

const fades = new WeakMap()

export const transitioning = ref(false)

function crossfade(to, from) {
  if (from === START_LOCATION || to.path === from.path) return
  if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) return
  return new Promise(resolve => {
    const shown = new Promise(done => fades.set(to, done))
    const transition = document.startViewTransition(() => {
      clearTimeout(waiting)
      resolve()
      return shown
    })
    // the old page is only captured on the next frame, which never comes while the window isn't being drawn
    const waiting = setTimeout(() => transition.skipTransition(), CAPTURE_WAIT)
    // ready rejects whenever a transition is skipped, eg by the next navigation starting
    transition.ready.catch(() => {})
    transitioning.value = true
    transition.finished.catch(() => {}).finally(() => transitioning.value = false)
  })
}

function crossfaded(to, from, failure) {
  const done = fades.get(to)
  if (!done) return
  fades.delete(to)
  // Chrome abandons a transition when the page gets too short for its scroll position, which it can once the next page renders
  if (!failure && to.path !== from.path) scrollTo({ top: 0, behavior: "instant" })
  nextTick().then(() => setTimeout(done))
}

router.beforeResolve(crossfade)
router.afterEach(crossfaded)

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
