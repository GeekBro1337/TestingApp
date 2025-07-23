import type { Meta, StoryObj } from '@storybook/vue3'
import Component from './clock.vue'

const meta = {
  title: 'Components/clock',
  component: Component,
} satisfies Meta<typeof Component>

export default meta
export const Default: StoryObj<typeof Component> = {}
