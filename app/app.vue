<script setup lang="ts">
import {ConfigProvider} from "reka-ui";
</script>
<template>
  <html lang="fa" dir="rtl">
  <body class="Estedad_FD_Light">
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
</style>