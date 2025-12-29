<script setup lang="ts">
//#region Imports
import projectConfig from "@/../project.config"
import type { SidebarProps } from '~/components/ui/sidebar'

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-vue-next"
import Main from '~/components/nav/Main.vue'
import User from '~/components/nav/User.vue'
import TeamSwitcher from '~/components/global/TeamSwitcher.vue'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '~/components/ui/sidebar'
import {onMounted} from "vue";
//#endregion

//#region Instance
const user = await useUser()
//#endregion

//#region Props
const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
})
//#endregion

//#region Variables
const data = ref<any>({
  navMain: []
})
//#endregion

//#region Function
const filterMenu = () => {
  data.value.navMain = projectConfig.menus
      .map((menu) => {
        // اگر زیرمنو داشت، اون‌ها رو هم فیلتر کن
        if (menu.items) {
          menu.items = menu.items.filter((item: any) => {
            if (!item.access || item.access.length === 0) return true
            return item.access.some((acc: string) => user.permissions.includes(acc))
          })
        }
        return menu
      })
      .filter((menu) => {
        // اگر خود منو دسترسی داشت، بررسی کن
        if (!menu.access || menu.access.length === 0) return true
        return menu.access.some((acc: string) => user.permissions.includes(acc))
      })
}
//#endregion

//#region LifeCycle
onMounted(() => {
  filterMenu();
})
//#endregion
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher/>
    </SidebarHeader>
    <SidebarContent>
      <Main :items="data.navMain" />
    </SidebarContent>
    <SidebarFooter>
      <User />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
