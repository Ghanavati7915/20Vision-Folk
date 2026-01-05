<script setup lang="ts">
//#region Imports
import { PhoneCall } from "lucide-vue-next"
import { Globe } from "lucide-vue-next"
import { Mail } from "lucide-vue-next"
//#endregion

//#region Instance
const route = useRoute()
//#endregion

//#region Variables
const loading = ref(true)
const tabs = ref<any[]>([
  {id:'info',title:'معرفی'},
  {id:'arts',title:'آثار'},
  {id:'qr',title:'رمزینه'},
  {id:'visitCard',title:'کارت ویزیت'},
  {id:'visitCard2',title:'کارت اختصاصی'},
])
const data = ref<any>({
  title:'علی خوش نویس زاده',
  info:'سال 1327 در اصفهان متولد شد. هنر سوخت در خانواده‌شان موروثی بود و پدرش مرحوم حسین خوشنویس‌زاده اصفهانی و جد او در حوزه هنر، علم و اجتهاد و به‌خصوص هنر سوخت مشغول بوده‌اند.',
  mobile:'+989044157915',
  email:'info@khoshNevisZadeh@com',
  site:'www.khoshNevisZadeh.com',
  description:`
    <p>
    سال 1327 در اصفهان متولد شد. هنر سوخت در خانواده‌شان موروثی بود و پدرش مرحوم حسین خوشنویس‌زاده اصفهانی و جد او در حوزه هنر، علم و اجتهاد و به‌خصوص هنر سوخت مشغول بوده‌اند. او نیز از ۱۳ سالگی این هنر را شروع کرد. اولین استادش پدرش بود. سپس نزد استاد حاج مصورالملکی، نگارگری و نقاشی آموخت و در محضر اساتیدی چون محمد تجویدی، حسین بهزاد و حسن زرین‌خط، خوشنویسی را آموزش دید.
  </p>

  <p>
    تحصیلات ابتدایی و مقدماتی را در دارالفنون تهران گذراند و پس از اتمام تحصیلات آکادمیک و خدمت نظام وظیفه در تهران، سال 1349 به زادگاه خود اصفهان بازگشت و آموختن هنر سوخت را ادامه داد. اولین تابلوی مستقل خود را در سی سالگی به ثمر رساند. آن زمان پدرش در قید حیات بود و هنگامی که تابلو را دید اشک شوق ریخت.
  </p>

  <p>
    علی خوشنویس‌زاده اصفهانی اکنون یکی از استادان هنر سوخت است که تاکنون در نمایشگاه‌های متعددی در داخل و خارج کشور شرکت و بیش از ۱۰۰ لوح تقدیر دریافت کرده است. او در سال ۱۳۹۱ موفق به اخذ تأیید مهر اصالت از سازمان جهانی یونسکو شد. آثارش در مجموعه‌های شخصی و موزه‌های ملی موجود است.
  </p>

  <p>
    استاد خوشنویس‌زاده در بیش از ۶۰ پایان‌نامه مقطع کارشناسی و کارشناسی ارشد با موضوع هنر سوخت، به عنوان استاد راهنما و مشاور فعالیت کرده و کتابی در زمینه این هنر با عنوان «پیدایش و سیر تحول و تکامل هنر سوخت» تألیف کرده است.
  </p>

  <p>
    حدود ۳۰ سال است که در دانشگاه هنر، دانشگاه نقش جهان و در سازمان میراث فرهنگی و صنایع دستی مشغول تدریس است و در این مدت بیش از ۷۰۰ هنرجو را تعلیم داده است. او گاهی اوقات در کارگاه خصوصی‌اش برای هنرجویانی که خیلی مستعد باشند آموزش می‌گذارد.
  </p>

  <p>
    در خلق آثارش پیرو مکتب صفوی است و به همه دانشجویان و هنرجویانش هم این مکتب را توصیه می‌کند؛ زیرا عقیده دارد هنر نگارگری و نقاشی در مکتب صفویه به کمال می‌رسد.
  </p>

  <p>
    استاد علی خوشنویس‌زاده اصفهانی مدرک درجه یک هنری دارد و از سال 1397 عضو مؤسسه هنرمندان پیشکسوت است.
  </p>

`,
  avatar:'/img/avatar.jpg',
  followers:4.512,
  followings:121,
  arts:[
    {
      id: 1,
      title: `تابلو سوخت معرق و منبت چرم با موضوع رویای عارف`,
      description: `تابلو سوخت معرق و منبت چرم با موضوع رویای عارف به ابعاد ۲۰۶×۱۴۲ دارای مهر اصالت و نشان یونسکو رقم علی خوشنویس زاده اصفهانی سال تولید ۱۳۹۴ زمان اجرا چهار سال محل رونمایی مصلی تهران و موزه هنرهای معاصر اصفهان محل نگهداری اطاق بازرگانی اصفهان قیمت دوازده ملیارد تومان`,
      author: `علی خوش نویس زاده`,
      avatar: `/img/avatar.jpg`,
      image: `/img/art/1.jpeg`
    },
    {
      id: 2,
      title: `تابلو سوخت معرق و منبت چرم با موضوع مجلس بزم`,
      description: `تابلو سوخت معرق و منبت چرم با موضوع مجلس بزم به ابعاد ۱۷۲×۱۶۸ رقم علی خوشنویس زاده اصفهانی دارای مهر اصالت و نشان یونسکو سال تولید ۱۳۵۲ زمان اجرا سه سال محل رونمایی نگارستان امام خمینی محل نگهداری مجموعه موزه شخصی قیمت ده میلیارد تومان`,
      author: `علی خوش نویس زاده`,
      avatar: `/img/avatar.jpg`,
      image: `/img/art/2.jpeg`
    },
    {
      id: 3,
      title: `تابلو سوخت معرق و منبت چرم با موضوع سفر معراج پیامبر اعظم(ص) `,
      description: `تابلو سوخت معرق و منبت چرم با موضوع سفر معراج پیامبر اعظم(ص) به ابعاد ۱۹۲×۱۴۲ رقم علی خوشنویس زاده اصفهانی سال تولید ۱۴۰۲ زمان اجرا سه سال دارای مهر اصالت و نشان یونسکو محل رونمایی نمایشگاه بین‌المللی اصفهان محل نگهداری مجموعه موزه شخصی قیمت یک ملیون دلار`,
      author: `علی خوش نویس زاده`,
      avatar: `/img/avatar.jpg`,
      image: `/img/art/3.jpeg`
    },
    {
      id: 4,
      title: `تابلو سوخت معرق و منبت چرم با موضوع سیاه مشق به خط حضرت میر عمادالحسنی`,
      description: `تابلو سوخت معرق و منبت چرم با موضوع سیاه مشق به خط حضرت میر عمادالحسنی رقم علی خوشنویس زاده اصفهانی دارای مهر اصالت و نشان یونسکو محل رونمایی نقش خانه میدان امام اصفهان سال تولید ۱۳۹۲ زمان اجرا هشت ماه محل نگهداری مجموعه موزه شخصی قیمت دو ملیارد تومان`,
      author: `علی خوش نویس زاده`,
      avatar: `/img/avatar.jpg`,
      image: `/img/art/4.jpeg`
    },
    {
      id: 5,
      title: `تابلو سوخت معرق و منبت چرم با موضوع خط چلیپا `,
      description: `تابلو سوخت معرق و منبت چرم با موضوع خط چلیپا به ابعاد ۷۵×۵۵ به خط حضرت میر عمادالحسنی عصر صفویه رقم علی خوشنویس زاده اصفهانی دارای مهر اصالت و نشان یونسکو تولید ۱۳۹۶ زمان اجرا هشت ماه محل رونمایی نقش خانه میدان امام اصفهان محل نگهداری مجموعه موزه شخصی قیمت دو ملیارد تومان`,
      author: `علی خوش نویس زاده`,
      avatar: `/img/avatar.jpg`,
      image: `/img/art/5.jpeg`
    },
    {
      id: 6,
      title: `تابلو سوخت معرق و منبت چرم با موضوع خط چلیپا`,
      description: `تابلو سوخت معرق و منبت چرم با موضوع خط چلیپا به خط حضرت میر عمادالحسنی عصر صفویه رقم علی خوشنویس زاده اصفهانی به ابعاد ۷۵×۵۵ دارای مهر اصالت و نشان یونسکو سال تولید ۱۳۹۲ زمان اجرا هشت ماه محل رونمایی نقش خانه میدان امام اصفهان سال ۱۳۹۶ محل نگهداری مجموعه موزه شخصی قیمت دو ملیارد تومان`,
      author: `علی خوش نویس زاده`,
      avatar: `/img/avatar.jpg`,
      image: `/img/art/6.jpeg`
    },
    {
      id: 7,
      title: `تابلو سوخت معرق و منبت چرم با موضوع خوشنویسی به خط حضرت میر عمادالحسنی`,
      description: `تابلو سوخت معرق و منبت چرم با موضوع خوشنویسی به خط حضرت میر عمادالحسنی رقم علی خوشنویس زاده اصفهانی به ابعاد ۷۵×۵۵ سال تولید ۱۳۹۲ دارای مهر اصالت و نشان یونسکو زمان اجرا هشت ماه محل رونمایی نقش خانه میدان امام اصفهان سال ۱۳۹۶ محل نگهداری مجموعه موزه شخصی قیمت دو ملیارد تومان`,
      author: `علی خوش نویس زاده`,
      avatar: `/img/avatar.jpg`,
      image: `/img/art/7.jpeg`
    },
    {
      id: 8,
      title: `تابلو سوخت معرق و منبت چرم با موضوع خوشنویسی چلیپا به خط میر علی هروی عصر تیموری`,
      description: `تابلو سوخت معرق و منبت چرم با موضوع خوشنویسی چلیپا به خط میر علی هروی عصر تیموری رقم علی خوشنویس زاده اصفهانی دارای مهر اصالت و نشان یونسکو به ابعاد ۷۵×۵۵ سال تولید ۱۳۹۲ زمان اجرا هشت ماه محل رونمایی نقش خانه میدان امام اصفهان سال ۱۳۹۶ محل نگهداری مجموعه موزه شخصی قیمت دو ملیارد تومان`,
      author: `علی خوش نویس زاده`,
      avatar: `/img/avatar.jpg`,
      image: `/img/art/8.jpeg`
    },
    {
      id: 9,
      title: `تابلو سوخت معرق و منبت چرم با موضوع خوشنویسی چلیپا به میرزا غلام رضا اصفهانی عصر قاجار`,
      description: `تابلو سوخت معرق و منبت چرم با موضوع خوشنویسی چلیپا به میرزا غلام رضا اصفهانی عصر قاجار رقم علی خوشنویس زاده دارای مهر اصالت و نشان یونسکو به ابعاد ۷۵×۵۵ سال تولید ۱۳۹۲ زمان اجرا هشت ماه محل رونمایی نقش خانه میدان امام اصفهان محل رونمایی نقش خانه میدان امام اصفهان سال ۱۳۹۶ محل نگهداری مجموعه موزه شخصی قیمت دو ملیارد تومان.`,
      author: `علی خوش نویس زاده`,
      avatar: `/img/avatar.jpg`,
      image: `/img/art/9.jpeg`
    },
    {
      id: 10,
      title: `تابلو سوخت معرق و منبت چرم با موضوع خوشنویسی چلیپا به خط میرزا غلام رضا اصفهانی عصر قاجار`,
      description: `تابلو سوخت معرق و منبت چرم با موضوع خوشنویسی چلیپا به خط میرزا غلام رضا اصفهانی عصر قاجار رقم علی خوشنویس زاده اصفهانی دارای مهر اصالت و نشان یونسکو به ابعاد ۷۵×۵۵ سال تولید ۱۳۹۲ زمان اجرا هشت ماه محل رونمایی نقش خانه میدان امام اصفهان سال ۱۳۹۶ محل نگهداری مجموعه موزه شخصی قیمت دو ملیارد تومان`,
      author: `علی خوش نویس زاده`,
      avatar: `/img/avatar.jpg`,
      image: `/img/art/10.jpeg`
    },
    {
      id: 11,
      title: `تابلو سوخت معرق و منبت چرم با موضوع گل ومرغ `,
      description: `تابلو سوخت معرق و منبت چرم با موضوع گل ومرغ رقم علی خوشنویس زاده اصفهانی دارای مهر اصالت و نشان یونسکو به ابعاد ۷۵×۵۵ سال تولید ۱۳۹۴ زمان اجرا هشت ماه محل رونمایی نقش خانه میدان امام اصفهان سال ۱۳۹۶ محل نگهداری مجموعه موزه شخصی قیمت دو ملیارد تومان.`,
      author: `علی خوش نویس زاده`,
      avatar: `/img/avatar.jpg`,
      image: `/img/art/11.jpeg`
    },
    {
      id: 12,
      title: `تابلو سوخت معرق و منبت چرم با موضوع شکارگاه`,
      description: `تابلو سوخت معرق و منبت چرم با موضوع شکارگاه رقم علی خوشنویس زاده اصفهانی به ابعاد ۱۵۲×۱۰۳ دارای مهر اصالت و نشان یونسکو سال تولید ۱۳۵۶ زمان اجرا هشت ماه محل نگهداری مجموعه موزه شخصی قیمت دو ملیارد تومان.`,
      author: `علی خوش نویس زاده`,
      avatar: `/img/avatar.jpg`,
      image: `/img/art/12.jpeg`
    },
    {
      id: 13,
      title: `تابلو سوخت معرق و منبت چرم با موضوع شکارگاه بهرام شاه`,
      description: `تابلو سوخت معرق و منبت چرم با موضوع شکارگاه بهرام شاه رقم علی خوشنویس زاده اصفهانی دارای مهر اصالت و نشان یونسکو به ابعاد ۱۶۲×۱۱۲ سال تولید ۱۳۵۶ زمان اجرا چهار ده ماه محل رونمایی نمایشگاه بین‌المللی تهران سال ۱۳۹۶ محل نگهداری مجموعه موزه شخصی قیمت پنج میلیارد تومان`,
      author: `علی خوش نویس زاده`,
      avatar: `/img/avatar.jpg`,
      image: `/img/art/13.jpeg`
    },
    {
      id: 14,
      title: `تابلو سوخت معرق و منبت چرم با موضوع خیام اگر ز باده مستی خوش باش`,
      description: `تابلو سوخت معرق و منبت چرم با موضوع خیام اگر ز باده مستی خوش باش رقم علی خوشنویس زاده اصفهانی دارای مهر اصالت و نشان یونسکو به ابعاد ۱۰۲×۷۲ سال تولید ۱۳۵۲ زمان اجرا چهار ده ماه محل نگهداری مجموعه موزه شخصی قیمت پنج میلیارد تومان.`,
      author: `علی خوش نویس زاده`,
      avatar: `/img/avatar.jpg`,
      image: `/img/art/14.jpeg`
    },
    {
      id: 15,
      title: `تابلو سوخت معرق و منبت چرم با موضوع خسرو، شیرین`,
      description: `تابلو سوخت معرق و منبت چرم با موضوع خسرو، شیرین رقم علی خوشنویس زاده اصفهانی به ابعاد ۱۷۴×۱۶۸ دارای مهر اصالت و نشان یونسکو سال تولید ۱۳۸۵ زمان اجرا پنج سال محل نگهداری مجموعه موزه شخصی قیمت چهار ده میلیارد تومان.`,
      author: `علی خوش نویس زاده`,
      avatar: `/img/avatar.jpg`,
      image: `/img/art/15.jpeg`
    },
    {
      id: 16,
      title: `تابلو سوخت معرق و منبت چرم با موضوع کعبه دل`,
      description: `تابلو سوخت معرق و منبت چرم با موضوع کعبه دل رقم علی خوشنویس زاده اصفهانی به ابعاد ۵۸×۴۳ دارای مهر اصالت و نشان یونسکو سال تولید ۱۳۵۶ زمان اجرا هشت ماه محل نگهداری مجموعه موزه شخصی قیمت دو ملیارد تومان.`,
      author: `علی خوش نویس زاده`,
      avatar: `/img/avatar.jpg`,
      image: `/img/art/16.jpeg`
    },
    {
      id: 17,
      title: `تابلو سوخت معرق و منبت چرم با موضوع دختر طناز`,
      description: `تابلو سوخت معرق و منبت چرم با موضوع دختر طناز رقم علی خوشنویس زاده اصفهانی دارای مهر اصالت و نشان یونسکو به ابعاد ۵۸×۴۲ سال تولید ۱۳۵۶ زمان اجرا هشت ماه محل نگهداری مجموعه موزه شخصی قیمت دو ملیارد تومان`,
      author: `علی خوش نویس زاده`,
      avatar: `/img/avatar.jpg`,
      image: `/img/art/17.jpeg`
    }],
})
const selectedTab = ref<any>(tabs.value[0].id)
const qr = ref<any>('')
const rotatedCard = ref<boolean>(false)
//#endregion

