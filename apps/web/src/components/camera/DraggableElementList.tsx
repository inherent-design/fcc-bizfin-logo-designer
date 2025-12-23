// ============================================================================
// IMPORTS
// ============================================================================

// React
import { useEffect, useState } from 'react'

// dnd-kit
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// Panda CSS
import { css } from '@styled-system/css'

// Icons
import { GripVertical } from 'lucide-react'

// Recipes
import { dragHandleRecipe } from '@styled-system/recipes'

// Types
import type { ElementId, Quadrant } from '@/schemas/logoState.schema'

// Utils
import { componentLogger } from '@/utils/logger'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Props for DraggableElementList component
 */
interface DraggableElementListProps {
  /** Array of quadrants (defines element order) */
  quadrants: [Quadrant, Quadrant, Quadrant, Quadrant]
  /** Callback when elements are swapped between quadrants */
  onSwapElements: (fromPosition: number, toPosition: number) => void
}

/**
 * Props for SortableElementItem component
 */
interface SortableElementItemProps {
  /** Unique identifier (element ID) */
  id: ElementId
  /** Quadrant position (0-3) */
  position: number
}

// ============================================================================
// CONSTANTS
// ============================================================================

const QUADRANT_LABELS = ['Top-Left', 'Top-Right', 'Bottom-Left', 'Bottom-Right'] as const

const ELEMENT_LABELS: Record<string, string> = {
  briefcase: 'Briefcase',
  mountains: 'Mountains',
  dollar: 'Dollar Sign',
  leaf: 'Grape Leaf',
}

// ============================================================================
// STYLES
// ============================================================================

const listContainerStyles = css({
  display: 'flex',
  gap: 'stack.tight',
  flexDirection: 'column',
  mb: 'stack.loose',
})

const itemContainerStyles = css({
  display: 'flex',
  gap: 'inline.tight',
  alignItems: 'center',
  borderColor: 'border.default',
  borderRadius: 'none',
  borderWidth: 'brutal',
  p: 'inset.tight',
  bg: 'bg.subtle',
  transitionDuration: 'fast',
  transitionProperty: 'all',

  borderStyle: 'solid',
  '&[data-dragging="true"]': {
    transform: 'scale(1.02)',
    opacity: 'medium',
    boxShadow: 'interaction.dragging',
  },
})

const itemContentStyles = css({
  display: 'flex',
  flex: 1,
  gap: 'stack.micro', // Migrated from micro2 base token
  flexDirection: 'column',
})

const elementLabelStyles = css({
  color: 'text.primary',
  fontFamily: 'brutalist',
  fontSize: 'sm',
  fontWeight: 'bold',
})

const quadrantLabelStyles = css({
  color: 'text.secondary',
  fontFamily: 'mono',
  fontSize: 'xs',
  opacity: 'medium',
})

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * SortableElementItem - Individual draggable element row
 */
function SortableElementItem({ id, position }: SortableElementItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className={itemContainerStyles} data-dragging={isDragging}>
      <button
        className={dragHandleRecipe({ state: isDragging ? 'dragging' : 'default' })}
        {...attributes}
        {...listeners}
        aria-label={`Drag to reorder ${ELEMENT_LABELS[id] || id}`}
      >
        <GripVertical size={20} />
      </button>

      <div className={itemContentStyles}>
        <span className={elementLabelStyles}>{ELEMENT_LABELS[id] || id}</span>
        <span className={quadrantLabelStyles}>{QUADRANT_LABELS[position]}</span>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * DraggableElementList - Reorderable list of logo elements
 *
 * Features:
 * - Drag-and-drop reordering via dnd-kit
 * - Keyboard navigation (Space to grab, Arrow keys to move, Escape to cancel)
 * - Visual feedback during drag (opacity, shadow, scale)
 * - WCAG 2.2 compliant (44px touch targets, keyboard accessible)
 *
 * Implementation:
 * - Uses element IDs as sortable items (not quadrant indices)
 * - Swaps element keys within quadrants, preserving quadrant positions
 * - Quadrants stay in their positions with transforms intact
 *
 * @example
 * ```tsx
 * <DraggableElementList
 *   quadrants={quadrants}
 *   onSwapElements={(from, to) => swapElements(from, to)}
 * />
 * ```
 */
export function DraggableElementList({ quadrants, onSwapElements }: DraggableElementListProps) {
  // Track current element order (element IDs in quadrant position order)
  const [items, setItems] = useState<ElementId[]>(() => quadrants.map((q) => q.elementId))

  // Sync items when quadrants prop changes (external state updates)
  useEffect(() => {
    const currentOrder = quadrants.map((q) => q.elementId)
    setItems(currentOrder)
  }, [quadrants])

  // Configure sensors for drag interaction
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id as ElementId)
      const newIndex = items.indexOf(over.id as ElementId)

      // Update local items for immediate UI feedback
      const newItems = arrayMove(items, oldIndex, newIndex)
      setItems(newItems)

      componentLogger.debug(
        { from: oldIndex, to: newIndex, elementId: active.id },
        'Swapping elements'
      )

      // Notify parent to swap elements in store
      onSwapElements(oldIndex, newIndex)
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className={listContainerStyles}>
          {items.map((elementId, position) => (
            <SortableElementItem key={elementId} id={elementId} position={position} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
