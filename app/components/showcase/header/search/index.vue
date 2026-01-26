<script setup lang="ts">

//#region Import
import {Search} from "lucide-vue-next";
//#endregion

//#region Instance
const route = useRoute()
const router = useRouter()
//#endregion

//#region Variables
const search = ref('')
//#endregion

//#region Functions
const doSearch = () => {
  router.push('/search?text=' + search.value)
}
//#endregion

//#region watch
watch(() => route, async () => {
  search.value = ''
},{immediate:true,deep:true})
//#endregion

</script>

<template>
  <div class="mx-auto flex justify-center items-center">
    <InputGroup  class="rounded-xl px-5 py-6 bg-gray-700 border-0">
      <InputGroupInput placeholder="جستجو کنید" class="text-gray-200" @keyup.enter="doSearch" v-model="search"/>
      <InputGroupAddon align="inline-end">
        <InputGroupButton
            aria-label="Copy"
            title="Copy"
            size="icon-xs"
            @click="doSearch"
        >
          <Search />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>

<style scoped>

</style>