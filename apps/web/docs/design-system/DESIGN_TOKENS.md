# Design Token System

**Project**: FCC Business & Finance Club Logo Designer
**Status**: Active Development
**Last Updated**: 2025-12-14

---

## Document Purpose

This document provides a comprehensive guide to the design token system used in the logo designer application. It covers token taxonomy, naming conventions, usage patterns, and anti-patterns to avoid.

**Related Documentation**:

- `STYLING.md` (in this folder) - Panda CSS fundamentals and design patterns
- `../architecture/UI_ARCHITECTURE.md` - Component hierarchy and state management
- `../development/STYLE_DEV.md` - Development workflow and tooling

---

## Token Philosophy

### Design Primitives vs Semantic Tokens

The token system follows a **two-tier hierarchy** that separates design concerns from programmatic implementation:

**Tier 1: Design Primitives (Base Tokens)**

- Raw values for colors, spacing, typography, shadows
- Named by **visual characteristics** (neo.primary, fantasy.gold)
- Changed when updating the **visual design language**
- Examples: `neo.accent`, `fantasy.void.start`, `borderWidths.brutal`

**Tier 2: Semantic Tokens**

- Context-aware references to base tokens
- Named by **functional purpose** (panel.bg, form.input.border)
- Changed when refactoring **component patterns**
- Examples: `panel.border`, `component.colorPicker.pickerBg`

### Why This Separation Matters

**Example Scenario**: Rebranding from neo-brutalism to glassmorphism

**Without Semantic Tokens** (Bad):

```typescript
// Every component hardcodes base tokens
<div className={css({ bg: 'neo.bg', border: 'brutal', color: 'neo.fg' })} />

// Rebrand requires changing 100+ components
<div className={css({ bg: 'glass.bg', border: 'glass', color: 'glass.fg' })} />
```

**With Semantic Tokens** (Good):

```typescript
// Components reference semantic tokens
<div className={css({ bg: 'panel.bg', border: 'panel.border', color: 'panel.fg' })} />

// Rebrand requires changing only panda.config.ts
semanticTokens: {
  colors: {
    panel: {
      bg: { value: '{colors.glass.bg}' },  // Changed from neo.bg
      border: { value: '{colors.glass.border}' },
      fg: { value: '{colors.glass.fg}' }
    }
  }
}
```

**Result**: Design language changes propagate automatically to all components.

---

## Token Taxonomy

### Base Tokens (Design Primitives)

#### Colors

**Neo-Brutalist Palette** (`colors.neo.*`)

```typescript
neo: {
  fg: { value: '#000000' },         // Black text/borders
  bg: { value: '#fef6e4' },         // Cream background
  primary: { value: '#f582ae' },     // Pink accent
  secondary: { value: '#8bd3dd' },   // Cyan accent
  accent: { value: '#00FF00' },      // Neon green highlight
  warning: { value: '#ff6b6b' },     // Red warning
}
```

**Usage**: Control panels, UI overlays, buttons, inputs

**High-Fantasy Palette** (`colors.fantasy.*`)

```typescript
fantasy: {
  void: {
    start: { value: '#0a0514' },    // Deep purple (gradient start)
    mid: { value: '#0f0820' },      // Mid purple (gradient center)
    end: { value: '#1a0f2e' },      // Rich purple (gradient end)
  },
  arcana: {
    primary: { value: '#a78bfa' },   // Mystical purple
    secondary: { value: '#60a5fa' }, // Celestial blue
    tertiary: { value: '#34d399' },  // Nature green
    glow: { value: 'rgba(167, 139, 250, 0.3)' }, // Purple glow
  },
  gold: {
    base: { value: '#d7913a' },      // Rich gold
    dark: { value: '#5f4c0c' },      // Dark bronze
    shimmer: { value: '#ffd700' },   // Bright gold highlight
  },
}
```

**Usage**: World background, logo accents, mystical effects

#### Border Widths

```typescript
borderWidths: {
  brutal: { value: '4px' },  // Standard neo-brutalist border
}
```

**Usage**: All neo-brutalist component borders

#### Shadows

```typescript
shadows: {
  brutal: { value: '4px 4px 0 #000000' },           // Standard drop shadow
  brutalLg: { value: '8px 8px 0 #000000' },         // Large drop shadow
  brutalInset: { value: 'inset 2px 2px 0 rgba(0,0,0,0.2)' }, // Inset shadow
}
```

**Usage**: Neo-brutalist depth effects (no blur, solid offsets)

#### Typography

