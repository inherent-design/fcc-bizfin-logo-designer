# Token System Axioms

**Purpose:** Dual-mode reference for token system architecture
**Audience:** Subagents (quick ref via Axioms) + humans (deep understanding via Concepts)
**Scope:** Token system only (Layers 0-5) — Base UI integration in `reference/BASE_UI.md`

---

## I. Axioms (Ultra-Minimal)

**Quick reference for agents and decisions. Pure rules, zero explanation.**

### Layer Separation

1. Each layer contains minimal elements needed for the next layer
2. Layers cannot skip or reference layers above them
3. Same-layer references permitted only for compound CSS values

### Layer 0: Constants

4. Pure mathematical relationships only
5. No CSS units, no semantic names
6. Based on just intonation musical ratios
7. Immutable values

### Layer 1: Primitives

8. Unitless numbers only
9. Derived from Layer 0 via multiplication
10. Context-agnostic magnitude names
11. Complete progressions without gaps

### Layer 2: Base Tokens

12. All values have CSS units or valid CSS syntax
13. Names describe magnitude or appearance, never usage or intent
14. Compound values may reference other base tokens in CSS strings
15. Simple token aliasing forbidden (use semantic layer)
16. Must form complete progressions

### Layer 3: Semantic Tokens

17. Names encode usage and intent, not appearance
18. Reference base tokens or other semantic tokens
19. Conditionals permitted for themes and responsive behavior
20. Raw CSS values discouraged but permitted for one-offs

### Layer 4: Styles

21. Layer styles group surface properties only
22. Text styles group typography properties only
23. Animation styles group motion properties only
24. Reference semantic tokens (Layer 3) exclusively

### Layer 5: Recipes

25. cva for single-element components with variants
26. sva for multi-slot components with coordinated styling
27. Reference Layers 3-4 only
28. Define variants, compound variants, default variants

### Layer 6: Components

29. Reference Layers 3-5 only, never Layers 0-2
30. Zero hard-coded CSS values
31. Props define variant selection, not visual properties
32. Visual output is source of truth

### Naming Conventions

33. Base tokens: magnitude-based names (opacity25, blur4, duration150)
34. Semantic tokens: intent-based names (disabled, modal, primary)
35. No semantic names in Layers 0-2
36. No magnitude names in Layer 3

### Swappable Themes

37. Update base tokens → semantic layer auto-updates → components inherit new aesthetic
38. Themes swap at Layer 2 (base tokens), never Layer 3
39. Semantic token structure remains constant across themes

### Token Flow

40. Components consume semantic tokens
41. Semantic tokens reference base tokens
42. Base tokens reference primitives or other base tokens (compound only)
43. Primitives reference constants
44. Constants reference mathematics

### Musical Theory

45. Spacing and typography progressions use just intonation ratios
46. Minor third (1.2): subtle progressions
47. Perfect fifth (1.5): strong progressions
48. Octave (2.0): structural divisions
49. Dominant 7th [1.0, 1.25, 1.5, 1.75]: four-tier hierarchies

### Validation

50. Build passes TypeScript compilation
51. Panda codegen succeeds without warnings
52. Zero orphaned base tokens (all have semantic mappings)
53. Zero semantic names in Layers 0-2

---

## II. Concepts (Design Philosophy)

**Deep-dive rationale for understanding the system architecture.**

### The Minimality Chain

Each layer expresses the minimum necessary to enable the next layer. No more, no less.

**Why minimality?** Reduces coupling, enables swapping entire layers, forces explicit intent at each level. If Layer N can derive value from Layer N-1, it should. If it cannot, the value belongs in Layer N-1.

**Test for minimality:**
- Necessity: Remove this → does something break? If no → delete it
- Duplication: Used in 2+ places? If no → doesn't belong in system
- Expressiveness: Enables layer above? If no → wrong layer
- Abstraction: Always grouped together? If yes → belongs in Layer 4/5

**Cascade:**
```
Constants (math)
  → Primitives (unitless numbers)
    → Base (CSS values with units, design primitives)
      → Semantic (intent-based, usage context)
        → Styles (property bundles)
          → Recipes (variant patterns)
            → Components (visual implementations)
```

Each arrow represents one transformation step. Skipping steps creates coupling. Following the chain creates modularity.

### Base vs Semantic

**Base tokens** encode design primitives — the raw materials of an aesthetic. They describe magnitude, appearance, and progression, never purpose or context.

**Semantic tokens** encode intent and usage — what you want to achieve, not how it looks. They describe roles, states, and contexts.

**The axiom:** Base describes what it IS. Semantic describes what it's FOR.

**Why this separation?** Enables swappable themes. Change neo-brutalism → high-fantasy by swapping base tokens. Semantic structure (disabled, modal, primary) remains constant. Components never know what aesthetic they render.

