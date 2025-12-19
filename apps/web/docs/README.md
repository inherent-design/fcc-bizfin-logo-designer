# Logo Designer Documentation

**Project**: FCC Business & Finance Club Logo Designer
**Status**: Active Development (43% Complete - Phases 0-2 Done)
**Last Updated**: 2025-12-17

---

## Quick Start

New to the project? Start here:

1. **[Development Environment Setup](SETUP.md)** - Install Node.js, pnpm, Git, and required tools
2. **[Project Overview](architecture/ARCHITECTURE.md)** - Understanding the logo design system, quadrant structure, and color hierarchy
3. **[Technology Stack](architecture/DECISIONS.md)** - Why we chose Vite, React, Zustand, and Panda CSS
4. **[Component Development](development/COMPONENT_GUIDE.md)** - File structure template and development patterns
5. **[Style Development Workflow](development/STYLE_DEV.md)** - Daily development patterns and debugging

---

## Project Status

**Current Progress**: 43% Complete

### ✅ Completed (Phases 0-2)
- **Phase 0**: Immediate fixes (border syntax, colors, opacity)
- **Phase 1**: Recipe migration (Button, Input, Panel → .styles.ts files)
- **Phase 2**: Token architecture overhaul (3-layer system, semantic-only spacing)

### 🔄 In Progress (Phase 3)
- Component refactor to cva/sva patterns
- Extracting reusable patterns (QuadrantCard, Badge, Slider)

### 📋 Planned (Phases 4-6)
- New components (Badge, Slider, Select, Toggle, Tooltip, Modal, Divider)
- Expand abstractions (textStyles, layerStyles, animationStyles)
- Final cleanup and documentation

**Master Plan**: `~/.claude/plans/design-system-refactor-master.md`

---

## Documentation Structure

### Getting Started

- **[SETUP.md](SETUP.md)** - Complete development environment setup guide
  - Node.js + nvm installation (all platforms)
  - pnpm + Corepack configuration
  - Git installation and configuration
  - VS Code setup with recommended extensions
  - Project installation and verification

### Architecture

High-level system design, UI/UX specifications, and technical decisions.

- **[ARCHITECTURE.md](architecture/ARCHITECTURE.md)** - Core logo design system
  - Quadrant structure and element positioning
  - Color tier hierarchy (base → two-tone → unique)
  - SVG manipulation and rendering
  - State serialization and persistence

- **[UI_ARCHITECTURE.md](architecture/UI_ARCHITECTURE.md)** - Video game-inspired interface redesign
  - Neo-brutalist control layer design
  - High-fantasy world layer aesthetics
  - Component hierarchy and state management
  - File organization and module structure

- **[DECISIONS.md](architecture/DECISIONS.md)** - Technology stack rationale
  - Build tool selection (Vite vs alternatives)
  - UI framework choices (DaisyUI → Panda CSS)
  - State management (Zustand)
  - Drag & drop libraries (@dnd-kit)

### Design System

Token definitions, styling patterns, and component library.

- **[DESIGN_TOKENS.md](design-system/DESIGN_TOKENS.md)** - Complete token system reference
  - Base tokens (neo-brutalist and high-fantasy palettes)
  - Semantic tokens (panel, world, logo, overlay)
  - Naming conventions and usage patterns
  - Anti-patterns to avoid

- **[STYLING.md](design-system/STYLING.md)** - Panda CSS deep dive
  - Core mental models (cascade layers, tokens, APIs)
  - Responsive design patterns
  - Recipe vs slot recipe usage
  - Design pattern library (neo-brutalism, glassmorphism, high-fantasy)

- **[COMPONENTS.md](design-system/COMPONENTS.md)** - Component library documentation
  - UI primitives (Button, Input, Panel)
  - Composite components (AdvancedColorPicker, Tabs)
  - Domain components (ColorTab, LayoutTab, ControlPanel)
  - Usage examples and accessibility considerations

### Development

Workflows, tooling, and component patterns.

- **[COMPONENT_GUIDE.md](development/COMPONENT_GUIDE.md)** - Component file structure
  - Opinionated template with visual section boundaries
  - VS Code snippets and automation
  - Migration guide for existing components
  - Code organization best practices

- **[STYLE_DEV.md](development/STYLE_DEV.md)** - Panda CSS development guide
  - Performance optimization
  - Debugging techniques
  - Component development workflow
  - Visual regression testing
  - CI/CD integration

### Design Refactor (Migration History)

Completed migration work and reference material.

- **[MIGRATION_COMPLETE.md](design-refactor/MIGRATION_COMPLETE.md)** - Phase 0-2 completion report
  - Recipe migration completion (Phase 1)
  - Token architecture overhaul (Phase 2)
  - Migration lessons learned
  - Reference for future refactors

- **[TOKEN_MAPPING_REFERENCE.md](design-refactor/TOKEN_MAPPING_REFERENCE.md)** - Token usage reference
  - Quick lookup for semantic tokens
  - Component token mappings
  - Theme-aware token patterns

