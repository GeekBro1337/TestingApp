<!-- DONE: заголовок берётся из метаданных теста -->
<template>
  <div class="p-4 max-w-2xl mx-auto space-y-6" v-if="config && formState">
    <h1 class="text-2xl font-bold">{{ title }}</h1>
    <UForm :state="formState" @submit="onSubmit" class="space-y-4">
      <UFormField
        v-for="field in config.fields"
        :key="field.name"
        :label="field.label"
        :name="field.name"
        :required="field.required"
      >
        <component :is="renderField(field)" />
      </UFormField>
      <UButton type="submit" color="primary">Submit</UButton>
    </UForm>
    <pre class="mt-4 bg-gray-100 p-2 text-sm">{{ formState }}</pre>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const id = route.params.id as string;

const config = ref<Test.FormConfig | null>(null);
const formState = ref<Test.FormState | null>(null);
const title = computed(() => config.value?.metadata?.title ?? config.value?.title ?? `Тест ID: ${id}`);

async function load() {
  try {
    config.value = await $fetch<Test.FormConfig>(`/api/tests/${id}`);
    const initial: Test.FormState = {};
    for (const field of config.value.fields) {
      if (field.type === 'checkboxMultiple') initial[field.name] = [];
      else if (field.type === 'checkbox' || field.type === 'switch') initial[field.name] = false;
      else initial[field.name] = undefined;
    }
    formState.value = reactive(initial);
  } catch (error) {
    console.error(error);
  }
}

onMounted(load);

function onSubmit() {
  console.log('submit', formState.value);
}

const renderField = (field: Test.FormField) => {
  const commonProps = { name: field.name, placeholder: field.placeholder };

  switch (field.type) {
    case 'text':
    case 'email':
    case 'password':
    case 'number':
      return h(UInput, {
        ...commonProps,
        type: field.type,
        modelValue: formState.value![field.name] as string | number,
        'onUpdate:modelValue': (v: string | number) => (formState.value![field.name] = v),
      });

    case 'textarea':
      return h(UTextarea, {
        ...commonProps,
        rows: 4,
        modelValue: formState.value![field.name] as string,
        'onUpdate:modelValue': (v: string) => (formState.value![field.name] = v),
      });

    case 'select':
      return h(USelect, {
        ...commonProps,
        options: field.options,
        modelValue: formState.value![field.name] as string,
        'onUpdate:modelValue': (v: string) => (formState.value![field.name] = v),
      });

    case 'checkbox':
      return h(UCheckbox, {
        label: field.label,
        modelValue: formState.value![field.name] as boolean,
        'onUpdate:modelValue': (v: boolean) => (formState.value![field.name] = v),
      });

    case 'checkboxMultiple':
      return h(UCheckboxGroup, {
        color: 'primary',
        variant: 'card',
        modelValue: formState.value![field.name] as string[],
        'onUpdate:modelValue': (v: string[]) => (formState.value![field.name] = v),
        items: field.options?.map((o) => ({ label: o.label, value: o.value })) || [],
      });

    case 'radio':
      return h(URadioGroup, {
        modelValue: formState.value![field.name] as string,
        'onUpdate:modelValue': (v: string) => (formState.value![field.name] = v),
        options: field.options,
      });

    case 'switch':
      return h(UCheckbox, {
        label: field.label,
        modelValue: formState.value![field.name] as boolean,
        'onUpdate:modelValue': (v: boolean) => (formState.value![field.name] = v),
      });

    case 'slider':
      return h('div', { class: 'space-y-2' }, [
        h(UInput, {
          type: 'range',
          min: field.validation?.min || 0,
          max: field.validation?.max || 100,
          step: field.validation?.step || 1,
          modelValue: formState.value![field.name] as number,
          'onUpdate:modelValue': (v: number) => (formState.value![field.name] = v),
        }),
        h('div', { class: 'text-sm text-gray-500' }, `Value: ${formState.value![field.name] || 0}`),
      ]);

    default:
      return h('div', `Unknown field type: ${field.type}`);
  }
};
</script>
