<script setup lang="ts">
const props = defineProps<{ field: Test.FormField; modelValue: string | undefined }>()
const emit = defineEmits<(e: 'update:modelValue', value: string | undefined) => void>()
</script>
<template>
  <UInput
    type="date"
    :name="props.field.name"
    :placeholder="props.field.placeholder"
    :model-value="props.modelValue"
    @update:model-value="val => emit('update:modelValue', val as string | undefined)"
  />
</template>
