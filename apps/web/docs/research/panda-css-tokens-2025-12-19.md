# Panda CSS Tokens

## 1. TOKEN CATEGORIES (24 Total)

**Base Tokens** (defined under `theme.tokens` with `{ value }` structure):

colors, gradients, sizes, spacing, fonts, fontSizes, fontWeights, letterSpacings, lineHeights, radii, borders, borderWidths, shadows, easings, opacity, zIndex, assets, durations, animations, aspectRatios, cursor

**Semantic Tokens** (defined under `theme.semanticTokens`):
- Support same categories as base tokens
- Reference base tokens using `{tokenPath}` syntax
- Support conditional values via `_light`, `_dark`, and custom conditions

---

## 2. TYPE DEFINITIONS

**Structure Requirements:**

All token values must be nested in an object with a `value` key:
```typescript
tokens: {
  colors: {
    brand: { value: '#EA8433' }
  }
}
```

**Generated TypeScript Types:**
```typescript
export type Token = 'colors.green.400' | 'colors.red.400'
export type ColorToken = 'green.400' | 'red.400'
```

**Key Packages:**
- `@pandacss/token-dictionary`: Processes tokens and semantic tokens
- `@pandacss/types`: Contains token type definitions
- `@pandacss/core`: Core utilities relying on token definitions
- Uses `defineConfig` wrapper for TypeScript autocompletion

---

## 3. COMPOSITE VALUE TOKENS

**Base tokens can reference other base tokens for composite CSS values (borders, shadows, gradients).**

This is NOT a layer violation - it's documented Panda CSS behavior for complex CSS properties.

### Two Valid Patterns:

**Simple values:** `{ value: '#ff0000' }` (direct CSS)

**Composite values:** `{ value: '1px solid {colors.red.400}' }` (can reference base tokens)

### Official Examples:

```typescript
// From Panda CSS docs
borders: {
  danger: { value: '1px solid {colors.red.400}' }
}

// Our implementation
gradients: {
  fantasy: {
    void: {
      radial: {
        value: 'radial-gradient(ellipse at center, {colors.fantasy.void.mid} 0%, {colors.fantasy.void.start} 50%, {colors.fantasy.void.end} 100%)'
      }
    }
  }
}
```

**Why this is valid:**
- Both tokens are in base layer (same-layer reference)
- Documented pattern for borders, shadows, gradients
- Panda transforms to CSS variables at build time

---

## 4. NESTING PATTERNS - CRITICAL FINDINGS

### SUPPORTED NESTING DEPTH: 2-3 Levels After Category

**Tokens are DEFINED with nested objects:**
```typescript
tokens: {
  spacing: {
    rhythm: {
      base: { value: '1rem' }
    }
  }
}
```

**Referenced using flat dot-notation paths:**
```typescript
padding: 'token(spacing.rhythm.base)'
// OR
padding: '{spacing.rhythm.base}'
```

### Real-World Examples from Panda's Own Codebase:

**Three-level nesting (most common):**
- `colors.blue.200` (category → color name → shade)
- `colors.red.400` (category → color name → shade)
- `colors.bg.subtle` (category → group → variant)

**Two-level nesting:**
- `sizes.4xl` (category → size value)

### DEFAULT Key Pattern:

```typescript
bg: {
  DEFAULT: { value: '{colors.gray.100}' },
  muted: { value: '{colors.gray.100}' }
}
```
- Access `bg` returns DEFAULT value
- Access `bg.muted` returns nested value

### CRITICAL DISTINCTION:

**Conditionals (_light, _dark) are NOT nesting levels** - they are special sub-values:
```typescript
danger: {
  value: {
    base: '{colors.red}',
    _dark: '{colors.darkred}'
  }
}
```

### ANSWER TO YOUR QUESTION:

**YES, you CAN do `tokens.spacing.rhythm.base`** (one level of nesting after category). Documentation and Panda's own website confirm this pattern is supported and used in production.

---

## 5. BUILT-IN PATTERNS

All layout patterns are built-in - no custom implementation needed.

**Stack/Flex Patterns:** Stack, HStack, VStack, Flex, Wrap
**Grid Patterns:** Grid, GridItem
**Container Pattern:** Container (max-width, margins, padding)
**Utility Patterns:** Box, Center, AspectRatio, Float, Bleed, Divider, Circle, Square, LinkOverlay, VisuallyHidden, cq

All available as both functions and JSX components.

---

## 6. FILE STRUCTURE MAPPING

Based on Panda's 24 token categories, recommended organization:

```
tokens/
  base/
    colors.ts, gradients.ts, spacing.ts, sizes.ts
    typography.ts      # fonts, fontSizes, fontWeights, letterSpacings, lineHeights
    borders.ts         # borders, borderWidths, radii
    effects.ts, animations.ts, layout.ts, assets.ts

  semantic/
    colors.ts, spacing.ts, typography.ts
    # ... other categories as needed

  primitives.ts, constants.ts
```

**Principle:** One file per token category, with semantic overrides for context-specific needs.

---

## 7. PRESET DIFFERENCES

**@pandacss/preset-base:**
- Relatively unopinionated utilities
- Maps CSS properties to values
- Does NOT include default colors or spacing tokens
- ALWAYS included unless `eject: true`

**@pandacss/preset-panda:**
- Opinionated token set
- Includes colors (from Tailwind color palette)
- Includes spacing scale
- Includes font defaults
- Only included by default if no custom `presets` config specified

Both presets are bundled with Panda CSS - no installation needed.

---

## SUMMARY OF KEY FINDINGS

1. **24 token categories** available across base and semantic tokens
2. **Composite value tokens** - Base tokens CAN reference other base tokens for borders, shadows, gradients (documented pattern)
3. **Nesting depth: 2-3 levels** after category is supported (`spacing.rhythm.base` ✓)
4. **Type safety** via `@pandacss/types` with `defineConfig` wrapper
5. **All layout patterns built-in** - Stack, Grid, Container, Flex all available
6. **File structure** should map one-to-one with Panda's token categories
7. **Conditionals are not nesting** - `_dark`, `_light` are value modifiers, not depth levels

---

## Sources

- [Tokens | Panda CSS](https://panda-css.com/docs/theming/tokens)
- [Using Tokens | Panda CSS](https://panda-css.com/docs/theming/usage)
- [Patterns | Panda CSS](https://panda-css.com/docs/concepts/patterns)
- [Configuring Panda | Panda CSS](https://panda-css.com/docs/references/config)
- [Presets | Panda CSS](https://panda-css.com/docs/customization/presets)
- [Multi-Theme Tokens | Panda CSS](https://panda-css.com/docs/guides/multiple-themes)
- [Writing Styles | Panda CSS](https://panda-css.com/docs/concepts/writing-styles)
- [GitHub - chakra-ui/panda](https://github.com/chakra-ui/panda)
- [Panda Semantic Tokens Example](https://github.com/chakra-ui/panda/blob/main/website/theme/semantic-tokens.ts)
- [Panda CHANGELOG.md](https://github.com/chakra-ui/panda/blob/main/CHANGELOG.md)
