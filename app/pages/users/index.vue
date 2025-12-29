<script setup lang="ts">
//#region Imports
import {
  TableCell,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
//#endregion

//#region Service
import {getAllPersonal} from "@/services/phonebook"
//#endregion

//#region Instance
const user = await useUser()
//#endregion

//#region Variables
const loading = ref<boolean>(true)
const tab = ref<string>('personal')
const data = ref<any>({
  heading : [
    {title:'ردیف',class:'w-[100px]'},
    {title:'نام'},
    {title:'نام خانوادگی'},
    {title:'جنسیت'},
    {title:'تلفن همراه'},
    {title:'کد ملی'},
    {title:'عملیات'},
  ],
  items:[],
  currentPage:0,
  totalItems:0,
  totalPages:0
})
//#endregion

//#region Function
const getData = async (search:string = '') => {
  let isCustomer = false
  if (tab.value == 'employee') isCustomer = true
  console.log('isCustomer : ' , isCustomer)
  const response = await getAllPersonal({search, isCustomer:isCustomer, pagination: {page: 1, pageSize: 100}})
  if (response.result) {
    data.value.items = response.data.results.map((it: any) => ({
      id: it.id,
      title: `${it.firstname} ${it.lastname}`,
      firstname: it.firstname,
      lastname: it.lastname,
      gender:   it.gender,
      mobile: it.mobile,
      nationalCode:  it.nationalCode,
    }))
    data.value.totalItems = response.data.totalItems
    data.value.totalPages = response.data.totalPages
    data.value.currentPage = response.data.currentPage
  }
  loading.value = false
}
//#endregion

//#region Watch
watch(tab,async () => {
  loading.value = true
  await getData()
})
//#endregion

//#region LifeCycle
onMounted(async () => {
  await getData();
})
//#endregion
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0" >
    <Loading v-if="loading"/>
    <PersianTable
        v-if="!loading"
        :heading="data.heading"
        :currentPage="data.currentPage"
        :totalItems="data.totalItems"
        :totalPages="data.totalPages"
        @search="getData"
    >
      <template #header>
        <Tabs default-value="personal" v-model="tab">
          <TabsList >
            <TabsTrigger value="personal">اشخاص</TabsTrigger>
            <TabsTrigger value="employee">کارمندان</TabsTrigger>
            <TabsTrigger value="company">شرکت ها</TabsTrigger>
          </TabsList>
        </Tabs>
      </template>
      <template #body>
        <TableRow v-for="(it,i) in data.items" :key="i">
          <TableCell class="text-center">{{ i+1 }}</TableCell>
          <TableCell class="text-center">{{ it.firstname }}</TableCell>
          <TableCell class="text-center">{{ it.lastname }}</TableCell>
          <TableCell class="text-center">{{ it.gender }}</TableCell>
          <TableCell class="text-center">{{ it.mobile }}</TableCell>
          <TableCell class="text-center">{{ it.nationalCode }}</TableCell>
          <TableCell class="text-center"></TableCell>
        </TableRow>
      </template>
    </PersianTable>
  </div>
</template>
