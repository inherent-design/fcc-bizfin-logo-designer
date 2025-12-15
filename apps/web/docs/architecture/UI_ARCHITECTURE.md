# UI Architecture Specification

**Project**: FCC Business & Finance Club Logo Designer - Video Game Interface Redesign
**Status**: Implementation Phase
**Last Updated**: 2025-12-13

---

## Document Purpose

This document specifies the **redesigned UI/UX architecture** for the logo designer application. It documents the shift from a traditional web interface to a **video-game-inspired interface** combining neo-brutalist controls with high-fantasy world aesthetics.

**Relationship to Other Docs**:

- Core logo design constraints remain as defined in `ARCHITECTURE.md` (in this folder)
- Styling philosophy documented in `../design-system/STYLING.md`
- Panda CSS development patterns in `../development/STYLE_DEV.md`
- Stack decisions for original design in `DECISIONS.md` (in this folder)

This spec documents **what changed** in the UI redesign and **why**, with references to actual implementation files.

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

## Core Constraints

**Critical Requirement**: The logo design schema, functionality, and default state **MUST remain unchanged**.

### Logo Design Schema (Immutable)

Defined in `@fcc-bizfin-logo-designer/web/config/defaultDesign.json`:

**Structure**:

- `availableElements`: Array of element IDs (briefcase, mountains, leaf, dollar)
- `baseColor`: HSL object for shield/laurel base
- `baseDesign`: Shared element colors (elementColorOverBase, elementColorOverFilledQuadrants, fillColorForFilledQuadrants)
- `quadrants`: Array[4] with (elementId, elementScale, centerOffset, isFilled)
- `twoToneDesign`: Optional tier-1 overrides (fillColorQuadrant0, fillColorQuadrant3, uniqueElementColors)
- `version`: Semver string

**Store Actions (Cannot Change)**:

From `@fcc-bizfin-logo-designer/web/src/store/logoStore.ts`:

- `setBaseColor(color: HSLColor)`
- `setElementScale(position, scale)`
- `setCenterOffset(position, offset)`
- `setBaseFillColor(color: HSLColor)`
- `setBaseElementColorOverBase(color: HSLColor)`
- `enableTwoTone()` / `disableTwoTone()`
- `setTwoToneFillColor(quadrantIndex, color)`
- `enableUniqueElementColors()` / `disableUniqueElementColors()`
- `setUniqueElementColor(quadrantIndex, color)`

**Forbidden Actions**: Any setters for per-quadrant scale, offset, isFilled, or elementId that bypass the schema hierarchy.

### Logo Rendering Constraints

**Color Resolution Logic**: Must follow tier system (base → twoTone → uniqueElementColors) as documented in `ARCHITECTURE.md` (in this folder) section "Color Resolution Logic".

**SVG Manipulation**: Element colors applied via `applyElementColors()` utility (see `@fcc-bizfin-logo-designer/web/src/utils/svg.ts`), which must preserve shield structure while allowing color customization.

---

## Architecture Decisions

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

### Component Hierarchy Changes

**From** (Original):

```
App
├── LogoPreview
├── QuadrantGrid (drag-drop)
├── ColorDrawer
└── ControlPanel
```

**To** (Current):

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

**New Stores** (in addition to existing `logoStore`):

1. **worldStore** (`@fcc-bizfin-logo-designer/web/src/store/worldStore.ts`)
   - 3D transform state (rotation, tilt, parallax)
   - Camera positioning
   - Animation state (gyroscope, mouse tracking)

2. **uiStore** (`@fcc-bizfin-logo-designer/web/src/store/uiStore.ts`)
   - Active tab selection
   - Drawer open/closed state
   - Control panel visibility

3. **presetsStore** (`@fcc-bizfin-logo-designer/web/src/store/presetsStore.ts`)
   - Saved designs collection
   - Active design selection
   - Thumbnail generation state

**Store Separation Philosophy**:

- `logoStore` = **design data** (logo schema, colors, quadrants)
- `worldStore` = **presentation state** (how logo is displayed in 3D)
- `uiStore` = **interaction state** (which controls are active)
- `presetsStore` = **persistence layer** (saved/loaded designs)

