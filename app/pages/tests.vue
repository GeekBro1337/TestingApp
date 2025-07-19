<script setup lang="ts">
const { data: tests } = await useFetch<Array<{ id: string; title: string }>>('/api/tests')
</script>

<template>
  <UContainer class="py-8">
    <h1 class="text-3xl font-bold mb-4">Available Tests</h1>
    <ul class="space-y-2">
      <li v-for="t in tests" :key="t.id">
        <NuxtLink :to="`/test/${t.id}`" class="text-primary-600 underline">
          {{ t.title }}
        </NuxtLink>
      </li>
    </ul>
  </UContainer>
</template>
