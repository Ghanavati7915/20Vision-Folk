<script setup lang="ts">
//#region Imports
import {AlignJustify, House, UsersRound, CircleUserRound} from 'lucide-vue-next'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {Button} from "~/components/ui/button";
const isOpen = ref<boolean>(false)
//#endregion

</script>

<template>
  <div class="w-1/5 mx-auto justify-center items-center px-5">
    <Drawer v-model:open="isOpen">
      <DrawerTrigger as-child>
        <div class="text-slate-900 text-xs rounded-full flex justify-center items-center cursor-pointer transition-all ease-in-out duration-300 hover:-translate-y-2">
          <AlignJustify class="size-7" />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div class="mx-auto w-full max-w-sm Estedad_FD_Light dir-rtl">
          <DrawerClose as-child>
          <div class="p-4 grid grid-cols-3 gap-4">

            <nuxt-link
                to="/"
                class="flex flex-col items-center justify-center rounded-lg py-5 border border-slate-900 w-full"
                @click="isOpen = false"
            >
              <House class="size-7 text-slate-800"/>
              <span class="text-sm mt-4"> خانه </span>
            </nuxt-link>

            <nuxt-link
                to="/artist"
                class="flex flex-col items-center justify-center rounded-lg py-5 border border-slate-900 w-full"
                @click="isOpen = false"
            >
              <UsersRound class="size-7 text-slate-800"/>
              <span class="text-sm mt-4"> هنرمندان </span>
            </nuxt-link>

            <nuxt-link
                to="/login"
                class="flex flex-col items-center justify-center rounded-lg py-5 border border-slate-900 w-full"
                @click="isOpen = false"
            >
              <CircleUserRound class="size-7 text-slate-800"/>
              <span class="text-sm mt-4"> حساب کاربری </span>
            </nuxt-link>

          </div>
        </DrawerClose>
          <DrawerFooter>
            <DrawerClose as-child>
              <Button class="Estedad_FD_Light">لغو</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>

  </div>
</template>