This allows independent serialization: export design JSON without UI/world state, or save camera position separately.

---

## File Organization

### Abstract Structure

```
fcc-bizfin-logo-designer/                    # Workspace root
├── apps/
│   ├── @fcc-bizfin-logo-designer/api/       # FastAPI backend (future)
│   └── @fcc-bizfin-logo-designer/web/       # Vite + React frontend
│       ├── config/
│       │   └── defaultDesign.json           # Initial logo state
│       ├── public/
│       │   └── vite.svg                     # Favicon
│       ├── src/
│       │   ├── assets/
│       │   │   └── svg/                     # Element SVG files
│       │   ├── components/
│       │   │   ├── camera/                  # UI overlay components
│       │   │   │   ├── CameraSpaceOverlay.tsx
│       │   │   │   ├── ControlPanel.tsx
│       │   │   │   └── DesignGalleryDrawer.tsx
│       │   │   ├── gallery/                 # Preset management
│       │   │   │   ├── DesignThumbnail.tsx
│       │   │   │   ├── GalleryActions.tsx
│       │   │   │   └── GalleryGrid.tsx
│       │   │   ├── tabs/                    # Control panel tabs
│       │   │   │   ├── ColorTab.tsx
│       │   │   │   └── LayoutTab.tsx
│       │   │   ├── ui/                      # Primitive components
│       │   │   │   ├── Button.tsx           # Neo-brutalist button
│       │   │   │   ├── Panel.tsx            # Neo-brutalist panel
│       │   │   │   ├── Input.tsx            # Neo-brutalist input
│       │   │   │   ├── Tabs.tsx             # Tab container
│       │   │   │   └── Icon.tsx             # SVG icon wrapper
│       │   │   ├── world/                   # 3D world components
│       │   │   │   ├── WorldSpace.tsx       # 3D container
│       │   │   │   └── LogoPreviewWorld.tsx # Logo renderer
│       │   │   └── [legacy components]      # Pre-redesign (to be removed)
│       │   ├── constants/
│       │   │   ├── elements.ts              # Element metadata
│       │   │   └── presets.ts               # Default presets
│       │   ├── hooks/
│       │   │   ├── useGyroscopeTilt.ts      # Device motion
│       │   │   ├── useLogoTilt.ts           # Mouse parallax
│       │   │   ├── useMouseTracking.ts      # Cursor tracking
│       │   │   └── useThumbnailGenerator.ts # Design previews
│       │   ├── schemas/
│       │   │   └── logoState.schema.ts      # Zod validation
│       │   ├── store/                       # Zustand stores
│       │   │   ├── logoStore.ts             # Core design state
│       │   │   ├── worldStore.ts            # 3D presentation
│       │   │   ├── uiStore.ts               # Interaction state
│       │   │   └── presetsStore.ts          # Saved designs
│       │   ├── utils/                       # Utilities
│       │   │   ├── index.ts                 # Barrel exports
│       │   │   ├── animations.ts            # Animation helpers
│       │   │   ├── colors.ts                # HSL utilities
│       │   │   ├── logger.ts                # Console wrapper
│       │   │   ├── svg.ts                   # SVG manipulation
│       │   │   └── theme.ts                 # Theme utilities
│       │   ├── App.tsx                      # Root component
│       │   ├── main.tsx                     # Entry point
│       │   └── index.css                    # Global styles
│       ├── styled-system/                   # Generated by Panda
│       │   ├── css/                         # Utilities (css, cx, cva, sva)
│       │   ├── jsx/                         # Styled JSX components
│       │   ├── patterns/                    # Layout patterns
│       │   ├── recipes/                     # Component variants
│       │   └── tokens/                      # Design tokens
│       ├── panda.config.ts                  # Panda CSS config
│       ├── postcss.config.cjs               # PostCSS (Panda integration)
│       ├── tsconfig.app.json                # TypeScript config
│       ├── vite.config.ts                   # Vite + plugins
│       └── package.json
├── docs/                                    # Documentation
│   ├── ARCHITECTURE.md                      # Original design spec
│   ├── DECISIONS.md                         # Stack rationale
│   ├── STYLING.md                           # Panda CSS deep dive
│   ├── STYLE_DEV.md                         # Development guide
│   ├── GITOPS.md                            # CI/CD patterns
│   └── UI_ARCHITECTURE.md                   # This file
└── package.json                             # Workspace root
```

