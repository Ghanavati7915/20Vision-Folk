<script setup lang="ts">
//#region Import
import {getByID} from "~/services/artist";
import {Button} from "~/components/ui/button";
import {userInfo} from "~/services/auth";
//#endregion

definePageMeta({
  middleware: ["auth"]
})

//#region Service
import { uploadFile } from "@/services/upload"
import {update, updateAvatar} from "@/services/user"
import {isValidFileSize, isValidFileType} from "~/composables/useUpload";
//#endregion

//#region Instance
const { isDesktop } = useDevice()
const user = await useUser()
const router = useRouter()
//#endregion

//#region Variables
const loading = ref(true)
const avatarRef = ref(null)
const info = ref<any>({
  avatar : '/img/sample/avatar.jpg',
  title : '',
  verified : false,
})
const form = ref<any>({
  avatar : {
    loading: false,
    value: null,
    error: null,
    uploadPercentage: 0
  }
})
//#endregion

//#region Functions
const get = async () => {
  loading.value = true
  const response = await getByID(user?.id)
  if (response.result) {
    info.value.title = `${response.data.firstname} ${response.data.lastname} ${response.data.extentionname ? response.data.extentionname : ''}`;
    info.value.avatar = response.data.avatar ? response.data.avatar : '/img/sample/avatar.jpg' ;

    response.data.userCertificates.forEach((xy: any) => {
      if (xy.certificate.title == "Verified") info.value.verified = true;
    })
  }
  loading.value = false
}
const logout = async () => {
  await IndexDBClear('config')
  await IndexDBRemove("config", "UserInfo")
  await router.push('/')
}
//#endregion

//#region Upload
const lunchUpload = () => {
  avatarRef.value?.click();
}
const doUpload = async (event:any) => {
  try {
    form.value.avatar.uploadPercentage = 0;
    form.value.avatar.error = null
    form.value.avatar.loading = true
    let file = event.target.files[0];
    if (!await isValidFileType(file)) {
      form.value.avatar.error = "نوع فایل نا معتبر است"
      return;
    }
    if (!await isValidFileSize(file)) {
      form.value.avatar.error = "حجم فایل بیش از حد مجاز می باشد"
      return;
    }
    const {result,data, message} = await uploadFile('avatar',file, form.value.avatar.uploadPercentage);
    console.log('result : ' ,result)
    console.log('data : ' ,data)
    if (result) {

      const response = await updateAvatar(data.path);
      if (response.result) {
        await get();
        await userInfo();
      } else {
        form.value.avatar.error = 'به روز رسانی با مشکل مواجه شد'
      }
    }
    else {
      form.value.avatar.error = message
    }
  } catch (error) {
    form.value.avatar.error = error
  }
  finally {
    form.value.avatar.value = null
    form.value.avatar.loading = false
  }

};
//#endregion

//#region LifeCycle
onMounted(async () => {
  info.value.title = `${user.firstName} ${user.lastName}`;
  await get();
})
//#endregion
</script>

<template>
  <div :class="isDesktop ? '!max-w-[520px]':''"  class="container w-full flex flex-col flex-1 h-full gap-y-6 py-5">

    <!--#region Avatar-->
    <div class="flex w-full justify-center items-center flex-col px-5 gap-y-4">
      <!--#region Avatar-->
      <div class="w-full flex flex-col gap-y-3 justify-center items-center">
        <img :src="info.avatar" alt="avatar" class="rounded-full object-cover size-30" @click="lunchUpload"/>
        <input type="file" ref="avatarRef" accept="image/*" capture="environment" @change="doUpload"/>
        <span class="w-full text-center mt-2 text-xs text-rose-500" v-if="form.avatar.error">{{form.avatar.error}}</span>
      </div>
      <!--#endregion-->
      <!--#region Name-->
      <div class="flex w-full my-3 justify-center items-center gap-x-2">
        <div v-if="info.verified" class="bg-blue-500 -translate-y-0.5 size-4 rounded-full"></div>
        <span class="Estedad_FD_Bold text-white">{{info.title}}</span>
      </div>
      <!--#endregion-->
    </div>
    <!--#endregion-->

    <!--#region Header-->
    <div class="menuBar">
      <nuxt-link :to="`/artist/${user?.id}`" class="item"> صفحه من </nuxt-link>
      <nuxt-link to="/profile/edit" class="item" > ویرایش حساب کاربری </nuxt-link>
    </div>
    <!--#endregion-->

    <!--#region Footer-->
    <div class="flex w-full justify-center items-center">
    <Button type="button"  class="cursor-pointer bg-rose-500 hover:bg-rose-300 transition-all ease-in-out duration-300" :disabled="loading" @click="logout">
      <span>خروج از حساب کاربری</span>
    </Button>
    </div>
    <!--#endregion-->
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.menuBar {
  @apply flex flex-col flex-1 w-full justify-start items-center mt-5 px-5 gap-y-5;
  .item{
    @apply w-full text-sm text-gray-100 pb-4 px-2 border-b border-gray-700;
  }
}

input[type="file"] {
  display: none;
}
</style>