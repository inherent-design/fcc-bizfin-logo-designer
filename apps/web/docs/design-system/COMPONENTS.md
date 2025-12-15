# Component Library

**Project**: FCC Business & Finance Club Logo Designer
**Status**: Active Development
**Last Updated**: 2025-12-14

---

## Document Purpose

This document provides comprehensive documentation for all UI components in the logo designer application, including usage examples, props, patterns, and accessibility considerations.

**Related Documentation**:

- `DESIGN_TOKENS.md` (in this folder) - Design token system reference
- `../architecture/UI_ARCHITECTURE.md` - Component hierarchy and architecture
- `STYLING.md` (in this folder) - Panda CSS patterns and conventions

---

## Component Index

### UI Primitives

- [Button](#button) - Neo-brutalist button component
- [Input](#input) - Neo-brutalist input component
- [Panel](#panel) - Neo-brutalist container component

### Composite Components

- [AdvancedColorPicker](#advancedcolorpicker) - Multi-format color picker
- [Tabs](#tabs) - Tab navigation component

### Domain Components

- [ColorTab](#colortab) - Color customization controls
- [LayoutTab](#layouttab) - Layout adjustment controls
- [ControlPanel](#controlpanel) - Main control panel container

---

## AdvancedColorPicker

**File**: `/apps/web/src/components/AdvancedColorPicker.tsx`

### Overview

A comprehensive color picker component supporting HSL, RGB, and HEX input formats. Features responsive design with mobile modal and desktop inline layouts. Follows neo-brutalist design patterns with semantic token integration.

### Features

- ✅ Multi-format color input (HSL, RGB, HEX)
- ✅ Visual HSL color picker (react-colorful)
- ✅ Type-safe color conversions
- ✅ Responsive layout (mobile modal / desktop inline)
- ✅ Neo-brutalist design tokens
- ✅ Accessible labels and ARIA attributes
- ✅ Real-time color preview

### Props

```typescript
interface AdvancedColorPickerProps {
  color: HSLColor // Current HSL color value
  onChange: (color: HSLColor) => void // Callback when color changes
  label?: string // Optional label for the picker
}

type HSLColor = {
  h: number // Hue: 0-360
  s: number // Saturation: 0-100
  l: number // Lightness: 0-100
}
```

### Usage Examples

#### Basic Usage

```typescript
import { AdvancedColorPicker } from '@/components/AdvancedColorPicker'
import { useState } from 'react'

function MyComponent() {
  const [color, setColor] = useState<HSLColor>({ h: 180, s: 50, l: 50 })

  return (
    <AdvancedColorPicker
      label="Primary Color"
      color={color}
      onChange={setColor}
    />
  )
}
```

#### Integration with Zustand Store

```typescript
import { AdvancedColorPicker } from '@/components/AdvancedColorPicker'
import { useLogoStore } from '@/store/logoStore'

function ColorTab() {
  const baseColor = useLogoStore((state) => state.baseColor)
  const setBaseColor = useLogoStore((state) => state.setBaseColor)

  return (
    <AdvancedColorPicker
      label="Base Color"
      color={baseColor}
      onChange={setBaseColor}
    />
  )
}
```

### Responsive Behavior

#### Mobile (< 1280px)

**Layout**: Modal popover triggered by color preview button

**Interaction**:

1. User taps color preview button (shows current color)
2. Full-screen modal opens with picker + inputs
3. User adjusts color via picker or inputs
4. User taps "Done" button to close modal
5. Color change persists

**Implementation**:

```typescript
{/* Mobile: Color preview button */}
<button
  onClick={() => setIsOpen(!isOpen)}
  className={css({
    display: { base: 'block', desktop: 'none' },
    // ... neo-brutalist button styles
  })}
  style={{ backgroundColor: `hsl(${color.h}, ${color.s}%, ${color.l}%)` }}
  aria-label={`Pick ${label || 'color'}`}
/>

{/* Mobile: Popover */}
{isOpen && (
  <div className={css({
    display: { base: 'flex', desktop: 'none' },
    position: 'fixed',
    inset: 0,
    zIndex: 50,
    bg: 'overlay.backdrop',
  })}>
    <div className={css({
      bg: 'panel.bg',
      border: '{borderWidths.brutal} solid',
      borderColor: 'panel.border',
      // ... modal content
    })}>
      <AdvancedColorPickerContent {...props} />
      <Button onClick={() => setIsOpen(false)}>Done</Button>
    </div>
  </div>
)}
```

#### Desktop (>= 1280px)

**Layout**: Inline two-column grid (picker | inputs)

**Interaction**:

1. User sees picker and inputs side-by-side
2. User adjusts color via picker or inputs
3. Changes apply immediately (no modal)

**Implementation**:

```typescript
{/* Desktop: Inline */}
<div className={css({
  display: { base: 'none', desktop: 'block' },
})}>
  <AdvancedColorPickerContent {...props} />
</div>
```

### Layout Structure

#### Grid System

```typescript
// Main grid: 2 columns on desktop, 1 column on mobile
css({
  display: 'grid',
  gridTemplateColumns: {
    base: '1fr', // Mobile: single column
    md: '1fr 1fr', // Desktop: two columns
  },
  gap: 6,
  maxWidth: '100%', // Prevent overflow
})
```

**Why This Works**:

- ✅ Responsive grid adapts to screen size
- ✅ `maxWidth: '100%'` prevents grid from overflowing parent
- ✅ `minWidth: 0` on grid items allows content to shrink
- ✅ Proper CSS grid syntax (`'1fr 1fr'` not `2`)

#### Column 1: Color Picker

```typescript
<div className={css({
  display: 'flex',
  alignItems: 'start',
  position: 'relative',
  minWidth: 0,  // Allow shrinking below content size
})}>
  <div className={css({
    width: '100%',
    maxWidth: '300px',  // Constrain picker size
    border: '{borderWidths.brutal} solid',
    borderColor: 'component.colorPicker.pickerBorder',
    bg: 'component.colorPicker.pickerBg',
    boxShadow: 'brutalInset',
    p: 3,
  })}>
    <HslColorPicker
      color={toPickerFormat(color)}
      onChange={(newColor) => onChange(fromPickerFormat(newColor))}
      style={{ width: '100%' }}
    />
  </div>
</div>
```

**Key Points**:

- ✅ `maxWidth: '300px'` prevents picker from becoming too large
- ✅ `minWidth: 0` on parent allows flex item to shrink
- ✅ Semantic tokens for borders and background
- ✅ `brutalInset` shadow for neo-brutalist depth

#### Column 2: Input Groups

**HSL Section**:

```typescript
<div className={css({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
})}>
  {/* Section Header */}
  <div className={css({
    fontSize: 'xs',
    fontWeight: 'brutal',
    fontFamily: 'brutalist',
    textTransform: 'uppercase',
    letterSpacing: 'wider',
    color: 'component.colorPicker.labelText',
    pb: 1,
    borderBottom: '{borderWidths.brutal} solid',
    borderColor: 'component.colorPicker.sectionBorder',
  })}>
    HSL
  </div>

  {/* H, S, L Inputs (3-column grid) */}
  <div className={css({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 2,
  })}>
    <div>
      <label>H</label>
      <Input type="number" min={0} max={360} value={color.h} onChange={...} />
    </div>
    <div>
      <label>S</label>
      <Input type="number" min={0} max={100} value={color.s} onChange={...} />
    </div>
    <div>
      <label>L</label>
      <Input type="number" min={0} max={100} value={color.l} onChange={...} />
    </div>
  </div>

  {/* HSL String Input */}
  <Input
    type="text"
    value={hslString}
    onChange={(e) => handleHSLStringChange(e.target.value)}
    placeholder="hsl(360, 100%, 50%)"
  />
</div>
```

**Key Points**:

- ✅ Three-column grid for H, S, L inputs: `'repeat(3, 1fr)'`
- ✅ Section headers use brutal border bottom
- ✅ Labels use uppercase + wide letter spacing
- ✅ String input accepts `hsl(...)` format

**RGB Section**: Same pattern as HSL (R, G, B inputs + `rgb(...)` string)

**HEX Section**:

```typescript
<div className={css({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
})}>
  <div className={css({
    /* Section header styles */
  })}>
    HEX
  </div>
  <Input
    type="text"
    value={hex}
    onChange={(e) => handleHexChange(e.target.value)}
    placeholder="#FF0000"
    maxLength={7}
  />
</div>
```

### Color Conversion Logic

#### HSL to RGB

```typescript
function hslToRgb(hsl: HSLColor): RGBColor {
  const h = hsl.h / 360
  const s = hsl.s / 100
  const l = hsl.l / 100

  // Conversion algorithm...
  return { r, g, b }
}
```

#### RGB to HSL

```typescript
function rgbToHsl(rgb: RGBColor): HSLColor {
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  // Conversion algorithm...
  return { h, s, l }
}
```

#### HSL to HEX

```typescript
function hslToHex(hsl: HSLColor): string {
  const rgb = hslToRgb(hsl)
  return `#${rgb.r.toString(16).padStart(2, '0')}${rgb.g.toString(16).padStart(2, '0')}${rgb.b.toString(16).padStart(2, '0')}`
}
```

#### Parsing Color Strings

```typescript
function parseColorString(value: string): HSLColor | null {
  // Handles:
  // - hsl(180, 50%, 50%)
  // - rgb(128, 200, 255)
  // - #80c8ff
  // - #fff (shorthand)
  // Returns HSLColor or null if invalid
}
```

### Token Usage

The component uses semantic tokens from `component.colorPicker.*`:

```typescript
// Color picker container
border: '{borderWidths.brutal} solid'
borderColor: 'component.colorPicker.pickerBorder' // {colors.panel.border}
bg: 'component.colorPicker.pickerBg' // white

// Section headers
borderColor: 'component.colorPicker.sectionBorder' // {colors.panel.border}
color: 'component.colorPicker.labelText' // {colors.panel.fg}

// Modal backdrop (mobile)
bg: 'overlay.backdrop' // rgba(0, 0, 0, 0.5)
```

**Benefit**: Changing `panel.border` automatically updates all picker borders.

### Accessibility

#### ARIA Labels

```typescript
<button
  aria-label={`Pick ${label || 'color'}`}
  // ...
/>
```

#### Semantic HTML

```typescript
<label className={css({
  fontSize: 'xs',
  fontWeight: '700',
  // ...
})}>
  H
</label>
<Input type="number" min={0} max={360} />
```

#### Keyboard Navigation

- ✅ Tab through inputs in logical order
- ✅ Enter key submits form
- ✅ Escape key closes modal (mobile)
- ✅ Number inputs have min/max constraints

### Performance Considerations

#### Color Conversions

**Problem**: Converting HSL → RGB → HEX on every render

**Solution**: Memoize derived values

```typescript
const rgb = useMemo(() => hslToRgb(color), [color])
const hex = useMemo(() => hslToHex(color), [color])
const hslString = useMemo(() => hslToString(color), [color])
const rgbString = useMemo(() => rgbToString(rgb), [rgb])
```

**Impact**: Reduces unnecessary recalculations when other state changes.

#### Picker Format Conversion

**Problem**: `react-colorful` uses `{ h, s, l }` (numbers), we use `{ h, s, l }` (HSLColor)

**Solution**: Convert only when needed

```typescript
const toPickerFormat = (hsl: HSLColor) => ({ h: hsl.h, s: hsl.s, l: hsl.l })
const fromPickerFormat = (picker: { h: number; s: number; l: number }): HSLColor => ({
  h: Math.round(picker.h),
  s: Math.round(picker.s),
  l: Math.round(picker.l),
})
```

**Impact**: Ensures integer values in store (prevents floating-point drift).

### Common Pitfalls

#### ❌ Invalid Grid Syntax

**Bad**:

```typescript
css({
  display: 'grid',
  gridTemplateColumns: 2, // ❌ Invalid (expects CSS value)
})
```

**Good**:

```typescript
css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)', // ✅ Valid CSS
})
```

#### ❌ Missing Width Constraints

**Bad**:

```typescript
css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  // No maxWidth - grid can overflow
})
```

**Good**:

```typescript
css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  maxWidth: '100%', // ✅ Prevents overflow
})
```

#### ❌ Hardcoded Border Values

**Bad**:

```typescript
css({
  border: '4px solid #000', // ❌ Hardcoded
})
```

**Good**:

```typescript
css({
  border: '{borderWidths.brutal} solid', // ✅ Token reference
  borderColor: 'panel.border',
})
```

### Customization

#### Changing Picker Size

```typescript
// In AdvancedColorPicker.tsx
<div className={css({
  width: '100%',
  maxWidth: '300px',  // Change this value
  // ...
})}>
  <HslColorPicker />
