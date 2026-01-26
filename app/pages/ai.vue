<script setup lang="ts">
definePageMeta({
  layout: false,
})

import { ref } from 'vue'

// متغیرهای وضعیت
const userMessage = ref('')
const responseText = ref('') // اینجا متن را ذخیره می‌کنیم
const isLoading = ref(false)

// تابع ارسال پیام با پشتیبانی از استریم
const sendMessage = async () => {
  if (!userMessage.value) return

  isLoading.value = true
  responseText.value = '' // پاک کردن پاسخ قبلی

  try {
    const apiUrl = 'https://arvancloudai.ir/gateway/models/Xerxes-1/d2BVwUnoUGkK8p2G6mHQtRGaurhN1ZfnqjMxYXJTJ_cVOeSMPeqwV9wZUBsxBe68etz-o3aqY6mXQOifJPGcYOgSaPc_f5yUgbvQZkNv6-08TXkm_y-Iip5wNF-BAGR23ewSasa8iMvKJLk3hFtJAMB2BKC0W5V-oh4iU2VAoeT7nOB6WqJCmgSZzFZZk6xgBaopq4RXoaibriofGE0550UTZ6-z9pCIbr9pLx5w43Af2w67Dxg/v1/chat/completions'

    // استفاده از fetch استاندارد برای کنترل استریم
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer 396eab02-90ba-51fd-a62c-8513a73fe56e`, // کلید API خود را کامل وارد کنید
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'Xerxes-1',
        messages: [
          { role: 'system', content: "You are Manouchehr, an intelligent AI assistant developed by Ahmad Ghanavati at the company \"Cheshm Andaz Ayandeh Parsian\". You are designed to assist with daily tasks and programming. You do not have the ability to generate images; please respond only with text. Always maintain a warm, intimate, and respectful tone. Express gratitude to the user for using you. Always respond in the same language as the user's prompt." },
          { role: 'user', content: userMessage.value }
        ],
        stream: true, // فعال‌سازی استریم
        max_tokens: 2000,
        temperature: 0.5
      })
    })

    if (!response.ok) {
      throw new Error(`خطای شبکه: ${response.statusText}`)
    }

    // خواندن استریم
    const reader = response.body?.getReader()
    const decoder = new TextDecoder('utf-8')

    if (reader) {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        // دیکد کردن بایت‌های دریافتی به متن
        const chunk = decoder.decode(value, { stream: true })

        // فرمت داده‌ها در استریم OpenAI به صورت "data: {...}" است
        // باید خطوط را جدا کنیم و پردازش کنیم
        const lines = chunk.split('\n')

        for (const line of lines) {
          const trimmedLine = line.trim()
          if (trimmedLine.startsWith('data: ')) {
            const dataStr = trimmedLine.replace('data: ', '')
            if (dataStr === '[DONE]') break // پایان استریم

            try {
              const json = JSON.parse(dataStr)
              // استخراج محتوای تک تک تکه‌ها (delta)
              const content = json.choices[0]?.delta?.content || ''
              // اضافه کردن تکه جدید به متن کل
              responseText.value += content
            } catch (e) {
              // نادیده گرفتن خطاهای پارس JSON در خطوط خالی یا ناقص
              console.error('Error parsing JSON', e)
            }
          }
        }
      }
    }

  } catch (err: any) {
    responseText.value = 'یک خطای غیرمنتظره رخ داد: ' + err.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col w-[100dvw] h-[100dvh] container bg-white" style="max-width: 600px; margin: 50px auto; font-family: sans-serif; direction: rtl;">
    <h1>چت با هوش مصنوعی آروان (استریم)</h1>

    <div class="chat-box" style="border: 1px solid #ddd; padding: 20px; border-radius: 8px; min-height: 100px; margin-bottom: 20px;">
      <p v-if="!responseText && !isLoading">پیامی از هوش مصنوعی دریافت نشده است.</p>
      <!-- نمایش متن در حال تایپ -->
      <p v-if="responseText" style="white-space: pre-wrap;">{{ responseText }}</p>
      <p v-if="isLoading && !responseText">در حال اتصال...</p>
    </div>

    <div class="input-group">
      <input
          v-model="userMessage"
          type="text"
          placeholder="پیام خود را بنویسید..."
          @keyup.enter="sendMessage"
          :disabled="isLoading"
          style="padding: 10px; width: 70%; border: 1px solid #ccc; border-radius: 4px;"
      />
      <button
          @click="sendMessage"
          :disabled="isLoading"
          style="padding: 10px 20px; background-color: #e63946; color: white; border: none; border-radius: 4px; cursor: pointer;"
      >
        {{ isLoading ? 'در حال نوشتن...' : 'ارسال' }}
      </button>
    </div>
  </div>
</template>