<script setup>
  import { computed, onBeforeUnmount, reactive, ref } from "vue"
  import { useRoute } from "vue-router"
  import DownloadIcon from "../components/DownloadIcon.vue"
  import FONTS from "../data/fonts.json"
  import { loadFont } from "../lib/fonts.js"

  const DEFAULT_TEXT = "Minecraft Titles"

  const route = useRoute()
  const text = ref("")
  const size = ref(56)
  const search = ref("")
  const families = reactive(new Map())

  const creators = Object.entries(FONTS).map(([id, creator]) => ({ id, name: creator.name, count: creator.fonts.length }))
  const allFonts = Object.entries(FONTS).flatMap(([id, creator]) => creator.fonts.map(font => ({
    ...font,
    key: `${id}/${font.file}`,
    creator: id,
    creatorName: creator.name,
    url: `/fonts/${id}/${font.file}`,
    format: font.file.split(".").pop().toUpperCase()
  })))
  const byKey = new Map(allFonts.map(font => [font.key, font]))

  const creator = computed(() => FONTS[route.query.creator] ? route.query.creator : null)
  const fonts = computed(() => {
    const query = search.value.trim().toLowerCase()
    return allFonts.filter(font => (!creator.value || font.creator === creator.value) && font.name.toLowerCase().includes(query))
  })

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      observer.unobserve(entry.target)
      const font = byKey.get(entry.target.dataset.key)
      loadFont(font.creator, font.file).then(family => families.set(font.key, family))
    }
  }, { rootMargin: "400px 0px" })

  function observe(el) {
    if (el && !families.has(el.dataset.key)) observer.observe(el)
  }

  onBeforeUnmount(() => observer.disconnect())
</script>

<template>
  <main class="fonts-page">
    <header class="intro">
      <h2>Minecraft Style Fonts</h2>
      <p>Free Minecraft fonts for your logos. Type below to try them all at once.</p>
    </header>
    <div class="layout">
      <aside class="sidebar">
        <input v-model="search" class="search" type="search" placeholder="Search fonts" aria-label="Search fonts">
        <nav class="creators" aria-label="Creators">
          <h3>Creators</h3>
          <a href="/fonts" :aria-current="creator ? null : 'page'">All fonts <span>{{ allFonts.length }}</span></a>
          <a v-for="entry in creators" :key="entry.id" :href="`/fonts?creator=${entry.id}`" :aria-current="creator === entry.id ? 'page' : null">{{ entry.name }} <span>{{ entry.count }}</span></a>
        </nav>
      </aside>
      <section class="results">
        <div class="toolbar">
          <input v-model="text" class="preview-text" type="text" placeholder="Type something to preview" aria-label="Preview text">
          <label class="size">
            <span>Size</span>
            <input v-model.number="size" type="range" min="20" max="120">
            <output>{{ size }}px</output>
          </label>
        </div>
        <p class="count">{{ fonts.length }} {{ fonts.length === 1 ? "font" : "fonts" }}</p>
        <ul class="font-list">
          <li v-for="font in fonts" :key="font.key" :ref="observe" :data-key="font.key" class="font-row">
            <div class="meta">
              <h4>{{ font.name }}</h4>
              <a class="by" :href="`/fonts?creator=${font.creator}`">{{ font.creatorName }}</a>
              <a class="download" :href="font.url" :download="font.file"><DownloadIcon />{{ font.format }}</a>
            </div>
            <p class="preview" :class="{ loaded: families.has(font.key), uppercase: font.uppercase }" :style="{ fontFamily: families.has(font.key) ? `'${families.get(font.key)}'` : null, fontSize: `${size}px` }">{{ text || DEFAULT_TEXT }}</p>
          </li>
        </ul>
        <p v-if="!fonts.length" class="empty">No fonts match "{{ search }}".</p>
      </section>
    </div>
  </main>
</template>