</div>
```

#### Adding New Input Format

**Example**: Add CMYK support

1. **Add conversion functions** (`utils/colors.ts`):

   ```typescript
   export function hslToCmyk(hsl: HSLColor): CMYKColor { ... }
   export function cmykToHsl(cmyk: CMYKColor): HSLColor { ... }
   ```

2. **Add state** (`AdvancedColorPicker.tsx`):

   ```typescript
   const cmyk = cmykFromHsl(color)
   const cmykString = cmykToString(cmyk)
   ```

3. **Add input section**:
   ```typescript
   <div className={css({ /* Section styles */ })}>
     <div>CMYK</div>
     <div className={css({ gridTemplateColumns: 'repeat(4, 1fr)' })}>
       {/* C, M, Y, K inputs */}
     </div>
   </div>
   ```

### Testing

#### Unit Tests

```typescript
describe('AdvancedColorPicker', () => {
  it('renders with initial color', () => {
    const color = { h: 180, s: 50, l: 50 }
    render(<AdvancedColorPicker color={color} onChange={vi.fn()} />)
    // Assert picker renders
  })

  it('calls onChange when color changes', () => {
    const onChange = vi.fn()
    render(<AdvancedColorPicker color={{ h: 0, s: 0, l: 0 }} onChange={onChange} />)
    // Simulate input change
    // Assert onChange called with new color
  })

  it('displays correct HEX value', () => {
    const color = { h: 0, s: 100, l: 50 }  // Red
    render(<AdvancedColorPicker color={color} onChange={vi.fn()} />)
    // Assert HEX input shows "#FF0000"
  })
})
```

#### Visual Regression Tests

```typescript
// Storybook story
export const Default: Story = {
  args: {
    color: { h: 180, s: 50, l: 50 },
    label: 'Primary Color',
  },
}

