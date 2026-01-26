<script setup lang="ts">

//#region Emit
const emit = defineEmits(['update:score'])
//#endregion

//#region Props
interface payload {
  loading: boolean;
  default: number;
  disabled: boolean;
}
const props = withDefaults(defineProps<payload>(), {
  default: 0,
  loading: true,
  disabled: false,
});
//#endregion

//#region Variables
const rate = ref<number>(0);
//#endregion

//#region Functions
const setScore = (data: number) => {
  if (!props.disabled)  rate.value = data;
}
//#endregion

//#region watch
watch(() => props.default, async () => {
  rate.value = props.default;
},{immediate:true,deep:true})
watch(() => rate.value, async () => {
  emit('update:score', rate.value);
},{immediate:true,deep:true})
//#endregion

</script>

<template>
  <div>
    <div v-if="loading"  class="flex justify-between items-center gap-x-3">
      <Skeleton class="item bg-gray-800" />
      <Skeleton class="item bg-gray-800" />
      <Skeleton class="item bg-gray-800" />
      <Skeleton class="item bg-gray-800" />
      <Skeleton class="item bg-gray-800" />
    </div>
    <div v-if="!loading" class="flex justify-between items-center" :class="disabled ? 'gap-x-1' : 'gap-x-3'">
      <div :class="[rate >= 1 ? 'selected' : 'empty' , disabled ? '!size-4' : 'cursor-pointer']" class="item" @click="setScore(1)"></div>
      <div :class="[rate >= 2 ? 'selected' : 'empty' , disabled ? '!size-4' : 'cursor-pointer']" class="item" @click="setScore(2)"></div>
      <div :class="[rate >= 3 ? 'selected' : 'empty' , disabled ? '!size-4' : 'cursor-pointer']" class="item" @click="setScore(3)"></div>
      <div :class="[rate >= 4 ? 'selected' : 'empty' , disabled ? '!size-4' : 'cursor-pointer']" class="item" @click="setScore(4)"></div>
      <div :class="[rate >= 5 ? 'selected' : 'empty' , disabled ? '!size-4' : 'cursor-pointer']" class="item" @click="setScore(5)"></div>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.item{
  @apply size-7 rounded-full transition-all ease-in-out duration-300;
}

.empty{
  @apply border border-gray-200 bg-transparent;
}

.selected{
  @apply border border-gray-200 bg-gray-300;
}
</style>