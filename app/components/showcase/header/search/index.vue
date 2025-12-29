<script setup lang="ts">
import {Search} from "lucide-vue-next";
const search = ref('')
const doSearch = () => {

}
</script>

<template>
  <div class="mx-auto flex justify-center items-center">
    <InputGroup  class="rounded-xl px-5 py-6 bg-[#e8e7e5] border-0">
      <InputGroupInput placeholder="جستجو کنید" read-only @keyup.enter="doSearch"/>
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