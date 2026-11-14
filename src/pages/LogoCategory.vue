<script setup>
  import { computed } from "vue"
  import { useRoute } from "vue-router"
  import LOGOS from "../data/logos.json"

  const route = useRoute()
  const category = computed(() => LOGOS[route.meta.category])
</script>

<template>
  <main component="image-list">
    <h2>{{ category.heading }}</h2>
    <p>To download any of these logos, Right click, Save Image As...<template v-if="category.note"><br>{{ category.note }}</template></p>
    <div v-for="(logo, i) in category.logos" :key="i"><img :src="`/logos/${route.meta.category}/${logo.file}`" :alt="logo.name"></div>
  </main>
</template>
