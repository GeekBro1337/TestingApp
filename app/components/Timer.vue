<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const elapsed = ref(0)
let intervalId: ReturnType<typeof setInterval>

onMounted(() => {
  intervalId = setInterval(() => {
    elapsed.value++
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})

const formatted = computed(() => {
  const minutes = Math.floor(elapsed.value / 60)
    .toString()
    .padStart(2, '0')
  const seconds = (elapsed.value % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
})
</script>

<template>
  <p class="text-xl font-bold text-primary-500">{{ formatted }}</p>
</template>
