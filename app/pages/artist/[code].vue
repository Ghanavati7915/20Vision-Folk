<script setup lang="ts">
//#region Imports
import { PhoneCall } from "lucide-vue-next"
import { Globe } from "lucide-vue-next"
import { Mail } from "lucide-vue-next"
//#endregion

//#region Service
import {getByID} from "@/services/artist"
import {getByArtistID} from "~/services/art";
//#endregion

//#region Instance
const route = useRoute()
const router = useRouter()
//#endregion

//#region Variables
const loading = ref(true)
const tabs = ref<any[]>([
  {id:'info',title:'معرفی'},
  {id:'arts',title:'آثار'},
  {id:'qr',title:'رمزینه'},
  {id:'visitCard',title:'کارت ویزیت'},
])
const data = ref<any>({
  firstname:'',
  lastname:'',
  extentionname:'',
  gender:'',
  title:'',
  info:'',
  mobile:'',
  email:'',
  site:'',
  description:'',
  verified:false,
  avatar:'/img/sample/avatar.jpg',
  followers:0,
  followings:0,
  arts:[],
  skills:[],
})
const selectedTab = ref<any>(tabs.value[0].id)
const qr = ref<any>('')
const rotatedCard = ref<boolean>(false)
//#endregion

//#region Function
const rotateCard = () => {
  rotatedCard.value = !rotatedCard.value
}
const get = async () => {
  loading.value = true
  const response = await getByID(route.params.code)
  if (response.result) {
    data.value.firstname = response.data.firstname;
    data.value.lastname = response.data.lastname;
    data.value.extentionname = response.data.extentionname;
    data.value.gender = response.data.gender;
    data.value.title = `${response.data.firstname} ${response.data.lastname} ${response.data.extentionname ? response.data.extentionname : ''}`;
    data.value.avatar = response.data.avatar ? response.data.avatar : '/img/sample/avatar.jpg';
    data.value.info = response.data.bio_small;
    data.value.description = response.data.bio_long;
    data.value.email = response.data.email;
    data.value.site = response.data.website;
    data.value.skills = response.data.userSkills.map((it: any) => it.skill.title);

    response.data.userCertificates.forEach((xy: any) => {
      if (xy.certificate.title == "Verified") data.value.verified = true;
    })
  }
}
const getSimilar = async () => {
  const response = await getByArtistID(+route.params.code,{page:1,pageSize:6,search:''})
  if (response.result) {
    response.data.results.forEach((it: any) => {
      let image = '';
      if (it.artsFiles.length > 0) {
        image = it.artsFiles[0].file
      }
      data.value.arts.push({
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
const openShare=()=>{
  const path = route.fullPath        // شامل path + query + hash
  const origin = window.location.origin // دامنه و پروتکل
  navigator.share({
    url: origin + path,
    text: data.value?.title,
    title: "آفاق هنر"
  })
}
//#endregion

//#region LifeCycle
onMounted(async () => {
  if (!route.params.code) await router.push('/');
  else {
    await get();
    await getSimilar();
    if (process.client) {
      qr.value =  window.location.origin + route.fullPath
    }
    loading.value = false
  }
})
//#endregion
</script>

<template>

  <div class="container w-full flex flex-col gap-y-6 py-5">

    <!--#region Header-->
    <div class="flex w-full justify-center items-center flex-col px-5 gap-y-4">
      <!--#region Avatar-->
      <img :src="data.avatar" alt="avatar" class="rounded-full object-cover size-30"/>
      <!--#endregion-->
      <!--#region Name-->
      <div class="flex w-full my-3 justify-center items-center gap-x-2">
        <div v-if="data.verified" class="bg-blue-500 -translate-y-0.5 size-4 rounded-full"></div>
        <span class="Estedad_FD_Bold text-white">{{data.title}}</span>
      </div>
      <!--#endregion-->
      <!--#region Statistic-->
      <div class="flex justify-center items-center  text-gray-300 w-full text-xs px-5 gap-x-5">
        <div class="flex gap-x-1">
          <span class="Estedad_FD_Bold">{{data.followers}}</span>
          <span>دنبال کننده</span>
        </div>
        <div> | </div>
        <div class="flex gap-x-1">
          <span class="Estedad_FD_Bold">{{data.followings}}</span>
          <span>دنبال شونده</span>
        </div>
      </div>
      <!--#endregion-->
      <!--#region Info-->
      <p class="Estedad_FD_Light text-xs text-justify text-gray-300 leading-6">{{data.info}}</p>
      <!--#endregion-->
    </div>
    <!--#endregion-->

    <!--#region Tabs-->
    <div class="flex w-full justify-center items-center rounded px-5 gap-x-4 sm:my-5 bg-gray-800 py-2">
      <div v-for="(it,i) in tabs"
           :key="`tab_${i}`"
           class="text-sm Estedad_FD_Light w-24 flex justify-center items-center cursor-pointer text-center py-1 transition-all ease-in-out duration-500 hover:bg-[#e4e0d6] hover:opacity-40 hover:border hover:border-slate-900"
           :class="selectedTab == it.id ? 'bg-gray-200 rounded-sm border border-slate-900' : ' text-gray-300'"
           @click="selectedTab = it.id"
      >
        {{it.title}}
      </div>
    </div>
    <!--#endregion-->

    <!--#region Info-->
    <div v-if="selectedTab == 'info'" class="px-5 w-full flex">
      <p class="Estedad_FD_Light text-gray-400 text-xs flex flex-col gap-y-4 leading-6 sm:text-sm  sm:leading-8 sm:text-justify" v-html="data.description"></p>
    </div>
    <!--#endregion-->

    <!--#region Arts-->
    <div v-if="selectedTab == 'arts'" class="px-5 w-full gap-6 columns-2 sm:columns-6 sm:gap-8 sm:p-4">
        <masonry-grid :items="data.arts" :loading="loading" :skeleton-count="9" />
    </div>
    <!--#endregion-->

    <!--#region QR-->
    <div v-if="selectedTab == 'qr'" class="px-5 w-full flex flex-col justify-center items-center py-5">
      <qrcode-vue
          level="M"
          render-as="svg"
          :size="250"
          :value="qr"
          :margin="5"
          background="#111827"
          foreground='#fff'
          class="m-auto"/>

      <div class="flex justify-center items-center  rounded-sm bg-gray-200 py-2 px-4 mt-5" @click="openShare">
      <div>اشتراک گذاری</div>
      </div>
    </div>
    <!--#endregion-->

    <!--#region visitCard-->
    <div v-if="selectedTab == 'visitCard'" class="px-5 w-full flex flex-col space-y-5 justify-center items-center py-5 relative">
      <div class="visitCard" @click="rotateCard">
        <div class="content" :class="rotatedCard ? 'contentRotated' : ''">
          <div class="front bg-[url('/img/sample/visit-card-white.jpg')] bg-cover text-slate-100 shadow-2xl pt-4 px-4 pb-2 flex flex-col justify-start items-center overflow-hidden">
            <!--#region Header-->
            <div class="w-full flex justify-center items-center h-28">
              <!--#region Avatar-->
              <div class="!w-28 h-full rounded-lg overflow-hidden ">
                <img :src="data.avatar" alt="avatar" class="object-cover w-full h-full"/>
              </div>
              <!--#endregion-->
              <!--#region Title-->
              <div class="w-45 flex flex-col text-gray-800 h-full justify-center gap-y-2 items-center">
                <span class="text-2xl Farhang_ExtraBold text-gray-700"> {{data.firstname}} </span>
                <span class="text-2xl  Farhang_ExtraBold text-gray-700">{{data.lastname}}</span>
              </div>
              <!--#endregion-->
            </div>
            <!--#endregion-->
            <!--#region Body-->
            <div class="w-full flex flex-col justify-start items-start text-gray-700  mt-6 p-5 flex-1  gap-y-5 text-sm">

              <div class="flex w-full justify-center items-center text-lg Farhang_Bold gap-x-2">
                <span> {{data.gender == 'Male' ? 'آقای' : ''}} {{data.gender == 'FeMale' ? 'خانم' : ''}} </span>
                <span> {{data.title}} </span>
              </div>

              <div v-if="data.info" class="flex justify-center items-start w-full text-xs Farhang_Medium leading-6 text-right">
                {{data.info}}
              </div>

              <div v-if="data.skills.length > 0" class="flex flex-col justify-start items-start w-full text-xs">
                <span class="mb-2"> فعال در زمینه <span v-if="data.skills.length > 1">های</span> : </span>
                <div v-for="(it,i) in data.skills" :key="`skill_${i}`" class="px-2 Farhang_Bold">{{it}}</div>
              </div>

            </div>
            <!--#endregion-->
            <!--#region Footer-->
            <div class="w-full flex justify-start items-center h-20">
              <!--#region QR-->
              <div class="!w-19 h-full rounded-lg flex justify-center items-center overflow-hidden ">
                <qrcode-vue
                    level="M"
                    render-as="svg"
                    :size="75"
                    :value="qr"
                    :margin="2"
                    background="#505050"
                    foreground='#ffffff'
                    class="m-auto"/>
              </div>
              <!--#endregion-->
            </div>
            <!--#endregion-->
          </div>
          <div class="back bg-[url('/img/sample/visit-card-black.jpg')] bg-cover text-slate-100 shadow-2xl pt-4 px-4 pb-2 flex flex-col justify-start items-center overflow-hidden">
            <!--#region Header-->
            <div class="w-full flex justify-center items-center h-28">
              <!--#region Avatar-->
              <div class="!w-28 h-full rounded-lg overflow-hidden">
                <img :src="data.avatar" alt="avatar" class="object-cover w-full h-full"/>
              </div>
              <!--#endregion-->
              <!--#region Title-->
              <div class="w-45 flex flex-col text-gray-800 h-full justify-center gap-y-2 items-center">
                <span class="text-2xl  Farhang_ExtraBold text-slate-300"> {{data.firstname}} </span>
                <span class="text-2xl  Farhang_ExtraBold text-slate-300">{{data.lastname}}</span>
              </div>
              <!--#endregion-->
            </div>
            <!--#endregion-->
            <!--#region Body-->
            <div class="w-full flex flex-col justify-start items-start text-slate-300  mt-6 p-5 flex-1 gap-y-5 text-sm">

              <div class="flex w-full justify-center items-center text-lg Farhang_Bold gap-x-2">
                <span> {{data.gender == 'Male' ? 'آقای' : ''}} {{data.gender == 'FeMale' ? 'خانم' : ''}} </span>
                <span> {{data.title}} </span>
              </div>

              <div v-if="data.info" class="flex justify-center items-start w-full text-xs Farhang_Medium leading-6 text-right">
                {{data.info}}
              </div>

              <div v-if="data.skills.length > 0" class="flex flex-col justify-start items-start w-full text-xs">
                <span class="mb-2"> فعال در زمینه <span v-if="data.skills.length > 1">های</span> : </span>
                <div v-for="(it,i) in data.skills" :key="`skill_${i}`" class="px-2 Farhang_Bold">{{it}}</div>
              </div>

            </div>
            <!--#endregion-->
            <!--#region Footer-->
            <div class="w-full flex justify-start items-center h-20">
              <!--#region QR-->
              <div class="!w-19 h-full rounded-lg flex justify-center items-center overflow-hidden ">
                <qrcode-vue
                    level="M"
                    render-as="svg"
                    :size="75"
                    :value="qr"
                    :margin="2"
                    background="#dddde4"
                    foreground='#505050'
                    class="m-auto"/>
              </div>
              <!--#endregion-->
            </div>
            <!--#endregion-->
          </div>
        </div>
      </div>
    </div>
    <!--#endregion-->

  </div>

</template>

<style scoped>
.visitCard {
  width: 320px;
  height: 550px;
  float: left;
  perspective: 500px;
}
.content {
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
  border-radius: 10px;
  transition: transform 1s;
  transform-style: preserve-3d;
}
.contentRotated {
  transform: rotateY( 180deg ) !important;
  transition: transform 0.5s !important;
}
.front,
.back {
  position: absolute;
  height: 100%;
  width: 100%;
  line-height: 300px;
  text-align: center;
  font-size: 60px;
  border-radius: 10px;
  backface-visibility: hidden;
}
.back {
  transform: rotateY( 180deg );
}
</style>
