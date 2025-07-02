<script setup lang="ts">
import { onMounted } from "vue";
import { useEditStore } from "~/stores/edit";
const edit = useEditStore();

// Инициализируем состояние из sessionStorage, когда компонент смонтирован на клиенте
onMounted(() => {
  edit.initialize();
});
</script>

<template>
  <div class="flex items-center justify-center p-4">
    <div
      class="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg mt-8"
    >
      <h1 class="text-3xl font-bold text-center text-gray-900">
        Демо режима редактирования
      </h1>

      <!-- Индикация текущего режима -->
      <div class="text-center">
        <p class="text-gray-600">
          Текущий режим:
          <span
            class="px-3 py-1 text-sm font-semibold rounded-full"
            :class="
              edit.isEditMode
                ? 'bg-primary-100 text-primary-800'
                : 'bg-neutral-200 text-neutral-800'
            "
          >
            {{ edit.mode }}
          </span>
        </p>
      </div>

      <!-- Пример условного рендера -->
      <div
        v-if="edit.isEditMode"
        class="p-4 border-l-4 bg-primary-50 border-primary-500"
      >
        <p class="text-primary-800">
          Эта секция видна <b>только</b> в режиме редактирования.
        </p>
      </div>
    </div>
  </div>
</template>
