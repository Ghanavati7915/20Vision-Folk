<template>
  <div class="absolute inset-0">
    <RippleCircle v-for="index in numberOfCircles" :key="index"
                         :opacity="baseCircleOpacity - index * circleOpacityDowngradeRatio"
                         :size="baseCircleSize + index * spaceBetweenCircle" :animation-delay="index * waveSpeed"
                         :border-style="index === numberOfCircles - 1 ? 'dashed' : 'solid'" :class="circleClass" />
  </div>
</template>

<script setup lang="ts">
import RippleCircle from "~/components/bg/rippleCircle.vue";

interface Props {
  baseCircleSize?: number;
  baseCircleOpacity?: number;
  spaceBetweenCircle?: number;
  circleOpacityDowngradeRatio?: number;
  circleClass?: string;
  waveSpeed?: number;
  numberOfCircles?: number;
}

withDefaults(defineProps<Props>(), {
  baseCircleSize: 40,
  baseCircleOpacity: 0.20,
  circleOpacityDowngradeRatio: 0.03,
  waveSpeed: 190,
  spaceBetweenCircle: 50,
  numberOfCircles: 4,
});
</script>