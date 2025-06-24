
export {}

declare global {
        namespace Test {
            interface Metadata{
                title: string,
                answers: answer[]
            }

            interface answer {
                key: uuid,
                answer: string
            }

        interface FormField { 
            name: string
            label: string
            type: 'text'| 'number' | 'textarea' | 'checkboxMultiple'
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
            options?: Array<{label: string; value: string}>
        }
        interface FormConfig { 
            title: string
            description: string
            fields: FormField[]
            metadata?: Metadata
        }
        interface FormState {
            [key: string]: string | number | boolean | string[] | undefined
        }
        }
}