<style scoped>
  .fonts-page {
    --line: 3px solid #2c3440;
    width: 100%;
    max-width: 80rem;
    margin: 0 auto;
    overflow-x: clip;
    color: var(--colour-text-light);
  }
  .intro {
    margin-bottom: 2.5rem;
    text-align: center;
  }
  .intro h2 {
    margin: .25em 0 .4em;
    font-weight: normal;
    font-size: 3em;
    line-height: 1.1;
  }
  .intro p {
    margin: 0;
    font-family: poppins-medium, sans-serif;
    color: var(--colour-text-muted);
  }
  .layout {
    display: grid;
    grid-template-columns: 15rem minmax(0, 1fr);
    gap: 3rem;
    align-items: start;
  }
  .sidebar {
    position: sticky;
    top: 4.5rem;
    padding-top: .75rem;
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }
  input {
    font: inherit;
    font-family: poppins-medium, sans-serif;
    color: var(--colour-text-light);
  }
  .search,
  .preview-text {
    width: 100%;
    padding: .7em .9em;
    border: 0;
    background: var(--colour-bg-panel);
  }
  .search::placeholder,
  .preview-text::placeholder {
    color: var(--colour-text-muted);
  }
  .search:focus-visible,
  .preview-text:focus-visible {
    outline: 2px solid var(--colour-link);
  }
  .creators {
    display: flex;
    flex-direction: column;
    gap: .2rem;
  }
  .creators h3 {
    margin: 0 0 .5rem;
    font-family: poppins-medium, sans-serif;
    font-weight: normal;
    font-size: .8rem;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: var(--colour-text-muted);
  }
  .creators a {
    display: flex;
    justify-content: space-between;
    padding: .55em .75em;
    font-family: poppins-medium, sans-serif;
    color: var(--colour-text-light);
    text-decoration: none;
    user-select: none;
    transition: background-color var(--short-animation-time);
  }
  .creators a span {
    color: var(--colour-text-muted);
  }
  .creators a:hover,
  .creators a:focus-visible {
    background: var(--colour-dropdown-hover);
  }
  .creators a:focus-visible {
    outline: 2px solid var(--colour-white);
  }
  .creators a[aria-current="page"] {
    background: var(--colour-bg-panel);
    box-shadow: inset 3px 0 0 var(--colour-link);
  }
  .toolbar {
    position: sticky;
    top: 4.5rem;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: .75rem 0;
    background: var(--colour-bg-light);
  }
  .preview-text {
    flex: 1;
  }
  .size {
    display: flex;
    align-items: center;
    gap: .75rem;
    font-family: poppins-medium, sans-serif;
    color: var(--colour-text-muted);
    user-select: none;
  }
  .size input {
    width: 9rem;
    accent-color: var(--colour-link);
  }
  .size output {
    min-width: 3.5ch;
    font-variant-numeric: tabular-nums;
  }
  .count {
    margin: .5rem 0 0;
    font-family: poppins-medium, sans-serif;
    font-size: .9rem;
    color: var(--colour-text-muted);
  }
  .font-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .font-row {
    padding: 1.5rem 0 1.75rem;
  }
  .font-row + .font-row {
    border-top: var(--line);
  }
  .meta {
    display: flex;
    align-items: baseline;
    gap: .75rem;
    font-family: poppins-medium, sans-serif;
  }
  .meta h4 {
    margin: 0;
    font-weight: normal;
    font-size: 1.05rem;
  }
  .meta a {
    text-decoration: none;
    user-select: none;
  }
  .by {
    font-size: .9rem;
    color: var(--colour-text-muted);
  }
  .by:hover {
    color: var(--colour-text-light);
  }
  .download {
    display: inline-flex;
    align-items: center;
    gap: .4em;
    margin-left: auto;
    font-size: .9rem;
    color: var(--colour-link);
  }
  .download:hover {
    text-decoration: underline;
    text-underline-offset: .2em;
  }
  .download .download-icon {
    width: .85em;
    height: .85em;
  }
  .meta a:focus-visible {
    outline: 2px solid var(--colour-white);
    outline-offset: .2em;
  }
  .preview {
    min-height: 1.25em;
    margin: .75rem 0 0;
    font-weight: bold;
    line-height: 1.25;
    overflow-wrap: anywhere;
    opacity: 0;
    transition: opacity .25s;
  }
  .preview.loaded {
    opacity: 1;
  }
  .preview.uppercase {
    text-transform: uppercase;
  }
  .empty {
    font-family: poppins-medium, sans-serif;
    color: var(--colour-text-muted);
  }
  @media (max-width: 56em) {
    .layout {
      grid-template-columns: minmax(0, 1fr);
      gap: 1.5rem;
    }
    .sidebar {
      position: static;
      padding-top: 0;
      gap: 1rem;
    }
    .creators {
      flex-direction: row;
      flex-wrap: wrap;
      gap: .4rem;
    }
    .creators h3 {
      display: none;
    }
    .creators a {
      gap: .5em;
      background: var(--colour-bg-panel);
    }
    .creators a[aria-current="page"] {
      box-shadow: inset 0 -3px 0 var(--colour-link);
    }
  }
  @media (max-width: 500px) {
    .intro h2 {
      font-size: 2em;
    }
    .toolbar {
      top: 4rem;
      flex-direction: column;
      align-items: stretch;
      gap: .5rem;
    }
    .size input {
      flex: 1;
      width: auto;
    }
  }
</style>
