import type { Meta, StoryObj } from '@storybook/vue3'
import Component from './ModeToggle.vue'

const meta = {
  title: 'Components/ModeToggle',
  component: Component,
} satisfies Meta<typeof Component>

export default meta
export const Default: StoryObj<typeof Component> = {}
