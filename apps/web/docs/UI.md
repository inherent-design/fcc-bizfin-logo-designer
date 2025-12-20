# UI Architecture Specification

**Project**: FCC Business & Finance Club Logo Designer - Video Game Interface Redesign
**Status**: Implementation Phase
**Last Updated**: 2025-12-19

---

## Document Purpose

This document specifies the **UI/UX architecture** for the logo designer application. It documents the shift from a traditional web interface to a **video-game-inspired interface** combining neo-brutalist controls with high-fantasy world aesthetics.

**Relationship to Other Docs**:

- Core logo design constraints defined in the original project specification
- Styling philosophy documented in `STYLING.md`
- Stack decisions in `ADR.md`

This spec documents **what the UI is** and **why**, with references to actual implementation files.

---

## Design Vision

### Aesthetic Hybrid

**Control Layer (Camera Space)**: Neo-Brutalism

- Thick borders (3-4px solid black)
- Hard shadows (4-8px solid black offsets)
- High contrast (black/white + saturated accent colors)
- Zero border radius
- Bold typography (600-700 weight)
- Hover states shift shadow position instead of changing color

**World Layer (3D Background)**: High-Fantasy

- Deep void background (near-black with subtle gradients)
- Gold-accented logo floating in space
- Parallax depth layers using CSS 3D transforms
- Mystical glow effects (subtle box-shadow halos)
- Aged parchment textures (future enhancement)

**Philosophy**: Controls feel "grounded" and tactile (physical UI buttons), while the logo exists in a magical, otherworldly space. The contrast creates focus—user manipulates brutalist widgets to affect ethereal design.

### User Experience Model

**Mental Model**: Playing a fantasy game's character customization screen

- **World Space** = The character/logo being customized
- **Camera Overlay** = The UI controls overlaying the game world
- **Gallery Drawer** = Loadout/preset selection menu
- **Tabs** = Equipment/skill categories

**Interaction Philosophy**:

- Direct manipulation (click to edit, drag to adjust)
- No hidden states (all controls visible or in labeled tabs)
- Immediate visual feedback (changes reflect instantly in world)
- Persistent state (designs auto-save to presets)

---

## Core Requirements (from conversation with President)

### Elements to Include

- ✅ Mountains (top-right)
- ✅ Grapevine/Leaf (bottom-right)
- ✅ Handshake (removed from elements, part of shield base)
- ✅ Laurel wreath (base graphics)
- ✅ Dollar sign (bottom-left originally, now bottom-right per swap)
- ✅ Briefcase (top-left)

### Elements Removed

- ❌ Sun (removed from bottom-right)
- ❌ Feathered quill (removed)
- ❌ Line chart behind mountains (removed)

### Design Decisions

- Shield heraldry pattern: alternating filled/empty quadrants
- Quadrants 0 (top-left) and 3 (bottom-right): filled backgrounds
- Quadrants 1 (top-right) and 2 (bottom-left): reveal shield gold
- Base graphics (shield + laurel) share single editable gold color

---

## Data Architecture

### Schema Design Principles

1. **Quadrant-first**: Position is the primary key, not element type
2. **Hierarchical color state**: Base → 2-tone → unique per quadrant
3. **Reference-based SVGs**: Elements reference asset paths, not inline data
4. **Serializable state**: Entire design exports as clean JSON

### State Hierarchy

```
baseDesign (always active)
├─ fillColorForFilledQuadrants    // Shared by positions 0, 3
├─ elementColorOverGold           // Shared by positions 1, 2
└─ elementColorOverFill           // Shared by positions 0, 3

twoToneDesign (nullable, tier 1)
├─ fillColorQuadrant0             // Overrides base for position 0
├─ fillColorQuadrant3             // Overrides base for position 3
└─ uniqueElementColors (nullable, tier 2)
   ├─ elementColorOverQuadrant0Fill  // Overrides base for position 0
   └─ elementColorOverQuadrant3Fill  // Overrides base for position 3
```

### Mode Transition Behavior

**Example: Enable 2-tone → Enable unique colors → Disable unique → Disable 2-tone**

```
1. Start: baseDesign.fillColorForFilledQuadrants = green
           → Both filled quadrants use green

2. Enable 2-tone: twoToneDesign created
                  → Quadrant 0: green (copied from base)
                  → Quadrant 3: maroon (new)
                  → Element colors still from baseDesign.elementColorOverFill

3. Enable unique: uniqueElementColors created
                  → Quadrant 0 element: black (new)
                  → Quadrant 3 element: yellow (new)

4. Disable unique: uniqueElementColors = null
                   → Reverts to baseDesign.elementColorOverFill (original white)

5. Disable 2-tone: twoToneDesign = null
                   → Both quadrants revert to green fill + white element
                   → All tier 1/2 customizations lost (preserved in undo history)
```

