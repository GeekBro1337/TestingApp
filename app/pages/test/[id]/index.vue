<template>
  <div class="p-4">
    <h1>Тест ID: {{ id }}</h1>
    <pre>{{ result }}</pre>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const id = route.params.id as string;

const result = ref(null);

onMounted(async () => {
  try {
    result.value = await $fetch(`/api/tests/${id}`);
  } catch (error) {
    result.value = { error: error };
  }
});
</script>