**Key Organizational Principles**:

1. **Domain separation**: `camera/` (UI controls) vs `world/` (logo rendering)
2. **Primitive isolation**: `ui/` contains only reusable recipe-based components
3. **Store naming**: `store/` is canonical, `stores/` is legacy (to be removed)
4. **Barrel exports**: `utils/index.ts` re-exports all utilities for cleaner imports
5. **Generated code isolation**: `styled-system/` never manually edited

---

## State Management Contracts

### logoStore (Core Design State)

**File**: `@fcc-bizfin-logo-designer/web/src/store/logoStore.ts`

**Responsibilities**:

- Manage logo design schema (matches `defaultDesign.json`)
- Enforce color tier hierarchy (base → twoTone → uniqueElementColors)
- Persist designs to localStorage via Zustand persist middleware
- Export/import JSON snapshots

**Key Selectors** (read state):

- `getQuadrant(position)`: Get quadrant config
- `getResolvedElementColor(position)`: Compute effective color via tier logic
- `getResolvedFillColor(position)`: Compute effective fill color

**Key Actions** (write state):

- Color setters: `setBaseColor`, `setBaseFillColor`, `setTwoToneFillColor`, `setUniqueElementColor`
- Layout setters: `setElementScale`, `setCenterOffset`
- Mode toggles: `enableTwoTone`, `disableTwoTone`, `enableUniqueElementColors`, `disableUniqueElementColors`

**Persistence**: Entire store serialized to `localStorage.getItem('logo-designer-state')`.

### worldStore (3D Presentation State)

**File**: `@fcc-bizfin-logo-designer/web/src/store/worldStore.ts`

**Responsibilities**:

- Track 3D transform state (rotationX, rotationY, rotationZ)
- Manage parallax layers depth
- Control gyroscope/mouse tracking toggles

**State Shape**:

```typescript
{
  rotation: { x: number, y: number, z: number },
  parallaxDepth: number,
  gyroscopeEnabled: boolean,
  mouseTrackingEnabled: boolean
}
```

**Actions**:

- `setRotation(axis, value)`
- `setParallaxDepth(depth)`
- `toggleGyroscope()` / `toggleMouseTracking()`

**Not Persisted**: UI state is ephemeral, resets on page reload.

### uiStore (Interaction State)

**File**: `@fcc-bizfin-logo-designer/web/src/store/uiStore.ts`

**Responsibilities**:

- Track active tab (color, layout)
- Drawer open/closed state
- Control panel visibility

**State Shape**:

```typescript
{
  activeTab: 'color' | 'layout',
  drawerOpen: boolean,
  controlPanelVisible: boolean
}
```

**Actions**:

- `setActiveTab(tab)`
- `toggleDrawer()` / `openDrawer()` / `closeDrawer()`
- `toggleControlPanel()`

**Not Persisted**: UI state is ephemeral.

### presetsStore (Persistence Layer)

**File**: `@fcc-bizfin-logo-designer/web/src/store/presetsStore.ts`

**Responsibilities**:

- Manage collection of saved designs
- Track active design ID
- Generate thumbnails for gallery

**State Shape**:

```typescript
{
  designs: Array<{ id: string, name: string, state: LogoState, thumbnail?: string }>,
  activeDesignId: string | null
}
```

**Actions**:

- `saveDesign(name, state)`: Add new design to collection
- `loadDesign(id)`: Load design into logoStore
- `deleteDesign(id)`: Remove from collection
- `generateThumbnail(id)`: Create preview image

**Persistence**: Entire store serialized to `localStorage.getItem('logo-presets')`.

---

## Styling System

### Panda CSS Configuration

