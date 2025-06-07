<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "~/stores/user";
import { useEditStore } from "~/stores/edit";

const userStore = useUserStore();
const editStore = useEditStore();

// Инициализируем режим редактирования при монтировании
onMounted(() => {
  editStore.initialize();
});
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <header class="bg-white shadow-md">
      <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex-shrink-0">
            <h1 class="text-xl font-bold text-gray-800">MyApp</h1>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Текущая роль -->
            <span class="text-sm text-gray-600">
              Роль: <strong>{{ userStore.role }}</strong>
            </span>

            <!-- Кнопка переключения роли -->
            <button
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              @click="userStore.toggleRole()"
            >
              {{ userStore.role === "admin" ? "Admin" : "Guest" }}
            </button>

            <!-- Кнопка переключения режима редактирования (только для админа) -->
            <button
              v-if="userStore.isAdmin"
              class="px-4 py-2 text-sm font-medium transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md shadow-sm"
              :class="
                editStore.isEditMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                  : 'bg-gray-200 text-blue-900 border border-blue-600 hover:bg-gray-300 focus:ring-blue-600'
              "
              @click="editStore.toggle()"
            >
              {{
                editStore.isEditMode
                  ? "Выключить редактирование"
                  : "Включить редактирование"
              }}
            </button>
          </div>
        </div>
      </nav>
    </header>

    <main>
      <slot />
    </main>
  </div>
</template>
