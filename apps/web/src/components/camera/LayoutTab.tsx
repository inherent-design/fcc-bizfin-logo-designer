// ============================================================================
// IMPORTS
// ============================================================================

// Panda CSS
import { css } from 'styled-system/css'

// Types
import type { Vec2, Quadrant } from '@/schemas/logoState.schema'

// Utils
import { componentLogger } from '@/utils/logger'

// Components
import { Button } from '@base-ui/react/button'
import { DraggableElementList } from './DraggableElementList'

// Recipes
import { buttonRecipe, sliderControlRecipe, sectionHeaderRecipe } from 'styled-system/recipes'

// Zustand
import { useLogoStore } from '@/stores/logoStore'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * LayoutSettings internal component props
 */
interface LayoutSettingsProps {
  /** Array of quadrant configurations */
  quadrants: Array<{
    centerOffset: Vec2
    elementScale: number
  }>
  /** Full quadrants array for drag-and-drop element swapping */
  fullQuadrants: [Quadrant, Quadrant, Quadrant, Quadrant]
  /** Actions for updating quadrant settings */
  actions: {
    swapElements: (fromPosition: number, toPosition: number) => void
    setCenterOffset: (position: number, offset: Vec2) => void
    setElementScale: (position: number, scale: number) => void
  }
}

/**
 * SliderControl component props
 */
interface SliderControlProps {
  /** Slider label text */
  label: string
  /** Current slider value */
  value: number
  /** Minimum value */
  min: number
  /** Maximum value */
  max: number
  /** Step increment */
  step: number
  /** Value change handler */
  onChange: (value: number) => void
  /** Reset button handler */
  onReset: () => void
  /** Unique ID for the slider input */
  id: string
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Quadrant display labels
 * Order: [TL, TR, BL, BR]
 */
const QUADRANT_LABELS = ['Top-Left', 'Top-Right', 'Bottom-Left', 'Bottom-Right']

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * SliderControl - Reusable slider with label, value display, and reset
 */
function SliderControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
  onReset,
  id,
}: SliderControlProps) {
  const classes = sliderControlRecipe()

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <label htmlFor={id} className={classes.label}>
          {label}
        </label>
        <div className={classes.valueContainer}>
          <span className={classes.value}>{value.toFixed(1)}</span>
          <Button
            className={buttonRecipe({ variant: 'ghost', size: 'sm' })}
            onClick={onReset}
            aria-label={`Reset ${label}`}
          >
            ↺
          </Button>
        </div>
      </div>
      <input
        id={id}
        name={id}
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={classes.slider}
      />
    </div>
  )
}

/**
 * LayoutSettings - Internal quadrant-based layout adjustment controls
 *
 * Features:
 * - Drag-and-drop element reordering
 * - Per-quadrant offset controls (X/Y)
 * - Per-quadrant scale controls
 * - Individual reset buttons
 * - Reset all button per quadrant
 *
 * Quadrants:
 * - 0: Top-Left
 * - 1: Top-Right
 * - 2: Bottom-Left
 * - 3: Bottom-Right
 */
function LayoutSettings({ quadrants, fullQuadrants, actions }: LayoutSettingsProps) {
  const sectionClasses = sectionHeaderRecipe()

  const handleOffsetChange = (position: number, axis: 'x' | 'y', value: number) => {
    componentLogger.debug({ position, axis, value }, 'Offset changed')
    const currentOffset = quadrants[position].centerOffset
    actions.setCenterOffset(position, {
      ...currentOffset,
      [axis]: value,
    })
  }

  const handleScaleChange = (position: number, scale: number) => {
    componentLogger.debug({ position, scale }, 'Scale changed')
    actions.setElementScale(position, scale)
  }

  const handleResetOffset = (position: number, axis: 'x' | 'y') => {
    componentLogger.debug({ position, axis }, 'Resetting offset')
    const currentOffset = quadrants[position].centerOffset
    actions.setCenterOffset(position, {
      ...currentOffset,
      [axis]: 0,
    })
  }

  const handleResetScale = (position: number) => {
    componentLogger.debug({ position }, 'Resetting scale')
    actions.setElementScale(position, 1.0)
  }

  const handleResetAllForQuadrant = (position: number) => {
    componentLogger.debug({ position }, 'Resetting all for quadrant')
    actions.setCenterOffset(position, { x: 0, y: 0 })
    actions.setElementScale(position, 1.0)
  }

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'stack.loose',
      })}
    >
      {/* Element Reordering Section */}
      <div>
        <h3
          className={css({
            fontSize: 'sm',
            fontFamily: 'brutalist',
            fontWeight: 'bold',
            color: 'text.primary',
            mb: 'stack.tight',
          })}
        >
          Element Order
        </h3>
        <DraggableElementList quadrants={fullQuadrants} onSwapElements={actions.swapElements} />
      </div>

      {/* Per-Quadrant Transforms */}
      <div>
        <h3
          className={css({
            fontSize: 'sm',
            fontFamily: 'brutalist',
            fontWeight: 'bold',
            color: 'text.primary',
            mb: 'stack.tight',
          })}
        >
          Element Transforms
        </h3>
      </div>

      {quadrants.map((quadrant, i) => {
        const { centerOffset, elementScale } = quadrant

        return (
          <div key={i}>
            <div className={sectionClasses.root}>
              <h3 className={sectionClasses.title}>
                Quadrant {i + 1} ({QUADRANT_LABELS[i]})
              </h3>
              <div className={sectionClasses.actions}>
                <Button
                  className={buttonRecipe({ variant: 'ghost', size: 'sm' })}
                  onClick={() => handleResetAllForQuadrant(i)}
                  aria-label={`Reset all for ${QUADRANT_LABELS[i]}`}
                >
                  Reset All
                </Button>
              </div>
            </div>

            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: 'stack.normal',
              })}
            >
              <SliderControl
                id={`layout-offset-x-q${i}`}
                label='Offset X'
                value={centerOffset.x}
                min={-160}
                max={160}
                step={0.1}
                onChange={(value) => handleOffsetChange(i, 'x', value)}
                onReset={() => handleResetOffset(i, 'x')}
              />

              <SliderControl
                id={`layout-offset-y-q${i}`}
                label='Offset Y'
                value={centerOffset.y}
                min={-160}
                max={160}
                step={0.1}
                onChange={(value) => handleOffsetChange(i, 'y', value)}
                onReset={() => handleResetOffset(i, 'y')}
              />

              <SliderControl
                id={`layout-scale-q${i}`}
                label='Scale'
                value={elementScale}
                min={0.5}
                max={2.0}
                step={0.05}
                onChange={(value) => handleScaleChange(i, value)}
                onReset={() => handleResetScale(i)}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT (Container)
// ============================================================================

/**
 * LayoutTab - Production layout configuration panel for logo designer
 *
 * Connects to Zustand logoStore for state management.
 * Renders LayoutSettings with store data and actions.
 *
 * Features:
 * - Element reordering via drag-and-drop
 * - Per-quadrant transforms (offset X/Y, scale)
 * - Persisted state via Zustand
 *
 * @example
 * ```tsx
 * <LayoutTab />
 * ```
 */
export function LayoutTab() {
  // Zustand selectors
  const quadrants = useLogoStore((state) => state.quadrants)

  // Actions
  const actions = {
    swapElements: useLogoStore((state) => state.swapElements),
    setCenterOffset: useLogoStore((state) => state.setCenterOffset),
    setElementScale: useLogoStore((state) => state.setElementScale),
  }

  return <LayoutSettings quadrants={quadrants} fullQuadrants={quadrants} actions={actions} />
}
