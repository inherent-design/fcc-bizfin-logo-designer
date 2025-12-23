# Design Axioms & Principles

**Purpose:** Foundational design principles and axioms for the logo-designer token system
**Last Updated:** 2025-12-23
**Version:** 1.0
**Note:** For implementation details, see [STYLE_MAP.md](./STYLE_MAP.md)

---

## Core Design Philosophy

### Neo-Brutalism

**Aesthetic:** Bold, unapologetic, functional

**Visual Language:**
- **Harsh Borders:** 3-5px thick, solid, zero radius
- **Hard Shadows:** 4-12px offset, zero blur, brutalist press effects
- **Bold Typography:** 700-900 weight, all-caps labels, extra-wide letter spacing
- **Zero Rounding:** `borderRadius: none` (0px) for all interactive elements
- **High Contrast:** Strong foreground/background separation
- **Monochromatic Palette:** Neutral grays (OKLCH), low chroma (0.035)

**Interaction Patterns:**
- Fast transitions (100ms)
- Full color inversion on hover (bg ↔ fg swap)
- Brutal press effect (translate + inset shadow)
- No soft animations or easing curves

---

## Mathematical Foundation

### Musical Theory Ratios (Just Intonation)

**Minor Third (1.2 = 6:5 ratio):**
- Subtle progression for font scales
- Line height progression
- Example: 1rem → 1.2rem → 1.44rem

**Perfect Fourth (1.333 = 4:3 ratio):**
- Moderate spacing intervals
- Used sparingly for specific layout needs

**Perfect Fifth (1.5 = 3:2 ratio):**
- Strong progression for spacing
- Animation durations
- Example: 100ms → 150ms → 225ms

**Octave (2.0 = 2:1 ratio):**
- Structural division for large spacing
- Container size progressions
- Example: 16px → 32px → 64px

**Dominant 7th Chord (1.0, 1.25, 1.5, 1.75):**
- Four-tier text opacity hierarchy
- Opacity: 100% → 80% → 67% → 57%
- Inverted ratios: 1/1, 1/1.25, 1/1.5, 1/1.75

**Harmonic Series [1, 2, 3, 4, 5, 6, 8, 10, 12, 16]:**
- Structural spacing (8px, 16px, 24px, 32px, 40px, 48px, 64px, 80px, 96px, 128px)
- Container sizes

**Subharmonic Series [1, 1/2, 1/3, 1/4, 1/5, 1/6, 1/8, 1/10]:**
- Opacity scale
- Transparency progressions
- Example: 100% → 50% → 33% → 25% → 20% → 17% → 12.5% → 10%

---

## WCAG 2.2 AAA Requirements

### Touch Targets
- **Minimum:** 44×44px CSS pixels (Level AAA)
- **Applies to:** Buttons, sliders, tabs, drag handles, all interactive elements
- **Token:** `theme.touch` (44px theme primitive)

### Color Contrast
- **Text:** 7:1 contrast ratio (Level AAA normal text)
- **Large Text:** 4.5:1 contrast ratio (Level AAA)
- **UI Components:** 3:1 minimum
- **Interactive States:** Full color inversion ensures WCAG AA minimum (4.5:1)

### Keyboard Navigation
- **Focus Indicators:** 2px solid outline, 2px offset, high-contrast color
- **Visible on All States:** :focus-visible pseudo-selector
- **Tab Order:** Logical, matches visual layout
- **Keyboard Shortcuts:** Accessible without mouse

### Screen Reader Support
- **Semantic HTML:** Use proper heading hierarchy, lists, landmarks
- **ARIA Labels:** Where semantic HTML insufficient
- **Alt Text:** Descriptive for all images
- **State Communication:** aria-expanded, aria-selected, aria-disabled

---

## Design Axioms (30 Core Principles)

### Token Architecture

**Axiom 1: Six-Layer System**
- Layer 0: Constants (pure mathematics)
- Layer 1: Primitives (unitless calculations)
- Layer 2: Base tokens (CSS values with units)
- Layer 3: Semantic tokens (intent-based names)
- Layer 4: Styles (text styles, layer styles)
- Layer 5: Recipes (component variants)

**Axiom 2: Unidirectional References**
- Each layer references only lower layers
- No circular dependencies
- Semantic tokens NEVER reference other semantic tokens

**Axiom 3: Mathematical Derivation**
- All spacing derives from base rhythm (8px)
- All typography derives from musical ratios
- All opacity derives from harmonic progressions

