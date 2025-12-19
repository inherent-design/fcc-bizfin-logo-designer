# Logo Designer Web App

A modern web application for logo design built with React and TypeScript.

## Tech Stack

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **Panda CSS** - Zero-runtime CSS-in-JS styling solution
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing

## Setup Requirements

Before running the project, ensure you have the following:

- **Node.js** (v18 or higher recommended)
- **pnpm** - Package manager
- **SOPS** - For secrets management and encryption
- **Go tooling** - Required for secret encryption/decryption
- **Age key** - For SOPS encryption (if applicable)
- **Panda CSS codegen** - Must be run before first build

## Development Commands

```bash
# Install dependencies
pnpm install

# Generate Panda CSS styles and types
pnpm panda codegen

# Clean regenerate Panda CSS from scratch
pnpm panda codegen --clean

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint
```

## Getting Started

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Set up SOPS and age keys for secret management
4. Run `pnpm panda codegen` to generate CSS styles
5. Start the dev server with `pnpm dev`

## Project Structure

This is part of a monorepo workspace. For detailed documentation, see the `docs/` directory in the project root.

## Notes

- Always run `pnpm panda codegen` after pulling changes that modify Panda CSS configurations
- SOPS-encrypted secrets are used for sensitive configuration
- Ensure Go tooling is properly configured for secret operations
