<script setup lang="ts">

// Type definitions
interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'checkboxMultiple'
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
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter your first name',
      required: true,
      validation: {
        minLength: 2,
        maxLength: 50
      }
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Enter your last name',
      required: true,
      validation: {
        minLength: 2,
        maxLength: 50
      }
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter your email address',
      required: true,
      validation: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      }
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      required: true,
      validation: {
        minLength: 8,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/
      }
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm your password',
      required: true
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      placeholder: 'Enter your age',
      required: false,
      validation: {
        min: 13,
        max: 120
      }
    },
    {
      name: 'bio',
      label: 'Bio',
      type: 'textarea',
      placeholder: 'Tell us about yourself...',
      required: false,
      validation: {
        maxLength: 500
      }
    },
    {
      name: 'interests',
      label: 'Interests',
      type: 'checkboxMultiple',
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
      name: 'newsletter',
      label: 'Subscribe to Newsletter',
      type: 'checkboxMultiple',
      required: false
    },
    // Quiz Test Section
    {
      name: 'quizQuestion1',
      label: 'What is your preferred programming language?',
      type: 'checkboxMultiple',
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
      name: 'quizQuestion2',
      label: 'Which development methodologies do you use?',
      type: 'checkboxMultiple',
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
      name: 'quizQuestion3',
      label: 'What type of projects do you work on?',
      type: 'checkboxMultiple',
      required: true,
      options: [
        { label: 'Web Applications', value: 'web' },
        { label: 'Mobile Apps', value: 'mobile' },
        { label: 'Desktop Applications', value: 'desktop' },
        { label: 'API Development', value: 'api' },
        { label: 'Data Science/AI', value: 'ai' },
        { label: 'Game Development', value: 'games' },
        { label: 'System Administration', value: 'sysadmin' },
        { label: 'DevOps/Infrastructure', value: 'infrastructure' }
      ]
    },
    {
      name: 'quizQuestion4',
      label: 'Which cloud platforms do you use?',
      type: 'checkboxMultiple',
      required: false,
      options: [
        { label: 'AWS', value: 'aws' },
        { label: 'Google Cloud Platform', value: 'gcp' },
        { label: 'Microsoft Azure', value: 'azure' },
        { label: 'DigitalOcean', value: 'digitalocean' },
        { label: 'Heroku', value: 'heroku' },
        { label: 'Vercel', value: 'vercel' },
        { label: 'Netlify', value: 'netlify' },
        { label: 'None/On-premise', value: 'none' }
      ]
    },
    {
      name: 'quizQuestion5',
      label: 'What databases do you work with?',
      type: 'checkboxMultiple',
      required: false,
      options: [
        { label: 'PostgreSQL', value: 'postgresql' },
        { label: 'MySQL', value: 'mysql' },
        { label: 'MongoDB', value: 'mongodb' },
        { label: 'Redis', value: 'redis' },
        { label: 'SQLite', value: 'sqlite' },
        { label: 'Oracle', value: 'oracle' },
        { label: 'SQL Server', value: 'sqlserver' },
        { label: 'Elasticsearch', value: 'elasticsearch' }
      ]
    },
    {
      name: 'quizQuestion6',
      label: 'Which frameworks do you use?',
      type: 'checkboxMultiple',
      required: false,
      options: [
        { label: 'React', value: 'react' },
        { label: 'Vue.js', value: 'vue' },
        { label: 'Angular', value: 'angular' },
        { label: 'Node.js/Express', value: 'express' },
        { label: 'Django', value: 'django' },
        { label: 'Flask', value: 'flask' },
        { label: 'Spring Boot', value: 'spring' },
        { label: 'Laravel', value: 'laravel' },
        { label: 'Ruby on Rails', value: 'rails' },
        { label: 'ASP.NET', value: 'aspnet' }
      ]
    },
    {
      name: 'quizQuestion7',
      label: 'What tools do you use for version control?',
      type: 'checkboxMultiple',
      required: true,
      options: [
        { label: 'Git', value: 'git' },
        { label: 'GitHub', value: 'github' },
        { label: 'GitLab', value: 'gitlab' },
        { label: 'Bitbucket', value: 'bitbucket' },
        { label: 'SVN', value: 'svn' },
        { label: 'Mercurial', value: 'mercurial' }
      ]
    },
    {
      name: 'quizQuestion8',
      label: 'Which testing frameworks do you use?',
      type: 'checkboxMultiple',
      required: false,
      options: [
        { label: 'Jest', value: 'jest' },
        { label: 'Mocha', value: 'mocha' },
        { label: 'Cypress', value: 'cypress' },
        { label: 'Selenium', value: 'selenium' },
        { label: 'PyTest', value: 'pytest' },
        { label: 'JUnit', value: 'junit' },
        { label: 'PHPUnit', value: 'phpunit' },
        { label: 'RSpec', value: 'rspec' }
      ]
    },
    {
      name: 'quizQuestion9',
      label: 'What is your experience level?',
      type: 'checkboxMultiple',
      required: true,
      options: [
        { label: 'Beginner (0-2 years)', value: 'beginner' },
        { label: 'Intermediate (3-5 years)', value: 'intermediate' },
        { label: 'Advanced (6-10 years)', value: 'advanced' },
        { label: 'Expert (10+ years)', value: 'expert' }
      ]
    },
    {
      name: 'quizQuestion10',
      label: 'What are your career goals?',
      type: 'checkboxMultiple',
      required: false,
      options: [
        { label: 'Full-Stack Developer', value: 'fullstack' },
        { label: 'Frontend Developer', value: 'frontend' },
        { label: 'Backend Developer', value: 'backend' },
        { label: 'DevOps Engineer', value: 'devops' },
        { label: 'Data Scientist', value: 'datascientist' },
        { label: 'Machine Learning Engineer', value: 'mlengineer' },
        { label: 'Software Architect', value: 'architect' },
        { label: 'Technical Lead', value: 'techlead' },
        { label: 'Project Manager', value: 'pm' },
        { label: 'Entrepreneur/Startup', value: 'entrepreneur' }
      ]
    }
  ]
}

