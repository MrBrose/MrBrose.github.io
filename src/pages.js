import FONTS from "./data/fonts.json" with { type: "json" }

export const SITE = "https://mctitles.com"

const LEARN = "Learn how to make your very own Minecraft Logos!"
const ABOUT = "MCTitles is a website designed to help you create your very own Minecraft logos! As well as documenting every Minecraft Logo made, you can also learn quick, easy and free methods, as well as more premium methods of creating your very own 3d Minecraft logo!"
const DISCORD_IMAGE = `${SITE}/images/discordlogo.png`
const FAVICON = "/images/favicon.png"
const SOCIALS = ["twitter", "discord", "youtube"]
const GRID_CALCULATOR = "https://grid-calculator.theannoying.dev/"

function page(name, file, path, title, details = {}) {
  return { name, file, path, title, ogTitle: title, ogDescription: LEARN, description: ABOUT, image: DISCORD_IMAGE, icon: FAVICON, bodyClass: "linear-grad-light", header: "full", hide: [], footer: SOCIALS, dust: "dust", ...details }
}

const FONT_PAGES = Object.entries(FONTS).map(([id, author]) => page(`fonts-${id}`, `download-fonts/${author.page}.html`, `/download-fonts/${author.page}`, "Minecraft Titles | Fonts", { ogTitle: "MCTitles website", bodyClass: "linear-grad", component: "font-author", author: id }))

export const PAGES = [
  page("home", "index.html", "/", "Minecraft Titles | Home", { description: null, bodyClass: "linear-grad", footer: SOCIALS.concat("github") }),
  page("calculator", "calculator.html", "/calculator", "Minecraft Titles | Grid Calculator", { ogTitle: "Minecraft Titles |TheAnnoying's Grid Calculator", ogDescription: `${LEARN} Use TheAnnoying's Grid Calculator.`, bodyClass: "linear-grad", header: "compact", hide: [GRID_CALCULATOR], footer: null }),
  page("commissions", "commissions.html", "/commissions", "MrBrose's Logo Commissions", { ogDescription: "MrBrose's Minecraft Logo Commissions, starting at $5\\nRead more...", description: "MrBrose's Minecraft Logo Commissions, starting at $5\\nRead more...", image: `${SITE}/images/MB2.png`, icon: "/images/MB.png", header: "checkbox", footer: ["twitter", "discord", "fiverr"], dust: null }),
  page("fun", "fun.html", "/fun", "MCTitles", { description: null, bodyClass: "linear-black", header: "checkbox", footer: null, dust: "glow" }),
  page("particles", "particles.html", "/particles", "Minecraft Titles | Home", { description: null, bodyClass: "linear-grad", hide: ["/"], dust: "custom" }),
  page("portfolio", "portfolio.html", "/portfolio", "MrBrose's Portfolio", { ogDescription: "MrBrose's Portfolio", description: null, image: `${SITE}/images/MB2.png`, icon: "/images/MB.png", bodyClass: "rad-grad no-scroll", noHeader: true, header: null, footer: null, dust: null }),
  page("fonts", "download-fonts/index.html", "/download-fonts/", "Minecraft Titles | Fonts", { ogTitle: "MCTitles website", ogDescription: ABOUT, bodyClass: "linear-grad" }),
  page("making", "making-a-logo/index.html", "/making-a-logo/", "Minecraft Titles | Making a Logo", { bodyClass: "linear-grad" }),
  page("making-blockbench", "making-a-logo/blockbench.html", "/making-a-logo/blockbench", "Minecraft Titles | Making a Logo | Blockbench"),
  page("making-illustrator", "making-a-logo/illustrator.html", "/making-a-logo/illustrator", "Minecraft Titles | Making a Logo | Illustrator"),
  page("making-photoshop", "making-a-logo/photoshop.html", "/making-a-logo/photoshop", "Minecraft Titles | Making a Logo | Photoshop"),
  page("making-stepbystep", "making-a-logo/stepbystep.html", "/making-a-logo/stepbystep", "Minecraft Titles | Making a Logo | Illustrator"),
  page("official", "official-logos/index.html", "/official-logos/", "Minecraft Titles | Official Logos", { bodyClass: "linear-grad" }),
  page("official-edition", "official-logos/edition-logos.html", "/official-logos/edition-logos", "Minecraft Titles | Official Edition Logos"),
  page("official-game", "official-logos/game-logos.html", "/official-logos/game-logos", "Minecraft Titles | Official Game Logos"),
  page("official-history", "official-logos/history.html", "/official-logos/history", "Minecraft Titles | History of the Minecraft logo", { ogTitle: "Minecraft Titles | Official Old Logos" }),
  page("official-old", "official-logos/old-logos.html", "/official-logos/old-logos", "Minecraft Titles | Official Old Logos"),
  page("official-other", "official-logos/other-logos.html", "/official-logos/other-logos", "Minecraft Titles | Other Official Logos"),
  page("official-pack", "official-logos/pack-logos.html", "/official-logos/pack-logos", "Minecraft Titles | Official Pack Logos"),
  page("official-update", "official-logos/update-logos.html", "/official-logos/update-logos", "Minecraft Titles | Official Update Logos")
].concat(FONT_PAGES, page("not-found", "404.html", "/:path(.*)*", "Minecraft Titles | 404", { description: null, bodyClass: "linear-grad-red", hide: ["/"], dust: "fancy" }))

export const MENU = [
  { label: "Home", href: "/" },
  { label: "Official Logos", href: "/official-logos" },
  { label: "Making a Logo", href: "/making-a-logo" },
  { label: "Grid Calculator", href: GRID_CALCULATOR, external: true },
  { label: "Fonts", href: "/download-fonts" },
  { label: "Discord", href: "https://discord.gg/mxV7yXhXH3", external: true }
]
