<script setup lang="ts">
//#region Instance
const router = useRouter()
//#endregion
//#region LifeCycle
onMounted(async () => {
 await router.push('/artist')
})
//#endregion
</script>

<template>
  <div></div>
</template>