```typescript
fonts: {
  brutalist: { value: 'Space Grotesk, system-ui, sans-serif' },
}

fontWeights: {
  brutal: { value: '900' },  // Ultra-bold for headers
}
```

**Usage**: All neo-brutalist text (controls, labels, buttons)

#### Blur Effects

```typescript
blurs: {
  glass: { value: '12px' },  // Glassmorphism backdrop blur
}
```

**Usage**: Future glassmorphism overlays (not currently used)

---

### Semantic Tokens (Programmatic)

#### Panel Tokens (`panel.*`)

**Purpose**: Neo-brutalist control panels (ControlPanel, DesignGalleryDrawer)

```typescript
panel: {
  bg: { value: '{colors.neo.bg}' },          // Panel background
  fg: { value: '{colors.neo.fg}' },          // Panel text color
  border: { value: '{colors.neo.fg}' },      // Panel border color
  primary: { value: '{colors.neo.primary}' },   // Primary accent
  secondary: { value: '{colors.neo.secondary}' }, // Secondary accent
  accent: { value: '{colors.neo.accent}' },     // Highlight color
  warning: { value: '{colors.neo.warning}' },   // Error/warning color
}
```

**Usage Pattern**:

```typescript
<div className={css({
  bg: 'panel.bg',
  border: '{borderWidths.brutal} solid',
  borderColor: 'panel.border',
  color: 'panel.fg',
})} />
```

#### World Tokens (`world.*`)

**Purpose**: High-fantasy 3D world background

```typescript
world: {
  bg: {
    value: 'radial-gradient(ellipse at center, {colors.fantasy.void.mid} 0%, {colors.fantasy.void.start} 50%, {colors.fantasy.void.end} 100%)',
  },
  glow: { value: '{colors.fantasy.arcana.glow}' },
}
```

**Usage Pattern**:

```typescript
<div className={css({
  bg: 'world.bg',
  boxShadow: '0 0 100px {colors.world.glow}',
})} />
```

#### Logo Tokens (`logo.*`)

**Purpose**: Logo accent colors (floating logo in world)

```typescript
logo: {
  gold: { value: '{colors.fantasy.gold.base}' },      // Gold shield/laurel
  accent: { value: '{colors.fantasy.arcana.primary}' }, // Mystical highlights
}
```

**Usage Pattern**:

```typescript
// Applied via SVG color manipulation
const logoColors = {
  shield: token('colors.logo.gold'),
  glow: token('colors.logo.accent'),
}
```

#### Overlay Tokens (`overlay.*`)

**Purpose**: Modal backdrops, drawer overlays, dimming layers

```typescript
overlay: {
  backdrop: { value: 'rgba(0, 0, 0, 0.5)' },  // Standard modal backdrop
  light: { value: 'rgba(0, 0, 0, 0.3)' },     // Subtle dimming
  heavy: { value: 'rgba(0, 0, 0, 0.7)' },     // Strong dimming
}
```

**Usage Pattern**:

```typescript
// Mobile color picker popover
<div className={css({
  position: 'fixed',
  inset: 0,
  bg: 'overlay.backdrop',
  zIndex: 50,
})} />
```

#### Component State Tokens (`component.*`)

**Purpose**: Component-specific state variations

**Tabs** (`component.tab.*`)

```typescript
component: {
  tab: {
    bg: { value: 'transparent' },        // Inactive tab background
    bgActive: { value: 'white' },        // Active tab background
    bgHover: { value: '{colors.panel.bg}' }, // Hover tab background
    text: { value: '{colors.panel.fg}' },    // Tab text color
    textActive: { value: '{colors.panel.fg}' }, // Active tab text
  },
}
```

**Color Picker** (`component.colorPicker.*`)

```typescript
component: {
  colorPicker: {
    pickerBg: { value: 'white' },                          // Picker container background
    pickerBorder: { value: '{colors.panel.border}' },      // Picker border
    sectionBorder: { value: '{colors.panel.border}' },     // Section divider border
    labelText: { value: '{colors.panel.fg}' },             // Label text color
  },
}
```

**Usage Pattern**:

```typescript
// Tab component
<button className={css({
  bg: isActive ? 'component.tab.bgActive' : 'component.tab.bg',
  color: 'component.tab.text',
  _hover: { bg: 'component.tab.bgHover' },
})} />

// Color picker section
<div className={css({
  borderBottom: '{borderWidths.brutal} solid',
  borderColor: 'component.colorPicker.sectionBorder',
  color: 'component.colorPicker.labelText',
})} />
```