export const Mobile: Story = {
  args: { ...Default.args },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
}

export const Desktop: Story = {
  args: { ...Default.args },
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
}
```

---

## Button

**File**: `/apps/web/src/components/ui/Button.tsx`

### Overview

Neo-brutalist button component with multiple variants and sizes. Uses the `neoButton` recipe from Panda CSS config.

### Props

```typescript
interface ButtonProps extends ComponentProps<'button'>, NeoButtonVariantProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}
```

### Usage

```typescript
import { Button } from '@/components/ui/Button'

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

### Variants

**Primary** (default):

```typescript
<Button variant="primary">Primary Action</Button>
```

- Background: `neo.primary` (pink)
- Border: 4px solid black
- Shadow: 4px brutal drop shadow
- Hover: Shadow shifts to 2px

**Secondary**:

```typescript
<Button variant="secondary">Secondary Action</Button>
```

- Background: `neo.secondary` (cyan)
- Same border/shadow as primary

**Danger**:

```typescript
<Button variant="danger">Delete</Button>
```

- Background: `neo.warning` (red)
- Used for destructive actions

**Ghost**:

```typescript
<Button variant="ghost">Cancel</Button>
```

- Background: transparent
- Hover: `panel.bg`
- Used for cancel/dismiss actions

### Sizes

