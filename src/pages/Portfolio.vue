<script setup>
  import { onBeforeUnmount, onMounted, useTemplateRef } from "vue"

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
      <img src="/images/commissions/NewPortfolio/LuxuryLogos.webp" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/zombie.webp" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/Advent of magic.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/fireflysmp1.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/DiesenAugust2.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/Extensive mob heads1.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/Can AI beat minecraft.webp" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/MIDGARD.webp" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/Create Horizons.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/WildWest2.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/Neo Survival1.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/3000.webp" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/buildattack1.webp" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/Wilderness Bound.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/AVALORIA.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/UnstableWorld2.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/Nasa1.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/PSEUDO.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/WhimsyMC-2.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/DayOneZ1.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/Wans5.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/CartWorks.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/Dungeons2.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/KAMIDOGU.webp" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/Maxster.webp" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/More Simple Structures.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/nuvguard2.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/KABLAM.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/Townify3.webp" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/HoneyRealms1.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/server4.webp" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/FloideN.webp" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/LlifeSteal.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/Splashdown.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/SKAPE.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/VillageBounties2.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/Meadow SMP no dirt.png" alt="Portfolio Image">
      <img src="/images/commissions/NewPortfolio/LuxuryLogos.webp" alt="Portfolio Image">
    </div>
  </main>
</template>
