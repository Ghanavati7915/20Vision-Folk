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
import { login } from "@/services/auth"
//#endregion

//#region Instance
const router = useRouter()
//#endregion

//#region Props
const props = defineProps<{ class?: HTMLAttributes["class"] }>()
//#endregion

//#region Variables
const username = ref("")
const password = ref("")
const loading = ref(false)
const errorMessage = ref("")
//#endregion

//#region Zod Schema
const loginSchema = z.object({
  username: z.string().min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد"),
  password: z.string().min(3, "کلمه عبور باید حداقل 3 کاراکتر باشد"),
})
//#endregion

//#region Functions
const handleSubmit = async (e: Event) => {
  e.preventDefault()
  errorMessage.value = ""

  const result = loginSchema.safeParse({
    username: username.value,
    password: password.value,
  })

  if (!result.success) {
    errorMessage.value = result.error.errors[0].message
    return
  }

  loading.value = true
  try {
    const response = await login({
      username: username.value,
      password: password.value,
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
</script>

<template>
  <form :class="cn('flex flex-col gap-6', props.class)" @submit="handleSubmit">
    <FieldGroup>
      <div class="flex flex-col items-center gap-1 text-center">
        <h1 class="text-2xl font-bold">ورود به حساب کاربری</h1>
        <p class="text-muted-foreground text-sm text-balance">
          نام کاربری و کلمه عبور خود را وارد کنید
        </p>
      </div>

      <!-- Username -->
      <Field>
        <FieldLabel for="username">نام کاربری</FieldLabel>
        <Input
            id="username"
            type="text"
            placeholder="username"
            v-model="username"
            :disabled="loading"
        />
      </Field>

      <!-- Password -->
      <Field>
        <FieldLabel for="password">کلمه عبور</FieldLabel>
        <Input
            id="password"
            type="password"
            v-model="password"
            :disabled="loading"
        />
      </Field>

      <!-- Error -->
      <Field v-if="errorMessage">
        <FieldError>{{ errorMessage }}</FieldError>
      </Field>

      <!-- Submit -->
      <Field>
        <Button type="submit" :disabled="loading">
          <span v-if="loading">در حال بررسی...</span>
          <span v-else>ورود</span>
        </Button>
      </Field>

      <FieldSeparator> حساب کاربری ندارید ؟ </FieldSeparator>

      <Field>
        <Button variant="outline" type="button" :disabled="loading">
          ارتباط با بخش فروش
        </Button>

        <FieldDescription class="text-center pt-5">
          <span>نسخه</span>
          <span class="mr-2">{{ projectConfig.version }}</span>
        </FieldDescription>
      </Field>
    </FieldGroup>
  </form>
</template>