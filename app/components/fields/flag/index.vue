<script setup lang="ts">
const props = defineProps<{ field: Test.FormField; modelValue: boolean }>()
const emit = defineEmits<(e: 'update:modelValue', value: boolean) => void>()
</script>
<template>
  <UCheckbox
    :label="props.field.label"
    :model-value="props.modelValue"
    @update:model-value="val => emit('update:modelValue', val as boolean)"
  />
</template>