**Examples:**
- Base: `opacity25` (magnitude), `blur4` (appearance)
- Semantic: `disabled` (state), `modal` (context), `primary` (role)

**Violation patterns:**
- Base token named `disabled` → semantic intent leaked into design layer
- Semantic token named `opacity25` → magnitude leaked into intent layer
- Component referencing `colors.blue.500` → bypassing semantic abstraction

### Swappable Themes

Themes swap at Layer 2 (base tokens). Everything above automatically inherits the new aesthetic.

**How it works:**
1. Define aesthetic A base tokens (neo-brutalism: thick borders, harsh shadows)
2. Define aesthetic B base tokens (high-fantasy: mystical glows, aged materials)
3. Semantic layer maps intents to base tokens (border.default, shadow.elevated)
4. Components reference semantic tokens only
5. Swap base layer → components render new aesthetic without code changes

**Why this matters:** Visual output regenerates from token definitions. Component code is ephemeral, token structure is permanent. Design iteration happens at Layer 2, not Layer 6.

**Constraint:** Semantic token structure must remain constant across themes. If aesthetic A needs `shadow.brutal` but aesthetic B doesn't have that concept, the semantic structure is wrong — likely too design-specific.

### Musical Theory Foundation

Spacing and typography progressions use just intonation musical ratios instead of arbitrary scales.

**Why musical ratios?**
- Simpler math: whole-number ratios (3:2) vs irrational numbers (1.4983)
- Grid alignment: better fit to 8pt grid systems
- Conceptual clarity: "perfect fifth ratio" clearer than "1.5x multiplier"
- Mathematical purity: accurate harmonic relationships
- Natural harmony: spacing feels balanced without manual tweaking

**Just intonation intervals:**
- Minor third (1.2): 6:5 ratio, subtle progressions
- Perfect fourth (1.333): 4:3 ratio, moderate steps
- Perfect fifth (1.5): 3:2 ratio, strong progressions
- Octave (2.0): 2:1 ratio, structural divisions

**Dominant 7th chord (four-tier hierarchies):**
- Root (1.0): maximum contrast, primary level
- Major 3rd (1.25): reduced contrast, secondary level
- Perfect 5th (1.5): further reduced, tertiary level
- Minor 7th (1.75): minimal contrast, quaternary level

**Application:** Text color hierarchies, spacing scales, typography progressions all derive from these ratios. Not arbitrary — grounded in physical acoustics.

### Token Flow Architecture

Tokens flow downward through layers via references. Each layer consumes the layer below.

**Reference syntax:**
- Base → Primitives: direct value access
- Semantic → Base: `{colors.blue.500}` (token reference)
- Styles → Semantic: `{colors.text.primary}` (token reference)
- Recipes → Styles: `layerStyle: 'card'` (style reference)
- Components → Recipes: `className={button({ variant })}` (recipe invocation)

**Critical distinction:** Compound base values (gradients, borders, shadows) can reference other base tokens because they're creating CSS strings, not aliasing tokens. This is Panda CSS documented behavior, not a layer violation.

**Valid compound:**
```
borders.danger.value: '1px solid {colors.red.400}'
```
Both `borders.danger` and `colors.red.400` live in Layer 2. The reference creates a CSS string: `1px solid var(--colors-red-400)`.

**Invalid simple alias:**
```
colors.primary.value: '{colors.blue.500}'
```
This is pure aliasing with no transformation. Belongs in semantic layer: `colors.primary.value: '{colors.blue.500}'` where `colors.primary` is a semantic token.

### Compound Values

Base tokens may reference other base tokens when creating compound CSS values. This is NOT a layer violation.

**Permitted compound patterns:**
- Gradients: multiple color references in gradient string
- Borders: width + style + color in shorthand
- Shadows: offset + blur + color
- Multiple backgrounds: layered background strings

**Why permitted?** The base token transforms multiple base values into a new CSS primitive. It's composition, not aliasing.

**Forbidden pattern:** Simple token reference with zero transformation. Use semantic layer for aliasing.

### Visual Output as Truth

Components exist to render UI matching design requirements. Code structure is secondary to visual output.

**Implications:**
- Visual parity = feature parity (API differences acceptable)
- Component code can be regenerated freely
- Version control enables bold refactoring
- Props are implementation details

**Migration validation:**
1. Screenshot old component in all states
2. Regenerate component using token system
3. Screenshot new component in all states
4. Compare screenshots
5. If identical → migration successful, ship it
6. Props/API changes acceptable as long as visual output matches

**Why this matters:** Design tokens are the source of truth, components are the rendering layer. Tokens persist, components regenerate.

---

## III. Layer Specificity (Minimal Reference)

**Only included when axioms + concepts insufficient. Consult layer-specific rules for edge cases.**

### Layer 0: Constants

