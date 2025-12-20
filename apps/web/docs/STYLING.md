# Design Token System Axioms

## The Minimality Chain

**Principle:** Each layer expresses the MINIMAL elements needed for the next.

```
Layer 0: Constants (pure mathematics)
  ↓
Layer 1: Primitives (unitless numbers)
  ↓
Layer 2: Base Tokens (atomic + compound CSS values)
  ↓
Layer 3: Semantic Tokens (grouped values + conditionals)
  ↓
Layer 4: Styles (layer/text/animation bundles)
  ↓
Layer 5: Recipes (variant patterns)
  ↓
Layer 6: Components (visual implementations)
  ↓
UX/UI Requirements
```

**Why minimality?** Each layer contains exactly what's necessary - no more, no less.

---

## Layer 0: Constants

**Purpose:** Pure mathematical relationships governing all derived values.

**Rules:**
- No CSS units, pure numbers only
- Mathematical identities only
- Based on just intonation musical theory
- Immutable constants

**Musical Intervals:**
- **Minor Third** (6/5 = 1.2): Subtle progressions
- **Perfect Fourth** (4/3 = 1.333...): Moderate steps
- **Perfect Fifth** (3/2 = 1.5): Strong progressions
- **Octave** (2/1 = 2.0): Structural divisions
- **Dominant 7th** [1.0, 1.25, 1.5, 1.75]: 4-tier hierarchies

