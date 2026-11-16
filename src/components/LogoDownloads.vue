<script setup>
  import { downloadPng } from "../lib/logos.js"

  defineProps({ url: { type: String, required: true }, file: { type: String, required: true } })
</script>

<template>
  <div class="logo-downloads">
    <template v-if="file.endsWith('.svg')">
      <a :href="url" :download="file">SVG</a>
      <button type="button" @click="downloadPng(url, file)">PNG</button>
    </template>
    <a v-else :href="url" :download="file">Download</a>
  </div>
</template>

<style scoped>
  .logo-downloads {
    display: flex;
    gap: .5em;
  }
  .logo-downloads > * {
    flex: 1;
    font: inherit;
    font-family: poppins-medium, sans-serif;
    font-size: .9em;
    text-align: center;
    text-decoration: none;
    color: var(--colour-text-light);
    background: var(--colour-button);
    border: 0;
    padding: .55em .5em;
    cursor: pointer;
    user-select: none;
    transition: background-color var(--short-animation-time);
  }
  .logo-downloads > *:hover,
  .logo-downloads > *:focus-visible {
    background: var(--colour-button-hover);
  }
  .logo-downloads > *:focus-visible {
    outline: 2px solid var(--colour-white);
  }
</style>