#### Form Tokens (`form.*`)

**Purpose**: Form inputs, textareas, select elements

```typescript
form: {
  input: {
    bg: { value: 'white' },                       // Input background
    bgDisabled: { value: '#f5f5f5' },            // Disabled input background
    border: { value: '{colors.panel.border}' },   // Input border
    borderFocus: { value: '{colors.neo.accent}' }, // Focused input border
  },
}
```

**Usage Pattern**:

```typescript
<input className={css({
  bg: 'form.input.bg',
  border: '{borderWidths.brutal} solid',
  borderColor: 'form.input.border',
  _focus: {
    outline: '{borderWidths.brutal} solid',
    outlineColor: 'form.input.borderFocus',
  },
  _disabled: {
    bg: 'form.input.bgDisabled',
  },
})} />
```

---

## Naming Conventions

### Base Token Naming

**Pattern**: `{category}.{subcategory?}.{variant}`

**Examples**:

- `colors.neo.primary` - Neo palette, primary color
- `colors.fantasy.void.start` - Fantasy palette, void subcategory, gradient start
- `borderWidths.brutal` - Border widths category, brutal variant
- `shadows.brutalLg` - Shadows category, large brutal variant

**Rules**:

- Use **descriptive visual names** (neo, fantasy, brutal, glass)
- Avoid **functional names** (button, panel, input) in base tokens
- Use **camelCase** for multi-word names (brutalLg, not brutal-lg)

### Semantic Token Naming

**Pattern**: `{domain}.{element?}.{property}`

**Examples**:

- `panel.bg` - Panel domain, background property
- `panel.border` - Panel domain, border property
- `component.tab.bgActive` - Component domain, tab element, active background
- `form.input.borderFocus` - Form domain, input element, focused border

**Rules**:

- Use **functional domain names** (panel, world, logo, form)
- Nest by **specificity** (component.tab.bgActive, not component.tabBgActive)
- Use **property suffixes** (bg, fg, border, text)
- Use **state suffixes** (Active, Hover, Focus, Disabled)

---

## Token Usage Patterns

### Responsive Token Values

Semantic tokens can define different values per breakpoint or theme:

```typescript
semanticTokens: {
  colors: {
    panel: {
      bg: {
        value: {
          base: '{colors.neo.bg}',        // Light mode
          _dark: '{colors.neo.bgDark}',   // Dark mode
        },
      },
    },
  },
}
```

**Component Usage**:

```typescript
<div className={css({
  bg: 'panel.bg',  // Auto-switches based on theme
})} />
```

### Token References

Semantic tokens reference base tokens using **curly brace syntax**:

```typescript
semanticTokens: {
  colors: {
    panel: {
      border: { value: '{colors.neo.fg}' },  // ✅ Reference
    },
  },
}
```

**Invalid syntax**:

```typescript
// ❌ Direct value (breaks token contract)
border: {
  value: '#000000'
}

// ❌ Missing curly braces
border: {
  value: 'colors.neo.fg'
}
```

### Token Composition

Tokens can reference other semantic tokens:

```typescript
semanticTokens: {
  colors: {
    panel: {
      border: { value: '{colors.neo.fg}' },
    },
    component: {
      colorPicker: {
        // ✅ Reference another semantic token
        pickerBorder: { value: '{colors.panel.border}' },
      },
    },
  },
}
```

**Benefit**: Changing `panel.border` automatically updates `component.colorPicker.pickerBorder`.

---

## Anti-Patterns to Avoid

### ❌ Hardcoding Base Token Values in Components

**Bad**:

```typescript
<div className={css({
  bg: 'neo.bg',          // Directly using base token
  border: '4px solid',
  borderColor: 'neo.fg',
})} />
```

**Good**:

```typescript
<div className={css({
  bg: 'panel.bg',                        // Using semantic token
  border: '{borderWidths.brutal} solid',
  borderColor: 'panel.border',
})} />
```

**Why**: Components should reference semantic tokens so design changes propagate automatically.

### ❌ Inline Style Values

**Bad**:

```typescript
<div className={css({
  bg: '#fef6e4',      // Hardcoded hex value
  border: '4px solid #000',
  boxShadow: '4px 4px 0 #000',
})} />
```

**Good**:

```typescript
<div className={css({
  bg: 'panel.bg',
  border: '{borderWidths.brutal} solid',
  borderColor: 'panel.border',
  boxShadow: 'brutal',
})} />
```

