# React + TypeScript + Panda CSS Component Template

> **Opinionated component file structure for neo-brutalist design systems**
>
> Clear visual separators • Consistent ordering • Easy to scan • VS Code friendly

---

## Table of Contents

1. [Template Structure](#template-structure)
2. [Visual Separator Styles](#visual-separator-styles)
3. [Concrete Example](#concrete-example-advancedcolorpicker)
4. [VS Code Snippets](#vs-code-snippets)
5. [ESLint Rules](#eslint-rules-optional)
6. [Research & References](#research--references)

---

## Template Structure

### Section Order (Always the same)

```typescript
1. IMPORTS
   ├── External dependencies (React, third-party)
   ├── Panda CSS imports
   ├── Internal imports (types, utils, components)
   └── Blank line

2. TYPES & INTERFACES
   ├── Component props interfaces
   ├── Internal types
   ├── Type exports (if needed)
   └── Blank line

3. CONSTANTS & CONFIGURATION
   ├── Default values
   ├── Configuration objects
   └── Blank line

4. STYLES (Panda CSS)
   ├── Style objects (css() calls)
   ├── Recipe variants
   └── Blank line

5. UTILITY FUNCTIONS
   ├── Helper functions
   ├── Data transformations
   └── Blank line

6. SUB-COMPONENTS
   ├── Internal components (not exported)
   ├── Component-specific helpers
   └── Blank line

7. MAIN COMPONENT
   ├── Main exported component
   ├── Component logic
   └── Blank line

8. EXPORTS
   ├── Named exports
   └── Type exports
```

### Import Organization

```typescript
// External dependencies (React first, then alphabetical)
import { useState, useEffect, type ReactNode } from 'react'
import { HslColorPicker } from 'react-colorful'

// Panda CSS (styles, recipes, tokens)
import { css, cx } from 'styled-system/css'
import { stack } from 'styled-system/patterns'

// Types (project types, schemas)
import type { HSLColor } from '@/schemas/logoState.schema'

// Utils (alphabetical)
import { hslToHex, parseColorString } from '@/utils/colors'
import { componentLogger } from '@/utils/logger'

// Components (alphabetical, UI last)
import { ColorPicker } from '@/components/ColorPicker'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
```

---

## Visual Separator Styles

### Option A: Neo-Brutalist ASCII Headers (Recommended)

Bold, direct, impossible to miss. Perfect for neo-brutalist aesthetic.

```typescript
// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface ComponentProps {
  // ...
}

// ============================================================================
// STYLES
// ============================================================================

const buttonStyles = css({
  // ...
})

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function SubComponent() {
  // ...
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function MainComponent() {
  // ...
}
```

**Pros:**

- Maximum visibility
- Aligns with neo-brutalist design philosophy
- Easy to spot when scrolling
- Works well with code minimap

**Cons:**

- Takes up vertical space (3 lines per section)
- Less subtle

---

### Option B: Simple Comment Lines

Clean, minimal, standard approach.

```typescript
// ─────────────────────────────────────────────────────────────────────────────
// Types & Interfaces
// ─────────────────────────────────────────────────────────────────────────────

interface ComponentProps {
  // ...
}

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────

const buttonStyles = css({
  // ...
})
```

**Pros:**

- Clean and professional
- Less vertical space
- Easy to read

**Cons:**

- Less bold than Option A
- Box-drawing characters may not render well in all terminals

---

### Option C: VS Code Region Folding

Collapsible sections, great for large files.

```typescript
//#region Types & Interfaces

interface ComponentProps {
  color: HSLColor
  onChange: (color: HSLColor) => void
  label?: string
}

//#endregion

//#region Styles

const pickerContainerStyles = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: '1fr 1fr' },
  gap: 6,
})

//#endregion

//#region Sub-Components

function ColorInputSection({ label, children }: ColorInputSectionProps) {
  return (
    <div>
      <SectionLabel>{label}</SectionLabel>
      {children}
    </div>
  )
}

//#endregion

//#region Main Component

export function AdvancedColorPicker({ color, onChange, label }: ComponentProps) {
  // Implementation
}

//#endregion
```

**Pros:**

- Native VS Code support
- Collapsible sections
- Clean when collapsed
- Excellent for large files (500+ lines)

**Cons:**

- Not visible when all sections expanded
- Requires VS Code or compatible editor
- Less visual when scrolling through code

---

## Concrete Example: AdvancedColorPicker

### Before (Current - 560 lines)

Current structure is functional but lacks clear visual separation:

- Types mixed with implementation
- No clear style section
- Sub-component buried in middle of file
- Hard to jump to specific sections

### After (With Template)

````typescript
// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import { useState } from 'react'
import { HslColorPicker } from 'react-colorful'

// Panda CSS
import { css } from 'styled-system/css'

// Types
import type { HSLColor } from '@/schemas/logoState.schema'

// Utils
import {
  hslToRgb,
  rgbToHsl,
  hslToHex,
  hslToString,
  rgbToString,
  parseColorString,
  type RGBColor,
} from '@/utils/colors'

// Components
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Main color picker component props
 */
interface AdvancedColorPickerProps {
  /** Current HSL color value */
  color: HSLColor
  /** Callback when color changes */
  onChange: (color: HSLColor) => void
  /** Optional label for the picker */
  label?: string
}

/**
 * Internal content component props
 */
interface AdvancedColorPickerContentProps {
  color: HSLColor
  rgb: RGBColor
  hex: string
  hslString: string
  rgbString: string
  toPickerFormat: (hsl: HSLColor) => { h: number; s: number; l: number }
  fromPickerFormat: (picker: { h: number; s: number; l: number }) => HSLColor
  handleHSLChange: (field: 'h' | 's' | 'l', value: string) => void
  handleHSLStringChange: (value: string) => void
  handleRGBChange: (field: 'r' | 'g' | 'b', value: string) => void
  handleRGBStringChange: (value: string) => void
  handleHexChange: (value: string) => void
  onChange: (color: HSLColor) => void
}

/**
 * Color input section props
 */
interface ColorInputSectionProps {
  label: string
  children: React.ReactNode
}

// ============================================================================
// STYLES
// ============================================================================

const containerStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
})

const labelStyles = css({
  fontSize: 'sm',
  fontWeight: '700',
  fontFamily: 'brutalist',
  color: 'panel.fg',
  display: 'block',
  textTransform: 'uppercase',
  letterSpacing: 'wider',
})

const mobileButtonStyles = css({
  display: { base: 'block', desktop: 'none' },
  width: '100%',
  height: '12',
  border: '{borderWidths.brutal.DEFAULT} solid',
  borderColor: 'panel.border',
  boxShadow: 'brutal',
  cursor: 'pointer',
  transition: 'all 100ms ease-out',
  _hover: {
    transform: 'translate(2px, 2px)',
    boxShadow: '2px 2px 0 {colors.panel.border}',
  },
  _active: {
    transform: 'translate(4px, 4px)',
    boxShadow: 'none',
  },
})

const modalOverlayStyles = css({
  display: { base: 'flex', desktop: 'none' },
  position: 'fixed',
  inset: 0,
  zIndex: 50,
  alignItems: 'center',
  justifyContent: 'center',
  bg: 'overlay.backdrop',
})

const modalContentStyles = css({
  bg: 'panel.bg',
  border: '{borderWidths.brutal.DEFAULT} solid',
  borderColor: 'panel.border',
  boxShadow: 'brutalLg',
  p: 6,
  m: 4,
  maxWidth: 'md',
  width: '100%',
  maxHeight: '90vh',
  overflowY: 'auto',
})

const desktopContainerStyles = css({
  display: { base: 'none', desktop: 'block' },
})

const gridLayoutStyles = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: '1fr 1fr' },
  gap: 6,
  maxWidth: '100%',
})

const pickerColumnStyles = css({
  display: 'flex',
  alignItems: 'start',
  position: 'relative',
  minWidth: 0,
})

const pickerWrapperStyles = css({
  width: '100%',
  maxWidth: '300px',
  border: '{borderWidths.brutal.DEFAULT} solid',
  borderColor: 'component.colorPicker.pickerBorder',
  boxShadow: 'brutalInset',
  p: 3,
  bg: 'component.colorPicker.pickerBg',
})

const inputsColumnStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  minWidth: 0,
})

const sectionContainerStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
})

const sectionHeaderStyles = css({
  fontSize: 'xs',
  fontWeight: 'brutal',
  fontFamily: 'brutalist',
  textTransform: 'uppercase',
  letterSpacing: 'wider',
  color: 'component.colorPicker.labelText',
  pb: 1,
  borderBottom: '{borderWidths.brutal.DEFAULT} solid',
  borderColor: 'component.colorPicker.sectionBorder',
})

const inputGridStyles = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 2,
})

const inputLabelStyles = css({
  fontSize: 'xs',
  fontWeight: '700',
  fontFamily: 'brutalist',
  color: 'panel.fg',
  display: 'block',
  mb: 1,
  textTransform: 'uppercase',
})

const fullWidthInputStyles = css({
  width: '100%',
})

const monoInputStyles = css({
  width: '100%',
  fontFamily: 'mono',
})

const upperMonoInputStyles = css({
  width: '100%',
  fontFamily: 'mono',
  textTransform: 'uppercase',
})

const doneButtonStyles = css({
  mt: 4,
  width: '100%',
})

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Convert our HSLColor to react-colorful format
 */
function toPickerFormat(hsl: HSLColor): { h: number; s: number; l: number } {
  return { h: hsl.h, s: hsl.s, l: hsl.l }
}

