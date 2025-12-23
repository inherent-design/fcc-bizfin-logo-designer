# Panda CSS Styles Migration Guide

**Date:** 2025-12-22
**Status:** Complete
**Migration Pattern:** Source definitions → Panda config → Generated utilities

---

## Overview

This guide documents the migration pattern for Panda CSS styles (text styles, layer styles) to use Panda's built-in style system instead of custom implementations.

## Migration Pattern

### 1. Create Style Definitions

**Location:** `src/tokens/styles/`

**Structure:**
```typescript
import { defineTextStyles } from '@pandacss/dev'

export const textStyles = defineTextStyles({
  styleName: {
    value: {
      // CSS properties
    }
  }
})
```

### 2. Export from Tokens Index

**File:** `src/tokens/index.ts`

```typescript
// Layer 4: Styles (text styles, layer styles)
export { textStyles } from './styles/textStyles'
export { layerStyles } from './styles/layerStyles'
```

### 3. Register in Panda Config

**File:** `panda.config.ts`

```typescript
import { defineConfig, defineTextStyles, defineLayerStyles } from '@pandacss/dev'
import { textStyles, layerStyles } from './src/tokens'

export default defineConfig({
  theme: {
    extend: {
      textStyles: defineTextStyles(textStyles),
      layerStyles: defineLayerStyles(layerStyles),
    }
  }
})
```

### 4. Generate Utilities

```bash
pnpm panda codegen
```

### 5. Use in Components

Components use the generated utilities via `css()`:

```typescript
import { css } from '@styled-system/css'

const styles = css({
  textStyle: 'brutalistLabel',  // Text style
  layerStyle: 'surface',        // Layer style
})
```

---

## Style Types

### Text Styles

**Purpose:** Typography patterns (font family, size, weight, etc.)

**File:** `src/tokens/styles/textStyles.ts`

**Available styles:**
- `brutalistLabel` - Uppercase labels with wide spacing
- `sectionHeader` - Section headers
- `formLabel` - Form field labels

**Usage:**
```typescript
const titleStyles = css({
  textStyle: 'brutalistLabel',
  fontSize: 'xl', // Can override individual properties
})
```

### Layer Styles

**Purpose:** Common surface/panel/card styling patterns

**File:** `src/tokens/styles/layerStyles.ts`

**Available styles:**
- `surface` - Base surface (panels, cards, drawers)
- `surfaceElevated` - Elevated surface with shadow
- `surfaceInteractive` - Surfaces that respond to hover/press
- `card` - Compact surface with padding
- `panel` - Larger surface for grouped controls
- `overlay` - Surfaces over other content
- `glass` - Translucent surface with blur

**Usage:**
```typescript
const containerStyles = css({
  layerStyle: 'surface',
  padding: '{spacing.space400}', // Can add additional properties
})
```

### Animation Styles

**Status:** Not needed

**Explanation:**
- Animation **tokens** exist in `src/tokens/base/animations.ts` (durations, easings)
- Animation **styles** are for CSS keyframe definitions
- Currently no keyframe-based animations in design system
- Use animation tokens directly in transition properties

**Current approach:**
```typescript
const buttonStyles = css({
  transition: '{transitions.transitionFast100}', // From tokens
  transitionProperty: 'all',
})
```

---

## Migration Status

### ✅ Text Styles
- **File created:** `src/tokens/styles/textStyles.ts`
- **Registered:** Yes, in `panda.config.ts`
- **Components updated:** Yes, using `css({ textStyle: '...' })`
- **Build status:** ✅ Passing

### ✅ Layer Styles
- **File created:** `src/tokens/styles/layerStyles.ts`
- **Registered:** Yes, in `panda.config.ts`
- **Components updated:** Ready for gradual adoption
- **Build status:** ✅ Passing

### ❌ Animation Styles
- **Status:** Not applicable
- **Reason:** No keyframe-based animations in design system
- **Alternative:** Use animation tokens directly

---

## Component Update Pattern

### Before (inline styles)

```typescript
const containerStyles = css({
  bg: 'surface.bg',
  borderWidth: '{borderWidths.default}',
  borderColor: 'border.default',
  borderRadius: '{radii.md}',
})
```

### After (layer style)

```typescript
const containerStyles = css({
  layerStyle: 'surface',
  // Can still override or add properties
  padding: '{spacing.space400}',
})
```

### Benefits

1. **Consistency:** Same visual pattern across components
2. **Maintainability:** Update in one place, applies everywhere
3. **Performance:** Panda optimizes generated CSS
4. **Type safety:** TypeScript autocomplete for style names
5. **Compression:** Reduces component style verbosity

---

## Files Changed

### Created
- `/src/tokens/styles/layerStyles.ts` - Layer style definitions

### Modified
- `/src/tokens/index.ts` - Export styles from index
- `/panda.config.ts` - Import and register layer styles

### Generated (by Panda)
- `/styled-system/types/composition.d.ts` - TypeScript types
- `/styled-system/types/style-props.d.ts` - Style prop types
- `/styled-system/css/css.mjs` - CSS function implementation

---

## Next Steps

### Optional: Gradual Component Migration

Components can optionally adopt layer styles over time:

1. **High-priority surfaces:** Panels, cards, modals
2. **Interactive surfaces:** Buttons, tabs, controls
3. **Overlays:** Drawers, popovers, tooltips

### Example Migration

**Before:**
```typescript
// DesignThumbnail.tsx
const containerStyles = css({
  position: 'relative',
  borderWidth: 'brutal',
  borderStyle: 'solid',
  borderColor: 'border.default',
  bg: 'surface.bg',
  overflow: 'hidden',
  cursor: 'pointer',
  transitionDuration: 'fast',
  transitionProperty: 'all',
  _hover: {
    transform: 'scale(1.02)',
    borderColor: 'accent.primary',
  },
})
```

**After:**
```typescript
const containerStyles = css({
  layerStyle: 'surfaceInteractive',
  position: 'relative',
  overflow: 'hidden',
  _hover: {
    transform: 'scale(1.02)',
  },
})
```

**Result:**
- 8 properties → 3 properties + layer style
- Reuses consistent surface pattern
- Easier to maintain

---

## References

- **Panda Docs:** https://panda-css.com/docs/concepts/layer-styles
- **Panda Docs:** https://panda-css.com/docs/concepts/text-styles
- **Bootstrap:** `~/.claude/context/logo-designer-bootstrap.md`
- **Recipes Migration:** Similar pattern applied to recipes

---

**Success Criteria:**
1. ✅ All style types registered in `panda.config.ts`
2. ✅ Components can use generated utilities
3. ✅ Build succeeds
4. ✅ TypeScript types generated correctly
5. ✅ No runtime errors

**Result:** All criteria met. Layer styles ready for use.
