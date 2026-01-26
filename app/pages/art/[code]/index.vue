<script setup lang="ts">
//#region Imports
import { QrCode } from 'lucide-vue-next'
import { Heart } from 'lucide-vue-next'
import {type commentPayload,comment, getByArtistID, getByID, like} from "~/services/art";
//#endregion

//#region Instance
const route = useRoute()
const user = await useUser()
//#endregion

//#region Variables
const loading = ref(true)
const data = ref<any>({
  title:'',
  description:'',
  image:'',
  properties:null,
  liked:false,
  similar:[],
  likes:[],
  comments:[],
  user:{
    id:0,
    title:'',
    description:'',
    avatar:'/img/sample/avatar.jpg',
  },
})
const commentForm = ref<any>({
  loading:false,
  lock:false,
  message:'',
  score:0,
  error:null,
})
//#endregion

//#region Function
const get = async () => {
  const response = await getByID(+route.params.code)
  if (response.result) {
    let _data = response.data;
    let image = '';
    if (_data.artsFiles.length > 0) {
      image = _data.artsFiles[0].file
    }

     data.value.title  = _data.title;
     data.value.likes  = _data.likes;
     data.value.comments  = _data.comments;
    data.value.description  = _data.description;
    data.value.image  = image;
    data.value.user.id = _data.users.id
    data.value.user.title = `${_data.users.firstname} ${_data.users.lastname} ${_data.users.extentionname ? _data.users.extentionname : ''}`
    data.value.user.avatar = _data.users.avatar ? _data.users.avatar : `/img/sample/avatar.jpg`
    if (_data.properties){
      data.value.properties = JSON.parse(_data.properties);
    }

    await checkLiked();
    await checkCommented();
    await getSimilar();
  }
}
const getSimilar = async () => {
  const response = await getByArtistID(+data.value.user.id,{page:1,pageSize:6,search:''})
  if (response.result) {
    response.data.results.forEach((it: any) => {
      let image = '';
      if (it.artsFiles.length > 0) {
        image = it.artsFiles[0].file
      }


      data.value.similar.push({
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
const hasProperties = () => {
  if (data.value.properties?.length) return true;
  else if (data.value.properties?.width) return true;
  else if (data.value.properties?.height) return true;
  else if (data.value.properties?.color) return true;
  else if (data.value.properties?.material) return true;
  else if (data.value.properties?.price) return true;
  else if (data.value.properties?.buildDate) return true;
  return false;
}
const likeArt = async () => {
  const response = await like(+route.params.code)
  if (response.result) {
    data.value.liked = !data.value.liked;
  }
}
const checkLiked = async () => {
  let control = data.value.likes.find((it:any)=> it.user.id == data.value.user.id);
  if (control) data.value.liked = true;
}
const commentArt = async () => {
  commentForm.value.loading = true;
  commentForm.value.error = ''
  
  if (!user) return false;
  
  if (commentForm.value.message.toString().trim() == ''){
    commentForm.value.error = 'متن نظر خود را بنویسید'
    commentForm.value.loading = false;
    return false;
  }
  
  let payload :commentPayload = {
    message : commentForm.value.message,
    rate : commentForm.value.score,
  }
  const response = await comment(+route.params.code,payload)
  if (response.result) {
    commentForm.value.message = ''
    commentForm.value.score = 3
    commentForm.value.lock = true
    loading.value = true
    await get();
    loading.value = false
  }
  commentForm.value.loading = false;
}
const checkCommented = async () => {
  let control = data.value.comments.find((it:any)=> it.user.id == data.value.user.id);
  if (control) commentForm.value.lock = true;
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
  await get();
  loading.value = false
})
//#endregion
</script>

<template>

  <div class="container w-full flex flex-col gap-y-6 py-5">
    <!--#region Header-->
    <div class="flex w-full justify-start items-center px-5">
      <h1 v-if="!loading" class="Estedad_FD_Bold text-2xl text-white">{{data.title}}</h1>
      <Skeleton v-if="loading" class="h-12 sm:h-h-4 w-full bg-gray-800" />
    </div>
    <!--#endregion-->

    <!--#region Author-->
    <div class="flex w-full justify-between items-center px-5 sm:mt-5">
      <!--#region Image-Name-->
      <div v-if="loading" class="flex items-center justify-start">
        <Skeleton class="w-10 h-10 rounded-full bg-gray-800" />
        <Skeleton class="h-4 mr-2 sm:h-h-4 w-18 bg-gray-800" />
      </div>
      <div v-if="!loading" class="flex items-center justify-start">
        <img :src="data.user.avatar" alt="avatar" class="rounded-full size-10 object-cover"/>
        <span class="Estedad_FD_Bold text-sm text-gray-400 mr-2">{{data.user.title}}</span>
      </div>
      <!--#endregion-->

      <!--#region Action-->
      <div v-if="!loading" class="flex gap-x-2 items-center justify-start">
        <div v-if="user"
             :class="[
                 data.liked ? 'bg-rose-500' : 'bg-gray-400',
                 (data.likes.length > 0) ? 'min-w-12 h-8 px-2' : 'size-8'
                 ]"
             class="border-1 border-slate-900  relative bg-gray-400 sm:size-10 text-gray-900 text-xs rounded-full flex justify-center items-center cursor-pointer transition-all ease-in-out duration-300 hover:-translate-y-2">

          <span class="px-2 ml-1 text-xs text-white" v-if="data.likes.length > 0"> {{data.likes.length}} </span>

          <Heart class="size-4 sm:size-5" :class="data.liked ? 'text-white' : ''" @click="likeArt" />
        </div>
        <div class="border-1 border-slate-900 size-8 bg-gray-400 sm:size-10 text-gray-900 text-xs rounded-full flex justify-center items-center cursor-pointer transition-all ease-in-out duration-300 hover:-translate-y-2" @click="openShare">
          <QrCode class="size-4 sm:size-5" />
        </div>
        <nuxt-link :to="`/artist/${data.user.id}`" class="bg-gray-200 text-gray-900 px-4 h-8 sm:h-10 sm:px-8 sm:text-sm flex justify-center items-center text-xs rounded-full transition-all ease-in-out duration-300 hover:-translate-y-2">
          مشاهده
        </nuxt-link>
      </div>
      <div v-if="loading" class="flex gap-x-2 items-center justify-start">
        <Skeleton class="size-8 rounded-full bg-gray-800" />
        <Skeleton class="size-8 rounded-full bg-gray-800" />
        <Skeleton class="h-8 w-16 rounded-full bg-gray-800" />
      </div>
      <!--#endregion-->
    </div>
    <!--#endregion-->

    <!--#region Art-->
    <div class="flex w-full justify-center items-center sm:my-5">
      <img v-if="!loading" :src="data.image" alt="image" class="w-full sm:max-h-[80dvh] object-contain sm:rounded-lg"/>
      <Skeleton v-if="loading" class="w-full h-[40dvh] rounded-lg bg-gray-800" />
    </div>
    <!--#endregion-->

    <!--#region Description-->
    <div v-if="!loading" class="flex w-full justify-center items-center text-gray-400 Estedad_FD_Light text-sm text-justify leading-8 px-5">
        {{data.description}}
    </div>
    <div v-if="loading" class="flex flex-col gap-y-4 w-full justify-start items-start text-gray-400 Estedad_FD_Light text-sm text-justify leading-8 px-5">
      <Skeleton class="w-full h-4 rounded-sm bg-gray-800" />
      <Skeleton class="w-full h-4 rounded-sm bg-gray-800" />
      <Skeleton class="w-full h-4 rounded-sm bg-gray-800" />
      <Skeleton class="w-full h-4 rounded-sm bg-gray-800" />
      <Skeleton class="w-2/3 h-4 rounded-sm bg-gray-800" />
    </div>
    <!--#endregion-->

    <!--#region Properties-->
    <div class="px-5 w-full" v-if="!loading && hasProperties()">
      <div class="flex flex-col w-full justify-center items-center bg-gray-800 text-gray-400 rounded-sm Estedad_FD_Light text-sm text-justify py-5 gap-y-5 leading-8">
        <div class="flex w-full px-5 justify-center items-center border-b border-gray-700 pb-5">
          <span class="Estedad_FD_Bold"> ویژگی های اثر </span>
        </div>
        <div v-if="data.properties?.length" class="flex w-full px-5 justify-between items-center">
          <span> طول </span>
          <span class="text-white">{{data.properties?.length}}</span>
        </div>
        <div v-if="data.properties?.width" class="flex w-full px-5 justify-between items-center">
          <span> عرض </span>
          <span class="text-white">{{data.properties?.width}}</span>
        </div>
        <div v-if="data.properties?.height" class="flex w-full px-5 justify-between items-center">
          <span> ارتفاع </span>
          <span class="text-white">{{data.properties?.height}}</span>
        </div>
        <div v-if="data.properties?.color" class="flex w-full px-5 justify-between items-center">
          <span> رنگ </span>
          <span class="text-white">{{data.properties?.color}}</span>
        </div>
        <div v-if="data.properties?.material" class="flex w-full px-5 justify-between items-center">
          <span> جنس </span>
          <span class="text-white">{{data.properties?.material}}</span>
        </div>
        <div v-if="data.properties?.price" class="flex w-full px-5 justify-between items-center">
          <span> قیمت </span>
          <span class="text-white">{{data.properties?.price}}</span>
        </div>
        <div v-if="data.properties?.buildDate" class="flex w-full px-5 justify-between items-center">
          <span> تاریخ ایجاد </span>
          <span class="text-white">{{data.properties?.buildDate}}</span>
        </div>
      </div>
    </div>
    <!--#endregion-->

    <!--#region Comments-->
      <div class="flex flex-col w-full justify-center items-center  text-gray-400 rounded-sm Estedad_FD_Light text-sm text-justify py-5 gap-y-5 leading-8">
        <!--#region Header-->
        <div class="flex w-full px-5 justify-start items-center">
          <span class="Estedad_FD_Bold text-sm"> نظرات ثبت شده ( {{data.comments.length}} نظر ) </span>
        </div>
        <!--#endregion-->

        <!--#region Form-->
        <div v-if="!commentForm.loading && user && !commentForm.lock" class="flex flex-col w-full px-5 mb-3 justify-center items-start">

          <!--#region Input-->
          <div class="flex flex-col w-full items-start justify-center">
            <span class="text-white text-xs mb-2"> متن نظر شما </span>
            <Textarea
                class="text-white text-xs min-h-28"
                v-model="commentForm.message"
                :disabled="commentForm.loading"
                placeholder="در مورد این اثر مختصراً نظر خود را بنویسید"
                :rows="8"
            />
          </div>
          <!--#endregion-->

          <!--#region Score-->
         <div class="flex w-full justify-between items-end">
           <div class="flex flex-col w-full items-start justify-center mt-4">
             <span class="text-white text-xs mb-3"> امتیاز &nbsp ( {{commentForm.score}} ) </span>
             <div class="flex w-full justify-start items-center">
               <CommentScore v-model:score="commentForm.score" :loading="false" :disabled="false" :default="3"/>
             </div>
           </div>
           <div class="flex w-full h-full items-end justify-end">
             <div class="bg-blue-600 text-white text-xs flex rounded-sm w-32 py-2 justify-center items-center" @click="commentArt"> ثبت نظر </div>
           </div>
         </div>
          <!--#endregion-->

          <!--#region Error Message-->
          <div class="flex flex-col w-full items-start justify-center my-2 p-2">
            <div v-if="commentForm.error" class="text-xs flex justify-center items-center text-rose-500 w-full ">{{commentForm.error}}</div>
          </div>
          <!--#endregion-->
        </div>
        <!--#endregion-->

        <!--#region Form Lock-->
        <div v-if="!commentForm.loading && user && commentForm.lock" class="flex flex-col w-full px-5 mb-3 justify-center items-start">
            <div class="text-xs flex justify-center items-center text-gray-500 w-full"> قبلاً نظر خود را برای این اثر ثبت کرده اید </div>
        </div>
        <!--#endregion-->

        <!--#region Messages-->
        <div class="w-full px-5">
          <CommentItem
              v-for="(it,i) in data.comments"
              :key="`comment_${i}`"
              :loading="loading"
              :title="`${it.user.firstname} ${it.user.lastname} ${it.user.extentionname ? it.user.extentionname : ''}`"
              :avatar="it.user.avatar"
              dateTime="امروز"
              :score="it.rate"
              :message="it.content"/>
        </div>
        <!--#endregion-->

      </div>
    <!--#endregion-->

    <!--#region Similar-->
    <div class="flex flex-col mt-5 px-5">
      <span class="Estedad_FD_Bold text-sm mb-3 text-gray-400">سایر آثار {{data.user.title}}</span>
      <div class="w-full gap-6 p-2 columns-2 sm:columns-5 sm:gap-8 sm:p-4">
        <masonry-grid :items="data.similar" :loading="loading" :skeleton-count="9" />
      </div>
    </div>
    <!--#endregion-->

  </div>

</template>
