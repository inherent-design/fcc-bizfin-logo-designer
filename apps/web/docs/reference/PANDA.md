# Panda CSS Axioms

**Status:** Active
**Date:** 2025-12-19
**Purpose:** Axiomatic truth for Panda CSS architecture and usage

---

## Core Architecture

**Panda CSS is a build-time CSS-in-JS solution** - all styling is transformed to atomic CSS classes at compile time, resulting in zero runtime JavaScript overhead.

**Mental Model:** Write styles in TypeScript → Panda analyzes code → Generates atomic CSS classes → Ships minimal CSS bundle.

**Source:** [Panda CSS Documentation](https://panda-css.com)

---

## Token Categories (24 Total)

**All token categories available in `theme.tokens` and `theme.semanticTokens`:**

1. **colors** - RGB/HSL/hex color values
2. **gradients** - Gradient strings (can reference colors)
3. **sizes** - Width/height dimensional values
4. **spacing** - Margin/padding spacing values
5. **fonts** - Font family stacks
6. **fontSizes** - Font size values
7. **fontWeights** - Font weight numbers (100-900)
8. **letterSpacings** - Letter spacing values
9. **lineHeights** - Line height values (unitless or with units)
10. **radii** - Border radius values
11. **borders** - Border shorthand strings (can reference colors/widths)
12. **borderWidths** - Border width values
13. **shadows** - Box shadow strings (can reference colors)
14. **easings** - Timing function values (cubic-bezier, ease, etc.)
15. **opacity** - Opacity values (0-1)
16. **zIndex** - Z-index integer values
17. **assets** - URL strings for backgrounds/images
18. **durations** - Animation/transition duration values
19. **animations** - Animation shorthand strings
20. **aspectRatios** - Aspect ratio values (16/9, 4/3, etc.)
21. **cursor** - Cursor CSS values
22. **blur** - Blur filter values
23. **breakpoints** - Responsive breakpoint values
24. **containerSizes** - Container query sizes

**Rule:** All token values must use `{ value: 'X' }` structure.

**Source:** [Panda CSS Tokens](https://panda-css.com/docs/theming/tokens)

---

## Token Nesting

**Supported nesting depth:** 2-3 levels after category name.

**Structure:**
```typescript
// Tokens DEFINED with nested objects
tokens: {
  spacing: {
    rhythm: {
      base: { value: '1rem' }
    }
  }
}

// Referenced using flat dot-notation
padding: 'token(spacing.rhythm.base)'
// OR
padding: '{spacing.rhythm.base}'
```

**Common patterns:**
- **3-level:** `colors.blue.200` (category → color → shade)
- **2-level:** `sizes.4xl` (category → value)
- **DEFAULT key:** Access base variant without suffix

**CRITICAL:** Conditionals (`_light`, `_dark`) are NOT nesting levels - they're value modifiers within the `value` object.

**Source:** [Panda CSS Token Usage](https://panda-css.com/docs/theming/usage)

---

## Compound Value Tokens

**Base tokens CAN reference other base tokens in compound CSS strings.**

**Valid use cases:**
- Gradients (multiple colors in string)
- Borders (border shorthand with color reference)
- Shadows (box shadow with color reference)
- Compound backgrounds (multiple backgrounds with tokens)

**Example:**
```typescript
// Valid - compound base token
borders: {
  danger: { value: '1px solid {colors.red.400}' }
}

gradients: {
  hero: {
    value: 'linear-gradient(135deg, {colors.brand.start}, {colors.brand.end})'
  }
}

shadows: {
  md: {
    value: '0 4px 6px -1px {colors.shadow.base}, 0 2px 4px -1px {colors.shadow.light}'
  }
}
```

**Why this is valid:** Both tokens are in base layer (same-layer reference). Panda transforms these to CSS variables at build time.

**Invalid:** Simple aliasing belongs in semantic layer.

```typescript
// Invalid - use semantic tokens for simple references
colors: {
  primary: { value: '{colors.blue.500}' } // ❌
}
```

**Source:** [Panda CSS Borders Documentation](https://panda-css.com/docs/theming/tokens#borders)

---

## Semantic Tokens

**Purpose:** Usage-oriented tokens with theme/conditional logic.

**Supported in same categories as base tokens** - can override any of the 24 token categories.

**Reference syntax:**
```typescript
// Reference base token
{ value: '{colors.gray.100}' }

// Reference semantic token
{ value: '{colors.text.primary}' }

// Raw CSS value (discouraged but valid)
{ value: '#F3F4F6' }
```

**Conditionals:** Semantic tokens support theme-aware values.

**Available conditions:**
- `_light`, `_dark`: Color scheme (prefers-color-scheme)
- `_osLight`, `_osDark`: OS color scheme preference
- `_portrait`, `_landscape`: Orientation
- `_horizontal`, `_vertical`: Data attributes
- Breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`
- Custom data attributes via config

**Example:**
```typescript
semanticTokens: {
  colors: {
    bg: {
      primary: {
        value: {
          base: '{colors.white}',
          _dark: '{colors.gray.900}'
        }
      }
    }
  }
}
```

**Rule:** Conditionals are ordered - `_dark: { _hover: ... }` works, `_hover: { _dark: ... }` may not.

**Source:** [Panda CSS Semantic Tokens](https://panda-css.com/docs/theming/semantic-tokens)

---

## Styles (Layer/Text/Animation)

**Three style types defined in `theme.extend`:**

### Layer Styles

**Purpose:** Reusable surface property bundles (bg, border, shadow, opacity).

**Definition:**
```typescript
import { defineLayerStyles } from '@pandacss/dev'

const layerStyles = defineLayerStyles({
  card: {
    DEFAULT: {
      value: {
        bg: '{colors.bg.raised}',
        border: '1px solid',
        borderColor: '{colors.border.subtle}',
        borderRadius: '{radii.md}',
        boxShadow: '{shadows.sm}'
      }
    },
    elevated: {
      value: {
        bg: '{colors.bg.raised}',
        boxShadow: '{shadows.lg}'
      }
    }
  }
})
```

**Usage:**
```tsx
<div className={css({ layerStyle: 'card' })}>Default card</div>
<div className={css({ layerStyle: 'card.elevated' })}>Elevated card</div>
```

**Avoid:** Layout properties (margin, padding, width), typography, animations.

### Text Styles

**Purpose:** Typography property bundles (font family, size, weight, line-height, letter-spacing).

**Definition:**
```typescript
import { defineTextStyles } from '@pandacss/dev'

const textStyles = defineTextStyles({
  heading: {
    h1: {
      value: {
        fontFamily: '{fonts.heading}',
        fontWeight: '{fontWeights.bold}',
        fontSize: '{fontSizes.3xl}',
        lineHeight: '{lineHeights.tight}'
      }
    }
  }
})
```

**Usage:**
```tsx
<h1 className={css({ textStyle: 'heading.h1' })}>Title</h1>
```

**Avoid:** Colors (use semantic tokens directly), layout properties, backgrounds.

### Animation Styles

**Purpose:** Motion pattern bundles (animation name, duration, timing function).

**Definition:**
```typescript
import { defineAnimationStyles } from '@pandacss/dev'

const animationStyles = defineAnimationStyles({
  fade: {
    DEFAULT: {
      value: {
        animationName: 'fade-in',
        animationDuration: '{durations.normal}',
        animationTimingFunction: '{easings.easeInOut}'
      }
    }
  }
})
```

**Usage:**
```tsx
<div className={css({ animationStyle: 'fade' })}>Fades in</div>
```

**Source:** [Panda CSS Layer Styles](https://panda-css.com/docs/concepts/layer-styles), [Text Styles](https://panda-css.com/docs/concepts/text-styles)

---

## Recipes

**Two recipe types for component variant patterns:**

### Single-Element Recipes (cva)

**Purpose:** Component with one root element and visual variants.

**Definition:**
```typescript
import { cva } from '../styled-system/css'

const button = cva({
  base: {
    fontWeight: '{fontWeights.medium}',
    borderRadius: '{radii.md}',
    cursor: 'pointer'
  },
  variants: {
    variant: {
      solid: {
        bg: '{colors.button.bg.solid}',
        color: 'white'
      },
      outline: {
        bg: 'transparent',
        border: '1px solid',
        borderColor: '{colors.button.border.outline}'
      }
    },
    size: {
      sm: { fontSize: '{fontSizes.sm}', padding: '{spacing.inset.tight}' },
      md: { fontSize: '{fontSizes.md}', padding: '{spacing.inset.normal}' }
    }
  },
  compoundVariants: [
    {
      variant: 'outline',
      size: 'sm',
      css: { borderWidth: '1px' }
    }
  ],
  defaultVariants: {
    variant: 'solid',
    size: 'md'
  }
})
```

**Usage:**
```tsx
<button className={button({ variant: 'outline', size: 'sm' })}>
  Click me
</button>
```

### Multi-Slot Recipes (sva)

**Purpose:** Component with multiple semantic parts needing coordinated styling.

**Definition:**
```typescript
import { sva } from '../styled-system/css'

const card = sva({
  slots: ['root', 'header', 'body', 'footer'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      layerStyle: 'card'
    },
    header: {
      padding: '{spacing.inset.normal}',
      borderBottom: '1px solid {colors.border.subtle}'
    },
    body: {
      padding: '{spacing.inset.comfortable}',
      flex: '1'
    },
    footer: {
      padding: '{spacing.inset.normal}',
      borderTop: '1px solid {colors.border.subtle}'
    }
  },
  variants: {
    variant: {
      elevated: {
        root: { layerStyle: 'card.elevated' }
      }
    }
  },
  defaultVariants: {
    variant: 'elevated'
  }
})
```

**Usage:**
```tsx
const classes = card({ variant: 'elevated' })

<div className={classes.root}>
  <header className={classes.header}>Header</header>
  <div className={classes.body}>Body</div>
  <footer className={classes.footer}>Footer</footer>
</div>
```

**Source:** [Panda CSS Recipes](https://panda-css.com/docs/concepts/recipes)

---

## Built-in Patterns

**All layout patterns are built-in - no custom implementation needed.**

**Available patterns:**
- **Stack/Flex:** Stack, HStack, VStack, Flex, Wrap
- **Grid:** Grid, GridItem
- **Container:** Container (max-width, margins, padding)
- **Utilities:** Box, Center, AspectRatio, Float, Bleed, Divider, Circle, Square, LinkOverlay, VisuallyHidden, cq (container queries)

**Usage:**
```tsx
import { Stack, HStack, Grid, Container } from '../styled-system/jsx'

<Stack gap="4">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>

<Grid columns={3} gap="4">
  <div>Cell 1</div>
  <div>Cell 2</div>
  <div>Cell 3</div>
</Grid>

<Container maxW="container.lg">
  Content
</Container>
```

**All available as both functions and JSX components.**

**Source:** [Panda CSS Patterns](https://panda-css.com/docs/concepts/patterns)

---

## Presets

**Two presets bundled with Panda CSS:**

### @pandacss/preset-base

- Relatively unopinionated utilities
- Maps CSS properties to values
- Does NOT include default colors or spacing tokens
- **ALWAYS included unless `eject: true`**

### @pandacss/preset-panda

- Opinionated token set
- Includes colors (Tailwind color palette)
- Includes spacing scale
- Includes font defaults
- **Only included by default if no custom `presets` config specified**

**Both presets are bundled - no installation needed.**

**Source:** [Panda CSS Presets](https://panda-css.com/docs/customization/presets)

---

## Type Safety

**Panda provides full TypeScript type safety for tokens and styles.**

**Key packages:**
- `@pandacss/token-dictionary`: Processes tokens and semantic tokens
- `@pandacss/types`: Contains token type definitions
- `@pandacss/core`: Core utilities relying on token definitions
- `defineConfig`: Wrapper for TypeScript autocompletion

**Generated types:**
```typescript
export type Token = 'colors.green.400' | 'colors.red.400'
export type ColorToken = 'green.400' | 'red.400'
```

**Usage with `defineConfig` enables full autocomplete in panda.config.ts.**

---

## Conditional Styles

**Panda supports conditional styling based on state, theme, and custom data attributes.**

**State conditions:**
- `_hover`, `_focus`, `_active`, `_disabled`, `_checked`, `_selected`, `_invalid`
- `_focusVisible`, `_focusWithin`
- `_placeholder`, `_placeholderShown`

**Theme conditions:**
- `_light`, `_dark`: Color scheme (prefers-color-scheme)
- `_osLight`, `_osDark`: OS color scheme preference

**Data attribute conditions:**
- `_loading`, `_open`, `_closed`, `_expanded`, `_collapsed`
- `_horizontal`, `_vertical`
- Custom via config

**Breakpoints:**
- Responsive: `sm`, `md`, `lg`, `xl`, `2xl`

**Usage:**
```tsx
css({
  bg: 'white',
  _dark: { bg: 'gray.900' },
  _hover: { bg: 'gray.50' },
  _dark: {
    _hover: { bg: 'gray.800' } // Nested conditionals
  }
})
```

**Source:** [Panda CSS Conditional Styles](https://panda-css.com/docs/concepts/conditional-styles)

---

## Color Opacity Modifier

**Panda supports inline opacity modification using `/` syntax.**

**Syntax:**
```tsx
css({
  bg: 'red.300/40',    // 40% opacity
  color: 'blue.500/50' // 50% opacity
})
```

**Under the hood:** Uses CSS `color-mix()` function.

**Source:** [Panda CSS Color Opacity](https://panda-css.com/docs/concepts/writing-styles#color-opacity-modifier)

---

## What Panda CAN Do

**Build-time CSS generation:**
- Analyzes code for style usage
- Generates atomic CSS classes
- Tree-shakes unused styles
- Zero runtime JavaScript overhead

**Type-safe styling:**
- Full TypeScript autocomplete for tokens
- Type-safe variant props
- Compile-time error checking

**Responsive design:**
- Built-in breakpoints
- Container queries
- Orientation queries

**Theme support:**
- Color scheme detection (light/dark)
- OS preference detection
- Custom data attribute conditions

**Component patterns:**
- Single-element recipes (cva)
- Multi-slot recipes (sva)
- Built-in layout patterns
- Style composition

**Token system:**
- 24 token categories
- Semantic token overrides
- Conditional token values
- Compound value tokens

---

## What Panda CANNOT Do

**Runtime dynamic styles:**
- Cannot compute styles based on runtime data
- Cannot use JavaScript variables in CSS
- Cannot apply styles based on API responses

**Complex selectors:**
- Limited support for complex CSS selectors
- No nth-child() with calculations
- Limited pseudo-element support

**CSS-in-JS features:**
- No styled-components-style tagged templates (by design)
- No CSS prop on arbitrary elements (use css() function)
- No automatic vendor prefixing for experimental features

**Animations:**
- Must define keyframes separately
- Cannot generate keyframes dynamically
- Limited animation composition

**Workarounds exist for many limitations via utilities and custom config.**

---

## Decision Matrix

### When to Create Layer Style

**Use when:**
- Grouping surface properties (bg, border, shadow)
- Multiple properties always appear together
- Variants share most properties but differ in specifics

**Example:** Card variants, button surfaces, panel styles

### When to Create Text Style

**Use when:**
- Grouping typography properties
- Consistent text treatment across components
- Semantic text roles (heading, body, label)

**Example:** Heading hierarchy, body text variants, UI labels

### When to Create Animation Style

**Use when:**
- Grouping animation properties
- Motion patterns used across components
- Conditional animations based on state

**Example:** Fade/slide patterns, modal enter/exit, state transitions

### When to Use Semantic Tokens

**Use when:**
- Single property application
- One-off values that don't form a pattern
- Dynamic values computed at runtime

**Example:** Spacing a specific element, one background color

### When to Create Recipe (cva)

**Use when:**
- Component has one root element
- Variants change visual appearance
- Need compound variants (multiple variant combinations)

**Example:** Button, Badge, Tag, Link

### When to Create Slot Recipe (sva)

**Use when:**
- Component has multiple semantic parts
- Parts need coordinated styling
- Variants affect multiple parts differently

**Example:** Card (header/body/footer), Modal (backdrop/content/header)

### When to Use Built-in Pattern

**Use when:**
- Standard layout needs (stack, grid, flex)
- Common utilities (center, aspect ratio, circle)
- No custom visual treatment needed

**Example:** Simple layouts, spacing containers, alignment

---

## Common Pitfalls

**Nesting depth exceeded:**
- Limit: 2-3 levels after category
- Solution: Flatten structure or use DEFAULT key

**Conditionals not working:**
- Issue: Incorrect condition order
- Solution: Theme conditions before state conditions

**Token reference not resolving:**
- Issue: Typo in token path or missing token
- Solution: Check generated types, verify token exists

**Circular references:**
- Issue: Token A references B, B references A
- Solution: Break cycle, use base token or raw value

**Hard-coded values in components:**
- Issue: Using raw CSS instead of tokens
- Solution: Create semantic token or add to base layer

**Style bundle too large:**
- Issue: Including all styles in bundle
- Solution: Use staticCss config to tree-shake

---

## Sources

**Official Documentation:**
- [Panda CSS](https://panda-css.com)
- [Tokens Guide](https://panda-css.com/docs/theming/tokens)
- [Semantic Tokens](https://panda-css.com/docs/theming/semantic-tokens)
- [Recipes](https://panda-css.com/docs/concepts/recipes)
- [Layer Styles](https://panda-css.com/docs/concepts/layer-styles)
- [Text Styles](https://panda-css.com/docs/concepts/text-styles)
- [Patterns](https://panda-css.com/docs/concepts/patterns)
- [Conditional Styles](https://panda-css.com/docs/concepts/conditional-styles)
- [Presets](https://panda-css.com/docs/customization/presets)

**GitHub:**
- [chakra-ui/panda](https://github.com/chakra-ui/panda)
- [Panda Examples](https://github.com/chakra-ui/panda/tree/main/sandbox)

---

**Document Status:** Active
**Revision Date:** 2025-12-19
**Maintainer:** Design System Team
