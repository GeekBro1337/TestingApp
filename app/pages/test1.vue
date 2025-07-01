<script setup lang="ts">
import { UButton, UTextarea, UInput, 
  UCheckboxGroup, URadioGroup } from '#components'
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
// Type definitions
interface FormField {
  id: number
  name: string
  label: string
  type: 'quiz' | 'flag' | 'data' | 'input' | 'text'
  question: string
  placeholder?: string
  required: boolean
  validation?: {
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    min?: number
    max?: number
    step?: number
  }
  options?: Array<{ label: string; value: string }>
}

interface FormConfig {
  title: string
  description: string
  fields: FormField[]
}

interface FormState {
  [key: string]: string | number | boolean | string[] | undefined
}

// Static JSON that describes form fields
const formConfig: FormConfig = {
  title: 'User Registration Form',
  description: 'Please fill out all required fields to create your account.',
  fields: [
    {
      id: 1,
      name: 'interests',
      label: 'Interests',
      type: 'flag',
      question: 'Interests',
      required: false,
      options: [
        { label: 'Technology', value: 'tech' },
        { label: 'Sports', value: 'sports' },
        { label: 'Music', value: 'music' },
        { label: 'Travel', value: 'travel' },
        { label: 'Cooking', value: 'cooking' },
        { label: 'Reading', value: 'reading' }
      ]
    },
    {
      id: 2,
      name: 'newsletter',
      label: 'Subscribe to Newsletter',
      type: 'quiz',
      question: 'Subscribe to Newsletter',
      required: false,
      options: [
        {label: 'some q', value: 'dfs43' },
        {label: 'some q2', value: 'dfs62' },
        {label: 'some q3', value: 'dfs16' },
      ]
    },
    // Quiz Test Section
    {
      id: 3,
      name: 'quizQuestion1',
      label: 'What is your preferred programming language?',
      type: 'quiz',
      question: 'What is your preferred programming language?',
      required: true,
      options: [
        { label: 'JavaScript/TypeScript', value: 'js' },
        { label: 'Python', value: 'python' },
        { label: 'Java', value: 'java' },
        { label: 'C++', value: 'cpp' },
        { label: 'Go', value: 'go' },
        { label: 'Rust', value: 'rust' }
      ]
    },
    {
      id: 4,
      name: 'quizQuestion2',
      label: 'Which development methodologies do you use?',
      type: 'quiz',
      question: 'Which development methodologies do you use?',
      required: false,
      options: [
        { label: 'Agile/Scrum', value: 'agile' },
        { label: 'Waterfall', value: 'waterfall' },
        { label: 'Kanban', value: 'kanban' },
        { label: 'DevOps', value: 'devops' },
        { label: 'Test-Driven Development', value: 'tdd' },
        { label: 'Behavior-Driven Development', value: 'bdd' }
      ]
    },
    {
      id: 5,
      name: 'feedback',
      label: 'feedback',
      type: 'text',
      question: 'Enter you feedback ',
      required: false,
    },
    // ... rest of the quiz questions with question field added
  ]
}

// Create reactive state from form config
const initialState: FormState = {}
formConfig.fields.forEach(field => {
  if (field.type === 'quiz') {
    initialState[field.name] = []
  } else {
    initialState[field.name] = undefined
  }
})

const state = reactive<FormState>(initialState)

