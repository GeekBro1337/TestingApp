<script setup lang="ts">
const props = defineProps<{ field: any }>()
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
  </div>
</template>
