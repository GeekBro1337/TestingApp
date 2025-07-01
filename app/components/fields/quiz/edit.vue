<script setup lang="ts">
const props = defineProps<{ field: any }>()
function addOption() {
  props.field.options.push({ label: '', value: '' })
}
function removeOption(idx: number) {
  props.field.options.splice(idx, 1)
}
</script>
<template>
  <div class="space-y-2">
    <UInput v-model.number="props.field.id" type="number" label="Id" disabled />
    <UInput v-model="props.field.name" label="Name" />
    <UInput v-model="props.field.label" label="Label" />
    <UInput v-model="props.field.question" label="Question" />
    <UCheckbox v-model="props.field.required" label="Required" />
    <UInput v-model.number="props.field.points" type="number" label="Points" />
    <UInput v-model="props.field.placeholder" label="Placeholder" />
    <UInput v-model="props.field.correctCsv" label="Correct (comma separated)" />
    <div class="space-y-2">
      <div v-for="(opt, idx) in props.field.options" :key="idx" class="flex gap-2 items-center">
        <UInput v-model="opt.label" label="Option Label" class="flex-1" />
        <UInput v-model="opt.value" label="Option Value" class="flex-1" />
        <UButton size="xs" color="red" icon="i-lucide-x" @click="removeOption(idx)" />
      </div>
      <UButton size="xs" color="primary" @click="addOption">Add option</UButton>
    </div>
  </div>
</template>
