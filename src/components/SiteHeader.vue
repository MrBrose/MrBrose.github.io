<script setup>
  import { ref, useTemplateRef, watch } from "vue"
  import { useRoute } from "vue-router"
  import { MENU } from "../pages.js"
  import { transitioning } from "../router.js"
  import ArrowIcon from "./ArrowIcon.vue"
  import DiscordIcon from "./DiscordIcon.vue"

  const route = useRoute()
  const open = ref(false)
  const bar = useTemplateRef("bar")
  let held

  watch(transitioning, isOn => {
    if (isOn) {
      held = bar.value.querySelector(".nav a:hover")
      held?.classList.add("held")
    } else {
      held?.classList.remove("held")
      held = null
    }
  }, { flush: "sync" })

  function isCurrent(link) {
    const path = route.path.replace(/(.)\/$/, "$1")
    return path === link.href || path.startsWith(`${link.href}/`)
  }

  function onKey(e) {
    if (e.key === "Escape" && open.value) open.value = false
  }

  watch(open, isOpen => {
    document.querySelectorAll("main, footer").forEach(el => el.inert = isOpen)
    if (isOpen) addEventListener("keydown", onKey)
    else removeEventListener("keydown", onKey)
  })

  watch(() => route.path, () => open.value = false)
</script>

<template>
  <header :class="{ open }">
    <div ref="bar" class="bar">
      <a href="/" class="brand">
        <img src="/images/logo.png" class="cube" alt="">
        <img src="/images/MCTitles.svg" class="wordmark" alt="MCTitles">
      </a>
      <nav id="site-nav" class="nav">
        <a v-for="link in MENU" :key="link.href" :href="link.href" :target="link.external ? '_blank' : null" :aria-current="isCurrent(link) ? 'page' : null" :class="{ 'icon-link': link.icon }" :title="link.icon ? link.label : null">
          <DiscordIcon v-if="link.icon === 'discord'" />
          <span class="label">{{ link.label }}</span>
          <ArrowIcon v-if="link.external && !link.icon" external class="external" />
        </a>
      </nav>
      <button type="button" class="toggle" :aria-expanded="open" aria-controls="site-nav" aria-label="Menu" @click="open = !open">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <div class="backdrop" @click="open = false"></div>
  </header>
</template>

<style scoped>
  header {
    position: sticky;
    top: 0;
    z-index: 15;
  }
  .bar {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 2em;
    height: 4.5rem;
    padding-inline: max(1.25rem, calc((100% - 80rem) / 2));
    background: var(--colour-banner);
    box-shadow: 0 .25em 1.5em #0000004b;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: .75rem;
    height: 100%;
    margin-right: auto;
    user-select: none;
  }
  .brand:focus-visible {
    outline: 2px solid var(--colour-white);
    outline-offset: .25em;
  }
  .cube {
    display: block;
    height: 2.9rem;
    width: auto;
  }
  .wordmark {
    display: block;
    height: 2.4rem;
    width: auto;
  }
  .nav {
    display: flex;
    align-items: center;
    gap: .25em;
  }
  .nav a {
    position: relative;
    display: flex;
    align-items: center;
    gap: .35em;
    padding: .55em .8em;
    font-size: 1.15rem;
    color: var(--colour-text-light);
    text-decoration: none;
    white-space: nowrap;
    user-select: none;
    transition: background-color var(--short-animation-time);
  }
  .nav a:hover,
  .nav a:focus-visible,
  .nav a.held {
    background: var(--colour-dropdown-hover);
  }
  .nav a:focus-visible {
    outline: 2px solid var(--colour-white);
  }
  .nav a.icon-link {
    padding-inline: .7em;
  }
  .icon-link .label {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  .nav a[aria-current="page"]::after {
    content: "";
    position: absolute;
    left: .8em;
    right: .8em;
    bottom: .2em;
    height: .15em;
    background: var(--colour-link);
  }
  .external {
    width: .6em;
    height: .6em;
    opacity: .7;
  }
  .toggle {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 2.75rem;
    height: 2.75rem;
    padding: 0 .6rem;
    border: 0;
    background: none;
    cursor: pointer;
    user-select: none;
  }
  .toggle:hover,
  .toggle:focus-visible {
    background: var(--colour-dropdown-hover);
  }
  .toggle:focus-visible {
    outline: 2px solid var(--colour-white);
  }
  .toggle span {
    display: block;
    height: 3px;
    background: var(--colour-text-light);
    transition: translate var(--animation-time), rotate var(--animation-time), opacity var(--animation-time);
  }
  .open .toggle span:nth-child(1) {
    translate: 0 8px;
    rotate: 45deg;
  }
  .open .toggle span:nth-child(2) {
    opacity: 0;
  }
  .open .toggle span:nth-child(3) {
    translate: 0 -8px;
    rotate: -45deg;
  }
  .backdrop {
    display: none;
  }
  @media (max-width: 70em) {
    .toggle {
      display: flex;
    }
    .nav {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      flex-direction: column;
      align-items: stretch;
      gap: 0;
      padding: .5em max(1.25rem, calc((100% - 80rem) / 2)) 1em;
      background: var(--colour-banner);
      box-shadow: 0 1em 2em #00000066;
      clip-path: inset(0 0 100% 0);
      visibility: hidden;
      transition: clip-path var(--animation-time), visibility 0s var(--animation-time);
    }
    .open .nav {
      clip-path: inset(0 0 -3em 0);
      visibility: visible;
      transition: clip-path var(--animation-time);
    }
    .nav a {
      justify-content: center;
      padding: .75em;
      font-size: 1.5rem;
    }
    .nav a.icon-link {
      gap: .5em;
      padding-inline: .75em;
    }
    .icon-link .label {
      position: static;
      width: auto;
      height: auto;
      overflow: visible;
      clip-path: none;
    }
    .nav a[aria-current="page"]::after {
      left: 50%;
      right: auto;
      width: 3em;
      translate: -50% 0;
      bottom: .35em;
    }
    .backdrop {
      display: block;
      position: fixed;
      inset: 0;
      z-index: 1;
      background: #00000099;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--animation-time);
    }
    .open .backdrop {
      opacity: 1;
      pointer-events: auto;
    }
  }
  @media (max-width: 500px) {
    .bar {
      height: 4rem;
      padding-inline: 1rem;
    }
    .cube {
      height: 2.5rem;
    }
    .wordmark {
      height: 1.9rem;
    }
  }
</style>