**Axiom 4: Theme Primitives (Tier 1)**
- Foundation colors: `theme.fg`, `theme.bg` (opposites)
- Accent hierarchy: `theme.accent`, `theme.secondary`, `theme.tertiary`, `theme.quaternary`
- Aesthetic primitives: `theme.brutal` (border width), `theme.shadowColor` (shadows)
- Accessibility primitives: `theme.touch` (44px WCAG minimum)

**Axiom 5: Surface States (Tier 2)**
- Base backgrounds reference `theme.bg`
- Interactive states: `surface.interactive.base/_hover/_active`
- Pseudo-selector pattern: `_hover`, `_active`, `_focus` (Panda CSS conventions)

**Axiom 6: Element Consumers (Tier 3)**
- Text colors reference `theme.fg`
- Icon colors reference `theme.accent`
- Border colors reference `theme.fg`

### Semantic Naming

**Axiom 7: Intent-Based Names**
- Semantic tokens describe purpose, not magnitude
- Example: `theme.secondary` = 80% opacity (meaning), not `theme.lighter` (position)

**Axiom 8: No Positional Names**
- Avoid: `theme.color1`, `theme.color2`, `theme.color3`
- Prefer: `theme.accent`, `theme.secondary`, `theme.tertiary`

**Axiom 9: Flat Namespace**
- Maximum 3 levels: `category.subcategory.variant`
- Avoid: `theme.color.foreground.primary.default` (5 levels)
- Prefer: `theme.fg` (2 levels)

**Axiom 10: Symmetric Progressions**
- Light and dark themes use same mixing percentages
- Example: Both use 10% foreground mix for hover states
- No asymmetric formulas (light 10%, dark 15%)

### Color System

**Axiom 11: OKLCH Color Space**
- Perceptually uniform lightness (L channel)
- Chroma for saturation (C channel, typically 0.035 for neutrals)
- Hue in degrees (H channel, 240° for blue-gray base)

**Axiom 12: Neutral Gray Scale**
- 11-step lightness progression: [97, 95, 93, 88, 80, 72, 60, 50, 40, 32, 24]
- Low chroma (0.035) for brutalist aesthetic
- Blue-gray hue (240°) for subtle coolness

**Axiom 13: Full Color Inversion (Interactive States)**
- Default: `surface.interactive.base` (= theme.bg) + `text.interactive.base` (= theme.fg)
- Hover: `surface.interactive._hover` (= theme.fg) + `text.interactive._hover` (= theme.bg)
- **CRITICAL:** Always change BOTH bg and color on hover/active

**Axiom 14: Text Hierarchy (Dominant 7th Chord)**
- Primary: 100% opacity (1.0)
- Secondary: 80% opacity (~1/1.25)
- Tertiary: 67% opacity (~1/1.5)
- Quaternary: 57% opacity (~1/1.75)
- Disabled: 25% opacity (1/4)

**Axiom 15: Shadow Color Awareness**
- Light theme: Dark shadows (`theme.shadowColor._light`)
- Dark theme: Subtle shadows (`theme.shadowColor._dark`)
- All shadows use hard edges (0 blur) for neo-brutalist aesthetic

### Spacing System

**Axiom 16: Base Rhythm**
- Base unit: 4 (converts to 8px via rhythmToPx)
- All spacing multiples of 4px or musical ratios × 4px
- Rhythm = 8px grid system

**Axiom 17: Musical Ratio Spacing**
- Minor third: 1.2 × base = 9.6px
- Perfect fifth: 1.5 × base = 12px
- Octave: 2.0 × base = 16px
- Example progression: 4px → 8px → 12px → 16px → 24px

**Axiom 18: Semantic Spacing Categories**
- **Inset:** Padding (tight/normal/loose/spacious)
- **Stack:** Vertical spacing (micro/tight/close/normal/loose/spacious)
- **Inline:** Horizontal spacing (tight/close/normal/loose/spacious)
- **Overlap:** Negative spacing (tabBorder/slight/moderate/strong/heavy)
- **Proximity:** Gestalt principle spacing (tight/close/related/separate/isolated/distant)

**Axiom 19: Touch Target Spacing**
- Minimum 44×44px for all interactive elements (WCAG 2.2 AAA)
- Applied via `theme.touch` primitive
- Affects buttons, sliders, tabs, drag handles

### Typography System

