# Component Development Guide

**Opinionated file structure for React + TypeScript + Panda CSS components**

---

## Quick Reference

Every component file follows this 8-section structure:

```
1. IMPORTS          → External deps, Panda CSS, types, utils, components
2. TYPES            → Props interfaces, internal types
3. CONSTANTS        → Defaults, config objects (optional)
4. STYLES           → All Panda CSS (css, cva, sva)
5. UTILITIES        → Helper functions (optional)
6. SUB-COMPONENTS   → Internal components (optional)
7. MAIN COMPONENT   → Exported component
8. EXPORTS          → Additional exports (optional)
```

**Visual separators**: Use neo-brutalist ASCII headers (aligns with design system)

---

## The Template

### Minimal Component

```typescript
// ============================================================================
// IMPORTS
// ============================================================================

import { css } from 'styled-system/css'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface ComponentNameProps {
  label: string
  onClick?: () => void
}

// ============================================================================
// STYLES
// ============================================================================

const containerStyles = css({
  p: 'inset.normal',
  border: '{borderWidths.brutal} solid',
  borderColor: 'border',
  bg: 'bg.DEFAULT',
})

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function ComponentName({ label, onClick }: ComponentNameProps) {
  return (
    <div className={containerStyles} onClick={onClick}>
      {label}
    </div>
  )
}
```

### Complex Component (Full Template)

```typescript
// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies (React first, then alphabetical)
import { useState, useEffect, type ReactNode } from 'react'
import { HexColorPicker } from 'react-colorful'

// Panda CSS (styles, recipes, patterns)
import { css, cx, cva } from 'styled-system/css'
import { stack } from 'styled-system/patterns'

// Types (project types, schemas)
import type { HSLColor } from '@/schemas/logoState.schema'

// Utils (alphabetical)
import { hslToHex, parseColorString } from '@/utils/colors'
import { clamp } from '@/utils/math'

// Components (alphabetical, UI components last)
import { ColorPicker } from '@/components/ColorPicker'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface AdvancedColorPickerProps {
  color: HSLColor
  label: string
  onChange: (color: HSLColor) => void
  showAlpha?: boolean
}

interface ColorInputProps {
  value: number
  label: string
  min: number
  max: number
  onChange: (value: number) => void
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_COLOR: HSLColor = { h: 0, s: 100, l: 50 }
const HUE_MAX = 360
const SATURATION_MAX = 100
const LIGHTNESS_MAX = 100

// ============================================================================
// STYLES
// ============================================================================

const pickerContainerStyles = css({
  display: 'grid',
  gap: 'stack.normal',
  p: 'inset.normal',
  border: '{borderWidths.brutal} solid',
  borderColor: 'border',
  bg: 'bg.DEFAULT',
})

const sliderStyles = cva({
  base: {
    width: '100%',
    cursor: 'pointer',
  },
  variants: {
    type: {
      hue: { accentColor: 'accent.primary' },
      saturation: { accentColor: 'accent.secondary' },
      lightness: { accentColor: 'accent.tertiary' },
    },
  },
})

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Clamps a color channel value to its valid range
 */
function clampChannel(value: number, max: number): number {
  return Math.max(0, Math.min(max, Math.round(value)))
}

/**
 * Converts HSL color object to CSS string
 */
function hslToCss(color: HSLColor): string {
  return `hsl(${color.h}, ${color.s}%, ${color.l}%)`
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Color channel slider component
 */
function ColorSlider({ value, label, min, max, onChange }: ColorInputProps) {
  return (
    <div>
      <label>{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className={sliderStyles({ type: label.toLowerCase() as any })}
      />
      <span>{value}</span>
    </div>
  )
}

/**
 * Color preview swatch
 */
function ColorSwatch({ color }: { color: HSLColor }) {
  return (
    <div
      className={css({
        width: '100%',
        height: '4rem',
        borderRadius: 'sm',
        border: '{borderWidths.base} solid',
        borderColor: 'border',
      })}
      style={{ backgroundColor: hslToCss(color) }}
    />
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Advanced color picker with HSL sliders and visual picker
 */
export function AdvancedColorPicker({
  color,
  label,
  onChange,
  showAlpha = false,
}: AdvancedColorPickerProps) {
  const [localColor, setLocalColor] = useState(color)

  useEffect(() => {
    setLocalColor(color)
  }, [color])

  const handleChannelChange = (channel: keyof HSLColor, value: number) => {
    const newColor = { ...localColor, [channel]: value }
    setLocalColor(newColor)
    onChange(newColor)
  }

  return (
    <div className={pickerContainerStyles}>
      <h3>{label}</h3>

      <ColorSwatch color={localColor} />

      <ColorSlider
        value={localColor.h}
        label="Hue"
        min={0}
        max={HUE_MAX}
        onChange={(v) => handleChannelChange('h', v)}
      />

      <ColorSlider
        value={localColor.s}
        label="Saturation"
        min={0}
        max={SATURATION_MAX}
        onChange={(v) => handleChannelChange('s', v)}
      />

      <ColorSlider
        value={localColor.l}
        label="Lightness"
        min={0}
        max={LIGHTNESS_MAX}
        onChange={(v) => handleChannelChange('l', v)}
      />
    </div>
  )
}

// ============================================================================
// EXPORTS
// ============================================================================

export type { AdvancedColorPickerProps }
```

