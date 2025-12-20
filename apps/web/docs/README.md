## Documentation Structure

### Getting Started

- **[SETUP.md](SETUP.md)** - Complete development environment setup guide
  - Node.js + nvm installation (all platforms)
  - pnpm + Corepack configuration
  - Git installation and configuration
  - VS Code setup with recommended extensions
  - Project installation and verification

### Design System

Token definitions, styling patterns, and component library. High-level system design, UI/UX specifications, and technical decisions.

- **[UI.md](UI.md)** - Design aesthetics
  - Neo-brutalist control layer design
  - High-fantasy world layer aesthetics
  - Component hierarchy and state management
  - File organization and module structure

- **[STYLING.md](STYLING.md)** - Design Token System
  - 7-layer minimality chain architecture
  - Musical theory foundation (just intonation ratios)
  - Layer rules and responsibilities
  - Neo-brutalism + high-fantasy aesthetic principles
  - Visual output as truth philosophy
  - Complete with authoritative sources

- **[PANDA.md](PANDA.md)** - Panda CSS
  - 24 token categories
  - Nesting patterns and depth limits
  - Conditional styles (_light, _dark, _hover, etc.)
  - Layer/text/animation styles
  - Recipe patterns (cva, sva, built-in patterns)
  - What Panda can/cannot do
  - Decision matrices for when to use what

### Project Management

- **[ADR.md](architecture/DECISIONS.md)** - Technology stack rationale
  - Build tool selection (Vite vs alternatives)
  - UI framework choices (DaisyUI → Panda CSS)
  - State management (Zustand)
  - Drag & drop libraries (@dnd-kit)

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
