<script setup lang="ts">

//#region Instance
const route = useRoute()
const router = useRouter()
//#endregion

//#region Variables
const types = ref([
  {code : 1 , message : 'میزان اعتبار مجاز شما برای ثبت اثر به اتمام رسیده است'},
])
const message = ref('')
//#endregion

//#region LifeCycle
onMounted(async () => {
  if (route.query.code){
    message.value = types.value.find((it:any)=>it.code == route.query.code)?.message;
  }else{
    await router.push('/');
  }
})
//#endregion
</script>

<template>
  <div class="bg-rose-500 text-white h-screen w-screen p-5 flex justify-center items-center text-center">
    <span class="Farhang_Bold w-full py-10 text-sm">{{message}}</span>
</div>
</template>

<style scoped>

</style>