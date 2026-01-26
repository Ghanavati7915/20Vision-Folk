<script setup lang="ts">

//#region Service
import { getAll} from "@/services/artist"
import { skills} from "@/services/base"
import {ref} from "vue";
//#endregion

//#region Variables
const loading = ref(true)
const items = ref<any[]>([])
const _skills = ref<any[]>([])
//#endregion

//#region Functions
const get = async () => {
  const {result,data} = await getAll({page:1,pageSize:100,search:''})
  if (result) {
    data.results.forEach((it: any) => {
      let verified = false
      it.userCertificates.forEach((xy: any) => {
        if (xy.certificate.title == "Verified") verified = true;
      })
      items.value.push({
        id: it.id,
        title: `${it.firstname} ${it.lastname} ${it.extentionname ? it.extentionname : ''}`,
        skills: it.userSkills.map((xy: any) => { return {id:xy.skill.id,title:xy.skill.title} }),
        verified,
        avatar: it.avatar ? it.avatar : `/img/sample/avatar.jpg`
      })
    });
  }
}
const getSkills = async () => {
  const {result,data} = await skills()
  if (result) {
    _skills.value = data.results.map((it: any) => ({
      ...it,
      selected: false
    }));
  }
}
//#endregion

//#region Functions
const artists = computed(() => {
  let x = _skills.value.filter((it: any) => it.selected).map((it: any) => it.id);
  if (x.length == 0) {
    return items.value;
  }
  let y = [];
  items.value.forEach((it: any) => {
    let flag = false;
    it.skills.forEach((iz: any) => {
      if (x.includes(iz.id)) flag = true;
    })
    if (flag) y.push(it)
  });
  return y
})
//#endregion

//#region LifeCycle
onMounted(async () => {
  loading.value = true
  await getSkills();
  await get();
  loading.value = false
})
//#endregion
</script>

<template>
  <div class="container ">
<!--#region Skills-->
    <div class="grid grid-cols-3 sm:grid-cols-6 justify-center items-center my-4 gap-x-2 gap-y-2">
      <div
          v-for="(it,i) in _skills"
           :key="`skill_${i}`"
          @click="it.selected = !it.selected"
          :class="it.selected ? '!bg-gray-400 !opacity-100' : ' '"
          class=" bg-gray-700 opacity-60 text-white min-w-24 transition-all line-clamp-1 ease-in-out duration-150 flex justify-center items-center text-[0.60rem] px-2 py-2 cursor-pointer rounded-md">
        {{it.title}}
      </div>
    </div>
    <!--#endregion-->
<!--#region Artists-->
    <div class="gap-2 p-3 grid grid-cols-2 sm:grid-cols-8">
      <nuxt-link
          v-for="(it,i) in artists" :key="i"
          :to="`/artist/${it.id}`"
          class="p-2 flex flex-col relative justify-center items-center cursor-pointer transition ease-in-out hover:-translate-y-2 hover:bg-slate-800">
        <img :src="it.avatar" alt="" class="rounded-lg object-cover size-26"/>
        <div class="flex w-full mt-3 justify-center items-center gap-x-2">
          <div v-if="it.verified" class="bg-blue-500 -translate-y-0.5 size-4 rounded-full"></div>
          <span class="Estedad_FD_Bold text-xs text-gray-400">{{it.title}}</span>
        </div>
        <div v-if="it.skills.length > 0" class="w-full flex justify-center items-center gap-x-2 mt-2">
          <div v-for="(iz , z) in it.skills" :key="`mySkill_${z}`" class="rounded-sm px-2 py-1 text-gray-400 text-xs bg-gray-700">{{iz.title}}</div>
        </div>
      </nuxt-link>
    </div>
<!--#endregion-->
  </div>
</template>

<style scoped>

</style>