# Style Map - Component Implementation Quick Reference

**Purpose:** Quick reference for implementing styled components using the logo-designer token system
**Last Updated:** 2025-12-23
**Source:** Complete token catalog (Layers 0-5) + 53 STYLING.md axioms

---

## Quick Start

### Basic Pattern
```tsx
import { css } from '@styled-system/css'
import { buttonRecipe } from '@styled-system/recipes'

// Pattern 1: Panda css() with semantic tokens
const styles = css({
  bg: 'bg.default',              // Semantic tokens (intent-based)
  borderWidth: 'brutal',          // Short form (maps to semantic)
  p: 'inset.normal',             // Spacing: inset/stack/inline
  color: 'text.primary',          // Text hierarchy
  fontSize: 'body.default',       // Typography scale
})

// Pattern 2: Recipe with variants
const classes = buttonRecipe({ variant: 'primary', size: 'md' })
```

### Layer Usage Rules
```
Components  → Reference ONLY semantic tokens (Layer 3) + recipes (Layer 5)
            → NEVER reference base tokens (Layer 2) directly
            → NEVER use hard-coded values

Semantic    → Reference base tokens or other semantic tokens
Base        → Reference primitives (Layer 1) or other base (compound only)
Primitives  → Reference constants (Layer 0)
Constants   → Pure mathematics
```

---

## Common Implementation Patterns

### 1. Interactive Element (Button, Tab, Card)

**Base Pattern:**
```tsx
const interactiveStyles = css({
  // Neo-brutalist interactive base
  borderWidth: 'brutal',              // 3-5px thick borders
  borderStyle: 'solid',
  borderColor: 'border.default',
  borderRadius: 'none',               // Zero rounding (neo-brutalist)

  // Fast transitions
  transitionDuration: 'fast',         // 100ms
  transitionProperty: 'all',

  // Background states
  bg: 'bg.default',

  // Hover/active states (FULL COLOR INVERSION)
  _hover: {
    bg: 'bg.interactive.hover',        // Inverted: bg becomes fg
    color: 'text.interactive.hover',   // Inverted: text becomes bg
    borderColor: 'border.emphasis',
    boxShadow: 'elevation.floating',  // 8px brutal shadow
  },

  _active: {
    transform: 'translate(2px, 2px)', // Brutal press effect
    boxShadow: 'interaction.pressed', // Inset shadow
  },

  // Focus state
  _focusVisible: {
    outline: '2px solid',
    outlineColor: 'border.focus',
    outlineOffset: '2px',
  },

  // Disabled state
  _disabled: {
    opacity: 'disabled',              // 25%
    cursor: 'not-allowed',
  },
})
```

**When to use:** Buttons, tabs, badges, cards, any clickable surface

---

### 2. Form Input (Text Input, Number Input, Select)

**Base Pattern:**
```tsx
const inputStyles = css({
  // Input background
  bg: 'input.bg',

  // Input border (state-aware)
  borderWidth: 'default',
  borderStyle: 'solid',
  borderColor: 'input.border',
  borderRadius: 'none',

  // Input text
  color: 'input.text',
  fontSize: 'body.default',
  fontFamily: 'brutalist',

  // Padding (WCAG touch target)
  p: 'inset.normal',
  minHeight: 'sizes.touch.min',       // 44px minimum

  // State variants
  _hover: {
    borderColor: 'input.borderHover',
  },

  _focus: {
    borderColor: 'input.borderFocus',
    outline: 'none',                  // Custom outline via border
  },

  _disabled: {
    bg: 'input.bgDisabled',
    color: 'input.textDisabled',
    cursor: 'not-allowed',
  },

  // Placeholder
  _placeholder: {
    color: 'input.textPlaceholder',
  },
})
```

**Label Pattern:**
```tsx
const labelStyles = css({
  textStyle: 'formLabel',             // Predefined text style
  color: 'text.label',
  mb: 'stack.tight',                  // 4px below label
})
```

**When to use:** Text inputs, number inputs, textareas, select dropdowns

---

### 3. Container/Panel (ControlPanel, Card, Drawer)

**Base Pattern:**
```tsx
const panelStyles = css({
  // Surface layer style (predefined)
  // OR manual equivalent:
  bg: 'bg.elevated',

  // Neo-brutalist borders
  borderWidth: 'brutal',
  borderStyle: 'solid',
  borderColor: 'border.default',
  borderRadius: 'none',

  // Elevation shadow
  boxShadow: 'elevation.raised',      // 4px offset, no blur

  // Padding
  p: { base: 'inset.tight', tablet: 'inset.normal' },

  // Layout
  display: 'flex',
  flexDirection: 'column',
  gap: 'stack.normal',                // 16px vertical rhythm

  // Overflow
  overflowY: 'auto',
  overflowX: 'hidden',

  // Responsive sizing
  height: { base: '40%', tablet: '100%' },
  width: { base: '100%', tablet: '40%' },

  // Hover enhancement (if interactive)
  _hover: {
    borderColor: 'border.moderate',
    boxShadow: 'interaction.hover',   // 8px offset
  },

  _focusWithin: {
    borderColor: 'border.focus',
    boxShadow: 'elevation.floating',
  },
})
```