---

## Documentation by Use Case

### I want to...

**Understand the project**
→ Start with [ARCHITECTURE.md](architecture/ARCHITECTURE.md)

**Set up my development environment**
→ Follow [SETUP.md](SETUP.md) step-by-step

**Add a new UI component**
→ Read [COMPONENT_GUIDE.md](development/COMPONENT_GUIDE.md) for file structure, then [COMPONENTS.md](design-system/COMPONENTS.md) for patterns

**Change design tokens or colors**
→ Consult [DESIGN_TOKENS.md](design-system/DESIGN_TOKENS.md) and [TOKEN_MAPPING_REFERENCE.md](design-refactor/TOKEN_MAPPING_REFERENCE.md)

**Understand the UI redesign decisions**
→ Review [UI_ARCHITECTURE.md](architecture/UI_ARCHITECTURE.md) Design Vision

**Learn Panda CSS patterns**
→ Study [STYLING.md](design-system/STYLING.md) Core Mental Models

**Debug styling issues**
→ Check [STYLE_DEV.md](development/STYLE_DEV.md) Debugging section

**Understand the refactor progress**
→ Check master plan at `~/.claude/plans/design-system-refactor-master.md`

**Contribute to the project**
→ Start with [ARCHITECTURE.md](architecture/ARCHITECTURE.md) Core Constraints

---

## Key Concepts

### Logo Design System

**Quadrant Structure**: Logo divided into 4 positions (0-3) with per-quadrant element assignment, scale, and offset.

**Color Hierarchy**: Three-tier system (base → two-tone → unique) with semantic fallback resolution.

**Element Library**: Briefcase, mountains, leaf, dollar sign as swappable quadrant elements.

### UI Architecture

**World Layer**: High-fantasy 3D space where logo floats (mystical, ethereal).

**Camera Layer**: Neo-brutalist control overlay (tactile, grounded UI widgets).

**State Separation**: Distinct stores for design data (logoStore), presentation (worldStore), interaction (uiStore), and persistence (presetsStore).

### Design System

**3-Layer Architecture**:
- **Layer 1**: Base tokens (raw CSS values)
- **Layer 2**: Semantic tokens (concern-based, no component namespaces)
- **Layer 3**: Components (cva/sva composition patterns)

**Token Contract**: Design primitives (neo.*, fantasy.*) → Semantic tokens (panel.*, text.*, bg.*) → Component usage.

**Recipe Pattern**: `cva` for single-element, `sva` for multi-part components.

---

## Migration History

### 2025-12-17: Design System Refactor (Phases 0-2)

**Completed**:
- Phase 0: Immediate fixes (border syntax, colors, opacity) ✅
- Phase 1: Recipe migration to component files ✅
- Phase 2: Token architecture overhaul (3-layer system) ✅

**Changes**:
- Migrated neoButton, neoInput, neoPanel to .styles.ts files
- Removed recipes from panda.config.ts
- Flattened semantic token namespaces (no component-specific tokens)
- Removed numeric spacing scale (semantic-only: xxxxxs-xxxxl)
- Added base tokens (sizing, transforms, borderStyles)
- Config reduced from 722 to 480 lines

**Status**: 43% complete (3/7 phases), Phase 3 in progress

### 2025-12-14: Documentation Reorganization

**Changes**:
- Created hierarchical structure (architecture/, design-system/, development/)
- Extracted SETUP.md for one-time setup procedures
- Consolidated component template documentation
- Updated all cross-references

**Rationale**:
- Separation of concerns (setup vs workflows)
- Logical domain grouping
- Improved discoverability

---

## Contributing

When adding new documentation:

1. **Choose the right folder**:
   - `architecture/` - High-level system design, specs, decisions
   - `design-system/` - Tokens, styling patterns, component docs
   - `development/` - Workflows, tooling, component patterns
   - `design-refactor/` - Migration history and reference material

2. **Follow naming conventions**:
   - Use `SCREAMING_SNAKE_CASE.md` for consistency
   - Be specific (e.g., `COMPONENT_PATTERNS.md` not `PATTERNS.md`)

3. **Update this README**:
   - Add entry under appropriate section
   - Update "Documentation by Use Case" if relevant

4. **Cross-reference existing docs**:
   - Use relative paths (e.g., `../architecture/ARCHITECTURE.md`)
   - Update related docs to link to your new doc

---

## External Resources

**Panda CSS**:
- [Official Documentation](https://panda-css.com)
- [Recipes Guide](https://panda-css.com/docs/concepts/recipes)
- [Design Tokens Spec](https://design-tokens.github.io/community-group/format/)

**React + TypeScript**:
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Vite Guide](https://vitejs.dev/guide/)

**Design Inspiration**:
- [Neo-Brutalism Guide](https://www.nngroup.com/articles/neobrutalism/)
- [Game UI Database](https://www.gameuidatabase.com)

---

**Document Version**: 2.0
**Status**: Active - primary navigation for logo designer documentation
**Maintainer**: Development Team
