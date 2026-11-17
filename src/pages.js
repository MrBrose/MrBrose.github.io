import LOGOS from "./data/logos.json" with { type: "json" }

export const SITE = "https://mctitles.com"

const LEARN = "Learn how to make your very own Minecraft Logos!"
const ABOUT = "MCTitles is a website designed to help you create your very own Minecraft logos! As well as documenting every Minecraft Logo made, you can also learn quick, easy and free methods, as well as more premium methods of creating your very own 3d Minecraft logo!"
const DISCORD_IMAGE = `${SITE}/images/discordlogo.png`
const FAVICON = "/images/favicon.png"
const SOCIALS = ["twitter", "discord", "youtube"]
const GRID_CALCULATOR = "https://grid-calculator.theannoying.dev/"

function page(name, file, path, title, details = {}) {
  return { name, file, path, title, ogTitle: title, ogDescription: LEARN, description: ABOUT, image: DISCORD_IMAGE, icon: FAVICON, bodyClass: "", header: true, footer: SOCIALS, dust: "dust", ...details }
}

const LOGO_PAGES = Object.entries(LOGOS).map(([id, category]) => page(`official-${id}`, `official-logos/${category.page}.html`, `/official-logos/${category.page}`, category.title, { component: "logo-category", category: id }))

export const PAGES = [
  page("home", "index.html", "/", "Minecraft Titles | Home", { description: null, footer: SOCIALS.concat("github") }),
  page("commissions", "commissions.html", "/commissions", "MrBrose's Logo Commissions", { ogDescription: "MrBrose's Minecraft Logo Commissions, starting at $5\\nRead more...", description: "MrBrose's Minecraft Logo Commissions, starting at $5\\nRead more...", image: `${SITE}/images/MB2.png`, icon: "/images/MB.png", header: false, footer: ["twitter", "discord", "fiverr"], dust: null }),
  page("particles", "particles.html", "/particles", "Minecraft Titles | Home", { description: null, dust: "custom" }),
  page("portfolio", "portfolio.html", "/portfolio", "MrBrose's Portfolio", { ogDescription: "MrBrose's Portfolio", description: null, image: `${SITE}/images/MB2.png`, icon: "/images/MB.png", bodyClass: "rad-grad no-scroll", noHeader: true, header: false, footer: null, dust: null }),
  page("fonts", "fonts/index.html", "/fonts/", "Minecraft Titles | Fonts", { ogTitle: "MCTitles website", ogDescription: ABOUT }),
  page("making", "making-a-logo/index.html", "/making-a-logo/", "Minecraft Titles | Making a Logo"),
  page("making-minecraft-title-generator", "making-a-logo/minecraft-title-generator.html", "/making-a-logo/minecraft-title-generator", "Minecraft Titles | Making a Logo | Minecraft Title Generator"),
  page("making-illustrator", "making-a-logo/illustrator.html", "/making-a-logo/illustrator", "Minecraft Titles | Making a Logo | Illustrator"),
  page("making-photoshop", "making-a-logo/photoshop.html", "/making-a-logo/photoshop", "Minecraft Titles | Making a Logo | Photoshop"),
  page("making-stepbystep", "making-a-logo/stepbystep.html", "/making-a-logo/stepbystep", "Minecraft Titles | Making a Logo | Illustrator"),
  page("official", "official-logos/index.html", "/official-logos/", "Minecraft Titles | Official Logos"),
  page("official-history", "official-logos/history.html", "/official-logos/history", "Minecraft Titles | History of the Minecraft logo", { ogTitle: "Minecraft Titles | Official Old Logos" })
].concat(LOGO_PAGES, page("not-found", "404.html", "/:path(.*)*", "Minecraft Titles | 404", { description: null, bodyClass: "linear-grad-red" }))

export const MENU = [
  { label: "Official Logos", href: "/official-logos" },
  { label: "Making a Logo", href: "/making-a-logo" },
  { label: "Fonts", href: "/fonts" },
  { label: "Grid Calculator", href: GRID_CALCULATOR, external: true },
  { label: "Discord", href: "https://discord.gg/mxV7yXhXH3", external: true, icon: "discord" }
]
