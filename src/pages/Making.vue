<script setup>
  import { computed } from "vue"
  import { useRoute } from "vue-router"
  import IllustratorGuide from "../components/guides/IllustratorGuide.vue"
  import MinecraftTitleGeneratorGuide from "../components/guides/MinecraftTitleGeneratorGuide.vue"
  import PhotoshopGuide from "../components/guides/PhotoshopGuide.vue"
  import METHODS from "../data/methods.json"

  const GUIDES = { "minecraft-title-generator": MinecraftTitleGeneratorGuide, illustrator: IllustratorGuide, photoshop: PhotoshopGuide }

  const route = useRoute()
  const method = computed(() => METHODS.find(entry => entry.page === route.query.method) ?? METHODS[0])
</script>

<template>
  <main component="text-block" class="making">
    <nav class="tabs" aria-label="Methods">
      <a v-for="entry in METHODS" :key="entry.page" :href="`/making-a-logo/?method=${entry.page}`" :aria-current="entry === method ? 'page' : null">
        <img :src="`/images/${entry.icon}`" alt="">
        <span class="name">{{ entry.name }}</span>
        <span class="description">{{ entry.description }}</span>
      </a>
    </nav>
    <component :is="GUIDES[method.page]" />
  </main>
</template>

<style scoped>
  .tabs {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-bottom: 2.5rem;
    border-bottom: 3px solid #2c3440;
  }
  .tabs a {
    display: grid;
    grid-row: span 3;
    grid-template-rows: subgrid;
    row-gap: .6rem;
    align-content: start;
    margin-bottom: -3px;
    padding: 1.25rem;
    border-bottom: 3px solid transparent;
    color: var(--colour-text-muted);
    text-decoration: none;
    user-select: none;
    transition: background-color var(--short-animation-time), color var(--short-animation-time);
  }
  .tabs a:hover,
  .tabs a:focus-visible {
    background: var(--colour-dropdown-hover);
    color: var(--colour-text-light);
  }
  .tabs a:focus-visible {
    outline: 2px solid var(--colour-white);
  }
  .tabs a[aria-current] {
    background: var(--colour-bg-panel);
    border-bottom-color: var(--colour-link);
    color: var(--colour-text-light);
  }
  .tabs img {
    width: auto;
    height: 2.25rem;
    margin-bottom: .25rem;
  }
  .name {
    align-self: end;
    font-size: 1.25rem;
    line-height: 1.1;
  }
  .description {
    font-family: poppins-medium, sans-serif;
    font-size: .85rem;
    line-height: 1.45;
    color: var(--colour-text-muted);
  }
  @media (max-width: 600px) {
    .tabs a {
      grid-row: span 2;
      justify-items: center;
      row-gap: .5rem;
      padding: .75rem .5rem;
      text-align: center;
    }
    .name {
      font-size: 1rem;
    }
    .description {
      display: none;
    }
  }
</style>