// Validation function
const validate = (formState: FormState): FormError[] => {
  const errors: FormError[] = []
  
  formConfig.fields.forEach(field => {
    const value = formState[field.name]
    
    // Required field validation
    if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
      errors.push({ 
        name: field.name, 
        message: `${field.label} is required` 
      })
      return
    }
    
    // Skip validation if field is empty and not required
    if (!value && !field.required) return
    
    // Type-specific validation
    if (field.validation) {
      // String length validation
      if (typeof value === 'string') {
        if (field.validation.minLength && value.length < field.validation.minLength) {
          errors.push({ 
            name: field.name, 
            message: `${field.label} must be at least ${field.validation.minLength} characters` 
          })
        }
        if (field.validation.maxLength && value.length > field.validation.maxLength) {
          errors.push({ 
            name: field.name, 
            message: `${field.label} must be no more than ${field.validation.maxLength} characters` 
          })
        }
        if (field.validation.pattern && !field.validation.pattern.test(value)) {
          if (field.name === 'email') {
            errors.push({ 
              name: field.name, 
              message: 'Please enter a valid email address' 
            })
          } else if (field.name === 'password') {
            errors.push({ 
              name: field.name, 
              message: 'Password must contain at least one lowercase letter, one uppercase letter, and one number' 
            })
          }
        }
      }
      
      // Number validation
      if (typeof value === 'number') {
        if (field.validation.min !== undefined && value < field.validation.min) {
          errors.push({ 
            name: field.name, 
            message: `${field.label} must be at least ${field.validation.min}` 
          })
        }
        if (field.validation.max !== undefined && value > field.validation.max) {
          errors.push({ 
            name: field.name, 
            message: `${field.label} must be no more than ${field.validation.max}` 
          })
        }
      }
    }
  })
  
  // Custom validation for password confirmation
  if (formState.password && formState.confirmPassword && formState.password !== formState.confirmPassword) {
    errors.push({ 
      name: 'confirmPassword', 
      message: 'Passwords do not match' 
    })
  }
  
  return errors
}

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<FormState>) {
  toast.add({ 
    title: 'Success!', 
    description: 'The form has been submitted successfully.', 
    color: 'success' 
  })
  console.log('Form submitted with data:', event.data)
}

// Helper function to render form fields
const renderField = (field: FormField) => {
  const commonProps = {
    name: field.name,
    placeholder: field.placeholder
  }
  
  switch (field.type) {
    case 'text':
      return h(UInput, {
        ...commonProps,
        type: 'text',
        modelValue: state[field.name] as string,
        'onUpdate:modelValue': (value: string) => state[field.name] = value
      })

    case 'input':
      return h(UInput, {
        ...commonProps,
        type: 'number',
        modelValue: state[field.name] as number,
        'onUpdate:modelValue': (value: number) => state[field.name] = value
      })

    case 'data':
      return h(UInput, {
        ...commonProps,
        type: 'date',
        modelValue: state[field.name] as string,
        'onUpdate:modelValue': (value: string) => state[field.name] = value
      })
    
    case 'flag':
      return h(URadioGroup, {
        label: field.label,
        size:"xl",
        variant: 'card',
        modelValue: state[field.name] as string[],
        'onUpdate:modelValue': (value: string[]) => state[field.name] = value,
        items: field.options?.map(option => ({
          label: option.label,
          value: option.value
        })) || []
      })
    
    case 'quiz':
      // Use UCheckboxGroup with card variant
      return h(UCheckboxGroup, {
        color: 'primary',
        variant: 'card',
        size:"xl",
        modelValue: state[field.name] as string[],
        'onUpdate:modelValue': (value: string[]) => state[field.name] = value,
        items: field.options?.map(option => ({
          label: option.label,
          value: option.value
        })) || []
      })
    default:
      return h('div', `Unknown field type: ${field.type}`)
  }
}
</script>

<template>
  <div class="mx-2 p-2">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {{ formConfig.title }}
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        {{ formConfig.description }}
      </p>
    </div>

    <UForm 
      :validate="validate" 
      :state="state" 
      class="space-y-6" 
      @submit="onSubmit"
    >
      <UCard v-for="field in formConfig.fields" 
      :key="field.id"
      class="mb-4"
      >
      <template #header>
        <div class="text-center font-bold text-lg">
          {{field.question}}
        </div>
      </template>
      <UFormField
        :name="field.name"
        :required="field.required"
      >
        <component :is="renderField(field)" />
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
          @click="() => Object.keys(state).forEach(key => state[key] = undefined)"
        >
          Reset Form
        </UButton>
      </div>
    </UForm>

    <!-- Debug section -->
    <div class="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h3 class="text-lg font-semibold mb-2">Form State (Debug)</h3>
      <pre class="text-sm overflow-auto">{{ JSON.stringify(state, null, 2) }}</pre>
    </div>
  </div>
</template>