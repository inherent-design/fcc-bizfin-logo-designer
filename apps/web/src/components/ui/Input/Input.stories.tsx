import type { Meta, StoryObj } from '@storybook/react-vite'
import { css } from 'styled-system/css'

import { Input } from './Input'

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'url', 'tel'],
      description: 'Input type',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter text...',
  },
}

// All states showcase
export const States: Story = {
  render: () => (
    <div className={css({ display: 'flex', flexDirection: 'column', gap: '6', width: '300px' })}>
      <div>
        <label
          className={css({
            display: 'block',
            fontSize: 'sm',
            fontWeight: 'bold',
            mb: '2',
          })}
        >
          Default State
        </label>
        <Input type='text' placeholder='Enter text...' />
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
          With Value
        </label>
        <Input type='text' defaultValue='Hello World' />
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
          Focus State (click to see)
        </label>
        <Input type='text' placeholder='Click to focus...' />
        <p className={css({ fontSize: 'xs', color: 'text.secondary', mt: '2' })}>
          Focus state shows outline with offset
        </p>
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
          Disabled State
        </label>
        <Input type='text' placeholder='Disabled...' disabled />
      </div>
    </div>
  ),
}

// Form example with different input types
export const FormExample: Story = {
  render: () => (
    <div className={css({ display: 'flex', flexDirection: 'column', gap: '6', width: '350px' })}>
      <div className={css({ fontSize: 'lg', fontWeight: 'bold', mb: '2' })}>Contact Form</div>

      <div>
        <label
          htmlFor='name'
          className={css({
            display: 'block',
            fontSize: 'sm',
            fontWeight: 'bold',
            mb: '2',
          })}
        >
          Name
        </label>
        <Input id='name' type='text' placeholder='John Doe' />
      </div>

      <div>
        <label
          htmlFor='email'
          className={css({
            display: 'block',
            fontSize: 'sm',
            fontWeight: 'bold',
            mb: '2',
          })}
        >
          Email
        </label>
        <Input id='email' type='email' placeholder='john@example.com' />
      </div>

      <div>
        <label
          htmlFor='phone'
          className={css({
            display: 'block',
            fontSize: 'sm',
            fontWeight: 'bold',
            mb: '2',
          })}
        >
          Phone
        </label>
        <Input id='phone' type='tel' placeholder='(555) 123-4567' />
      </div>

      <div>
        <label
          htmlFor='website'
          className={css({
            display: 'block',
            fontSize: 'sm',
            fontWeight: 'bold',
            mb: '2',
          })}
        >
          Website
        </label>
        <Input id='website' type='url' placeholder='https://example.com' />
      </div>
    </div>
  ),
}

// Input types showcase
export const InputTypes: Story = {
  render: () => (
    <div className={css({ display: 'flex', flexDirection: 'column', gap: '4', width: '300px' })}>
      <Input type='text' placeholder='Text input' />
      <Input type='email' placeholder='Email input' />
      <Input type='password' placeholder='Password input' defaultValue='secret123' />
      <Input type='number' placeholder='Number input' />
      <Input type='url' placeholder='URL input' />
      <Input type='tel' placeholder='Tel input' />
    </div>
  ),
}

// Label + Input combinations
export const WithLabel: Story = {
  render: () => (
    <div className={css({ display: 'flex', flexDirection: 'column', gap: '2' })}>
      <label
        htmlFor='example'
        className={css({
          fontSize: 'sm',
          fontWeight: 'bold',
          fontFamily: 'brutalist',
          textTransform: 'uppercase',
        })}
      >
        Label Text
      </label>
      <Input id='example' type='text' placeholder='Input value...' />
    </div>
  ),
}

// With error message pattern
export const WithError: Story = {
  render: () => (
    <div className={css({ display: 'flex', flexDirection: 'column', gap: '2', width: '300px' })}>
      <label
        htmlFor='error-example'
        className={css({
          fontSize: 'sm',
          fontWeight: 'bold',
          fontFamily: 'brutalist',
          textTransform: 'uppercase',
        })}
      >
        Email Address
      </label>
      <Input
        id='error-example'
        type='email'
        placeholder='Enter email...'
        defaultValue='invalid-email'
        className={css({ borderColor: 'bg.danger' })}
      />
      <p className={css({ fontSize: 'sm', color: 'bg.danger', m: 0 })}>
        Please enter a valid email address
      </p>
    </div>
  ),
}

// Individual type stories
export const Text: Story = {
  args: {
    type: 'text',
    placeholder: 'Text input',
  },
}

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'email@example.com',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
}

export const Disabled: Story = {
  args: {
    type: 'text',
    placeholder: 'Disabled input',
    disabled: true,
  },
}
