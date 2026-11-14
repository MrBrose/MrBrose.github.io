<script setup>
  import { onBeforeUnmount, onMounted, useTemplateRef } from "vue"
  import PORTFOLIO from "../data/portfolio.json"

  const ROW_HEIGHT = 250

  const main = useTemplateRef("main")
  const scroller = useTemplateRef("scroller")

  function imageLoaded(img) {
    return new Promise((resolve, reject) => {
      if (img.complete) return resolve()
      img.addEventListener("load", resolve)
      img.addEventListener("error", reject)
    })
  }

  async function split() {
    const first = scroller.value
    const images = Array.from(first.children)
    await Promise.allSettled(images.map(imageLoaded))
    const rows = first.getBoundingClientRect().height / ROW_HEIGHT | 0
    const length = Math.round(images.length / rows)
    const chunks = []
    while (images.length) chunks.push(images.splice(0, length))
    first.replaceChildren()
    const rowItems = [first]
    for (let i = 0; i < rows - 1; i++) {
      const row = document.createElement("div")
      row.setAttribute("component", "side-scroll")
      rowItems[i].after(row)
      rowItems.push(row)
    }
    rowItems.forEach((row, i) => row.replaceChildren(...(chunks[i] ?? [])))
    main.value.style.setProperty("--width", `${Math.max(...rowItems.filter(row => row.lastChild).map(row => row.lastChild.getBoundingClientRect().right - row.getBoundingClientRect().left))}px`)
  }

  function merge() {
    for (const row of Array.from(main.value.children)) {
      if (row === scroller.value) continue
      scroller.value.append(...row.childNodes)
      row.remove()
    }
  }

  function resplit() {
    merge()
    split()
  }

  onMounted(() => {
    split()
    addEventListener("resize", resplit)
  })

  onBeforeUnmount(() => removeEventListener("resize", resplit))
</script>

<template>
  <main ref="main" @wheel="e => main.scrollLeft += e.deltaY * 1.5">
    <div ref="scroller" component="side-scroll">
      <img v-for="(file, i) in PORTFOLIO.portfolio" :key="i" :src="`/portfolio/${file}`" alt="Portfolio Image">
    </div>
  </main>
</template>