**File**: `@fcc-bizfin-logo-designer/web/panda.config.ts`

**Key Settings**:

- `preflight: true` (CSS reset)
- `include: ['./src/**/*.{js,jsx,ts,tsx}']` (static analysis scope)
- `outdir: 'styled-system'` (generated code location)
- `emitPackage: true` (generate package.json for imports)
- `importMap: '@styled-system'` (HMR tracking for styled-system changes)
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

**Recipes Defined** (see `panda.config.ts` recipes section):

- `neoButton`: Button variants (primary, secondary, danger, ghost) × sizes (sm, md, lg)
- `neoPanel`: Panel variants (base, elevated, sunken)
- `neoInput`: Input variants (text, number) × sizes (sm, md, lg)

### Recipe Usage Pattern

**Critical Pattern**: Panda recipes use `splitVariantProps` to separate variant props from HTML props.

**Implementation** (see `@fcc-bizfin-logo-designer/web/src/components/ui/Button.tsx`):

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

**Anti-Pattern** (causes TypeScript errors):

```typescript
// ❌ WRONG: Passing className directly to recipe
neoButton({ variant, size, className }) // Error: className not a variant prop
```

**Same pattern applies to**: Panel, Input, and any future recipe-based components.

### Responsive Syntax

Panda uses object syntax for responsive values:

```typescript
css({
  p: { base: '2', md: '4', lg: '6' }, // Mobile-first breakpoints
  bg: { base: 'white', _dark: 'black' }, // Theme conditions
})
```

**Breakpoints** (defined in `panda.config.ts`):

- `base`: 0px (default)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Custom Conditions**:

- `_dark`: Dark mode selector
- `_hover`, `_focus`, `_active`: Interaction states
- `_disabled`, `_checked`: Element states

### Module Resolution (Critical)

**Problem**: TypeScript `paths` in `tsconfig.app.json` doesn't automatically apply to Vite's bundler.

**Solution**: `vite-tsconfig-paths` plugin bridges the gap.

**Configuration**:

1. **Install**: `pnpm add -D vite-tsconfig-paths`
2. **Vite Config** (`@fcc-bizfin-logo-designer/web/vite.config.ts`):

   ```typescript
   import tsconfigPaths from 'vite-tsconfig-paths'

   export default defineConfig({
     plugins: [react(), tsconfigPaths()],
   })
   ```

3. **TypeScript Config** (`tsconfig.app.json`):
   ```json
   {
     "compilerOptions": {
       "paths": {
         "styled-system/*": ["./styled-system/*"]
       }
     },
     "include": ["src", "styled-system"]
   }
   ```

**Result**: Both `tsc` and Vite can resolve `styled-system/css`, `styled-system/recipes` imports.

### Barrel Exports

**File**: `@fcc-bizfin-logo-designer/web/src/utils/index.ts`

**Purpose**: Simplify imports from utility modules.

**Implementation**:

```typescript
export * from './animations'
export * from './colors'
export * from './logger'
export * from './svg'
export * from './theme'
```

**Usage**:

```typescript
// Before
import { applyElementColors } from '../../utils/svg'
import { hslToString } from '../../utils/colors'

// After
import { applyElementColors, hslToString } from '../../utils'
```

**Caveat**: If multiple modules export the same name (e.g., `hslToString` in both `colors.ts` and `svg.ts`), TypeScript throws ambiguity error. Solution: Either:

1. Remove duplicate export from one module
2. Use explicit re-exports with renaming:
   ```typescript
   export { hslToString } from './colors'
   export { hslToString as svgHslToString } from './svg'
   ```

---

## Component Hierarchy Deep Dive

### WorldSpace

**File**: `@fcc-bizfin-logo-designer/web/src/components/world/WorldSpace.tsx`

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

**Children**: LogoPreviewWorld, CameraSpaceOverlay.

### LogoPreviewWorld

**File**: `@fcc-bizfin-logo-designer/web/src/components/world/LogoPreviewWorld.tsx`

**Purpose**: Render logo SVG with design state applied.

**Responsibilities**:

