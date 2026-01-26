<script setup lang="ts">
//#region Imports
import {getAll} from "~/services/art";
//#endregion

//#region Instance
//#endregion

//#region Variables
const loading = ref(true)
const items = ref<any[]>([])
//#endregion

//#region Function
const get = async () => {
  const {result,data} = await getAll({page:1,pageSize:100,search:''})
  if (result) {
    data.results.forEach((it: any) => {
      let image = '';
      if (it.artsFiles.length > 0) {
        image = it.artsFiles[0].file
      }

      items.value.push({
        id: it.id,
        title: it.title,
        category: it.artsCategories.title,
        author: `${it.users.firstname} ${it.users.lastname} ${it.users.extentionname ? it.users.extentionname : ''}`,
        avatar: it.users.avatar ? it.users.avatar : `/img/sample/avatar.jpg`,
        image
      })
    });
  }
}
//#endregion
//#region LifeCycle
onMounted(async () => {
  await get();
  loading.value = false
})
//#endregion
</script>

<template>
  <div class="container gap-6 p-2 columns-2 sm:columns-6 sm:gap-8 sm:p-4">
    <masonry-grid :items="items" :loading="loading" :skeleton-count="9" />
  </div>
</template>
