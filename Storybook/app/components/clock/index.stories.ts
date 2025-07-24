// @ts-expect-error import storybook
import type { Meta, StoryObj } from '@storybook/vue3'
import Clock  from './index.vue'
import Wrapper from '../Brandbook/Wrapper/index.vue'

const meta: Meta<typeof Clock> = {
  title: 'components/Clock',
  component: Clock,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Демонстрация часов'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args: unknown, ) => ({
    components: { Clock, Wrapper},
    setup() {
      return { args };
    },
    template: '<Wrapper> <Clock v-bind="args"/> </Wrapper>',
  }),
  args: {
  }
}

