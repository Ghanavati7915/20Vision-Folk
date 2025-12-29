<script setup lang="ts">
import MenuSidebar from "~/components/global/menuSidebar.vue"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

definePageMeta({
  middleware: ["auth"]
})
</script>

<template>
    <SidebarProvider>
      <MenuSidebar side="right" variant="inset" />
      <SidebarInset>
        <NavTop/>
        <slot />
      </SidebarInset>
    </SidebarProvider>
</template>
