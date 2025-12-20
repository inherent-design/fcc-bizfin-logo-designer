# Styling with Panda CSS

**Stack**: Vite + React + TypeScript + Panda CSS (zero-runtime, build-time atomic CSS)

**Philosophy**: Design token-driven, type-safe styling with predictable cascade layers and zero JavaScript overhead.

---

## Project-Specific Design Patterns

This document focuses on the **project-specific styling patterns** for the FCC Logo Designer. For comprehensive Panda CSS documentation, see:

- **Panda CSS Architecture**: `/Users/zer0cell/production/.atlas/integrator-reports/panda-css-architecture-research-2025-12-17.md`
- **UI Architecture**: `UX_ARCHITECTURE.md` (aesthetic principles and component structure)

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

### Color Opacity Modifier

```typescript
css({ bg: 'red.300/40', color: 'blue.500/50' })
// Uses CSS color-mix()
```

---

## Pattern System

### Text Styles Pattern

**What**: Reusable typography combinations that bundle font properties (size, weight, line-height, letter-spacing) into named styles.

**Why**: Enforces DRY principle, ensures typographic consistency across components, and simplifies maintenance when design system evolves.

**How**:

```typescript
// panda.config.ts
textStyles: {
  brutalistLabel: {
    fontFamily: 'mono',
    fontSize: 'sm',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  }
}

// Component usage
<label className={css({ textStyle: 'brutalistLabel' })}>
  Name
</label>
```

**Available Styles**:

- `brutalistLabel` - Monospace uppercase labels for forms
- `sectionHeader` - Bold section headings
- `formLabel` - Standard form field labels
- `brutalistText` - Body text in brutalist style

**Override Pattern**: Can override individual properties when component needs slight variation:

```typescript
css({
  textStyle: 'brutalistLabel',
  fontSize: 'xs' // Override just the size
})
```

### Layer Styles Pattern

**What**: Reusable container patterns combining borders, shadows, backgrounds, and spacing—the visual "skin" of components.

**Why**: Creates consistent visual language across cards, panels, and containers. Easier theming and style updates.

**How**:

```typescript
// panda.config.ts
layerStyles: {
  brutalInset: {
    border: '3px solid black',
    boxShadow: 'inset 4px 4px 0 rgba(0,0,0,0.2)',
    bg: 'gray.50',
    p: 4
  }
}

// Component usage
<div className={css({ layerStyle: 'brutalInset' })}>
  Content
</div>
```

**Available Styles**:

- `brutalInset` - Inset brutal container for form inputs

### TextStyle Decision Matrix

Understanding when to create, override, or skip textStyles:

**When to CREATE new textStyle**:

- **Concern**: Design system level (3+ components will use it)
- **Usage**: Repeated pattern with consistent properties
- **Context**: Global typography standard
- **Example**: `brutalistLabel` used across all form labels

**When to OVERRIDE textStyle**:

- **Concern**: Component-specific variation
- **Usage**: One-off adjustment for specific context
- **Context**: Local styling that deviates from design system
- **Example**: `textStyle: 'brutalistLabel', fontSize: 'xs'` for compact layout

**When to SKIP textStyle (use inline)**:

- **Concern**: Completely unique, no reusable base pattern
- **Usage**: One-time use with no similarity to existing styles
- **Context**: Component-specific without any reusable foundation
- **Example**: Custom animated text with transforms and effects

**Golden Rule**: If you're overriding 3+ properties of a textStyle, create a new textStyle instead.

### Animation Styles Pattern

**What**: Reusable animation and transition patterns for consistent motion design across components.

**Why**: Ensures consistent motion language, improves performance by reusing animation definitions, and simplifies maintenance.

**How**:

```typescript
// panda.config.ts
animationStyles: {
  scaleHover: {
    transition: 'transform 200ms ease-in-out',
    _hover: {
      transform: 'scale(1.05)'
    }
  }
}

// Component usage
<button className={css({ animationStyle: 'scaleHover' })}>
  Hover me
</button>
```

**Available Styles**:

- `scaleHover` - Scale effect on hover for interactive elements

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

## Project Aesthetic: Neo-Brutalism + High-Fantasy

### Hybrid Approach

This project combines **Neo-Brutalism** for UI controls with **High-Fantasy** for the world layer. See `UX_ARCHITECTURE.md` for detailed aesthetic principles.

**Key Design Tokens**:

```typescript
tokens: {
  colors: {
    // Neo-brutalist controls
    brutalistBg: '#FFFFFF',
    brutalistText: '#000000',
    brutalistBorder: '#000000',
    brutalistAccent: '#00FF00',

    // High-fantasy world
    fantasyGold: '#d7913a',
    fantasyVoid: '#0a0a0f'
  },
  shadows: {
    brutal: '4px 4px 0 #000',
    brutalLg: '8px 8px 0 #000',
    brutalInset: 'inset 4px 4px 0 rgba(0,0,0,0.2)'
  },
  borderWidths: {
    brutal: '3px',
    brutalThick: '4px'
  }
}
```

### Usage Guidelines

**For UI Controls** (Camera Layer):

- Use neo-brutalist tokens (brutalist*)
- Apply thick borders and hard shadows
- Use high-contrast colors
- Zero border radius

**For World/Logo** (3D Layer):

- Use fantasy tokens (fantasy*)
- Apply subtle glows and depth cues
- Use gold/parchment color palette
- Organic, mystical aesthetics

---

## References

**Panda CSS**:

- [Official Documentation](https://panda-css.com)
- [GitHub Repository](https://github.com/chakra-ui/panda)

**Design Systems**:

- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Park UI Components](https://park-ui.com)
- [Ark UI Headless](https://ark-ui.com)

**Design Inspiration**:

- [Neo-Brutalism Guide (NN/g)](https://www.nngroup.com/articles/neobrutalism/)
- [Glassmorphism Guide (IxDF)](https://www.interaction-design.org/literature/topics/glassmorphism)
- [Game UI Database](https://www.gameuidatabase.com)

---

**For comprehensive Panda CSS guidance**, including:
- Core primitives and mental models
- Token architecture and generation
- Recipe vs pattern system
- Build-time computation
- Edge cases and gotchas
- Migration strategies

**See**: `/Users/zer0cell/production/.atlas/integrator-reports/panda-css-architecture-research-2025-12-17.md`
