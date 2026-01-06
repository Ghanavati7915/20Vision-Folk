<script setup lang="ts">

//#region Service
import { getAll} from "@/services/artist"
import {ref} from "vue";
//#endregion

//#region Variables
const loading = ref(true)
const items = ref<any[]>([
  {
    id: 1,
    title: `علی خوش نویس زاده`,
    avatar: `/img/avatar.jpg`
  }
  ])
//#endregion

//#region Functions
const get = async () => {
  loading.value = true
  const {result,data} = await getAll({page:1,pageSize:100,search:''})
  if (result) {
    items.value = data.results.map((it: any) => ({
      id: it.id,
      title: `${it.firstname} ${it.lastname} ${it.extentionname}`,
      skills: it.userSkills,
      avatar: `/img/avatar.jpg`
    }));
    items.value.push({
      id: 1,
      title: `علی خوش نویس زاده`,
      avatar: `/img/avatar.jpg`
    });
    console.log('data : ' , data)
  }
  loading.value = false
}
//#endregion

//#region LifeCycle
onMounted(async () => {
  await get();
})
//#endregion
</script>

<template>
  <div class="container gap-6 p-5 grid grid-cols-1 sm:grid-cols-4">
    <nuxt-link
        v-for="(it,i) in items" :key="i"
        :to="`/artist/${it.id}`"
        class="border-1 border-gray-600 rounded-lg p-2 py-2 sm:p-8 flex justify-start items-center cursor-pointer transition ease-in-out hover:-translate-y-2 hover:bg-slate-800">
      <img :src="it.avatar" alt="" class="rounded-lg object-cover size-15"/>
      <span class="Estedad_FD_Light mr-2 text-gray-400">{{it.title}}</span>
    </nuxt-link>
  </div>
</template>

<style scoped>

</style>