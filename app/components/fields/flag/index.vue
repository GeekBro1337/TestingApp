<script setup lang="ts">
const props = defineProps<{ field: Test.FormField; modelValue: string | undefined }>()
const emit = defineEmits<(e: 'update:modelValue', value: string | undefined) => void>()
</script>
<template>
  <URadioGroup
    :label="props.field.label"
    :model-value="props.modelValue"
    :items="props.field.options?.map(o => ({ label: o.label, value: o.value })) || []"
    size="xl"
    variant="card"
    @update:model-value="val => emit('update:modelValue', val as string | undefined)"
  />
</template>
