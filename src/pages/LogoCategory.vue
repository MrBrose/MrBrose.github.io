<script setup>
  import { vPopupable } from "popupable-vue"
  import { computed } from "vue"
  import { useRoute } from "vue-router"
  import LogoDownloads from "../components/LogoDownloads.vue"
  import LOGOS from "../data/logos.json"
  import { previewPath } from "../lib/logos.js"

  const route = useRoute()
  const id = computed(() => route.meta.category)
  const category = computed(() => LOGOS[id.value])
  const logos = computed(() => category.value.logos.map(logo => ({
    ...logo,
    url: `/logos/${id.value}/${logo.file}`,
    preview: previewPath(id.value, logo.file)
  })))
</script>

<template>
  <main class="logo-page">
    <h2>{{ category.heading }}</h2>
    <p v-if="category.note" class="note">{{ category.note }}</p>
    <ul class="logo-grid">
      <li v-for="(logo, i) in logos" :key="i" class="logo-item">
        <div class="preview">
          <img v-popupable="{ src: logo.url }" :src="logo.preview" :alt="logo.name" :title="logo.name" loading="lazy">
        </div>
        <LogoDownloads :url="logo.url" :file="logo.file" />
      </li>
    </ul>
  </main>
</template>

<style scoped>
  .logo-page {
    max-width: 120em;
    margin: 0 auto;
    width: 100%;
    color: var(--colour-text-light);
  }
  .logo-page > h2 {
    font-weight: 100;
    font-size: 3em;
    line-height: 1.1;
    text-align: center;
    margin: .25em 0 .6em;
  }
  .note {
    font-family: poppins-medium, sans-serif;
    text-align: center;
    opacity: 60%;
    margin: -1em 0 1.75em;
  }
  .logo-grid {
    --line: 3px solid #2c3440;
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .logo-item {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 2.5rem 3rem 2rem;
  }
  .logo-item:nth-child(n + 3) {
    border-top: var(--line);
  }
  .logo-item:nth-child(odd) {
    border-right: var(--line);
  }
  .logo-item:nth-child(even):nth-child(n + 3)::before {
    content: "";
    position: absolute;
    left: -18px;
    top: -18px;
    z-index: 1;
    width: 33px;
    height: 33px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 11 11' shape-rendering='crispEdges'%3E%3Cpath fill='%2310151c' d='M4 4h3v3H4z'/%3E%3Cpath fill='%232c3440' d='M5 0h1v3H5zM5 8h1v3H5zM0 5h3v1H0zM8 5h3v1H8zM3 3h5v1H3zM3 7h5v1H3zM3 4h1v3H3zM7 4h1v3H7zM5 5h1v1H5z'/%3E%3C/svg%3E") center / 100% 100% no-repeat;
    image-rendering: pixelated;
    pointer-events: none;
  }
  .logo-item:last-child:nth-child(odd):nth-child(n + 3)::after {
    content: "";
    position: absolute;
    right: -18px;
    top: -18px;
    z-index: 1;
    width: 33px;
    height: 33px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 11 11' shape-rendering='crispEdges'%3E%3Cpath fill='%2310151c' d='M4 4h3v3H4z'/%3E%3Cpath fill='%232c3440' d='M5 0h1v3H5zM5 8h1v3H5zM0 5h3v1H0zM3 3h5v1H3zM3 7h5v1H3zM3 4h1v3H3zM7 4h1v3H7zM5 5h1v1H5z'/%3E%3C/svg%3E") center / 100% 100% no-repeat;
    image-rendering: pixelated;
    pointer-events: none;
  }
  .preview {
    flex: 1;
    display: grid;
    place-items: center;
  }
  .preview img {
    display: block;
    width: 100%;
    height: auto;
    cursor: zoom-in;
  }
  @media (max-width: 50em) {
    .logo-grid {
      grid-template-columns: minmax(0, 1fr);
    }
    .logo-item:nth-child(n + 2) {
      border-top: var(--line);
    }
    .logo-item:nth-child(odd) {
      border-right: 0;
    }
    .logo-item:nth-child(even):nth-child(n + 3)::before,
    .logo-item:last-child:nth-child(odd):nth-child(n + 3)::after {
      display: none;
    }
  }
  @media (max-width: 500px) {
    .logo-page {
      padding-inline: 1em;
    }
    .logo-page > h2 {
      font-size: 2em;
    }
    .logo-item {
      padding: 1.75rem .5rem 1.5rem;
    }
  }
</style>
