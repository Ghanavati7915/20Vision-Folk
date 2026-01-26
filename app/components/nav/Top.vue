<script setup lang="ts">
//#region Imports
import {SidebarTrigger} from "~/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from "~/components/ui/breadcrumb";
import {Separator} from "~/components/ui/separator";
import user from "~/components/nav/User.vue";
//#endregion

//#region Instance
const route = useRoute()
//#endregion

//#region Variables
const items = ref<any[]>([
  {title:'خانه',link:'/'},
])
//#endregion

//#region Functions
const makeBreadcrumbItem = (name:string) => {
  items.value = [{title:'خانه',link:'/'}];
  if (name == 'users'){
    items.value.push({title:'مخاطبین',link:'/'})
  }


}
//#endregion

//#region Watch
watch(
    () => route.name,
    () => {
      makeBreadcrumbItem(route.name)
    },
    { deep: true, immediate: true },
)
//#endregion

//#region LifeCycle
//#endregion
</script>

<template>
  <header class="flex h-16 shrink-0 items-center gap-2">
    <div class="flex items-center gap-2 px-4">
      <SidebarTrigger class="-ml-1" />
      <Separator
          orientation="vertical"
          class="mr-2 data-[orientation=vertical]:h-4"
      />
      <Breadcrumb>
        <BreadcrumbList>
          <template v-for="(item, index) in items" :key="item.link">
            <BreadcrumbItem>
              <BreadcrumbPage v-if="index === items.length - 1">
                {{ item.title }}
              </BreadcrumbPage>
              <BreadcrumbLink v-else :href="item.link">
                {{ item.title }}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator
                v-if="index < items.length - 1"
                class="hidden md:block"
            />
          </template>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </header>
</template>


<style scoped>

</style>