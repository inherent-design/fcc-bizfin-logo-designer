import type { Meta, StoryObj } from '@storybook/react-vite'

import { css } from 'styled-system/css'
import { buttonRecipe } from './Button.styles'

import { Button } from './Button'

const buttonVariants = Object.keys(buttonRecipe.variantMap!.variant!)
const buttonSizes = Object.keys(buttonRecipe.variantMap!.size!)

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: buttonVariants,
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: buttonSizes,
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
}

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className={css({ display: 'flex', flexDirection: 'column', gap: '4' })}>
      {buttonVariants.map((variant) => (
        <Button key={variant} variant={variant as any}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      ))}
    </div>
  ),
}

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className={css({ display: 'flex', gap: '4', alignItems: 'center' })}>
      {buttonSizes.map((size) => (
        <Button key={size} size={size as any}>
          {size.charAt(0).toUpperCase() + size.slice(1)}
        </Button>
      ))}
    </div>
  ),
}

// Variant matrix (all combinations)
export const VariantMatrix: Story = {
  render: () => (
    <div className={css({ display: 'flex', flexDirection: 'column', gap: '4' })}>
      {buttonVariants.map((variant) => (
        <div key={variant} className={css({ display: 'flex', gap: '4', alignItems: 'center' })}>
          {buttonSizes.map((size) => (
            <Button key={size} variant={variant as any} size={size as any}>
              {variant} {size}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
}

// States showcase
export const States: Story = {
  render: () => (
    <div className={css({ display: 'flex', flexDirection: 'column', gap: '4' })}>
      <div className={css({ display: 'flex', gap: '4' })}>
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  ),
}

// Individual variant stories for testing
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
}

export const Danger: Story = {
  args: {
    children: 'Danger Button',
    variant: 'danger',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
}
