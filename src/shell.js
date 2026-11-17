import { createMemoryHistory, createRouter } from "vue-router"
import { PAGES } from "./pages.js"
import { pageRoutes } from "./routes.js"

const matcher = createRouter({ history: createMemoryHistory(), routes: pageRoutes(Object.fromEntries(PAGES.map(page => [page.name, {}]))) })

function escaped(text) {
  return text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

export function pageAt(path) {
  return matcher.resolve(path).meta
}

export function shellHtml(html, page) {
  const head = [
    "<meta charset=\"UTF-8\">",
    "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
    `<meta property="og:title" content="${escaped(page.ogTitle)}">`,
    `<meta property="og:description" content="${escaped(page.ogDescription)}">`,
    `<meta property="og:image" content="${escaped(page.image)}">`
  ].concat(page.description ? `<meta name="description" content="${escaped(page.description)}">` : [], [
    `<title>${escaped(page.title)}</title>`,
    `<link rel="icon" type="image/x-icon" href="${page.icon}">`
  ])
  return html
    .replace("<head>", `<head>\n    ${head.join("\n    ")}`)
    .replace("<body>", `<body${page.bodyClass ? ` class="${page.bodyClass}"` : ""}${page.noHeader ? " no-header" : ""}>`)
}
