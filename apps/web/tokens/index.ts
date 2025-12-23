/**
 * Design Token System - Main Export
 *
 * Four-layer architecture:
 * - Layer 0: constants.ts (pure math, ratios, base values)
 * - Layer 1: primitives.ts (unitless calculations)
 * - Layer 2: base/* (CSS-valued tokens)
 * - Layer 3: semantic/* (token references, theme-aware)
 *
 * MIGRATION: 1rem = 16px (browser default)
 * - All spacing/sizing values recalculated from 1rem = 10px to 1rem = 16px
 * - Visual pixel sizes remain unchanged (8px is still 8px)
 * - Rem values are now different (8px = 0.5rem instead of 0.8rem)
 *
 * Usage in panda.config.ts:
 * ```typescript
 * import { baseTokens, semanticTokens } from './src/tokens-new'
 *
 * export default defineConfig({
 *   theme: {
 *     extend: {
 *       tokens: baseTokens,
 *       semanticTokens: semanticTokens,
 *     }
 *   }
 * })
 * ```
 */

// Layer 0: Constants (mathematical foundations)
export * from './constants'

// Layer 1: Primitives (unitless calculations)
export * from './primitives'

// Layer 2: Base tokens (CSS values)
export { baseTokens } from './base'

// Layer 3: Semantic tokens (token references)
export { semanticTokens } from './semantic'

// Layer 4: Styles (text styles, layer styles)
export { layerStyles } from './styles/layerStyles'
export { textStyles } from './styles/textStyles'

// Layer 5: Recipes (component styling patterns)
export { recipes } from './recipes'
