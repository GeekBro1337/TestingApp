<script setup lang="ts">
const props = defineProps<{ field: Test.FormField; modelValue: string[] }>()
const emit = defineEmits<(e: 'update:modelValue', value: string[]) => void>()
</script>
<template>
  <UCheckboxGroup
    color="primary"
    variant="card"
    size="xl"
    :model-value="props.modelValue"
    :items="props.field.options?.map(o => ({ label: o.label, value: o.value })) || []"
    @update:model-value="val => emit('update:modelValue', val as string[])"
  />
</template>
