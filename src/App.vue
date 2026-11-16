<script setup>
  import { computed } from "vue"
  import { useRoute } from "vue-router"
  import DustCanvas from "./components/DustCanvas.vue"
  import SiteFooter from "./components/SiteFooter.vue"
  import SiteHeader from "./components/SiteHeader.vue"

  const route = useRoute()
  const page = computed(() => route.meta)
</script>

<template>
  <DustCanvas v-if="page.dust === 'dust'" />
  <SiteHeader v-if="page.header" :page="page" />
  <RouterView />
  <SiteFooter v-if="page.footer" :links="page.footer" />
</template>
