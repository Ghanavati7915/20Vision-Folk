<script setup lang="ts">
//#region Import
import {Search} from "lucide-vue-next";
//#endregion

//#region Instance
const route = useRoute()
const { isDesktop } = useDevice()
//#endregion


//#region Service
import {search} from "@/services/base"
//#endregion

//#region Variables
const _search = ref('')
const _artists = ref<any[]>([])
const _arts = ref<any[]>([])
const searched = ref(false)
const loading = ref(false)
//#endregion

//#region Functions
const doSearch = async () => {
  console.log('DOSEARCH')
  loading.value = true
  searched.value = false

  _artists.value = []
  _arts.value = []

  const {result,data} = await search(_search.value)
  if (result) {
    data.results.artists.forEach((it: any) => {
      let verified = false
      it.userCertificates.forEach((xy: any) => {
        if (xy.certificate.title == "Verified") verified = true;
      })
      _artists.value.push({
        id: it.id,
        title: `${it.firstname} ${it.lastname} ${it.extentionname ? it.extentionname : ''}`,
        skills: it.userSkills.map((xy: any) => { return {id:xy.skill.id,title:xy.skill.title} }),
        verified,
        avatar: it.avatar ? it.avatar : `/img/sample/avatar.jpg`
      })
    });

    data.results.arts.forEach((it: any) => {

      let _avatar = `/img/sample/placeholder.jpg`
      if (it.artsFiles.length > 0) {
        _avatar = it.artsFiles[0].file
      }

      _arts.value.push({
        id: it.id,
        title: it.title,
        avatar: _avatar
      })
    });

  }
  searched.value = true
  loading.value = false
}
//#endregion

//#region watch
watch(() => route, async () => {
  if (route.query.text && route.query.text.toString().trim() != '') {
    _search.value = route.query.text;
    await doSearch()
  }
},{immediate:true,deep:true})
//#endregion

//#region LifeCycle
onMounted(async () => {
  if (route.query.text && route.query.text.toString().trim() != '') {
    _search.value = route.query.text;
    await doSearch()
  }
})
//#endregion

</script>

<template>
<div :class="isDesktop ? '!max-w-[520px]':''" class="flex flex-col flex-1 w-full p-1 ">
  <div v-if="!isDesktop" class="flex flex-1 mb-2 h-20">
    <InputGroup  class="rounded-xl px-5 py-6 bg-gray-700 border-0">
      <InputGroupInput placeholder="جستجو کنید" v-model="_search" class="text-gray-200" read-only @keyup.enter="doSearch"/>
      <InputGroupAddon align="inline-end">
        <InputGroupButton
            aria-label="Copy"
            title="Copy"
            size="icon-xs"
            @click="doSearch"
        >
          <Search />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>

  <div v-if="loading" class="flex flex-col h-full justify-center items-center text-sm text-gray-600 mt-10 overflow-hidden">
    در حال جستجو
  </div>

  <div v-if="!loading && _search == ''" class="flex flex-col h-full justify-center items-center text-sm text-gray-600 mt-10 overflow-hidden">
    مقداری را برای جستجو وارد کنید
  </div>

  <div v-if="!loading && _search != '' && !searched && _artists.length == 0 && _arts.length == 0" class="flex flex-col h-full justify-center items-center text-sm text-gray-600 mt-10 overflow-hidden">
    برای انجام جستجو Enter را بزنید
  </div>

  <div v-if="!loading && _search != '' && searched && _artists.length == 0 && _arts.length == 0" class="flex flex-col h-full justify-center items-center text-sm text-gray-600 mt-10 overflow-hidden">
    اطلاعاتی برای نمایش یافت نشد
  </div>


  <div v-if="!loading && _search != '' && searched && (_artists.length > 0 || _arts.length > 0)" class="flex flex-col h-full justify-center items-center text-sm text-gray-600 mt-10 overflow-hidden">

    <!--#region Artists-->
    <div v-if="_artists.length > 0" class="w-full flex flex-col gap-y-4 px-5">
      <span class="text-gray-400 mb-2 Estedad_FD_Bold"> هنرمندان </span>
      <nuxt-link
          v-for="(it,i) in _artists"
          :key="`artist_${i}`"
          :to="`/artist/${it.id}`"
          :class="[i != 0 ? 'border-t border-gray-200' : '']"
          class="flex justify-start items-center">
        <img :src="it.avatar" alt="avatar" class="size-16 rounded-full object-cover"/>
        <div class="flex flex-col w-full mr-4">
          <div class="flex w-full justify-start items-center gap-x-2">
            <div v-if="it.verified" class="bg-blue-500 -translate-y-0.5 size-4 rounded-full"></div>
            <span class="Estedad_FD_Bold text-sm text-gray-300">{{it.title}}</span>
          </div>
<!--          <span class="Estedad_FD_Bold text-gray-300">{{it.title}}</span>-->
          <div v-if="it.skills.length > 0" class="w-full flex justify-start items-center gap-x-2 mt-2">
            <div v-for="(iz , z) in it.skills" :key="`mySkill_${z}`" class="rounded-sm px-2 py-1 text-gray-400 text-xs bg-gray-700">{{iz.title}}</div>
          </div>
        </div>
      </nuxt-link>
    </div>
    <!--#endregion-->

    <!--#region Arts-->
    <div v-if="_arts.length > 0" class="w-full flex flex-col gap-y-4 px-5">
      <span class="text-gray-400 mb-2 Estedad_FD_Bold"> آثار </span>
      <div class="grid grid-cols-2 gap-2">


        <nuxt-link v-for="(it,i) in _arts" :key="`art_${i}`" :to="`/art/${it.id}`">
          <div class="text-xs Estedad_FD_Light text-slate-500 flex items-center justify-start mb-2 line-clamp-1">
            <img
                :src="it.avatar"
                alt="avatar"
                class="w-full rounded-sm object-cover"
            />
          </div>
          <div class="w-full flex justify-center items-center "><h3 class="text-xs text-white line-clamp-2">{{ it.title }}</h3></div>
        </nuxt-link>

      </div>

    </div>
    <!--#endregion-->
  </div>

</div>
</template>

<style scoped>

</style>