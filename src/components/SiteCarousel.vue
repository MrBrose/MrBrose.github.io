<script setup>
  import Splide from "@splidejs/splide"
  import "@splidejs/splide/css/core"
  import { onBeforeUnmount, onMounted, useTemplateRef } from "vue"

  const root = useTemplateRef("root")
  const list = useTemplateRef("list")
  let splide

  onMounted(() => {
    const slides = Array.from(list.value.children)
    slides.forEach(slide => slide.classList.add("splide__slide"))
    const heads = slides.map(slide => slide.getAttribute("img-src"))
    splide = new Splide(root.value, { gap: "4em" })
    splide.on("pagination:mounted", ({ items }) => items.forEach((item, i) => {
      const head = document.createElement("img")
      head.src = heads[i]
      head.alt = ""
      item.button.append(head)
    }))
    splide.mount()
  })

  onBeforeUnmount(() => splide.destroy())
</script>

<template>
  <div ref="root" component="carousel" class="splide">
    <div class="splide__track">
      <ul ref="list" id="carousel-list" class="splide__list">
        <slot></slot>
      </ul>
    </div>
    <div class="carousel-nav">
      <ul class="splide__pagination icons"></ul>
      <div class="splide__arrows">
        <button class="splide__arrow splide__arrow--prev"></button>
        <button class="splide__arrow splide__arrow--next"></button>
      </div>
    </div>
  </div>
</template>
