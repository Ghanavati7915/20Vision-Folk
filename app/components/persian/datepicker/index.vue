<script lang="ts" setup>
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
  today,
  toCalendar,
  createCalendar,
} from "@internationalized/date";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";
import { Input } from "~/components/ui/input";
import Calendar from "~/components/persian/calendar/index.vue";

const todayDate = toCalendar(
    today(getLocalTimeZone()),
    createCalendar("persian"),
);

const modelValue = defineModel<DateValue>({required:false});

onMounted(async () => {
  if(!modelValue.value) modelValue.value = todayDate
})

const formatDate = computed(() => {
  return new DateFormatter("fa-IR").format(
      modelValue.value?.toDate(getLocalTimeZone()),
  );
});
</script>

<template>
  <div>
    <Popover>
      <PopoverTrigger as-child>
        <Input
            class="!bg-primary-foreground text-center"
            type="text"
            placeholder="Pick a date"
            readonly
            v-model="formatDate"
        />
      </PopoverTrigger>
      <PopoverContent class="w-auto border-none p-0 shadow-none">
        <persianCalendar v-model="modelValue" />
      </PopoverContent>
    </Popover>
  </div>
</template>
