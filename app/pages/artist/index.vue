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
      title: `${it.firstname} ${it.lastname} ${it.extentionname ? it.extentionname : ''}`,
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
  <div class="container gap-2 p-3 grid grid-cols-2 sm:grid-cols-4">
    <nuxt-link
        v-for="(it,i) in items" :key="i"
        :to="`/artist/${it.id}`"
        class="p-2 flex flex-col justify-center items-center cursor-pointer transition ease-in-out hover:-translate-y-2 hover:bg-slate-800">
      <img :src="it.avatar" alt="" class="rounded-full object-cover size-26"/>
      <span class="Estedad_FD_Light mt-3 text-gray-400">{{it.title}}</span>
    </nuxt-link>
  </div>
</template>

<style scoped>

</style>