---

## Section Breakdown

### 1. IMPORTS

**Order** (always the same):
1. External dependencies (React first, others alphabetical)
2. Panda CSS imports (css, cva, sva, patterns)
3. Project types and schemas
4. Utility functions (alphabetical)
5. Components (alphabetical, UI components last)

**Example**:
```typescript
// External
import { useState } from 'react'
import { motion } from 'framer-motion'

// Panda CSS
import { css, cva } from 'styled-system/css'
import { flex } from 'styled-system/patterns'

// Types
import type { LogoState } from '@/schemas/logoState.schema'

// Utils
import { clamp } from '@/utils/math'
import { formatColor } from '@/utils/colors'

// Components
import { ColorPicker } from '@/components/ColorPicker'
import { Button, Input } from '@/components/ui'
```

### 2. TYPES & INTERFACES

**Props interfaces always include JSDoc**:
```typescript
/**
 * ColorPickerProps - Props for the ColorPicker component
 */
interface ColorPickerProps {
  /** Current color value in HSL format */
  color: HSLColor

  /** Label displayed above the picker */
  label: string

  /** Callback fired when color changes */
  onChange: (color: HSLColor) => void

  /** Whether to show alpha channel slider */
  showAlpha?: boolean
}
```

**Internal types**:
```typescript
type ColorChannel = 'h' | 's' | 'l' | 'a'

interface InternalState {
  isDragging: boolean
  activeChannel: ColorChannel | null
}
```

### 3. CONSTANTS

**Defaults and configuration**:
```typescript
const DEFAULT_COLOR: HSLColor = { h: 0, s: 100, l: 50 }

const CHANNEL_LIMITS = {
  h: { min: 0, max: 360 },
  s: { min: 0, max: 100 },
  l: { min: 0, max: 100 },
} as const

const PICKER_CONFIG = {
  width: 300,
  height: 200,
  updateDelay: 16, // ~60fps
}
```

### 4. STYLES

**All Panda CSS styling**:

