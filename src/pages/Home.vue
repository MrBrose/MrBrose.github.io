<script setup>
  import COMMUNITY from "../data/community.json"
  import LOGOS from "../data/logos.json"
  import LinkCard from "../components/LinkCard.vue"
  import MethodPanels from "../components/MethodPanels.vue"
  import SiteCarousel from "../components/SiteCarousel.vue"
  import { previewPath } from "../lib/logos.js"
  import animatedLogo from "../assets/mctitles-animated.svg?raw"
  import { onBeforeUnmount, onMounted, useTemplateRef } from "vue"

  const FOLLOW_DELAY = 1000
  const SPRING = 7
  const MAX_SPEED = 0.85

  const logoPreview = previewPath("game", LOGOS.game.logos[0].file)
  const heroTitle = useTemplateRef("heroTitle")
  let stopFollowing

  function followPointer(animations, area) {
    const { delay, activeDuration } = animations[0].effect.getComputedTiming()
    let target
    let current = 1
    let velocity = 0
    let following = false
    let frame
    let last
    let waiting

    function step(now) {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      velocity += (SPRING ** 2 * (target - current) - 2 * SPRING * velocity) * dt
      velocity = Math.min(MAX_SPEED, Math.max(-MAX_SPEED, velocity))
      current += velocity * dt
      if (Math.abs(target - current) < 0.0005 && Math.abs(velocity) < 0.001) {
        current = target
        velocity = 0
        frame = null
      } else frame = requestAnimationFrame(step)
      for (const animation of animations) animation.currentTime = delay + Math.min(1, Math.max(0, current)) * activeDuration
    }

    function chase() {
      if (!following || target === undefined || frame) return
      last = performance.now()
      frame = requestAnimationFrame(step)
    }

    function onMove(e) {
      if (e.pointerType !== "mouse") return
      const { left, width } = area.getBoundingClientRect()
      target = Math.min(1, Math.max(0, (e.clientX - left) / width))
      chase()
    }

    addEventListener("pointermove", onMove, { passive: true })
    Promise.all(animations.map(animation => animation.finished)).then(() => {
      waiting = setTimeout(() => {
        for (const animation of animations) animation.pause()
        following = true
        chase()
      }, FOLLOW_DELAY)
    }, error => {
      if (error.name !== "AbortError") throw error
    })

    return () => {
      removeEventListener("pointermove", onMove)
      clearTimeout(waiting)
      cancelAnimationFrame(frame)
    }
  }

  onMounted(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(hover: hover) and (pointer: fine)").matches) return
    const animations = heroTitle.value.querySelector("svg").getAnimations({ subtree: true })
    if (!animations.length) throw new Error("the hero logo has no animations to follow the pointer with")
    stopFollowing = followPointer(animations, heroTitle.value.parentElement)
  })

  onBeforeUnmount(() => stopFollowing?.())
</script>

<template>
  <main class="home">
    <section class="hero">
      <h1 ref="heroTitle" v-html="animatedLogo"></h1>
      <p>Official Minecraft logos, 40+ fonts and guides for making your own Minecraft style titles.</p>
      <div class="actions">
        <a href="/official-logos" class="primary">Browse official logos</a>
        <a href="/making-a-logo">Make your own</a>
      </div>
    </section>
    <section class="tools">
      <LinkCard href="/official-logos" title="Official Logos" cta="Browse logos">
        <template #visual>
          <img :src="logoPreview" alt="">
        </template>
        <p>Find and download all the official Minecraft logos.</p>
      </LinkCard>
      <LinkCard href="/download-fonts" title="Fonts" cta="Browse fonts">
        <template #visual>
          <span class="font-sample">ABC 123</span>
        </template>
        <p>Discover and download 40+ Minecraft style fonts for your logos.</p>
      </LinkCard>
      <LinkCard href="https://grid-calculator.theannoying.dev/" title="Grid Calculator" cta="Open the calculator" external>
        <template #visual>
          <span class="grid-sample"></span>
        </template>
        <p>Calculate grid sizes for Adobe Illustrator Minecraft logos.</p>
      </LinkCard>
    </section>
    <section class="about-us">
      <h2>Meet the Community</h2>
      <SiteCarousel>
        <li v-for="member in COMMUNITY" :key="member.name" :img-src="`/images/heads/${member.head}`">
          <div class="about-me">
            <h2>{{ member.name }}</h2>
            <p v-html="member.bio"></p>
            <div v-if="member.portrait" class="fake-img" :style="`--src:url('/images/${member.portrait}');`"></div>
            <div v-else-if="member.background" class="background-img" :style="`background-image: url('/images/${member.background}');`"></div>
            <div v-else class="placeholder">
              <img :src="`/images/heads/${member.head}`" alt="">
            </div>
          </div>
        </li>
      </SiteCarousel>
    </section>
    <section>
      <h2>Making Your Own Logo</h2>
      <MethodPanels />
    </section>
  </main>
  <main component="small-text">
    <p>Do you want to support the website and get a Minecraft logo out of it?<br><a href="https://www.fiverr.com/mrbrose_/create-you-a-custom-minecraft-title" target="_blank">Just click here</a> to purchase a Minecraft Logo and help keep this website running.</p>
  </main>
  <span class="bottom-img"></span>
