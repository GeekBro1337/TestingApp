<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCategoriesStore } from '~/stores/categories'
import { useUserStore } from '~/stores/user'

const catStore = useCategoriesStore()
const userStore = useUserStore()
await catStore.load()

const selected = ref(catStore.list[0] || '')
const { data: tests, refresh } = await useFetch(() =>
  selected.value ? `/api/tests?category=${selected.value}` : '/api/tests'
)

watch(selected, () => refresh())

const newCategory = ref('')
const dragIndex = ref<number | null>(null)

function addCategory() {
  if (!newCategory.value) return
  catStore.add(newCategory.value)
  selected.value = newCategory.value
  newCategory.value = ''
}

function startDrag(idx: number) {
  dragIndex.value = idx
}
function drop(idx: number) {
  if (dragIndex.value === null || dragIndex.value === idx) return
  const moved = catStore.list.splice(dragIndex.value, 1)[0]
  catStore.list.splice(idx, 0, moved)
  dragIndex.value = null
  catStore.reorder(catStore.list)
}
</script>

<template>
  <UContainer class="py-8 space-y-4">
    <h1 class="text-3xl font-bold">Available Tests</h1>

    <div class="flex items-center gap-2">
      <span>Category:</span>
      <USelect v-model="selected" :items="catStore.list" class="w-48" />
    </div>

    <ul class="space-y-2">
      <li v-for="t in tests" :key="t.id">
        <NuxtLink :to="`/test/${t.id}`" class="text-primary-600 underline">
          {{ t.title }}
        </NuxtLink>
      </li>
    </ul>

    <div v-if="userStore.isAdmin" class="pt-6 space-y-4">
      <h2 class="text-xl font-bold">Manage Categories</h2>
      <div class="flex gap-2">
        <UInput v-model="newCategory" placeholder="New category" />
        <UButton @click="addCategory" color="primary">Add</UButton>
      </div>
      <ul>
        <li
          v-for="(c, idx) in catStore.list"
          :key="c"
          draggable="true"
          @dragstart="startDrag(idx)"
          @dragover.prevent
          @drop="drop(idx)"
          class="p-2 border mb-1 bg-white"
        >
          {{ c }}
        </li>
      </ul>
    </div>
  </UContainer>
</template>
