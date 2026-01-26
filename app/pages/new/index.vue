<script setup lang="ts">

//#region Instance
const { isDesktop } = useDevice()
//#endregion

//#region Import
import { z } from "zod"
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ChevronLeft,ChevronRight } from "lucide-vue-next"
//#endregion

definePageMeta({
  middleware: ["auth"]
})

//#region Service
import { uploadFile } from "@/services/upload"
import {categories} from "@/services/base"
import {isValidFileSize, isValidFileType} from "~/composables/useUpload";
import {ref} from "vue";
import {submit} from "~/services/art";
//#endregion

//#region Instance
const user = await useUser()
const router = useRouter()
//#endregion

//#region Variables
const loading = ref(true)
const errorMessage = ref("")
const _categories = ref([])
const coverRef = ref(null)
const code = ref("")
const title = ref("")
const description = ref("")
const properties = ref({
  length: null,
  width: null,
  height: null,
  color: null,
  material: null,
  price: null,
  buildDate: null,
})
const cat_ref = ref<any>(null)
const cover = ref({
  loading: false,
  value: null,
  preview: '',
  error: null,
  uploadPercentage: 0
})
//#endregion


//#region Functions
const getCategories = async () => {
  loading.value = true
  const {result,data} = await categories()
  if (result) {
    _categories.value = data.results;
  }else{
    // await router.push("/")
  }
  loading.value = false
}
const handleSubmit = async () => {
  try {
    errorMessage.value = ""
    if (title.value.toString().trim() == '') {
      errorMessage.value = 'عنوان را مشخص کنید'
      return
    }
    if (title.value.toString().trim().length < 3) {
      errorMessage.value = 'عنوان باید بیش از 3 کاراکتر باشد'
      return
    }
    if (cover.value.loading) {
      errorMessage.value = 'در حال بارگذاری فایل ، لطفا صبر کنید'
      return
    }
    if (cover.value.value == null) {
      errorMessage.value = 'تصویر را مشخص کنید'
      return
    }

    if (cat_ref.value == null) {
      errorMessage.value = 'دسته بندی را مشخص کنید'
      return
    }

    loading.value = true

    //#region properties
    let _properties = {
      length : properties.value.length,
      width : properties.value.width,
      height : properties.value.height,
      color : properties.value.color,
      material : properties.value.material,
      price : properties.value.price,
      buildDate : properties.value.buildDate,
    };
    //#endregion

    //#region files
    let _files : any[] = [{
      title : title.value,
      file : cover.value.value,
    }];
    //#endregion

    const response = await submit({
      code: code.value,
      title: title.value,
      description: description.value,
      cat_ref: cat_ref.value,
      properties: JSON.stringify(_properties),
      files: _files,
    })

    if (response.result) {
      await router.push('/');
    } else {
      errorMessage.value = response.message || "ورود ناموفق بود"
    }
  } catch (err: any) {
    errorMessage.value = "خطای شبکه یا سرور"
    console.error(err)
  } finally {
    loading.value = false
  }
}
//#endregion

//#region Upload
const lunchUpload = () => {
  coverRef.value?.click();
}
const doUpload = async (event:any) => {
  try {
    cover.value.uploadPercentage = 0;
    cover.value.error = null
    cover.value.loading = true
    let file = event.target.files[0];
    if (!await isValidFileType(file)) {
      cover.value.error = "نوع فایل نا معتبر است"
      return;
    }
    if (!await isValidFileSize(file)) {
      cover.value.error = "حجم فایل بیش از حد مجاز می باشد"
      return;
    }
    const {result,data, message} = await uploadFile('post',file, cover.value.uploadPercentage);
    if (result) {
      cover.value.value = data.path;
      cover.value.preview = data.fullPath;
      errorMessage.value = '';
    }
    else {
      cover.value.error = message
    }
  } catch (error) {
    cover.value.error = error
  }
  finally {
    cover.value.loading = false
  }

};
//#endregion

//#region LifeCycle
onMounted(async () => {
  await getCategories();
})
//#endregion
</script>