```typescript
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>  {/* Default */}
<Button size="lg">Large</Button>
```

### States

**Disabled**:

```typescript
<Button disabled>Disabled Button</Button>
```

- Opacity: 0.5
- Cursor: not-allowed
- No hover effects

**Active** (pressed):

```typescript
<Button>Active</Button>
```

- Shadow: none (pushed in)
- Transform: translate(4px, 4px)

---

## Input

**File**: `/apps/web/src/components/ui/Input.tsx`

### Overview

Neo-brutalist input component for text, number, and other input types. Uses the `neoInput` recipe from Panda CSS config.

### Props

```typescript
interface InputProps extends ComponentProps<'input'>, NeoInputVariantProps {}
```

### Usage

```typescript
import { Input } from '@/components/ui/Input'

<Input
  type="text"
  placeholder="Enter name"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### Input Types

**Text**:

```typescript
<Input type="text" placeholder="Enter text" />
```

**Number**:

```typescript
<Input type="number" min={0} max={100} step={1} />
```

**Password**:

```typescript
<Input type="password" placeholder="Enter password" />
```

### States

**Focus**:

- Outline: 4px solid `neo.accent` (neon green)
- Outline offset: 2px

**Disabled**:

- Background: `form.input.bgDisabled` (#f5f5f5)
- Cursor: not-allowed

---

## Panel

**File**: `/apps/web/src/components/ui/Panel.tsx`

### Overview

Neo-brutalist container component for grouping related content. Uses the `neoPanel` recipe from Panda CSS config.

### Props

```typescript
interface PanelProps extends ComponentProps<'div'>, NeoPanelVariantProps {}
```

### Usage

```typescript
import { Panel } from '@/components/ui/Panel'