- Subscribe to `logoStore` state
- Apply colors via `applyElementColors()` utility
- Apply scales/offsets to quadrant elements
- Handle 3D rotation from `worldStore`

**Critical Functions Used**:

- `applyElementColors(svgString, targetSelectors, colors)`: Injects fill colors into SVG
- `extractGroupContent(svgString, groupId)`: Extracts element SVG from composite

**State Dependencies**:

- `logoStore.quadrants`: Element positions, scales, offsets
- `logoStore.baseDesign`, `logoStore.twoToneDesign`: Color resolution
- `worldStore.rotation`: 3D transform values

**Rendering Pattern**:

```typescript
<div
  style={{
    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
  }}
  dangerouslySetInnerHTML={{ __html: applyElementColors(...) }}
/>
```

### CameraSpaceOverlay

**File**: `@fcc-bizfin-logo-designer/web/src/components/camera/CameraSpaceOverlay.tsx`

**Purpose**: Overlay UI layer (controls + drawer) on top of world.

**Responsibilities**:

- Position UI elements with `position: absolute`
- Establish stacking context (`z-index` management)
- Render children (ControlPanel, DesignGalleryDrawer)

**CSS Pattern**:

```typescript
css({
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none', // Allow clicks to pass through to world
  '& > *': { pointerEvents: 'auto' }, // Re-enable for children
})
```

### ControlPanel

**File**: `@fcc-bizfin-logo-designer/web/src/components/camera/ControlPanel.tsx`

**Purpose**: Tabbed control panel for design manipulation.

**Responsibilities**:

- Render tab navigation (ColorTab, LayoutTab)
- Subscribe to `uiStore.activeTab`
- Apply neo-brutalist panel recipe

**Recipe Usage**:

```typescript
import { neoPanel } from 'styled-system/recipes'

<div className={neoPanel({ variant: 'elevated' })}>
  <Tabs />
  {activeTab === 'color' && <ColorTab />}
  {activeTab === 'layout' && <LayoutTab />}
</div>
```

**Responsive Behavior**: Uses Panda's responsive object syntax:

```typescript
css({
  position: { base: 'fixed', md: 'absolute' },
  bottom: { base: '0', md: '2rem' },
  right: { base: '0', md: '2rem' },
  width: { base: '100%', md: '400px' },
})
```

### DesignGalleryDrawer

**File**: `@fcc-bizfin-logo-designer/web/src/components/camera/DesignGalleryDrawer.tsx`

**Purpose**: Side drawer for preset management.

**Responsibilities**:

- Render saved designs grid
- Subscribe to `presetsStore.designs`, `uiStore.drawerOpen`
- Trigger design load/save/delete actions

**State Updates**:

```typescript
const { designs, loadDesign, deleteDesign } = usePresetsStore()
const { drawerOpen, toggleDrawer } = useUiStore()
```

**Conditional Rendering**:

```typescript
<aside className={cx(
  neoPanel({ variant: 'base' }),
  css({
    transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 200ms'
  })
)}>
  <GalleryGrid designs={designs} />
</aside>
```

### ColorTab

**File**: `@fcc-bizfin-logo-designer/web/src/components/tabs/ColorTab.tsx`

**Purpose**: Color customization controls.

**Responsibilities**:

- Render color pickers for baseColor, fillColors, elementColors
- Subscribe to `logoStore` color state
- Trigger color setter actions on change

**Conditional Controls**:

```typescript
{/* Always visible */}
<ColorPicker label="Base Gold" value={baseColor} onChange={setBaseColor} />

{/* Tier 1: 2-tone mode */}
{twoToneDesign && (
  <>
    <ColorPicker label="Quadrant 0 Fill" value={...} onChange={...} />
    <ColorPicker label="Quadrant 3 Fill" value={...} onChange={...} />
  </>
)}

{/* Tier 2: Unique element colors */}
{twoToneDesign?.uniqueElementColors && (
  <>
    <ColorPicker label="Element (Q0)" value={...} onChange={...} />
    <ColorPicker label="Element (Q3)" value={...} onChange={...} />
  </>
)}
```

