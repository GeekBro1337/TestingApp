import type { Meta, StoryObj } from '@storybook/vue3'
import Component from './testDebug.vue'

const meta = {
  title: 'Components/testDebug',
  component: Component,
} satisfies Meta<typeof Component>

export default meta
export const Default: StoryObj<typeof Component> = {}