</template>

<style scoped>
  .home {
    display: flex;
    flex-direction: column;
    gap: 4.5rem;
    width: 100%;
    max-width: calc(72rem + 2 * var(--gap));
    margin-inline: auto;
    padding-top: 2.5rem;
  }
  .home > section > h2 {
    margin: 0 0 1.5rem;
    font-weight: normal;
    font-size: clamp(2rem, 4.5vw, 3rem);
    line-height: 1.1;
    text-align: center;
    color: var(--colour-text-light);
  }
  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding-block: 2rem 1rem;
    text-align: center;
  }
  .hero h1 {
    width: min(46rem, 100%);
    margin: 0;
  }
  .hero h1 :deep(svg) {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
  }
  .hero p {
    max-width: 36rem;
    margin: 0;
    font-family: poppins-medium, sans-serif;
    font-size: 1.15rem;
    line-height: 1.5;
    color: var(--colour-text-muted);
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: .75rem;
    margin-top: .5rem;
  }
  .actions > * {
    padding: .8em 1.5em;
    border: 0;
    font: inherit;
    font-family: poppins-medium, sans-serif;
    color: var(--colour-text-light);
    text-decoration: none;
    background: var(--colour-bg-panel);
    cursor: pointer;
    user-select: none;
    transition: background-color var(--short-animation-time);
  }
  .actions > :hover,
  .actions > :focus-visible {
    background: var(--colour-dropdown-hover);
  }
  .actions > :focus-visible {
    outline: 2px solid var(--colour-white);
  }
  .actions > .primary {
    color: var(--colour-bg-light);
    background: var(--colour-link);
  }
  .actions > .primary:hover,
  .actions > .primary:focus-visible {
    background: #a3d5ff;
  }
  .tools {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
  }
  .about-us :deep([component="carousel"]) {
    max-width: none;
  }
  .placeholder {
    grid-area: image;
    display: grid;
    place-items: center;
  }
  .placeholder img {
    display: block;
    width: min(100%, 11rem);
    height: auto;
    image-rendering: pixelated;
    box-shadow: .6rem .6rem 0 #00000059;
  }
  @media (max-width: 60em) {
    .placeholder {
      display: none;
    }
  }
  .font-sample {
    font-size: 3.25rem;
    line-height: 1;
    color: var(--colour-text-light);
  }
  .grid-sample {
    --cell: 20px;
    position: relative;
    display: block;
    width: calc(round(down, 100% - 1px, var(--cell)) + 1px);
    height: calc(var(--cell) * 4 + 1px);
    background-image: linear-gradient(to right, #7cc4ff40 1px, transparent 1px), linear-gradient(to bottom, #7cc4ff40 1px, transparent 1px);
    background-size: var(--cell) var(--cell);
  }
  .grid-sample::after {
    content: "";
    position: absolute;
    left: calc(round(down, (100% - 1px) / 2, var(--cell)) - var(--cell) * 2 - 1px);
    top: calc(var(--cell) - 1px);
    width: calc(var(--cell) * 4 + 3px);
    height: calc(var(--cell) * 2 + 3px);
    border: 3px solid var(--colour-link);
    background: #7cc4ff26;
  }
  @media (max-width: 56em) {
    .tools {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  @media (max-width: 500px) {
    .home {
      gap: 3.5rem;
      padding-top: 1.5rem;
    }
    .grid-sample {
      --cell: 16px;
    }
  }
</style>
