<script setup lang="ts">
    definePageMeta({
      middleware: ["logged-in"]
    })
</script>

<template>
<div>
  <slot/>
</div>
</template>

<style scoped>

</style>