/**
 * Convert react-colorful format to our HSLColor
 */
function fromPickerFormat(picker: { h: number; s: number; l: number }): HSLColor {
  return {
    h: Math.round(picker.h),
    s: Math.round(picker.s),
    l: Math.round(picker.l),
  }
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Reusable section label component
 */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className={sectionHeaderStyles}>{children}</div>
}

/**
 * Reusable color input section wrapper
 */
function ColorInputSection({ label, children }: ColorInputSectionProps) {
  return (
    <div className={sectionContainerStyles}>
      <SectionLabel>{label}</SectionLabel>
      {children}
    </div>
  )
}

/**
 * HSL input fields (H, S, L individual inputs + full string)
 */
function HSLInputs({
  color,
  hslString,
  onFieldChange,
  onStringChange,
}: {
  color: HSLColor
  hslString: string
  onFieldChange: (field: 'h' | 's' | 'l', value: string) => void
  onStringChange: (value: string) => void
}) {
  return (
    <ColorInputSection label="HSL">
      <div className={inputGridStyles}>
        <div>
          <label className={inputLabelStyles}>H</label>
          <Input
            type="number"
            min={0}
            max={360}
            value={color.h}
            onChange={(e) => onFieldChange('h', e.target.value)}
            className={fullWidthInputStyles}
          />
        </div>
        <div>
          <label className={inputLabelStyles}>S</label>
          <Input
            type="number"
            min={0}
            max={100}
            value={color.s}
            onChange={(e) => onFieldChange('s', e.target.value)}
            className={fullWidthInputStyles}
          />
        </div>
        <div>
          <label className={inputLabelStyles}>L</label>
          <Input
            type="number"
            min={0}
            max={100}
            value={color.l}
            onChange={(e) => onFieldChange('l', e.target.value)}
            className={fullWidthInputStyles}
          />
        </div>
      </div>
      <Input
        type="text"
        value={hslString}
        onChange={(e) => onStringChange(e.target.value)}
        className={monoInputStyles}
        placeholder="hsl(360, 100%, 50%)"
      />
    </ColorInputSection>
  )
}

/**
 * RGB input fields (R, G, B individual inputs + full string)
 */
function RGBInputs({
  rgb,
  rgbString,
  onFieldChange,
  onStringChange,
}: {
  rgb: RGBColor
  rgbString: string
  onFieldChange: (field: 'r' | 'g' | 'b', value: string) => void
  onStringChange: (value: string) => void
}) {
  return (
    <ColorInputSection label="RGB">
      <div className={inputGridStyles}>
        <div>
          <label className={inputLabelStyles}>R</label>
          <Input
            type="number"
            min={0}
            max={255}
            value={rgb.r}
            onChange={(e) => onFieldChange('r', e.target.value)}
            className={fullWidthInputStyles}
          />
        </div>
        <div>
          <label className={inputLabelStyles}>G</label>
          <Input
            type="number"
            min={0}
            max={255}
            value={rgb.g}
            onChange={(e) => onFieldChange('g', e.target.value)}
            className={fullWidthInputStyles}
          />
        </div>
        <div>
          <label className={inputLabelStyles}>B</label>
          <Input
            type="number"
            min={0}
            max={255}
            value={rgb.b}
            onChange={(e) => onFieldChange('b', e.target.value)}
            className={fullWidthInputStyles}
          />
        </div>
      </div>
      <Input
        type="text"
        value={rgbString}
        onChange={(e) => onStringChange(e.target.value)}
        className={monoInputStyles}
        placeholder="rgb(255, 0, 0)"
      />
    </ColorInputSection>
  )
}

