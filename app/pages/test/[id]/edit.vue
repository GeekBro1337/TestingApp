<script lang="ts" setup>
import type { ContextMenuItem } from '@nuxt/ui'
import { reactive, computed, ref } from "vue";
import { useToast } from "#imports";
import { useRoute } from "vue-router";
const route = useRoute();
const id = route.params.id as string;
const { data: loaded } = await useFetch<Test.FormConfig>(`/api/tests/${id}`);

/* ---------- Типы ---------- */
interface Option {
  label: string;
  value: string;
}

const items = ref([
  [
    {
      label: 'Submit',
      icon: 'i-heroicons-sun-20-solid',
      onSelect: () => {
        submit();
      }
    }
  ]
]);


const fieldTypes = ref ([
  { label: "Quiz", value: "quiz" },
  { label: "Flag", value: "flag" },
  { label: "Data", value: "data" },
  { label: "Input", value: "input" },
  { label: "Text", value: "text" },
])


// todo declazre with map
// type FieldType = (typeof fieldTypes)[number]["value"]; // 'quiz' | 'flag' | ...

interface FieldForm {
  id: number;
  name: string;
  label: string;
  question: string;
  // type: FieldType;
  required: boolean;
  points: number;
  placeholder?: string;
  correctCsv: string;
  options: Option[];
}

/* ---------- Состояние ---------- */
const newFieldType = ref<string>("text");

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

if (loaded.value) {
  test.fileName = loaded.value.fileName;
  test.title = loaded.value.title;
  test.description = loaded.value.description;
  test.fields = loaded.value.fields.map((f) => ({
    id: f.id,
    name: f.name,
    label: f.label,
    question: f.question,
    type: f.type as FieldType,
    required: f.required,
    points: f.points,
    placeholder: f.placeholder,
    correctCsv: (f.correct ?? []).join(', '),
    options: f.options ? [...f.options] : [],
  }));
}

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

function addOption(field: FieldForm) {
  field.options.push({ label: "", value: "" });
}

function removeOption(field: FieldForm, idx: number) {
  field.options.splice(idx, 1);
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
    await $fetch(`/api/tests/${id}/update`, {
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
      color: "error",
    });
    console.error(err);
  }
}
</script>
<template>
  <UContextMenu :items="items">
  <div class="p-4 space-y-6">
    <!-- Заголовок теста -->
     <div class="flex flex-col">
      <h3 class="text-3xl text-primary text-center">Header</h3>
      <UInput v-model="test.title" label="Title" size="xl" />
      <h3 class="text-xl text-neutral text-center">Description</h3>
      <UTextarea v-model="test.description" label="Description" size="xl" />
    </div>
    <!-- Список полей -->
     
    <div
      v-for="(field, index) in test.fields"
      :key="field.id"
      class="p-4  rounded-md space-y-2 bg-neutral-100"
    >
      <div class="flex justify-between items-center">
        <span class="font-bold">Field {{ index + 1 }}</span>
        <UButton
          size="xs"
          color="error"
          variant="ghost"
          icon="i-lucide-x"
          @click="removeField(index)"
        />
      </div>
      <div class="flex flex-col">
        <USelect v-model="field.type" :items="fieldTypes" class="w-48 bg-red-500" />
        <h3 class="text-primary ">Name</h3>
        <UInput v-model="field.name" label="Name" />
        <h3 class="text-primary ">Placeholder</h3>
        <UInput v-model="field.label" label="Label" />
        <h3 class="text-primary ">Question</h3>
        <UInput v-model="field.question" label="Question" />
      </div>
      
      <label class="font-bold block">Type</label>
<div>
  <select
    v-model="field.type"
    class="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
  >
    <option
      v-for="opt in fieldTypes"
      :key="`${field.id}-${opt.value}`"
      :value="opt.value"
    >
      {{ opt.label }}
    </option>
  </select>
</div>

      <div class="flex flex-col">
        <UCheckbox v-model="field.required" label="Required" />
        <h3 class="text-primary ">Points</h3>
        <UInput v-model.number="field.points" type="number" label="Points" />
        <h3 class="text-primary ">Placeholder</h3>
        <UInput v-model="field.placeholder" label="Placeholder" />
        <h3 class="text-primary"> Correct</h3>
        <UInput v-model="field.correctCsv" label="Correct (comma separated)" />
      </div>
      <!-- Опции -->
      <div class="space-y-2">
        <div
          v-for="(opt, idx) in field.options"
          :key="idx"
          class="flex gap-2 items-center"
        >
          <UInput v-model="opt.label" label="Option Label" class="flex-1" />
          <UInput v-model="opt.value" label="Option Value" class="flex-1" />
          <UButton
            size="xs"
            color="error"
            variant="ghost"
            icon="i-lucide-x"
            @click="removeOption(field, idx)"
          />
        </div>
        <UButton icon="i-lucide-plus" size="lg" color="primary" variant="ghost" @click="addOption(field)"/>
      </div>
    </div>

    <!-- Добавление поля -->
    <div class="space-y-2">
      <label class="font-bold block">New Field Type</label>
      <div class="flex flex-wrap gap-4">
        <label
          v-for="opt in fieldTypes"
          :key="'new-' + opt.value"
          class="inline-flex items-center gap-1 cursor-pointer"
        >
          <input
            type="radio"
            :value="opt.value"
            v-model="newFieldType"
            class="h-4 w-4 accent-blue-600"
          />
          <span>{{ opt.label }}</span>
        </label>
      </div>

      <div class="flex gap-2 pt-2">
        <UButton color="primary" @click="addField">Add field</UButton>
        <UButton color="primary" @click="submit">Submit</UButton>
      </div>
    </div>

    <!-- Превью JSON -->
    <pre class="bg-neutral-200 p-2 text-xs overflow-auto"
      >{{ JSON.stringify(preview, null, 2) }}
</pre
    >
  </div>
  </UContextMenu>
</template>