// ============================================================================
// IMPORTS
// ============================================================================

// Panda CSS
import { css } from 'styled-system/css'

// Store
import { useLogoStore } from '../../store/logoStore'

// Components
import { FormLabel } from '../ui/FormLabel'
import { Input } from '../ui/Input'

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Quadrant display labels
 * Order: [TL, TR, BR, BL]
 */
const QUADRANT_LABELS = ['Top-Left', 'Top-Right', 'Bottom-Right', 'Bottom-Left']

// ============================================================================
// STYLES
// ============================================================================

const containerStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  pt: 4,
})

const quadrantCardStyles = css({
  p: 4,
  border: '{borderWidths.brutal.inset} solid',
  borderColor: 'panel.border',
  bg: 'component.tab.bgActive',
})

const headerStyles = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 3,
})

const titleStyles = css({
  fontFamily: 'brutalist',
  fontWeight: 'brutal',
  fontSize: 'sm',
  textTransform: 'uppercase',
  color: 'panel.fg',
})

const badgeStyles = css({
  px: 2,
  py: 1,
  border: '{borderWidths.brutal.inset} solid',
  borderColor: 'panel.border',
  fontFamily: 'brutalist',
  fontWeight: 'bold',
  fontSize: '2xs',
  textTransform: 'uppercase',
})

const elementLabelStyles = css({
  fontFamily: 'brutalist',
  fontSize: 'xs',
  mb: 3,
  color: 'panel.fg',
  opacity: 'medium',
  textTransform: 'capitalize',
})

const sliderSectionStyles = css({
  mb: 3,
})

const sliderHeaderStyles = css({
  display: 'flex',
  justifyContent: 'space-between',
  mb: 2,
})

const sliderLabelStyles = css({
  fontFamily: 'brutalist',
  fontWeight: 'bold',
  fontSize: 'xs',
  textTransform: 'uppercase',
  color: 'panel.fg',
})

const sliderValueStyles = css({
  fontFamily: 'brutalist',
  fontWeight: 'brutal',
  fontSize: 'xs',
  color: 'panel.primary',
})

const sliderInputStyles = css({
  width: '100%',
  height: 2,
  bg: 'panel.border',
  outline: 'none',
  cursor: 'pointer',

  '&::-webkit-slider-thumb': {
    appearance: 'none',
    width: 5,
    height: 5,
    bg: 'panel.primary',
    border: '{borderWidths.brutal.inset} solid',
    borderColor: 'panel.border',
    cursor: 'pointer',
  },

  '&::-moz-range-thumb': {
    width: 5,
    height: 5,
    bg: 'panel.primary',
    border: '{borderWidths.brutal.inset} solid',
    borderColor: 'panel.border',
    cursor: 'pointer',
  },
})

const offsetGridStyles = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 2,
})

const fullWidthStyles = css({
  width: '100%',
})

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * QuadrantFillBadge - Shows whether quadrant is filled or unfilled
 */
function QuadrantFillBadge({ isFilled }: { isFilled: boolean }) {
  return (
    <div
      className={badgeStyles}
      style={{
        backgroundColor: isFilled ? 'var(--colors-panel-primary)' : 'transparent',
        color: isFilled ? 'var(--colors-component-tab-text-active)' : 'var(--colors-panel-fg)',
      }}
    >
      {isFilled ? 'Filled' : 'Unfilled'}
    </div>
  )
}

/**
 * ScaleSlider - Element scale control with label and value display
 */
function ScaleSlider({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className={sliderSectionStyles}>
      <div className={sliderHeaderStyles}>
        <label className={sliderLabelStyles}>Scale</label>
        <span className={sliderValueStyles}>{value.toFixed(2)}</span>
      </div>

      <input
        type='range'
        min={0.5}
        max={2}
        step={0.1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={sliderInputStyles}
      />
    </div>
  )
}

/**
 * OffsetInputs - X and Y position offset controls
 */
function OffsetInputs({
  offsetX,
  offsetY,
  onChangeX,
  onChangeY,
}: {
  offsetX: number
  offsetY: number
  onChangeX: (value: number) => void
  onChangeY: (value: number) => void
}) {
  return (
    <div className={offsetGridStyles}>
      <div>
        <FormLabel htmlFor='offset-x'>X Offset</FormLabel>
        <Input
          id='offset-x'
          type='number'
          value={offsetX}
          onChange={(e) => onChangeX(Number(e.target.value))}
          className={fullWidthStyles}
        />
      </div>

      <div>
        <FormLabel htmlFor='offset-y'>Y Offset</FormLabel>
        <Input
          id='offset-y'
          type='number'
          value={offsetY}
          onChange={(e) => onChangeY(Number(e.target.value))}
          className={fullWidthStyles}
        />
      </div>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * LayoutTab - Quadrant-based layout control panel
 *
 * Features:
 * - Individual quadrant scale controls
 * - X/Y offset inputs for element positioning
 * - Fill status indicators
 * - Element type display
 *
 * Quadrants:
 * - 0: Top-Left
 * - 1: Top-Right
 * - 2: Bottom-Right
 * - 3: Bottom-Left
 *
 * @example
 * ```tsx
 * <LayoutTab />
 * ```
 */
export function LayoutTab() {
  const quadrants = useLogoStore((state) => state.quadrants)
  const setElementScale = useLogoStore((state) => state.setElementScale)
  const setCenterOffset = useLogoStore((state) => state.setCenterOffset)

  return (
    <div className={containerStyles}>
      {quadrants.map((quadrant, index) => (
        <div key={index} className={quadrantCardStyles}>
          {/* Header with label and fill status */}
          <div className={headerStyles}>
            <h3 className={titleStyles}>{QUADRANT_LABELS[index]}</h3>
            <QuadrantFillBadge isFilled={quadrant.isFilled} />
          </div>

          {/* Element type */}
          <div className={elementLabelStyles}>Element: {quadrant.elementId}</div>

          {/* Scale slider */}
          <ScaleSlider
            value={quadrant.elementScale}
            onChange={(value) => setElementScale(index, value)}
          />

          {/* Position offsets */}
          <OffsetInputs
            offsetX={quadrant.centerOffset.x}
            offsetY={quadrant.centerOffset.y}
            onChangeX={(x) =>
              setCenterOffset(index, {
                ...quadrant.centerOffset,
                x,
              })
            }
            onChangeY={(y) =>
              setCenterOffset(index, {
                ...quadrant.centerOffset,
                y,
              })
            }
          />
        </div>
      ))}
    </div>
  )
}
