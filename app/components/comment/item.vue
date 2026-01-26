<script setup lang="ts">
//#region Props
interface payload {
  loading: boolean;
  title: string;
  avatar: string;
  dateTime: string;
  score: number;
  message: string;
}
const props = withDefaults(defineProps<payload>(), {
  title: '',
  message: '',
});
//#endregion

const rate = ref(0);

//#region watch
watch(() => props.score, async () => {
  rate.value = props.score;
},{immediate:true,deep:true})
//#endregion
</script>

<template>
  <div>

    <div v-if="loading" class="w-full flex flex-col mb-4">
      <div class="flex justify-between items-center">
        <div class="flex justify-center items-center">
          <Skeleton class="size-8 rounded-full bg-gray-800" />
          <div class="flex justify-center items-center mr-2">
            <Skeleton class="w-16 h-4 rounded-sm bg-gray-800" />
          </div>
        </div>
        <div class="flex justify-between items-center gap-x-2">
          <Skeleton class="size-4 rounded-full bg-gray-800" />
          <Skeleton class="size-4 rounded-full bg-gray-800" />
          <Skeleton class="size-4 rounded-full bg-gray-800" />
          <Skeleton class="size-4 rounded-full bg-gray-800" />
          <Skeleton class="size-4 rounded-full bg-gray-800" />
        </div>
      </div>
      <div class="w-full flex flex-col gap-y-3 mt-2">
        <div class="flex flex-col justify-start items-start gap-y-3 text-gray-200">
          <Skeleton class="w-full h-4 rounded-sm bg-gray-800" />
          <Skeleton class="w-2/3 h-4 rounded-sm bg-gray-800" />
        </div>
      </div>
    </div>

    <div v-if="!loading" class="w-full flex flex-col mb-4">
      <div class="flex justify-between items-center">
        <div class="flex justify-center items-center">
          <img :src="avatar" alt="avatar" class="size-8 rounded-full bg-gray-800" />
          <div class="flex justify-center items-center mr-2">
            <span> {{title}} </span>
            <span class="px-2"> | </span>
            <span> {{dateTime}} </span>
          </div>
        </div>
        <div class="flex justify-between items-center gap-x-2">
          <CommentScore v-model:score="rate" :loading="false" :disabled="true" :default="rate"/>
        </div>
      </div>
      <div class="w-full flex flex-col gap-y-3 mt-2">
        <div class="flex justify-start items-start gap-y-3 text-gray-200">
          <span>{{message}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>