This preserves user intent: disabling a mode restores the state before that mode was enabled.

### Color Resolution Logic

```typescript
function getElementColor(position: number, state: LogoState): HSLColor {
  const quad = state.quadrants[position]

  // Over gold (positions 1, 2)
  if (!quad.isFilled) {
    return state.baseDesign.elementColorOverGold
  }

  // Over fill - check tier 2 first
  if (state.twoToneDesign?.uniqueElementColors) {
    return position === 0
      ? state.twoToneDesign.uniqueElementColors.elementColorOverQuadrant0Fill
      : state.twoToneDesign.uniqueElementColors.elementColorOverQuadrant3Fill
  }

  // Fall back to base
  return state.baseDesign.elementColorOverFill
}
```

---

## Technical Stack

### Technology Stack Changes

**From** (Original Design):

- DaisyUI (Tailwind-based CSS components)
- Inline Tailwind utilities
- @dnd-kit/sortable for drag-drop quadrants

**To** (Current Redesign):

- **Panda CSS** (zero-runtime, build-time atomic CSS)
  - Config recipes for design system variants
  - Type-safe styling with full token contracts
  - Cascade layer predictability
- **vite-tsconfig-paths** plugin (bridges Vite/TypeScript module resolution)
- **No drag-drop** (redesign focuses on color/scale/offset controls, not quadrant swapping)

**Why Panda CSS?**

1. **Type safety**: Design tokens enforced at compile time
2. **Zero runtime**: All CSS generated at build, no JS overhead
3. **Recipe system**: Perfect for variant-heavy UI primitives (buttons, panels, inputs)
4. **Design patterns alignment**: Neo-brutalism recipes map cleanly to Panda's utility-first API
5. **RSC-compatible**: Future-proof for server components (though not used yet)

### Component Hierarchy

**Current Architecture**:

```
App
└── WorldSpace (3D container)
    ├── LogoPreviewWorld (floating logo)
    └── CameraSpaceOverlay (UI layer)
        ├── ControlPanel (neo-brutalist tabs)
        │   ├── ColorTab
        │   └── LayoutTab
        └── DesignGalleryDrawer (preset selector)
            ├── GalleryGrid
            ├── DesignThumbnail (per design)
            └── GalleryActions
```

**Rationale**: Separation of concerns between "world rendering" (logo in 3D space) and "camera UI" (controls overlaying the scene). This matches video game architecture where HUD/UI is a separate rendering layer.

### State Management Architecture

**Stores** (Zustand):

1. **logoStore** - Design data (logo schema, colors, quadrants)
2. **worldStore** - Presentation state (how logo is displayed in 3D)
3. **uiStore** - Interaction state (which controls are active)
4. **presetsStore** - Persistence layer (saved/loaded designs)

**Store Separation Philosophy**:

This allows independent serialization: export design JSON without UI/world state, or save camera position separately.

---

## UI Layout

### Layout (Desktop)

```
┌────────────────────────────────────────────────────────────┐
│  FCC Logo Designer          [Save] [Export] [Import]       │
├──────────────────────┬─────────────────────────────────────┤
│                      │                                     │
│   LOGO PREVIEW       │   CONTROLS                          │
│   ┌────────────┐     │   ☐ Enable 2-tone fills             │
│   │  🎨 Shield │     │   ☐ Unique element colors (disabled)│
│   │  with 4    │     │                                     │
│   │  quadrants │     │   Base Color:                       │
│   └────────────┘     │   ┌─────────────────┐               │
│                      │   │ 🎨 Shield Gold  │               │
│   [Interactive       │   └─────────────────┘               │
│    3D world]         │                                     │
│                      │   Quadrant Fills:                   │
│                      │   ┌─────────────────┐               │
│                      │   │ 🎨 Fill Color   │               │
│                      │   └─────────────────┘               │
│                      │                                     │
│                      │   Element Colors:                   │
│                      │   🎨 Over Gold    🎨 Over Fill      │
│                      │                                     │
├──────────────────────┴─────────────────────────────────────┤
│  SAVED DESIGNS                                             │
│  • Default   • High Contrast   • Minimalist                │
└────────────────────────────────────────────────────────────┘
```

### Interaction Flows

#### Resize Element

1. User hovers quadrant → resize handle appears in corner
2. User drags handle → element scales (range: 0.5x - 2.0x)
3. User releases → scale locked, stored in quadrant state