<template>
  <div :class="isDesktop ? '!max-w-[520px]':''" class="container w-full h-full flex flex-col flex-1 pt-12 pb-9">

    <!--#region Header-->
    <div  :class="isDesktop ? '!px-30':''" class="fixed top-0 left-0 bg-gray-900 z-50 flex w-full justify-between items-center p-2">
      <!--#region Submit-->
      <div class="flex justify-center items-center">
        <div class=" rounded-full bg-blue-800 p-3" @click="handleSubmit">
          <ChevronRight class="text-xs size-5 text-gray-200"/>
        </div>
      </div>
      <!--#endregion-->

      <!--#region Title-->
      <div class="flex justify-center items-center"> <div class="Estedad_FD_Bold text-white"> انتشار تصویر </div> </div>
      <!--#endregion-->

      <!--#region Back-->
      <div class="flex justify-center items-center">
        <nuxt-link to="/" class=" rounded-full bg-gray-800 p-3">
          <ChevronLeft class="text-xs size-5 text-gray-200"/>
        </nuxt-link>
      </div>
      <!--#endregion-->
    </div>
    <!--#endregion-->

    <!--#region Error-->
    <div :class="errorMessage != '' ? 'bottom-10' : '-bottom-10'" class="fixed transition-all ease-in-out duration-300 left-[5%] bg-rose-800 text-xs text-white z-50 flex w-[90%] justify-center items-center py-5">
      {{errorMessage}}
    </div>
    <!--#endregion-->

    <!--#region Hint-->
    <div class="w-full flex justify-center items-center mt-10 px-5">
      <div class="flex flex-col gap-y-2 bg-blue-500/20 border border-blue-500/60 leading-loose text-justify p-2 text-white rounded-sm text-xs Estedad_FD_Light">
        <span> راهنمای ثبت اثر : </span>
        <span> کاربر گرامی ؛ برای انتشار محتوی جدید ابتدا روی تصویر کلیک کنید و با تصویر مورد نظر خودتان جایگزین کنید. سپس عنوان و سایر توضیحات لازم را مشخص نمایید و در نهایت از منوی بالای صفحه علامت تایید را بزنید. </span>
      </div>
    </div>
    <!--#endregion-->

    <!--#region Cover-->
      <div class="w-full flex flex-col justify-center items-center mt-5 px-5">
        <img :src="cover.preview ? cover.preview : '/img/sample/placeholder.jpg'" alt="avatar" class="rounded-sm object-cover w-full" @click="lunchUpload"/>
        <input type="file" ref="coverRef" accept="image/*" capture="environment" @change="doUpload"/>
        <span class="w-full text-center mt-2 text-xs text-rose-500" v-if="cover.error">{{cover.error}}</span>
      </div>
    <!--#endregion-->

    <!--#region Form-->
    <div class="w-full grid grid-cols-2 space-y-2 gap-3 mt-5 px-5">

      <!--#region Title -->
      <Field class="col-span-2">
        <FieldLabel for="title" class="text-gray-100">عنوان اثر</FieldLabel>
        <Input
            id="title"
            type="text"
            class="text-white"
            v-model="title"
            :disabled="loading"
        />
      </Field>
      <!--#endregion-->

      <!--#region Code -->
      <Field>
        <FieldLabel for="code" class="text-gray-100">شناسه اثر</FieldLabel>
        <Input
            id="code"
            type="text"
            class="text-white"
            v-model="code"
            :disabled="loading"
        />
      </Field>
      <!--#endregion-->

      <!--#region Cat -->
      <Field>
        <FieldLabel for="cat_ref" class="text-gray-100">دسته بندی</FieldLabel>
        <Select
            id="cat_ref"
            class="text-white"
            v-model="cat_ref"
            :disabled="loading"
        >
          <SelectTrigger><SelectValue placeholder="یک مورد را مشخص کنید" /></SelectTrigger>
          <SelectContent>
            <SelectItem v-for="(it,i) in _categories" :key="`city_${i}`" :value="it.id">{{it.title}}</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <!--#endregion-->

      <!--#region Description -->
      <Field class="col-span-2">
        <FieldLabel for="description" class="text-gray-100">شرح اثر</FieldLabel>
        <Textarea
            id="description"
            class="text-white min-h-28"
            v-model="description"
            :disabled="loading"
            placeholder="در مورد اثر انتخاب شده مختصراً شرحی بنویسید"
            :rows="8"
        />
      </Field>
      <!--#endregion-->

      <!--#region Properties-->
      <div class="col-span-2 flex text-gray-400 text-xs">
        <span> مشخصات فنی اثر : </span>
      </div>

      <div class="col-span-2 flex items-center justify-between">
        <span class="text-white text-xs w-30"> طول </span>
        <Input type="text" class="text-white text-center text-xs"  v-model="properties.length" :disabled="loading"/>
      </div>

      <div class="col-span-2 flex items-center justify-between">
        <span class="text-white text-xs w-30"> عرض </span>
        <Input type="text" class="text-white text-center text-xs"  v-model="properties.width" :disabled="loading"/>
      </div>

      <div class="col-span-2 flex items-center justify-between">
        <span class="text-white text-xs w-30"> ارتفاع </span>
        <Input type="text" class="text-white text-center text-xs"  v-model="properties.height" :disabled="loading"/>
      </div>

      <div class="col-span-2 flex items-center justify-between">
        <span class="text-white text-xs w-30"> رنگ </span>
        <Input type="text" class="text-white text-center text-xs"  v-model="properties.color" :disabled="loading"/>
      </div>

      <div class="col-span-2 flex items-center justify-between">
        <span class="text-white text-xs w-30"> جنس </span>
        <Input type="text" class="text-white text-center text-xs"  v-model="properties.material" :disabled="loading"/>
      </div>

      <div class="col-span-2 flex items-center justify-between">
        <span class="text-white text-xs  w-30"> قیمت </span>
        <Input type="text" class="text-white text-center text-xs"  v-model="properties.price" :disabled="loading"/>
      </div>

      <div class="col-span-2 flex items-center justify-between">
        <span class="text-white text-xs w-30"> تاریخ ایجاد </span>
        <Input type="text" class="text-white text-center text-xs"  v-model="properties.buildDate" :disabled="loading"/>
      </div>
      <!--#endregion-->
    </div>
    <!--#endregion-->

  </div>
</template>

<style scoped>
@reference "tailwindcss";
input[type="file"] {
  display: none;
}
</style>