<script setup>
  import LOGOS from "../data/logos.json"
  import { previewPath } from "../lib/logos.js"

  const rows = Object.entries(LOGOS).filter(([, category]) => category.listed !== false).map(([id, category]) => ({
    name: category.name,
    href: `/official-logos/${category.page}`,
    preview: previewPath(id, category.logos[0].file)
  })).concat({
    name: "The history of the Minecraft Logo",
    href: "/official-logos/history",
    preview: "/logos/history/minecraft-logo-by-dock.webp"
  })
</script>

<template>
  <main vert class="logo-index">
    <a v-for="row in rows" :key="row.href" component="panel-link-wide" class="category-row" :href="row.href">
      <h2>{{ row.name }}</h2>
      <img :src="row.preview" alt="">
    </a>
  </main>
</template>

<style scoped>
  .category-row {
    max-width: 65rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5em;
    padding: .75em 1.5em;
    user-select: none;
  }
  .category-row h2 {
    margin: 0;
    text-align: left;
  }
  .category-row img {
    display: block;
    position: static;
    margin: 0;
    height: 3.5em;
    max-width: 50%;
    object-fit: contain;
    object-position: right;
  }
  @media (max-width: 500px) {
    .logo-index {
      --gap: 1em;
      padding-inline: 1em;
    }
    .category-row {
      gap: .75em;
      padding: .9em 1em;
    }
    .category-row h2 {
      font-size: .95em;
      line-height: 1.2;
    }
    .category-row img {
      height: 2em;
      max-width: 34%;
    }
  }
</style>
