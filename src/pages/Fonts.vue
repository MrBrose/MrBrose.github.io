<script setup>
  import FONTS from "../data/fonts.json"
</script>

<template>
  <main vert>
    <a v-for="author in FONTS" :key="author.page" component="panel-link-wide" :href="`/download-fonts/${author.page}`">
      <h2>{{ author.name }}</h2>
    </a>
  </main>
</template>
