<script setup>
  import METHODS from "../data/methods.json"
  import LinkCard from "./LinkCard.vue"
</script>

<template>
  <div class="methods">
    <LinkCard v-for="method in METHODS" :key="method.page" :href="`/making-a-logo/?method=${method.page}`" :title="method.name" cta="Read the guide">
      <template #visual>
        <img :src="`/images/${method.icon}`" :alt="method.alt" class="icon">
      </template>
      <p>{{ method.description }}</p>
      <p class="note">{{ method.note }}</p>
    </LinkCard>
  </div>
</template>

<style scoped>
  .methods {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
    width: 100%;
    max-width: 72rem;
    margin-inline: auto;
  }
  .icon {
    height: 4rem;
    width: auto;
  }
  .note {
    font-style: italic;
    font-size: .85rem;
  }
  @media (max-width: 56em) {
    .methods {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
