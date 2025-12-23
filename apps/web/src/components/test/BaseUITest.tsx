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
import { css } from '@styled-system/css'
import { useState } from 'react'

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
          textStyle: 'brutalistLabel',
          cursor: 'pointer',
          py: 'inset.tight',
          px: 'inset.normal',
          color: 'text.onPrimary',
          bg: 'bg.interactive.primary',
          boxShadow: 'elevation.raised',
          transitionDuration: 'fast',
          transitionProperty: 'all',

          '&:hover': {
            boxShadow: 'interaction.hover',
          },

          '&[data-disabled]': {
            cursor: 'not-allowed',
            opacity: 'disabled',
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
              inset: 0,
              position: 'fixed',
              bg: 'bg.overlay',
              backdropBlur: 'dropdown',
            })}
          />
          <Dialog.Popup
            className={css({
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderColor: 'border.default',
              borderRadius: 'none',
              borderWidth: 'brutal',
              minW: 'sizes.dialog.min',

              p: 'inset.comfortable',
              bg: 'bg.elevated',
              boxShadow: 'elevation.modal',
              borderStyle: 'solid',
              '&[data-starting-style]': {
                scale: 0.95,
                opacity: 0,
              },

              '&[data-ending-style]': {
                scale: 0.95,
                opacity: 0,
              },
            })}
          >
            <Dialog.Title
              className={css({
                textStyle: 'brutalistLabel',
                mb: 'stack.tight',
                color: 'text.primary',
              })}
            >
              Base UI Dialog Test
            </Dialog.Title>

            <Dialog.Description
              className={css({
                mb: 'stack.normal',
                color: 'text.secondary',
              })}
            >
              This dialog demonstrates Base UI integration with our token system.
            </Dialog.Description>

            <Dialog.Close
              className={css({
                cursor: 'pointer',

                borderColor: 'border.default',
                borderRadius: 'none',
                borderWidth: 'brutal',
                py: 'inset.tight',
                px: 'inset.normal',
                color: 'text.primary',
                bg: 'bg.interactive.default',
                borderStyle: 'solid',
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
        <p className={css({ mt: 'stack.tight', color: 'text.quaternary', fontSize: 'xs' })}>
          Toggle theme to test swappable aesthetics
        </p>
      </div>
    </div>
  )
}