### LayoutTab

**File**: `@fcc-bizfin-logo-designer/web/src/components/tabs/LayoutTab.tsx`

**Purpose**: Scale and offset controls.

**Responsibilities**:

- Render sliders for elementScale (per quadrant)
- Render X/Y offset inputs (per quadrant)
- Subscribe to `logoStore.quadrants`
- Trigger layout setter actions

**Per-Quadrant Controls**:

```typescript
{quadrants.map((quad, position) => (
  <Panel key={position}>
    <h3>{getElementLabel(quad.elementId)} (Q{position})</h3>
    <Slider
      label="Scale"
      value={quad.elementScale}
      onChange={(val) => setElementScale(position, val)}
      min={0.5}
      max={2.0}
      step={0.1}
    />
    <Input
      label="Offset X"
      value={quad.centerOffset.x}
      onChange={(val) => setCenterOffset(position, { ...quad.centerOffset, x: val })}
    />
    <Input
      label="Offset Y"
      value={quad.centerOffset.y}
      onChange={(val) => setCenterOffset(position, { ...quad.centerOffset, y: val })}
    />
  </Panel>
))}
```

---

## Recent Fixes & Patterns

### Build Error Resolution (2025-12-13)

**Context**: After switching from DaisyUI to Panda CSS, TypeScript build errors occurred.

**Issues Identified** (via multi-agent research):

1. **Module Resolution Mismatch**
   - **Problem**: TypeScript paths configured, but Vite couldn't resolve `styled-system/*` imports
   - **Root Cause**: Vite and TypeScript have separate module resolution systems
   - **Solution**: Install `vite-tsconfig-paths` plugin to bridge the gap
   - **Files Changed**: `vite.config.ts`, `package.json`

2. **Incorrect Recipe Pattern**
   - **Problem**: TypeScript error `'className' does not exist in type 'NeoButtonVariantProps'`
   - **Root Cause**: Passing `className` directly to recipe function
   - **Solution**: Use `splitVariantProps` to separate variant props from HTML props
   - **Pattern**: `const [variantProps, restProps] = recipe.splitVariantProps(props)`
   - **Files Changed**: `Button.tsx`, `Panel.tsx`, `Input.tsx`

3. **Missing HMR Configuration**
   - **Problem**: Changes to `styled-system/` not triggering hot reload
   - **Root Cause**: Missing `importMap` in `panda.config.ts`
   - **Solution**: Add `importMap: '@styled-system'` to config
   - **Files Changed**: `panda.config.ts`

4. **Import Path Organization**
   - **Problem**: Scattered utility imports from multiple paths
   - **Root Cause**: No barrel export index
   - **Solution**: Create `utils/index.ts` re-exporting all utilities
   - **Files Changed**: `utils/index.ts`, `LogoPreviewWorld.tsx`

**Research Methodology**: Launched 3 parallel research agents (audit config, research recipe patterns, investigate module resolution). Consensus built from findings, user approved solutions via Q&A.

### Pending Build Errors (To Be Fixed)

**Remaining TypeScript Errors** (11 total as of last build):

1. **`base` property errors** (6 instances)
   - Files: `ControlPanel.tsx`, `DesignGalleryDrawer.tsx`, `GalleryGrid.tsx`, `LogoPreviewWorld.tsx`
   - Issue: `css({ base: {...} })` - `base` not recognized as valid property
   - Likely cause: Misunderstanding of Panda's responsive syntax (should be `css({ p: { base: '2' } })` not `css({ base: { p: '2' } })`)

2. **`applyElementColors` signature mismatch** (4 instances)
   - File: `LogoPreviewWorld.tsx` (lines 74, 83, 132, 161)
   - Issue: Function expects 3 arguments, only 2 provided (missing `colors: ColorTargets`)
   - Likely cause: Function signature changed but call sites not updated

3. **Barrel export conflict** (1 instance)
   - File: `utils/index.ts`
   - Issue: `hslToString` exported by both `colors.ts` and `svg.ts`
   - Solution: Remove duplicate or use explicit re-export with renaming

