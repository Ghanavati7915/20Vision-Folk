<script setup lang="ts">
definePageMeta({
  layout: 'sign',
})

//#region Import
import projectConfig from "@/../project.config"
import LoginForm from "@/components/forms/auth/login.vue"
import RegisterForm from "@/components/forms/auth/register.vue"
//#endregion


//#region Variables
const mode = ref<string>('login') //register - login
//#endregion

</script>

<template>
  <div class="grid min-h-svh lg:grid-cols-2">
    <div class="flex flex-col gap-4 p-6 md:p-10">
      <div class="flex justify-center gap-2 md:justify-start">
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
    <div class="bg-muted relative hidden lg:block">
      <img
          src="/img/login.jpg"
          alt="Image"
          class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      >
    </div>
  </div>
</template>
