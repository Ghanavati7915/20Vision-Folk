<script setup lang="ts">

import {userInfo} from "~/services/auth";

definePageMeta({
  middleware: ["auth"]
})

//#region Imports
import {computed, ref} from "vue"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
//#endregion

//#region Service
import { update,get } from "@/services/user"
import { cities , skills} from "@/services/base"
//#endregion

//#region Instance
const { isDesktop } = useDevice()
const router = useRouter()
//#endregion

//#region Variables
const loading = ref(true)
const errorMessage = ref("")
const _cities = ref<any[]>([])
const _skills = ref<any[]>([])

const firstname = ref("")
const lastname = ref("")
const extentionname = ref("")
const nationalCode = ref("")
const address = ref("")
const avatar = ref("")
const email = ref("")
const website = ref("")
const instagram = ref("")
const gender = ref("")
const city_ref = ref("")
const bio_long = ref("")
const bio_small = ref("")
const birthDate = ref(null)

const isArtist = ref(false)

//#endregion

//#region Zod Schema
const nationalCodeRegex = /^[0-9]{10}$/;
const registerSchema = z.object({
  firstname: z
      .string()
      .min(2, 'نام را مشخص کنید'),
  lastname: z
      .string()
      .min(2, 'نام خانوادگی را مشخص کنید'),
  gender: z
      .string({
        required_error: 'جنسیت را انتخاب کنید',
        invalid_type_error: 'جنسیت را انتخاب کنید'
      })
      .refine(val => val !== null && val !== undefined, {
        message: 'جنسیت باید انتخاب شود'
      }),
  // nationalCode: z
  //     .string()
  //     .optional()
  //     .refine(val => {
  //       if (!val) return true; // اگر خالی بود مشکلی نیست
  //       if (!nationalCodeRegex.test(val)) return false;
  //
  //       // الگوریتم بررسی صحت کد ملی ایران
  //       const check = +val[9];
  //       const sum = val
  //           .split('')
  //           .slice(0, 9)
  //           .reduce((acc, digit, idx) => acc + (+digit * (10 - idx)), 0);
  //       const remainder = sum % 11;
  //       return (remainder < 2 && check === remainder) || (remainder >= 2 && check === 11 - remainder);
  //     }, {
  //       message: 'کد ملی معتبر نیست'
  //     })
});
//#endregion

