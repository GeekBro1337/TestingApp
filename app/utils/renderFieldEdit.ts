import { h } from 'vue'
import {
  FieldsTextEdit,
  FieldsInputEdit,
  FieldsDataEdit,
  FieldsFlagEdit,
  FieldsQuizEdit,
} from '#components'

export function renderFieldEdit(field: any) {
  switch (field.type) {
    case 'text':
      return h(FieldsTextEdit, { field })
    case 'input':
      return h(FieldsInputEdit, { field })
    case 'data':
      return h(FieldsDataEdit, { field })
    case 'flag':
      return h(FieldsFlagEdit, { field })
    case 'quiz':
      return h(FieldsQuizEdit, { field })
    default:
      return h('div', `Unknown type: ${field.type}`)
  }
}
