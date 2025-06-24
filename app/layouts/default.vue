<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "~/stores/user";
import { useEditStore } from "~/stores/edit";

const userStore = useUserStore();
const editStore = useEditStore();

onMounted(() => {
  editStore.initialize();
});

// Пример данных для меню с двумя выпадающими списками
const navItems = [
  {
    label: 'Tests ',
    icon: 'i-lucide-book-open',
    children: [
      {
        label: 'Test-1',
        description: 'Test for beginers',
        icon: 'i-lucide-house',
        to: '/test/test'
      },
    ]
  },
  {
    label: 'DevPages     ',
    icon: 'i-lucide-command',
    children: [
      {
        label: 'Access',
        description: 'Проверка прав доступа',
        icon: 'i-lucide-user-circle',
        to: '/check-access'
      },
      {
        label: 'EditMode test',
        description: 'Проверка режима редактирование',
        icon: 'i-lucide-user-circle',
        to: '/editTest'
      },
    ]
  }
] satisfies NavigationMenuItem[]
</script>

<template>
  <UContainer class="flex flex-col bg-gray-100 rounded-b-lg">
    <!-- Header как отдельный компонент -->
    <header>
      <UContainer class="bg-red">
        <div class="flex items-center justify-between py-4">
          <h1 class="text-xl font-bold">MyApp</h1>
          <UNavigationMenu :items="navItems" />
          <div class="flex items-center gap-2">
            <span class="text-sm">
              Роль: <strong>{{ userStore.role }}</strong>
            </span>
            <UButton
              size="sm"
              color="primary"
              @click="userStore.toggleRole()"
            >
              {{ userStore.role === "admin" ? "Admin" : "Guest" }}
            </UButton>
            <UButton
              v-if="userStore.isAdmin"
              size="sm"
              :color="editStore.isEditMode ? 'primary' : 'neutral'"
              @click="editStore.toggle()"
            >
              {{
                editStore.isEditMode
                  ? "Выключить редактирование"
                  : "Включить редактирование"
              }}
            </UButton>
          </div>
        </div>
      </UContainer>
    </header>
  </UContainer>
  <div>
  <slot />
  </div>
</template>