<template>
  <div class="p-4 space-y-4">
    <UCard v-for="test in tests" :key="test.id" class="flex justify-between items-center">
      <div>{{ test.title }}</div>
      <NuxtLink :to="`/test/${test.id}`" class="text-primary-600 underline">Open</NuxtLink>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const { data: tests } = await useFetch<Array<{ id: string; title: string }>>('/api/tests')
</script>
