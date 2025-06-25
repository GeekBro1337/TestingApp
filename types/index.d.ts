export {}

declare global {
  namespace Test {
    interface FormField {
      id: number
      name: string
      label: string
      type: 'text' | 'number' | 'textarea' | 'checkboxGroup' | 'radioButton'
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
  }
}
