<script setup lang="ts">
//#region Variables
const items = ref<any[]>([
  `/img/art/1.jpeg`,
  `/img/art/2.jpeg`,
  `/img/art/3.jpeg`,
  `/img/art/4.jpeg`,
  `/img/art/5.jpeg`,
  `/img/art/6.jpeg`,
  `/img/art/7.jpeg`,
  `/img/art/8.jpeg`,
  `/img/art/9.jpeg`,
  `/img/art/10.jpeg`,
  `/img/art/11.jpeg`,
  `/img/art/12.jpeg`,
  `/img/art/13.jpeg`,
  `/img/art/14.jpeg`,
  `/img/art/15.jpeg`,
  `/img/art/16.jpeg`,
  `/img/art/17.jpeg`,
  `/img/art/1.jpeg`,
  `/img/art/2.jpeg`,
  `/img/art/3.jpeg`,
  `/img/art/4.jpeg`,
  `/img/art/5.jpeg`,
  `/img/art/6.jpeg`,
  `/img/art/7.jpeg`,
  `/img/art/8.jpeg`,
  `/img/art/9.jpeg`,
  `/img/art/10.jpeg`,
  `/img/art/11.jpeg`,
  `/img/art/12.jpeg`,
  `/img/art/13.jpeg`,
  `/img/art/14.jpeg`,
  `/img/art/15.jpeg`,
  `/img/art/16.jpeg`,
  `/img/art/17.jpeg`,
  `/img/art/1.jpeg`,
  `/img/art/2.jpeg`,
  `/img/art/3.jpeg`,
  `/img/art/4.jpeg`,
  `/img/art/5.jpeg`,
  `/img/art/6.jpeg`,
  `/img/art/7.jpeg`,
  `/img/art/8.jpeg`,
  `/img/art/9.jpeg`,
  `/img/art/10.jpeg`,
  `/img/art/11.jpeg`,
  `/img/art/12.jpeg`,
  `/img/art/13.jpeg`,
  `/img/art/14.jpeg`,
  `/img/art/15.jpeg`,
  `/img/art/16.jpeg`,
  `/img/art/17.jpeg`,
])
//#endregion
</script>

<template>
  <div class="gap-6 p-2 overflow-hidden columns-2 sm:columns-6 sm:gap-8 sm:p-4 space-y-8 -translate-y-40 -translate-x-30 rotate-20">
    <div class="w-full gap-2 " v-for="(item, index) in items" :key="item.id">
    <Motion
      as="div"
      class="
      group
      relative
      break-inside-avoid
      overflow-hidden
      cursor-pointer
      transition-all
      ease-in-out
      duration-200
      hover:-translate-y-2
    "
      :initial="{ opacity: 0, y: 50, scale: 0.9 }"
      :animate="{ opacity: 1, y: 0, scale: 1 }"
      :transition="{ delay: (0.2 * index), duration: 0.2, ease: 'easeInOut' }"
  >
    <!-- Image -->
    <div class="relative overflow-hidden rounded-sm">
      <img
          :src="item"
          loading="lazy"
          class="w-full rounded-sm"
          alt="image"
      />
    </div>
  </Motion>
    </div>
  </div>
</template>

<style scoped>

</style>