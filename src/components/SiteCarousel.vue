<script setup>
  import { onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue"

  const scroll = useTemplateRef("scroll")
  const heads = ref([])
  const selected = ref(0)
  const atStart = ref(true)
  const atEnd = ref(true)
  let clicking = false

  function scrollLeftMax() {
    return scroll.value.scrollWidth - scroll.value.clientWidth
  }

  function checkScrollEnd() {
    atStart.value = scroll.value.scrollLeft === 0
    atEnd.value = scroll.value.scrollLeft === scroll.value.scrollWidth - scroll.value.offsetWidth
  }

  function itemWidth() {
    return scrollLeftMax() / (scroll.value.children.length - 1)
  }

  function currentIndex() {
    return Math.round(scroll.value.scrollLeft / itemWidth())
  }

  function inertifyElements() {
    const current = currentIndex()
    Array.from(scroll.value.children).forEach((el, i) => el.inert = i !== current)
  }

  function scrollTo(index) {
    scroll.value.scrollLeft = itemWidth() * index
    selected.value = index
  }

  function scrollStop() {
    inertifyElements()
    clicking = false
    selected.value = currentIndex()
  }

  function step(by) {
    if (clicking) return
    clicking = true
    scrollTo(currentIndex() + by)
  }

  function realign() {
    scrollTo(currentIndex())
  }

  onMounted(() => {
    heads.value = Array.from(scroll.value.children).map(el => el.getAttribute("img-src"))
    scroll.value.style.overflow = "hidden"
    scroll.value.style.scrollSnapType = "none"
    inertifyElements()
    checkScrollEnd()
    selected.value = currentIndex()
    addEventListener("resize", realign)
  })

  onBeforeUnmount(() => removeEventListener("resize", realign))
</script>

<template>
  <div component="carousel">
    <button :disabled="atStart" @click="step(-1)"><span class="non-visual">Previous Item</span></button>
    <ul ref="scroll" id="carousel-list" @scroll="checkScrollEnd" @scrollend="scrollStop">
      <slot></slot>
    </ul>
    <ul class="icons">
      <li v-for="(head, i) in heads" :key="head" :class="{ selected: i === selected }">
        <button @click="scrollTo(i)"><img :src="head"></button>
      </li>
    </ul>
    <button :disabled="atEnd" @click="step(1)"><span class="non-visual">Next Item</span></button>
  </div>
</template>