// Create reactive state from form config
const initialState: FormState = {}
formConfig.fields.forEach(field => {
  if (field.type === 'checkboxMultiple') {
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
    case 'email':
    case 'password':
    case 'number':
      return h(UInput, {
        ...commonProps,
        type: field.type,
        modelValue: state[field.name] as string | number,
        'onUpdate:modelValue': (value: string | number) => state[field.name] = value
      })
    
    case 'textarea':
      return h(UTextarea, {
        ...commonProps,
        rows: 4,
        modelValue: state[field.name] as string,
        'onUpdate:modelValue': (value: string) => state[field.name] = value
      })
    
    case 'select':
      return h(USelect, {
        ...commonProps,
        options: field.options,
        modelValue: state[field.name] as string,
        'onUpdate:modelValue': (value: string) => state[field.name] = value
      })
    
    case 'checkbox':
      return h(UCheckbox, {
        label: field.label,
        modelValue: state[field.name] as boolean,
        'onUpdate:modelValue': (value: boolean) => state[field.name] = value
      })
    
    case 'checkboxMultiple':
      // Use UCheckboxGroup with card variant
      return h(UCheckboxGroup, {
        color: 'primary',
        variant: 'card',
        modelValue: state[field.name] as string[],
        'onUpdate:modelValue': (value: string[]) => state[field.name] = value,
        items: field.options?.map(option => ({
          label: option.label,
          value: option.value
        })) || []
      })
    
    case 'switch':
      // Use UCheckbox as a switch alternative
      return h(UCheckbox, {
        label: field.label,
        modelValue: state[field.name] as boolean,
        'onUpdate:modelValue': (value: boolean) => state[field.name] = value
      })
    
    case 'slider':
      // Use UInput with type="range" as a slider alternative
      return h('div', { class: 'space-y-2' }, [
        h(UInput, {
          type: 'range',
          min: field.validation?.min || 0,
          max: field.validation?.max || 100,
          step: field.validation?.step || 1,
          modelValue: state[field.name] as number,
          'onUpdate:modelValue': (value: number) => state[field.name] = value
        }),
        h('div', { class: 'text-sm text-gray-500' }, `Value: ${state[field.name] || 0}`)
      ])
    
    default:
      return h('div', `Unknown field type: ${field.type}`)
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-6">
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
      <UFormField
        v-for="field in formConfig.fields"
        :key="field.name"
        :label="field.label"
        :name="field.name"
        :required="field.required"
      >
        <component :is="renderField(field)" />
      </UFormField>

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