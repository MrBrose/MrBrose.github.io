<script setup>
  import { vPopupable } from "popupable-vue"
  import PORTFOLIO from "../data/portfolio.json"
</script>

<template>
  <div id="page" component="page1">
    <nav>
      <h2>MrBrose's Logo Commissions</h2>
      <p>
        I will make you a custom Minecraft Title which will be perfect for minecraft servers, texture packs, mods, video thumbnails and more!
      </p>
    </nav>
    <main>
      <img src="/images/commissions/demo.png" alt="Minecraft Franchise">
    </main>
  </div>
  <div id="packages-container" component="packages-container">
    <div id="page" component="page2">
      <nav>
        <h2>Basic Logo - £5</h2>
        <p>
          Textures available:
          <br/>
          Metallic, Bubbles, Pixels, any Minecraft Block textures, any gradient or a single colour.
          <br/>
          All textures are available in any colour.
          <br/>All logos can have top, bottom and middle text
          <br/>
          For an extra $2 you can purchase the .ai Adobe Illustrator source file.
          <br/>Approximately 3-5 Day Delivery time
        </p>
      </nav>
      <main>
        <img src="/images/commissions/basic-logo.webp" alt="Minecraft Basic logo example" v-popupable>
      </main>
    </div>
    <div id="page" component="page2">
      <nav>
        <h2>Standard Logo - £10</h2>
        <p>
          All of the Basic package, Any custom textures, Hardcore hearts and all crack variants.
          <br/>
          All Crack variants are available in any colour.
          <br/>Approximately 4-7 Day Delivery time
        </p>
      </nav>
      <main>
        <img src="/images/commissions/standard-logo.webp" alt="Minecraft Standard logo example" v-popupable>
      </main>
    </div>
    <div id="page" component="page2">
      <nav>
        <h2>Premium Logo - £25 or more</h2>
        <p>
          Everything in the Standard package, Custom Fonts and custom models.
          <br/>
          The custom fonts can be pixelated fonts you have found, or if you supply a normal font you want to be made pixelated, I can do so for you, I can also make a unique font for you to match the style of your logo.
          <br/>Approximately 1-week Delivery time
        </p>
      </nav>
      <main>
        <img src="/images/commissions/wans-ancient-beasts.webp" alt="Minecraft Premium logo example" v-popupable>
      </main>
    </div>
  </div>
  <main component="text-block-com">
    <h2>How to Order:</h2>
  </main>
  <div class="panel-stack">
    <a class="recommended" component="panel-link-com" href="https://discord.com/users/720687632610361485" target="_blank">
      <div id="recommended-banner">
        Paypal/Debit or Credit Card/Apple Pay
      </div>
      <h2>Contact me on Discord!</h2>
      <p>Discord is the recommended way to purchase a Minecraft Logo, my username on discord is @mrbrose, just click this button to open my discord profile.  Alternativly you can email me at contact.mrbrose@gmail.com. I hope to speak to you soon!</p>
    </a>
  </div>
  <main component="text-block-com">
    <p>Example Logos portfolio:</p>
  </main>
  <div id="logo-portfolio-scroller" component="logo-portfolio-scroller" @wheel.prevent="e => e.currentTarget.scrollBy({ left: e.deltaY })">
    <img v-for="file in PORTFOLIO.commissions" :key="file" v-popupable :src="`/portfolio/${file}`" alt="Portfolio Image">
  </div>
</template>
