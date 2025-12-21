/**
 * Semantic Animation Tokens
 *
 * Layer 3: Token references ONLY
 * - NO direct CSS values
 * - ALL values reference base tokens using {category.name} syntax
 * - Semantic names describe animation purpose
 */

// ============================================================================
// SLIDE ANIMATIONS (7 components: Toast, Modal, Drawer, Popover, Dropdown, Tabs, Combobox)
// ============================================================================

const slide = {
  /** Slide in from left */
  inLeft: {
    duration: { value: '{durations.normal}' },
    easing: { value: '{easings.smooth}' },
  },

  /** Slide in from right */
  inRight: {
    duration: { value: '{durations.normal}' },
    easing: { value: '{easings.smooth}' },
  },

  /** Slide in from top */
  inTop: {
    duration: { value: '{durations.normal}' },
    easing: { value: '{easings.smooth}' },
  },

  /** Slide in from bottom */
  inBottom: {
    duration: { value: '{durations.normal}' },
    easing: { value: '{easings.smooth}' },
  },

  /** Slide out to left */
  outLeft: {
    duration: { value: '{durations.normal}' },
    easing: { value: '{easings.smooth}' },
  },

  /** Slide out to right */
  outRight: {
    duration: { value: '{durations.normal}' },
    easing: { value: '{easings.smooth}' },
  },

  /** Slide out to top */
  outTop: {
    duration: { value: '{durations.normal}' },
    easing: { value: '{easings.smooth}' },
  },

  /** Slide out to bottom */
  outBottom: {
    duration: { value: '{durations.normal}' },
    easing: { value: '{easings.smooth}' },
  },
} as const

// ============================================================================
// FADE ANIMATIONS (5 components: Tooltip, Toast, Popover, Dropdown, Tabs)
// ============================================================================

const fade = {
  /** Fade in */
  in: {
    duration: { value: '{durations.fast}' },
    easing: { value: '{easings.smooth}' },
  },

  /** Fade out */
  out: {
    duration: { value: '{durations.fast}' },
    easing: { value: '{easings.smooth}' },
  },

  /** Fade in with scale */
  inScale: {
    duration: { value: '{durations.normal}' },
    easing: { value: '{easings.smooth}' },
  },

  /** Fade out with scale */
  outScale: {
    duration: { value: '{durations.normal}' },
    easing: { value: '{easings.smooth}' },
  },
} as const

// ============================================================================
// SCALE ANIMATIONS (4 components: Tooltip, Modal, Popover, Dropdown)
// ============================================================================

const scale = {
  /** Scale up */
  up: {
    duration: { value: '{durations.normal}' },
    easing: { value: '{easings.smooth}' },
  },

  /** Scale down */
  down: {
    duration: { value: '{durations.normal}' },
    easing: { value: '{easings.smooth}' },
  },

  /** Scale in (from 0.95 to 1.0) */
  in: {
    duration: { value: '{durations.normal}' },
    easing: { value: '{easings.smooth}' },
  },

  /** Scale out (from 1.0 to 0.95) */
  out: {
    duration: { value: '{durations.normal}' },
    easing: { value: '{easings.smooth}' },
  },
} as const

// ============================================================================
// PULSE ANIMATIONS (4 components: Icon, Badge, Button, Slider)
// ============================================================================

const pulse = {
  /** Pulse animation */
  default: {
    duration: { value: '{durations.slow}' },
    easing: { value: '{easings.inOut}' },
  },

  /** Fast pulse */
  fast: {
    duration: { value: '{durations.normal}' },
    easing: { value: '{easings.inOut}' },
  },

  /** Slow pulse */
  slow: {
    duration: { value: '{durations.verySlow}' },
    easing: { value: '{easings.inOut}' },
  },
} as const

// ============================================================================
// PRESS ANIMATIONS (4 components: Button, Checkbox, Radio, Switch)
// ============================================================================

const press = {
  /** Button press (scale down) */
  down: {
    duration: { value: '{durations.fast}' },
    easing: { value: '{easings.in}' },
  },

  /** Button release (scale up) */
  up: {
    duration: { value: '{durations.fast}' },
    easing: { value: '{easings.out}' },
  },

  /** Press active state */
  active: {
    duration: { value: '{durations.fast}' },
    easing: { value: '{easings.smooth}' },
  },
} as const

// ============================================================================
// CHECKMARK ANIMATIONS (4 components: Checkbox, Radio, Switch, Input)
// ============================================================================

const checkMark = {
  /** Checkmark appear */
  appear: {
    duration: { value: '{durations.normal}' },
    easing: { value: '{easings.smooth}' },
  },

  /** Checkmark disappear */
  disappear: {
    duration: { value: '{durations.fast}' },
    easing: { value: '{easings.smooth}' },
  },

  /** Indeterminate state */
  indeterminate: {
    duration: { value: '{durations.normal}' },
    easing: { value: '{easings.smooth}' },
  },
} as const

// ============================================================================
// SHAKE ANIMATIONS (3 components: Input, Modal, Toast)
// ============================================================================

const shake = {
  /** Error shake animation */
  error: {
    duration: { value: '{durations.normal}' },
    easing: { value: '{easings.smooth}' },
  },

  /** Warning shake */
  warning: {
    duration: { value: '{durations.normal}' },
    easing: { value: '{easings.smooth}' },
  },
} as const

// ============================================================================
// HOVER TRANSITION (6 components: Button, Panel, Select, Tabs, Dropdown, Accordion)
// ============================================================================

const hover = {
  /** Default hover transition */
  default: {
    duration: { value: '{durations.fast}' },
    easing: { value: '{easings.smooth}' },
  },

  /** Slow hover transition */
  slow: {
    duration: { value: '{durations.normal}' },
    easing: { value: '{easings.smooth}' },
  },
} as const

// ============================================================================
// TRANSITION PATTERNS (Reference base/animations.ts)
// ============================================================================

const transition = {
  /** Fast transition (all properties) */
  fast: {
    duration: { value: '{durations.fast}' },
    easing: { value: '{easings.smooth}' },
  },

  /** Normal transition (all properties) */
  normal: {
    duration: { value: '{durations.normal}' },
    easing: { value: '{easings.smooth}' },
  },

  /** Color-only transition */
  colors: {
    duration: { value: '{durations.fast}' },
    easing: { value: '{easings.smooth}' },
  },

  /** Transform-only transition */
  transform: {
    duration: { value: '{durations.normal}' },
    easing: { value: '{easings.smooth}' },
  },
} as const

// ============================================================================
// ALL SEMANTIC ANIMATIONS
// ============================================================================

export const animations = {
  slide,
  fade,
  scale,
  pulse,
  press,
  checkMark,
  shake,
  hover,
  transition,
} as const
