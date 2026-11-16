<script setup>
  import { computed } from "vue"
  import { downloadPng } from "../lib/logos.js"
  import DownloadIcon from "./DownloadIcon.vue"

  const props = defineProps({ url: { type: String, required: true }, file: { type: String, required: true } })
  const format = computed(() => props.file.split(".").pop().toUpperCase())
</script>

<template>
  <div class="logo-downloads">
    <template v-if="format === 'SVG'">
      <a :href="url" :download="file"><DownloadIcon />SVG</a>
      <button type="button" @click="downloadPng(url, file)"><DownloadIcon />PNG</button>
    </template>
    <a v-else :href="url" :download="file"><DownloadIcon />{{ format }}</a>
  </div>
</template>

<style scoped>
  .logo-downloads {
    display: flex;
    justify-content: center;
    gap: 1.5em;
  }
  .logo-downloads > * {
    display: inline-flex;
    align-items: center;
    gap: .4em;
    padding: .25em 0;
    border: 0;
    font: inherit;
    font-family: poppins-medium, sans-serif;
    font-size: .9em;
    text-decoration: none;
    color: var(--colour-link);
    background: none;
    cursor: pointer;
    user-select: none;
  }
  .logo-downloads > *:hover {
    text-decoration: underline;
    text-underline-offset: .2em;
  }
  .logo-downloads > *:focus-visible {
    outline: 2px solid var(--colour-white);
    outline-offset: .2em;
  }
  .download-icon {
    width: .85em;
    height: .85em;
  }
</style>
