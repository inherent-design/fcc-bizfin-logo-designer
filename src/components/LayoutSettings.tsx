import type { Vec2 } from '../schemas/logoState.schema'
import { componentLogger } from '../utils/logger'

// Section Header Component
function SectionHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div>
      <h3 className='text-xs font-semibold uppercase tracking-wider text-base-content/60'>
        {title}
      </h3>
      {children}
    </div>
  )
}

// Slider Component
function SliderControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
  onReset,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  onReset: () => void
}) {
  return (
    <div>
      <div>
        <label className='text-sm text-base-content/70'>{label}</label>
        <div>
          <span className='text-xs font-mono text-base-content/50'>{value.toFixed(1)}</span>
          <button onClick={onReset} className='btn btn-xs btn-ghost' aria-label={`Reset ${label}`}>
            ↺
          </button>
        </div>
      </div>
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className='range range-xs'
      />
    </div>
  )
}

// Props interface
interface LayoutSettingsProps {
  quadrants: Array<{
    centerOffset: Vec2
    elementScale: number
  }>
  actions: {
    setCenterOffset: (position: number, offset: Vec2) => void
    setElementScale: (position: number, scale: number) => void
  }
}

export function LayoutSettings({ quadrants, actions }: LayoutSettingsProps) {
  const quadrantLabels = ['Top-Left', 'Top-Right', 'Bottom-Left', 'Bottom-Right']

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
    <div>
      {quadrants.map((quadrant, i) => {
        const { centerOffset, elementScale } = quadrant

        return (
          <div key={i}>
            <SectionHeader title={`Quadrant ${i + 1} (${quadrantLabels[i]})`}>
              <button
                onClick={() => handleResetAllForQuadrant(i)}
                className='btn btn-xs btn-ghost'
                aria-label={`Reset all for ${quadrantLabels[i]}`}
              >
                Reset All
              </button>
            </SectionHeader>

            <div>
              <SliderControl
                label='Offset X'
                value={centerOffset.x}
                min={-160}
                max={160}
                step={0.1}
                onChange={(value) => handleOffsetChange(i, 'x', value)}
                onReset={() => handleResetOffset(i, 'x')}
              />

              <SliderControl
                label='Offset Y'
                value={centerOffset.y}
                min={-160}
                max={160}
                step={0.1}
                onChange={(value) => handleOffsetChange(i, 'y', value)}
                onReset={() => handleResetOffset(i, 'y')}
              />

              <SliderControl
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