**Why**: Inline values bypass the token system, causing design drift.

### ❌ Mixing Token Tiers

**Bad**:

```typescript
<div className={css({
  bg: 'panel.bg',      // Semantic token ✅
  color: 'neo.fg',     // Base token ❌
  border: '#000',      // Inline value ❌
})} />
```

**Good**:

```typescript
<div className={css({
  bg: 'panel.bg',      // All semantic tokens
  color: 'panel.fg',
  borderColor: 'panel.border',
})} />
```

**Why**: Consistent abstraction level makes refactoring predictable.

### ❌ Functional Names in Base Tokens

**Bad**:

```typescript
tokens: {
  colors: {
    buttonPrimary: { value: '#f582ae' },  // Functional name in base tokens
    panelBorder: { value: '#000000' },
  },
}
```

**Good**:

```typescript
tokens: {
  colors: {
    neo: {
      primary: { value: '#f582ae' },  // Visual name
      fg: { value: '#000000' },
    },
  },
}

semanticTokens: {
  colors: {
    panel: {
      border: { value: '{colors.neo.fg}' },  // Functional name in semantic tokens
    },
  },
}
```

**Why**: Base tokens describe **visual characteristics**, semantic tokens describe **functional purpose**.

### ❌ Invalid Grid Template Syntax

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

// Or responsive:
css({
  display: 'grid',
  gridTemplateColumns: {
    base: '1fr', // Mobile: single column
    md: 'repeat(2, 1fr)', // Desktop: two columns
  },
})
```

**Why**: Panda expects valid CSS values, not numeric shorthand.

---

## Component-Specific Patterns

### AdvancedColorPicker

**Layout Structure**:

- **Mobile**: Single column (stacked picker + inputs) + modal popover
- **Desktop**: Two-column grid (picker | inputs) inline

**Token Usage**:

```typescript
// Picker container
css({
  border: '{borderWidths.brutal} solid',
  borderColor: 'component.colorPicker.pickerBorder',
  bg: 'component.colorPicker.pickerBg',
  boxShadow: 'brutalInset',
})

// Section headers (HSL, RGB, HEX)
css({
  borderBottom: '{borderWidths.brutal} solid',
  borderColor: 'component.colorPicker.sectionBorder',
  color: 'component.colorPicker.labelText',
  fontFamily: 'brutalist',
  fontWeight: 'brutal',
})

// Mobile modal backdrop
css({
  position: 'fixed',
  inset: 0,
  bg: 'overlay.backdrop',
  zIndex: 50,
})
```

**Responsive Grid**:

```typescript
css({
  display: 'grid',
  gridTemplateColumns: {
    base: '1fr', // Mobile: stacked
    md: '1fr 1fr', // Desktop: side-by-side
  },
  gap: 6,
  maxWidth: '100%', // Prevent overflow
})
```

**Key Fixes Applied**:

1. ✅ Changed `gridTemplateColumns: 2` → `'repeat(2, 1fr)'`
2. ✅ Added responsive breakpoints (`base` vs `md`)
3. ✅ Added `maxWidth: '100%'` constraint
4. ✅ Added `minWidth: 0` to grid items (allows shrinking)
5. ✅ Replaced hardcoded colors with semantic tokens

---

## Adding New Tokens

### Workflow

1. **Identify Need**: Component requires color/spacing not covered by existing tokens
2. **Determine Tier**: Is this a visual primitive or functional semantic token?
3. **Add to Config**: Update `panda.config.ts`
4. **Regenerate**: Run `pnpm panda codegen --clean`
5. **Use in Component**: Reference new token via `css()` or recipe
6. **Document**: Add to this file with usage examples

### Example: Adding Button State Tokens

**Step 1: Identify Need**

- Buttons need disabled state colors
- Current tokens only cover active states

**Step 2: Determine Tier**

- **Semantic token** (functional purpose: button disabled state)
- Belongs in `component.button.*` namespace

**Step 3: Add to Config**

```typescript
// panda.config.ts
semanticTokens: {
  colors: {
    component: {
      button: {
        bg: { value: '{colors.neo.primary}' },
        bgHover: { value: '{colors.neo.secondary}' },
        bgDisabled: { value: '#cccccc' },        // New token
        textDisabled: { value: '#666666' },      // New token
      },
    },
  },
}
```

**Step 4: Regenerate**

```bash
pnpm panda codegen --clean
```

**Step 5: Use in Component**

```typescript
<button className={css({
  bg: 'component.button.bg',
  _hover: { bg: 'component.button.bgHover' },
  _disabled: {
    bg: 'component.button.bgDisabled',
    color: 'component.button.textDisabled',
  },
})} />
```

**Step 6: Document**
Add to this file under "Component State Tokens" section.

---

## Token Reference Quick Guide

### Most Commonly Used Tokens

**Panel/Control Components**:

- `panel.bg`, `panel.fg`, `panel.border`
- `panel.primary`, `panel.secondary`, `panel.accent`

**Form Inputs**:

- `form.input.bg`, `form.input.border`
- `form.input.borderFocus`, `form.input.bgDisabled`

**Overlays/Modals**:

- `overlay.backdrop`, `overlay.light`, `overlay.heavy`

**Typography**:

- `fontFamily: 'brutalist'`
- `fontWeight: 'brutal'`

**Borders**:

- `border: '{borderWidths.brutal} solid'`
- `borderColor: 'panel.border'`

**Shadows**:

- `boxShadow: 'brutal'` (standard drop shadow)
- `boxShadow: 'brutalLg'` (large drop shadow)
- `boxShadow: 'brutalInset'` (inset shadow)

---

## Migration Guide

### Migrating Hardcoded Values to Tokens

**Before**:

```typescript
<div className={css({
  bg: '#fef6e4',
  border: '4px solid #000',
  boxShadow: '4px 4px 0 #000',
  color: '#000',
  fontFamily: 'Space Grotesk, sans-serif',
  fontWeight: '900',
})} />
```

**After**:

```typescript
<div className={css({
  bg: 'panel.bg',
  border: '{borderWidths.brutal} solid',
  borderColor: 'panel.border',
  boxShadow: 'brutal',
  color: 'panel.fg',
  fontFamily: 'brutalist',
  fontWeight: 'brutal',
})} />
```

**Process**:

1. Search for hardcoded hex values: `/\#[0-9a-fA-F]{6}/g`
2. Replace with semantic token reference
3. Search for hardcoded pixel values: `/\d+px/g`
4. Replace with token reference or utility
5. Run `pnpm build` to verify no TypeScript errors