**When to use:** Panels, cards, drawers, modals, any container surface

---

### 4. Section Header (ColorTab, LayoutTab headers)

**Base Pattern:**
```tsx
const headerStyles = css({
  // Section header text style
  textStyle: 'sectionHeader',         // Uppercase, bold, wide spacing

  // OR manual equivalent:
  fontFamily: 'brutalist',
  fontWeight: 'bold',
  fontSize: 'small',                  // 0.833rem
  textTransform: 'uppercase',
  letterSpacing: 'wider',             // 0.1em

  // Color
  color: 'text.primary',

  // Spacing
  mb: 'stack.close',                  // 9.6px below header

  // Flex layout (for icon + text)
  display: 'flex',
  alignItems: 'center',
  gap: 'inline.normal',               // 9.6px between icon and text
})
```

**When to use:** Section headers, category labels, collapsible sections

---

### 5. Drag Handle (dnd-kit)

**Base Pattern:**
```tsx
const dragHandleStyles = css({
  // Touch target size (WCAG 2.2 Level AAA)
  minWidth: 'sizes.touch.min',        // 44px
  minHeight: 'sizes.touch.min',       // 44px

  // Neo-brutalist border
  borderWidth: 'brutal',
  borderStyle: 'solid',
  borderColor: 'border.default',
  borderRadius: 'none',

  // Background
  bg: 'bg.default',

  // Cursor states
  cursor: 'grab',
  _active: { cursor: 'grabbing' },

  // Drag states
  '&[data-dragging="true"]': {
    bg: 'drag.active',                // Transparent overlay
    opacity: 'medium',                // 67%
    transform: 'scale(1.05)',
  },

  // Disabled state
  _disabled: {
    cursor: 'not-allowed',
    opacity: 'disabled',              // 25%
  },

  // Focus
  _focusVisible: {
    outline: '2px solid',
    outlineColor: 'border.focus',
    outlineOffset: '2px',
  },
})
```

**Ghost Element (dragging preview):**
```tsx
const ghostStyles = css({
  bg: 'drag.ghost',                   // 60% transparent bg
  borderWidth: 'brutal',
  borderStyle: 'dashed',              // Dashed for preview
  borderColor: 'border.emphasis',
})
```

**Drop Target:**
```tsx
const dropTargetStyles = css({
  '&[data-drop-target="true"]': {
    borderColor: 'drag.dropTarget',   // Emphasized border
    bg: 'drag.active',                // Light overlay
  },
})
```

**When to use:** Sortable lists, draggable cards, reorderable items

---

### 6. Slider Control (Range Input with Label)

**Base Pattern:**
```tsx
// Container
const containerStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'stack.tight',                 // 4px between header and slider
})

// Header (label + value)
const headerStyles = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 'stack.tight',
})

// Label
const labelStyles = css({
  textStyle: 'brutalistLabel',        // Uppercase, bold
  color: 'text.primary',
  fontSize: 'small',
})

// Value display
const valueStyles = css({
  fontFamily: 'mono',                 // Fira Code
  fontSize: 'body.small',
  color: 'text.secondary',
})

// Slider track
const trackStyles = css({
  width: '100%',
  height: 'spacing.minorThird',       // 9.6px track height
  bg: 'bg.subtle',
  borderWidth: 'brutal',
  borderStyle: 'solid',
  borderColor: 'border.default',
  borderRadius: 'none',
  position: 'relative',
})

// Slider thumb
const thumbStyles = css({
  // WCAG touch target
  width: 'sizes.touch.min',           // 44px
  height: 'sizes.touch.min',          // 44px

  // Neo-brutalist styling
  bg: 'bg.default',
  borderWidth: 'brutal',
  borderStyle: 'solid',
  borderColor: 'border.default',
  borderRadius: 'none',

  // Cursor
  cursor: 'grab',
  _active: { cursor: 'grabbing' },

  // Focus
  _focusVisible: {
    outline: '2px solid',
    outlineColor: 'border.focus',
    outlineOffset: '2px',
  },
})
```

**When to use:** Range sliders, opacity controls, size adjustments

---

### 7. Color Picker (react-colorful + Custom UI)

**Trigger Button:**
```tsx
const triggerStyles = css({
  // Square aspect ratio
  aspectRatio: 'square',              // 1:1

  // Touch target
  minWidth: 'sizes.touch.min',
  minHeight: 'sizes.touch.min',

  // Border
  borderWidth: 'brutal',
  borderStyle: 'solid',
  borderColor: 'border.default',
  borderRadius: 'none',

  // Background (current color)
  // Set dynamically via style prop

  // Focus
  _focusVisible: {
    outline: '2px solid',
    outlineColor: 'border.focus',
    outlineOffset: '2px',
  },
})
```

