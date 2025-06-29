<script setup lang="ts">
defineProps<{
  state: Record<string, any>
}>()
</script>
<template> 
    <div class="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h3 class="text-lg font-semibold mb-2">Form State (Debug)</h3>
      <pre class="text-sm overflow-auto">{{ JSON.stringify(state, null, 2) }}</pre>
    </div>
</template>