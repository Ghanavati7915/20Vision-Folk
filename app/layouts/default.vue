<script setup lang="ts">
//#region Instance
const { isMobile, isDesktop, isTablet } = useDevice()
//#endregion
</script>

<template>
  <div class="flex flex-1 justify-center items-start w-full min-h-[100dvh] h-full bg-gray-900 relative">
    <!--#region Header-->
    <showcase-header v-if="isDesktop" class="sm:hide"/>
    <!--#endregion-->
    <!--#region Body-->
    <div :class="isDesktop ? 'pt-18 h-full ' : 'pb-[7dvh] min-h-[100dvh] '" class="flex flex-1 w-full p-2 justify-center items-start">
      <slot/>
    </div>
    <!--#endregion-->
    <!--#region Header-->
    <showcase-navbar v-if="!isDesktop"/>
    <!--#endregion-->
  </div>
</template>
