<script setup>
  import ArrowIcon from "./ArrowIcon.vue"

  defineProps({
    href: { type: String, required: true },
    title: { type: String, required: true },
    cta: { type: String, required: true },
    external: { type: Boolean, default: false }
  })
</script>

<template>
  <a class="link-card" :href="href" :target="external ? '_blank' : null">
    <div class="visual">
      <slot name="visual"></slot>
    </div>
    <div class="body">
      <h3>{{ title }}</h3>
      <slot></slot>
      <span class="cta">{{ cta }}<ArrowIcon :external="external" class="cta-icon" :class="{ external }" /></span>
    </div>
  </a>
</template>

<style scoped>
  .link-card {
    display: flex;
    flex-direction: column;
    background: var(--colour-bg-panel);
    color: var(--colour-text-light);
    text-decoration: none;
    user-select: none;
    transition: translate var(--short-animation-time), background-color var(--short-animation-time);
  }
  .link-card:hover,
  .link-card:focus-visible {
    translate: 0 -.25em;
    background: var(--colour-dropdown-hover);
  }
  .link-card:focus-visible {
    outline: 2px solid var(--colour-white);
  }
  .visual {
    display: grid;
    place-items: center;
    height: 8rem;
    padding: 1rem;
    background: #00000038;
    overflow: hidden;
  }
  .visual :slotted(img) {
    display: block;
    max-width: 85%;
    max-height: 100%;
    object-fit: contain;
  }
  .body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: .6rem;
    padding: 1.25rem 1.5rem 1.4rem;
  }
  h3 {
    margin: 0;
    font-weight: normal;
    font-size: 1.75rem;
    line-height: 1.1;
  }
  .body :slotted(p) {
    margin: 0;
    font-family: poppins-medium, sans-serif;
    font-size: .95rem;
    line-height: 1.5;
    color: var(--colour-text-muted);
  }
  .cta {
    display: inline-flex;
    align-items: center;
    gap: .45em;
    margin-top: auto;
    padding-top: .4rem;
    font-family: poppins-medium, sans-serif;
    font-size: .95rem;
    color: var(--colour-link);
  }
  .cta-icon {
    width: .8em;
    height: .8em;
    transition: translate var(--short-animation-time);
  }
  .link-card:is(:hover, :focus-visible) .cta-icon {
    translate: .2em 0;
  }
  .link-card:is(:hover, :focus-visible) .cta-icon.external {
    translate: .15em -.15em;
  }
  @media (max-width: 500px) {
    .visual {
      height: 6.5rem;
    }
    .body {
      padding: 1.1rem 1.25rem 1.25rem;
    }
  }
</style>
