# FCC Business & Finance Club - Logo Designer

**Design Specification & Architecture Document**

## Project Overview

Interactive web application for designing and iterating on the FCC Business & Finance Club logo. Enables real-time experimentation with element placement, colors, and scales to facilitate collaborative design decisions during club meetings.

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

## Technical Stack

### Build Tool & Framework

- **Vite** with `react-swc-ts` template
- **React 19** with TypeScript
- **SWC** for fast transpilation (20-70x faster than Babel)

**Decision: Skip React Compiler**

- Project too small to benefit (~5-10 components)
- Adds build overhead via Babel
- No complex re-render issues to optimize

### Dependencies

```json
{
  "dependencies": {
    "zustand": "^5.0.9", // State management (3KB)
    "@dnd-kit/core": "^6.3.1", // Drag & drop core
    "@dnd-kit/sortable": "^10.0.0", // Sortable utilities
    "@dnd-kit/utilities": "^3.2.2", // Helper utils
    "react-colorful": "^5.6.1" // Color picker (2.8KB)
  },
  "devDependencies": {
    "daisyui": "^5.5.8", // Tailwind UI components
    "tailwindcss": "^4.1.17",
    "autoprefixer": "^10.4.22",
    "postcss": "^8.5.6"
  }
}
```

**Bundle Size Estimate**: ~70KB gzipped

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

---

## Project Structure

```
logo-designer/
├── docs/
│   ├── DESIGN_SPEC.md           # This file
│   ├── SCHEMA.md                # JSON schema documentation
│   └── UI_FLOWS.md              # User interaction flows
│
├── src/
│   ├── assets/
│   │   └── icons/               # SVG element files
│   │       ├── briefcase.svg
│   │       ├── mountains.svg
│   │       ├── dollar.svg
│   │       └── leaf.svg
│   │
│   ├── components/              # React components
│   │   ├── LogoPreview.tsx      # Main SVG display
│   │   ├── QuadrantGrid.tsx     # 4 draggable quadrants
│   │   ├── ColorDrawer.tsx      # Color palette editor
│   │   └── ControlPanel.tsx     # Mode checkboxes & controls
│   │
│   ├── store/
│   │   └── logoStore.ts         # Zustand state management
│   │
│   ├── types/
│   │   └── schema.ts            # TypeScript interfaces
│   │
│   ├── utils/
│   │   ├── colors.ts            # HSL helpers
│   │   └── svg.ts               # SVG manipulation
│   │
│   ├── App.tsx                  # Root component
│   └── main.tsx                 # Entry point
│
├── public/
│   └── base/                    # Base shield & laurel SVGs
│       ├── shield.svg
│       └── laurel.svg
│
└── config/
    └── defaultDesign.json       # Initial design state
```

---

## Key Technical Decisions

### 1. Element Position Offsets

**Decision**: Offsets stay with positions (Option A)

- Each quadrant position has a "sweet spot" for visual hierarchy
- When elements swap, offsets remain with their positions
- Scales also remain with positions

**Rationale**: Shield shape creates position-specific constraints. Top-left needs different nudging than bottom-right regardless of which element occupies it.

### 2. SVG Storage Strategy

**Decision**: Reference-based (file paths), not inline

- `availableElements` stores `{ id, label, svgPath }` not `svgContent`
- SVGs live in `src/assets/icons/`
- Zustand store references paths: `elementId: "briefcase"` → loads `/icons/briefcase.svg`

**Rationale**:

- **Separation of concerns**: Design state (JSON) ≠ asset data (SVG)
- **Version control**: Easier to track SVG changes in git
- **Designer workflow**: Update SVG file → changes reflect across all saved designs
- **Schema cleanliness**: JSON remains ~2KB instead of ~10KB with inline SVGs

**Future export strategy**: Node.js build script concatenates referenced SVGs into final output (not client-side).

### 3. Color Resolution Logic

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

## UI/UX Design

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
│   │  draggable │     │   Base Color:                       │
│   │  quadrants │     │   ┌─────────────────┐               │
│   └────────────┘     │   │ 🎨 Shield Gold  │               │
│                      │   └─────────────────┘               │
│   [Hover quadrant    │                                     │
│    to edit]          │   Quadrant Fills:                   │
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

#### Drag & Drop (Swap Elements)

1. User hovers quadrant → cursor: grab
2. User drags element → semi-transparent overlay shows swap target
3. User drops → elements swap with 200ms animation
4. Offsets/scales stay with positions (not elements)

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

## Implementation Phases

### Phase 1: Foundation (Complete)

- ✅ Scaffold Vite + React + SWC
- ✅ Install dependencies
- ✅ Design schema
- ✅ Create folder structure

### Phase 2: State & Schema (Current)

- [ ] Define TypeScript interfaces
- [ ] Create `defaultDesign.json`
- [ ] Initialize Zustand store
- [ ] Test state updates

### Phase 3: SVG Setup

- [ ] Export elements from Illustrator as individual SVGs
- [ ] Create SVG loading utility
- [ ] Build element registry/lookup
- [ ] Test SVG rendering with color overrides

### Phase 4: Core UI

- [ ] Build LogoPreview component (static)
- [ ] Build QuadrantGrid with quadrant boundaries
- [ ] Wire Zustand store to components
- [ ] Verify color resolution logic

### Phase 5: Drag & Drop

- [ ] Integrate @dnd-kit/sortable
- [ ] Implement swap logic
- [ ] Add visual feedback (ghost overlay)
- [ ] Test all 4-element permutations

### Phase 6: Color Controls

- [ ] Build base color pickers
- [ ] Implement mode checkboxes
- [ ] Build tier 1/2 conditional pickers
- [ ] Add live preview updates

### Phase 7: Size Controls

- [ ] Add resize handles to quadrants
- [ ] Implement scale drag logic
- [ ] Constrain to 0.5x - 2.0x range
- [ ] Apply transforms to SVG elements

### Phase 8: Persistence

- [ ] Add localStorage save/load
- [ ] Build saved designs list
- [ ] Implement design snapshots
- [ ] Add import/export JSON

### Phase 9: Polish

- [ ] Add Tailwind + DaisyUI styling
- [ ] Smooth animations (CSS transitions)
- [ ] Responsive layout for projector
- [ ] Keyboard shortcuts (Ctrl+S, etc.)

**Estimated Total Time**: 5-6 hours

---

## Open Questions & Future Work

### Not Implementing Now

- [ ] SVG export (manual Illustrator workflow for now)
- [ ] PNG export at scale factors
- [ ] Undo/redo history
- [ ] Collaborative real-time editing
- [ ] Server-side SVG concatenation

### To Discuss

- SVG loading strategy (dynamic import vs. static assets)
- Node.js build script for SVG concatenation
- Color palette presets (save common color schemes)
- Element library expansion (add more icons later)

---

## Success Criteria

**Minimum Viable Product**:

1. Display shield with 4 quadrants
2. Drag elements to swap positions
3. Change colors for base, fills, and elements
4. Save/load designs to localStorage
5. Export state as JSON

**Meeting Demo Ready**:

- Project on screen
- Live color changes
- Swap elements in real-time
- Save "Option A", "Option B", "Option C"
- Show president → gather feedback → iterate

**Future Production Ready**:

- Export final SVG for print
- Export PNG at 300 DPI
- Version control for design iterations
- Share links for remote collaboration

---

**Document Version**: 1.0
**Last Updated**: 2025-12-04
**Status**: Schema finalized, ready for implementation
