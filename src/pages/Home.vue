<script setup>
  import COMMUNITY from "../data/community.json"
  import MethodPanels from "../components/MethodPanels.vue"
  import SiteCarousel from "../components/SiteCarousel.vue"
</script>

<template>
  <main vert>
    <div horz>
      <a component="panel-link" href="/official-logos">
        <h2>Official Logos</h2>
        <p>Find and download all the official Minecraft Logos</p>
      </a>
      <a component="panel-link" href="/download-fonts">
        <h2>Fonts</h2>
        <p>Discover and download 40+ Minecraft Style fonts for your logos</p>
      </a>
      <a component="panel-link" href="https://grid-calculator.theannoying.dev/" target="_blank">
        <h2>Grid Calculator</h2>
        <p>Calculate grid sizes for Adobe Illustrator Minecraft logos.</p>
      </a>
    </div>
    <div class="about-us">
      <h2>Meet the Community</h2>
      <SiteCarousel>
        <li v-for="member in COMMUNITY" :key="member.name" :img-src="`/images/heads/${member.head}`">
          <div class="about-me">
            <h2>{{ member.name }}</h2>
            <p v-html="member.bio"></p>
            <div v-if="member.portrait" class="fake-img" :style="`--src:url('/images/${member.portrait}');`"></div>
            <div v-else-if="member.background" class="background-img" :style="`background-image: url('/images/${member.background}');`"></div>
          </div>
        </li>
      </SiteCarousel>
      <div component="title">
        MAKING YOUR OWN LOGO
      </div>
    </div>
    <MethodPanels />
  </main>
  <main component="small-text">
    <p>Do you want to support the website and get a Minecraft logo out of it?<br><a href="https://www.fiverr.com/mrbrose_/create-you-a-custom-minecraft-title" target="_blank">Just click here</a> to purchase a Minecraft Logo and help keep this website running.</p>
  </main>
  <span class="bottom-img"></span>
</template>
