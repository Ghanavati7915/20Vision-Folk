<script setup lang="ts">
//#region Import
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-vue-next"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '~/components/ui/sidebar'
//#endregion

//#region Instance
const router = useRouter()
const user = await useUser()
const { isMobile } = useSidebar()
//#endregion
//#region Function
const logout = async () => {
  await IndexDBClear('config')
  await router.push('/login')
}
//#endregion
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <ChevronsUpDown class="ml-auto size-4" />
            <div class="grid flex-1 text-right text-sm leading-tight">
              <span class="truncate font-medium">{{ user.firstName }} {{ user.lastName }}</span>
              <span class="truncate text-xs">{{ user.userName }}</span>
            </div>
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarImage :src="user.avatar ?  user.avatar : null" :alt="user.firstName" />
              <AvatarFallback class="rounded-lg"> {{user.firstName[0]}} </AvatarFallback>
            </Avatar>

          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg Estedad_FD_Light"
          :side="isMobile ? 'bottom' : 'right'"
          align="end"
          :side-offset="4"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarImage :src="user.avatar ?  user.avatar : null" :alt="user.firstName" />
                <AvatarFallback class="rounded-lg">{{user.firstName[0]}}</AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-right text-sm leading-tight Estedad_FD_Light">
                <span class="truncate font-semibold">{{ user.firstName }} {{ user.lastName }}</span>
                <span class="truncate text-xs mt-1">{{ user.userName }}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Sparkles />
              ارتقا
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BadgeCheck />
              حساب کاربری
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell />
              اعلان ها
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="logout">
            <LogOut />
            خروج
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