---

## Testing Token Changes

### Visual Regression Testing

**Setup** (see `../development/STYLE_DEV.md`):

1. Configure Storybook with all component variants
2. Set up Argos or Playwright visual regression
3. Run baseline snapshots

**Workflow**:

1. Update tokens in `panda.config.ts`
2. Run `pnpm panda codegen --clean`
3. Run `pnpm build-storybook`
4. Run visual regression tests
5. Review diffs for unintended changes
6. Approve or adjust tokens

### Manual Testing

**Checklist**:

- [ ] All components render correctly on mobile
- [ ] All components render correctly on desktop
- [ ] No layout overflow (grids, flex containers)
- [ ] Text is readable (contrast, size)
- [ ] Borders align consistently (same width)
- [ ] Shadows don't clash (consistent direction)
- [ ] Hover/focus states work as expected

---

## Future Enhancements

### Planned Token Additions

**Dark Mode**:

```typescript
semanticTokens: {
  colors: {
    panel: {
      bg: {
        value: {
          base: '{colors.neo.bg}',      // Light mode
          _dark: '{colors.neo.bgDark}',  // Dark mode
        },
      },
    },
  },
}
```

**Spacing Scale**:

```typescript
tokens: {
  spacing: {
    xs: { value: '4px' },
    sm: { value: '8px' },
    md: { value: '16px' },
    lg: { value: '24px' },
    xl: { value: '32px' },
  },
}
```

**Animation Tokens**:

```typescript
tokens: {
  durations: {
    fast: { value: '100ms' },
    normal: { value: '200ms' },
    slow: { value: '400ms' },
  },
  easings: {
    brutal: { value: 'ease-out' },
    smooth: { value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  },
}
```

---

## References

**Internal Documentation**:

- `STYLING.md` (in this folder) - Panda CSS fundamentals
- `../architecture/UI_ARCHITECTURE.md` - Component architecture
- `../development/STYLE_DEV.md` - Development workflow

**External Resources**:

- [Panda CSS Token Documentation](https://panda-css.com/docs/concepts/tokens)
- [Semantic Tokens Guide](https://panda-css.com/docs/concepts/semantic-tokens)
- [Design Tokens W3C Spec](https://design-tokens.github.io/community-group/format/)

---

**Document Version**: 1.0
**Status**: Active - covers current token system as of 2025-12-14
**Next Review**: After implementing dark mode or adding new component patterns
