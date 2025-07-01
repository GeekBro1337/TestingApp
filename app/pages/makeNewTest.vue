<template>
  <div class="p-4 space-y-6">
    <!-- Заголовок теста -->
    <UInput v-model="test.fileName" label="File Name" placeholder="example.json" />
    <UInput v-model="test.title" label="Title" />
    <UTextarea v-model="test.description" label="Description" />

    <div
      v-for="(field, index) in test.fields"
      :key="field.id"
      class="p-4 border rounded-md space-y-2 bg-neutral-100"
    >
      <div class="flex justify-between items-center">
        <span class="font-bold">Field {{ index + 1 }}</span>
        <UButton size="xs" color="red" icon="i-lucide-x" @click="removeField(index)" />
      </div>

      <component :is="getEditComponent(field.type)" v-model="test.fields[index]" />
    </div>

    <div class="space-y-2">
      <label class="font-bold block">New Field Type</label>
      <USelect v-model="newFieldType" :options="fieldTypes" />
      <div class="flex gap-2 pt-2">
        <UButton color="primary" @click="addField">Add field</UButton>
        <UButton color="primary" @click="submit">Submit</UButton>
      </div>
    </div>

    <pre class="bg-neutral-200 p-2 text-xs overflow-auto">{{ JSON.stringify(preview, null, 2) }}</pre>
  </div>
</template>
<script lang="ts" setup>
import { reactive, computed, ref } from "vue";
import { useToast } from "#imports";

/* ---------- Типы ---------- */
interface Option {
  label: string;
  value: string;
}

const fieldTypes = [
  { label: "Quiz", value: "quiz" },
  { label: "Flag", value: "flag" },
  { label: "Data", value: "data" },
  { label: "Input", value: "input" },
  { label: "Text", value: "text" },
] as const;

type FieldType = (typeof fieldTypes)[number]["value"]; // 'quiz' | 'flag' | ...

interface FieldForm {
  id: number;
  name: string;
  label: string;
  question: string;
  type: FieldType;
  required: boolean;
  points: number;
  placeholder?: string;
  correctCsv: string;
  options: Option[];
}

const getEditComponent = (type: FieldType) =>
  ({
    quiz: 'FieldsQuizEdit',
    flag: 'FieldsFlagEdit',
    data: 'FieldsDataEdit',
    input: 'FieldsInputEdit',
    text: 'FieldsTextEdit',
  }[type]);

/* ---------- Состояние ---------- */
const newFieldType = ref<FieldType>("text");

const test = reactive<{
  fileName: string;
  title: string;
  description: string;
  fields: FieldForm[];
}>({
  fileName: "",
  title: "",
  description: "",
  fields: [],
});

/* ---------- CRUD ---------- */
function addField() {
  const nextId = test.fields.length
    ? Math.max(...test.fields.map((f) => f.id)) + 1
    : 1;
  test.fields.push({
    id: nextId,
    name: "",
    label: "",
    question: "",
    type: newFieldType.value,
    required: false,
    points: 0,
    placeholder: "",
    correctCsv: "",
    options: [],
  });
}

function removeField(index: number) {
  test.fields.splice(index, 1);
}

/* ---------- Превью ---------- */
const preview = computed(() => ({
  fileName: test.fileName,
  title: test.title,
  description: test.description,
  fields: test.fields.map((f) => ({
    id: f.id,
    name: f.name,
    label: f.label,
    question: f.question,
    type: f.type,
    required: f.required,
    points: f.points,
    correct: f.correctCsv
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    placeholder: f.placeholder || undefined,
    options: f.options.length ? f.options : undefined,
    multiple: f.type === "quiz",
  })),
}));

/* ---------- Отправка ---------- */
const toast = useToast();

async function submit() {
  try {
    await $fetch("/api/tests", {
      method: "POST",
      body: preview.value,
    });
    toast.add({
      title: "Success",
      description: "Test saved",
      color: "primary",
    });
  } catch (err) {
    toast.add({
      title: "Error",
      description: "Failed to save test",
      color: "red",
    });
    console.error(err);
  }
}
</script>

<style>
/* при необходимости — кастомные стили */
</style>