**Next Steps**: Use draft pattern (multi-agent research) to diagnose and fix these errors with user approval.

---

## Development Workflow

### Local Development

**Start dev server**:

```bash
cd apps/web
pnpm dev
```

**Regenerate Panda CSS** (after config changes):

```bash
pnpm panda codegen --clean
```

**Build TypeScript**:

```bash
pnpm build
```

### Styling Changes

**Adding new design tokens**:

1. Edit `panda.config.ts` → `theme.extend.tokens`
2. Run `pnpm panda codegen --clean`
3. Import from `styled-system/tokens`

**Adding new recipe**:

1. Edit `panda.config.ts` → `recipes`
2. Run `pnpm panda codegen --clean`
3. Import from `styled-system/recipes`
4. Use `splitVariantProps` pattern in component

**Debugging recipe types**:

- Check generated types: `styled-system/recipes/{recipe-name}.d.ts`
- Inspect `variantMap` and `variantKeys` properties

### State Management

**Adding new store**:

1. Create `src/store/{name}Store.ts`
2. Define state interface and actions
3. Export Zustand hook: `export const useXStore = create<XState>()(...)`
4. Import in components: `const { state, actions } = useXStore()`

**Persisting state**:

```typescript
import { persist } from 'zustand/middleware'

export const useXStore = create<XState>()(
  persist(
    (set) => ({
      /* state and actions */
    }),
    { name: 'x-store-key' }
  )
)
```

### Component Creation

**Adding new UI primitive**:

1. Define recipe in `panda.config.ts`
2. Regenerate with `pnpm panda codegen`
3. Create `src/components/ui/{Component}.tsx`
4. Use `splitVariantProps` pattern
5. Export component

**Adding new feature component**:

1. Determine domain (camera, world, gallery, tabs)
2. Create in appropriate subdirectory
3. Subscribe to relevant stores
4. Use UI primitives for styling

---

## Testing Strategy (Future)

**Unit Tests**:

- Store actions (Zustand state updates)
- Utility functions (color resolution, SVG manipulation)
- Recipe variant generation

**Integration Tests**:

- Store interactions (logoStore → presetsStore)
- Component + store synchronization

**Visual Regression Tests**:

- Recipe variants (Button, Panel, Input with all variant combinations)
- Logo rendering with different design states
- Responsive breakpoints

**Tools** (to be configured):

- Vitest (unit/integration)
- Playwright (visual regression)
- Argos CI (visual diff review)

---

## Future Enhancements

### Immediate Priorities

1. **Fix remaining build errors** (11 TypeScript errors)
2. **Remove legacy components** (pre-redesign files in `components/`)
3. **Clean up duplicate store directory** (`stores/` vs `store/`)
4. **Add visual tests for recipes** (ensure neo-brutalist styling is consistent)

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

**API Backend**:

- User authentication
- Design storage (PostgreSQL + S3 for thumbnails)
- Design analytics (most popular colors, elements, layouts)

---

## References

### Internal Documentation

- `ARCHITECTURE.md` (in this folder) - Original design spec (quadrant system, schema)
- `DECISIONS.md` (in this folder) - Stack decisions (Vite, Zustand, DaisyUI rationale)
- `../design-system/STYLING.md` - Panda CSS deep dive + design patterns
- `../development/STYLE_DEV.md` - Panda development guide
- `../development/GITOPS.md` - CI/CD and container builds

### External Resources

**Panda CSS**:

- [Official Docs](https://panda-css.com)
- [Recipes Guide](https://panda-css.com/docs/concepts/recipes)
- [Responsive Design](https://panda-css.com/docs/concepts/responsive-design)

**Design Patterns**:

- [Neo-Brutalism Guide (NN/g)](https://www.nngroup.com/articles/neobrutalism/)
- [Game UI Database](https://www.gameuidatabase.com)

**React + TypeScript**:

- [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Vite Guide](https://vitejs.dev/guide/)

---

**Document Version**: 1.0
**Status**: Implementation phase - core architecture complete, build errors being resolved
**Next Review**: After TypeScript build succeeds
