# Styling with Panda CSS

**Stack**: Vite + React + TypeScript + Panda CSS (zero-runtime, build-time atomic CSS)

**Philosophy**: Design token-driven, type-safe styling with predictable cascade layers and zero JavaScript overhead.

---

## Foundational Understanding

### What Panda CSS Is

Panda CSS is a **build-time CSS-in-JS framework** that generates atomic CSS classes from TypeScript/JSX code. Unlike runtime CSS-in-JS (styled-components, Emotion), Panda performs **static extraction** at build time—analyzing your code, generating CSS files, and producing lightweight className strings with zero runtime overhead.

**Core Architecture**:

1. **Static Analysis**: Scans files matching `include` patterns in config
2. **Code Generation**: Creates `styled-system/` directory with type-safe utilities
3. **Atomic CSS Output**: Generates minimal CSS using `@layer` cascade system
4. **Type Safety**: Full TypeScript autocomplete for tokens, utilities, and variants

### Why Panda CSS Exists

**1. Runtime Performance Tax**
Traditional CSS-in-JS (styled-components, Emotion) parses styles at runtime, increasing bundle size and blocking rendering. Panda eliminates this by moving work to build time—generated CSS is pure static files with zero JavaScript overhead.

**2. Token Contract Enforcement**
Tailwind allows arbitrary values (`className="p-[23px]"`). Panda enforces **strict token contracts**—`css({ p: '23px' })` fails TypeScript compilation if `23px` isn't a defined spacing token. This prevents design system drift.

**3. Cascade Layer Predictability**
Traditional CSS specificity creates fragile overrides (`!important` chains, selector weight wars). Panda uses CSS `@layer` to establish **deterministic precedence**:

```
@layer reset, base, tokens, recipes, utilities;
```

Utilities _always_ override recipes. No specificity debugging.

**4. Type-Safe Variants**
Component libraries need variant systems (size, color, state). Panda provides `cva()` and slot recipes with **compile-time variant validation**—invalid variant combinations fail at build, not runtime.

### Origin Story

**Creator**: Segun Adebayo (Chakra UI founder)
**Launch**: July 2023
**Genesis**: June 2020 RFC for static CSS extraction, driven by React Server Components incompatibility with runtime CSS-in-JS and performance demands from Chakra community.

**Timeline Context**:

- **2015-2020**: Runtime CSS-in-JS golden age (~40% adoption by 2020)
- **2020-2022**: Zero-runtime revolution (Linaria, vanilla-extract, Stitches)
- **January 2024**: Styled-components enters maintenance mode
- **2025**: Tailwind dominates (68%), Panda carves niche for type-safe design systems

**Key Innovations**: First framework combining zero-runtime + full TypeScript support + RSC-native + multi-variant components + framework-agnostic (React/Vue/Solid/Svelte).

**Chakra Connection**: Panda = Chakra's styling engine extracted. Chakra v3 aligns APIs with Panda to ease future migration to Ark (headless components) + Panda stack.

---

## Core Mental Models

### 1. Cascade Layers

Panda generates five layers in strict order:

- **reset**: Browser defaults (when `preflight: true`)
- **base**: Global styles, element resets
- **tokens**: Design token CSS variables
- **recipes**: Component variant styles
- **utilities**: Atomic classes (highest precedence)

**Critical Insight**: Utilities override recipes by design. When you `cx(button(), css({ bg: 'red' }))`, red wins because `css()` generates utility-layer classes.

**Gotchas**:

- **Unlayered CSS** (third-party libraries) defeats all Panda layers → Use PostCSS plugin or import as layers
- **Tailwind conflicts**: Share layer names → Rename Panda layers: `layers: { utilities: 'panda_utilities' }`
- **cx() misuse**: Use `css.raw()` for true merging, not `cx()` string concatenation
- **Browser support**: Pre-2022 browsers need `polyfill: true`

### 2. Tokens → Semantics → Usage

**Base Tokens** define raw values:

```typescript
tokens: {
  colors: { pink: { 500: { value: '#ec4899' } } },
  spacing: { 4: { value: '16px' } }
}
```

**Semantic Tokens** create context-aware references:

```typescript
semanticTokens: {
  colors: {
    primary: { value: { base: '{colors.pink.500}', _dark: '{colors.purple.500}' } }
  }
}
```

**Usage** consumes semantic names:

```typescript
css({ bg: 'primary' }) // Auto-switches based on theme
```

This three-tier system separates **values** (tokens) from **meaning** (semantics) from **application** (usage).

### 3. Styling APIs: Decision Tree

**css()** - One-off styles

```typescript
<div className={css({ bg: 'blue.500', p: 4 })} />
```

Use when: No reusability needed.

**css.raw()** - Style composition

```typescript
const base = css.raw({ color: 'red' })
css(base, { fontSize: '2xl' })
```

Use when: Passing styles as props, merging style objects.

**cva()** - Component variants (atomic recipe)

