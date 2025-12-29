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
  <div class="container gap-6 p-5 mt-20 grid grid-cols-2 sm:grid-cols-6">
    <nuxt-link
        v-for="(it,i) in items" :key="i"
        :to="`/artist/${it.id}`"
        class="border-1 border-slate-900/40 rounded-lg p-2 py-4 sm:p-8 flex flex-col justify-start items-center cursor-pointer transition ease-in-out hover:-translate-y-2 hover:bg-slate-200">
      <img :src="it.avatar" alt="" class="rounded-full object-cover size-26"/>
      <span class="Estedad_FD_Bold mt-4 sm:mt-5">{{it.title}}</span>
    </nuxt-link>
  </div>
</template>

<style scoped>

</style>