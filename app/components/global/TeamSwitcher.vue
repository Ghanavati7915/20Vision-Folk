<script setup lang="ts">
//#region Import
import type { Component } from "vue"

import { ChevronsUpDown, Plus } from "lucide-vue-next"
import { ref } from "vue"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '~/components/ui/sidebar'
import {useTenants} from "~/composables/useUser";
//#endregion

//#region Instance
const { isMobile } = useSidebar()
const { userInfo } = useCapAuth()
const router = useRouter()
const {tokens,currentToken} = await useTenants()
//#endregion

//#region Variables
const teams = ref<any>([]);
const activeTeam = ref()
//#endregion

//#region Function
const filter = () => {
  teams.value = tokens
  if (teams.value.length > 1) {
    activeTeam.value = currentToken;
  }
}
const selectedTeam = async (team) => {
  if (activeTeam.value != team) {
    activeTeam.value = team
    await IndexDBInsert('config', 'Access-Token', team.access, team.accessTokenExpireDate)
    await IndexDBInsert('config', 'Refresh-Token', team.refresh, team.refreshTokenExpireDate)
    await IndexDBInsert('config', 'Current-Token', { ...team })
    await userInfo()
    await router.push('/')
    // close();
    setTimeout(()=>{
      location.reload()
    },150)
  }
}
//#endregion

//#region LifeCycle
onMounted(() => {
  filter();
})
//#endregion

</script>

<template>
  <SidebarMenu class="Estedad_FD_Light">
    <SidebarMenuItem v-if="teams.length > 0">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
              v-if="activeTeam"
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
<!--            <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">-->
<!--              <component :is="activeTeam.logo" class="size-4" />-->
<!--            </div>-->
            <div class="grid flex-1 text-right text-sm leading-tight">
              <span class="truncate font-medium">
                {{ activeTeam.title }}
              </span>
              <span class="truncate text-xs">{{ activeTeam.isLegal ? 'حساب حقوقی' : 'حساب حقیقی' }}</span>
            </div>
            <ChevronsUpDown class="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          align="start"
          :side="isMobile ? 'bottom' : 'right'"
          :side-offset="4"
        >
          <DropdownMenuLabel class="text-xs text-muted-foreground"> حساب های کاربری </DropdownMenuLabel>
          <DropdownMenuItem
            v-for="(team, index) in teams"
            :key="index"
            class="gap-2 p-2 cursor-pointer"
            @click="selectedTeam(team)"
          >
            {{ team.title }}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
