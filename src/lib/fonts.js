const added = new Set()

export function fontFamily(author, file) {
  const family = `${author}-${file.replace(/\.\w+$/, "")}`
  if (!added.has(family)) {
    document.fonts.add(new FontFace(family, `url("/fonts/${author}/${file}")`, { weight: "bold", style: "normal" }))
    added.add(family)
  }
  return family
}

export async function loadFont(author, file) {
  const family = fontFamily(author, file)
  await document.fonts.load(`bold 1em "${family}"`)
  return family
}
