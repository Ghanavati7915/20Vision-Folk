<script setup lang="ts">
//#region Imports
import FlickeringGrid from "~/components/bg/flickeringGrid.vue";
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
      class="rounded-lg overflow-hidden transition-all ease-in-out duration-200 hover:-translate-y-2 relative h-[10rem] p-7 shadow-xl backdrop-blur-xl border bg-white dark:bg-muted-700 dark:border-muted-700"
      :class="props.link ? 'cursor-pointer' : ''"
      :initial="{ opacity: 0, y: 50, scale: 0.9 }"
      :animate="{ opacity: 1, y: 0, scale: 1 }"
      :transition="{ delay: (0.9 * props.index), duration: 0.4, ease: 'easeInOut' }"
      @click="openLink"
  >
    <div class="absolute inset-0">
      <div class="scale-125 w-full h-full">
        <FlickeringGrid :squareSize="4" :gridGap="12" :flickerChance="0.2" color="#5e5ee5"
                        :maxOpacity="0.6" />
      </div>
    </div>

    <div class="absolute w-2/3 h-2/3 bottom-0 right-0 pointer-events-none
           bg-gradient-to-tl
           from-white via-white/75 dark:from-muted-700 dark:via-muted-700/65 via-70% to-transparent">
    </div>
    <div class="absolute w-1/3 h-1/3 via-70% top-0 left-0 pointer-events-none
           bg-gradient-to-br
           from-white via-white/80 dark:from-muted-700 dark:via-muted-700/65 to-transparent">
    </div>

    <div class="absolute top-4 left-4 flex items-center justify-center">
      <component :is="props.icon" v-if="props.icon" class="size-10 text-primary-600 dark:text-primary-500"  />
    </div>

    <div class="absolute bottom-5 right-5 z-10">
      <p class="text-lg font-bold">{{props.title}}</p>
      <div v-if="props.description" class="text-muted-600 dark:text-muted-400 mt-2">{{props.description}}</div>
    </div>
  </Motion>
</template>

<style scoped>

</style>