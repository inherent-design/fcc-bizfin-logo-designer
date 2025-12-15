# Development Environment Setup

**Project**: FCC Business & Finance Club Logo Designer
**Last Updated**: 2025-12-14

---

## Overview

This guide walks you through setting up your development environment for the Logo Designer project from scratch. Whether you're new to web development or setting up a fresh machine, these instructions will get you ready to contribute.

**What you'll install**:

- Node.js (via nvm for version management)
- pnpm (via Corepack for package management)
- Git (version control)
- VS Code with recommended extensions (optional but recommended)

---

## Prerequisites

### Operating System Requirements

This project works on:

- macOS 10.15 (Catalina) or later
- Linux (Ubuntu 20.04+, Debian, Fedora, Arch, etc.)
- Windows 10/11 (via WSL2 recommended for best experience)

### Hardware Recommendations

- 8GB RAM minimum (16GB recommended for comfortable development)
- 10GB free disk space
- Multi-core processor (development server and build tools benefit from multiple cores)

---

## Quick Start (TL;DR)

For experienced developers, here's the express setup:

```bash
# Install Node.js 24 LTS (choose one method):
# - Package manager (brew/apt/winget) - see detailed instructions below
# - Official installer from nodejs.org
# - nvm for version management

# Example with Homebrew (macOS):
brew install node@24 && brew link node@24

# Example with apt (Ubuntu/Debian):
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash - && sudo apt-get install -y nodejs

# Enable Corepack for pnpm
corepack enable

# Clone and setup project
git clone <repository-url>
cd logo-designer
pnpm install

# Start development server
pnpm dev:web
```

**Verification**: Open http://localhost:5173 - you should see the Logo Designer interface.

---

## Detailed Setup

### 1. Git Installation

Git is required to clone the repository and contribute code.

#### Check if Git is Already Installed

```bash
git --version
```

