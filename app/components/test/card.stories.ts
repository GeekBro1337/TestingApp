import type { Meta, StoryObj } from '@storybook/vue3'
import Component from './card.vue'

const meta = {
  title: 'Components/test/card',
  component: Component,
} satisfies Meta<typeof Component>

export default meta
export const Default: StoryObj<typeof Component> = {}
