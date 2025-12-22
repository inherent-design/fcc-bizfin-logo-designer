// ============================================================================
// IMPORTS
// ============================================================================

// Panda CSS
import { css } from 'styled-system/css'

// Recipes
import { badgeRecipe } from '@/recipes/badge.recipe'
import { sliderRecipe } from '@/recipes/slider.recipe'
import { inputRecipe } from '@/recipes/input.recipe'

// Store
import { useLogoStore } from '@/stores/logoStore'

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
  gap: 'stack.loose',
  pt: 'stack.normal',
})

const quadrantCardStyles = css({
  p: 'inset.comfortable',
  bg: 'bg.elevated',
  borderWidth: 'brutal',
  borderStyle: 'solid',
  borderColor: 'border.default',
  borderRadius: 'none',
  boxShadow: 'elevation.raised',
})

const headerStyles = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 'stack.tight',
})

const titleStyles = css({
  textStyle: 'brutalistLabel',
  color: 'text.primary',
})

const elementLabelStyles = css({
  textStyle: 'brutalistText',
  fontSize: 'xs',
  mb: 'stack.tight',
  color: 'text.primary',
  opacity: 'medium',
  textTransform: 'capitalize',
})

const offsetGridStyles = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 'inline.tight',
})

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Badge component for fill status
 */
function Badge({ variant, children }: { variant: 'filled' | 'unfilled'; children: React.ReactNode }) {
  return <span className={badgeRecipe({ variant, size: 'sm' })}>{children}</span>
}

/**
 * Slider component for scale control
 */
function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
}) {
  const classes = sliderRecipe()

  return (
    <div className={classes.container}>
      <label className={classes.label}>{label}</label>
      <div className={classes.wrapper}>
        <input
          type='range'
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={classes.track}
        />
        <span className={classes.value}>{value.toFixed(1)}</span>
      </div>
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
  quadrantIndex,
}: {
  offsetX: number
  offsetY: number
  onChangeX: (value: number) => void
  onChangeY: (value: number) => void
  quadrantIndex: number
}) {
  const xId = `offset-x-q${quadrantIndex}`
  const yId = `offset-y-q${quadrantIndex}`
  const classes = inputRecipe({ size: 'md', type: 'number' })

  return (
    <div className={offsetGridStyles}>
      <div>
        <label htmlFor={xId} className={classes.label}>
          X Offset
        </label>
        <input
          id={xId}
          name={xId}
          type='number'
          value={offsetX}
          onChange={(e) => onChangeX(Number(e.target.value))}
          className={classes.input}
        />
      </div>

      <div>
        <label htmlFor={yId} className={classes.label}>
          Y Offset
        </label>
        <input
          id={yId}
          name={yId}
          type='number'
          value={offsetY}
          onChange={(e) => onChangeY(Number(e.target.value))}
          className={classes.input}
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
 * - Semantic token styling throughout
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
            <Badge variant={quadrant.isFilled ? 'filled' : 'unfilled'}>
              {quadrant.isFilled ? 'Filled' : 'Unfilled'}
            </Badge>
          </div>

          {/* Element type */}
          <div className={elementLabelStyles}>Element: {quadrant.elementId}</div>

          {/* Scale slider */}
          <Slider
            label='Scale'
            value={quadrant.elementScale}
            min={0.5}
            max={2}
            step={0.1}
            onChange={(value) => setElementScale(index, value)}
          />

          {/* Position offsets */}
          <OffsetInputs
            offsetX={quadrant.centerOffset.x}
            offsetY={quadrant.centerOffset.y}
            quadrantIndex={index}
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