If you see a version number (e.g., `git version 2.39.0`), Git is already installed. Skip to [Node.js Installation](#2-nodejs-installation-via-nvm).

#### Installation by Platform

**macOS**:

The easiest method is using Xcode Command Line Tools:

```bash
xcode-select --install
```

Alternatively, install via [Homebrew](https://brew.sh/) (recommended for staying up-to-date):

```bash
brew install git
```

**Linux (Ubuntu/Debian)**:

```bash
sudo apt-get update
sudo apt-get install git-all
```

**Linux (Fedora)**:

```bash
sudo dnf install git-all
```

**Windows**:

1. Download the installer from https://git-scm.com/download/win
2. Run the installer and follow the setup wizard (default options work well)
3. This includes Git Bash, a terminal for running Git commands

**Alternative for Windows**: Use Windows Subsystem for Linux (WSL2) for a native Linux experience.

#### Post-Installation Configuration

Configure your identity (required before making commits):

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Verification**:

```bash
git --version
git config --global user.name
git config --global user.email
```

**Why Git?**
Git is the industry-standard version control system. It allows you to track changes, collaborate with others, and maintain a complete history of the project.

**Resources**:

- [Official Git Installation Guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Git Guides by GitHub](https://github.com/git-guides/install-git)

---

### 2. Node.js Installation

Node.js is the JavaScript runtime that powers this project. **Recommended version: Node.js 24 LTS** (Long-term support until April 2028).

#### Installation Options

Choose the method that best fits your needs:

**Option A: Package Manager (Recommended for most users)**

- ✅ Simple, one-command installation
- ✅ System-wide Node.js installation
- ✅ Automatic updates via package manager

**Option B: Official Installer**

- ✅ Easy graphical installer
- ✅ Works on all platforms
- ✅ No additional tools needed

**Option C: nvm (Recommended for version management)**

- ✅ Manage multiple Node.js versions
- ✅ Switch versions per-project
- ✅ Useful if working on multiple projects

---

#### Option A: Install via Package Manager

**macOS (Homebrew)**:

```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js 24 LTS
brew install node@24

# Link Node.js 24 as the default
brew link node@24
```

**Linux (Ubuntu/Debian)**:

```bash
# Add NodeSource repository for Node.js 24
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -

# Install Node.js
sudo apt-get install -y nodejs
```

**Linux (Fedora)**:

```bash
# Add NodeSource repository
curl -fsSL https://rpm.nodesource.com/setup_24.x | sudo bash -

# Install Node.js
sudo dnf install -y nodejs
```

**Windows (winget)**:

```powershell
# Install Node.js via winget (Windows Package Manager)
winget install OpenJS.NodeJS.LTS
```

---

#### Option B: Install via Official Installer

1. Visit the [Node.js Downloads page](https://nodejs.org/en/download/)
2. Download the **24.x LTS** installer for your operating system
3. Run the installer and follow the setup wizard
4. Restart your terminal after installation

**Windows users**: The installer includes npm and adds Node.js to your PATH automatically.

---

#### Option C: Install via nvm (Version Management)

If you work on multiple projects that require different Node.js versions, use nvm:

**macOS and Linux**:

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Restart your terminal, then:
nvm install 24
nvm use 24
nvm alias default 24
```

**Windows**:

Use [nvm-windows](https://github.com/coreybutler/nvm-windows) (separate project):

1. Download the latest installer from https://github.com/coreybutler/nvm-windows/releases
2. Run the installer and follow the wizard
3. Open a new terminal as administrator and run:

```powershell
nvm install 24
nvm use 24
```

**Resources**:

- [nvm GitHub (POSIX)](https://github.com/nvm-sh/nvm)
- [nvm-windows GitHub](https://github.com/coreybutler/nvm-windows)

---

#### Verification

After installation (any method), verify Node.js and npm are installed:

```bash
node --version
# Expected: v24.x.x

npm --version
# Expected: 10.x.x or higher
```

#### Why Node.js 24 LTS?

- **Long-term support**: Security updates until April 2028
- **Stability**: Production-ready, thoroughly tested
- **Modern features**: Improved performance, better diagnostics
- **Ecosystem compatibility**: Works with latest packages

**Resources**:

- [Node.js Official Website](https://nodejs.org/)
- [Node.js LTS Release Schedule](https://nodejs.org/en/about/previous-releases)
- [Node.js Download Page](https://nodejs.org/en/download/)

---

### 3. pnpm Installation (via Corepack)

pnpm is a fast, disk space-efficient package manager. We use Corepack (built into Node.js) to manage pnpm installation.

#### Why pnpm via Corepack?

**Why pnpm?**

- **Fast**: Up to 2x faster than npm/yarn
- **Disk efficient**: Uses a content-addressable store (saves GBs on large projects)
- **Strict**: Better dependency resolution, fewer bugs
- **Monorepo support**: Built-in workspace management

**Why Corepack?**

- **Zero installation**: Corepack is included with Node.js (14.19.0+)
- **Version consistency**: Lock pnpm version in `package.json`
- **Team alignment**: Everyone uses the same package manager version
- **No global installs**: No manual pnpm updates needed

#### Step 1: Enable Corepack

Corepack is experimental in Node.js versions before 25, so it must be manually enabled:

```bash
corepack enable
```

This installs the required binaries for pnpm and Yarn on your PATH.

**For older pnpm installations**: If you previously installed pnpm globally, uninstall it first to avoid conflicts:

```bash
npm uninstall -g pnpm
```

#### Step 2: Update Corepack (Recommended)

Due to outdated security signatures in some Node.js versions, update Corepack to the latest version:

```bash
npm install -g corepack@latest
corepack enable
```

#### Step 3: Verify Installation

The project's `package.json` specifies the exact pnpm version to use:

```json
{
  "packageManager": "pnpm@10.25.0+sha512.5e82639027af37cf832061bcc6d639c219634488e0f2baebe785028a793de7b525ffcd3f7ff574f5e9860654e098fe852ba8ac5dd5cefe1767d23a020a92f501"
}
```

When you run any pnpm command, Corepack automatically downloads and uses this exact version.

**Verification**:

```bash
# Check pnpm is available
pnpm --version
# Expected output: 10.25.0

# Test pnpm installation
pnpm --help
```

#### How Corepack Works

1. You run a pnpm command (e.g., `pnpm install`)
2. Corepack reads `packageManager` field in `package.json`
3. If the version isn't cached, Corepack downloads it
4. Corepack runs the correct pnpm version

**Security Note**: The `sha512` hash in the `packageManager` field ensures you're using the exact package manager version (recommended best practice for 2025).

#### Troubleshooting

**Issue**: `corepack: command not found`

**Solution**: Ensure you're using Node.js 14.19.0 or later. Check with `node --version`. If needed, update Node.js via nvm.

**Issue**: `EACCES` permission errors

**Solution**: Corepack installs to your user directory. If you see permission errors, check that your Node.js installation is also in your user directory (not a system-wide install requiring sudo).

**Issue**: Slow first run

**Explanation**: Corepack downloads pnpm on first use. Subsequent runs use the cached version and are instant.

**Resources**:

- [pnpm Official Documentation](https://pnpm.io/installation)
- [Corepack GitHub Repository](https://github.com/nodejs/corepack)
- [Node.js Corepack Documentation](https://nodejs.org/api/corepack.html)

---

### 4. VS Code Setup (Optional but Recommended)

Visual Studio Code is the recommended editor for this project, with excellent TypeScript and React support.

#### Install VS Code

Download from https://code.visualstudio.com/

**Verification**:

```bash
code --version
```

#### Recommended Extensions

Install these extensions for the best development experience:

**Essential Extensions**:

1. **Panda CSS** (`chakra-ui.panda-css-vscode`)
   - Token autocomplete
   - Color preview
   - Go-to-definition for recipes and tokens
   - Install: https://marketplace.visualstudio.com/items?itemName=chakra-ui.panda-css-vscode

2. **ESLint** (`dbaeumer.vscode-eslint`)
   - Real-time linting and error detection
   - Auto-fix on save

3. **Prettier** (`esbenp.prettier-vscode`)
   - Code formatting
   - Works with project's `.prettierrc` config

**Helpful Extensions**:

4. **TypeScript Error Translator** (`mattpocock.ts-error-translator`)
   - Makes TypeScript errors easier to understand

5. **GitLens** (`eamodio.gitlens`)
   - Enhanced Git capabilities in VS Code

6. **Path Intellisense** (`christian-kohler.path-intellisense`)
   - Autocomplete for file paths

#### VS Code Settings

Create `.vscode/settings.json` in the project root (or update if it exists):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.quickSuggestions": {
    "strings": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]
}
```

**Why these settings?**

- `formatOnSave`: Automatically formats code using Prettier
- `quickSuggestions.strings`: Enables autocomplete in template strings (crucial for Panda CSS)
- `typescript.tsdk`: Uses project's TypeScript version for consistency

#### Browser Extensions (Optional)

**Atomic CSS DevTools** - For debugging Panda CSS:

- Decodes hashed classnames in production builds
- GitHub: https://github.com/astahmer/atomic-css-devtools

**Resources**:

- [Panda CSS VS Code Extension](https://marketplace.visualstudio.com/items?itemName=chakra-ui.panda-css-vscode)
- [VS Code for React Development](https://www.sitepoint.com/vs-code-react-development/)

---

## Project Setup

Now that your environment is ready, let's set up the project itself.

### 1. Clone the Repository

```bash
# Navigate to your projects directory
cd ~/projects  # Or wherever you keep your code

# Clone the repository (replace with actual URL)
git clone https://github.com/your-org/logo-designer.git
cd logo-designer
```

### 2. Install Project Dependencies

```bash
# Install all dependencies for the monorepo
pnpm install
```

This command:

- Reads `package.json` and `pnpm-workspace.yaml`
- Downloads all dependencies
- Sets up internal workspace links
- Runs the `prepare` script (generates Panda CSS types)

**Expected output**: You should see progress bars and a summary like:

```
Packages: +X
Progress: resolved X, reused X, downloaded X, added X, done
```

**First install takes 2-5 minutes** depending on your internet speed.

### 3. Generate Panda CSS Styled System

This should happen automatically via the `prepare` script, but if needed:

```bash
cd apps/web
pnpm panda codegen
```

This creates the `styled-system/` directory with generated CSS utilities and types.

### 4. Start the Development Server

**Option 1: Start all apps** (web + api if available):

```bash
# From project root
pnpm dev
```

**Option 2: Start web app only**:

```bash
# From project root
pnpm dev:web

# OR from apps/web directory
cd apps/web
pnpm dev
```

**Expected output**:

```
VITE v7.x.x  ready in 450 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 5. Verify Setup

Open http://localhost:5173 in your browser.

**What you should see**:

- Logo Designer interface with neo-brutalist controls
- Logo preview in 3D space
- Control panel with Color and Layout tabs

**Test interactions**:

- Click color pickers to change logo colors
- Adjust sliders in the Layout tab
- Open the gallery drawer (should show default presets)

---

## Common Issues & Solutions

### Issue: `pnpm: command not found`

**Cause**: Corepack not enabled or PATH not updated

**Solution**:

```bash
# Enable Corepack
corepack enable

# Verify
pnpm --version
```

### Issue: `styled-system` import errors in VS Code

**Cause**: TypeScript can't find generated types

**Solution**:

```bash
# Regenerate Panda CSS
cd apps/web
pnpm panda codegen --clean

# Restart VS Code TypeScript server
# In VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Issue: Port 5173 already in use

**Cause**: Another Vite dev server is running

**Solution**:

```bash
# Find and kill the process
lsof -ti:5173 | xargs kill -9

# Or use a different port
pnpm dev -- --port 3000
```

### Issue: Module resolution errors in Vite

**Cause**: `vite-tsconfig-paths` plugin not working

**Solution**: Verify `vite.config.ts` includes:

```typescript
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
})
```

### Issue: Slow hot module replacement (HMR)

**Cause**: PostCSS plugin adds overhead

**Solution**: Use Panda CLI watcher in a separate terminal:

```bash
# Terminal 1
pnpm panda --watch

# Terminal 2
pnpm dev
```

**Benchmark**: PostCSS plugin ~8s cold start, CLI watcher ~2s.

### Issue: `node-gyp` errors during `pnpm install`

**Cause**: Some native modules require build tools

**Solution**:

**macOS**:

```bash
xcode-select --install
```

**Linux (Ubuntu/Debian)**:

```bash
sudo apt-get install build-essential
```

**Windows**:

```bash
npm install --global windows-build-tools
```

### Issue: ESLint errors on first run

**Cause**: Linter cache outdated

**Solution**:

```bash
pnpm lint:fix
```

---

## Monorepo Structure

Understanding the project layout:

```
logo-designer/
├── apps/
│   ├── web/                    # Main React application (where you'll work)
│   └── api/                    # Backend API (future)
├── packages/                   # Shared libraries (future)
├── docs/                       # Documentation (you're here!)
│   ├── SETUP.md               # This file
│   ├── architecture/          # System design specs
│   ├── design-system/         # Styling and components
│   └── development/           # Workflows and tools
├── package.json               # Root workspace config
├── pnpm-workspace.yaml        # Workspace definition
└── pnpm-lock.yaml             # Dependency lock file (DO NOT modify manually)
```

**Key files**:

- `package.json`: Scripts for all apps (`dev`, `build`, `lint`, `format`)
- `pnpm-workspace.yaml`: Defines which directories are workspace packages
- `.nvmrc`: (will be created) - Locks Node.js version for consistency

---

## Next Steps

### Learn the Codebase

1. **Read the architecture docs**: Start with [ARCHITECTURE.md](architecture/ARCHITECTURE.md) to understand the logo design system
2. **Explore the UI redesign**: [UI_ARCHITECTURE.md](architecture/UI_ARCHITECTURE.md) explains the video-game-inspired interface
3. **Learn Panda CSS**: [STYLING.md](design-system/STYLING.md) covers the styling system in depth

### Development Workflow

1. **Check the style development guide**: [STYLE_DEV.md](development/STYLE_DEV.md) for daily workflows
2. **Component patterns**: [COMPONENTS.md](design-system/COMPONENTS.md) for building new UI components
3. **Design tokens**: [DESIGN_TOKENS.md](design-system/DESIGN_TOKENS.md) for the token system

### Contributing

1. **Check for issues**: Look for "good first issue" or "help wanted" labels
2. **Create a branch**: `git checkout -b feature/your-feature-name`
3. **Make changes**: Follow the patterns in existing code
4. **Run tests**: `pnpm lint` and `pnpm build` before committing
5. **Commit**: Use clear, descriptive commit messages
6. **Push and create PR**: Follow the PR template (if available)

---

## Development Scripts Reference

Run these from the project root:

```bash
# Development
pnpm dev              # Start all apps
pnpm dev:web          # Start web app only
pnpm dev:api          # Start API only (future)

# Building
pnpm build            # Build all apps for production
pnpm build:web        # Build web app only
pnpm build:api        # Build API only (future)

# Code Quality
pnpm lint             # Run ESLint on all apps
pnpm lint:fix         # Auto-fix linting errors
pnpm format           # Format code with Prettier
pnpm format:check     # Check formatting without changes

# Panda CSS (run from apps/web)
pnpm panda codegen            # Generate styled-system
pnpm panda codegen --clean    # Clean and regenerate
pnpm panda --watch            # Watch mode for faster HMR
pnpm panda debug <file>       # Debug CSS generation for a file
```

---

## Keeping Your Environment Updated

### Update Node.js

```bash
# List available LTS versions
nvm list-remote --lts

# Install new version
nvm install 24  # Or specific version like 24.1.0

# Set as default
nvm alias default 24
```

### Update pnpm

The project's `packageManager` field in `package.json` controls the pnpm version. To update:

1. Update the version in `package.json`:

   ```json
   "packageManager": "pnpm@<new-version>"
   ```

2. Run `corepack use pnpm@latest` to update to the latest version
3. Corepack will download the new version on next use

### Update Dependencies

```bash
# Check for outdated packages
pnpm outdated

# Update all dependencies (interactive)
pnpm update --interactive

# Update specific package
pnpm update <package-name> --latest
```

---

## Uninstallation (If Needed)

If you need to clean up or start fresh:

### Remove Project

```bash
cd ~/projects
rm -rf logo-designer
```

### Remove pnpm (via Corepack)

```bash
corepack disable
```

### Remove Node.js and nvm

```bash
# Remove all installed Node versions
nvm ls | grep -v "system" | xargs -I {} nvm uninstall {}

# Remove nvm
rm -rf ~/.nvm

# Remove nvm lines from shell profile
# Edit ~/.bashrc or ~/.zshrc and remove the nvm section
```

### Remove Git (if needed)

**macOS (Homebrew)**:

```bash
brew uninstall git
```

**Linux (Ubuntu/Debian)**:

```bash
sudo apt-get remove git
```

---

## Resources

### Official Documentation

- [Node.js](https://nodejs.org/en/docs/)
- [nvm](https://github.com/nvm-sh/nvm#readme)
- [pnpm](https://pnpm.io/)
- [Corepack](https://nodejs.org/api/corepack.html)
- [Git](https://git-scm.com/doc)
- [VS Code](https://code.visualstudio.com/docs)

### Project Documentation

- [Project README](../README.md)
- [Architecture Docs](architecture/)
- [Design System Docs](design-system/)
- [Development Guides](development/)

### Community & Support

- **Discord/Slack**: (Add link if available)
- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and community help

### External References

Sources for this guide's research:

- [nvm Installation Guide](https://github.com/nvm-sh/nvm)
- [nvm-windows](https://github.com/coreybutler/nvm-windows)
- [Node.js Release Schedule](https://nodejs.org/en/about/previous-releases)
- [pnpm Installation](https://pnpm.io/installation)
- [Corepack Documentation](https://github.com/nodejs/corepack)
- [Git Installation](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Panda CSS VS Code Extension](https://marketplace.visualstudio.com/items?itemName=chakra-ui.panda-css-vscode)

---

**Document Version**: 1.0
**Status**: Active - Primary setup guide for new developers
**Maintainer**: Development Team
**Last Reviewed**: 2025-12-14
