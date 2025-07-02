import { h } from 'vue'
import {
  FieldsText,
  FieldsInput,
  FieldsData,
  FieldsFlag,
  FieldsQuiz,
} from '#components'

export function renderField(field: Test.FormField, state: Test.FormState) {
  switch (field.type) {
    case 'text':
      return h(FieldsText, {
        field,
        modelValue: state[field.name] as string,
        'onUpdate:modelValue': (value: string) => (state[field.name] = value),
      })
    case 'input':
      return h(FieldsInput, {
        field,
        modelValue: state[field.name] as number,
        'onUpdate:modelValue': (value: number) => (state[field.name] = value),
      })
    case 'data':
      return h(FieldsData, {
        field,
        modelValue: state[field.name] as string,
        'onUpdate:modelValue': (value: string) => (state[field.name] = value),
      })
    case 'flag':
      return h(FieldsFlag, {
        field,
        modelValue: state[field.name] as string,
        'onUpdate:modelValue': (value: string) => (state[field.name] = value),
      })
    case 'quiz':
      return h(FieldsQuiz, {
        field,
        modelValue: state[field.name] as string[],
        'onUpdate:modelValue': (value: string[]) => (state[field.name] = value),
      })
    default:
      return h('div', `Unknown field type: ${field.type}`)
  }
}
