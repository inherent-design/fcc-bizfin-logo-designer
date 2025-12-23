# Style Map - Component Implementation Quick Reference

**Purpose:** Quick reference for implementing styled components using the logo-designer token system
**Last Updated:** 2025-12-23 (Architecture v2.0 + Variant Pattern Deduplication)
**Source:** Complete token catalog (Layers 0-5) + 53 STYLING.md axioms + Connector deduplication analysis

---

## Migration Notice (Dec 2025)

**Breaking Changes:** Token architecture reorganized to 3-tier hierarchy. See [Migration Guide](#migration-guide-dec-2025-reorganization) for updates.

**Key Changes:**
- `surface.fg/bg` → `theme.fg/bg` (theme primitives)
- `accent.primary` → `theme.accent` (theme namespace)
- `bg.default` → `surface.base` (surface states)
- `text.interactive.default` → `text.interactive.base` (pseudo-selector pattern)
- Pseudo-selectors: `hover` → `_hover`, `active` → `_active`

---

## Shared Patterns & LayerStyles (Deduplication Patterns)

**Purpose:** Reusable pattern blocks to eliminate code duplication and ensure consistency.

**Pattern Priority:**
- **CRITICAL (Phase 1-2):** Interactive State Pattern (fixes dark theme hover bug)
- **HIGH (Phase 3-4):** Border Pattern, Focus State, Touch Target
- **MEDIUM (Phase 5-6):** Size Variants, CSS Literal Tokens

---

### Pattern 1: Neo-Brutalist Border Pattern (HIGH Priority)

**Occurrences:** 15+ components

**Extract to shared pattern:**
```typescript
// In tokens/recipes/shared/base.ts
export const neoBrutalBorderStyle = {
  borderWidth: 'theme.brutal',        // 3px
  borderStyle: 'solid',
  borderColor: 'border.default',      // References theme.fg
  borderRadius: 'none',               // Zero rounding
}
```

**Usage:**
```typescript
import { neoBrutalBorderStyle } from '@/tokens/recipes/shared/base'

const buttonStyles = css({
  ...neoBrutalBorderStyle,  // Apply border pattern
  // Component-specific styles
})
```

**Impact:** Replaces 15+ manual duplications (~60 lines saved). Single source of truth for neo-brutalist border aesthetic.

**⚠️ DEDUP OPPORTUNITY:** Found in:
- Interactive Element base (line 281)
- Container/Panel base (line 404)
- Drag Handle base (line 491)
- Slider track/thumb (lines 592, 607)
- Color Picker trigger (line 642)
- Modal content (line 683)
- 7+ layerStyle definitions

---

### Pattern 2: Interactive State Pattern (CRITICAL Priority)

**Occurrences:** 7 components

**CRITICAL:** Fixes dark theme hover visibility bug by ensuring BOTH `bg` and `color` change on hover/active.

**Extract to shared pattern:**
```typescript
// In tokens/recipes/shared/base.ts
export const interactiveStateStyle = {
  _hover: {
    bg: 'surface.interactive._hover',        // Inverts: bg → fg
    color: 'text.interactive._hover',        // Inverts: text → bg (CRITICAL)
    borderColor: 'border.emphasis',          // Optional enhancement
    boxShadow: 'elevation.floating',         // Optional 8px shadow
  },

  _active: {
    bg: 'surface.interactive._active',       // Stronger inversion
    color: 'text.interactive._active',       // Active text inversion
    transform: 'translate(2px, 2px)',        // Brutal press effect
    boxShadow: 'interaction.pressed',        // Inset shadow
  },
}
```

**Usage:**
```typescript
import { interactiveStateStyle } from '@/tokens/recipes/shared/base'

const buttonStyles = css({
  bg: 'surface.interactive.base',
  color: 'text.interactive.base',
  ...interactiveStateStyle,  // Apply hover + active states
})
```

**Impact:**
- Fixes dark theme hover contrast bug (missing text color changes)
- Ensures WCAG AA compliance (4.5:1 contrast minimum)
- Replaces 7+ manual duplications (~80 lines saved)

**⚠️ DEDUP OPPORTUNITY (CRITICAL):** Found in:
- Interactive Element base (lines 291-307) - COMPLETE pattern
- Hover State Architecture section (lines 736-738) - partial (hover only)
- Recipe Pattern example (lines 757-761) - COMPLETE
- surfaceInteractive layerStyle (lines 1286-1303) - COMPLETE
- Migration example (lines 1478-1483) - partial
- Quick Reference (lines 1742-1754) - COMPLETE
- 4+ other sections (conceptual references)

**Anti-Pattern (DEPRECATED):**
```typescript
// ❌ WRONG: Missing text color change (causes dark theme contrast failure)
_hover: {
  bg: 'surface._hover',  // Only bg changes - text stays same color!
}

// ✅ CORRECT: Full color inversion
_hover: {
  bg: 'surface.interactive._hover',
  color: 'text.interactive._hover',  // MUST include text color change
}
```

---

### Pattern 3: Focus State Pattern (MEDIUM Priority)

**Occurrences:** 6 components

**Existing pattern (DEFINED BUT UNUSED):**
```typescript
// Already exists in tokens/recipes/shared/base.ts
export const focusState = {
  _focusVisible: {
    outline: '2px solid',
    outlineColor: 'border.focus',
    outlineOffset: '2px',
  },
}
```

**Usage:**
```typescript
import { focusState } from '@/tokens/recipes/shared/base'

const buttonStyles = css({
  ...focusState,  // Apply consistent focus outline
})
```

**Impact:**
- Pattern exists but is UNDERUTILIZED (tech debt)
- Low implementation cost (just import + spread)
- High accessibility value (WCAG keyboard navigation compliance)
- Replaces 6 manual duplications (~18 lines saved)

**⚠️ DEDUP OPPORTUNITY:** Found in:
- Interactive Element base (lines 312-316)
- Drag Handle pattern (lines 517-521)
- Slider thumb pattern (lines 617-621)
- Color Picker trigger (lines 651-655)
- Common Gotchas example (lines 1532-1536)
- Quick Reference (lines 1771-1775)

---

### Pattern 4: Touch Target Pattern (MEDIUM Priority)

**Occurrences:** 5 components

**Extract to shared pattern:**
```typescript
// In tokens/recipes/shared/base.ts
export const touchTarget = {
  minWidth: 'theme.touch',    // 44px WCAG 2.2 AAA
  minHeight: 'theme.touch',   // 44px WCAG 2.2 AAA
}
```

**Usage:**
```typescript
import { touchTarget } from '@/tokens/recipes/shared/base'

const dragHandleStyles = css({
  ...touchTarget,           // Ensure WCAG compliance
  ...neoBrutalBorderStyle,  // Add brutalist borders
  cursor: 'grab',
})
```

**Impact:**
- Ensures WCAG 2.2 Level AAA compliance
- Replaces 5 manual duplications (~10 lines saved)
- Simple pattern (2 properties)

**⚠️ DEDUP OPPORTUNITY:** Found in:
- Drag Handle base (lines 487-488)
- Slider thumb (lines 602-603)
- Color Picker trigger (lines 638-639)
- Common Gotchas example (lines 1514-1516)
- Quick Reference (lines 1765-1766)

---

### Pattern 5: Size Variants Pattern (MEDIUM Priority)

**Occurrences:** 5 recipes (button, input, badge, sliderControl, sectionHeader)

**Extract to shared variants:**
```typescript
// In tokens/recipes/shared/variants.ts (NEW FILE)
export const sizeVariants = {
  sm: {
    fontSize: 'body.small',
    p: 'inset.tight',
  },
  md: {
    fontSize: 'body.default',
    p: 'inset.normal',
  },
  lg: {
    fontSize: 'body.large',
    p: 'inset.loose',
  },
}
```

**Usage in recipes:**
```typescript
import { sizeVariants } from '@/tokens/recipes/shared/variants'

export const buttonRecipe = defineRecipe({
  variants: {
    size: sizeVariants,  // Reuse shared size progression
  },
})
```

**Impact:**
- Ensures consistent size scale across all components
- Replaces 5 recipe size variant definitions (~30 lines saved)
- Single source of truth for component sizing

**⚠️ DEDUP OPPORTUNITY:** Found in:
- buttonRecipe (lines 1322-1323) - sm/md/lg
- inputRecipe (lines 1340-1342) - sm/md/lg
- badgeRecipe (lines 1357-1358) - sm/md/lg
- sliderControlRecipe (lines 1405-1406) - sm/md
- sectionHeaderRecipe (lines 1441-1442) - sm/md

---

### Pattern 6: Disabled State Pattern (LOW Priority)

**Occurrences:** 4 components

**Existing pattern (DEFINED BUT UNUSED):**
```typescript
// Already exists in tokens/recipes/shared/base.ts
export const interactiveStates = {
  _disabled: {
    opacity: 'disabled',        // 25%
    cursor: 'not-allowed',
  },
}
```

**Usage:**
```typescript
import { interactiveStates } from '@/tokens/recipes/shared/base'

const buttonStyles = css({
  ...interactiveStates,  // Includes disabled state
})
```

**Extended usage (for inputs with custom bg/color):**
```typescript
const inputStyles = css({
  ...interactiveStates,
  _disabled: {
    ...interactiveStates._disabled,  // Base pattern
    bg: 'input.bgDisabled',           // Input-specific override
    color: 'input.textDisabled',
  },
})
```

**Impact:**
- Pattern exists but UNUSED (tech debt)
- Simple to implement (just import + spread)
- Replaces 4 manual duplications (~8 lines saved)

---

### Pattern 7: Cursor State Pattern (Drag) (LOW Priority)

**Occurrences:** 3 components

**Extract to shared pattern:**
```typescript
// In tokens/recipes/shared/drag.ts (NEW FILE)
export const dragCursor = {
  cursor: 'grab',
  _active: { cursor: 'grabbing' },
}
```

**Usage:**
```typescript
import { dragCursor } from '@/tokens/recipes/shared/drag'

const dragHandleStyles = css({
  ...touchTarget,
  ...neoBrutalBorderStyle,
  ...dragCursor,  // Apply grab cursor pattern
})
```

**Impact:**
- Ensures consistent drag UX
- Replaces 3 manual duplications (~6 lines saved)
- Low complexity (2 properties)

---

### Pattern 8: Fast Transitions (Already Optimized)

**Occurrences:** Already part of `neoInteractiveBase` shared pattern

**Pattern:**
```typescript
// Already exists in tokens/recipes/shared/base.ts
export const neoInteractiveBase = {
  borderWidth: 'theme.brutal',
  borderStyle: 'solid',
  borderColor: 'border.default',
  borderRadius: 'none',
  transitionDuration: 'fast',         // 100ms
  transitionProperty: 'all',
}
```

**Impact:** Already optimized, no action needed.

---

## Implementation Roadmap (Deduplication Phases)

### Phase 1: Extract Border Pattern (HIGH Priority)
**Estimated Effort:** 1 hour | **Lines Saved:** ~60

**Tasks:**
1. Create `neoBrutalBorderStyle` in shared/base.ts
2. Update `neoInteractiveBase` to use new border pattern
3. Migrate 15+ manual duplications
4. Run `pnpm panda codegen` to verify
5. Visual regression test (no changes expected)

---

### Phase 2: Extract Interactive State Pattern (CRITICAL Priority)
**Estimated Effort:** 2-3 hours | **Lines Saved:** ~80

**Tasks:**
1. Create `interactiveStateStyle` in shared/base.ts
2. Update all recipes to include BOTH bg AND color changes on hover/active
3. Fix dark theme hover visibility (missing text color changes)
4. Run `pnpm panda codegen`
5. Visual regression test (EXPECT changes - improved contrast)
6. WCAG contrast audit (should pass 4.5:1 minimum)

**CRITICAL FIX:** Dark theme hover state currently has poor contrast (1.00:1 ratio). This phase adds missing `text.interactive._hover` token usage across 7 components.

---

### Phase 3: Use Existing Unused Patterns (MEDIUM Priority)
**Estimated Effort:** 1 hour | **Lines Saved:** ~26

**Tasks:**
1. Import `focusState` in 6 components with focus outlines
2. Import `interactiveStates` in 4 components with disabled states
3. Remove manual duplications
4. Run `pnpm panda codegen`
5. Visual regression test (no changes expected)

---

### Phase 4: Extract Size Variants (MEDIUM Priority)
**Estimated Effort:** 1-2 hours | **Lines Saved:** ~30

**Tasks:**
1. Create `sizeVariants` in shared/variants.ts (NEW FILE)
2. Update 5 recipes to use shared size variants
3. Run `pnpm panda codegen`
4. Visual regression test (no changes expected)

---

### Phase 5: Create CSS Literal Tokens (MEDIUM Priority)
**Estimated Effort:** 2 hours | **Lines Saved:** ~40

**Tasks:**
1. Create `cursors.ts` in semantic/ (NEW FILE)
2. Extend `borders.ts` with borderStyle tokens
3. Extend `typography.ts` with textTransform tokens
4. Migrate 40+ hard-coded literals to semantic tokens
5. Run `pnpm panda codegen`
6. TypeScript validation

**CSS Literals to Tokenize:**
- `borderStyle: 'solid'` (20+ instances) → `borderStyle.solid`
- `cursor: 'pointer'` (10+ instances) → `cursors.pointer`
- `textTransform: 'uppercase'` (8+ instances) → `textTransform.uppercase`
- `cursor: 'grab'/'grabbing'` (3 instances) → `cursors.grab`/`cursors.grabbing`

---

### Phase 6: Extract Remaining Patterns (LOW Priority)
**Estimated Effort:** 1 hour | **Lines Saved:** ~20

**Tasks:**
1. Create `touchTarget` pattern in shared/base.ts
2. Create `dragCursor` pattern in shared/drag.ts (NEW FILE)
3. Standardize responsive padding pattern
4. Migrate remaining duplications
5. Run `pnpm panda codegen`

---

### Total Deduplication Impact

**Lines of Code Reduction:** ~256 lines

**Maintenance Benefits:**
1. Single Source of Truth: Border styling changes propagate automatically
2. Bug Fixes: Dark theme hover visibility fixed across all interactive elements
3. Accessibility: Consistent focus states and touch targets ensure WCAG compliance
4. Consistency: Size progressions, color inversions, disabled states uniform
5. Reduced Tech Debt: Eliminate "DEFINED BUT UNUSED" patterns

---

## Token Architecture

### Three-Tier Hierarchy

**Tier 1: Theme Primitives** (`theme.*`)
- Foundation colors: `theme.fg`, `theme.bg`
- Accent hierarchy: `theme.accent`, `theme.secondary`, `theme.tertiary`, `theme.quaternary`
- State colors: `theme.error`, `theme.warning`, `theme.info`, `theme.success`
- Aesthetic primitives: `theme.brutal` (neo-brutalist border width), `theme.shadowColor` (light/dark shadows)
- Accessibility primitives: `theme.touch` (44px WCAG minimum)

**Tier 2: Surface States** (`surface.*`)
- Base backgrounds: `surface.base` (references theme.bg)
- Interactive states: `surface.interactive.base/_hover/_active`
- Pseudo-selector pattern: `_hover`, `_active`, `_focus` (Panda CSS conventions)

**Tier 3: Element Consumers**
- Text: `text.primary` (references theme.fg)
- Icons: `icon.primary` (references theme.accent)
- Borders: `border.default` (references theme.fg)

### Design Principles

1. **Semantic over positional** - Names convey meaning (theme.secondary = 80% opacity), not position
2. **No recursion** - Same-layer tokens don't reference each other
3. **Symmetric progressions** - Light and dark themes use same mixing percentages
4. **Mathematical foundations** - Opacity progressions follow dominant 7th chord (1.0, 0.8, 0.67, 0.57)

### Anti-Patterns

❌ Deep nesting (>3 levels): `theme.color.foreground.primary.default`
✅ Flat with semantic grouping: `theme.fg`

❌ Same-layer recursion: `text.primary: { value: '{colors.text.secondary}' }`
✅ Cross-layer reference: `text.primary: { value: '{colors.theme.fg}' }`

❌ Asymmetric mixing: Light 10%, Dark 15%
✅ Symmetric mixing: Both 10%

---

## Theme Primitives

### Colors (`colors.theme.*`)

**Foundation:**
- `theme.fg` - Foreground (_light: gray.10, _dark: gray.0)
- `theme.bg` - Background (_light: gray.0, _dark: gray.10)

**Accent Hierarchy (Dominant 7th chord):**
- `theme.accent` - Primary accent (100% opacity)
- `theme.secondary` - Secondary accent (80% opacity, ~1.25^-1)
- `theme.tertiary` - Tertiary accent (67% opacity, ~1.5^-1)
- `theme.quaternary` - Quaternary accent (57% opacity, ~1.75^-1)
- `theme.muted` - Muted accent (20% light, 30% dark)
- `theme.disabled` - Disabled state (5% opacity)

**State Colors:**
- `theme.error` - Error state accent
- `theme.warning` - Warning state accent
- `theme.info` - Info state accent
- `theme.success` - Success state accent

### Effects (`effects.theme.*`)

**Shadow Colors:**
- `theme.shadowColor._light` - Light theme shadow color (dark shadows on light bg)
- `theme.shadowColor._dark` - Dark theme shadow color (subtle shadows on dark bg)

### Borders (`borders.theme.*`)

**Aesthetic:**
- `theme.brutal` - Neo-brutalist border width (3px, 3/8 rhythm)

### Sizes (`sizes.theme.*`)

**Accessibility:**
- `theme.touch` - WCAG 2.2 minimum touch target (44px)

---

## Quick Start

### Basic Pattern
```tsx
import { css } from '@styled-system/css'
import { buttonRecipe } from '@styled-system/recipes'

// Pattern 1: Panda css() with semantic tokens
const styles = css({
  bg: 'surface.base',            // Surface states (NEW)
  borderWidth: 'theme.brutal',   // Theme primitives (NEW)
  p: 'inset.normal',             // Spacing: inset/stack/inline
  color: 'text.primary',         // Text hierarchy (references theme.fg)
  fontSize: 'body.default',      // Typography scale
})

// Pattern 2: Recipe with variants
const classes = buttonRecipe({ variant: 'primary', size: 'md' })
```

### Layer Usage Rules
```
Components  → Reference semantic tokens (Layer 3) + recipes (Layer 5)
            → Can reference theme.* when using foundational primitives
            → NEVER reference base tokens (Layer 2) directly
            → NEVER use hard-coded values

Semantic    → Reference theme.* or base tokens
Theme       → Reference base tokens (Layer 2)
Base        → Reference primitives (Layer 1)
Primitives  → Reference constants (Layer 0)
Constants   → Pure mathematics
```

---

## Migration Guide (Dec 2025 Reorganization)

### Token Reference Changes

**Colors:**
- `surface.fg` → `theme.fg`
- `surface.bg` → `theme.bg`
- `accent.primary` → `theme.accent`
- `accent.secondary` → `theme.secondary`
- `accent.tertiary` → `theme.tertiary`
- `text.onPrimary` → `text.inverted` (or `theme.bg` directly)
- `icon.default` → `icon.primary`

**Interactive States:**
- `bg.default` → `surface.base`
- `bg.interactive.default` → `surface.interactive.base`
- `bg.interactive.hover` → `surface.interactive._hover`
- `bg.interactive.active` → `surface.interactive._active`
- `text.interactive.default` → `text.interactive.base`
- `text.interactive.hover` → `text.interactive._hover`
- `text.interactive.active` → `text.interactive._active`

**Theme Primitives (NEW):**
- `brutal` → `theme.brutal` (border width)
- `sizes.touch.min` → `theme.touch` (WCAG touch target)
- Hard-coded shadow colors → `theme.shadowColor._light/_dark`

### Component Update Pattern

**Before:**
```tsx
const styles = css({
  bg: 'bg.default',
  color: 'text.primary',
  borderColor: 'border.default',
  borderWidth: 'brutal',
  _hover: {
    bg: 'bg.hover',
  },
})
```

**After:**
```tsx
const styles = css({
  bg: 'surface.base',                    // NEW
  color: 'text.primary',                 // Still references theme.fg
  borderColor: 'border.default',         // Still references theme.fg
  borderWidth: 'theme.brutal',           // NEW: Theme primitive
  _hover: {
    bg: 'surface._hover',                // NEW: Pseudo-selector pattern
    color: 'text.interactive._hover',    // NEW: Add text color change (CRITICAL)
  },
})
```

### Recipe Update Pattern

**Before:**
```tsx
export const buttonRecipe = defineRecipe({
  base: {
    bg: 'bg.interactive.default',
    color: 'surface.fg',
    borderWidth: 'brutal',
    _hover: {
      bg: 'bg.interactive.hover',
    },
  },
})
```

**After:**
```tsx
export const buttonRecipe = defineRecipe({
  base: {
    bg: 'surface.interactive.base',           // NEW
    color: 'text.interactive.base',           // NEW
    borderWidth: 'theme.brutal',              // NEW: Theme primitive
    _hover: {
      bg: 'surface.interactive._hover',       // NEW
      color: 'text.interactive._hover',       // NEW: CRITICAL for inversion
    },
  },
})
```

### Grep Commands for Finding Old Tokens

```bash
# Find surface.fg/bg references (should be theme.fg/bg now)
grep -r "surface\.fg\|surface\.bg" src/tokens/recipes/ src/components/

# Find accent.* references (should be theme.accent now)
grep -r "accent\." src/tokens/recipes/ src/components/

# Find bg.default references (should be surface.base now)
grep -r "bg\.default" src/tokens/recipes/ src/components/

# Find .default references that should be .base
grep -r "interactive\.default" src/tokens/recipes/ src/components/

# Find .hover/.active that should be ._hover/._active
grep -r "interactive\.hover\|interactive\.active" src/tokens/recipes/ src/components/

# Find brutal references (should be theme.brutal now)
grep -r "borderWidth.*brutal[^.]" src/tokens/recipes/ src/components/

# Find sizes.touch.min (should be theme.touch now)
grep -r "sizes\.touch\.min" src/tokens/recipes/ src/components/
```

### Breaking Changes Summary

**HIGH Priority (Fix Immediately):**
1. `surface.fg/bg` → `theme.fg/bg` (all recipes/components)
2. `accent.primary/secondary/tertiary` → `theme.accent/secondary/tertiary`
3. `bg.default` → `surface.base`
4. `bg.interactive.default` → `surface.interactive.base`
5. Pseudo-selectors: `hover` → `_hover`, `active` → `_active`

**MEDIUM Priority (Fix Soon):**
6. `icon.default` → `icon.primary`
7. `text.onPrimary` → `text.inverted`
8. `brutal` → `theme.brutal` (border width)
9. `sizes.touch.min` → `theme.touch`

**CRITICAL Pattern (Don't Skip):**
- **Always change BOTH `bg` and `color` on hover/active**
- Old: `_hover: { bg: 'bg.hover' }` (missing text color change)
- New: `_hover: { bg: 'surface._hover', color: 'text.interactive._hover' }` (full inversion)

---

## Common Implementation Patterns

### 1. Interactive Element (Button, Tab, Card)

**Base Pattern:**
```tsx
const interactiveStyles = css({
  // Neo-brutalist interactive base
  borderWidth: 'theme.brutal',        // 3px thick border (theme primitive)
  borderStyle: 'solid',
  borderColor: 'border.default',      // References theme.fg
  borderRadius: 'none',               // Zero rounding (neo-brutalist)

  // Fast transitions
  transitionDuration: 'fast',         // 100ms
  transitionProperty: 'all',

  // Background states
  bg: 'surface.interactive.base',     // NEW: Interactive base state

  // Text color
  color: 'text.interactive.base',     // NEW: Interactive text base

  // Hover/active states (FULL COLOR INVERSION)
  _hover: {
    bg: 'surface.interactive._hover',        // NEW: Inverted bg (becomes fg)
    color: 'text.interactive._hover',        // NEW: Inverted text (becomes bg) - CRITICAL
    borderColor: 'border.emphasis',
    boxShadow: 'elevation.floating',        // 8px brutal shadow
  },

  _active: {
    bg: 'surface.interactive._active',       // NEW: Active state
    color: 'text.interactive._active',       // NEW: Active text - CRITICAL
    transform: 'translate(2px, 2px)',       // Brutal press effect
    boxShadow: 'interaction.pressed',       // Inset shadow
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

**Key changes:**
- `bg: 'bg.default'` → `bg: 'surface.interactive.base'`
- `_hover: { bg: 'bg.interactive.hover' }` → `_hover: { bg: 'surface.interactive._hover' }`
- Added `color` changes on hover/active (CRITICAL for proper inversion and dark theme contrast)

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
  bg: 'surface.base',                 // NEW: Base surface state

  // Neo-brutalist borders
  borderWidth: 'theme.brutal',        // NEW: Theme primitive (3px)
  borderStyle: 'solid',
  borderColor: 'border.default',      // References theme.fg
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

**Key changes:**
- `bg: 'bg.elevated'` → `bg: 'surface.base'`
- `borderWidth: 'brutal'` → `borderWidth: 'theme.brutal'` (theme primitive)

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
  minWidth: 'theme.touch',            // NEW: Theme primitive (44px)
  minHeight: 'theme.touch',           // NEW: Theme primitive (44px)

  // Neo-brutalist border
  borderWidth: 'theme.brutal',        // NEW: Theme primitive (3px)
  borderStyle: 'solid',
  borderColor: 'border.default',      // References theme.fg
  borderRadius: 'none',

  // Background
  bg: 'surface.base',                 // NEW: Surface base state

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
  borderWidth: 'theme.brutal',        // NEW: Theme primitive
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

**Key changes:**
- `minWidth/Height: 'sizes.touch.min'` → `'theme.touch'` (theme primitive)
- `borderWidth: 'brutal'` → `borderWidth: 'theme.brutal'` (theme primitive)
- `bg: 'bg.default'` → `bg: 'surface.base'`

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
  borderWidth: 'theme.brutal',
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
  borderWidth: 'theme.brutal',
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
  borderWidth: 'theme.brutal',
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
  borderWidth: 'theme.brutal',
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

**Problem Solved:** Previous hover states used subtle color mixing that created poor contrast (1.00:1 ratio failing WCAG AA) in dark theme.

**Solution:** Complete color inversion on hover for interactive elements:

```tsx
// Default state
const defaultStyles = css({
  bg: 'surface.interactive.base',      // Light in light theme, dark in dark theme
  color: 'text.interactive.base',      // Dark in light theme, light in dark theme
})

// Hover state - COMPLETE INVERSION
const hoverStyles = css({
  _hover: {
    bg: 'surface.interactive._hover',      // Becomes text color
    color: 'text.interactive._hover',      // Becomes background color - CRITICAL
  },
})
```

**Semantic Tokens:**
- `surface.interactive.base` → Default background for interactive surfaces
- `surface.interactive._hover` → Hover background (inverted foreground)
- `surface.interactive._active` → Active background (stronger inversion)
- `text.interactive.base` → Default text for interactive surfaces
- `text.interactive._hover` → Hover text (inverted background) - CRITICAL for dark theme
- `text.interactive._active` → Active text

**Recipe Pattern:**
All recipes (button, tabs, dragHandle) implement BOTH background AND color changes:

```tsx
export const buttonRecipe = defineRecipe({
  base: {
    bg: 'surface.interactive.base',
    color: 'text.interactive.base',
    _hover: {
      bg: 'surface.interactive._hover',     // MUST include both
      color: 'text.interactive._hover',     // for proper inversion (CRITICAL)
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

#### Theme Primitives (NEW - Foundation)
```typescript
// Core relationship (opposites)
theme.fg             // Foreground (_light: gray.10, _dark: gray.0)
theme.bg             // Background (_light: gray.0, _dark: gray.10)

// Accent hierarchy (Dominant 7th chord: 1.0, 0.8, 0.67, 0.57)
theme.accent         // 100% opacity - Primary accent
theme.secondary      // 80%  opacity - Secondary accent
theme.tertiary       // 67%  opacity - Tertiary accent
theme.quaternary     // 57%  opacity - Quaternary accent
theme.muted          // 20%/30% opacity - Muted accent (light/dark)
theme.disabled       // 5%   opacity - Disabled state

// State colors
theme.error          // Error state
theme.warning        // Warning state
theme.info           // Info state
theme.success        // Success state
```

#### Text Hierarchy (References theme.fg)
```typescript
text.primary      // 100% - References theme.fg
text.secondary    // 80%  - References theme.secondary
text.tertiary     // 67%  - References theme.tertiary
text.quaternary   // 57%  - References theme.quaternary
text.disabled     // 25%  - Disabled text

// Interactive text tokens (FULL COLOR INVERSION)
text.interactive.base      // Default interactive text (references theme.fg)
text.interactive._hover    // Hover text (inverts: becomes theme.bg) - CRITICAL
text.interactive._active   // Active text (stronger inversion)
```

#### Surface States (References theme.bg)
```typescript
// Base surface
surface.base         // Main background (references theme.bg)
surface.subtle       // Slightly tinted (50% mix)
surface._hover       // 10% foreground mix (symmetric)
surface._active      // 15% foreground mix (symmetric)

// Interactive surfaces (FULL COLOR INVERSION)
surface.interactive.base      // Default interactive surface (references theme.bg)
surface.interactive._hover    // Hover state (inverts: becomes theme.fg)
surface.interactive._active   // Active state (stronger inversion)

// Elevated surfaces
surface.elevated     // Raised surfaces
surface.overlay      // 40% overlay
```

**Interactive Pattern:** Hover states invert colors completely
- Default: `surface.interactive.base` (= theme.bg) + `text.interactive.base` (= theme.fg)
- Hover: `surface.interactive._hover` (= theme.fg) + `text.interactive._hover` (= theme.bg)

#### Border Colors (Reference theme.fg)
```typescript
border.default       // 100% foreground (references theme.fg)
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

#### Theme Primitives (NEW)
```typescript
theme.brutal          // 3px - Neo-brutalist default width (theme primitive)
```

#### Border Widths (Semantic)
```typescript
borderWidths.hairline         // 1px - Hairline dividers
borderWidths.default          // 4px - Standard border (4/8 base rhythm)
borderWidths.brutal.thick     // 4px - Neo-brutalist medium (4/8 base rhythm)
borderWidths.brutal.extraThick // 5px - Neo-brutalist thick (5/8 base rhythm)
```

**Mathematical Derivation:**
- All border widths derived from base rhythm (8px)
- `theme.brutal`: 3px = 3/8 of base rhythm (theme foundation)
- `brutal.thick`: 4px = 4/8 of base rhythm (semantic variant)
- `brutal.extraThick`: 5px = 5/8 of base rhythm (semantic variant)
- Provides rhythmic consistency with spacing system

**Usage:**
- Use `theme.brutal` for standard neo-brutalist borders (most common)
- Use `brutal.thick/extraThick` for emphasized borders (rare)

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

#### Theme Primitives (NEW)
```typescript
theme.shadowColor._light  // Dark shadow color for light backgrounds
theme.shadowColor._dark   // Subtle shadow color for dark backgrounds
```

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

**Shadow Color System (NEW):**
- **Light theme:** Uses `theme.shadowColor._light` (dark shadows on light backgrounds)
- **Dark theme:** Uses `theme.shadowColor._dark` (subtle shadows on dark backgrounds)
- All shadows use hard edges (0 blur) for neo-brutalist aesthetic
- Shadow colors are theme-aware and invert with light/dark themes

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

#### Theme Primitives (NEW)
```typescript
theme.touch       // 44px - WCAG 2.2 Level AAA touch target (theme primitive)
```

#### Dialog/Modal Sizes (Semantic)
```typescript
sizes.dialog.min      // 320px
sizes.dialog.sm       // 400px
sizes.dialog.default  // 480px
sizes.dialog.lg       // 640px
sizes.dialog.xl       // 800px
```

**Usage:**
- Use `theme.touch` for all interactive elements (buttons, sliders, drag handles)
- Ensures WCAG 2.2 Level AAA compliance (minimum 44×44px touch targets)

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
  bg: 'surface.base',
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
  borderWidth: 'theme.brutal',
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
  bg: 'surface.interactive.base',
  borderWidth: 'default',
  borderStyle: 'solid',
  borderColor: 'border.default',
  borderRadius: 'none',
  cursor: 'pointer',
  transitionDuration: 'fast',
  transitionProperty: 'all',

  _hover: {
    bg: 'surface._hover',
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

// ✅ CORRECT (theme primitives or semantic tokens)
const styles = css({
  borderWidth: 'theme.brutal',  // Theme primitive (recommended)
  p: 'inset.loose',             // Semantic token (Layer 3)
})
```

### 1b. ❌ Don't Use Old Token Names
```tsx
// ❌ WRONG (outdated Dec 2025)
const styles = css({
  bg: 'bg.default',
  color: 'surface.fg',
  borderWidth: 'brutal',
  _hover: {
    bg: 'bg.hover',  // Missing text color change!
  },
})

// ✅ CORRECT (new architecture)
const styles = css({
  bg: 'surface.base',                  // NEW
  color: 'text.primary',               // References theme.fg
  borderWidth: 'theme.brutal',         // NEW: Theme primitive
  _hover: {
    bg: 'surface._hover',              // NEW: Pseudo-selector
    color: 'text.interactive._hover',  // NEW: CRITICAL for inversion
  },
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
  borderWidth: 'theme.brutal',
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
  minWidth: 'theme.touch',   // 44px theme primitive
  minHeight: 'theme.touch',  // 44px theme primitive
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
  borderWidth: 'theme.brutal',        // Thick border (3px)
})
```

### 6. ❌ Don't Skip Text Color Change on Hover (CRITICAL)
```tsx
// ❌ WRONG (dark theme contrast failure)
const buttonStyles = css({
  bg: 'surface.interactive.base',
  color: 'text.interactive.base',
  _hover: {
    bg: 'surface.interactive._hover',  // Only bg changes
    // Missing text color change - causes poor contrast!
  },
})

// ✅ CORRECT (full color inversion)
const buttonStyles = css({
  bg: 'surface.interactive.base',
  color: 'text.interactive.base',
  _hover: {
    bg: 'surface.interactive._hover',
    color: 'text.interactive._hover',  // CRITICAL: Must include text color change
  },
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
- [ ] Use `theme.touch` token
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
- [ ] **CRITICAL:** Hover states must change BOTH bg and text color for proper contrast

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
  borderWidth: 'theme.brutal',
})
<div className={styles}>
```

---

## Quick Reference Summary

### Most Common Tokens (NEW Architecture)
```typescript
// Spacing
p: 'inset.normal'        // 12px padding
gap: 'stack.normal'      // 16px vertical gap
mb: 'stack.tight'        // 4px margin bottom

// Colors (NEW)
bg: 'surface.base'              // Surface base state
color: 'text.primary'           // References theme.fg
borderColor: 'border.default'   // References theme.fg

// Theme Primitives (NEW)
borderWidth: 'theme.brutal'     // 3px neo-brutalist
minWidth: 'theme.touch'         // 44px WCAG touch target

// Typography
fontSize: 'body.default'  // 1rem
fontFamily: 'brutalist'
fontWeight: 'bold'

// Borders
borderRadius: 'none'      // 0 (neo-brutalist)
borderStyle: 'solid'

// Effects
boxShadow: 'elevation.raised'  // 4px hard shadow
opacity: 'disabled'            // 25%

// Transitions
transitionDuration: 'fast'     // 100ms
transitionProperty: 'all'
```

### Most Common Patterns (NEW Architecture)
```typescript
// Interactive element base (NEW) - CRITICAL: Includes text color changes
{
  bg: 'surface.interactive.base',        // NEW
  color: 'text.interactive.base',        // NEW
  borderWidth: 'theme.brutal',           // NEW: Theme primitive
  borderStyle: 'solid',
  borderColor: 'border.default',
  borderRadius: 'none',
  transitionDuration: 'fast',
  transitionProperty: 'all',

  _hover: {
    bg: 'surface.interactive._hover',    // NEW: Full inversion
    color: 'text.interactive._hover',    // NEW: CRITICAL for dark theme contrast
  },

  _active: {
    bg: 'surface.interactive._active',
    color: 'text.interactive._active',   // NEW: CRITICAL
  },
}

// Text label base
{
  textStyle: 'brutalistLabel',
  fontFamily: 'brutalist',
}

// Touch target (accessibility - NEW)
{
  minWidth: 'theme.touch',    // NEW: 44px theme primitive
  minHeight: 'theme.touch',   // NEW: 44px theme primitive
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
- `STYLE.md` (design axioms and principles)
- `.atlas/connector/analysis/logo-designer/variant-pattern-deduplication-analysis-2025-12-23.md` (deduplication analysis)
