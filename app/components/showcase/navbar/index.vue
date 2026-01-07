<script setup lang="ts">
//#region Imports
import {House, Search, User,Plus,UsersRound, Heart} from 'lucide-vue-next'
import {useSidebar} from "~/components/ui/sidebar";
//#endregion

//#region Instance
const user = await useUser()
const route = useRoute()
//#endregion

//#region LifeCycle
onMounted(async () => {

})
//#endregion
</script>

<template>
<div class="navbar">

  <nuxt-link to="/" :class="route.fullPath == '/' ? 'opacity-100' : 'opacity-30'" class="item">
    <House class="size-4" />
    <span> خانه </span>
  </nuxt-link>

  <nuxt-link to="/search" :class="route.fullPath == '/search' ? 'opacity-100' : 'opacity-30'" class="item">
    <Search class="size-4" />
    <span> جستجو </span>
  </nuxt-link>

  <nuxt-link to="/new" :class="route.fullPath == '/new' ? 'opacity-100' : 'opacity-30'" class="item">
    <Plus class="size-4" />
    <span> افزودن </span>
  </nuxt-link>

  <nuxt-link to="/artist" :class="route.fullPath == '/artist' ? 'opacity-100' : 'opacity-30'" class="item">
    <UsersRound class="size-4" />
    <span> هنرمندان </span>
  </nuxt-link>

  <nuxt-link :to="user ? '/profile' : '/login'" :class="route.fullPath == '/profile' ? 'opacity-100' : 'opacity-30'" class="item">
    <User class="size-4" />
    <span> حساب کاربری </span>
  </nuxt-link>

</div>
</template>

<style scoped>
@reference "tailwindcss";
.navbar{
  @apply fixed w-[100dvw] h-[6dvh] px-10 bg-gray-900 z-50 text-gray-100 bottom-0 left-0 flex items-center justify-between;
  .item {
    @apply flex flex-col justify-center items-center transition-all ease-in-out duration-300 pt-1;
    span {
      @apply text-[0.65rem] mt-1;
    }
  }
}
</style>