```typescript
const button = cva({
  variants: { size: { sm: {...}, lg: {...} } },
  defaultVariants: { size: 'lg' }
})
```

Use when: Component needs predefined variants, code colocation.

**Config recipes** - Design system variants (JIT)

```typescript
// panda.config.ts
recipes: { button: defineRecipe({...}) }
```

Use when: Shared design system, want minimal bundle (only used variants compiled).

**styled()** - JSX style props

```typescript
<styled.div bg="blue.500" p={4} />
```

Use when: Prefer React-like prop syntax. Trade-off: Larger runtime.

**Anti-patterns**:

- Mixing CVA + Config Recipes (breaks deterministic ordering)
- Using dynamic callbacks in styled() (use `compoundVariants` instead)

### 4. Recipes vs Slot Recipes

**Recipes** style single elements:

```typescript
const badge = cva({
  variants: { color: { red: {...}, blue: {...} } },
  defaultVariants: { color: 'red' }
})
```

**Slot Recipes** style multi-part components:

```typescript
const checkbox = sva({
  slots: ['root', 'control', 'label'],
  variants: { size: { sm: { control: {...}, label: {...} } } },
  compoundVariants: [{ size: 'sm', checked: true, css: {...} }]
})
```

Use slot recipes when component has multiple DOM elements needing coordinated styling. They support **compound variants**—apply styles when _multiple_ variant conditions match.

**Best Practices**:

- Always use `defaultVariants` to prevent invalid states
- Config recipes > atomic recipes for design systems (JIT = smaller bundles)
- Avoid reserved names for boolean variants

### 5. Static Extraction Limits

Panda operates at **build time**, scanning code for patterns.

**✅ Works** (statically analyzable):

```typescript
css({ p: '4', bg: 'red.500' })
```

**❌ Fails** (runtime values):

```typescript
const size = useState(20)
css({ width: size }) // Can't extract
```

**Solution**: Use CSS variables:

```typescript
<div style={{ '--size': size }} className={css({ width: 'var(--size)' })} />
```

Or pre-generate with `staticCss`:

```typescript
staticCss: {
  css: [{ width: ['20px', '40px', '60px'] }]
}
```

### 6. Responsive & Theming

**Mobile-First Breakpoints**:

```typescript
css({ p: { base: '2', md: '4', lg: '6' } })
```

**Custom Breakpoints**:

```typescript
breakpoints: { sm: '640px', '3xl': '1800px' }
```

**Container Queries**:

```typescript
import { cq } from 'styled-system/patterns'
<nav className={cq()}><div className={css({ fontSize: { '@/sm': 'md' } })} /></nav>
```

**Dark Mode**:

```typescript
conditions: {
  dark: '[data-color-mode=dark] &'
},
semanticTokens: {
  colors: {
    bg: { value: { base: 'white', _dark: 'black' } }
  }
}
```

FOUC Prevention:

```html
<script>
  const theme =
    localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  document.documentElement.setAttribute('data-color-mode', theme)
</script>
```

---

## Quick Reference

### Utilities

**Layout**: `display/d`, `position/pos`, `zIndex/z`, `top/left/right/bottom`
**Sizing**: `width/w`, `height/h`, `minW/maxW/minH/maxH`
**Spacing**: `padding/p`, `margin/m`, `px/py/mx/my`, `pt/pb/mt/mb`
**Flex/Grid**: `gap`, `alignItems`, `justifyContent`, `gridTemplateColumns`
**Background**: `backgroundColor/bg`, `bgImage`, `bgGradient`
**Border**: `borderRadius/rounded`, `borderWidth`, `borderColor`
**Effects**: `boxShadow/shadow`, `opacity`
**Typography**: `fontSize`, `fontWeight`, `lineHeight`, `textStyle`
**Transforms**: `scale`, `translateX/x`, `translateY/y`
**Transitions**: `transition`, `transitionDuration`, `animation`

### Conditional Styles

**States**: `_hover`, `_focus`, `_active`, `_disabled`, `_checked`
**Themes**: `_dark`, `_light`, `_osLight`, `_osDark`
**Data Attributes**: `_loading`, `_open`, `_closed`, `_horizontal`, `_vertical`
**Custom Conditions**:

```typescript
conditions: {
  groupHover: '[role=group]:where(:hover, [data-hover]) &'
}
```

### Color Opacity Modifier

```typescript
css({ bg: 'red.300/40', color: 'blue.500/50' })
// Uses CSS color-mix()
```

### Custom Utilities

```typescript
utilities: {
  extend: {
    truncate: {
      values: { type: 'boolean' },
      transform(value) {
        if (!value) return {}
        return {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }
      }
    }
  }
}
```

---

## Design Pattern Library

### Neo-Brutalism

**Principles**: Thick borders (3-5px black), harsh contrast, zero rounded corners, hard shadows (4-8px solid black).