/**
 * HEX input field
 */
function HEXInput({
  hex,
  onChange,
}: {
  hex: string
  onChange: (value: string) => void
}) {
  return (
    <ColorInputSection label="HEX">
      <Input
        type="text"
        value={hex}
        onChange={(e) => onChange(e.target.value)}
        className={upperMonoInputStyles}
        placeholder="#FF0000"
        maxLength={7}
      />
    </ColorInputSection>
  )
}

/**
 * Internal content component - contains the actual color picker UI
 * Shared between mobile modal and desktop inline views
 */
function AdvancedColorPickerContent({
  color,
  rgb,
  hex,
  hslString,
  rgbString,
  handleHSLChange,
  handleHSLStringChange,
  handleRGBChange,
  handleRGBStringChange,
  handleHexChange,
  onChange,
}: AdvancedColorPickerContentProps) {
  return (
    <div className={gridLayoutStyles}>
      {/* Left column: Visual color picker */}
      <div className={pickerColumnStyles}>
        <div className={pickerWrapperStyles}>
          <HslColorPicker
            color={toPickerFormat(color)}
            onChange={(newColor) => onChange(fromPickerFormat(newColor))}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Right column: Input fields */}
      <div className={inputsColumnStyles}>
        <HSLInputs
          color={color}
          hslString={hslString}
          onFieldChange={handleHSLChange}
          onStringChange={handleHSLStringChange}
        />
        <RGBInputs
          rgb={rgb}
          rgbString={rgbString}
          onFieldChange={handleRGBChange}
          onStringChange={handleRGBStringChange}
        />
        <HEXInput hex={hex} onChange={handleHexChange} />
      </div>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * AdvancedColorPicker - Neo-brutalist color picker component
 *
 * Features:
 * - HSL, RGB, and HEX input modes
 * - Responsive: Mobile (modal) / Desktop (inline)
 * - Type-safe color conversions
 * - Neo-brutalist design tokens
 *
 * Layout:
 * - Mobile: Single column, stacked sections with modal overlay
 * - Desktop: Two-column grid (picker | inputs)
 *
 * @example
 * ```tsx
 * <AdvancedColorPicker
 *   label="Primary Color"
 *   color={{ h: 210, s: 100, l: 50 }}
 *   onChange={(color) => setColor(color)}
 * />
 * ```
 */
export function AdvancedColorPicker({ color, onChange, label }: AdvancedColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Convert HSL to other formats for display
  const rgb = hslToRgb(color)
  const hex = hslToHex(color)
  const hslString = hslToString(color)
  const rgbString = rgbToString(rgb)

  // Event handlers
  const handleHSLChange = (field: 'h' | 's' | 'l', value: string) => {
    const numValue = parseInt(value) || 0
    const newColor = { ...color }

    if (field === 'h') {
      newColor.h = Math.max(0, Math.min(360, numValue))
    } else {
      newColor[field] = Math.max(0, Math.min(100, numValue))
    }

    onChange(newColor)
  }

  const handleHSLStringChange = (value: string) => {
    const parsed = parseColorString(value)
    if (parsed) onChange(parsed)
  }

  const handleRGBChange = (field: 'r' | 'g' | 'b', value: string) => {
    const numValue = parseInt(value) || 0
    const clampedValue = Math.max(0, Math.min(255, numValue))
    const newRgb: RGBColor = { ...rgb, [field]: clampedValue }
    onChange(rgbToHsl(newRgb))
  }

  const handleRGBStringChange = (value: string) => {
    const parsed = parseColorString(value)
    if (parsed) onChange(parsed)
  }

  const handleHexChange = (value: string) => {
    const parsed = parseColorString(value)
    if (parsed) onChange(parsed)
  }

  return (
    <div className={containerStyles}>
      {/* Optional label */}
      {label && <label className={labelStyles}>{label}</label>}

      {/* Mobile: Color preview button (opens modal) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={mobileButtonStyles}
        style={{
          backgroundColor: `hsl(${color.h}, ${color.s}%, ${color.l}%)`,
        }}
        aria-label={`Pick ${label || 'color'}`}
      />

      {/* Mobile: Modal overlay */}
      {isOpen && (
        <div className={modalOverlayStyles}>
          <div className={modalContentStyles}>
            <AdvancedColorPickerContent
              color={color}
              rgb={rgb}
              hex={hex}
              hslString={hslString}
              rgbString={rgbString}
              toPickerFormat={toPickerFormat}
              fromPickerFormat={fromPickerFormat}
              handleHSLChange={handleHSLChange}
              handleHSLStringChange={handleHSLStringChange}
              handleRGBChange={handleRGBChange}
              handleRGBStringChange={handleRGBStringChange}
              handleHexChange={handleHexChange}
              onChange={onChange}
            />
            <Button
              onClick={() => setIsOpen(false)}
              variant="primary"
              size="sm"
              className={doneButtonStyles}
            >
              Done
            </Button>
          </div>
        </div>
      )}

      {/* Desktop: Inline view */}
      <div className={desktopContainerStyles}>
        <AdvancedColorPickerContent
          color={color}
          rgb={rgb}
          hex={hex}
          hslString={hslString}
          rgbString={rgbString}
          toPickerFormat={toPickerFormat}
          fromPickerFormat={fromPickerFormat}
          handleHSLChange={handleHSLChange}
          handleHSLStringChange={handleHSLStringChange}
          handleRGBChange={handleRGBChange}
          handleRGBStringChange={handleRGBStringChange}
          handleHexChange={handleHexChange}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
````

### Key Improvements in Refactored Version

1. **Clear Section Boundaries**: Neo-brutalist ASCII headers make it impossible to miss sections
2. **All Styles Grouped**: 15+ style definitions in one place, easy to find and modify
3. **Sub-components Extracted**: HSLInputs, RGBInputs, HEXInput reduce duplication
4. **Better JSDoc**: Main component has comprehensive documentation
5. **Utility Functions**: Color conversion logic separated and named
6. **Type Documentation**: Each interface has JSDoc comments
7. **Scannable**: Can jump to any section in &lt;2 seconds

---

## VS Code Snippets

Add these to your User Snippets (TypeScript React):

### Snippet 1: Full Component Template

```json
{
  "React Component with Panda CSS": {
    "prefix": "rcp",
    "body": [
      "// ============================================================================",
      "// IMPORTS",
      "// ============================================================================",
      "",
      "// External dependencies",
      "import { type ReactNode } from 'react'",
      "",
      "// Panda CSS",
      "import { css } from 'styled-system/css'",
      "",
      "// Types",
      "$1",
      "",
      "// Utils",
      "$2",
      "",
      "// Components",
      "$3",
      "",
      "// ============================================================================",
      "// TYPES & INTERFACES",
      "// ============================================================================",
      "",
      "interface ${4:ComponentName}Props {",
      "  ${5:children: ReactNode}",
      "}",
      "",
      "// ============================================================================",
      "// STYLES",
      "// ============================================================================",
      "",
      "const containerStyles = css({",
      "  ${6:// styles}",
      "})",
      "",
      "// ============================================================================",
      "// MAIN COMPONENT",
      "// ============================================================================",
      "",
      "/**",
      " * ${4:ComponentName} - ${7:Description}",
      " */",
      "export function ${4:ComponentName}({ ${5:children} }: ${4:ComponentName}Props) {",
      "  return (",
      "    <div className={containerStyles}>",
      "      ${0}",
      "    </div>",
      "  )",
      "}"
    ],
    "description": "React component with Panda CSS template"
  }
}
```

### Snippet 2: Section Header

```json
{
  "Section Header": {
    "prefix": "section",
    "body": [
      "// ============================================================================",
      "// ${1:SECTION NAME}",
      "// ============================================================================",
      "",
      "$0"
    ],
    "description": "Neo-brutalist section header"
  }
}
```

### Snippet 3: Style Block

```json
{
  "Panda CSS Style": {
    "prefix": "pcss",
    "body": ["const ${1:name}Styles = css({", "  ${0}", "})"],
    "description": "Panda CSS style object"
  }
}
```

### Snippet 4: Sub-component

```json
{
  "Sub-component": {
    "prefix": "rsub",
    "body": [
      "/**",
      " * ${1:ComponentName} - ${2:Description}",
      " */",
      "function ${1:ComponentName}({ ${3:props} }: ${1:ComponentName}Props) {",
      "  return (",
      "    <div>",
      "      ${0}",
      "    </div>",
      "  )",
      "}"
    ],
    "description": "Internal sub-component"
  }
}
```

### How to Install Snippets

1. Open VS Code
2. `Cmd + Shift + P` → "Preferences: Configure User Snippets"
3. Select "typescriptreact.json"
4. Paste the snippets
5. Save the file

**Usage:**

- Type `rcp` + Tab → Full component template
- Type `section` + Tab → Section header
- Type `pcss` + Tab → Style object
- Type `rsub` + Tab → Sub-component

---

## ESLint Rules (Optional)

### Custom Rule: Enforce Section Order

While there's no built-in ESLint rule for enforcing custom section order, you can use comments as markers and rely on team conventions.

### Recommended ESLint Configurations

```json
{
  "rules": {
    "import/order": [
      "error",
      {
        "groups": [["builtin", "external"], "internal", ["parent", "sibling"], "index"],
        "pathGroups": [
          {
            "pattern": "react",
            "group": "external",
            "position": "before"
          },
          {
            "pattern": "styled-system/**",
            "group": "external",
            "position": "after"
          }
        ],
        "pathGroupsExcludedImportTypes": ["react"],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ],
    "react/jsx-max-depth": ["warn", { "max": 5 }],
    "max-lines-per-function": ["warn", { "max": 100, "skipBlankLines": true, "skipComments": true }]
  }
}
```

### Prettier Configuration

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always"
}
```

---

## Research & References

### React Community Standards

- [React Folder Structure in 5 Steps [2025]](https://www.robinwieruch.de/react-folder-structure/)
- [Guidelines to improve your React folder structure - Max Rozen](https://maxrozen.com/guidelines-improve-react-app-folder-structure)
- [Delightful React File/Directory Structure • Josh W. Comeau](https://www.joshwcomeau.com/react/file-structure/)
- [Effective React TypeScript Project Structure (Medium)](https://medium.com/@tusharupadhyay691/effective-react-typescript-project-structure-best-practices-for-scalability-and-maintainability-bcbcf0e09bd5)

### VS Code Region Folding

- [Region Folding in VS Code – Frontend Masters Blog](https://frontendmasters.com/blog/region-folding-in-vs-code/)
- [Using Regions in VS Code to Organize Your Code | Codú](https://www.codu.co/articles/using-regions-in-vs-code-to-organize-your-code-womhkang)
- [VS Code define a #region - DEV Community](https://dev.to/hurricaneinteractive/vs-code-define-a-region-1cd1)

### Style Guides

- [Airbnb React/JSX Style Guide](https://airbnb.io/javascript/react/)
- [React Style Guide | Firefox Ecosystem Platform](https://mozilla.github.io/ecosystem-platform/reference/style-guides/react-style-guide/)
- [Code Organization & Conventions | Hands on React](https://handsonreact.com/docs/code-organization-conventions)

### Key Principles

1. **One component per file** (Airbnb, community standard)
2. **Colocation** - keep related files together (Josh W. Comeau)
3. **Avoid over-nesting** - max 3-4 folder levels (Max Rozen)
4. **Import organization** - external, internal, types, components (common practice)
5. **TypeScript-first** - use .tsx extension, avoid .d.ts for types (community best practice)

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────────┐
│  COMPONENT FILE STRUCTURE CHEAT SHEET                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. IMPORTS         → External, Panda, Types, Utils, Components │
│  2. TYPES           → Props, Internal types, Exports           │
│  3. CONSTANTS       → Config, defaults                         │
│  4. STYLES          → css(), recipes (Panda CSS)               │
│  5. UTILS           → Helper functions                         │
│  6. SUB-COMPONENTS  → Internal, not exported                   │
│  7. MAIN COMPONENT  → Exported component                       │
│  8. EXPORTS         → Named exports, types                     │
│                                                                 │
│  Neo-brutalist headers: ======================================= │
│  VS Code regions:       //#region ... //#endregion             │
│                                                                 │
│  Max lines per section: ~100 (consider splitting)              │
│  Max file size: ~600 lines (consider splitting)                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Migration Strategy

### For Existing Components

1. **Start with largest files** (500+ lines)
2. **Add section headers** to existing structure first
3. **Extract styles** to STYLES section
4. **Extract sub-components** gradually
5. **Update imports** to follow new order
6. **Add JSDoc** to types and main component

### For New Components

1. **Use VS Code snippet** (`rcp` + Tab)
2. **Fill in sections** in order
3. **Keep styles in STYLES section** from the start
4. **Extract sub-components** when function > 50 lines

---

**Last updated**: 2025-12-15
**Template version**: 1.0.0
**Recommended for**: React 18+, TypeScript 5+, Panda CSS