**Modal Overlay (Mobile):**
```tsx
const overlayStyles = css({
  // Full screen
  position: 'fixed',
  inset: 0,

  // Overlay backdrop
  bg: 'overlay.default',              // 42% opacity

  // Z-index
  zIndex: 'overlay',                  // 18

  // Center content
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
```

**Modal Content:**
```tsx
const modalContentStyles = css({
  bg: 'bg.elevated',
  borderWidth: 'brutal',
  borderStyle: 'solid',
  borderColor: 'border.default',
  borderRadius: 'none',
  boxShadow: 'elevation.modal',       // 12px offset

  // Sizing
  width: '90vw',
  maxWidth: 'sizes.dialog.default',   // 480px

  // Padding
  p: 'inset.normal',

  // Layout
  display: 'flex',
  flexDirection: 'column',
  gap: 'stack.normal',
})
```

**Desktop Inline (Popover):**
```tsx
const desktopContainerStyles = css({
  display: { base: 'none', tablet: 'block' },

  // Sizing
  width: 'sizes.popover.max',         // 400px

  // Other styles same as modal
})
```

**When to use:** Color pickers, custom dropdowns, inline popovers

---

## Hover State Architecture

### Full Color Inversion Pattern

**Problem Solved:** Previous hover states used subtle color mixing that created poor contrast (1.00:1 ratio failing WCAG AA).

**Solution:** Complete color inversion on hover for interactive elements:

```tsx
// Default state
const defaultStyles = css({
  bg: 'bg.interactive.default',      // Light in light theme, dark in dark theme
  color: 'text.interactive.default', // Dark in light theme, light in dark theme
})

// Hover state - COMPLETE INVERSION
const hoverStyles = css({
  _hover: {
    bg: 'bg.interactive.hover',      // Becomes text color
    color: 'text.interactive.hover', // Becomes background color
  },
})
```

**Semantic Tokens:**
- `bg.interactive.default` → Default background for interactive surfaces
- `bg.interactive.hover` → Hover background (inverted foreground)
- `bg.interactive.active` → Active background (stronger inversion)
- `text.interactive.default` → Default text for interactive surfaces
- `text.interactive.hover` → Hover text (inverted background)
- `text.interactive.active` → Active text

**Recipe Pattern:**
All recipes (button, tabs, dragHandle) implement BOTH background AND color changes:

```tsx
export const buttonRecipe = defineRecipe({
  base: {
    bg: 'bg.interactive.default',
    color: 'text.interactive.default',
    _hover: {
      bg: 'bg.interactive.hover',     // MUST include both
      color: 'text.interactive.hover', // for proper inversion
    },
  },
})
```

**When to use:**
- Buttons (all variants: primary, secondary, ghost)
- Tabs
- Drag handles
- Interactive cards
- Any clickable surface requiring hover feedback

**Accessibility:** Ensures WCAG AA contrast (4.5:1 minimum) by using full foreground/background swap instead of subtle mixing.

---

## Token Category Reference

### Spacing Tokens

#### Proximity (Gestalt Principle - Elements Relationship)
```typescript
proximity.tight      // Elements feel unified
proximity.close      // Elements feel related
proximity.related    // Elements feel grouped
proximity.separate   // Elements feel distinct
proximity.isolated   // Elements feel isolated
proximity.distant    // Elements feel unrelated
```

#### Inset (Padding)
```typescript
inset.tight      // 8.5px - Compact padding
inset.normal     // 12px  - Standard padding
inset.loose      // 24px  - Comfortable padding
inset.spacious   // 32px  - Generous padding
```

#### Stack (Vertical Spacing)
```typescript
stack.micro      // 2px   - Minimal gap
stack.tight      // 4px   - Tight gap
stack.close      // 9.6px - Close items
stack.normal     // 16px  - Standard vertical rhythm
stack.loose      // 24px  - Loose sections
stack.spacious   // 32px  - Spacious sections
```

#### Inline (Horizontal Spacing)
```typescript
inline.tight     // 2px   - Icon + text (tight)
inline.close     // 8.5px - Icon + text (normal)
inline.normal    // 9.6px - Button text + icon
inline.loose     // 12px  - Button groups
inline.spacious  // 16px  - Wide button groups
```

#### Overlap (Negative Spacing - Architectural Effects)
```typescript
overlap.tabBorder    // -4px   - Tab border overlap
overlap.slight       // -9.6px
overlap.moderate     // -12px
overlap.strong       // -16px
overlap.heavy        // -24px
```

---

### Color Tokens

