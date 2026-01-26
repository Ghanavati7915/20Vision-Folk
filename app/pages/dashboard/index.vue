<script setup lang="ts">
//#region Imports
import projectConfig from "~~/project.config";
import Template1 from "~/components/cards/template-1.vue";
import Template2 from "~/components/cards/template-2.vue";
//#endregion

//#region Instance
const user = await useUser()
//#endregion

//#region Variables
const items = ref<any[]>([])
//#endregion

//#region Function
const filter = () => {
  // مرحله ۱: فیلتر دسترسی‌ها
  const filteredMenus = projectConfig.menus
      .map((menu) => {
        if (menu.items) {
          menu.items = menu.items.filter((item: any) => {
            if (!item.access || item.access.length === 0) return true
            return item.access.some((acc: string) => user.permissions.includes(acc))
          })
        }
        return menu
      })
      .filter((menu) => {
        if (!menu.access || menu.access.length === 0) return true
        return menu.access.some((acc: string) => user.permissions.includes(acc))
      })

  // مرحله ۲: تخت کردن ساختار و حذف url های "#"
  items.value = filteredMenus.flatMap((menu: any) => {
    const result: any[] = []
    // اگر خود منو url معتبر داشت
    if (menu.url && menu.url !== "#") {
      result.push({
        icon: menu.icon,
        url: menu.url,
        title: menu.title,
      })
    }
    // اگر زیرمنو داشت
    if (menu.items && menu.items.length > 0) {
      menu.items.forEach((item: any) => {
        if (item.url && item.url !== "#") {
          result.push({
            icon: item.icon,
            url: item.url,
            title: item.title,
          })
        }
      })
    }
    return result
  })
}
//#endregion

//#region LifeCycle
onMounted(() => {
  filter();
})
//#endregion
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <div class="grid auto-rows-min gap-4 grid-cols-1 md:grid-cols-4 lg:grid-cols-8">
      <template1
          v-for="(it,i) in items"
          :key="i"
          :index="i"
          :title="it.title"
          :icon="it.icon"
          :link="it.url"
      />
    </div>
  </div>
</template>
