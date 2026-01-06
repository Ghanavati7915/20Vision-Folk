<script setup lang="ts">
//#region Imports
import projectConfig from "@/../project.config"
import type { HTMLAttributes } from "vue"
import { ref } from "vue"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldError,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
//#endregion

//#region Service
import { register } from "@/services/auth"
//#endregion

//#region Instance
const router = useRouter()
//#endregion

//#region Props
const props = defineProps<{ class?: HTMLAttributes["class"] }>()
const emits = defineEmits(['onMode']);
//#endregion

//#region Variables
const username = ref("")
const password = ref("")
const firstname = ref("")
const lastname = ref("")
const loading = ref(false)
const errorMessage = ref("")
//#endregion

//#region Zod Schema
const registerSchema = z.object({
  username: z
      .string()
      .regex(
          /^(?:\+98|0)?9\d{9}$/,
          'شماره موبایل معتبر وارد کنید'
      ),

  password: z
      .string()
      .min(3, 'کلمه عبور باید حداقل ۳ کاراکتر باشد')
      .regex(
          /^[A-Za-z0-9!@#$%^&*()_+=\-{}[\]:;"'<>,.?/|\\]+$/,
          'کلمه عبور باید فقط شامل کاراکترهای انگلیسی یا اعداد باشد'
      ),

  firstname: z
      .string()
      .min(2, 'نام را مشخص کنید'),

  lastname: z
      .string()
      .min(2, 'نام خانوادگی را مشخص کنید'),
})
//#endregion

//#region Functions
const handleSubmit = async (e: Event) => {
  e.preventDefault()
  errorMessage.value = ""

  const result = registerSchema.safeParse({
    username: username.value,
    password: password.value,
    firstname: firstname.value,
    lastname: lastname.value,
  })

  if (!result.success) {
    errorMessage.value = result.error.errors[0].message
    return
  }

  loading.value = true
  try {
    const response = await register({
      username: username.value,
      password: password.value,
      firstname: firstname.value,
      lastname: lastname.value,
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
const changeMode = () => {
  emits("onMode",'login')
}
//#endregion
</script>

<template>
  <form :class="cn('flex flex-col gap-6', props.class)" @submit="handleSubmit">
    <FieldGroup>
      <!--#region Header -->
      <div class="flex flex-col items-center gap-1 text-center">
        <h1 class="text-2xl text-white  font-bold">ثبت نام</h1>
        <p class="text-gray-400 mt-1 text-sm text-balance">
          اطلاعات خود را وارد کنید
        </p>
      </div>
      <!--#endregion-->

      <!--#region Username -->
      <Field>
        <FieldLabel for="username" class="text-gray-100">شماره تلفن همراه</FieldLabel>
        <Input
            id="username"
            type="text"
            maxlength="11"
            autocomplete="new-password"
            v-model="username"
            :disabled="loading"
        />
      </Field>
      <!--#endregion-->

      <!--#region Firstname -->
      <Field>
        <FieldLabel for="firstname" class="text-gray-100">نام</FieldLabel>
        <Input
            id="firstname"
            type="text"
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
            v-model="lastname"
            :disabled="loading"
        />
      </Field>
      <!--#endregion-->

      <!--#region Password -->
      <Field>
        <FieldLabel for="password" class="text-gray-100">کلمه عبور</FieldLabel>
        <Input
            id="password"
            type="password"
            autocomplete="new-password"
            v-model="password"
            :disabled="loading"
        />
      </Field>
      <!--#endregion-->

      <!--#region Error -->
      <Field v-if="errorMessage">
        <FieldError>{{ errorMessage }}</FieldError>
      </Field>
      <!--#endregion-->

      <!--#region Submit -->
      <Field>
        <Button type="submit"  class="cursor-pointer bg-sky-500 hover:bg-sky-300 transition-all ease-in-out duration-300" :disabled="loading">
          <span v-if="loading">در حال ثبت اطلاعات ...</span>
          <span v-else>ثبت نام</span>
        </Button>
      </Field>
<!--      <FieldSeparator> حساب کاربری دارید ؟ </FieldSeparator>-->
      <Field>
        <Button variant="outline" type="button" class="cursor-pointer transition-all ease-in-out duration-300" :disabled="loading" @click="changeMode">
          وارد شوید
        </Button>

        <FieldDescription class="text-center text-gray-300 pt-5">
          <span>نسخه</span>
          <span class="mr-2">{{ projectConfig.version }}</span>
        </FieldDescription>
      </Field>
      <!--#endregion-->
    </FieldGroup>
  </form>
</template>