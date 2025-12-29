<script setup lang="ts">
import * as icons from 'lucide-vue-next'

interface payload {
  name: string;
  size?: number;
}
const props = withDefaults(defineProps<payload>(), {
  name: '',
  size: 14,
});
</script>

<template>
  <component
      :is="icons[props.name]"
      :size="props.size"
      class="shrink-0"
  />
</template>
