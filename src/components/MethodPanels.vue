<script setup>
  import METHODS from "../data/methods.json"
</script>

<template>
  <a v-for="method in METHODS" :key="method.page" component="panel-link-long" :href="`/making-a-logo/${method.page}`">
    <img :src="`/images/${method.icon}`" :alt="method.alt">
    <h2>{{ method.name }}</h2>
    <p>{{ method.description }}<br><em>{{ method.note }}</em></p>
  </a>
</template>