#### Change Color

1. User clicks quadrant → popover shows relevant color picker(s)
2. Popover content depends on mode:
   - **Not filled** (pos 1, 2): "Element Color (over gold)" → affects both pos 1 & 2
   - **Filled, 1-tone**: "Element Color (over fill)" → affects both pos 0 & 3
   - **Filled, 2-tone, no unique**: "Element Color (over fill)" → affects both pos 0 & 3
   - **Filled, 2-tone, unique**: "Element Color (over this fill)" → affects only this position
3. User adjusts HSL sliders → live preview on logo
4. User clicks outside → popover closes, state saved

#### Enable 2-Tone Mode

1. User checks "Enable 2-tone fills"
2. System copies `baseDesign.fillColorForFilledQuadrants` to both tier 1 colors
3. Two new color pickers appear in control panel
4. "Unique element colors" checkbox becomes available
5. User can now edit quadrant 0 and 3 fill colors independently

#### Enable Unique Element Colors

1. User checks "Unique element colors" (only visible when 2-tone enabled)
2. System copies `baseDesign.elementColorOverFill` to both tier 2 colors
3. Clicking filled quadrant now shows position-specific color picker
4. Changes only affect that specific quadrant

---

## Styling System

### Panda CSS Configuration

**File**: `panda.config.ts`

**Key Settings**:

- `preflight: true` (CSS reset)
- `include: ['./src/**/*.{js,jsx,ts,tsx}']` (static analysis scope)
- `outdir: 'styled-system'` (generated code location)
- `jsxFramework: 'react'`

**Design Tokens**:

```typescript
theme: {
  extend: {
    tokens: {
      colors: {
        brutalistBg: '#FFFFFF',
        brutalistText: '#000000',
        brutalistBorder: '#000000',
        brutalistAccent: '#00FF00',
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
  }
}
```

### Recipe Usage Pattern

**Critical Pattern**: Panda recipes use `splitVariantProps` to separate variant props from HTML props.

**Implementation**:

```typescript
import { cx } from 'styled-system/css'
import { neoButton, type NeoButtonVariantProps } from 'styled-system/recipes'

interface ButtonProps extends ComponentProps<'button'>, NeoButtonVariantProps {}

export function Button(props: ButtonProps) {
  const [variantProps, restProps] = neoButton.splitVariantProps(props)
  const { className, ...htmlProps } = restProps

  return (
    <button
      className={cx(neoButton(variantProps), className)}
      {...htmlProps}
    />
  )
}
```

**Why This Pattern?**

- `splitVariantProps` returns `[variantProps, otherProps]`
- `variantProps` = recipe-specific (variant, size)
- `otherProps` = HTML attributes (onClick, disabled, className, etc.)
- `cx()` merges recipe className with additional className
- Recipe classes live in `@layer recipes`, utilities in `@layer utilities`
- Utilities always win due to cascade layer order

### Responsive Syntax

Panda uses object syntax for responsive values:

```typescript
css({
  p: { base: '2', md: '4', lg: '6' }, // Mobile-first breakpoints
  bg: { base: 'white', _dark: 'black' }, // Theme conditions
})
```

---

## Component Architecture

### WorldSpace

**File**: `src/components/world/WorldSpace.tsx`

**Purpose**: 3D container using CSS transforms (not three.js).

**Responsibilities**:

- Establish `transform-style: preserve-3d` context
- Apply parallax depth layers
- Render background gradients (fantasy void aesthetic)

**CSS Pattern**:

```typescript
css({
  position: 'relative',
  width: '100vw',
  height: '100vh',
  bg: 'linear-gradient(to bottom, #0a0a0f, #1a1a2e)',
  transformStyle: 'preserve-3d',
  perspective: '1000px',
})
```

### LogoPreviewWorld

**File**: `src/components/world/LogoPreviewWorld.tsx`

**Purpose**: Render logo SVG with design state applied.

**Responsibilities**:

- Subscribe to `logoStore` state
- Apply colors via SVG manipulation utility
- Apply scales/offsets to quadrant elements
- Handle 3D rotation from `worldStore`

**State Dependencies**:

- `logoStore.quadrants`: Element positions, scales, offsets
- `logoStore.baseDesign`, `logoStore.twoToneDesign`: Color resolution
- `worldStore.rotation`: 3D transform values

### CameraSpaceOverlay

**File**: `src/components/camera/CameraSpaceOverlay.tsx`

**Purpose**: Overlay UI layer (controls + drawer) on top of world.

**Responsibilities**:

- Position UI elements with `position: absolute`
- Establish stacking context (`z-index` management)
- Render children (ControlPanel, DesignGalleryDrawer)

