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
      <li v-for="(logo, i) in logos" :key="i" class="logo-card">
        <div class="preview">
          <img v-popupable="{ src: logo.url }" :src="logo.preview" :alt="logo.name" loading="lazy">
        </div>
        <h3>{{ logo.name }}</h3>
        <LogoDownloads :url="logo.url" :file="logo.file" class="card-downloads" />
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
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5em;
  }
  .logo-card {
    background: var(--colour-bg-panel);
    border-radius: .5em;
    padding: 1em;
    display: flex;
    flex-direction: column;
    gap: .75em;
  }
  .preview {
    margin-top: auto;
  }
  .preview img {
    display: block;
    width: 100%;
    height: auto;
    cursor: zoom-in;
  }
  .logo-card h3 {
    margin: 0;
    font-family: poppins-medium, sans-serif;
    font-weight: normal;
    font-size: 1em;
    text-align: center;
  }
  .card-downloads {
    margin-top: auto;
  }
  @media (max-width: 50em) {
    .logo-grid {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  @media (max-width: 500px) {
    .logo-page {
      padding-inline: 1em;
    }
    .logo-page > h2 {
      font-size: 2em;
    }
  }
</style>
