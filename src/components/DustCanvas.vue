<script setup>
  import { onBeforeUnmount, onMounted, useTemplateRef } from "vue"
  import { GlowParticles, Particles } from "../lib/particles.js"

  const KINDS = { dust: Particles, glow: GlowParticles }

  const props = defineProps({ kind: { type: String, required: true } })
  const canvas = useTemplateRef("canvas")
  let particles

  onMounted(() => {
    particles = new KINDS[props.kind](canvas.value)
    particles.start()
  })

  onBeforeUnmount(() => particles.stop())
</script>

<template>
  <canvas v-if="kind === 'dust'" ref="canvas" id="dust"></canvas>
  <canvas v-else ref="canvas" class="dust"></canvas>
</template>
