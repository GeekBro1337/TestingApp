import { h } from 'vue'
import { UInput, UTextarea, UCheckboxGroup, URadioGroup } from '#components'

export function renderField(field: Test.FormField, state: Test.FormState) {
  const commonProps = {
    name: field.name,
    placeholder: field.placeholder
  }

  switch (field.type) {
    case 'text':
    case 'number':
      return h(UInput, {
        ...commonProps,
        type: field.type,
        modelValue: state[field.name] as string | number,
        'onUpdate:modelValue': (value: string | number) => (state[field.name] = value)
      })
    case 'textarea':
      return h(UTextarea, {
        ...commonProps,
        rows: 4,
        modelValue: state[field.name] as string,
        'onUpdate:modelValue': (value: string) => (state[field.name] = value),
        size: 'lg'
      })
    case 'radioButton':
      return h(URadioGroup, {
        label: field.label,
        size: 'xl',
        variant: 'card',
        modelValue: state[field.name] as string[],
        'onUpdate:modelValue': (value: string[]) => (state[field.name] = value),
        items: field.options?.map((option) => ({ label: option.label, value: option.value })) || []
      })
    case 'checkboxGroup':
      return h(UCheckboxGroup, {
        color: 'primary',
        variant: 'card',
        size: 'xl',
        modelValue: state[field.name] as string[],
        'onUpdate:modelValue': (value: string[]) => (state[field.name] = value),
        items: field.options?.map((option) => ({ label: option.label, value: option.value })) || []
      })
    default:
      return h('div', `Unknown field type: ${field.type}`)
  }
}
