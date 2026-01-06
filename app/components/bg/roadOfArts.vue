<script setup lang="ts">
//#region Import
import { ref, onMounted, onUnmounted } from "vue"
//#endregion

//#region Props
interface Props {
  isMobile?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isMobile: false,
});
//#endregion

//#region Variables
const items = ref<string[]>([
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
])
const randomIndex = ref<number[]>([])
//#endregion

// تابع برای انتخاب رندوم 1/3 آیتم‌ها
function pickRandomIndexes() {
  const total = items.value.length
  const count = Math.floor(total / 3) // یک سوم تعداد آیتم‌ها
  const indexes: number[] = []

  while (indexes.length < count) {
    const rand = Math.floor(Math.random() * total)
    // جلوگیری از تکراری بودن و نزدیک بودن
    if (!indexes.includes(rand) && !indexes.includes(rand - 1) && !indexes.includes(rand + 1)) {
      indexes.push(rand)
    }
  }

  randomIndex.value = indexes
}

let interval: any
onMounted(() => {
  pickRandomIndexes()
  interval = setInterval(() => {
    pickRandomIndexes()
  }, 2500) // هر 2.5 ثانیه
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <div
      :class="isMobile ? 'columns-5 gap-4 rotate-20 -translate-x-30  -translate-y-20' : 'columns-7 gap-6 rotate-20 -translate-y-20 translate-x-30 w-[130%]'"
      class="p-2 overflow-hidden h-[120dvh]">
    <div
        :class="isMobile ? 'h-10' : 'h-64'"
        class="absolute -top-0.5 right-0 z-50 w-full bg-gradient-to-b from-gray-900"></div>
    <div
        :class="isMobile ? 'h-10' : 'h-64'"
        class="absolute -bottom-2 right-0 z-50 w-full bg-gradient-to-t from-gray-900 "></div>
    <div
        class="w-full gap-2 transition-all ease-in-out duration-1000  hover:-translate-y-2 opacity-100"
        v-for="(item, index) in items"
        :key="index"
        :class="[
    isMobile ? 'mb-2' : 'mb-6',
    randomIndex.includes(index) ? '!opacity-20' : ''
  ]"

    >
      <Motion
          as="div"
          class="group relative break-inside-avoid overflow-hidden cursor-pointer transition-all ease-in-out duration-200 hover:-translate-y-2"
          :initial="{ opacity: 0, y: 50, scale: 0.9 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{ delay: (0.2 * index), duration: 0.2, ease: 'easeInOut' }"
      >
        <!-- Image -->
        <div class="relative overflow-hidden rounded-sm">
          <img
              :src="item"
              loading="lazy"
              class="rounded-sm object-contain"
              :class="isMobile ? 'w-54' : 'w-full'"
              alt="image"
          />
        </div>
      </Motion>
    </div>
  </div>
</template>