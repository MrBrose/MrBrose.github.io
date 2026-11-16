<script setup>
  import COMMUNITY from "../data/community.json"
  import LOGOS from "../data/logos.json"
  import LinkCard from "../components/LinkCard.vue"
  import MethodPanels from "../components/MethodPanels.vue"
  import SiteCarousel from "../components/SiteCarousel.vue"
  import { previewPath } from "../lib/logos.js"

  const logoPreview = previewPath("game", LOGOS.game.logos[0].file)
</script>

<template>
  <main class="home">
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
    margin-left: 2em;
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
