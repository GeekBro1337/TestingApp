import type { Meta, StoryObj } from '@storybook/vue3'
import Component from './edit.vue'

const meta = {
  title: 'Components/fields/input/edit',
  component: Component,
} satisfies Meta<typeof Component>

export default meta
export const Default: StoryObj<typeof Component> = {}
