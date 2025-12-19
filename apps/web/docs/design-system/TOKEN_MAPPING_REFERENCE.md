# Token Mapping Reference

Quick reference for token usage when migrating recipes from config to components.

## Button (neoButton) Token Map

### Background Colors

| Purpose | Token | Resolves To | Visual |
|---------|-------|-------------|--------|
| Primary action | `bg.button.primary` | `{colors.neo.primary}` = `#f582ae` | Pink |
| Secondary action | `bg.button.secondary` | `{colors.neo.secondary}` = `#76c661` | Green |
| Danger/Warning | `bg.button.danger` | `{colors.panel.warning}` = `#ff6b6b` | Red |
| Ghost (transparent) | `bg.button.ghost` | `transparent` | Clear |
| Ghost hover | `bg.button.ghostHover` | `{colors.bg.panel.hover}` | Light gray overlay |

### Text Colors

| Purpose | Token | Resolves To | Visual |
|---------|-------|-------------|--------|
| Normal button text | `text.button` | `{colors.panel.bg}` | Light (inverted) |
| Ghost button text | `text.button.ghost` | `{colors.panel.fg}` | Dark |
| Disabled button text | `text.button.disabled` | `{colors.text.disabled}` | ~30% opacity |

### Borders & Shadows

| Purpose | Token | Resolves To |
|---------|-------|-------------|
| Border color | `border` | `{colors.panel.border}` |
| Normal shadow | `shadows.brutal` | Hard 0.7rem offset shadow |
| Inset shadow (hover) | `shadows.brutalInset` | Inset 0.4rem shadow |

### Typography

| Purpose | Token | Resolves To |
|---------|-------|-------------|
| Font family | `fontFamily: 'brutalist'` | `Space Grotesk, system-ui, sans-serif` |
| Font weight | `fontWeight: 'brutal'` | `900` |
| Text transform | `textTransform: 'uppercase'` | UPPERCASE LETTERS |

### Spacing

| Purpose | Token | Resolves To |
|---------|-------|-------------|
| Horizontal (default) | `px: 4` | `1.6rem` |
| Vertical (default) | `py: 2` | `0.8rem` |
| Small horizontal | `px: 2` | `0.8rem` |
| Small vertical | `py: 1` | `0.4rem` |
| Large horizontal | `px: 6` | `2.4rem` |
| Large vertical | `py: 3` | `1.2rem` |

---

## Input (neoInput) Token Map

### Background Colors

| Purpose | Token | Resolves To |
|---------|-------|-------------|
| Input background | `bg.form.input` | `{colors.neo.bg}` light / `{colors.neo.fg}` dark |
| Disabled background | `bg.form.inputDisabled` | `{colors.bg.subtle}` (50% opacity blend) |

### Text Colors

| Purpose | Token | Resolves To |
|---------|-------|-------------|
| Input text | `text.form.input` | `{colors.text}` |
| Placeholder text | `text.form.inputPlaceholder` | `{colors.text.muted}` (~60% opacity) |
| Disabled text | `text.form.inputDisabled` | `{colors.text.disabled}` (~30% opacity) |

### Borders & Focus

| Purpose | Token | Resolves To |
|---------|-------|-------------|
| Default border | `border.form` | `{colors.border.form}` = `{colors.panel.border}` |
| Focus border | `border.form.focus` | `{colors.border.form.focus}` = `{colors.panel.accent}` |
| Focus outline color | `border.form.focus` | Accent color (cyan `#8bd3dd`) |

### Typography

| Purpose | Token | Resolves To |
|---------|-------|-------------|
| Font family | `fontFamily: 'brutalist'` | `Space Grotesk, system-ui, sans-serif` |
| Font weight | `fontWeight: 'bold'` | `700` |

### Spacing

| Purpose | Token | Resolves To |
|---------|-------|-------------|
| Horizontal padding | `px: 3` | `1.2rem` |
| Vertical padding | `py: 2` | `0.8rem` |

---

## Panel (neoPanel) Token Map

### Background & Borders

| Purpose | Token | Resolves To |
|---------|-------|-------------|
| Panel background | `bg.panel` | `{colors.neo.bg}` light / `{colors.neo.fg}` dark |
| Panel border | `border.panel` | `{colors.border.panel}` = `{colors.panel.border}` |
| Panel shadow | `shadows.brutalLg` | Hard 0.8rem offset shadow (large) |

### Spacing

| Purpose | Token | Resolves To |
|---------|-------|-------------|
| All padding | `p: 4` | `1.8rem` (equal on all sides) |

---

## Theme-Aware Tokens

These tokens automatically switch based on `data-theme` attribute:

### Light Theme (`data-theme="light"`)
```
panel.bg     → #fef6e4 (light cream)
panel.fg     → #1a1a1a (dark text)
panel.border → #1a1a1a
text.button  → #fef6e4 (light text on dark bg)
bg.form.input → #fef6e4
```

### Dark Theme (`data-theme="dark"`)
```
panel.bg     → #1a1a1a (dark background)
panel.fg     → #fef6e4 (light text)
panel.border → #fef6e4
text.button  → #1a1a1a (dark text on light bg)
bg.form.input → #1a1a1a
```

---

## Utility Token Reference

### Spacing Scale
```
xxxxxs: 0.2rem    xs: 0.8rem      lg: 1.8rem
xxxxs:  0.3rem    sm: 1.2rem      xl: 2.2rem
xxxs:   0.4rem    md: 1.6rem      xxl: 2.4rem
xxs:    0.7rem                     xxxl: 2.8rem
                                   xxxxl: 3.2rem
```

### Font Weights
```
normal:    400    bold:      700
medium:    500    brutal:    900
semibold:  600
```

### Border Widths (neo-brutalist)
```
brutal.sm: 0.4rem (xxxs)
brutal.md: 0.7rem (xxs)
brutal.lg: 0.8rem (xs)
```

### Shadows
- **brutal**: offset X: 0.7rem, Y: 0.7rem, blur: 0, color: panel.fg
- **brutalLg**: offset X: 0.8rem, Y: 0.8rem, blur: 0, color: panel.fg
- **brutalInset**: offset X: 0.4rem, Y: 0.4rem (inset), color: panel.fg

### Colors (Neo Palette)
```
neo.fg:        #1a1a1a (dark text/borders)
neo.bg:        #fef6e4 (light cream)
neo.primary:   #f582ae (pink)
neo.secondary: #76c661 (green)
neo.accent:    #8bd3dd (cyan)
neo.warning:   #ff6b6b (red)
```

---

## How to Use in Component Styles

### Example: Button Recipe
```typescript
import { recipe, type RecipeVariantProps } from '@pandacss/dev'

export const buttonRecipe = recipe({
  base: {
    bg: 'bg.button.primary',      // Resolves theme-aware
    color: 'text.button',          // Inverted for contrast
    border: '3px solid',
    borderColor: 'border',         // Uses panel-level border
    boxShadow: 'brutal',           // Named shadow token
    fontFamily: 'brutalist',       // Typography token
    px: 4,                         // Spacing token → 1.6rem
    py: 2,                         // Spacing token → 0.8rem
  },
  variants: {
    variant: {
      primary: { bg: 'bg.button.primary' },   // Pink in light, pink in dark
      ghost: { bg: 'bg.button.ghost' },       // Transparent (same both themes)
    },
  },
})
```

All token references are evaluated at build time and generate theme-aware CSS.

---

## Quick Token Lookup

Need to find the right token? Use this decision tree:

```
Looking for... →

  BACKGROUND?
    └─ Panel → bg.panel
    └─ Button (primary) → bg.button.primary
    └─ Button (secondary) → bg.button.secondary
    └─ Button (danger) → bg.button.danger
    └─ Button (ghost) → bg.button.ghost
    └─ Input → bg.form.input
    └─ Subtle (50% blend) → bg.subtle

  TEXT?
    └─ Button → text.button
    └─ Button (ghost) → text.button.ghost
    └─ Button (disabled) → text.button.disabled
    └─ Input → text.form.input
    └─ Input (placeholder) → text.form.inputPlaceholder
    └─ Input (disabled) → text.form.inputDisabled

  BORDER?
    └─ Panel → border.panel
    └─ Button → border (or border.default)
    └─ Input → border.form
    └─ Input (focus) → border.form.focus

  SHADOW?
    └─ Medium (0.7rem) → shadows.brutal
    └─ Large (0.8rem) → shadows.brutalLg
    └─ Inset (0.4rem) → shadows.brutalInset

  SPACING?
    └─ 1.6rem → spacing.md or px/py: 4
    └─ 0.8rem → spacing.xs or px/py: 2
    └─ 1.8rem → spacing.lg or p: 4

  TYPOGRAPHY?
    └─ Font → fonts.brutalist
    └─ Weight (400) → fontWeights.normal
    └─ Weight (700) → fontWeights.bold
    └─ Weight (900) → fontWeights.brutal
```

---

## Notes

- All color tokens support light/dark theme via `data-theme` attribute
- Shadow tokens are solid (no blur) for neo-brutalist aesthetic
- Spacing tokens scale consistently (multiples of 0.2rem)
- Never hardcode colors—always use semantic tokens
- Component recipes should only reference tokens, never hardcoded values
