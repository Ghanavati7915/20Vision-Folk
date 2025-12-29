<script setup lang="ts">
import {ConfigProvider} from "reka-ui";
definePageMeta({
  pageTransition: {
    name: 'page',
    mode: 'out-in'
  }
})

</script>
<template>
  <html lang="fa" dir="rtl">
  <body class="Estedad_FD_Light scroll-container">
    <ConfigProvider dir="rtl">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
    </ConfigProvider>
  </body>
  </html>
</template>


<style>
@reference "tailwindcss";
.page-enter-active,
.page-leave-active {
  transition: all 0.8s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>