import type { Meta, StoryObj } from '@storybook/vue3'
import Component from './loading_animation.vue'

const meta = {
  title: 'Components/loading_animation',
  component: Component,
} satisfies Meta<typeof Component>

export default meta
export const Default: StoryObj<typeof Component> = {}