```typescript
// Simple styles
const buttonStyles = css({
  px: 'inset.normal',
  py: 'stack.tight',
  bg: 'accent.primary',
  color: 'text.inverted',
  border: '{borderWidths.brutal} solid',
  cursor: 'pointer',
})

// Component variants (cva)
const badgeStyles = cva({
  base: {
    px: 'inset.tight',
    py: 'stack.tight',
    fontSize: 'xs',
    borderRadius: 'sm',
  },
  variants: {
    variant: {
      primary: { bg: 'accent.primary', color: 'text.inverted' },
      secondary: { bg: 'accent.secondary', color: 'text.inverted' },
      outline: { border: '{borderWidths.base} solid', bg: 'transparent' },
    },
    size: {
      sm: { px: 'inset.tight', fontSize: 'xs' },
      md: { px: 'inset.normal', fontSize: 'sm' },
      lg: { px: 'inset.loose', fontSize: 'md' },
    },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})

// Multi-part components (sva)
const tabsStyles = sva({
  slots: ['root', 'list', 'trigger', 'content'],
  base: {
    root: { width: '100%' },
    list: { display: 'flex', gap: 'inline.tight', borderBottom: '{borderWidths.brutal} solid' },
    trigger: { px: 'inset.normal', py: 'stack.tight', cursor: 'pointer' },
    content: { pt: 'stack.normal' },
  },
})
```

**Key principles**:
- Use semantic tokens (not raw values): `'accent.primary'` not `'#FF6B9D'`
- Use semantic spacing: `'inset.normal'` not `'md'` or `4`
- Use token references for borders: `'{borderWidths.brutal} solid'`
- Group related styles together

### 5. UTILITIES

**Helper functions with JSDoc**:
```typescript
/**
 * Clamps a number between min and max values
 * @param value - The number to clamp
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns Clamped value
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

/**
 * Converts HSL color to CSS string
 */
function hslToCss({ h, s, l }: HSLColor): string {
  return `hsl(${h}, ${s}%, ${l}%)`
}
```

### 6. SUB-COMPONENTS

**Internal components not exported**:
```typescript
/**
 * Color channel slider (internal component)
 */
function ChannelSlider({ channel, value, onChange }: ChannelSliderProps) {
  return (
    <div className={sliderContainerStyles}>
      <label>{channel.toUpperCase()}</label>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
      />
    </div>
  )
}
```

### 7. MAIN COMPONENT

**The exported component**:
```typescript
/**
 * AdvancedColorPicker - Full-featured HSL color picker
 *
 * @example
 * <AdvancedColorPicker
 *   color={{ h: 180, s: 50, l: 50 }}
 *   label="Background Color"
 *   onChange={handleColorChange}
 * />
 */
export function AdvancedColorPicker({
  color,
  label,
  onChange,
  showAlpha = false,
}: AdvancedColorPickerProps) {
  // Component logic here
  return <div>{/* JSX */}</div>
}
```

### 8. EXPORTS

**Optional additional exports**:
```typescript
export type { AdvancedColorPickerProps, ColorChannel }
export { DEFAULT_COLOR, CHANNEL_LIMITS }
```

---

## VS Code Setup

### Snippets

The project includes VS Code snippets in `.vscode/snippets.code-snippets`:

| Trigger | Description |
|---------|-------------|
| `rcp` | Full component template |
| `section` | Neo-brutalist section header |
| `pcss` | Panda CSS style definition |
| `rsub` | Sub-component |
| `rprops` | Props interface with JSDoc |

**Usage**: Type trigger + Tab

### Recommended Extensions

1. **Panda CSS** (`chakra-ui.panda-css-vscode`)
   - Token autocomplete
   - Color preview
   - Go-to-definition

2. **ESLint** (`dbaeumer.vscode-eslint`)
   - Real-time linting
   - Auto-fix on save

3. **Prettier** (`esbenp.prettier-vscode`)
   - Code formatting

### Settings

Add to `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.quickSuggestions": {
    "strings": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

---

## Migration Guide

### Step 1: Add Section Headers

Add visual boundaries without changing code:

```typescript
// ============================================================================
// IMPORTS
// ============================================================================
// ... existing imports ...

// ============================================================================
// TYPES & INTERFACES
// ============================================================================
// ... existing types ...
```

**Time**: 5 minutes per file

### Step 2: Organize Imports

Group and sort imports by category:

```typescript
// Before
import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import { css } from 'styled-system/css'
import { formatColor } from '@/utils/colors'

// After
// External
import { useState } from 'react'

// Panda CSS
import { css } from 'styled-system/css'