**Axiom 20: Musical Font Scale**
- Base: 1rem
- Minor third progression: 1rem → 1.2rem → 1.44rem → 1.728rem
- Ratios create harmonic visual rhythm

**Axiom 21: Font Families**
- **Brutalist:** Space Grotesk (UI controls, labels, headers)
- **Mono:** Fira Code (code, numeric values)
- No serif fonts (conflicts with brutalist aesthetic)

**Axiom 22: Font Weight Hierarchy**
- Normal: 400 (body text)
- Medium: 500 (emphasis)
- Bold: 700 (strong emphasis)
- Brutal: 900 (neo-brutalist headers/labels)

**Axiom 23: Line Height Progression**
- Tight: 1.2 (headings, minor third ratio)
- Normal: 1.5 (body text, perfect fifth ratio)
- Relaxed: 1.778 (reading content, minor seventh ratio)

**Axiom 24: Letter Spacing**
- Tight: -0.05em (negative tracking, rare)
- Normal: 0em (default)
- Wide: 0.05em (labels, UI text)
- Wider: 0.1em (neo-brutalist headers, all-caps)

### Border System

**Axiom 25: Zero Border Radius**
- Neo-brutalist aesthetic: `borderRadius: none` (0px)
- No rounded corners on interactive elements
- Pill shapes reserved for special cases only

**Axiom 26: Brutal Border Width**
- Theme primitive: `theme.brutal` = 3px (3/8 base rhythm)
- Semantic variants: `brutal.thick` = 4px, `brutal.extraThick` = 5px
- Standard: `borderWidths.default` = 4px (4/8 base rhythm)
- Hairline: `borderWidths.hairline` = 1px (dividers only)

**Axiom 27: Solid Border Style**
- Default: `borderStyle: solid`
- Dashed: Ghost states, drag previews only
- Dotted: Utility cases only

### Effect System

**Axiom 28: Hard Shadows Only**
- Elevation shadows: 4px/8px/12px offset, 0 blur
- Interaction shadows: 2px inset (pressed state)
- No soft blur shadows (conflicts with brutalist aesthetic)

**Axiom 29: Opacity Progression**
- Disabled: 25%
- Muted: 33%
- Subtle: 50%
- Medium: 67%
- Strong: 75%
- Near Full: 90%
- Full: 100%

**Axiom 30: Fast Transitions**
- Duration: 100ms (fast), 150ms (normal), 225ms (moderate)
- Property: `all` (comprehensive state changes)
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (smooth default)
- No slow animations (conflicts with brutalist immediacy)

---

## Implementation Principles

### Token Reference Rules

**Never reference base tokens directly in components:**
```typescript
// ❌ WRONG
const styles = css({
  borderWidth: 'border3',  // Base token (Layer 2)
})

// ✅ CORRECT
const styles = css({
  borderWidth: 'theme.brutal',  // Theme primitive OR
  borderWidth: 'borderWidths.default',  // Semantic token
})
```

**Always use semantic or theme primitives in components:**
```typescript
// ✅ CORRECT patterns:
bg: 'surface.base'              // Semantic token
color: 'text.primary'           // Semantic token
borderWidth: 'theme.brutal'     // Theme primitive
minWidth: 'theme.touch'         // Theme primitive
```

**Full color inversion on interactive states:**
```typescript
// ✅ CORRECT (CRITICAL for dark theme contrast):
_hover: {
  bg: 'surface.interactive._hover',    // Background inverts
  color: 'text.interactive._hover',    // Text inverts (MUST include both)
}

// ❌ WRONG (causes dark theme contrast failure):
_hover: {
  bg: 'surface._hover',  // Only bg changes, text stays same
}
```

### Layer Separation

**Components (Layer 6):**
- Reference semantic tokens (Layer 3) + recipes (Layer 5)
- Can reference theme primitives (`theme.*`) when appropriate
- NEVER reference base tokens (Layer 2) directly
- NEVER use hard-coded CSS values

**Semantic Tokens (Layer 3):**
- Reference theme primitives (`theme.*`) or base tokens (Layer 2)
- NEVER reference other semantic tokens (same-layer recursion)

**Theme Primitives (Tier 1):**
- Reference base tokens (Layer 2)
- Foundation for token architecture

**Base Tokens (Layer 2):**
- Reference primitives (Layer 1) via formatCss(), pxToRem()
- Design primitives with units

**Primitives (Layer 1):**
- Reference constants (Layer 0)
- Unitless calculations only

