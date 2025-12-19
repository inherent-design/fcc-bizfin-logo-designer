import type { Meta, StoryObj } from '@storybook/react-vite'

import { css } from 'styled-system/css'

import { Panel } from './Panel'
const meta = {
  title: 'UI/Panel',
  component: Panel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Panel content',
    },
  },
} satisfies Meta<typeof Panel>

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    children: 'This is a panel component with brutalist styling.',
  },
}

// With content
export const WithContent: Story = {
  render: () => (
    <Panel className={css({ maxWidth: '400px' })}>
      <h3
        className={css({
          fontFamily: 'brutalist',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          mb: '4',
        })}
      >
        Panel Title
      </h3>
      <p className={css({ lineHeight: '1.6', mb: '4' })}>
        This is a panel component that provides a consistent container for content. It uses the
        neo-brutalist design system with heavy borders and strong shadows.
      </p>
      <button
        className={css({
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
        Action
      </button>
    </Panel>
  ),
}

// Nested panels
export const NestedPanels: Story = {
  render: () => (
    <Panel className={css({ maxWidth: '500px' })}>
      <h3
        className={css({
          fontFamily: 'brutalist',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          mb: '4',
        })}
      >
        Outer Panel
      </h3>
      <p className={css({ lineHeight: '1.6', mb: '4' })}>
        Panels can be nested for complex layouts.
      </p>
      <Panel
        className={css({
          bg: 'surface.muted',
          p: 'inset.normal',
        })}
      >
        <h4
          className={css({
            fontFamily: 'brutalist',
            fontWeight: 'bold',
            fontSize: 'sm',
            textTransform: 'uppercase',
            mb: '2',
          })}
        >
          Inner Panel
        </h4>
        <p className={css({ fontSize: 'sm' })}>This is nested content within another panel.</p>
      </Panel>
    </Panel>
  ),
}

// Panel as card
export const CardExample: Story = {
  render: () => (
    <div className={css({ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6' })}>
      <Panel className={css({ maxWidth: '250px' })}>
        <div
          className={css({
            width: '100%',
            height: '120px',
            bg: 'bg.primary',
            mb: '4',
            borderWidth: 'brutal',
            borderColor: 'border',
          })}
        />
        <h4
          className={css({
            fontFamily: 'brutalist',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            mb: '2',
          })}
        >
          Card Title
        </h4>
        <p className={css({ fontSize: 'sm', lineHeight: '1.5', mb: '4' })}>
          Panel components work great as card containers for grid layouts.
        </p>
      </Panel>

      <Panel className={css({ maxWidth: '250px' })}>
        <div
          className={css({
            width: '100%',
            height: '120px',
            bg: 'bg.secondary',
            mb: '4',
            borderWidth: 'brutal',
            borderColor: 'border',
          })}
        />
        <h4
          className={css({
            fontFamily: 'brutalist',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            mb: '2',
          })}
        >
          Another Card
        </h4>
        <p className={css({ fontSize: 'sm', lineHeight: '1.5', mb: '4' })}>
          Each panel has consistent styling and spacing.
        </p>
      </Panel>
    </div>
  ),
}

// Form panel
export const FormPanel: Story = {
  render: () => (
    <Panel className={css({ maxWidth: '400px' })}>
      <h3
        className={css({
          fontFamily: 'brutalist',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          mb: '6',
        })}
      >
        Contact Form
      </h3>
      <div className={css({ display: 'flex', flexDirection: 'column', gap: '4' })}>
        <div>
          <label
            className={css({
              display: 'block',
              fontSize: 'sm',
              fontWeight: 'bold',
              mb: '2',
            })}
          >
            Name
          </label>
          <input
            type='text'
            placeholder='Enter your name'
            className={css({
              width: '100%',
              px: 'inset.tight',
              py: 'inset.tight',
              borderWidth: 'brutal',
              borderColor: 'border',
              fontFamily: 'brutalist',
              fontWeight: 'bold',
            })}
          />
        </div>
        <div>
          <label
            className={css({
              display: 'block',
              fontSize: 'sm',
              fontWeight: 'bold',
              mb: '2',
            })}
          >
            Email
          </label>
          <input
            type='email'
            placeholder='your@email.com'
            className={css({
              width: '100%',
              px: 'inset.tight',
              py: 'inset.tight',
              borderWidth: 'brutal',
              borderColor: 'border',
              fontFamily: 'brutalist',
              fontWeight: 'bold',
            })}
          />
        </div>
        <button
          className={css({
            px: 'inset.normal',
            py: 'inset.tight',
            bg: 'bg.primary',
            color: 'text.inverted',
            borderWidth: 'brutal',
            borderColor: 'border',
            fontWeight: 'brutal',
            textTransform: 'uppercase',
            mt: '2',
          })}
        >
          Submit
        </button>
      </div>
    </Panel>
  ),
}

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '6',
        alignItems: 'flex-start',
      })}
    >
      <Panel className={css({ width: '200px' })}>
        <p className={css({ fontSize: 'sm' })}>Small panel (200px)</p>
      </Panel>
      <Panel className={css({ width: '400px' })}>
        <p className={css({ fontSize: 'sm' })}>Medium panel (400px)</p>
      </Panel>
      <Panel className={css({ width: '600px' })}>
        <p className={css({ fontSize: 'sm' })}>Large panel (600px)</p>
      </Panel>
    </div>
  ),
}

// Dashboard layout example
export const DashboardLayout: Story = {
  render: () => (
    <div
      className={css({
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '6',
        width: '900px',
      })}
    >
      <Panel>
        <h4
          className={css({
            fontFamily: 'brutalist',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            mb: '4',
          })}
        >
          Total Projects
        </h4>
        <div className={css({ fontSize: '2xl', fontWeight: 'bold', color: 'bg.primary' })}>24</div>
      </Panel>
      <Panel>
        <h4
          className={css({
            fontFamily: 'brutalist',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            mb: '4',
          })}
        >
          Active Users
        </h4>
        <div className={css({ fontSize: '2xl', fontWeight: 'bold', color: 'bg.secondary' })}>
          156
        </div>
      </Panel>
      <Panel>
        <h4
          className={css({
            fontFamily: 'brutalist',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            mb: '4',
          })}
        >
          Completion
        </h4>
        <div className={css({ fontSize: '2xl', fontWeight: 'bold', color: 'accent.warning' })}>
          75%
        </div>
      </Panel>
    </div>
  ),
}

// Empty panel
export const Empty: Story = {
  args: {
    children: '',
  },
}

// With custom styling
export const CustomStyling: Story = {
  render: () => (
    <Panel
      className={css({
        maxWidth: '400px',
        bg: 'accent.warning',
        borderColor: 'border',
        p: 'inset.loose',
      })}
    >
      <h3
        className={css({
          fontFamily: 'brutalist',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          mb: '4',
        })}
      >
        Custom Styled Panel
      </h3>
      <p className={css({ lineHeight: '1.6' })}>
        Panels can be customized with className while maintaining the brutalist design system.
      </p>
    </Panel>
  ),
}
