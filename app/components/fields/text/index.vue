<script setup lang="ts">

const props = defineProps<{ field: Test.FormField; modelValue: string | number | undefined }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | undefined): void
}>()
</script>
<template>
  <UTextarea
    :name="props.field.name"
    :placeholder="props.field.placeholder"
    :model-value="props.modelValue"
    @update:model-value="val => emit('update:modelValue', val)"
  />
</template>
