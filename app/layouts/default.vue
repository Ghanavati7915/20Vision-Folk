<script setup lang="ts">
</script>

<template>
  <div class="flex justify-center items-start w-full min-h-[100dvh] h-full bg-[#f5f4f2]">
    <!--#region Header-->
    <showcase-header/>
    <!--#endregion-->
    <!--#region Body-->
    <slot />
    <!--#endregion-->
  </div>
</template>