#### Text Hierarchy (4-Tier - Dominant 7th Chord)
```typescript
text.primary      // 100% opacity - Headings, primary content
text.secondary    // 80%  opacity - Subheadings, descriptions
text.tertiary     // 67%  opacity - Captions, metadata
text.quaternary   // 57%  opacity - Fine print
text.disabled     // 25%  opacity - Disabled text

// Interactive text tokens (FULL COLOR INVERSION)
text.interactive.default  // Default interactive text
text.interactive.hover    // Hover text (inverts: text becomes bg color)
text.interactive.active   // Active text (stronger inversion)
```

#### Background Colors
```typescript
bg.default           // Main background
bg.subtle            // Slightly tinted (50% mix)
bg.hover             // 10% foreground mix (deprecated - use bg.interactive.hover)
bg.active            // 15% foreground mix (deprecated - use bg.interactive.active)
bg.elevated          // Raised surfaces
bg.overlay           // 40% overlay

// Interactive state backgrounds (FULL COLOR INVERSION)
bg.interactive.default  // Default interactive surface
bg.interactive.hover    // Hover state (inverts: bg becomes fg color)
bg.interactive.active   // Active state (stronger inversion)

// Semantic backgrounds
bg.primary           // Primary action background
bg.secondary         // Secondary action background
bg.accent            // Accent/highlight background
bg.danger            // Error/destructive background
bg.success           // Success background
```

**Interactive Pattern:** Hover states invert colors completely
- Default: `bg.interactive.default` + `text.interactive.default`
- Hover: `bg.interactive.hover` (= fg color) + `text.interactive.hover` (= bg color)

#### Border Colors
```typescript
border.default       // 100% foreground (solid black/white)
border.subtle        // 30% opacity
border.moderate      // 60% opacity
border.emphasis      // Emphasized border (gray.8)
border.focus         // Focus state (gray.8)
border.error         // Error state (gray.8)
border.success       // Success state (gray.6)
```

#### Input Colors
```typescript
input.bg             // Input background
input.bgHover        // Hover state
input.bgFocus        // Focus state
input.bgDisabled     // Disabled state

input.border         // Default border
input.borderHover    // Hover border
input.borderFocus    // Focus border
input.borderError    // Error border

input.text           // Input text
input.textDisabled   // Disabled text
input.textPlaceholder // Placeholder text
```

#### Interaction States
```typescript
interaction.disabled.opacity  // 25%
interaction.disabled.bg       // Subtle background
interaction.disabled.text     // Disabled text

drag.active                   // 20% transparent overlay
drag.ghost                    // 60% transparent ghost
drag.dropTarget               // Emphasized drop target
```

---

### Typography Tokens

#### Font Sizes
```typescript
// Body text
body.large      // 1.2rem   (typePlus1)
body.default    // 1rem     (typeBase)
body.small      // 0.833rem (typeMinus1)
body.xs         // 0.694rem (typeMinus2)

// Headings
heading.h1      // 2.986rem (typePlus6)
heading.h2      // 2.488rem (typePlus5)
heading.h3      // 2.074rem (typePlus4)
heading.h4      // 1.728rem (typePlus3)
heading.h5      // 1.44rem  (typePlus2)
heading.h6      // 1.2rem   (typePlus1)

// Display
display.base    // 4rem  (64px)
display.plus1   // 5rem  (80px)
display.plus2   // 6rem  (96px)
display.plus3   // 8rem  (128px)
display.plus4   // 10rem (160px)
```

#### Font Families
```typescript
fontFamily.brutalist  // Space Grotesk (UI controls, labels, headers)
fontFamily.mono       // Fira Code (code, numeric values)
```

#### Font Weights
```typescript
fontWeight.normal    // 400 - Body text
fontWeight.medium    // 500 - Emphasis
fontWeight.bold      // 700 - Strong emphasis
fontWeight.brutal    // 900 - Neo-brutalist headers/labels
```

#### Line Heights
```typescript
lineHeight.tight     // 1.2   - Headings (minor third)
lineHeight.normal    // 1.5   - Body text (perfect fifth)
lineHeight.relaxed   // 1.778 - Reading content (minor seventh)
```

#### Letter Spacing
```typescript
letterSpacing.tight     // -0.05em - Negative tracking
letterSpacing.normal    // 0em    - No tracking
letterSpacing.relaxed   // 0.025em - Subtle tracking
letterSpacing.wide      // 0.05em  - Labels, UI text
letterSpacing.wider     // 0.1em   - Neo-brutalist headers
```

#### Text Transform
```typescript
textTransform.uppercase   // UPPERCASE (neo-brutalist labels)
textTransform.lowercase   // lowercase
textTransform.capitalize  // Capitalize First Letter
textTransform.none        // No Transform
```

---

### Border Tokens

