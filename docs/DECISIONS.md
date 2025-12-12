# Frontend Architecture Decisions

**Project**: Interactive SVG Logo Designer
**Context**: Drag-and-drop quadrant layout, color customization, size adjustment, state persistence
**Requirements**: Low bundle size, TypeScript support, simple APIs, easy serialization

---

## Stack Overview

**Build**: Vite + React + TypeScript
**UI**: DaisyUI (Tailwind-based CSS)
**Drag & Drop**: @dnd-kit/sortable
**Color Picker**: react-colorful
**State**: Zustand with persist middleware
**SVG**: Inline React components

**Total bundle**: ~70KB gzipped

---

## Build Tool: Vite

**Why chosen**: Fast native ESM dev server, zero bundling during development, TypeScript-first by default, familiar from previous projects.

**Why not Astro**: Better for static content sites than interactive tools.

**Why not SvelteKit**: Unnecessary learning curve for Svelte syntax when React knowledge already established.

**Key benefit**: `npm create vite@latest` scaffolds everything in seconds with TypeScript strict mode enabled.

---

## UI Components: DaisyUI

**Why chosen**: Pure CSS (no JS shipped), uses Tailwind utility classes, built-in theming system, zero runtime overhead.

**Why not shadcn/ui**: Excellent library but requires copying components into codebase rather than importing from package.

**Why not Mantine**: Heavier bundle (~100KB) with more features than needed for this use case.

**Why not Headless UI**: Great patterns but requires custom styling for every component.

**Key benefit**: Component classes like `btn`, `drawer`, `modal`, `card` work immediately without prop configuration.

---

## Drag & Drop: @dnd-kit

**Why chosen**: Modern (2021+), actively maintained, lightweight (~15KB), accessible (ARIA/keyboard built-in), supports grid swapping with `rectSwappingStrategy`.

**Why not react-beautiful-dnd**: Archived by Atlassian in 2022. Fork exists (hello-pangea/dnd) but dnd-kit is more modern.

**Why not react-dnd**: Older API, less intuitive for simple swapping use case.

**Key benefit**: `closestCenter` collision detection + `rectSwappingStrategy` handle 2x2 grid swapping without manual position calculations.

---

## Color Picker: react-colorful

**Why chosen**: Tiny (2.8KB), supports all formats (HEX/RGB/HSL/HSV), TypeScript types included, simple one-component API.

**Why not react-best-gradient-color-picker**: 10KB+ with gradient support not needed.

**Why not react-color**: Unmaintained, 50KB+.

**Why HSL over RGB**: Industry standard for design systems, intuitive (hue/saturation/lightness), easy to create variations by adjusting lightness without changing hue.

**Key benefit**: `<HslColorPicker color={color} onChange={setColor} />` — no configuration needed.

---

## State Management: Zustand

**Why chosen**: Minimal (3KB), zero boilerplate, excellent TypeScript inference, perfect for serialization (state is plain object), persist middleware handles localStorage automatically.

**Why not Context API**: Re-renders all consumers on any state change, no built-in persistence.

**Why not Jotai**: Atomic state great for complex dependency graphs, but overkill for single global store.

**Why not Redux**: Too much boilerplate for simple use case.

**Key benefit**: Store definition is single function, actions are just object methods, `persist()` middleware adds localStorage with one line.

---

## SVG Manipulation: Inline + React Refs

**Why chosen**: Full control over DOM elements, dynamic styling via props, no extra libraries, direct ref access for interactions.

**Why not react-svgmt**: Adds selector-based manipulation with unnecessary complexity.

**Why not react-moveable**: Full transform library (15KB) overkill for scale-only adjustments.

**Strategy**: Export AI files as SVG → inline into React components → pass colors as props → use refs for size controls.

**Key benefit**: SVG `<g transform={`scale(${scale})`}>` handles resizing, `fill={color}` handles color changes, no abstraction layer needed.

---

## Additional Tools

**file-saver**: JSON/SVG export via browser download
**XMLSerializer**: Serialize SVG DOM to string for export
**FileReader API**: Import JSON designs from file input

---

## Architecture Patterns

**State serialization**: Entire store serializes to JSON via `JSON.stringify(get())` for export/import.

**Saved designs**: Array of snapshots stored in same Zustand store, persisted to localStorage.

**Color system**: Named palette (`green`, `maroon`, `gold`) with HSL values, quadrants reference palette by name for easy swapping.

**Element positioning**: Array order determines quadrant assignment (`elements[0]` = top-left), swapping just reorders array.

**Size scaling**: Object map of element names to scale factors (`{ briefcase: 1.2 }`), applied via SVG transform.

---

## Performance Optimizations

**Lazy load color picker**: Import only when drawer opens.
**Memoize SVG components**: Prevent re-renders when sibling quadrants update.
**Debounce size changes**: Update state after drag ends, not during movement.
**BuildKit cache mounts**: `pnpm fetch` and `pnpm install` leverage Docker layer caching.

---

## Deployment Strategy

**Vite build output**: Static assets to `dist/` directory.

**Options**: Vercel (`npx vercel --prod`), GitHub Pages (`gh-pages -d dist`), or nginx container.

**12-factor app compliance**: Configuration via environment variables, stateless design, external state persistence.
