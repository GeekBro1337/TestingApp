<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const user = useUserStore();
const route = useRoute()
const id = route.params.id as string

const { data: formConfig } = await useFetch<Test.FormConfig>(`/api/tests/${id}`)

const { state, validate, onSubmit, result } = useForm(formConfig.value, id)
</script>

<template>
  <div class="mx-2 p-2" v-if="formConfig">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-primary-500 text-center py-5">
        {{ formConfig.title }}
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        {{ formConfig.description }}  
      </p>
    </div>

    <UForm :validate="validate" :state="state" class="space-y-6" @submit="onSubmit">
      <UCard v-for="field in formConfig.fields" :key="field.id" class="mb-4 bg-neutral-100">
        <template #header>
          <div class="font-bold text-lg">
            {{ field.question }}
          </div>
        </template>
        <UFormField :name="field.name" :required="field.required">
          <component :is="renderField(field, state)" />
        </UFormField>
      </UCard>

      <div class="flex gap-4 pt-4">
        <UButton type="submit" color="primary" size="lg">
          Submit Form
        </UButton>
        <UButton
          type="button"
          color="neutral"
          variant="outline"
          size="lg"
          @click="() => Object.keys(state).forEach(key => (state[key] = undefined))"
        >
          Reset Form
        </UButton>
      </div>
    </UForm>
    
  <!-- TODO -- done: Сделать отдельным компонентом, прописать props -->
    <testDebug v-if="user.role === 'admin'" :state="state" />
    

    <div v-if="result" class="mt-4 p-4 bg-green-100 dark:bg-green-800 rounded-lg">
      <h3 class="text-lg font-semibold mb-2">Results</h3>
      <p>You scored {{ result.total }} out of {{ result.max }}</p>
    </div>
  </div>
</template>