#### Border Widths
```typescript
borderWidths.hairline         // 1px - Hairline dividers
borderWidths.default          // 4px - Standard border (4/8 base rhythm)
borderWidths.brutal           // 3px - Neo-brutalist default (3/8 base rhythm)
borderWidths.brutal.thick     // 4px - Neo-brutalist medium (4/8 base rhythm)
borderWidths.brutal.extraThick // 5px - Neo-brutalist thick (5/8 base rhythm)
```

**Mathematical Derivation:**
- All border widths derived from base rhythm (8px)
- `brutal`: 3px = 3/8 of base rhythm
- `brutalThick`: 5px = 5/8 of base rhythm
- Provides rhythmic consistency with spacing system

#### Border Radius
```typescript
borderRadius.none     // 0 (neo-brutalist default)
borderRadius.sm       // 4px
borderRadius.md       // 8px
borderRadius.lg       // 12px
borderRadius.xl       // 16px
borderRadius.full     // 999.9rem (pill shape)
```

#### Border Styles
```typescript
borderStyle.solid   // Solid (default)
borderStyle.dashed  // Dashed (ghost states)
borderStyle.dotted  // Dotted (utility)
borderStyle.none    // No border
```

---

### Effect Tokens

#### Opacity
```typescript
opacity.disabled    // 25%  - Disabled elements
opacity.muted       // 33%  - Muted content
opacity.subtle      // 50%  - Subtle overlays
opacity.medium      // 67%  - Medium emphasis
opacity.strong      // 75%  - Strong emphasis
opacity.nearFull    // 90%  - Nearly opaque
opacity.full        // 100% - Full opacity
```

#### Shadows (Neo-Brutalist - Hard Shadows, No Blur)
```typescript
// Elevation shadows
elevation.raised    // 4px  offset - Buttons, badges
elevation.floating  // 8px  offset - Panels, cards
elevation.modal     // 12px offset - Modals, drawers

// Interaction shadows
interaction.pressed // 2px inset - Active/pressed state
interaction.hover   // 8px offset - Hover lift effect
```

**Shadow Color System:**
- Shadow colors use `darkColors[3]` primitive (darkScale array)
- `darkColors[0]`: 20% darkness (lightest)
- `darkColors[1]`: 16% darkness
- `darkColors[2]`: 12% darkness
- `darkColors[3]`: 10% darkness (default shadow color)
- All shadows use hard edges (0 blur) for neo-brutalist aesthetic

#### Blur
```typescript
blur.none      // 0
blur.subtle    // 4px
blur.default   // 8px
blur.medium    // 12px
blur.strong    // 16px
blur.maximum   // 24px

// Backdrop blur (glass morphism)
backdropBlur.none      // 0
backdropBlur.dropdown  // 8px
backdropBlur.tooltip   // 12px
backdropBlur.modal     // 16px
```

---

### Animation Tokens

#### Durations
```typescript
durations.duration100  // 100ms - Fast (colors, opacity)
durations.duration150  // 150ms - Normal (transform, scale)
durations.duration225  // 225ms - Moderate (slide, complex)
durations.duration338  // 338ms - Slow (page transitions)
```

#### Easings
```typescript
easings.easingSmooth  // cubic-bezier(0.4, 0, 0.2, 1) - Default
easings.easingIn      // ease-in - Acceleration
easings.easingOut     // ease-out - Deceleration
easings.easingInOut   // ease-in-out - Symmetrical
```

#### Transition Patterns
```typescript
transition.fast       // 100ms - Quick states
transition.normal     // 150ms - Standard transitions
transition.colors     // 100ms - Color changes
transition.transform  // 150ms - Transform/scale
```

#### Animation Categories
```typescript
// Slide animations (8 directions)
slide.inLeft, slide.inRight, slide.inTop, slide.inBottom
slide.outLeft, slide.outRight, slide.outTop, slide.outBottom

// Fade animations
fade.in, fade.out, fade.inScale, fade.outScale

// Scale animations
scale.up, scale.down, scale.in, scale.out

// Pulse animations
pulse.default, pulse.fast, pulse.slow

// Press animations
press.down, press.up, press.active

// Hover transitions
hover.default, hover.slow
```

---

### Layout Tokens

#### Z-Index (Stacking Context)
```typescript
zIndex.base       // 0  - Default content
zIndex.dropdown   // 10 - Select menus
zIndex.sticky     // 12 - Sticky headers
zIndex.popover    // 15 - Tooltips, popovers
zIndex.overlay    // 18 - Modals, overlays
zIndex.toast      // 22 - Notifications
zIndex.max        // 25 - Critical UI elements
```

#### Aspect Ratios
```typescript
aspectRatio.square      // 1:1
aspectRatio.video       // 4:3
aspectRatio.widescreen  // 16:9
aspectRatio.ultrawide   // 5:3
aspectRatio.portrait    // 3:2
```

---

### Component Size Tokens