Pure mathematics governing all derived values. Musical intervals, grid constants, design constants.

**Musical intervals:** Just intonation ratios (1.2, 1.333, 1.5, 2.0)
**Grid constants:** 8pt grid, 16px base rem
**Design constants:** Min touch target 44×44pt (WCAG, Apple HIG)

### Layer 1: Primitives

Unitless numbers derived from constants via multiplication. Complete progressions without gaps.

**Naming:** Magnitude-based, context-agnostic (small, medium, large OR ratio1, ratio2, ratio3)

### Layer 2: Base Tokens

CSS-ready atomic and compound values. All values have units or valid CSS syntax.

**24 token categories:** colors, gradients, sizes, spacing, fonts, fontSizes, fontWeights, letterSpacings, lineHeights, radii, borders, borderWidths, shadows, easings, opacity, zIndex, assets, durations, animations, aspectRatios, cursor, blur, breakpoints, containerSizes

**Naming:** Magnitude or appearance-based (opacity25, blur4, duration150, brutal, neo, fantasy)

### Layer 3: Semantic Tokens

Usage-oriented tokens with theme/conditional logic. Same 24 categories as base layer.

**Naming:** Intent-based (disabled, modal, primary, elevated, surface, text)
**Conditionals:** `_light`, `_dark`, `_osLight`, `_osDark`, breakpoints, data attributes

### Layer 4: Styles

Reusable property bundles for common patterns.

**Layer styles:** Surface properties (bg, border, shadow, opacity)
**Text styles:** Typography bundles (font family, size, weight, line-height, letter-spacing)
**Animation styles:** Motion patterns (animation name, duration, timing function)

### Layer 5: Recipes

Component variant patterns with compound logic.

**cva:** Single-element components (Button, Badge, Tag)
**sva:** Multi-slot components (Card with header/body/footer, Modal with backdrop/content)

### Layer 6: Components

Minimal implementations producing visual output matching UX requirements.

**Validation:** Zero hard-coded values, all states implemented, theme support, WCAG AA compliance, TypeScript type safety

---

## IV. Neo-Brutalism + High-Fantasy Aesthetics

**Dual aesthetic system for logo designer application.**

### Neo-Brutalism (Camera Layer / UI Controls)

Thick borders (3-5px black), harsh contrast, zero rounded corners, hard shadows (4-8px solid black), saturated primaries, bold sans-serifs (700-900 weight), oversized headings.

**Design primitive:** Brutality through maximalism — maximum borders, maximum shadows, maximum contrast.

### High-Fantasy (World Layer / 3D Canvas)

Gold accents, aged parchment, mystical glows, gothic typography, celtic ornamentation, gemstone accents.

**Design primitive:** Mysticism through detail — layered glows, ornamental complexity, rarity-tier color coding.

### Swappable Implementation

Both aesthetics defined at Layer 2 (base tokens). Semantic layer (Layer 3) maps UI intents (border.default, shadow.elevated) to base tokens. Components (Layer 6) reference semantic tokens only.

**To swap aesthetics:** Replace Layer 2 base token definitions. Entire UI re-renders in new aesthetic without component changes.

---

## V. Integration Boundaries

**Token system ends at Layer 5 (Recipes). Integration with Base UI and business components documented separately.**

**Base UI integration:** See `docs/reference/BASE_UI.md`
**Business components:** See `docs/UI.md`

**Key integration axiom:** Components (Layer 6) consume Layers 3-5 only. Base UI provides behavior (headless primitives), Panda provides styling (tokens + recipes), business components provide domain logic.

---

## VI. Accessibility Requirements

**WCAG AA minimum:**
- Text contrast: 4.5:1 normal, 3:1 large
- UI components: 3:1 minimum
- Focus indicators: clearly visible
- Touch targets: ≥44×44pt
- Color independence: not sole indicator of state

**Token system responsibility:** Ensure semantic tokens meet contrast ratios. Validation at build time, not runtime.

---

## VII. Sources

**Design token theory:**
- Design Tokens W3C Community Group
- Tokens in Design Systems (Nathan Curtis)

**Panda CSS:**
- Official documentation: panda-css.com
- Token system: panda-css.com/docs/theming/tokens
- Semantic tokens: panda-css.com/docs/theming/semantic-tokens

**Accessibility:**
- WCAG 2.1: w3.org/WAI/WCAG21/quickref
- Apple Accessibility: developer.apple.com/accessibility

**Musical theory:**
- Just intonation (Wikipedia)
- Harmonic series (Wikipedia)
- Music and mathematics (Wikipedia)

**Design systems:**
- Apple HIG: developer.apple.com/design/human-interface-guidelines
- Material Design 3: m3.material.io

---

**Document version:** 3.0
**Status:** Active (Base UI era)
**Last updated:** 2025-12-21
