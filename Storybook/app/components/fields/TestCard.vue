<script setup lang="ts">

const id = route.params.id as string
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
      <div v-if="edit.isEditMode" class="mt-4 text-right">
        <NuxtLink :to="`/test/${id}/edit`">
          <UButton size="sm" color="primary" icon="i-lucide-pen">Edit</UButton>
        </NuxtLink>
      </div>
    </div>

    <UForm :validate="validate" :state="state" class="space-y-6" @submit="onSubmit">
      <UCard v-for="field in formConfig.fields" :key="field.id" class="mb-10 bg-neutral-100">
        <template #header>
          <div class="font-bold text-lg">
            {{ field.question }}
          </div>
        </template>
        <UFormField :name="field.name" :required="field.required">
          <component :is="renderField(field, state)" />
        </UFormField>
      </UCard>
</template>