#### Dialog/Modal Sizes
```typescript
sizes.dialog.min      // 320px
sizes.dialog.sm       // 400px
sizes.dialog.default  // 480px
sizes.dialog.lg       // 640px
sizes.dialog.xl       // 800px
```

#### Touch Target (Accessibility)
```typescript
sizes.touch.min  // 44px (WCAG 2.2 Level AAA minimum)
```

---

## Text Styles (Predefined)

### brutalistLabel
```typescript
textStyle: 'brutalistLabel'
// Equivalent to:
{
  fontFamily: 'brutalist',
  fontWeight: 'brutal',      // 900
  fontSize: 'small',         // 0.833rem
  textTransform: 'uppercase',
  letterSpacing: 'wide',     // 0.05em
}
```

**When to use:** Buttons, tabs, badges, control labels

---

### sectionHeader
```typescript
textStyle: 'sectionHeader'
// Equivalent to:
{
  fontFamily: 'brutalist',
  fontWeight: 'bold',        // 700
  fontSize: 'small',         // 0.833rem
  textTransform: 'uppercase',
  letterSpacing: 'wider',    // 0.1em
}
```

**When to use:** Section headers, category dividers, collapsible headers

---

### formLabel
```typescript
textStyle: 'formLabel'
// Equivalent to:
{
  fontFamily: 'brutalist',
  fontSize: 'small',         // 0.833rem
  fontWeight: 'medium',      // 500
}
```

**When to use:** Input labels, form field labels

---

## Layer Styles (Predefined)

### surface
```typescript
layerStyle: 'surface'
// Equivalent to:
{
  bg: 'bg.default',
  borderWidth: 'default',
  borderStyle: 'solid',
  borderColor: 'border.default',
  borderRadius: 'none',
}
```

**When to use:** Base surfaces, panels, cards

---

### surfaceElevated
```typescript
layerStyle: 'surfaceElevated'
// Equivalent to:
{
  bg: 'bg.elevated',
  borderWidth: 'brutal',
  borderStyle: 'solid',
  borderColor: 'border.default',
  borderRadius: 'none',
  boxShadow: 'elevation.raised',
}
```

**When to use:** Elevated panels, floating cards, raised surfaces

---

### surfaceInteractive
```typescript
layerStyle: 'surfaceInteractive'
// Equivalent to:
{
  bg: 'bg.interactive.default',
  borderWidth: 'default',
  borderStyle: 'solid',
  borderColor: 'border.default',
  borderRadius: 'none',
  cursor: 'pointer',
  transitionDuration: 'fast',
  transitionProperty: 'all',

  _hover: {
    bg: 'bg.hover',
    borderColor: 'border.emphasis',
  },

  _active: {
    transform: 'translate(2px, 2px)',
  },
}
```

**When to use:** Clickable cards, interactive panels, drag handles

---

## Recipes (Component Variants)

### buttonRecipe
```tsx
import { buttonRecipe } from '@styled-system/recipes'

<Button className={buttonRecipe({ variant: 'primary', size: 'md' })}>
  Click Me
</Button>
```

**Variants:**
- `variant`: `primary` | `secondary` | `ghost`
- `size`: `sm` | `md` | `lg`
- **Default:** `variant='secondary'`, `size='md'`

---

### inputRecipe (Multi-Slot)
```tsx
import { inputRecipe } from '@styled-system/recipes'

const classes = inputRecipe({ size: 'md', type: 'text' })

<div className={classes.container}>
  <label className={classes.label}>Label</label>
  <input className={classes.input} />
</div>
```

**Variants:**
- `size`: `sm` | `md` | `lg`
- `type`: `text` | `number` | `color`
- **Default:** `size='md'`, `type='text'`

---

### badgeRecipe
```tsx
import { badgeRecipe } from '@styled-system/recipes'

<span className={badgeRecipe({ variant: 'filled', size: 'sm' })}>
  Badge
</span>
```

**Variants:**
- `variant`: `filled` | `unfilled` | `success` | `error` | `warning`
- `size`: `sm` | `md` | `lg`
- **Default:** `variant='filled'`, `size='sm'`

---

### tabsRecipe (Multi-Slot)
```tsx
import { tabsRecipe } from '@styled-system/recipes'
import { Tabs } from '@base-ui/react/tabs'

const classes = tabsRecipe({ orientation: 'horizontal' })

<Tabs.Root className={classes.root}>
  <Tabs.List className={classes.list}>
    <Tabs.Tab className={classes.trigger} value='tab1'>Tab 1</Tabs.Tab>
    <Tabs.Tab className={classes.trigger} value='tab2'>Tab 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel className={classes.panel} value='tab1'>
    Content 1
  </Tabs.Panel>
</Tabs.Root>
```

**Variants:**
- `orientation`: `horizontal` | `vertical`
- **Default:** `orientation='horizontal'`

**Note:** Tab overlap uses `marginBottom: 'overlap.tabBorder'` (-4px) to create seamless border connection

