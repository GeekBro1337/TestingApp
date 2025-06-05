<template>
  <div class="flex items-center gap-4">
    <span
      >Роль: <strong>{{ user.role }}</strong></span
    >
    <button @click="user.setRole('guest')" class="btn">Гость</button>
    <button @click="user.setRole('admin')" class="btn">Админ</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";
const user = useUserStore();
</script>

<style scoped>
.btn {
  padding: 4px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
