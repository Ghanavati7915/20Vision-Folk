<script setup lang="ts">
definePageMeta({
  layout: 'sign',
})

//#region Instance
const { isMobile, isDesktop, isTablet } = useDevice()
//#endregion

//#region Import
import { ChevronLeft } from "lucide-vue-next"
import projectConfig from "@/../project.config"
import LoginForm from "@/components/forms/auth/login.vue"
import RegisterForm from "@/components/forms/auth/register.vue"
//#endregion


//#region Variables
const mode = ref<string>('login') //register - login
//#endregion

</script>

<template>
  <div :class="!isDesktop ? '' : 'grid lg:grid-cols-2' " class=" min-h-svh  bg-gray-900">
    <!--#region Logo-->
    <div v-if="!isDesktop" class="bg-gray-900 relative  overflow-hidden h-56">
      <BgRoadOfArts :isMobile="true"/>
      <div class="absolute -bottom-1 h-16 right-0 z-50 w-full bg-gradient-to-t from-gray-900 "></div>
    </div>
    <!--#endregion-->
    <!--#region Back ( Mobile ) -->
    <nuxt-link to="/" class="fixed top-5 left-5 rounded-full bg-gray-800 p-3">
      <ChevronLeft class="text-xs size-5 text-gray-200"/>
    </nuxt-link>
    <!--#endregion-->
    <!--#region Forms-->
    <div class="flex flex-col gap-4 p-6 md:p-10">
      <div v-if="isDesktop" class="flex justify-center gap-2 md:justify-start text-gray-200">
        <nuxt-link href="/" class="flex items-center gap-2 font-medium">
          <img src="/logo.png" class="size-8" alt="logo"/>
          {{projectConfig.projectTitle}}
        </nuxt-link>
      </div>
      <div class="flex flex-1 items-center justify-center">
        <div class="w-full max-w-xs">
          <LoginForm v-if="mode == 'login'" @onMode="()=>{mode = 'register'}"/>
          <RegisterForm v-if="mode == 'register'" @onMode="()=>{mode = 'login'}"/>
        </div>
      </div>
    </div>
    <!--#endregion-->
    <!--#region Desktop BackGround-->
    <div class="bg-gray-900 overflow-hidden max-h-screen relative hidden lg:block">
      <BgRoadOfArts/>
    </div>
    <!--#endregion-->
  </div>
</template>
