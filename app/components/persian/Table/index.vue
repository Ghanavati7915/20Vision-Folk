<script setup lang="ts">
//#region Imports
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";
import {ChevronDown} from "lucide-vue-next";
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input";
import type {HTMLAttributes} from "vue";
//#endregion
//#region PROPS - Emit
interface payload {
  heading: any[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
const props = withDefaults(defineProps<payload>(), {
  heading: [],
  totalItems: 0,
  totalPages: 0,
  currentPage: 0,
});
const emit = defineEmits(['search'])
//#endregion

//#region Variables
const search = ref("")
let timeout: ReturnType<typeof setTimeout> | null = null
//#endregion

//#region Watch
watch(search, () => {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    emit('search',search.value);
  }, 2000)
})
//#endregion
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">

    <!--#region Search-Filter-->
    <div class="flex justify-between items-center py-4">
      <!--#region Slot-->
      <slot name="header"/>
      <!--#endregion-->
      <!--#region Search-->
      <Input class="max-w-sm" placeholder="جستجو" v-model="search"/>
      <!--#endregion-->
    </div>
    <!--#endregion-->

    <div class="rounded-md border">
      <!--#region Table-->
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead v-for="(it,i) in props.heading" :class="it.class">{{it.title}}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <slot v-if="totalItems > 0" name="body"/>
        <!--#region Empty-->
        <TableRow v-if="totalItems == 0">
          <TableCell :colspan="props.heading.length" class="h-24 text-center">
            بدون اطلاعات
          </TableCell>
        </TableRow>
        <!--#endregion-->
      </TableBody>
    </Table>
      <!--#endregion-->
      <!--#region Pagination-->
      <div v-if="totalItems > 0" class="flex items-center justify-end space-x-2 p-4">
        <div class="flex-1 text-sm text-muted-foreground">
          {{ totalItems }} رکورد یافت شد
        </div>
        <div class="space-x-2">
          <Button
              variant="outline"
              size="sm"
              :disabled="currentPage == 1"
          >
            قبلی
          </Button>
          <Button
              variant="outline"
              size="sm"
              :disabled="currentPage == 1 && totalPages == 1"
          >
            بعدی
          </Button>
        </div>
      </div>
      <!--#endregion-->

    </div>


  </div>
</template>
