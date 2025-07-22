<script setup lang="ts">
const { data: tests } = await useFetch<Array<{ id: string; title: string }>>('/api/tests')
</script>

<template>
  <UContainer class="py-8">
    <h1 class="text-5xl text-primary-600 text-center mb-8 ">Welcome to TestingApp</h1>
  </UContainer>
</template>
