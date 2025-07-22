<script setup lang="ts">
import { UContainer, ULink } from '#components';

const { data: tests } = await useFetch<Array<{ id: string; title: string }>>('/api/tests')
</script>

<template>
  <UContainer class="py-8">
    <h1 class="text-3xl font-bold mb-4 text-primary">Available Tests</h1>
    <ul class="space-y-2">
      <li v-for="t in tests" :key="t.id">
        <ULink :to="`/test/${t.id}`" class=" text-primary-600 border-primary block p-4 mb-4 bg-neutral-100 rounded-sm w-full">
          {{ t.title }}
        </ULink>
      </li>
    </ul>
  </UContainer>
</template>
