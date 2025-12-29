<script setup lang="ts">
import { Motion } from 'motion-v'

const router = useRouter()
defineProps<{
  data: {
    id: number | string
    title: string
    author: string
    avatar: string
    image: string
  }
  index: number
}>()


const openPage = async (link:any) => {
  await router.push(`/art/${link}`)
}
</script>

<template>
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
      @click="openPage(data.id)"


  >
    <!-- Image -->
    <div class="relative overflow-hidden rounded-sm">
      <img
          :src="data.image"
          loading="lazy"
          class="w-full rounded-sm"
          alt="image"
      />

      <!-- Hover Overlay -->
      <div
          class="
          absolute inset-0
          bg-black/50
          opacity-0
          transition-opacity
          duration-200
          group-hover:opacity-100
        "
      />
    </div>

    <!-- Content -->
    <div class="mt-2">
      <div
          class="text-xs Estedad_FD_Light text-slate-500 flex items-center justify-start mb-2"
      >
        <img
            :src="data.avatar"
            alt="avatar"
            class="size-6 rounded-full ml-2"
        />
        {{ data.author }}
      </div>

      <h3 class="text-sm font-semibold">
        {{ data.title }}
      </h3>
    </div>
  </Motion>
</template>
