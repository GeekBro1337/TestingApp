import type { Meta, StoryObj } from '@storybook/vue3'
import Component from './index.vue'

const meta = {
  title: 'Components/fields/text/index',
  component: Component,
} satisfies Meta<typeof Component>

export default meta
export const Default: StoryObj<typeof Component> = {}
