<script setup>
  import { computed, ref, useTemplateRef, watch } from "vue"
  import { useRoute } from "vue-router"
  import { MENU } from "../pages.js"

  const props = defineProps({ page: { type: Object, required: true } })
  const route = useRoute()
  const open = ref(false)
  const hidden = ref(true)
  const header = useTemplateRef("header")
  const label = useTemplateRef("label")
  const nav = useTemplateRef("nav")
  let hiding

  const links = computed(() => MENU.filter(link => !props.page.hide.includes(link.href) && props.page.path.replace(/(.)\/$/, "$1") !== link.href))

  function animationTime() {
    const value = getComputedStyle(nav.value).getPropertyValue("--animation-time")
    if (value.endsWith("ms")) return Number(value.slice(0, -2))
    if (value.endsWith("s")) return Number(value.slice(0, -1)) * 1000
    throw new Error(`the menu animation time "${value}" is not in ms or s`)
  }

  watch(open, isOpen => {
    clearTimeout(hiding)
    if (isOpen) hidden.value = false
    else hiding = setTimeout(() => hidden.value = true, animationTime())
    document.querySelectorAll("main, footer").forEach(el => el.inert = isOpen)
  })

  watch(() => route.path, () => {
    open.value = false
    hidden.value = true
  })

  function toggle() {
    open.value = !open.value
  }

  function closeBelow(e) {
    if (open.value && e.clientY > header.value.getBoundingClientRect().bottom) toggle()
  }

  function labelKey(e) {
    if (e.key === " " || e.key === "Enter" || open.value && e.key === "Escape") {
      toggle()
      e.preventDefault()
      e.stopImmediatePropagation()
    }
    if (e.key === "ArrowDown" && open.value) {
      nav.value.firstElementChild.focus()
      e.preventDefault()
      e.stopImmediatePropagation()
    }
  }

  function linkKey(e) {
    const link = e.target
    if (e.key === "ArrowDown" && open.value && link.nextElementSibling) {
      link.nextElementSibling.focus()
      e.preventDefault()
      e.stopImmediatePropagation()
    }
    if (e.key === "ArrowUp" && open.value) {
      if (link.previousElementSibling) link.previousElementSibling.focus()
      else label.value.focus()
      e.preventDefault()
      e.stopImmediatePropagation()
    }
    if (e.key === "Escape") {
      toggle()
      e.preventDefault()
      e.stopImmediatePropagation()
    }
  }
</script>

<template>
  <input v-model="open" type="checkbox" id="menuCheckbox">
  <header v-if="page.header !== 'checkbox'" ref="header" @click="closeBelow">
    <div v-if="page.header === 'compact'" class="top-bar-c">
      <a href="/" class="logo">
        <img src="/images/logo.png" class="logo-image" alt="logo">
      </a>
    </div>
    <div v-else class="top-bar">
      <a href="/" class="logo">
        <img src="/images/logo.png" class="logo-image" alt="logo">
      </a>
      <a class="title" href="/"><img src="/images/MCTitles.svg" alt="MCTitles"></a>
      <label ref="label" for="menuCheckbox" class="menu" tabindex="0" @keydown="labelKey">
        <svg class="burger-menu" viewBox="0 0 24 24">
          <g style="fill:currentColor;" class="burger-bar top">
            <rect width="18" height="2" x="3" y="6" />
            <rect width="18" height="18" x="3" y="3" fill="transparent" />
          </g>
          <g style="fill:currentColor;" class="burger-bar mid">
            <rect width="18" height="2" x="3" y="11" />
            <rect width="18" height="18" x="3" y="3" fill="transparent" />
          </g>
          <g style="fill:currentColor;" class="burger-bar low">
            <rect width="18" height="2" x="3" y="16" />
            <rect width="18" height="18" x="3" y="3" fill="transparent" />
          </g>
        </svg>
      </label>
    </div>
    <nav ref="nav" class="menu-content" :class="{ hidden }" id="menuContent">
      <a v-for="link in links" :key="link.href" class="menu-link-button" :href="link.href" :target="link.external ? '_blank' : null" @keydown="linkKey"><span>{{ link.label }}</span></a>
    </nav>
  </header>
</template>