//#region Functions
const getCities = async () => {
  loading.value = true
  const {result,data} = await cities()
  if (result) {
    _cities.value = data.results;
  }else{
    await router.push("/")
  }
  loading.value = false
}
const getSkills = async () => {
  loading.value = true
  const {result,data} = await skills()
  if (result) {
    _skills.value = data.results.map((it: any) => ({
      ...it,
      selected: false
    }));
  }else{
    await router.push("/")
  }
  loading.value = false
}
const getData = async () => {
  loading.value = true
  const {result,data} = await get()
  if (result) {
    firstname.value = data.result.firstname
    lastname.value = data.result.lastname
    extentionname.value = data.result.extentionname
    bio_long.value = data.result.bio_long
    bio_small.value = data.result.bio_small
    email.value = data.result.email
    nationalCode.value = data.result.nationalCode
    website.value = data.result.website
    address.value = data.result.address
    city_ref.value = data.result.city_ref
    gender.value = data.result.gender
    birthDate.value = data.result.birthDate

    //#region SocialNetworks
    try {
      const socialNetworks = data?.result?.socialNetworks;
      if (socialNetworks) {
        const social = JSON.parse(socialNetworks);
        if (Array.isArray(social)) {
          instagram.value = social.find((it: any) => it.key === 'instagram')?.value ?? null;
        }
      }
    } catch (error) {
      console.error("Invalid socialNetworks JSON:", error);
    }
    //#endregion

    //#region UserType
    try {
      const _isArtist = data?.result?.userTypes.find((it:any)=> it.type.id == 2);
      if (_isArtist) isArtist.value = true

    } catch (error) {
      console.error("Invalid socialNetworks JSON:", error);
    }
    //#endregion

    //#region User Skills
    try {
      data?.result?.userSkills?.forEach((it: any) => {
        _skills.value.forEach((iz:any) => {
          if (iz.id == it.skill.id) iz.selected = true;
        })
      })

    } catch (error) {
      console.error("Invalid socialNetworks JSON:", error);
    }
    //#endregion

  }else{
    await router.push("/")
  }
  loading.value = false
}
const handleSubmit = async (e: Event) => {
  try {
    e.preventDefault()
    errorMessage.value = ""
    const result = registerSchema.safeParse({
      firstname: firstname.value,
      lastname: lastname.value,
      gender: gender.value,
      nationalCode: nationalCode.value,
    })
    if (!result.success) {
      errorMessage.value = result.error.errors[0].message
      return
    }
    loading.value = true

    //#region socialNetworks
    let _socialNetworks = [];
    if (instagram.value?.toString().trim() != ''){
      _socialNetworks.push({
        key:'instagram',value:instagram.value
      })
    }
    //#endregion

    //#region skills
    let _selectedSkills = _skills.value
        .filter((it: any) => it.selected)
        .map((it: any) => it.id);

    //#endregion
    const response = await update({
      isArtist: isArtist.value,
      firstname: firstname.value,
      lastname: lastname.value,
      gender: gender.value,
      extentionname: extentionname.value,
      bio_small: bio_small.value,
      bio_long: bio_long.value,
      address: address.value,
      email: email.value,
      website: website.value,
      nationalCode: nationalCode.value,
      socialNetworks: JSON.stringify(_socialNetworks),
      birthDate: birthDate.value,
      city_ref: city_ref.value,
      skills: _selectedSkills,
    })

    if (response.result) {
      await userInfo();
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

//#region LifeCycle
onMounted(async () => {
  await getCities();
  await getSkills();
  await getData();
})
//#endregion
</script>

<template>
  <div :class="isDesktop ? '!max-w-[520px]':''" class="w-full flex-1 items-center justify-center p-2">
  <form :class="cn('grid grid-cols-2 space-y-2 gap-3')" @submit="handleSubmit">
    <!--#region Header -->
      <div class="col-span-2 mb-4 flex flex-col items-center gap-1 text-center">
        <h1 class="text-2xl text-white  font-bold">حساب کاربری</h1>
        <p class="text-gray-400 mt-1 text-sm text-balance"> اطلاعات خود کامل کنید </p>
      </div>
      <!--#endregion-->

    <!--#region Firstname -->
    <Field>
      <FieldLabel for="firstname" class="text-gray-100">نام</FieldLabel>
      <Input
          id="firstname"
          type="text"
          class="text-white"
          v-model="firstname"
          :disabled="loading"
      />
    </Field>
    <!--#endregion-->

    <!--#region Lastname -->
    <Field>
      <FieldLabel for="lastname" class="text-gray-100">نام خانوادگی</FieldLabel>
      <Input
          id="lastname"
          type="text"
          class="text-white"
          v-model="lastname"
          :disabled="loading"
      />
    </Field>
    <!--#endregion-->

    <!--#region Extention Name -->
    <Field>
      <FieldLabel for="extentionname" class="text-gray-100">پسوند خانوادگی</FieldLabel>
      <Input
          id="extentionname"
          type="text"
          class="text-white"
          v-model="extentionname"
          :disabled="loading"
      />
    </Field>
    <!--#endregion-->

    <!--#region nationalCode -->
    <Field>
      <FieldLabel for="nationalCode" class="text-gray-100">کد ملی</FieldLabel>
      <Input
          id="nationalCode"
          type="text"
          class="text-white"
          maxlength="10"
          v-model="nationalCode"
          :disabled="loading"
      />
    </Field>
    <!--#endregion-->

    <!--#region Gender -->
    <Field>
      <FieldLabel for="gender" class="text-gray-100">جنسیت</FieldLabel>
      <Select
          id="gender"
          class="text-white"
          v-model="gender"
          :disabled="loading"
      >
        <SelectTrigger><SelectValue placeholder="یک مورد را مشخص کنید" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="Male"  >مرد</SelectItem>
          <SelectItem value="FeMale" >زن</SelectItem>
        </SelectContent>
      </Select>
    </Field>
    <!--#endregion-->

    <!--#region City -->
    <Field>
      <FieldLabel for="city_ref" class="text-gray-100">شهر محل سکونت</FieldLabel>
      <Select
          id="city_ref"
          class="text-white"
          v-model="city_ref"
          :disabled="loading"
      >
        <SelectTrigger><SelectValue placeholder="یک مورد را مشخص کنید" /></SelectTrigger>
        <SelectContent>
          <SelectItem v-for="(it,i) in _cities" :key="`city_${i}`" class="text-white" :value="it.id">{{it.title}}</SelectItem>
        </SelectContent>
      </Select>
    </Field>
    <!--#endregion-->

    <!--#region bio_small -->
    <Field class="col-span-2">
      <FieldLabel for="bio_small" class="text-gray-100">مختصری از من</FieldLabel>
      <Textarea
          id="bio_small"
          class="text-white"
          v-model="bio_small"
          :disabled="loading"
          placeholder="در مورد خود بنویسید"
          :rows="4"
      />
    </Field>
    <!--#endregion-->

    <!--#region bio_long -->
    <Field class="col-span-2">
      <FieldLabel for="bio_long" class="text-gray-100">شرح حال</FieldLabel>
      <Textarea
          id="bio_long"
          class="text-white min-h-28"
          v-model="bio_long"
          :disabled="loading"
          placeholder="در مورد خود بنویسید"
          :rows="8"
      />
    </Field>
    <!--#endregion-->

    <!--#region address -->
      <Field class="col-span-2">
        <FieldLabel for="address" class="text-gray-100">آدرس محل کار</FieldLabel>
        <Input
            id="address"
            type="text"
            class="text-white"
            autocomplete="new-password"
            v-model="address"
            :disabled="loading"
        />
      </Field>
      <!--#endregion-->

    <!--#region email -->
    <Field class="col-span-2">
      <FieldLabel for="email" class="text-gray-100">ایمیل ( پست الکترونیکی )</FieldLabel>
      <Input
          id="email"
          type="text"
          class="text-white"
          autocomplete="new-password"
          v-model="email"
          :disabled="loading"
      />
    </Field>
    <!--#endregion-->

    <!--#region website -->
    <Field class="col-span-2">
      <FieldLabel for="website" class="text-gray-100">وبسایت ( WebSite )</FieldLabel>
      <Input
          id="website"
          type="text"
          class="text-white"
          autocomplete="new-password"
          v-model="website"
          :disabled="loading"
      />
    </Field>
    <!--#endregion-->

    <!--#region instagram -->
    <Field class="col-span-2">
      <FieldLabel for="instagram" class="text-gray-100">اینستاگرام ( Instagram )</FieldLabel>
      <Input
          id="instagram"
          type="text"
          class="text-white"
          autocomplete="new-password"
          v-model="instagram"
          :disabled="loading"
      />
    </Field>
    <!--#endregion-->

    <!--#region birthDate -->
    <Field v-if="false" class="col-span-2">
      <FieldLabel for="birthDate" class="text-gray-100">تاریخ تولد</FieldLabel>
      <div class="dir-rtl">
        <PersianDatepicker id="birthDate" v-model="birthDate" :disabled="loading"/>
      </div>
    </Field>
    <!--#endregion-->

    <!--#region Artist Box -->

    <!--#region is Artist -->
    <FieldSeparator class="col-span-2 my-4" />
    <Field orientation="horizontal" class="col-span-2">
      <Checkbox id="isArtist" :default-value="false" v-model="isArtist" />
      <FieldContent>
        <FieldLabel for="isArtist" class="text-white"> من یک هنرمند هستم </FieldLabel>
        <FieldDescription class="text-gray-400 text-xs">
          در صورتی که هنرمند هستید و مایل به انتشار محتوی خود در اپلیکیشن می باشید ، این گزینه را فعال کرده و اطلاعات لازم را مشخص کنید.
        </FieldDescription>
      </FieldContent>
    </Field>
    <!--#endregion-->

    <!--#region Skills -->
    <FieldSet v-if="isArtist" class="col-span-2 my-4 pr-7">
      <FieldLegend variant="label" class="text-white">
        مهارت ها و هنرها
      </FieldLegend>
      <FieldDescription class="text-gray-400 text-xs">
        مهارت های خود را از لیست زیر انتخاب نمایید
      </FieldDescription>
      <FieldGroup class="gap-3 pr-6">

        <Field orientation="horizontal" v-for="(it ,i) in _skills" :key="`skill_${i}`">
          <Checkbox :id="`skill_${it.id}`" v-model="it.selected"/>
          <FieldLabel :for="`skill_${it.id}`" class="text-white">{{it.title}}</FieldLabel>
        </Field>

      </FieldGroup>
    </FieldSet>
    <!--#endregion-->

    <!--#endregion-->



      <!--#region Error -->
      <Field class="col-span-2 mt-2" v-if="errorMessage">
        <FieldError>{{ errorMessage }}</FieldError>
      </Field>
      <!--#endregion-->

      <!--#region Submit -->
      <Field class="col-span-2 mt-4">
        <Button type="submit"  class="cursor-pointer bg-sky-500 hover:bg-sky-300 transition-all ease-in-out duration-300" :disabled="loading">
          <span v-if="loading">در حال ثبت اطلاعات ...</span>
          <span v-else>ذخیره اطلاعات</span>
        </Button>
      </Field>
      <!--#endregion-->

  </form>
  </div>
</template>