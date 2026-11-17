const PNG_WIDTH = 4000

export function previewPath(category, file) {
  return `/logos/${category}/previews/${file}.webp`
}

export async function downloadPng(url, file) {
  const image = new Image()
  image.src = url
  await image.decode()
  const canvas = document.createElement("canvas")
  canvas.width = PNG_WIDTH
  canvas.height = Math.round(image.naturalHeight / image.naturalWidth * PNG_WIDTH)
  canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height)
  const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"))
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = file.replace(/\.svg$/, ".png")
  link.click()
  setTimeout(() => URL.revokeObjectURL(link.href), 10000)
}