**Constants (Layer 0):**
- Pure mathematics, zero dependencies
- Source of truth for all derived values

---

## Design Patterns (Anti-Patterns & Best Practices)

### ✅ Best Practices

**1. Shared Pattern Reuse:**
```typescript
import { neoBrutalBorderStyle, interactiveStateStyle, focusState } from '@/tokens/recipes/shared/base'

const buttonStyles = css({
  ...neoBrutalBorderStyle,     // Border pattern
  ...interactiveStateStyle,    // Hover + active states
  ...focusState,               // Focus outline
})
```

**2. Recipe Variant Usage:**
```typescript
// Use recipes for variant management
const classes = buttonRecipe({ variant: 'primary', size: 'md' })
```

**3. Theme-Aware Token References:**
```typescript
// Tokens automatically invert with light/dark theme
bg: 'surface.base'        // _light: gray.0, _dark: gray.10
color: 'text.primary'     // _light: gray.10, _dark: gray.0
```

**4. WCAG Touch Targets:**
```typescript
// Always use theme.touch for interactive elements
minWidth: 'theme.touch',   // 44px WCAG 2.2 AAA
minHeight: 'theme.touch',  // 44px WCAG 2.2 AAA
```

**5. Focus States:**
```typescript
// Always include focus indicators
_focusVisible: {
  outline: '2px solid',
  outlineColor: 'border.focus',
  outlineOffset: '2px',
}
```

### ❌ Anti-Patterns

**1. Base Token Leakage:**
```typescript
// ❌ WRONG
borderWidth: 'border3',    // Base token (Layer 2)
p: 'harmonic3',            // Base token (Layer 2)

// ✅ CORRECT
borderWidth: 'theme.brutal',  // Theme primitive
p: 'inset.loose',             // Semantic token
```

**2. Hard-Coded CSS Values:**
```typescript
// ❌ WRONG
fontSize: '14px',
padding: '12px',
borderWidth: '3px',

// ✅ CORRECT
fontSize: 'body.small',
p: 'inset.normal',
borderWidth: 'theme.brutal',
```

**3. Partial Color Inversion (CRITICAL):**
```typescript
// ❌ WRONG (dark theme contrast failure)
_hover: {
  bg: 'surface._hover',  // Only bg changes - text invisible in dark theme!
}

// ✅ CORRECT (full inversion)
_hover: {
  bg: 'surface.interactive._hover',
  color: 'text.interactive._hover',  // MUST include text color change
}
```

**4. Rounded Corners in Neo-Brutalist Components:**
```typescript
// ❌ WRONG
borderRadius: 'md',  // Conflicts with brutalist aesthetic

// ✅ CORRECT
borderRadius: 'none',  // Zero rounding (brutalist)
```

**5. Soft Shadows:**
```typescript
// ❌ WRONG
boxShadow: '0 4px 12px rgba(0,0,0,0.1)',  // Soft blur shadow

// ✅ CORRECT
boxShadow: 'elevation.raised',  // 4px offset, 0 blur (brutalist)
```

**6. Missing Touch Targets:**
```typescript
// ❌ WRONG (too small for WCAG 2.2)
width: '20px',
height: '20px',

// ✅ CORRECT
minWidth: 'theme.touch',   // 44px minimum
minHeight: 'theme.touch',  // 44px minimum
```

**7. Slow Animations:**
```typescript
// ❌ WRONG
transitionDuration: '500ms',  // Too slow for brutalist immediacy

// ✅ CORRECT
transitionDuration: 'fast',  // 100ms (brutalist speed)
```

---

## Accessibility Principles

### Color Contrast
- Text: 7:1 contrast ratio (WCAG AAA normal text)
- Large text: 4.5:1 contrast ratio (WCAG AAA)
- UI components: 3:1 minimum
- Interactive states: Full color inversion ensures minimum 4.5:1 ratio

### Touch Targets
- Minimum 44×44px for all interactive elements (WCAG 2.2 AAA)
- Applies to buttons, sliders, tabs, drag handles, checkboxes, radio buttons

### Keyboard Navigation
- Visible focus indicators (2px solid outline, 2px offset)
- Logical tab order matching visual layout
- Focus-visible pseudo-selector for keyboard-only focus
- All interactive elements keyboard-accessible

### Screen Readers
- Semantic HTML (proper heading hierarchy, lists, landmarks)
- ARIA labels where semantic HTML insufficient
- Descriptive alt text for all images
- State communication (aria-expanded, aria-selected, aria-disabled)

