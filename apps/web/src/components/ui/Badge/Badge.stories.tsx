import type { Meta, StoryObj } from '@storybook/react-vite'
import { css } from 'styled-system/css'

import { Badge } from './Badge'
import { badgeRecipe } from './Badge.styles'

const badgeVariants = Object.keys(badgeRecipe.variantMap!.variant!)
const badgeSizes = Object.keys(badgeRecipe.variantMap!.size!)

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: badgeVariants,
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: badgeSizes,
      description: 'Badge size',
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'unfilled',
    size: 'md',
  },
}

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className={css({ display: 'flex', gap: '4', alignItems: 'center' })}>
      {badgeVariants.map((variant) => (
        <Badge key={variant} variant={variant as any}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Badge>
      ))}
    </div>
  ),
}

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className={css({ display: 'flex', gap: '4', alignItems: 'center' })}>
      {badgeSizes.map((size) => (
        <Badge key={size} size={size as any}>
          {size.charAt(0).toUpperCase() + size.slice(1)}
        </Badge>
      ))}
    </div>
  ),
}

// Variant matrix (all combinations)
export const VariantMatrix: Story = {
  render: () => (
    <div className={css({ display: 'flex', flexDirection: 'column', gap: '4' })}>
      {badgeVariants.map((variant) => (
        <div key={variant} className={css({ display: 'flex', gap: '4', alignItems: 'center' })}>
          {badgeSizes.map((size) => (
            <Badge key={size} variant={variant as any} size={size as any}>
              {variant} {size}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
}

// Status badges example
export const StatusBadges: Story = {
  render: () => (
    <div className={css({ display: 'flex', flexDirection: 'column', gap: '6' })}>
      <div className={css({ fontSize: 'sm', fontWeight: 'bold', mb: '2' })}>Status Indicators</div>
      <div className={css({ display: 'flex', gap: '4', flexWrap: 'wrap' })}>
        <Badge variant='filled'>NEW</Badge>
        <Badge variant='outline'>BETA</Badge>
        <Badge variant='unfilled'>DRAFT</Badge>
        <Badge variant='filled'>LIVE</Badge>
        <Badge variant='outline'>ARCHIVED</Badge>
      </div>
    </div>
  ),
}

// In content context
export const InContent: Story = {
  render: () => (
    <div className={css({ maxWidth: '500px' })}>
      <h3 className={css({ fontFamily: 'brutalist', fontWeight: 'bold', mb: '4' })}>
        Project Dashboard{' '}
        <Badge variant='filled' size='sm'>
          3
        </Badge>
      </h3>
      <div className={css({ display: 'flex', flexDirection: 'column', gap: '4' })}>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 'inset.normal',
            borderWidth: 'brutal',
            borderColor: 'border',
          })}
        >
          <span>Design System Refactor</span>
          <Badge variant='filled' size='sm'>
            IN PROGRESS
          </Badge>
        </div>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 'inset.normal',
            borderWidth: 'brutal',
            borderColor: 'border',
          })}
        >
          <span>Logo Designer v2</span>
          <Badge variant='outline' size='sm'>
            PLANNED
          </Badge>
        </div>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 'inset.normal',
            borderWidth: 'brutal',
            borderColor: 'border',
          })}
        >
          <span>Color Picker Component</span>
          <Badge variant='unfilled' size='sm'>
            COMPLETE
          </Badge>
        </div>
      </div>
    </div>
  ),
}

// Notification counts
export const NotificationCounts: Story = {
  render: () => (
    <div className={css({ display: 'flex', gap: '8', alignItems: 'center' })}>
      <div className={css({ position: 'relative' })}>
        <button
          className={css({
            px: 'inset.normal',
            py: 'inset.tight',
            bg: 'bg.secondary',
            color: 'text.inverted',
            borderWidth: 'brutal',
            borderColor: 'border',
            fontWeight: 'brutal',
            position: 'relative',
          })}
        >
          Messages
        </button>
        <Badge
          variant='filled'
          size='sm'
          className={css({
            position: 'absolute',
            top: '-8px',
            right: '-8px',
          })}
        >
          5
        </Badge>
      </div>

      <div className={css({ position: 'relative' })}>
        <button
          className={css({
            px: 'inset.normal',
            py: 'inset.tight',
            bg: 'accent.warning',
            color: 'text',
            borderWidth: 'brutal',
            borderColor: 'border',
            fontWeight: 'brutal',
            position: 'relative',
          })}
        >
          Notifications
        </button>
        <Badge
          variant='filled'
          size='sm'
          className={css({
            position: 'absolute',
            top: '-8px',
            right: '-8px',
          })}
        >
          12
        </Badge>
      </div>
    </div>
  ),
}

// Individual variant stories
export const Filled: Story = {
  args: {
    children: 'Filled Badge',
    variant: 'filled',
  },
}

export const Unfilled: Story = {
  args: {
    children: 'Unfilled Badge',
    variant: 'unfilled',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline Badge',
    variant: 'outline',
  },
}

export const Small: Story = {
  args: {
    children: 'Small',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    children: 'Large',
    size: 'lg',
  },
}