<Panel>
  <h2>Panel Title</h2>
  <p>Panel content...</p>
</Panel>
```

### Styling

- Background: `panel.bg`
- Border: 4px solid `panel.border`
- Shadow: 8px brutal drop shadow
- Padding: 16px

---

## Future Components

### Planned Additions

**Slider**:

- Range input with neo-brutalist styling
- Used for element scale adjustments

**Checkbox**:

- Toggle switches for boolean options
- Used for two-tone mode, unique colors

**Tooltip**:

- Contextual help text
- Triggered on hover/focus

**Modal**:

- Full-screen overlay dialogs
- Used for confirmations, warnings

---

## Component Development Guidelines

### Creating New Components

1. **Choose Recipe vs CVA**:
   - **Config Recipe** (panda.config.ts): Shared design system components
   - **Atomic Recipe** (cva in component): One-off component variants

2. **Use Semantic Tokens**:
   - ✅ Reference `panel.*`, `form.*`, `component.*`
   - ❌ Avoid hardcoded hex values or base tokens

3. **Follow splitVariantProps Pattern**:

   ```typescript
   export function Component(props: ComponentProps) {
     const [variantProps, restProps] = recipe.splitVariantProps(props)
     const { className, ...htmlProps } = restProps
     return <element className={cx(recipe(variantProps), className)} {...htmlProps} />
   }
   ```

4. **Add Responsive Breakpoints**:

   ```typescript
   css({
     p: { base: '2', md: '4', lg: '6' },
     gridTemplateColumns: { base: '1fr', md: '1fr 1fr' },
   })
   ```

5. **Document Props and Usage**:
   - Add component to this file
   - Include usage examples
   - Document variants and states

---

## References

**Internal Documentation**:

- `DESIGN_TOKENS.md` (in this folder) - Token system reference
- `../architecture/UI_ARCHITECTURE.md` - Component architecture
- `STYLING.md` (in this folder) - Panda CSS patterns

**External Resources**:

- [Panda CSS Recipes](https://panda-css.com/docs/concepts/recipes)
- [react-colorful](https://github.com/omgovich/react-colorful)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

---

**Document Version**: 1.0
**Status**: Active - covers current component library as of 2025-12-14
**Next Review**: After adding new components or refactoring existing ones
