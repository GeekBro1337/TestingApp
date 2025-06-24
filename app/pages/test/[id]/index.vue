<!-- DONE: заголовок берётся из метаданных теста -->
<template>
  <div class="p-4">
    <h1>{{ title }}</h1>
    <pre>{{ result }}</pre>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const id = route.params.id as string;

const result = ref<Test.FormConfig | null>(null);
const title = computed(() => result.value?.metadata?.title ?? result.value?.title ?? `Тест ID: ${id}`);

onMounted(async () => {
  try {
    // Роль пользователя в куки
    result.value = await $fetch<Test.FormConfig>(`/api/tests/${id}`);
  } catch (error) {
    result.value = { error: error };
  }
});
</script>

