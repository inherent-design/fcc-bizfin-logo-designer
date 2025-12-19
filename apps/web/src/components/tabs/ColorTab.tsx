// ============================================================================
// IMPORTS
// ============================================================================

// Panda CSS
import { css } from 'styled-system/css'

// Store
import { useLogoStore } from '@/stores/logoStore'

// Components
import { Button } from '../ui/Button/Button'
import { AdvancedColorPicker } from '../ui/ColorPicker/ColorPicker'

// ============================================================================
// STYLES
// ============================================================================

const containerStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'stack.loose',
  pt: 'stack.normal',
})

const buttonStyles = css({
  width: '100%',
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
      <AdvancedColorPicker label='Base Color' color={baseColor} onChange={setBaseColor} />

      {/* Two-Tone Toggle */}
      <div>
        <Button
          variant={isTwoTone ? 'primary' : 'secondary'}
          size='sm'
          onClick={() => (isTwoTone ? disableTwoTone() : enableTwoTone())}
          className={buttonStyles}
        >
          {isTwoTone ? 'Disable' : 'Enable'} Two-Tone
        </Button>
      </div>

      {/* Two-Tone Colors */}
      {isTwoTone && (
        <>
          <AdvancedColorPicker
            label='Fill Color (Top-Left)'
            color={fillColorQ0}
            onChange={(color) => setTwoToneFillColor(0, color)}
          />
          <AdvancedColorPicker
            label='Fill Color (Bottom-Right)'
            color={fillColorQ3}
            onChange={(color) => setTwoToneFillColor(3, color)}
          />
        </>
      )}
    </div>
  )
}
