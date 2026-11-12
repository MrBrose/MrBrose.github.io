<script setup>
  import { onBeforeUnmount, onMounted, useTemplateRef } from "vue"
  import { Particles } from "../lib/particles.js"

  const SETTINGS = ["MIN_SIZE", "MAX_SIZE", "MIN_XVEL", "MAX_XVEL", "MIN_YVEL", "MAX_YVEL", "MIN_ALPHA", "MAX_ALPHA", "PARTICLES_PER_PIXEL", "INITIAL_PARTICLES_PER_PIXEL", "PARTICLE_R", "PARTICLE_G", "PARTICLE_B", "CLICK_AMOUNT", "MOUSE_VEL_FADE_SPEED", "MOUSE_REPULSION", "MAX_REPULSION_VEL"]

  const canvas = useTemplateRef("canvas")
  const main = useTemplateRef("main")
  let particles

  function bind(setting) {
    const range = main.value.querySelector(`#${setting}_R`)
    const number = main.value.querySelector(`#${setting}_N`)
    range.value = particles[setting]
    number.value = particles[setting]
    range.addEventListener("input", () => {
      number.value = range.value
      particles[setting] = Number(range.value)
    })
    number.addEventListener("change", () => {
      range.value = number.value
      particles[setting] = Number(number.value)
    })
  }

  function restart() {
    const fresh = new Particles(canvas.value)
    for (const setting of SETTINGS) fresh[setting] = particles[setting]
    particles.stop()
    particles = fresh
    particles.start()
  }

  onMounted(() => {
    particles = new Particles(canvas.value)
    SETTINGS.forEach(bind)
    particles.start()
  })

  onBeforeUnmount(() => particles.stop())
</script>

<template>
  <canvas ref="canvas" id="CustomDust" class="dust"></canvas>
  <main ref="main">
    <label for="show">show options</label>
    <input type="checkbox" id="show">
    <div class="value">
      <label>MIN_SIZE</label>
      <input type="range" step="any" min="0" max="50" id="MIN_SIZE_R">
      <input type="number" id="MIN_SIZE_N">
    </div>
    <div class="value">
      <label>MAX_SIZE</label>
      <input type="range" step="any" min="0" max="50" id="MAX_SIZE_R">
      <input type="number" id="MAX_SIZE_N">
    </div>
    <div class="value"></div>
    <div class="value">
      <label>MIN_XVEL</label>
      <input type="range" step="any" min="-10" max="10" id="MIN_XVEL_R">
      <input type="number" id="MIN_XVEL_N">
    </div>
    <div class="value">
      <label>MAX_XVEL</label>
      <input type="range" step="any" min="-10" max="10" id="MAX_XVEL_R">
      <input type="number" id="MAX_XVEL_N">
    </div>

    <div class="value">
      <label>MIN_YVEL</label>
      <input type="range" step="any" min="-10" max="10" id="MIN_YVEL_R">
      <input type="number" id="MIN_YVEL_N">
    </div>
    <div class="value">
      <label>MAX_YVEL</label>
      <input type="range" step="any" min="-10" max="10" id="MAX_YVEL_R">
      <input type="number" id="MAX_YVEL_N">
    </div>

    <div class="value">
      <label>MIN_ALPHA</label>
      <input type="range" step="any" min="0" max="1" id="MIN_ALPHA_R">
      <input type="number" id="MIN_ALPHA_N">
    </div>
    <div class="value">
      <label>MAX_ALPHA</label>
      <input type="range" step="any" min="0" max="1" id="MAX_ALPHA_R">
      <input type="number" id="MAX_ALPHA_N">
    </div>

    <div class="value">
      <label>PARTICLES_PER_PIXEL</label>
      <input type="range" step="any" min="0" max="50" id="PARTICLES_PER_PIXEL_R">
      <input type="number" id="PARTICLES_PER_PIXEL_N">
    </div>
    <div class="value">
      <label>INITIAL_PARTICLES_PER_PIXEL</label>
      <input type="range" step="any" min="0" max="50" id="INITIAL_PARTICLES_PER_PIXEL_R">
      <input type="number" id="INITIAL_PARTICLES_PER_PIXEL_N">
    </div>

    <div class="value">
      <label>PARTICLE_R</label>
      <input type="range" step="any" min="0" max="255" id="PARTICLE_R_R">
      <input type="number" id="PARTICLE_R_N">
    </div>
    <div class="value">
      <label>PARTICLE_G</label>
      <input type="range" step="any" min="0" max="255" id="PARTICLE_G_R">
      <input type="number" id="PARTICLE_G_N">
    </div>
    <div class="value">
      <label>PARTICLE_B</label>
      <input type="range" step="any" min="0" max="255" id="PARTICLE_B_R">
      <input type="number" id="PARTICLE_B_N">
    </div>

    <div class="value">
      <label>CLICK_AMOUNT</label>
      <input type="range" step="any" min="0" max="50" id="CLICK_AMOUNT_R">
      <input type="number" id="CLICK_AMOUNT_N">
    </div>

    <div class="value">
      <label>MOUSE_VEL_FADE_SPEED</label>
      <input type="range" step="any" min="0" max="0.001" id="MOUSE_VEL_FADE_SPEED_R">
      <input type="number" id="MOUSE_VEL_FADE_SPEED_N">
    </div>

    <div class="value">
      <label>MOUSE_REPULSION</label>
      <input type="range" step="any" min="0" max="10" id="MOUSE_REPULSION_R">
      <input type="number" id="MOUSE_REPULSION_N">
    </div>
    <div class="value">
      <label>MAX_REPULSION_VEL</label>
      <input type="range" step="any" min="0" max="2" id="MAX_REPULSION_VEL_R">
      <input type="number" id="MAX_REPULSION_VEL_N">
    </div>
    <div class="value">
      <button id="restart" @click="restart">restart</button>
    </div>
  </main>
</template>

<style scoped>
  label[for="show"]{
    color: white;
  }
  .value{
    font-family: "poppins-medium";
    color: white;
    width: min-content;
    display: flex;
  }
  .value input[type="number"]{
    width: 10ch;
  }
  #show:not(:checked) ~ .value{
    display: none;
  }
</style>
