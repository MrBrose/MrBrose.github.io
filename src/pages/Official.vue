<script setup>
  import LOGOS from "../data/logos.json"

  const listed = Object.values(LOGOS).filter(category => category.listed !== false)
</script>

<template>
  <main vert>
    <a v-for="category in listed" :key="category.page" component="panel-link-wide" :href="`/official-logos/${category.page}`"><h2>{{ category.name }}</h2></a>
    <a component="panel-link-wide" href="/official-logos/history"><h2>The history of the Minecraft Logo</h2></a>
  </main>
</template>
