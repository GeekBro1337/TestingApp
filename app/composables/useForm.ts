import { useToast } from '#imports'
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

export interface EvaluationResult {
  total: number
  max: number
}

export function useForm(formConfig: Test.FormConfig, testId: string) {
  const initialState: Test.FormState = {}

  // TODO: Add types
  formConfig.fields.forEach((field) => {
    if (field.type === 'quiz') {
      initialState[field.name] = []
    } else {
      initialState[field.name] = undefined
    }
  })

  const state = reactive<Test.FormState>(initialState)
  const result = ref<EvaluationResult | null>(null)

  const validate = (formState: Test.FormState): FormError[] => {
    const errors: FormError[] = []

    formConfig.fields.forEach((field) => {
      const value = formState[field.name]

      if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
        errors.push({ name: field.name, message: `${field.label} is required` })
        return
      }

      if (!value && !field.required) return

      // TODO: move to utils
      if (field.validation) {
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
              errors.push({ name: field.name, message: 'Please enter a valid email address' })
            } else if (field.name === 'password') {
              errors.push({
                name: field.name,
                message:
                  'Password must contain at least one lowercase letter, one uppercase letter, and one number'
              })
            }
          }
        }
        if (typeof value === 'number') {
          if (field.validation.min !== undefined && value < field.validation.min) {
            errors.push({ name: field.name, message: `${field.label} must be at least ${field.validation.min}` })
          }
          if (field.validation.max !== undefined && value > field.validation.max) {
            errors.push({ name: field.name, message: `${field.label} must be no more than ${field.validation.max}` })
          }
        }
      }
    })

    if (
      formState.password &&
      formState.confirmPassword &&
      formState.password !== formState.confirmPassword
    ) {
      errors.push({ name: 'confirmPassword', message: 'Passwords do not match' })
    }

    return errors
  }

  const toast = useToast()

  const onSubmit = async (event: FormSubmitEvent<Test.FormState>) => {
    result.value = await $fetch<EvaluationResult>(
      `/api/tests/${testId}/evaluate`,
      {
        method: 'POST',
        body: event.data
      }
    )

    toast.add({
      title: 'Results',
      description: `You scored ${result.value.total} out of ${result.value.max}`,
      color: 'primary'
    })
  }

  return {
    state,
    validate,
    onSubmit,
    result
  }
}
