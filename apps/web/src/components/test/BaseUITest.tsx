/**
 * Base UI Integration Test Component
 *
 * Purpose: Validate Base UI setup and theming integration
 * - Tests Button component with Panda styling
 * - Tests Dialog component with semantic tokens
 * - Validates theme swapping capability
 */

import { Button } from '@base-ui/react/button'
import { Dialog } from '@base-ui/react/dialog'
import { useState } from 'react'
import { css } from 'styled-system/css'

export function BaseUITest() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className={css({ p: 'inset.spacious', bg: 'bg.subtle' })}>
      <h1 className={css({ textStyle: 'sectionHeader', mb: 'stack.normal' })}>
        Base UI Integration Test
      </h1>

      {/* Test 1: Button with semantic tokens */}
      <Button
        className={css({
          bg: 'bg.interactive.primary',
          textStyle: 'brutalistLabel',
          color: 'text.onPrimary',
          boxShadow: 'elevation.raised',
          px: 'inset.normal',
          py: 'inset.tight',
          cursor: 'pointer',
          transitionDuration: 'fast',
          transitionProperty: 'all',

          '&:hover': {
            boxShadow: 'interaction.hover',
          },

          '&[data-disabled]': {
            opacity: 'disabled',
            cursor: 'not-allowed',
          },
        })}
        onClick={() => setDialogOpen(true)}
      >
        Open Dialog
      </Button>

      {/* Test 2: Dialog with semantic tokens */}
      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop
            className={css({
              position: 'fixed',
              inset: 0,
              bg: 'bg.overlay',
              backdropFilter: 'blur(8px)',
            })}
          />
          <Dialog.Popup
            className={css({
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bg: 'bg.elevated',
              borderWidth: 'brutal',
              borderStyle: 'solid',
              borderColor: 'border.default',
              borderRadius: 'none',
              boxShadow: 'elevation.modal',
              p: 'inset.comfortable',
              minW: '300px',

              '&[data-starting-style]': {
                opacity: 0,
                scale: 0.95,
              },

              '&[data-ending-style]': {
                opacity: 0,
                scale: 0.95,
              },
            })}
          >
            <Dialog.Title
              className={css({
                textStyle: 'brutalistLabel',
                color: 'text.primary',
                mb: 'stack.tight',
              })}
            >
              Base UI Dialog Test
            </Dialog.Title>

            <Dialog.Description
              className={css({
                color: 'text.secondary',
                mb: 'stack.normal',
              })}
            >
              This dialog demonstrates Base UI integration with our token system.
            </Dialog.Description>

            <Dialog.Close
              className={css({
                bg: 'bg.interactive.default',
                color: 'text.primary',
                borderWidth: 'brutal',
                borderStyle: 'solid',
                borderColor: 'border.default',
                borderRadius: 'none',
                px: 'inset.normal',
                py: 'inset.tight',
                cursor: 'pointer',

                '&:hover': {
                  bg: 'bg.hover',
                },
              })}
            >
              Close
            </Dialog.Close>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Theme information */}
      <div className={css({ mt: 'stack.comfortable' })}>
        <p className={css({ color: 'text.tertiary', fontSize: 'sm' })}>
          Current theme: {document.documentElement.getAttribute('data-theme')}
        </p>
        <p className={css({ color: 'text.quaternary', fontSize: 'xs', mt: 'stack.tight' })}>
          Toggle theme to test swappable aesthetics
        </p>
      </div>
    </div>
  )
}