---

### sliderControlRecipe (Multi-Slot)
```tsx
import { sliderControlRecipe } from '@styled-system/recipes'

const classes = sliderControlRecipe({ size: 'md' })

<div className={classes.container}>
  <div className={classes.header}>
    <label className={classes.label}>Label</label>
    <span className={classes.value}>50</span>
  </div>
  <input type='range' className={classes.slider} />
</div>
```

**Variants:**
- `size`: `sm` | `md`
- **Default:** `size='md'`

**Note:** Thumb is 44×44px (WCAG touch target)

---

### dragHandleRecipe
```tsx
import { dragHandleRecipe } from '@styled-system/recipes'

<div className={dragHandleRecipe({ state: 'default' })} />
```

**Variants:**
- `state`: `default` | `dragging` | `disabled`
- **Default:** `state='default'`

**Note:** 44×44px touch target, grab/grabbing cursors

---

### sectionHeaderRecipe (Multi-Slot)
```tsx
import { sectionHeaderRecipe } from '@styled-system/recipes'

const classes = sectionHeaderRecipe({ size: 'md' })

<div className={classes.root}>
  <h3 className={classes.title}>Section Title</h3>
  <div className={classes.actions}>
    {/* Action buttons */}
  </div>
</div>
```

**Variants:**
- `size`: `sm` | `md`
- **Default:** `size='md'`

---

## Common Gotchas

### 1. ❌ Don't Reference Base Tokens Directly
```tsx
// ❌ WRONG (breaks layer abstraction)
const styles = css({
  borderWidth: 'border3',  // Base token (Layer 2)
  p: 'harmonic3',          // Base token (Layer 2)
})

// ✅ CORRECT (semantic tokens)
const styles = css({
  borderWidth: 'brutal',   // Semantic token (Layer 3)
  p: 'inset.loose',        // Semantic token (Layer 3)
})
```

### 2. ❌ Don't Use Hard-Coded Values
```tsx
// ❌ WRONG
const styles = css({
  fontSize: '14px',
  padding: '12px',
  borderWidth: '3px',
})

// ✅ CORRECT (semantic tokens)
const styles = css({
  fontSize: 'body.small',
  p: 'inset.normal',
  borderWidth: 'brutal',
})
```

### 3. ❌ Don't Skip Touch Targets (Accessibility)
```tsx
// ❌ WRONG (too small for WCAG 2.2)
const thumbStyles = css({
  width: '20px',
  height: '20px',
})

// ✅ CORRECT (44px minimum)
const thumbStyles = css({
  minWidth: 'sizes.touch.min',   // 44px
  minHeight: 'sizes.touch.min',  // 44px
})
```

### 4. ❌ Don't Forget Focus States
```tsx
// ❌ WRONG (no focus indicator)
const buttonStyles = css({
  bg: 'bg.primary',
  // Missing focus state
})

// ✅ CORRECT (focus state for accessibility)
const buttonStyles = css({
  bg: 'bg.primary',

  _focusVisible: {
    outline: '2px solid',
    outlineColor: 'border.focus',
    outlineOffset: '2px',
  },
})
```

### 5. ❌ Don't Use Non-Brutal Styles in Neo-Brutalist Components
```tsx
// ❌ WRONG (rounded corners break aesthetic)
const cardStyles = css({
  borderRadius: 'md',  // Rounded corners
  boxShadow: 'lg',     // Soft blur shadow
})

// ✅ CORRECT (neo-brutalist aesthetic)
const cardStyles = css({
  borderRadius: 'none',               // Zero rounding
  boxShadow: 'elevation.raised',      // Hard shadow (no blur)
  borderWidth: 'brutal',              // Thick border (3-5px)
})
```

---

## Responsive Design Patterns

### Mobile-First Breakpoints
```tsx
const responsiveStyles = css({
  // Mobile (base)
  fontSize: 'body.small',
  p: 'inset.tight',
  flexDirection: 'column',

  // Tablet (768px+)
  tablet: {
    fontSize: 'body.default',
    p: 'inset.normal',
    flexDirection: 'row',
  },

  // Desktop (1024px+)
  desktop: {
    fontSize: 'body.large',
    p: 'inset.loose',
  },
})
```

### Container Queries (Future)
```tsx
// When supported by Panda CSS
const containerStyles = css({
  // Base styles
  display: 'flex',

  // Container query
  '@container (min-width: 400px)': {
    flexDirection: 'row',
  },
})
```

---

## Accessibility Checklist

### ✅ Touch Targets
- [ ] Minimum 44×44px for interactive elements
- [ ] Use `sizes.touch.min` token
- [ ] Applies to: buttons, sliders, drag handles, tabs

### ✅ Focus States
- [ ] Visible focus indicator (outline or border)
- [ ] 2px minimum outline width
- [ ] 2px outline offset for breathing room
- [ ] Use `border.focus` color token