### Motion & Animation
- Fast transitions (100ms default) for responsiveness
- No parallax or complex motion (accessibility concern)
- Respect prefers-reduced-motion media query (future enhancement)

---

## Neo-Brutalist Aesthetic Guide

### Visual Language
- **Harsh, unforgiving:** 3-5px borders, zero radius, hard shadows
- **Bold, unapologetic:** 700-900 font weight, all-caps labels
- **Functional, minimal:** No decoration, no gradients, no soft edges
- **High contrast:** Strong foreground/background separation
- **Monochromatic:** Neutral grays with low chroma

### Typography
- All-caps labels (brutalistLabel textStyle)
- Extra-wide letter spacing (0.1em)
- Bold to brutal weight (700-900)
- Space Grotesk font family (geometric, neutral)

### Spacing
- Grid-based (8px rhythm)
- Musical ratios for harmonious progression
- Generous padding (12px-32px inset)
- Clear visual separation (16px-32px stack)

### Color
- Neutral grays (OKLCH with 0.035 chroma)
- Blue-gray hue (240°)
- Full opacity or extreme transparency (no 50% half-measures)
- Full color inversion on hover (bg ↔ fg swap)

### Interaction
- Fast transitions (100ms)
- Brutal press effect (translate + inset shadow)
- Full color inversion (not subtle color shifts)
- Immediate feedback (no slow animations)

---

## Token Organization

### Spacing Categories
- **Inset:** Padding (element interior)
- **Stack:** Vertical spacing (element stacking)
- **Inline:** Horizontal spacing (inline content)
- **Overlap:** Negative spacing (border overlaps)
- **Proximity:** Gestalt spacing (relationship indication)

### Color Categories
- **Theme:** Foundation colors (fg, bg, accent hierarchy)
- **Surface:** Background states (base, subtle, hover, active, interactive)
- **Text:** Text hierarchy (primary, secondary, tertiary, quaternary, disabled)
- **Border:** Border colors (default, subtle, moderate, emphasis, focus)
- **Icon:** Icon colors (primary, secondary, muted, disabled, interactive)
- **Input:** Form input colors (bg, border, text states)

### Typography Categories
- **Font Size:** Body, heading, display scales
- **Font Family:** Brutalist, mono
- **Font Weight:** Normal, medium, bold, brutal
- **Line Height:** Tight, normal, relaxed
- **Letter Spacing:** Tight, normal, relaxed, wide, wider

### Effect Categories
- **Opacity:** Disabled, muted, subtle, medium, strong, near-full, full
- **Elevation:** Raised, floating, modal shadows
- **Interaction:** Hover, pressed, disabled shadows
- **Blur:** Subtle, default, medium, strong, maximum

---

## Implementation Checklist

### Token System
- [ ] Layer 0: Constants defined (pure mathematics)
- [ ] Layer 1: Primitives calculated (unitless)
- [ ] Layer 2: Base tokens generated (CSS values with units)
- [ ] Layer 3: Semantic tokens mapped (intent-based names)
- [ ] Layer 4: Styles defined (textStyles, layerStyles)
- [ ] Layer 5: Recipes created (component variants)

### Components
- [ ] Reference semantic tokens only (no base token leakage)
- [ ] Use theme primitives where appropriate (`theme.*`)
- [ ] Zero hard-coded CSS values
- [ ] Full color inversion on interactive states (CRITICAL)
- [ ] Focus states on all interactive elements
- [ ] Touch targets 44×44px minimum

### Accessibility
- [ ] WCAG 2.2 AAA contrast ratios (7:1 text, 4.5:1 large text)
- [ ] Touch targets 44×44px minimum
- [ ] Visible focus indicators (2px outline, 2px offset)
- [ ] Keyboard navigation support
- [ ] Semantic HTML with ARIA labels where needed

### Neo-Brutalism
- [ ] Zero border radius on interactive elements
- [ ] Hard shadows only (0 blur)
- [ ] Fast transitions (100ms)
- [ ] Bold typography (700-900 weight)
- [ ] All-caps labels where appropriate

---

**For implementation details, component patterns, and token reference:**
- See [STYLE_MAP.md](./STYLE_MAP.md) - Complete implementation guide
- See `src/tokens/` directory - Token definitions
- See `.atlas/connector/analysis/logo-designer/variant-pattern-deduplication-analysis-2025-12-23.md` - Deduplication opportunities