**Color System**: Black (#000) + white (#fff) + saturated primaries (neon green #00FF00, electric blue #0066FF).

**Typography**: Bold sans-serifs (Space Grotesk, Inter Bold), 700-900 weight, oversized headings (48-96px).

**Panda Mapping**:

```typescript
theme: {
  extend: {
    tokens: {
      borderWidths: { brutal: '4px' },
      shadows: {
        brutal: '4px 4px 0 #000',
        brutalLg: '8px 8px 0 #000'
      },
      colors: {
        neonGreen: '#00FF00',
        electricBlue: '#0066FF'
      },
      radii: { none: '0' }
    }
  }
},
recipes: {
  brutalistButton: defineRecipe({
    base: {
      border: '4px solid black',
      borderRadius: 0,
      boxShadow: 'brutal',
      fontWeight: 'bold',
      transition: 'transform 200ms',
      _hover: { transform: 'translate(4px, 4px)', boxShadow: 'none' }
    }
  })
}
```

### Glassmorphism

**Principles**: Background blur (backdrop-filter), semi-transparency (10-40%), subtle borders (1px white/10-30% opacity), multi-layering.

**Color System**: Light rgba() backgrounds (white/15), gradient overlays, high-saturation backdrops.

**Panda Mapping**:

```typescript
theme: {
  extend: {
    tokens: {
      opacity: { glass: { light: 0.1, medium: 0.2, heavy: 0.3 } },
      blur: { glass: { sm: '8px', md: '12px', lg: '16px' } }
    }
  }
},
utilities: {
  extend: {
    backdropBlur: {
      values: 'blur.glass',
      transform: (value) => ({ backdropFilter: `blur(${value})` })
    }
  }
},
layerStyles: {
  glass: {
    bg: 'white/15',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.2)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    borderRadius: '16px'
  }
}
```

### High-Fantasy UI

**Color Palette**: Gold accents (#d7913a, #5f4c0c), aged parchment (#a28f65), mystical glows (orange/purple/blue for rarity).

**Typography**: Gothic/Blackletter for headers (18-24pt), Carolingian/sans-serif for body (12-14pt).

**Components**: Inventory grids (32-48px cells), skill trees (radial nodes), quest logs (expandable lists).

**Ornamentation**: Celtic knots, runic designs, gemstone accents (ruby #8B0000, sapphire #0F52BA).

**Panda Mapping**:

```typescript
theme: {
  extend: {
    tokens: {
      colors: {
        gold: { base: '#d7913a', dark: '#5f4c0c' },
        parchment: '#a28f65',
        mythic: { legendary: '#ff8000', epic: '#a335ee', rare: '#0070dd' }
      },
      fonts: { display: 'Beaufort, serif', body: 'Frutiger, sans-serif' }
    }
  }
},
textStyles: {
  fantasyHeader: {
    fontFamily: 'display',
    fontWeight: 'bold',
    letterSpacing: '-0.02em',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
  }
},
layerStyles: {
  metalFrame: {
    border: '2px solid',
    borderColor: 'gold.dark',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.4)',
    bg: 'parchment',
    borderRadius: '4px'
  }
}
```

### Web 2.0 Patterns

**Skeuomorphism**: Leather textures, stitching, glossy surfaces, reflections (iOS 6 era).

**Frutiger Aero**: Aurora gradients, translucent glass, lens flares, vibrant blues/greens (Windows Vista/7).

**Glossy Buttons**: Top-to-bottom gradient with lighter bottom, reflection overlay, `border-radius: 8px`.

**Modern Interpretation**:

```typescript
recipes: {
  glossyButton: defineRecipe({
    base: {
      background: 'linear-gradient(to bottom, #fff, #ccc)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 4px rgba(0,0,0,0.2)',
      borderRadius: '8px',
      border: '1px solid #999',
      padding: '8px 16px',
      color: '#333',
      fontWeight: '600',
      transition: 'all 200ms',
      _hover: {
        background: 'linear-gradient(to bottom, #f5f5f5, #bbb)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 4px 8px rgba(0,0,0,0.25)',
      },
    },
  })
}
```

---

## References

**Panda CSS**:

- [Official Documentation](https://panda-css.com)
- [GitHub Repository](https://github.com/chakra-ui/panda)
- [Origin Story](https://www.adebayosegun.com/blog/panda-css-the-origin-story)

**Design Systems**:

- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Park UI Components](https://park-ui.com)
- [Ark UI Headless](https://ark-ui.com)

**Visual Testing**:

- [Argos CI](https://argos-ci.com)
- [Playwright Visual Testing](https://playwright.dev/docs/test-snapshots)

**Design Inspiration**:

- [Neo-Brutalism Guide (NN/g)](https://www.nngroup.com/articles/neobrutalism/)
- [Glassmorphism Guide (IxDF)](https://www.interaction-design.org/literature/topics/glassmorphism)
- [Game UI Database](https://www.gameuidatabase.com)
