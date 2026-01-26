<script setup lang="ts">
//#region Instance
let user = await useUser()
const route = useRoute()
//#endregion

//#region watch
watch(() => route, async () => {
  console.log('route')

  user = await useUser()
  console.log('user : ' , user)
},{immediate:true,deep:true})
//#endregion
</script>

<template>
  <div class="w-1/3 mx-auto justify-end items-center px-5 text-gray-200">
    <nuxt-link v-if="user" to="/new" class="Estedad_FD_Light text-xs mr-5 cursor-pointer"> افزودن طرح جدید </nuxt-link>
    <nuxt-link :to="user ? '/profile' : '/login'" class="Estedad_FD_Light text-xs mr-5 cursor-pointer">
      <span v-if="!user"> حساب کاربری </span>
      <span v-if="user" class="line-clamp-1">{{user?.firstName}} {{user?.lastName}}</span>
    </nuxt-link>
  </div>
</template>


