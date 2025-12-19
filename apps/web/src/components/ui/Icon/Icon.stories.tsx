import type { Meta, StoryObj } from '@storybook/react-vite'

import { iconSizes } from '@/tokens'
import { css } from 'styled-system/css'
import { token, type Token } from 'styled-system/tokens'

import { Icon, icons, type IconName } from './Icon'
import type { IconVariantProps } from './Icon.styles'

const meta = {
  title: 'UI/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(icons),
      description: 'Icon name from Heroicons library',
    },
    size: {
      control: 'select',
      options: Object.keys(iconSizes),
      description: 'Icon size - demonstrates ratio-based sizing system',
    },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    name: 'swatch',
    size: '3xl',
  },
}

// All sizes showcase - demonstrates ratio-based size scale
export const SizeScale: Story = {
  args: {},
  render: () => (
    <div className={css({ display: 'flex', flexDirection: 'column', gap: '6' })}>
      <div className={css({ fontSize: 'sm', fontWeight: 'bold', mb: '2' })}>
        Ratio-Based Icon Size Scale
      </div>
      <div className={css({ display: 'flex', gap: '8', alignItems: 'center', flexWrap: 'wrap' })}>
        {Object.entries(iconSizes).map(([size, _]) => (
          <div
            key={size}
            className={css({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2',
            })}
          >
            <Icon
              name={Object.keys(icons)[0] as IconName}
              size={size as IconVariantProps['size']}
            />
            <code>{size}</code>
            <code>{token(`sizes.icon.${size}` as Token)}</code>
          </div>
        ))}
      </div>
    </div>
  ),
}

// All icons showcase
export const IconGallery: Story = {
  args: {},
  render: () => (
    <div className={css({ display: 'flex', flexDirection: 'column', gap: '6' })}>
      <div className={css({ fontSize: 'sm', fontWeight: 'bold', mb: '2' })}>
        Available Icons from Heroicons
      </div>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '6',
        })}
      >
        {Object.keys(icons).map((iconName) => (
          <div
            key={iconName}
            className={css({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2',
            })}
          >
            <Icon name={iconName as IconName} size='xl' />
            <span className={css({ fontSize: 'xs', color: 'text.secondary' })}>{iconName}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}

// Practical use cases
export const InButton: Story = {
  args: {},
  render: () => (
    <div className={css({ display: 'flex', gap: '4' })}>
      <button
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '2',
          px: 'inset.normal',
          py: 'inset.tight',
          bg: 'bg.primary',
          color: 'text.inverted',
          borderWidth: 'brutal',
          borderColor: 'border',
          fontWeight: 'brutal',
          textTransform: 'uppercase',
        })}
      >
        <Icon name='plus' size='sm' />
        Create
      </button>
      <button
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '2',
          px: 'inset.normal',
          py: 'inset.tight',
          bg: 'bg.secondary',
          color: 'text.inverted',
          borderWidth: 'brutal',
          borderColor: 'border',
          fontWeight: 'brutal',
          textTransform: 'uppercase',
        })}
      >
        <Icon name='heart' size='sm' />
        Download
      </button>
      <button
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '2',
          px: 'inset.normal',
          py: 'inset.tight',
          bg: 'accent.warning',
          color: 'text',
          borderWidth: 'brutal',
          borderColor: 'border',
          fontWeight: 'brutal',
          textTransform: 'uppercase',
        })}
      >
        <Icon name='trash' size='sm' />
        Delete
      </button>
    </div>
  ),
}

// Individual icon stories - using icons we know exist
export const Plus: Story = {
  args: {
    name: 'plus',
    size: 'xl',
  },
}

export const Heart: Story = {
  args: {
    name: 'heart',
    size: 'xl',
  },
}

export const Trash: Story = {
  args: {
    name: 'trash',
    size: 'xl',
  },
}

export const Star: Story = {
  args: {
    name: 'star',
    size: 'xl',
  },
}
