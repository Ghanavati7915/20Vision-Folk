<script setup lang="ts">
//#region Imports
import {House, Search, User,Plus,UsersRound, Heart} from 'lucide-vue-next'
//#endregion
</script>

<template>
<div class="fixed w-[100dvw] h-[6dvh] bg-gray-900 z-50 text-gray-100 bottom-0 left-0 p-2 px-10 flex items-center justify-between">

  <nuxt-link to="/" class="flex justify-center items-center"><House class="size-5" /></nuxt-link>
  <nuxt-link to="/" class="flex justify-center items-center"><Search class="size-5" /></nuxt-link>
  <nuxt-link to="/" class="flex justify-center items-center"><Plus class="size-5" /></nuxt-link>
  <nuxt-link to="/artist" class="flex justify-center items-center"><UsersRound class="size-5" /></nuxt-link>
  <nuxt-link to="/login" class="flex justify-center items-center"><User class="size-5" /></nuxt-link>

</div>
</template>

<style scoped>

</style>