<script setup lang="ts">
const items = ref<any[]>([
  {
    id: 1,
    title: `علی خوش نویس زاده`,
    avatar: `/img/avatar.jpg`
  }
  ])
</script>

<template>
  <div class="container gap-6 p-2 columns-2 sm:columns-3 sm:gap-8 sm:p-4 mt-5 mt-18">
    <nuxt-link v-for="(it,i) in items" :key="i" :to="`artist/${it.id}`" class="border border-1 rounded-lg p-8 flex justify-start items-center cursor-pointer transition ease-in-out hover:-translate-y-2 hover:bg-slate-200">
      <img :src="it.avatar" alt="" class="rounded-full size-20"/>
      <span class="Estedad_FD_Bold mr-3 ">{{it.title}}</span>
    </nuxt-link>
  </div>
</template>

<style scoped>

</style>