<script setup lang="ts">
import { onMounted } from "vue";
import ModeToggle from "~~/components/ModeToggle.vue";
import { useEditStore } from "~/stores/edit";
const edit = useEditStore();

// Инициализируем состояние из sessionStorage, когда компонент смонтирован на клиенте
onMounted(() => {
  edit.initialize();
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
      <h1 class="text-3xl font-bold text-center text-gray-900">
        Демо режима редактирования
      </h1>

      <!-- Кнопка -->
      <ModeToggle />

      <!-- Индикация текущего режима -->
      <div class="text-center">
        <p class="text-gray-600">
          Текущий режим:
          <span
            class="px-3 py-1 text-sm font-semibold rounded-full"
            :class="
              edit.isEditMode
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-200 text-gray-800'
            "
          >
            {{ edit.mode }}
          </span>
        </p>
      </div>

      <!-- Пример условного рендера -->
      <div
        v-if="edit.isEditMode"
        class="p-4 border-l-4 bg-blue-50 border-blue-500"
      >
        <p class="text-blue-800">
          Эта секция видна <b>только</b> в режиме редактирования.
        </p>
      </div>
    </div>
  </div>
</template>
