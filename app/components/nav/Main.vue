<script setup lang="ts">
import type { LucideIcon } from "lucide-vue-next"
import { ChevronLeft } from "lucide-vue-next"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '~/components/ui/sidebar'

defineProps<{
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}>()
</script>

<template>
  <SidebarGroup>
<!--    <SidebarGroupLabel>Platform</SidebarGroupLabel>-->
    <SidebarMenu>
      <Collapsible
        v-for="item in items"
        :key="item.title"
        as-child
        :default-open="item.isActive"
        class="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger as-child>
            <SidebarMenuButton :tooltip="item.title" class="flex items-center justify-between w-full">
              <nuxt-link :to="!item.items ? item.url : 'javascript:'"  class="flex items-center gap-2 flex-1">
                <component :is="item.icon" v-if="item.icon" class="size-4"  />
                <span>{{ item.title }}</span>
              </nuxt-link>
              <ChevronLeft v-if="item.items" class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:-rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent v-if="item.items">
            <SidebarMenuSub>
              <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                <SidebarMenuSubButton as-child>
                  <nuxt-link :to="subItem.url">
                    <span>{{ subItem.title }}</span>
                  </nuxt-link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
</template>
