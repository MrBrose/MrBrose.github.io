<script setup>
  import { onBeforeUnmount, onMounted, useTemplateRef } from "vue"
  import { Particles } from "../lib/particles.js"

  const canvas = useTemplateRef("canvas")
  let particles

  onMounted(() => {
    particles = new Particles(canvas.value)
    particles.start()
  })

  onBeforeUnmount(() => particles.stop())
</script>

<template>
  <canvas ref="canvas" id="dust"></canvas>
</template>
