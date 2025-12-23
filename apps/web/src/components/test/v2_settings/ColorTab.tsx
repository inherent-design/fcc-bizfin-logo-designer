// ============================================================================
// IMPORTS
// ============================================================================

// Base UI
import { Button } from '@base-ui/react/button'

// Panda CSS
import { css } from '@styled-system/css'

// Recipes
import { buttonRecipe } from '@styled-system/recipes'

// Store
import { useLogoStore } from '@/stores/logoStore'

// Components
import { ColorPicker } from '@/components/ui/ColorPicker'

// ============================================================================
// STYLES
// ============================================================================

const containerStyles = css({
  display: 'flex',
  gap: 'stack.loose',
  flexDirection: 'column',
  pt: 'stack.normal',
})

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * ColorTab - Tab content for color controls
 *
 * Features:
 * - Base color picker
 * - Two-tone mode toggle
 * - Quadrant-specific color pickers (when two-tone enabled)
 * - Base UI Button integration
 *
 * @example
 * ```tsx
 * <ColorTab />
 * ```
 */
export function ColorTab() {
  const baseColor = useLogoStore((state) => state.baseColor)
  const setBaseColor = useLogoStore((state) => state.setBaseColor)
  const isTwoTone = useLogoStore((state) => state.twoToneDesign !== null)
  const enableTwoTone = useLogoStore((state) => state.enableTwoTone)
  const disableTwoTone = useLogoStore((state) => state.disableTwoTone)
  const setTwoToneFillColor = useLogoStore((state) => state.setTwoToneFillColor)
  const fillColorQ0 = useLogoStore(
    (state) =>
      state.twoToneDesign?.fillColorQuadrant0 || state.baseDesign.fillColorForFilledQuadrants
  )
  const fillColorQ3 = useLogoStore(
    (state) =>
      state.twoToneDesign?.fillColorQuadrant3 || state.baseDesign.fillColorForFilledQuadrants
  )

  return (
    <div className={containerStyles}>
      {/* Base Color */}
      <ColorPicker label='Base Color' onChange={setBaseColor} color={baseColor} />

      {/* Two-Tone Toggle */}
      <div>
        <Button
          className={buttonRecipe({
            variant: isTwoTone ? 'primary' : 'secondary',
            size: 'sm',
          })}
          onClick={() => (isTwoTone ? disableTwoTone() : enableTwoTone())}
        >
          {isTwoTone ? 'Disable' : 'Enable'} Two-Tone
        </Button>
      </div>

      {/* Two-Tone Colors */}
      {isTwoTone && (
        <>
          <ColorPicker
            label='Fill Color (Top-Left)'
            onChange={(color) => setTwoToneFillColor(0, color)}
            color={fillColorQ0}
          />
          <ColorPicker
            label='Fill Color (Bottom-Right)'
            onChange={(color) => setTwoToneFillColor(3, color)}
            color={fillColorQ3}
          />
        </>
      )}
    </div>
  )
}
