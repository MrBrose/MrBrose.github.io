<script setup>
  defineProps({ external: { type: Boolean, default: false } })
</script>

<template>
  <svg class="arrow-icon" viewBox="0 0 16 16" aria-hidden="true">
    <path v-if="external" d="M5 3h8v8M13 3 3 13" />
    <path v-else d="M2 8h10M8 3.5l4.5 4.5-4.5 4.5" />
  </svg>
</template>

<style scoped>
  .arrow-icon {
    display: inline-block;
    flex: none;
    width: 1em;
    height: 1em;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: square;
    stroke-linejoin: miter;
  }
</style>
