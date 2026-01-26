<script setup lang="ts">
//#region Instance
const user = await useUser()
//#endregion
</script>

<template>
  <div class="w-1/3 mx-auto justify-start items-center px-5 text-gray-200">
    <nuxt-link to="/" class="Estedad_FD_Bold text-sm cursor-pointer"> آفاق هنر </nuxt-link>
    <nuxt-link to="/landing" class="Estedad_FD_Light text-xs mr-5 cursor-pointer"> آثار </nuxt-link>
    <nuxt-link to="/artist" class="Estedad_FD_Light text-xs mr-5 cursor-pointer"> هنرمندان </nuxt-link>
  </div>
</template>

<style scoped>

</style>