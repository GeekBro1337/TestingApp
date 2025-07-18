<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ field: Test.FormField & { correct?: string[] }; modelValue: string[] }>()
const emit = defineEmits<(e: 'update:modelValue', value: string[]) => void>()

const isMultiple = computed(() => (props.field.correct?.length ?? 0) > 1)
const items = computed(() =>
  props.field.options?.map(o => ({ label: o.label, value: o.value })) || []
)

function updateSingle(val: string) {
  emit('update:modelValue', [val])
}
</script>
<template>
  <UCheckboxGroup
    v-if="isMultiple"
    color="primary"
    variant="card"
    size="xl"
    :model-value="props.modelValue"
    :items="items"
    @update:model-value="val => emit('update:modelValue', val as string[])"
  />
  <URadioGroup
    v-else
    color="primary"
    variant="outline"
    size="xl"
    :model-value="props.modelValue[0] || ''"
    :items="items"
    @update:model-value="updateSingle"
  />
</template>