//#region Function
const rotateCard = () => {
  rotatedCard.value = !rotatedCard.value
}
//#endregion

//#region LifeCycle
onMounted(async () => {
  if (process.client) {
    qr.value =  window.location.origin + route.fullPath
  }
  loading.value = false
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
      <span class="Estedad_FD_Bold text-white my-3">{{data.title}}</span>
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
    <div class="flex w-full justify-center items-center px-5 gap-x-4 sm:my-5 bg-gray-800 py-2">
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
    <div v-if="selectedTab == 'qr'" class="px-5 w-full flex justify-center items-center py-5">
      <qrcode-vue
          level="M"
          render-as="svg"
          size="250"
          :value="qr"
          :margin="5"
          background="#111827"
          foreground='#fff'
          class="m-auto"/>
    </div>
    <!--#endregion-->

    <!--#region visitCard-->
    <div v-if="selectedTab == 'visitCard'" class="px-5 w-full flex justify-center items-center py-5 relative">
      <div class="visitCard" @click="rotateCard">
        <div class="content" :class="rotatedCard ? 'contentRotated' : ''">
          <div class="front bg-slate-800 text-slate-100 shadow-2xl flex flex-col justify-start items-center overflow-hidden">

            <!--#region Header-->
            <div class="w-full flex justify-center items-center bg-amber-500 h-36">
            </div>
            <!--#endregion-->

            <!--#region Avatar-->
            <div class="w-full flex justify-center items-center">
              <div class="flex justify-center items-center -translate-y-[110px] bg-slate-800 rounded-full size-65">
                <img :src="data.avatar" alt="avatar" class="rounded-full object-cover size-50 border-8 border-amber-500"/>
              </div>
            </div>
            <!--#endregion-->

            <!--#region Title-->
            <div class="w-full flex justify-center items-center -translate-y-[110px]">
              <span class="text-lg"> {{data.title}} </span>
            </div>
            <!--#endregion-->

            <!--#region contacts-->
            <div class="w-full flex flex-col justify-center items-center -translate-y-[70px] px-5 gap-y-3">
              <!--#region Phone-->
              <div class="flex w-full justify-start items-center">
                <div class="rounded-full flex justify-center items-center bg-amber-500 size-8 ml-3">
                  <PhoneCall class="text-xs size-4 text-slate-800"/>
                </div>
                <span class="text-sm dir-ltr"> {{data.mobile}} </span>
              </div>
              <!--#endregion-->
              <!--#region Email-->
              <div class="flex w-full justify-start items-center">
                <div class="rounded-full flex justify-center items-center bg-amber-500 size-8 ml-3">
                  <Globe class="text-xs size-4 text-slate-800"/>
                </div>
                <span class="text-sm dir-ltr"> {{data.email}} </span>
              </div>
              <!--#endregion-->
              <!--#region Site-->
              <div class="flex w-full justify-start items-center">
                <div class="rounded-full flex justify-center items-center bg-amber-500 size-8 ml-3">
                  <Mail class="text-xs size-4 text-slate-800"/>
                </div>
                <span class="text-sm dir-ltr"> {{data.site}} </span>
              </div>
              <!--#endregion-->
            </div>
            <!--#endregion-->

          </div>
          <div class="back bg-slate-800 text-slate-100  shadow-2xl flex flex-col justify-start items-center overflow-hidden">

            <!--#region Header-->
            <div class="w-full flex justify-center items-center bg-amber-500 h-[300px]">
            </div>
            <!--#endregion-->

            <!--#region Avatar-->
            <div class="w-full flex justify-center items-center">
              <div class="flex justify-center items-center bg-slate-800 rounded-full size-55 -translate-y-[110px]">
                <div class="rounded-full object-cover relative flex justify-center items-center size-45 border-8 border-amber-500">
                  <qrcode-vue
                      level="M"
                      render-as="svg"
                      size="110"
                      :value="qr"
                      :margin="2"
                      background="#1d293d"
                      foreground='#ffffff'
                      class="m-auto"/>
                </div>
              </div>
            </div>
            <!--#endregion-->

            <!--#region Title-->
            <div class="w-full flex justify-center items-center -translate-y-[70px]">
              <span class="text-sm"> جهت اشتراک گذاری اسکن کنید </span>
            </div>
            <!--#endregion-->

          </div>
        </div>
      </div>
    </div>
    <!--#endregion-->

    <!--#region visitCard-->
    <div v-if="selectedTab == 'visitCard2'" class="px-5 w-full flex justify-center items-center py-5 relative">
      <div class="visitCard" @click="rotateCard">
        <div class="content" :class="rotatedCard ? 'contentRotated' : ''">
          <div class="front bg-slate-800 text-slate-100 shadow-2xl flex flex-col justify-start items-center overflow-hidden">
            <img src="/img/visit-special.jpg" alt="visitcard" class="w-full h-full object-fill"/>
          </div>
          <div class="back bg-slate-800 text-slate-100  shadow-2xl flex flex-col justify-start items-center overflow-hidden">
            <img src="/img/visit-special.jpg" alt="visitcard" class="w-full h-full object-fill"/>
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
