<script setup lang="ts">
    definePageMeta({
      middleware: ["logged-in"]
    })
</script>

<template>
<slot/>
</template>

<style scoped>

</style>