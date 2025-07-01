<script setup lang="ts">
import FieldEditBase from '../FieldEditBase.vue'
const props = defineProps<{ modelValue: any }>()
const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <FieldEditBase :model-value="props.modelValue" @update:modelValue="val => emit('update:modelValue', val)" />
</template>
