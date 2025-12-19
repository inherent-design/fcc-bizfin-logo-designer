// ============================================================================
// IMPORTS
// ============================================================================

// Panda CSS
import { css } from 'styled-system/css'

// Store
import { useLogoStore } from '@/stores/logoStore'

// Components
import { Badge } from '../ui/Badge/Badge'
import { FormLabel } from '../ui/FormLabel/FormLabel'
import { Input } from '../ui/Input/Input'
import { QuadrantCard } from '../ui/QuadrantCard/QuadrantCard'
import { Slider } from '../ui/Slider/Slider'

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

// quadrantCardStyles removed - now using QuadrantCard component

const headerStyles = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 'stack.tight',
})

const titleStyles = css({
  textStyle: 'brutalistLabel',
  color: 'panel.fg', // Override: brutalistLabel uses text.label
})

// badgeStyles removed - now using Badge component with cva recipe

const elementLabelStyles = css({
  textStyle: 'brutalistText',
  fontSize: 'xs', // Override: brutalistText uses sm
  mb: 'stack.tight',
  color: 'panel.fg',
  opacity: 'medium',
  textTransform: 'capitalize', // Override: different from uppercase
})

// TODO: Extract to dedicated textStyle variant 'elementLabel' in config
// Multiple semantic overrides (fontSize, color, opacity, textTransform) warrant a custom textStyle token

// Slider styles removed - now using Slider component with sva recipe

const offsetGridStyles = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 'inline.tight',
})

const fullWidthStyles = css({
  width: '100%',
})

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

// QuadrantFillBadge removed - replaced with Badge component

// ScaleSlider removed - replaced with Slider component

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

  return (
    <div className={offsetGridStyles}>
      <div>
        <FormLabel htmlFor={xId}>X Offset</FormLabel>
        <Input
          id={xId}
          name={xId}
          type='number'
          value={offsetX}
          onChange={(e) => onChangeX(Number(e.target.value))}
          className={fullWidthStyles}
        />
      </div>

      <div>
        <FormLabel htmlFor={yId}>Y Offset</FormLabel>
        <Input
          id={yId}
          name={yId}
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
        <QuadrantCard key={index}>
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
        </QuadrantCard>
      ))}
    </div>
  )
}