// Utils
import { formatColor } from '@/utils/colors'

// Components
import { Button } from '@/components/ui/Button'
```

**Time**: 10 minutes per file

### Step 3: Extract Styles

Move inline `css()` calls to STYLES section:

```typescript
// Before
function Button({ children }) {
  return (
    <button className={css({ px: 4, py: 2, bg: 'primary' })}>
      {children}
    </button>
  )
}

// After
const buttonStyles = css({
  px: 'inset.normal',
  py: 'stack.tight',
  bg: 'accent.primary',
})

function Button({ children }) {
  return <button className={buttonStyles}>{children}</button>
}
```

**Time**: 15-30 minutes per file

### Step 4: Extract Sub-components

Extract repeated JSX patterns:

```typescript
// Before (in main component)
<div className={sliderContainerStyles}>
  <label>Hue</label>
  <input type="range" value={h} onChange={(e) => setH(e.target.value)} />
</div>
<div className={sliderContainerStyles}>
  <label>Saturation</label>
  <input type="range" value={s} onChange={(e) => setS(e.target.value)} />
</div>

// After (extracted sub-component)
function ChannelSlider({ label, value, onChange }) {
  return (
    <div className={sliderContainerStyles}>
      <label>{label}</label>
      <input type="range" value={value} onChange={onChange} />
    </div>
  )
}

// In main component
<ChannelSlider label="Hue" value={h} onChange={handleHueChange} />
<ChannelSlider label="Saturation" value={s} onChange={handleSatChange} />
```

**Time**: 20-40 minutes per file

### Step 5: Add Documentation

Add JSDoc comments:

```typescript
/**
 * AdvancedColorPicker - Full-featured color picker
 * @param color - Current HSL color value
 * @param onChange - Callback when color changes
 */
```

**Time**: 10-15 minutes per file

---

## Best Practices

### Import Organization

✅ **DO**:
```typescript
// Group by category, sort alphabetically within groups
import { useState } from 'react'

import { css } from 'styled-system/css'

import { Button } from '@/components/ui/Button'
```

❌ **DON'T**:
```typescript
// Random order, no grouping
import { Button } from '@/components/ui/Button'
import { css } from 'styled-system/css'
import { useState } from 'react'
```

### Semantic Tokens

✅ **DO**:
```typescript
const buttonStyles = css({
  bg: 'accent.primary',        // Semantic token
  color: 'text.inverted',      // Semantic token
  px: 'inset.normal',          // Semantic spacing
})
```

❌ **DON'T**:
```typescript
const buttonStyles = css({
  bg: '#FF6B9D',               // Raw value
  color: 'white',              // Raw value
  px: 4,                       // Numeric spacing
})
```

### Component Size

✅ **DO**: Keep components under 400 lines
- If larger, extract to separate files:
  - `Component.tsx` (main component)
  - `Component.styles.ts` (styles)
  - `Component.utils.ts` (utilities)
  - `Component.types.ts` (types)

❌ **DON'T**: Create monolithic 1000+ line files

### Naming Conventions

✅ **DO**:
```typescript
// PascalCase for components
function ColorPicker() { }

// camelCase for functions
function formatColor() { }

// SCREAMING_SNAKE_CASE for constants
const MAX_HUE_VALUE = 360
```

---

## Recipe Type Patterns

### RecipeVariantProps with Variants

When a recipe has variants defined, use `RecipeVariantProps` with type intersection:

✅ **DO**:
```typescript
// Button.styles.ts
import { cva, type RecipeVariantProps } from 'styled-system/css'

export const buttonRecipe = cva({
  base: { /* ... */ },
  variants: {
    variant: { primary: {}, secondary: {} },
    size: { sm: {}, md: {}, lg: {} }
  }
})

export type ButtonVariantProps = RecipeVariantProps<typeof buttonRecipe>

// Button.tsx
import type { ComponentProps } from 'react'
import { buttonRecipe, type ButtonVariantProps } from './Button.styles'

