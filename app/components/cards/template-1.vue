<script setup lang="ts">
//#region Imports
import RippleCircleA from "~/components/bg/rippleCircleA.vue";
//#endregion
//#region Props
interface payload {
  title: string;
  icon?: any;
  description?: string;
  link?: string;
  index?: number;
}
const props = withDefaults(defineProps<payload>(), {
  title: '',
  index: 1,
});
//#endregion
//#region Instance
const router = useRouter()
//#endregion
//#region Functions
const openLink = async () => {
  if (props.link) await router.push(props.link)
}
//#endregion
</script>

<template>
  <Motion
      as="div"
      class="rounded-lg overflow-hidden transition-all ease-in-out duration-200 hover:-translate-y-2 relative h-[10rem] p-5 shadow-xl backdrop-blur-xl border bg-white dark:bg-muted-700 dark:border-muted-700"
      :class="props.link ? 'cursor-pointer' : ''"
      :initial="{ opacity: 0, y: 50, scale: 0.9 }"
      :animate="{ opacity: 1, y: 0, scale: 1 }"
      :transition="{ delay: (0.9 * props.index), duration: 0.4, ease: 'easeInOut' }"
      @click="openLink"
  >
    <div class="absolute translate-y-1/5 -translate-x-1/5  w-full h-full">
      <div class="relative flex h-full w-full flex-col items-center justify-center">
        <component :is="props.icon" v-if="props.icon" class="size-10 text-primary-600 dark:text-primary-500"  />
        <RippleCircleA circle-class="bg-slate-500 dark:bg-600/5 rounded-full" />
      </div>
    </div>
    <div>
      <p class="text-lg font-bold">{{props.title}}</p>
      <div v-if="props.description" class="text-muted-600 dark:text-muted-400 mt-2">{{props.description}}</div>
    </div>
  </Motion>
</template>

<style scoped>

</style>