### ControlPanel

**File**: `src/components/camera/ControlPanel.tsx`

**Purpose**: Tabbed control panel for design manipulation.

**Responsibilities**:

- Render tab navigation (ColorTab, LayoutTab)
- Subscribe to `uiStore.activeTab`
- Apply neo-brutalist panel recipe

**Responsive Behavior**: Uses Panda's responsive object syntax:

```typescript
css({
  position: { base: 'fixed', md: 'absolute' },
  bottom: { base: '0', md: '2rem' },
  right: { base: '0', md: '2rem' },
  width: { base: '100%', md: '400px' },
})
```

### ColorTab & LayoutTab

**Files**: `src/components/tabs/ColorTab.tsx`, `src/components/tabs/LayoutTab.tsx`

**ColorTab Purpose**: Color customization controls.

**Responsibilities**:

- Render color pickers for baseColor, fillColors, elementColors
- Subscribe to `logoStore` color state
- Trigger color setter actions on change

**LayoutTab Purpose**: Scale and offset controls.

**Responsibilities**:

- Render sliders for elementScale (per quadrant)
- Render X/Y offset inputs (per quadrant)
- Subscribe to `logoStore.quadrants`
- Trigger layout setter actions

---

## Project Structure

```
src/
├── assets/
│   └── svg/                     # Element SVG files
├── components/
│   ├── camera/                  # UI overlay components
│   │   ├── CameraSpaceOverlay.tsx
│   │   ├── ControlPanel.tsx
│   │   └── DesignGalleryDrawer.tsx
│   ├── gallery/                 # Preset management
│   │   ├── DesignThumbnail.tsx
│   │   ├── GalleryActions.tsx
│   │   └── GalleryGrid.tsx
│   ├── tabs/                    # Control panel tabs
│   │   ├── ColorTab.tsx
│   │   └── LayoutTab.tsx
│   ├── ui/                      # Primitive components
│   │   ├── Button.tsx
│   │   ├── Panel.tsx
│   │   ├── Input.tsx
│   │   ├── Tabs.tsx
│   │   └── Icon.tsx
│   └── world/                   # 3D world components
│       ├── WorldSpace.tsx
│       └── LogoPreviewWorld.tsx
├── hooks/
│   ├── useGyroscopeTilt.ts
│   ├── useLogoTilt.ts
│   ├── useMouseTracking.ts
│   └── useThumbnailGenerator.ts
├── store/                       # Zustand stores
│   ├── logoStore.ts
│   ├── worldStore.ts
│   ├── uiStore.ts
│   └── presetsStore.ts
├── utils/                       # Utilities
│   ├── animations.ts
│   ├── colors.ts
│   ├── logger.ts
│   ├── svg.ts
│   └── theme.ts
├── App.tsx
└── main.tsx
```

---

## Success Criteria

**Minimum Viable Product**:

1. Display shield with 4 quadrants
2. Change colors for base, fills, and elements
3. Adjust element scale and offset per quadrant
4. Save/load designs to localStorage
5. Export state as JSON

**Meeting Demo Ready**:

- Project on screen
- Live color changes
- Adjust scales/offsets in real-time
- Save "Option A", "Option B", "Option C"
- Show president → gather feedback → iterate

**Future Production Ready**:

- Export final SVG for print
- Export PNG at 300 DPI
- PDF export (vector format for print)
- Version control for design iterations
- Share links for remote collaboration

---

## Future Enhancements

### Planned Features

**3D Enhancements**:

- Real parallax layers (separate SVG layers at different Z depths)
- Gyroscope tilt on mobile devices
- Camera position presets (front, angled, top-down)

**Color System**:

- Palette presets (save color schemes separately from full designs)
- Color harmony suggestions (complementary, triadic, analogous)
- Accessibility contrast checker (WCAG compliance)

**Preset Management**:

- Cloud sync (save to backend API)
- Design versioning (track iterations)
- Share links (public URL for design preview)

**Export**:

- SVG export (concatenate elements + apply colors)
- PNG export (canvas rendering at 300 DPI)
- PDF export (vector format for print)

### Long-Term Vision

**Multiplayer Editing**:

- WebSocket-based real-time collaboration
- Cursor tracking (see other users' edits)
- Design comments/annotations

**AI Integration**:

- Color palette generation from text prompt
- Element arrangement suggestions
- Design critique (balance, contrast, hierarchy)

---

**Document Version**: 2.0 (Merged from v1 + v2)
**Status**: Implementation phase - core architecture complete
**Last Updated**: 2025-12-19
