# Logo Designer Documentation

**Project**: FCC Business & Finance Club Logo Designer
**Last Updated**: 2025-12-14

---

## Quick Start

New to the project? Start here:

1. **[Development Environment Setup](SETUP.md)** - Install Node.js, pnpm, Git, and required tools
2. **[Project Overview](architecture/ARCHITECTURE.md)** - Understanding the logo design system, quadrant structure, and color hierarchy
3. **[Technology Stack](architecture/DECISIONS.md)** - Why we chose Vite, React, Zustand, and Panda CSS
4. **[Style Development Workflow](development/STYLE_DEV.md)** - Daily development patterns and debugging

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

Workflows, tooling, and deployment processes.

- **[STYLE_DEV.md](development/STYLE_DEV.md)** - Panda CSS development guide
  - Performance optimization
  - Debugging techniques
  - Component development workflow with Storybook
  - Visual regression testing
  - CI/CD integration

- **[GITOPS.md](development/GITOPS.md)** - CI/CD and container builds
  - Multi-stage Docker build architecture
  - Image tagging strategy (dev vs production)
  - GitHub Actions workflows
  - Changesets integration for versioning

---

## Documentation by Use Case

### I want to...

**Understand the project**
→ Start with [ARCHITECTURE.md](architecture/ARCHITECTURE.md)

**Set up my development environment**
→ Follow [SETUP.md](SETUP.md) step-by-step

**Add a new UI component**
→ Read [COMPONENTS.md](design-system/COMPONENTS.md) Component Development Guidelines

**Change design tokens or colors**
→ Consult [DESIGN_TOKENS.md](design-system/DESIGN_TOKENS.md) Adding New Tokens

**Understand the UI redesign decisions**
→ Review [UI_ARCHITECTURE.md](architecture/UI_ARCHITECTURE.md) Design Vision

**Learn Panda CSS patterns**
→ Study [STYLING.md](design-system/STYLING.md) Core Mental Models

**Debug styling issues**
→ Check [STYLE_DEV.md](development/STYLE_DEV.md) Debugging section

**Deploy or build containers**
→ Reference [GITOPS.md](development/GITOPS.md)

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

### Styling System

**Panda CSS**: Zero-runtime, build-time atomic CSS with type-safe tokens.

**Token Contract**: Design primitives (neo._, fantasy._) → Semantic tokens (panel._, form._) → Component usage.

**Recipe Pattern**: `splitVariantProps` to separate variant props from HTML attributes.

---

## Migration History

### 2025-12-14: Setup Documentation Extraction

**Change**: Extracted one-time setup procedures from evergreen documentation into a dedicated SETUP.md guide.

**Motivation**:

- **Separation of concerns**: Setup is done once, workflows are daily activities
- **Beginner-friendly**: New contributors need a clear onboarding path
- **Current best practices**: Researched latest 2025 recommendations for tooling
- **Maintainability**: Setup instructions easier to update in one place

**What Changed**:

- Created `SETUP.md` with comprehensive environment setup
  - Git installation (macOS/Linux/Windows)
  - Node.js via nvm (with Node 24 LTS recommendation)
  - pnpm via Corepack (modern package manager approach)
  - VS Code with Panda CSS extension
  - Project installation and verification
- Updated `development/STYLE_DEV.md`
  - Removed setup sections (Panda install, config examples, Husky install)
  - Added reference to SETUP.md at top
  - Kept workflow-focused content (optimization, debugging, testing)
- Updated `README.md` navigation
  - Added SETUP.md to Quick Start (step 1)
  - Added "Getting Started" section
  - Updated "I want to..." use cases

**Research Sources**:

- Node.js LTS schedule (Node 24 "Krypton" recommended through April 2028)
- nvm installation best practices (curl/wget for Unix, nvm-windows for Windows)
- Corepack best practices (packageManager field with security hash)
- pnpm installation (via Corepack instead of global install)
- VS Code Panda CSS extension (official chakra-ui extension)

### 2025-12-14: Documentation Reorganization

**Previous Structure** (flat):

```
docs/
├── ARCHITECTURE.md
├── DECISIONS.md
├── GITOPS.md
├── STYLE_DEV.md
├── STYLING.md
├── UI_ARCHITECTURE.md
├── DESIGN_TOKENS.md
└── COMPONENTS.md
```

**New Structure** (hierarchical):

```
docs/
├── README.md (this file)
├── architecture/
│   ├── ARCHITECTURE.md
│   ├── DECISIONS.md
│   └── UI_ARCHITECTURE.md
├── design-system/
│   ├── DESIGN_TOKENS.md
│   ├── COMPONENTS.md
│   └── STYLING.md
└── development/
    ├── STYLE_DEV.md
    └── GITOPS.md
```

**Rationale**:

- **Easy discovery**: Grouped by domain (architecture, design, development)
- **Logical hierarchy**: Related docs colocated (1-level nesting only)
- **Clear separation**: High-level design vs implementation details
- **Preserved history**: Used `git mv` to maintain file history

**Path Mapping**:

- `ARCHITECTURE.md` → `architecture/ARCHITECTURE.md`
- `DECISIONS.md` → `architecture/DECISIONS.md`
- `UI_ARCHITECTURE.md` → `architecture/UI_ARCHITECTURE.md`
- `DESIGN_TOKENS.md` → `design-system/DESIGN_TOKENS.md`
- `COMPONENTS.md` → `design-system/COMPONENTS.md`
- `STYLING.md` → `design-system/STYLING.md`
- `STYLE_DEV.md` → `development/STYLE_DEV.md`
- `GITOPS.md` → `development/GITOPS.md`

**Updated Cross-References**: All internal links between docs updated to reflect new structure.

---

## Contributing

When adding new documentation:

1. **Choose the right folder**:
   - `architecture/` - High-level system design, specs, decisions
   - `design-system/` - Tokens, styling patterns, component docs
   - `development/` - Workflows, tooling, deployment

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

**Document Version**: 1.0
**Status**: Active - primary navigation for logo designer documentation
**Maintainer**: Development Team
