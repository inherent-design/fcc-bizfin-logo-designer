# Token System (1rem = 16px)

**Migration Date**: 2025-12-19
**Status**: ✅ Production Ready

---

## Overview

Complete design token system regenerated with the industry-standard `1rem = 16px` assumption (browser default), replacing the deprecated `1rem = 10px` (62.5% base font-size trick).

### Critical Guarantee

**All visual sizes remain pixel-perfect identical.** Only rem unit calculations changed.

---

## Architecture

### 4-Layer Token System

```
Layer 0: constants.ts         → Pure mathematics (ratios, base values)
Layer 1: primitives.ts        → Unitless calculations
Layer 2: base/*               → CSS values with units
Layer 3: semantic/*           → Token references, theme-aware
```

### Design Principles

1. **Musical Ratios**: Just intonation intervals (3:2, 5:4, 6:5, etc.)
2. **Harmonic Series**: Structural spacing (1×, 2×, 3×, 4×, 6×, 8×)
3. **Gestalt Proximity**: Semantic spacing encodes perceptual relationships
4. **Type Safety**: Full TypeScript const assertions and exports

---

## File Structure

```
tokens-new/
├── constants.ts              # Layer 0: Mathematical foundations
├── primitives.ts            # Layer 1: Calculations
├── base/
│   ├── spacing.ts           # Spacing & container sizes
│   ├── typography.ts        # Font families, sizes, weights, line heights
│   ├── borders.ts           # Border widths & radii
│   ├── colors.ts            # Color palettes (neo-brutalist, fantasy)
│   ├── effects.ts           # Shadows, opacity, blur
│   ├── animations.ts        # Durations & easings
│   ├── layout.ts            # Z-index & aspect ratios
│   └── index.ts             # Barrel export
├── semantic/
│   ├── colors.ts            # Semantic color tokens (surface, text, etc.)
│   ├── spacing.ts           # Gestalt spacing (proximity, inset, stack, etc.)
│   └── index.ts             # Barrel export
├── index.ts                 # Main export
├── MIGRATION_VERIFICATION.md # Migration details
├── verify-migration.ts      # Verification script
└── README.md                # This file
```

---

## Usage

### Import Tokens

```typescript
import { baseTokens, semanticTokens } from './src/tokens-new'
```

### Panda CSS Config

```typescript
import { defineConfig } from '@pandacss/dev'
import { baseTokens, semanticTokens } from './src/tokens-new'

export default defineConfig({
  theme: {
    extend: {
      tokens: baseTokens,
      semanticTokens: semanticTokens,
    },
  },
})
```

### Using Tokens in Components

```typescript
import { css } from '../styled-system/css'

// Base tokens (direct values)
const styles = css({
  padding: '{spacing.octave}', // 1rem (16px)
  fontSize: '{fontSizes.typePlus2}', // 1.44rem
  borderRadius: '{radii.md}', // 0.5rem (8px)
})

// Semantic tokens (theme-aware)
const semanticStyles = css({
  padding: '{spacing.inset.normal}', // References {spacing.perfectFifth}
  gap: '{spacing.proximity.related}', // Gestalt proximity
  color: '{colors.text.primary}', // Theme-aware
  backgroundColor: '{colors.surface.bg}', // Inverts in dark mode
})
```

---

## Migration Guide

### Key Changes

| Aspect | OLD (1rem=10px) | NEW (1rem=16px) |
| ------ | --------------- | --------------- |
| Helper | `px / 10`       | `px / 16`       |
| 8px    | `0.8rem`        | `0.5rem`        |
| 16px   | `1.6rem`        | `1.0rem`        |
| 24px   | `2.4rem`        | `1.5rem`        |
| 48px   | `4.8rem`        | `3.0rem`        |

### Verification

Run the verification script to confirm migration success:

```bash
npx tsx src/tokens-new/verify-migration.ts
```

Expected output: All visual sizes identical, only rem values changed.

---

## Token Categories

### Spacing

**Base Layer** (magnitude-based):

- Micro: `micro1` (1px), `micro2` (2px), `micro4` (4px)
- Musical: `base` (8px), `perfectFifth` (12px), `octave` (16px)
- Harmonic: `harmonic2` (16px), `harmonic3` (24px), `harmonic4` (32px), etc.

**Semantic Layer** (purpose-based):

- Proximity: `tight`, `close`, `related`, `separate`, `isolated`, `distant`
- Inset: `tight`, `normal`, `loose`, `spacious`
- Stack: `tight`, `close`, `normal`, `loose`, `spacious`
- Inline: `tight`, `close`, `normal`, `loose`, `spacious`
- Overlap: `slight`, `moderate`, `strong`, `heavy`

### Typography

**Font Sizes**: Minor third scale (1.2 ratio)

- `typeMinus2` → `typeMinus1` → `typeBase` (1rem) → `typePlus1` → `typePlus8`
- Display: `displayBase` (4rem), `displayPlus1` (5rem), `displayPlus2` (6rem)

**Line Heights**: Musical ratios

- `tight` (1.2 - minor third)
- `normal` (1.5 - perfect fifth)
- `relaxed` (1.778 - minor seventh)