**Sources:**
- [Just Intonation](https://en.wikipedia.org/wiki/Just_intonation)
- [Harmonic Series](https://en.wikipedia.org/wiki/Harmonic_series_(music))
- [Music and Mathematics](https://en.wikipedia.org/wiki/Music_and_mathematics)

**Design Constants:**
- Base rem: 16px (web standard)
- Grid unit: 8pt ([Apple HIG](https://developer.apple.com/design/human-interface-guidelines/layout))
- Min touch target: 44×44pt (Apple HIG, [WCAG](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html))

---

## Layer 1: Primitives

**Purpose:** Unitless numerical values derived from constants.

**Rules:**
- Numbers only, no CSS units
- Derived from Layer 0 via multiplication
- Complete progressions without gaps
- Context-agnostic naming (magnitude, not purpose)

**Example:**
```typescript
rhythm: { xs: 8, sm: 12, md: 16, lg: 24, xl: 32 }
// Derived from perfectFifth ratio (1.5)
```

---

## Layer 2: Base Tokens

**Purpose:** CSS-ready atomic and compound values.

**Rules:**
- All values have CSS units or valid CSS
- Names describe magnitude/appearance, not usage
- No semantic meaning
- Must form complete progressions

**Atomic Values:** Simple CSS values (`{ value: '1rem' }`, `{ value: '#FF0000' }`)

**Compound Values:** CSS strings referencing other base tokens.

**CRITICAL:** Base tokens CAN reference other base tokens in compound CSS strings (gradients, borders, shadows). This is NOT a layer violation - documented Panda CSS behavior.

**Example:**
```typescript
// Valid: Gradient referencing colors
gradients: {
  hero: {
    value: 'linear-gradient(135deg, {colors.brand.start}, {colors.brand.end})'
  }
}

// Valid: Border with color reference
borders: {
  danger: { value: '1px solid {colors.red.400}' }
}

// Invalid: Simple alias (belongs in semantic layer)
colors: {
  primary: { value: '{colors.blue.500}' } // ❌ Use semantic tokens
}
```

**Source:** [Panda CSS Token Documentation](https://panda-css.com/docs/theming/tokens)

---

## Layer 3: Semantic Tokens

**Purpose:** Usage-oriented groupings with theme/conditional logic.

**Rules:**
- **Preferred:** Reference base or semantic tokens: `{ value: '{colors.gray.100}' }`
- **Discouraged:** Raw CSS values (use only for one-offs)
- **Encouraged:** Conditionals for themes: `{ value: { _light: X, _dark: Y } }`
- Names encode meaning and usage context

**Conditionals:** Theme logic using special keys.

**Available:**
- `_light`, `_dark`: Color scheme
- `_osLight`, `_osDark`: OS preference
- `_portrait`, `_landscape`: Orientation
- Breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`

**Source:** [Panda CSS Semantic Tokens](https://panda-css.com/docs/theming/semantic-tokens)

---

## Layer 4: Styles

**Purpose:** Reusable style bundles for common patterns.

**Contents:** Layer styles, text styles, animation styles defined in `panda.config.ts`.

**Rules:**
- Defined in `theme.extend.{layerStyles|textStyles|animationStyles}`
- Group semantic tokens into reusable patterns
- Support `DEFAULT` key for nested variants
- Applied via `layerStyle`, `textStyle`, `animationStyle` props

**Layer Styles:** Surface properties (bg, border, shadow)
**Text Styles:** Typography bundles (font family, size, weight, line-height, letter-spacing)
**Animation Styles:** Motion patterns (animation name, duration, timing function)

**When to use:**
- **Layer Style:** Multiple surface properties always together
- **Text Style:** Typography bundles used across components
- **Animation Style:** Motion patterns reused across components
- **Semantic Token:** Single property application

**Source:** [Panda CSS Layer Styles](https://panda-css.com/docs/concepts/layer-styles), [Text Styles](https://panda-css.com/docs/concepts/text-styles)

---

## Layer 5: Recipes

**Purpose:** Component patterns with variants and compound logic.

**Types:**
- `cva`: Single-element component variants
- `sva`: Multi-slot component variants
- Built-in patterns: Stack, Grid, Container, Flex

**Rules:**
- Reference semantic tokens and styles (Layers 3-4)
- Define variants, compound variants, default variants
- Handle "how should this look in different states"

**When to use:**
- **cva:** Component has one root element, variants change appearance
- **sva:** Component has multiple semantic parts needing coordinated styling
- **Built-in patterns:** Standard layout needs without custom treatment

**Source:** [Panda CSS Recipes](https://panda-css.com/docs/concepts/recipes)

---

## Layer 6: Components

**Purpose:** Minimal implementations producing visual output matching UX requirements.

**Rules:**
- Reference Layers 3-5 only
- No hard-coded CSS values
- Props define variant selection, not visual properties
- Visual output is source of truth
- Components regenerate to match design

**Philosophy:** Visual output as truth - component code can be rewritten/regenerated as long as visual parity is maintained.

**Validation:**
- Zero hard-coded values
- All states implemented (default, hover, focus, active, disabled)
- Theme support (light/dark)
- WCAG AA compliance
- Touch targets ≥44×44pt
- TypeScript type safety

---

## Design Principles

### Musical Theory Foundation

**Why musical ratios?** Create natural, harmonious progressions. Simple whole-number ratios (just intonation) vs irrational numbers (equal temperament).

**Just Intonation Benefits:**
1. Simpler math - whole-number ratios
2. Grid alignment - better 8pt grid fit
3. Conceptual clarity - "3:2 ratio" clearer than "1.4983"
4. Mathematical purity - accurate harmonic relationships

**Dominant 7th Chord (4-tier hierarchies):**
```
Root → 1.0 (Primary: maximum contrast)
Major 3rd → 1.25 (Secondary: reduced)
5th → 1.5 (Tertiary: further reduced)
Minor 7th → 1.75 (Quaternary: minimal)
```

**Applied to text colors:**
- Primary: gray.900 (full contrast)
- Secondary: gray.700 (slightly reduced)
- Tertiary: gray.500 (more reduced)
- Quaternary: gray.400 (minimal)

**Source:** Musical interval theory, [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/) semantic hierarchies

### Visual Output as Truth

**Principle:** Components exist to render UI matching design requirements. Code structure is secondary to visual output.

**Implications:**
- Visual parity = feature parity (not API parity)
- Component code can be regenerated freely
- Version control enables bold changes
- Props are implementation details

**Migration validation:**
1. Screenshot old component in all states
2. Regenerate using token system
3. Screenshot new component in all states
4. Compare - if identical, migration successful
5. Props/API differences acceptable

### Minimality Test

**How to determine if something is minimal:**

1. **Necessity Test:** Remove this - does something break? If yes → keep
2. **Duplication Test:** Used in 2+ places? If yes → belongs in system
3. **Expressiveness Test:** Enables the layer above? If yes → keep
4. **Abstraction Test:** Groups values always together? If yes → belongs in Layer 4/5

---

## Common Patterns

### Compound Base Values

**Pattern:** Base tokens referencing other base tokens in CSS strings.

**Valid:**
- Gradients with color references
- Borders with color/width references
- Shadows with color references
- Multiple backgrounds

**Invalid:**
- Simple aliasing (semantic layer)
- Cross-layer references

### Theme Conditionals

**Pattern:** Semantic tokens varying by theme.

**Structure:**
```typescript
value: {
  base: '{colors.white}',      // Default
  _dark: '{colors.gray.900}',  // Dark mode
  _osDark: '{colors.gray.800}' // OS dark preference
}
```

**Rule:** Conditionals are NOT nesting levels - they're value modifiers.

### DEFAULT Key Pattern

**Pattern:** Nested variants with base variant.

```typescript
card: {
  DEFAULT: { value: { bg: X, border: Y } },
  elevated: { value: { bg: X, boxShadow: Z } }
}
```

**Access:** `card` returns DEFAULT, `card.elevated` returns variant.

---

## Neo-Brutalism + High-Fantasy Aesthetics

### Neo-Brutalism (Camera Layer / UI Controls)

**Principles:**
- Thick borders (3-5px black)
- Harsh contrast
- Zero rounded corners
- Hard shadows (4-8px solid black)

**Color System:**
- Black (#000) + white (#fff)
- Saturated primaries (neon green #00FF00, electric blue #0066FF)

**Typography:**
- Bold sans-serifs (Space Grotesk, Inter Bold)
- 700-900 weight
- Oversized headings (48-96px)

**Source:** [Nielsen Norman Group - Neo-Brutalism](https://www.nngroup.com/articles/neobrutalism/)

### High-Fantasy (World Layer)

**Color Palette:**
- Gold accents (#d7913a, #5f4c0c)
- Aged parchment (#a28f65)
- Mystical glows (orange/purple/blue rarity tiers)

**Typography:**
- Gothic/Blackletter for headers (18-24pt)
- Carolingian/sans-serif for body (12-14pt)

**Ornamentation:**
- Celtic knots, runic designs
- Gemstone accents (ruby #8B0000, sapphire #0F52BA)

**Source:** [Game UI Database](https://www.gameuidatabase.com) - RPG/fantasy interfaces

---

## Accessibility Requirements

**WCAG AA Minimum:**
- **Text Contrast:** 4.5:1 normal, 3:1 large
- **UI Components:** 3:1 minimum
- **Focus Indicators:** Clearly visible
- **Touch Targets:** ≥44×44pt
- **Color Independence:** Not sole indicator of state

**Source:** [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## Integration Patterns

### Apple HIG Patterns

- 4-level semantic hierarchies
- 8pt grid alignment
- 44×44pt minimum touch targets
- SF Pro font family (when applicable)
- Dynamic type support considerations

**Source:** [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

### Material Design Patterns

- Elevation system with shadows
- State layer opacity system
- Motion duration/easing curves

**Source:** [Material Design 3](https://m3.material.io/)

---

## Completion Criteria

**System is COMPLETE when:**
- All 7 layers exist with proper separation
- Minimality chain flows unidirectionally
- Musical theory foundation evident in ratios
- All 24 Panda CSS token categories addressed
- Semantic tokens provide complete coverage
- Layer/text/animation styles group common patterns
- Recipes handle variant logic
- Components have zero hard-coded values
- Visual output matches UX requirements
- Accessibility requirements met (WCAG AA)
- Theme support complete (light/dark minimum)

**System is CORRECT when:**
- Each layer contains minimal necessary elements
- Compound base values properly reference other base tokens
- Semantic tokens encode design intent accurately
- Styles group properties that belong together
- Recipes manage variants without duplication
- Components regenerate to match visual output
- Axioms evolve based on implementation learnings
- Documentation explains rationale, not just structure

---

## Sources

**Design Token Theory:**
- [Design Tokens W3C Community Group](https://design-tokens.github.io/community-group/format/)
- [Tokens in Design Systems (Nathan Curtis)](https://medium.com/eightshapes-llc/tokens-in-design-systems-25dd82d58421)

**Panda CSS:**
- [Official Documentation](https://panda-css.com)
- [Tokens Guide](https://panda-css.com/docs/theming/tokens)
- [Semantic Tokens](https://panda-css.com/docs/theming/semantic-tokens)
- [Recipes](https://panda-css.com/docs/concepts/recipes)
- [Layer Styles](https://panda-css.com/docs/concepts/layer-styles)

**Accessibility:**
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [Apple Accessibility](https://developer.apple.com/accessibility/)

**Musical Theory:**
- [Just Intonation (Wikipedia)](https://en.wikipedia.org/wiki/Just_intonation)
- [Harmonic Series (Wikipedia)](https://en.wikipedia.org/wiki/Harmonic_series_(music))

**Design Systems:**
- [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design 3](https://m3.material.io/)
- [Radix UI](https://www.radix-ui.com/)
