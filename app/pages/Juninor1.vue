<script setup lang="ts">
import { useQuestions } from '~~/composables/useQuestions'

const { questions, pending, error, load, save, total } = useQuestions()
const route = useRoute
const apiUrl = computed(() => `/api/tests/${route.params.id}`)

// Загружаем вопросы при монтировании компонента
onMounted(() => {
  load()
})
</script>

<template>
  <div v-if="pending">
    Загрузка...
  </div>
  <div v-else-if="error">
    Ошибка: {{ error.message }}
  </div>
  <div v-else>
    <div v-for="(question, idx) in questions" :key="idx">
      {{ question.text }}
    </div>
    <div>Всего вопросов: {{ total }}</div>
    <button @click="save">Сохранить</button>
  </div>
</template>