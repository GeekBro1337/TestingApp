<script setup lang="ts">
import { reactive, watch } from 'vue'

interface Option {
  label: string
  value: string
}

export type FieldType = 'quiz' | 'flag' | 'data' | 'input' | 'text'

export interface FieldForm {
  id: number
  name: string
  label: string
  question: string
  type: FieldType
  required: boolean
  points: number
  placeholder?: string
  correctCsv: string
  options: Option[]
}

const props = defineProps<{ modelValue: FieldForm }>()
const emit = defineEmits<(e: 'update:modelValue', value: FieldForm) => void>()

const local = reactive({ ...props.modelValue })

watch(
  () => props.modelValue,
  (val) => Object.assign(local, val),
  { deep: true }
)

watch(
  local,
  () => emit('update:modelValue', { ...local }),
  { deep: true }
)

const fieldTypes = [
  { label: 'Quiz', value: 'quiz' },
  { label: 'Flag', value: 'flag' },
  { label: 'Data', value: 'data' },
  { label: 'Input', value: 'input' },
  { label: 'Text', value: 'text' }
]
</script>

<template>
  <div class="space-y-2">
    <UInput v-model.number="local.id" type="number" label="Id" disabled />
    <UInput v-model="local.name" label="Name" />
    <UInput v-model="local.label" label="Label" />
    <UInput v-model="local.question" label="Question" />
    <USelect
      v-model="local.type"
      :options="fieldTypes"
      option-attribute="label"
      value-attribute="value"
      label="Type"
    />
    <UCheckbox v-model="local.required" label="Required" />
    <UInput v-model.number="local.points" type="number" label="Points" />
    <UInput v-model="local.placeholder" label="Placeholder" />
    <UInput v-model="local.correctCsv" label="Correct (comma separated)" />

    <div v-if="local.type === 'quiz' || local.type === 'flag'" class="space-y-2">
      <div
        v-for="(opt, idx) in local.options"
        :key="idx"
        class="flex gap-2 items-center"
      >
        <UInput v-model="opt.label" label="Option Label" class="flex-1" />
        <UInput v-model="opt.value" label="Option Value" class="flex-1" />
        <UButton
          size="xs"
          color="red"
          icon="i-lucide-x"
          @click="local.options.splice(idx, 1)"
        />
      </div>
      <UButton size="xs" color="primary" @click="local.options.push({ label: '', value: '' })">
        Add option
      </UButton>
    </div>
  </div>
</template>
