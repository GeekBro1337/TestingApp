<template>
  <div class="container mx-auto p-4">
    <div v-if="user.role === 'admin'" class="success-message">
      <h2 class="text-2xl font-bold text-green-600">Поздравляем! 🎉</h2>
      <p class="mt-2">Вы успешно вошли как администратор.</p>
      <p class="mt-4">У вас есть полный доступ к системе.</p>
    </div>

    <div v-else class="error-message">
      <h2 class="text-2xl font-bold text-red-600">Доступ запрещен! ⛔</h2>
      <p class="mt-2">У вас недостаточно прав для доступа к этой странице.</p>
      <p class="mt-4">
        Пожалуйста, войдите как администратор для получения доступа.
      </p>
    </div>

    <div class="mt-8">
      <NuxtLink to="/user" class="btn">
        Вернуться на страницу управления ролями
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";
const user = useUserStore();
</script>

<style scoped>
.success-message,
.error-message {
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.success-message {
  background-color: #f0fdf4;
  border: 1px solid #86efac;
}

.error-message {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
}

.btn {
  display: inline-block;
  padding: 8px 16px;
  background-color: #f3f4f6;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-decoration: none;
  color: #374151;
  transition: all 0.3s ease;
}

.btn:hover {
  background-color: #e5e7eb;
}
</style>
