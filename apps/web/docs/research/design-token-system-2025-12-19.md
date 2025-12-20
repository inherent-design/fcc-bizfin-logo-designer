# Token System Axioms
**Date:** 2025-12-19
**Purpose:** Concise, complete axioms defining final design system goals
**Scope:** WHAT must exist, not HOW to implement

---

## ARCHITECTURE

### Layer Separation
1. **Three-layer architecture is strict and inviolable**
   - Base layer: CSS values with units
   - Semantic layer: References to base/semantic tokens only
   - Component layer: References to semantic tokens only

2. **No direct CSS values in semantic or component layers**
   - Semantic tokens must reference other tokens
   - Components must use semantic tokens exclusively
   - Hard-coded values indicate incomplete token coverage

3. **Token resolution flows unidirectionally**
   - Base → Semantic → Component
   - Semantic tokens may reference base OR other semantic tokens
   - Components may only reference semantic tokens

---

## RATIOS

### Musical Interval Foundation
1. **Musical intervals govern mathematical relationships**
   - Minor Third (1.2): Subtle progressions
   - Perfect Fifth (1.5): Related elements
   - Octave (2.0): Distinct separations

2. **Ratio-to-purpose binding is explicit**
   - Spacing between related sections uses specific ratio
   - Spacing between distinct groups uses specific ratio
   - Size progressions use consistent ratio within category
   - Ratios are chosen for semantic meaning, not aesthetic preference

3. **Ratio consistency within domains**
   - All spacing tokens within same semantic category share ratio
   - All sizing tokens within same semantic category share ratio
   - Cross-domain ratio mixing is intentional, not accidental

---

## BASE CATEGORIES

### Required Base Token Types
1. **Spacing**: Incremental values following ratio progression
2. **Sizing**: Dimensional values for width/height
3. **Colors**: RGB/HSL values with alpha channel support
4. **Typography**: Font family, size, weight, line-height values
5. **Border Radius**: Corner rounding values
6. **Border Width**: Stroke thickness values
7. **Shadows**: Box shadow value strings
8. **Z-Index**: Layering integer values
9. **Timing**: Animation/transition duration values
10. **Easing**: Animation/transition timing function values

### Base Token Characteristics
1. **All base tokens have CSS-compatible values with units**
2. **Base tokens are context-agnostic**
3. **Base token names describe magnitude, not purpose**
4. **Base tokens form complete progressions without gaps**

---

## SEMANTIC CATEGORIES

### Required Semantic Token Types
1. **Proximity**: Spacing relationships (tight, comfortable, spacious, distant)
2. **Hierarchy**: Visual weight levels (primary, secondary, tertiary, quaternary)
3. **State**: Interactive states (default, hover, focus, active, disabled)
4. **Component-specific**: Per-component semantic tokens (button, input, card, etc.)
5. **Layout**: Container, section, region spacing
6. **Typography**: Semantic text styles (heading, body, caption, label)
7. **Color Roles**: Semantic color purposes (surface, border, text, accent, success, warning, error)

### Semantic Token Characteristics
1. **All semantic tokens reference other tokens exclusively**
2. **Semantic tokens encode meaning, not magnitude**
3. **Semantic tokens support theme variants (light/dark minimum)**
4. **Semantic tokens are documentation of design intent**

---

## SPACING SYSTEM

### Grid Foundation
1. **8pt grid is foundational alignment system**
   - All spacing increments align to 8pt baseline
   - Specific increments required: 8, 16, 24, 32, 40, 48
   - Sub-8pt values allowed only for optical alignment exceptions

2. **Negative spacing tokens must exist**
   - Negative values enable overlap effects
   - Negative spacing follows same ratio progression as positive
   - Negative spacing is semantic (overlap.slight, overlap.moderate, etc.)

3. **Spacing encodes spatial relationships**
   - Related elements: Closer proximity
   - Distinct groups: Farther separation
   - Hierarchical depth: Consistent ratio progression

---

## SIZING SYSTEM

### Container Strategy
1. **Containers follow consistent ratio progression**
2. **Container sizes accommodate common breakpoint widths**
3. **Container sizing supports responsive layout needs**
4. **Minimum container sizes are accessibility-driven**

### Touch Targets
1. **Minimum touch target is 44×44pt**
2. **All interactive elements meet minimum or have semantic exception**
3. **Touch target tokens are explicit, not inferred**

---

## COLOR SYSTEM

### Semantic Hierarchies
1. **4-level semantic hierarchy for text colors**
   - Primary: Maximum contrast, critical content
   - Secondary: Reduced contrast, supporting content
   - Tertiary: Further reduced, supplemental content
   - Quaternary: Minimal contrast, decorative/placeholder

