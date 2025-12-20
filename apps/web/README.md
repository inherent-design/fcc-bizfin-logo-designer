# Logo Designer | Web App
## Business & Finance Club - Fresno City College

A modern web application for logo design built with React and TypeScript.

## Tech Stack

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **Panda CSS** - Zero-runtime CSS-in-JS styling solution
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing  <!-- TODO -->

## Setup Requirements

Before running the project, ensure you have the following:

- **Node.js** (v18 or higher recommended)
- **pnpm** - Package manager

## Development Commands

```bash
# Install dependencies
pnpm install

# Generate Panda CSS styles and types (optionally clean first)
pnpm prepare [-- --clean]


#
# Vite
#

# Start development server
pnpm dev

# Start build preview server
pnpm preview

# Build for production (in ./dist/)
pnpm build
```

## Getting Started

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Set up SOPS and age keys for secret management
4. Run `pnpm panda codegen` to generate CSS styles
5. Start the dev server with `pnpm dev`

## Project Structure

This is part of a monorepo workspace. For detailed documentation, see the `docs/` directory:

**Key Documentation:**
- **[docs/README.md](docs/README.md)** - Index
- **[docs/STYLING.md](docs/STYLING.md)** - Design token system
- **[docs/PANDA.md](docs/PANDA.md)** - Panda CSS

**Current Phase:** Phase 2 complete (token architecture overhaul), Phase 3 in progress (component refactor)

## Notes

- During development, periodically run `pnpm prepare` (or `pnpm prepare -- --clean`)
