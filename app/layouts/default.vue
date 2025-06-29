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
        to: '/test/new'
      },
      {
        label: 'SQL-test',
        description: 'Test for beginers',
        icon: 'i-lucide-book-key',
        to: '/test/sql_test'
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
  <!-- <UContainer class="flex flex-col bg-neutral-100 "></UContainer> -->
  <div>
    <div class="flex flex-col bg-neutral-100 ">
    <!-- Header как отдельный компонент -->
    <header>
        <div class="flex items-center justify-between p-4 ">
          <NuxtLink to="/">
            <h1 class="text-xl font-bold text-primary-500">TestingApp</h1>
          </NuxtLink>
          <UNavigationMenu :items="navItems" />
          <div class="flex items-center gap-2">
            <span class="text-sm">
              Role: <strong>{{ userStore.role }}</strong>
            </span>
            <UButton
              size="lg"
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
                  ? "Turn off editing"
                  : "Turn on editing"
              }}
            </UButton>
            <UButton
              v-if="userStore.isAdmin"
              size="sm"
              :color='primary'
              icon="i-lucide-pen"
              to="/makeNewTest"
            >
            newTest
            </UButton>
          </div>
        </div>
    </header>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>