### Colors

**Base Layer** (palette-based):

- Neo-brutalist: `fg`, `bg`, `primary`, `secondary`, `accent`, `warning`
- Fantasy: `void`, `aether`, `arcana`, `gold`

**Semantic Layer** (theme-aware):

- Surface: `bg`, `fg` (inverts in dark mode)
- Text: `primary`, `secondary`, `tertiary`, `quaternary`, `disabled`
- Border: `default`, `subtle`, `moderate`, `focus`, `error`, `success`
- Background: `default`, `subtle`, `hover`, `active`, `selected`

### Borders

**Radii**: `none`, `sm` (4px), `md` (8px), `lg` (12px), `xl` (16px), `full`

**Widths**: `hairline` (1px), `thin` (2px), `base` (4px), `medium` (8px), `thick` (12px)

**Brutal**: `sm` (8px), `md` (12px), `lg` (16px) - Neo-brutalist aesthetic

---

## Examples

### Button Component

```typescript
import { css } from '../styled-system/css'

const buttonStyles = css({
  // Spacing
  paddingX: '{spacing.inset.normal}', // 0.75rem (12px)
  paddingY: '{spacing.proximity.close}', // 0.6rem (9.6px)
  gap: '{spacing.proximity.tight}', // ~0.531rem (8.5px)

  // Typography
  fontSize: '{fontSizes.typeBase}', // 1rem (16px)
  fontWeight: '{fontWeights.semibold}', // 600
  lineHeight: '{lineHeights.tight}', // 1.2

  // Colors (theme-aware)
  color: '{colors.text.onPrimary}', // bg color
  backgroundColor: '{colors.bg.primary}', // primary

  // Borders
  borderRadius: '{radii.md}', // 0.5rem (8px)
  borderWidth: '{borderWidths.brutal.sm}', // 0.5rem (8px)
  borderColor: '{colors.border.default}', // fg color

  // Effects
  transition: 'all {durations.fast} {easings.smooth}', // 100ms

  // Interaction states
  _hover: {
    backgroundColor: '{colors.bg.hover}',
  },
  _active: {
    backgroundColor: '{colors.bg.active}',
  },
})
```

### Card Component

```typescript
const cardStyles = css({
  // Container
  padding: '{spacing.inset.loose}', // 1.5rem (24px)

  // Spacing children
  '& > * + *': {
    marginTop: '{spacing.stack.normal}', // 1rem (16px)
  },

  // Colors
  backgroundColor: '{colors.surface.bg}',
  color: '{colors.text.primary}',
  borderColor: '{colors.border.subtle}',

  // Borders
  borderRadius: '{radii.lg}', // 0.75rem (12px)
  borderWidth: '{borderWidths.hairline}', // 1px

  // Effects
  boxShadow: '{shadows.brutal.md}', // 0.5rem offset, no blur
})
```

---

## Technical Details

### pxToRem Conversion

```typescript
// Current implementation (1rem = 16px)
const pxToRem = (px: number): string => `${px / 16}rem`

// Examples
pxToRem(8) // "0.5rem"
pxToRem(16) // "1rem"
pxToRem(24) // "1.5rem"
pxToRem(48) // "3rem"
```

### Musical Ratio Calculations

```typescript
// Just intonation ratios (simple fractions)
const ratios = {
  minorThird: 6 / 5, // 1.2
  majorThird: 5 / 4, // 1.25
  perfectFifth: 3 / 2, // 1.5
  octave: 2 / 1, // 2.0
}

// Applied to base spacing (8px)
const spacing = {
  minorThird: 8 * 1.2, // 9.6px → 0.6rem
  perfectFifth: 8 * 1.5, // 12px → 0.75rem
  octave: 8 * 2, // 16px → 1rem
}
```

### Harmonic Series

```typescript
// Integer multiples of fundamental (8px)
const harmonic = {
  fundamental: 8 * 1, // 8px
  second: 8 * 2, // 16px
  third: 8 * 3, // 24px
  fourth: 8 * 4, // 32px
  sixth: 8 * 6, // 48px
  eighth: 8 * 8, // 64px
}
```

---

## References

### Documentation

- **Migration Verification**: `./MIGRATION_VERIFICATION.md`
- **Verification Script**: `./verify-migration.ts`
- **Design System Report**: `~/.atlas/integrator-reports/token-system-redesign-2025-12-19.md`
- **Panda CSS Guide**: `../docs/research/panda-css-tokens-2025-12-19.md`

### External Resources

- [Just Intonation (Wikipedia)](https://en.wikipedia.org/wiki/Just_intonation)
- [Harmonic Series (Wikipedia)](<https://en.wikipedia.org/wiki/Harmonic_series_(music)>)
- [Gestalt Principles](https://www.interaction-design.org/literature/topics/gestalt-principles)
- [Panda CSS Tokens](https://panda-css.com/docs/theming/tokens)

---

## Status

✅ **Migration Complete**
✅ **Verification Passed**
✅ **Production Ready**

All visual sizes pixel-perfect identical. Token system ready for integration with Panda CSS.

---

**Last Updated**: 2025-12-19
