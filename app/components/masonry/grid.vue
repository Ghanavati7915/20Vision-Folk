<template>
  <div class="w-full gap-2 space-y-4">
    <!-- Skeleton loading -->
    <template v-if="loading">
      <masonry-item-skeletion v-for="n in skeletonCount" :key="'skeleton-' + n"/>
    </template>

    <!-- Real items -->
    <template v-else>
<!--      <MotionPresence>-->
      <masonry-item v-for="(item, index) in items" :key="item.id" :data="item" :index="index"/>
<!--      </MotionPresence>-->
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  items: Array<{
    id: number | string
    title: string
    author: string
    avatar: string
    image: string
  }>
  loading?: boolean
  skeletonCount?: number
}>()
</script>
