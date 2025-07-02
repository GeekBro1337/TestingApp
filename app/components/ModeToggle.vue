<template>
  <!-- TODO: cange to UButton -->
  <UButton
    class="w-full px-4 py-3 rounded-lg font-semibold text-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm"
    :class="
      edit.isEditMode
        ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-primary-500'
        : 'bg-gray-200 text-blue-900 border border-blue-600 hover:bg-gray-300 focus:ring-primary-600'
    "
    @click="edit.toggle"
  >
    {{
      edit.isEditMode ? "Выключить редактирование" : "Включить редактирование"
    }}
  </UButton>
</template>

<script setup lang="ts">
import { useEditStore } from "~/stores/edit";
const edit = useEditStore();
</script>