### ✅ Color Contrast
- [ ] Text: 4.5:1 contrast ratio (WCAG AA)
- [ ] Large text: 3:1 contrast ratio
- [ ] UI components: 3:1 minimum
- [ ] Semantic tokens ensure compliance

### ✅ Text Hierarchy
- [ ] 4-tier hierarchy using dominant 7th chord
- [ ] Primary (100%), Secondary (80%), Tertiary (67%), Quaternary (57%)
- [ ] Disabled (25%)

### ✅ Disabled States
- [ ] 25% opacity for disabled elements
- [ ] `cursor: not-allowed`
- [ ] Semantic `interaction.disabled` tokens

---

## Musical Theory Reference

### Ratios Used

#### Minor Third (1.2) - Subtle Progression
- **Usage:** Font scale, line height
- **Example:** 1rem → 1.2rem → 1.44rem

#### Perfect Fifth (1.5) - Strong Progression
- **Usage:** Spacing, durations
- **Example:** 100ms → 150ms → 225ms

#### Octave (2.0) - Structural Division
- **Usage:** Large spacing, harmonic series
- **Example:** 16px → 32px → 64px

#### Dominant 7th [1.0, 1.25, 1.5, 1.75] - Four-Tier Hierarchy
- **Usage:** Text opacity hierarchy
- **Example:** 100% → 80% → 67% → 57%

#### Harmonic Series [1, 2, 3, 4, 5, 6, 8, 10, 12, 16]
- **Usage:** Structural spacing, container sizes
- **Example:** 8px → 16px → 24px → 32px → 40px → 48px → 64px → 80px → 96px → 128px

#### Subharmonic Series [1, 1/2, 1/3, 1/4, 1/5, 1/6, 1/8, 1/10]
- **Usage:** Opacity scale
- **Example:** 100% → 50% → 33% → 25% → 20% → 17% → 12.5% → 10%
- **New:** Added `subharmonicSeries.tenth` (1/10 = 10%) for opacity calculations

---

## Performance Tips

### 1. Use Recipes for Variants
```tsx
// ✅ GOOD (recipe handles variants efficiently)
const classes = buttonRecipe({ variant: 'primary' })

// ❌ AVOID (manual variant switching)
const styles = css({
  ...(variant === 'primary' && { bg: 'bg.primary' }),
  ...(variant === 'secondary' && { bg: 'bg.secondary' }),
})
```

### 2. Leverage Shared Patterns
```tsx
import { neoInteractiveBase, neoTextBase } from '@/tokens/recipes/shared/base'

// ✅ GOOD (shared pattern)
const buttonStyles = css({
  ...neoInteractiveBase,
  ...neoTextBase,
  // Component-specific styles
})
```

### 3. Avoid Inline Styles for Static Values
```tsx
// ❌ AVOID (inline style, recreated on render)
<div style={{ padding: '12px', borderWidth: '3px' }}>

// ✅ GOOD (css() with tokens)
const styles = css({
  p: 'inset.normal',
  borderWidth: 'brutal',
})
<div className={styles}>
```

---

## Quick Reference Summary

### Most Common Tokens
```typescript
// Spacing
p: 'inset.normal'        // 12px padding
gap: 'stack.normal'      // 16px vertical gap
mb: 'stack.tight'        // 4px margin bottom

// Colors
bg: 'bg.default'
color: 'text.primary'
borderColor: 'border.default'

// Typography
fontSize: 'body.default'  // 1rem
fontFamily: 'brutalist'
fontWeight: 'bold'

// Borders
borderWidth: 'brutal'     // 3-5px
borderRadius: 'none'      // 0 (neo-brutalist)
borderStyle: 'solid'

// Effects
boxShadow: 'elevation.raised'  // 4px hard shadow
opacity: 'disabled'            // 25%

// Transitions
transitionDuration: 'fast'     // 100ms
transitionProperty: 'all'
```

### Most Common Patterns
```typescript
// Interactive element base
{
  borderWidth: 'brutal',
  borderStyle: 'solid',
  borderColor: 'border.default',
  borderRadius: 'none',
  transitionDuration: 'fast',
  transitionProperty: 'all',
}

// Text label base
{
  textStyle: 'brutalistLabel',
  fontFamily: 'brutalist',
}

// Touch target (accessibility)
{
  minWidth: 'sizes.touch.min',
  minHeight: 'sizes.touch.min',
}

// Focus state
{
  _focusVisible: {
    outline: '2px solid',
    outlineColor: 'border.focus',
    outlineOffset: '2px',
  },
}
```

---

**For complete token reference, see:**
- `~/production/.atlas/observer/analysis/logo-designer/style-system-catalog-2025-12-23.md` (exhaustive catalog)
- `src/tokens/` directory (token definitions)
- `docs/STYLING.md` (53 axioms + layer architecture)
