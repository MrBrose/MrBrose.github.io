<script setup>
  import { computed } from "vue"
  import { useRoute } from "vue-router"
  import FONTS from "../data/fonts.json"
  import { fontFamily } from "../lib/fonts.js"

  const route = useRoute()
  const author = computed(() => route.meta.author)
  const fonts = computed(() => FONTS[author.value].fonts.map(font => ({ ...font, family: fontFamily(author.value, font.file) })))
</script>

<template>
  <main vert>
    <div horz>
      <a v-for="font in fonts" :key="font.file" component="panel-link-f" :href="`/fonts/${author}/${font.file}`" :style="{ '--font-url': `'${font.family}'` }">
        <h2>{{ font.name }}</h2>
        <p :class="font.size">{{ font.sample ?? "ABC abc" }}</p>
      </a>
    </div>
  </main>
</template>