2. **4-level semantic hierarchy for background colors**
   - Base: Primary surface color
   - Raised: Elevated surface (cards, modals)
   - Overlay: Semi-transparent overlays
   - Sunken: Inset surfaces (wells, inputs)

3. **State-based color variants**
   - Default, hover, focus, active states are distinct
   - Disabled state has reduced opacity/contrast
   - Error, warning, success states have dedicated palettes

4. **Theme support is non-negotiable**
   - Light theme is complete
   - Dark theme is complete
   - Theme switching does not break semantic meaning

---

## TYPOGRAPHY SYSTEM

### Type Scale
1. **Type scale follows ratio progression**
2. **Type scale covers full range of UI needs**
   - Display sizes for hero content
   - Heading sizes for structure
   - Body sizes for readability
   - Caption/label sizes for metadata

### Type Semantics
1. **Semantic type tokens encode hierarchy and purpose**
2. **Line height is ratio-based and semantic-appropriate**
3. **Font weight progression is semantic, not arbitrary**

---

## INTEGRATION REQUIREMENTS

### Apple HIG Patterns
1. **4-level semantic hierarchies** (as defined above)
2. **8pt grid alignment** (as defined above)
3. **44×44pt minimum touch targets** (as defined above)
4. **SF Pro font family integration** (if applicable)
5. **Dynamic type support considerations** (scalable tokens)

### Material Design Patterns
1. **Elevation system with shadows**
2. **State layer opacity system**
3. **Motion duration/easing curves**

### Accessibility Requirements
1. **WCAG AA minimum contrast ratios**
   - Text: 4.5:1 for normal, 3:1 for large
   - UI components: 3:1 minimum
2. **Focus indicators meet visibility requirements**
3. **Touch targets meet minimum size requirements**
4. **Color is not sole indicator of state/meaning**

---

## COMPLETION CRITERIA

### Coverage
1. **All semantic categories have complete token sets**
   - No missing states (default, hover, focus, active, disabled)
   - No missing hierarchy levels (1-4 where applicable)
   - No missing theme variants (light, dark minimum)

2. **All component spacing needs are addressable**
   - Every component can use semantic spacing tokens exclusively
   - No component requires hard-coded spacing values
   - Component-specific tokens exist where semantic is insufficient

3. **All color roles are defined**
   - Text colors (primary, secondary, tertiary, quaternary)
   - Background colors (base, raised, overlay, sunken)
   - Border colors (subtle, moderate, strong)
   - State colors (success, warning, error, info)
   - Interactive colors (default, hover, focus, active, disabled)

### Architecture Compliance
1. **Three-layer architecture is maintained**
   - No CSS values in semantic layer
   - No CSS values in component layer
   - No direct base token references in components

2. **Ratio consistency is verifiable**
   - All spacing progressions use declared ratio
   - All sizing progressions use declared ratio
   - All type scale progressions use declared ratio

3. **Semantic completeness is testable**
   - Every semantic token resolves to valid base token
   - Every component token resolves to valid semantic token
   - No circular references exist

### Documentation
1. **Every ratio has declared purpose**
2. **Every semantic category has usage guidelines**
3. **Every token has description of intent**
4. **Migration path from old to new is documented**

### Validation
1. **No hard-coded values exist in component code**
2. **All accessibility requirements are met**
3. **All theme variants are complete**
4. **Token naming is consistent and predictable**

---

## NON-GOALS

### What This System Does NOT Require
1. **Pixel-perfect reproduction of any existing system**
   - Extract principles, not implementations
   - Adapt patterns to project needs
   - Maintain semantic consistency over visual mimicry

2. **Infinite token granularity**
   - Complete coverage, not exhaustive enumeration
   - Semantic gaps require new tokens
   - Magnitude gaps may be acceptable if semantic needs are met

3. **Framework-specific implementations**
   - Tokens are framework-agnostic
   - Implementation details are separate concern
   - Output formats are configurable

---

## DECISION FRAMEWORK

### When to Add New Token
1. **Semantic need exists that cannot be met by existing tokens**
2. **Pattern repeats across multiple components**
3. **Hard-coded value appears in component code**
4. **Accessibility requirement cannot be met**

### When NOT to Add New Token
1. **One-off component need with no semantic meaning**
2. **Magnitude difference without semantic difference**
3. **Implementation convenience without design intent**

---

## SUMMARY

This token system is COMPLETE when:
- All base categories exist with full progressions
- All semantic categories exist with complete coverage
- All components use semantic tokens exclusively
- All accessibility requirements are met
- All theme variants are complete
- Architecture layers are strictly separated
- Ratio progressions are consistent and documented
- No hard-coded CSS values exist in semantic/component layers

The system is CORRECT when:
- Semantic tokens encode design intent accurately
- Ratio choices have documented purposes
- Token names predict their usage
- Missing tokens indicate missing semantic concepts
- Theme switching maintains semantic meaning
