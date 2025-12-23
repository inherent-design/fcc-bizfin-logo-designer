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
    duration: { value: '{durations.duration150}' },
    easing: { value: '{easings.easingSmooth}' },
  },

  /** Slide in from right */
  inRight: {
    duration: { value: '{durations.duration150}' },
    easing: { value: '{easings.easingSmooth}' },
  },

  /** Slide in from top */
  inTop: {
    duration: { value: '{durations.duration150}' },
    easing: { value: '{easings.easingSmooth}' },
  },

  /** Slide in from bottom */
  inBottom: {
    duration: { value: '{durations.duration150}' },
    easing: { value: '{easings.easingSmooth}' },
  },

  /** Slide out to left */
  outLeft: {
    duration: { value: '{durations.duration150}' },
    easing: { value: '{easings.easingSmooth}' },
  },

  /** Slide out to right */
  outRight: {
    duration: { value: '{durations.duration150}' },
    easing: { value: '{easings.easingSmooth}' },
  },

  /** Slide out to top */
  outTop: {
    duration: { value: '{durations.duration150}' },
    easing: { value: '{easings.easingSmooth}' },
  },

  /** Slide out to bottom */
  outBottom: {
    duration: { value: '{durations.duration150}' },
    easing: { value: '{easings.easingSmooth}' },
  },
} as const

// ============================================================================
// FADE ANIMATIONS (5 components: Tooltip, Toast, Popover, Dropdown, Tabs)
// ============================================================================

const fade = {
  /** Fade in */
  in: {
    duration: { value: '{durations.duration100}' },
    easing: { value: '{easings.easingSmooth}' },
  },

  /** Fade out */
  out: {
    duration: { value: '{durations.duration100}' },
    easing: { value: '{easings.easingSmooth}' },
  },

  /** Fade in with scale */
  inScale: {
    duration: { value: '{durations.duration150}' },
    easing: { value: '{easings.easingSmooth}' },
  },

  /** Fade out with scale */
  outScale: {
    duration: { value: '{durations.duration150}' },
    easing: { value: '{easings.easingSmooth}' },
  },
} as const

// ============================================================================
// SCALE ANIMATIONS (4 components: Tooltip, Modal, Popover, Dropdown)
// ============================================================================

const scale = {
  /** Scale up */
  up: {
    duration: { value: '{durations.duration150}' },
    easing: { value: '{easings.easingSmooth}' },
  },

  /** Scale down */
  down: {
    duration: { value: '{durations.duration150}' },
    easing: { value: '{easings.easingSmooth}' },
  },

  /** Scale in (from 0.95 to 1.0) */
  in: {
    duration: { value: '{durations.duration150}' },
    easing: { value: '{easings.easingSmooth}' },
  },

  /** Scale out (from 1.0 to 0.95) */
  out: {
    duration: { value: '{durations.duration150}' },
    easing: { value: '{easings.easingSmooth}' },
  },
} as const

// ============================================================================
// PULSE ANIMATIONS (4 components: Icon, Badge, Button, Slider)
// ============================================================================

const pulse = {
  /** Pulse animation */
  default: {
    duration: { value: '{durations.duration225}' },
    easing: { value: '{easings.easingInOut}' },
  },

  /** Fast pulse */
  fast: {
    duration: { value: '{durations.duration150}' },
    easing: { value: '{easings.easingInOut}' },
  },

  /** Slow pulse */
  slow: {
    duration: { value: '{durations.duration338}' },
    easing: { value: '{easings.easingInOut}' },
  },
} as const

// ============================================================================
// PRESS ANIMATIONS (4 components: Button, Checkbox, Radio, Switch)
// ============================================================================

const press = {
  /** Button press (scale down) */
  down: {
    duration: { value: '{durations.duration100}' },
    easing: { value: '{easings.easingIn}' },
  },

  /** Button release (scale up) */
  up: {
    duration: { value: '{durations.duration100}' },
    easing: { value: '{easings.easingOut}' },
  },

  /** Press active state */
  active: {
    duration: { value: '{durations.duration100}' },
    easing: { value: '{easings.easingSmooth}' },
  },
} as const

// ============================================================================
// CHECKMARK ANIMATIONS (4 components: Checkbox, Radio, Switch, Input)
// ============================================================================

const checkMark = {
  /** Checkmark appear */
  appear: {
    duration: { value: '{durations.duration150}' },
    easing: { value: '{easings.easingSmooth}' },
  },

  /** Checkmark disappear */
  disappear: {
    duration: { value: '{durations.duration100}' },
    easing: { value: '{easings.easingSmooth}' },
  },

  /** Indeterminate state */
  indeterminate: {
    duration: { value: '{durations.duration150}' },
    easing: { value: '{easings.easingSmooth}' },
  },
} as const

// ============================================================================
// SHAKE ANIMATIONS (3 components: Input, Modal, Toast)
// ============================================================================

const shake = {
  /** Error shake animation */
  error: {
    duration: { value: '{durations.duration150}' },
    easing: { value: '{easings.easingSmooth}' },
  },

  /** Warning shake */
  warning: {
    duration: { value: '{durations.duration150}' },
    easing: { value: '{easings.easingSmooth}' },
  },
} as const

// ============================================================================
// HOVER TRANSITION (6 components: Button, Panel, Select, Tabs, Dropdown, Accordion)
// ============================================================================

const hover = {
  /** Default hover transition */
  default: {
    duration: { value: '{durations.duration100}' },
    easing: { value: '{easings.easingSmooth}' },
  },

  /** Slow hover transition */
  slow: {
    duration: { value: '{durations.duration150}' },
    easing: { value: '{easings.easingSmooth}' },
  },
} as const

// ============================================================================
// TRANSITION PATTERNS (Reference base/animations.ts)
// ============================================================================

const transition = {
  /** Fast transition (all properties) */
  fast: {
    duration: { value: '{durations.duration100}' },
    easing: { value: '{easings.easingSmooth}' },
  },

  /** Normal transition (all properties) */
  normal: {
    duration: { value: '{durations.duration150}' },
    easing: { value: '{easings.easingSmooth}' },
  },

  /** Color-only transition */
  colors: {
    duration: { value: '{durations.duration100}' },
    easing: { value: '{easings.easingSmooth}' },
  },

  /** Transform-only transition */
  transform: {
    duration: { value: '{durations.duration150}' },
    easing: { value: '{easings.easingSmooth}' },
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
