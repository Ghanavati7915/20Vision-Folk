<script setup lang="ts">
import {ConfigProvider} from "reka-ui";
useHead({
  htmlAttrs: {
    lang: 'fa',
    dir: 'rtl'
  },
  bodyAttrs: {
    class: 'Estedad_FD_Light select-none bg-gray-900 scroll-container'
  }
})

definePageMeta({
  pageTransition: {
    name: 'page',
    mode: 'out-in'
  }
})

</script>
<template>
    <ConfigProvider dir="rtl">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
    </ConfigProvider>
</template>


<style>
@reference "tailwindcss";

html {
  overflow-x: hidden !important;
  overscroll-behavior: none;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.8s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}

.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>