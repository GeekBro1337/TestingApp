<script setup lang="ts">
import { getTest, saveTestAnswers } from "~~/composables/Questions";
import { ref, onMounted } from "vue";

const result = ref<Test.Test | null>(null);
const loading = ref(true);
const error = ref<Error | null>(null);
const selectedAnswers = ref<Record<string, string>>({});

onMounted(async () => {
  try {
    loading.value = true;
    result.value = await getTest("junior1");
  } catch (e) {
    error.value = e instanceof Error ? e : new Error("Неизвестная ошибка");
    console.error("Ошибка при загрузке теста:", e);
  } finally {
    loading.value = false;
  }
});

async function handleSave() {
  if (!result.value) return;

  const answers = Object.entries(selectedAnswers.value).map(
    ([questionId, answerId]) => ({
      questionId,
      answerId,
    })
  );

  try {
    loading.value = true;
    const success = await saveTestAnswers("junior1", answers);
    if (success) {
      alert("Ответы успешно сохранены!");
    } else {
      throw new Error("Не удалось сохранить ответы");
    }
  } catch (e) {
    alert("Ошибка при сохранении ответов");
    console.error(e);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">IT тест для Junior</h1>

    <div v-if="loading" class="text-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"
      ></div>
      <p class="mt-4">Загрузка вопросов...</p>
    </div>

    <div
      v-else-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
    >
      <p>Произошла ошибка при загрузке вопросов.</p>
      <p class="text-sm">{{ error.message }}</p>
    </div>

    <div v-else-if="result" class="space-y-6">
      <div
        v-for="(question, idx) in result.questions"
        :key="question.id"
        class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      >
        <p class="text-lg font-medium mb-4">
          {{ idx + 1 }}. {{ question.question }}
        </p>

        <div class="space-y-2">
          <label
            v-for="answer in question.answers"
            :key="answer.key"
            class="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
          >
            <input
              type="radio"
              :name="'question-' + question.id"
              :value="answer.key"
              v-model="selectedAnswers[question.id]"
              class="h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
            />
            <span>{{ answer.answer }}</span>
          </label>
        </div>
      </div>

      <div class="mt-8 flex justify-between items-center">
        <div class="text-gray-600">
          Всего вопросов: {{ result.questions.length }}
        </div>
        <button
          @click="handleSave"
          :disabled="loading"
          class="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded transition-colors"
        >
          {{ loading ? "Сохранение..." : "Сохранить ответы" }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-radio {
  @apply h-4 w-4 text-blue-600 transition duration-150 ease-in-out;
}
</style>