// ✅ Use type alias with intersection (&)
type ButtonProps = ComponentProps<'button'> & ButtonVariantProps

export function Button(props: ButtonProps) {
  const [variantProps, restProps] = buttonRecipe.splitVariantProps(props)
  const { className, ...htmlProps } = restProps
  return <button className={cx(buttonRecipe(variantProps), className)} {...htmlProps} />
}
```

❌ **DON'T**:
```typescript
// ❌ Using interface with extends (TypeScript error)
interface ButtonProps extends ComponentProps<'button'>, ButtonVariantProps {}

// ❌ Wrong order (className may not be recognized)
type ButtonProps = ButtonVariantProps & ComponentProps<'button'>

// ❌ Property indexing (defeats type safety)
interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariantProps['variant']
  size?: ButtonVariantProps['size']
}
```

### Recipes Without Variants

When a recipe only has base styles (no variants), skip `RecipeVariantProps` entirely:

✅ **DO**:
```typescript
// Input.styles.ts
import { cva } from 'styled-system/css'

export const inputRecipe = cva({
  base: {
    bg: 'input.bg',
    border: '3px solid',
    borderColor: 'input.border',
    // ... no variants defined
  }
})

// No RecipeVariantProps export needed

// Input.tsx
import type { ComponentProps } from 'react'
import { inputRecipe } from './Input.styles'

// ✅ Just use ComponentProps
type InputProps = ComponentProps<'input'>

export function Input({ className, ...props }: InputProps) {
  return <input className={cx(inputRecipe(), className)} {...props} />
}
```

❌ **DON'T**:
```typescript
// ❌ Exporting RecipeVariantProps when no variants exist
export type InputVariantProps = RecipeVariantProps<typeof inputRecipe>
// Result: InputVariantProps = {} (breaks splitVariantProps)

// ❌ Using splitVariantProps with no variants
const [variantProps, restProps] = inputRecipe.splitVariantProps(props)
// Error: Property 'className' does not exist on type '{}'
```

### Decision Tree

**Has variants defined?**
- ✅ Yes → Use `RecipeVariantProps` + type intersection
- ❌ No → Skip `RecipeVariantProps`, use `ComponentProps` only

**TypeScript pattern?**
- ✅ Type alias: `type Props = ComponentProps<'el'> & VariantProps`
- ❌ Interface extends: `interface Props extends VariantProps`

**Component implementation?**
- With variants → Use `splitVariantProps()`
- Without variants → Destructure props directly

---

## Code Review Checklist

When reviewing component PRs, check:

- [ ] Follows 8-section structure
- [ ] Has visual section separators
- [ ] Imports organized by category
- [ ] All props interfaces have JSDoc
- [ ] Uses semantic tokens (no raw values)
- [ ] Uses semantic spacing (no numeric values)
- [ ] Styles extracted to STYLES section
- [ ] Sub-components extracted if repeated
- [ ] Component under 400 lines
- [ ] TypeScript strict mode compliant
- [ ] RecipeVariantProps used correctly (type alias + intersection)
- [ ] No console.log statements
- [ ] Proper error handling

---

## ESLint Configuration

Add import ordering rules to `.eslintrc.cjs`:

```javascript
module.exports = {
  plugins: ['import'],
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'builtin',       // Node builtins
          'external',      // npm packages
          'internal',      // Aliased paths (@/...)
          'parent',        // ../
          'sibling',       // ./
          'index',         // ./index
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
}
```

---

## Further Reading

### Internal Documentation
- [STYLING.md](../design-system/STYLING.md) - Panda CSS patterns
- [DESIGN_TOKENS.md](../design-system/DESIGN_TOKENS.md) - Token system
- [COMPONENTS.md](../design-system/COMPONENTS.md) - Component library

### External Resources
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Panda CSS Recipes](https://panda-css.com/docs/concepts/recipes)
- [Airbnb React Style Guide](https://airbnb.io/javascript/react/)

---

**Last Updated**: 2025-12-17
**Version**: 1.0
**Status**: Active
