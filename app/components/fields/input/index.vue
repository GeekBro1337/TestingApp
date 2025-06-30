<script setup lang="ts">
const props = defineProps<{ field: Test.FormField; modelValue: number | undefined }>()
const emit = defineEmits<(e: 'update:modelValue', value: number | undefined) => void>()
</script>
<template>
  <UInput
    type="number"
    :name="props.field.name"
    :placeholder="props.field.placeholder"
    :model-value="props.modelValue"
    @update:model-value="val => emit('update:modelValue', val as number | undefined)"
  />
</template>
