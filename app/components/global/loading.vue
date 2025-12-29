<script setup lang="ts">
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { Spinner } from '@/components/ui/spinner'
</script>

<template>
  <Empty class="w-full">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <Spinner />
      </EmptyMedia>
      <EmptyTitle>در حال پردازش درخواست</EmptyTitle>
      <EmptyDescription>
        لطفاً تا پایان پردازش صبر کنید
      </EmptyDescription>
    </EmptyHeader>
  </Empty>
</template>
