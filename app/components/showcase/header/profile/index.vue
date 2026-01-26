<script setup lang="ts">
//#region Instance
const user = await useUser()
//#endregion
</script>

<template>
  <div class="w-1/3 mx-auto justify-end items-center px-5 text-gray-200">
    <nuxt-link v-if="user" to="/new" class="Estedad_FD_Light text-xs mr-5 cursor-pointer"> افزودن طرح جدید </nuxt-link>
    <nuxt-link :to="user ? '/profile' : '/login'" class="Estedad_FD_Light text-xs mr-5 cursor-pointer"> حساب کاربری </nuxt-link>
  </div>
</template>


