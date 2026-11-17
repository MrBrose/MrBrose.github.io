<script setup>
  import { vPopupable } from "popupable-vue"
  import LogoDownloads from "../components/LogoDownloads.vue"

  const STEPS = [
    {
      text: "Minecraft's first logo, simply made out of cobblestone:",
      images: [{ src: "/logos/old/minecraft-logo1.webp", alt: "Minecraft's first logo" }]
    },
    {
      text: "Minecraft logo concept by Dock. This was never properly implemented:",
      images: [{ src: "/logos/history/minecraft-logo-by-dock.webp", alt: "Minecraft logo concept by Dock" }]
    },
    {
      text: "Minecraft logo concepts by Junkboy:",
      images: [{ src: "/logos/history/800px-minecraft-logo-concept-art.jpg", alt: "Minecraft logo concepts" }]
    },
    {
      text: "The final design of the Minecraft logo by Junkboy:",
      images: [
        { src: "/logos/history/800px-minecraft-logo-final-concept-art.jpg", alt: "Minecraft logo final concept" },
        { src: "/logos/old/minecraft-logo2.svg", alt: "Minecraft's third logo" }
      ]
    },
    {
      text: "A pixelated version of the logo to go in-game was also created:",
      images: [{ src: "/logos/old/pixel.webp", alt: "Minecraft's pixelated logo" }]
    },
    {
      text: "The Minecraft logo got another update in 2015. Changes included smoothening the cracks, changing the colours and making the black outline thicker:",
      images: [{ src: "/logos/old/minecraft-logo3.svg", alt: "Minecraft's fourth logo" }]
    },
    {
      text: "In 2021 the Minecraft logo was redesigned by Bold Scandinavia. This logo was a full redesign, which completely changed the cracks, as well as changing the colours and model. There are now two logos, one for the game (top) and one for the brand (bottom):",
      images: [
        { src: "/logos/game/minecraft.svg", alt: "Minecraft" },
        { src: "/logos/game/minecraft-franchise.svg", alt: "Minecraft Franchise" }
      ]
    }
  ]

  const fileName = src => src.split("/").pop()
</script>

<template>
  <main class="history-page">
    <header class="intro">
      <h2>The history of the Minecraft logo</h2>
      <p>The Minecraft logo has gone through a lot of changes throughout the years. You can look back on them here.</p>
    </header>
    <ol class="steps">
      <li v-for="(step, i) in STEPS" :key="i" class="step">
        <p class="caption">{{ step.text }}</p>
        <figure v-for="image in step.images" :key="image.src">
          <img v-popupable :src="image.src" :alt="image.alt" :title="image.alt" loading="lazy">
          <LogoDownloads :url="image.src" :file="fileName(image.src)" />
        </figure>
      </li>
    </ol>
  </main>
</template>

<style scoped>
  .history-page {
    --line: 3px solid #2c3440;
    width: 100%;
    max-width: 52rem;
    margin: 0 auto;
    color: var(--colour-text-light);
  }
  .intro {
    margin-bottom: 1rem;
    text-align: center;
  }
  .intro h2 {
    margin: .25em 0 .4em;
    font-weight: normal;
    font-size: 3em;
    line-height: 1.1;
  }
  .intro p,
  .caption {
    margin: 0 auto;
    max-width: 40rem;
    font-family: poppins-medium, sans-serif;
    line-height: 1.6;
    color: var(--colour-text-muted);
    text-align: center;
  }
  .steps {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .step {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    padding: 3rem 0;
  }
  .step + .step {
    border-top: var(--line);
  }
  .step + .step::before {
    content: "";
    position: absolute;
    left: 50%;
    top: -18px;
    width: 33px;
    height: 33px;
    translate: -50% 0;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 11 11' shape-rendering='crispEdges'%3E%3Cpath fill='%2310151c' d='M3 3h5v5H3z'/%3E%3Cpath fill='%232c3440' d='M0 5h3v1H0zM8 5h3v1H8zM3 3h5v1H3zM3 7h5v1H3zM3 4h1v3H3zM7 4h1v3H7zM5 5h1v1H5z'/%3E%3C/svg%3E") center / 100% 100% no-repeat;
    image-rendering: pixelated;
    pointer-events: none;
  }
  figure {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 0;
  }
  figure img {
    display: block;
    width: 100%;
    height: auto;
    max-height: 30rem;
    object-fit: contain;
    cursor: zoom-in;
  }
  @media (max-width: 500px) {
    .history-page {
      padding-inline: .5rem;
    }
    .intro h2 {
      font-size: 2em;
    }
    .step {
      gap: 1.25rem;
      padding: 2rem 0;
    }
  }
</style>
