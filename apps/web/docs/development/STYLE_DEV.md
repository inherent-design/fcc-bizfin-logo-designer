# Style Development Workflow

**Stack**: Vite + React + TypeScript + Panda CSS

**Purpose**: Tooling, component development, testing, and debugging guide for daily workflows.

---

## Before You Begin

**New to the project?** This guide assumes you have already set up your development environment (Node.js, pnpm, Git, etc.). If you haven't done this yet, please follow the **[Development Environment Setup Guide](../SETUP.md)** first.

**What this guide covers**:

- Performance optimization techniques
- Debugging Panda CSS
- Component development workflows
- Testing strategies
- CI/CD integration

---

## Performance Optimization

### Production Build Config

Add to `panda.config.ts`:

```typescript
export default defineConfig({
  // ... other config

  // Production optimizations
  hash: true, // Atomic class hashing (e.g., p_4 → _a1b2c3)
  minify: true, // Minify generated CSS
  optimize: true, // Atomic CSS compression
  clean: true, // Remove old files before regeneration

  // Development optimizations
  lightningcss: true, // Use Lightning CSS for faster processing (if HMR slow)
})
```

**Trade-offs**:

- `hash: true` → Faster runtime, harder debugging (disable in dev)
- `lightningcss: true` → Faster builds, requires native dependency

### Build Time Optimization

**Use CLI watcher** instead of PostCSS plugin for faster HMR:

```bash
# Terminal 1
pnpm panda --watch

# Terminal 2
pnpm vite
```

**Benchmark**: PostCSS plugin ~8s cold start, CLI watcher ~2s.

### Bundle Size Tips

1. **Use semantic tokens** → Fewer CSS variable definitions
2. **Avoid unused variants** → Config recipes only generate used variants
3. **Tree-shake utilities** → Set `jsxStyleProps: 'minimal'` to reduce runtime
4. **Static extraction** → Pre-generate common values via `staticCss`

---

## Debugging

### Check Generated CSS

```bash
panda debug src/components/Button.tsx
```

Outputs:

- `Button.debug.css` - Generated CSS for this file
- `Button.debug.json` - Extracted style objects

### Verbose Logging

```bash
PANDA_DEBUG=* panda build
```

Shows:

- File scanning progress
- Extraction results
- Codegen timing

### Profile Slow Builds

```bash
panda --cpu-prof
```

Opens `.cpuprofile` in Chrome DevTools or Speedscope to identify bottlenecks.

### Visual Debugging

Add `debug: true` to see component boundaries:

```typescript
<div className={css({ debug: true, p: 4 })} />
```

Renders outlines around elements for layout inspection.

### DevTools Setup

**Browser**: Install [Atomic CSS DevTools](https://github.com/astahmer/atomic-css-devtools) extension to decode hashed classnames.

**VSCode**: Install [Panda CSS VSCode Extension](https://marketplace.visualstudio.com/items?itemName=chakra-ui.panda-css-vscode) for:

- Token autocomplete
- Color preview
- Go-to-definition for recipes/tokens

---

## Common Errors & Solutions

### 1. Styles Not Generated

**Symptom**: `css()` calls don't produce CSS output.

**Causes**:

- Wrong `include` paths in `panda.config.ts`
- File not saved (Vite dev server needs manual save)
- Version mismatch across monorepo packages

**Fix**:

```bash
pnpm panda codegen --clean  # Force regeneration
```

Verify `include` pattern matches your files:

```typescript
include: ['./src/**/*.{ts,tsx}'] // Must match file locations
```

### 2. ES5 Target Error

**Symptom**: "Transforming const to es5 not supported"

**Cause**: `tsconfig.json` has `target: "ES5"`

**Fix**: Update to ES6+ (Panda requires ES2015 minimum):

```json
{ "compilerOptions": { "target": "ES2020" } }
```

### 3. HMR Not Working

**Symptom**: Style changes don't apply without full reload.

**Causes**:

- Missing `importMap` config
- Bundler not watching `styled-system` directory

**Fix**:

```typescript
// panda.config.ts
export default defineConfig({
  importMap: '@styled-system', // Enables HMR tracking
})
```

### 4. CSS Specificity Issues

**Symptom**: Panda styles overridden by external CSS.

**Cause**: Unlayered CSS has higher specificity than layered CSS.

**Fix**: Import external CSS as layers:

```css
@layer reset, external, base, tokens, recipes, utilities;
@import 'external-library.css' layer(external);
```

### 5. Dynamic Values Fail

**Symptom**: Runtime values don't generate CSS:

```typescript
const size = useState(20)
css({ width: size }) // ❌ Doesn't work
```

**Cause**: Static extraction can't analyze runtime values.

**Fix**: Use CSS variables or `staticCss`:

```typescript
// Option 1: CSS variables
<div style={{ '--size': `${size}px` }} className={css({ width: 'var(--size)' })} />

// Option 2: Pre-generate in config
staticCss: {
  css: [{ width: ['20px', '40px', '60px'] }]
}
```

### 6. Missing JSX Framework

**Symptom**: Style props don't extract (`<styled.div bg="red" />` ignored).

**Cause**: `jsxFramework` not set in config.

**Fix**:

```typescript
export default defineConfig({
  jsxFramework: 'react', // Required for JSX pattern extraction
})
```

### 7. TypeScript `as` Prop Not Recognized

**Symptom**: `<styled.div as="button" />` TypeScript error.

**Cause**: Known limitation in Panda's TypeScript definitions.

**Workaround**: Use native element or wrapper component.

### 8. PostCSS Plugin Order

**Symptom**: Autoprefixer breaks Panda output.

**Cause**: Autoprefixer must run _after_ Panda.

**Fix**:

```typescript
css: {
  postcss: {
    plugins: [
      require('@pandacss/dev/postcss'), // First
      require('autoprefixer'), // Second
    ]
  }
}
```

---

## Component Development with Storybook

### Configure Storybook

**`.storybook/main.ts`**:

```typescript
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-themes',
    'storybook-design-token', // Optional: display tokens
  ],
  framework: '@storybook/react-vite',
  core: {
    builder: '@storybook/builder-vite',
  },
}

export default config
```

**`.storybook/preview.tsx`**:

```typescript
import type { Preview } from '@storybook/react'
import { withThemeByClassName } from '@storybook/addon-themes'
import '../src/index.css' // Import Panda styles

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
}

export default preview
```

### Write Component Stories

**src/components/Button.stories.tsx**:

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Click me',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
  },
}
```

### Dev Workflow

**Start Storybook**:

```bash
pnpm storybook
```

**Benefits**:

- **Component isolation**: Test components without full app context
- **Interactive controls**: Modify props via UI
- **Theme switching**: Toggle dark/light via toolbar
- **Docs generation**: Auto-generated prop tables

---

## Visual Regression Testing

### Tool Comparison

**Argos** (Recommended for solo/small teams):

- Open source + SaaS
- Free tier available
- Storybook Vitest addon support (Sept 2025)
- Self-hostable

**Chromatic** (Best for teams):

- 5,000 snapshots/month free
- Seamless Storybook integration
- Accessibility + interaction testing
- $149/month paid tier

**Playwright** (Self-hosted):

- Free (open source)
- Full control, no vendor lock-in
- Requires DIY setup

### Setup Argos

**Install**:

```bash
pnpm add -D @argos-ci/storybook
```

**Configure** (`.storybook/main.ts`):

```typescript
addons: ['@storybook/addon-essentials', '@argos-ci/storybook']
```

**GitHub Actions** (`.github/workflows/visual-test.yml`):

```yaml
name: Visual Regression Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install

      - run: pnpm build-storybook

      - uses: argos-ci/github-action@v3
        with:
          token: ${{ secrets.ARGOS_TOKEN }}
```

**Sign up**: Create account at [argos-ci.com](https://argos-ci.com), get token, add to GitHub secrets.

### Setup Playwright (Alternative)

**Install**:

```bash
pnpm add -D @playwright/test
pnpm exec playwright install
```

**Configure** (`playwright.config.ts`):

```typescript
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:6006', // Storybook URL
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
})
```

**Write tests** (`tests/button.spec.ts`):

```typescript
import { test, expect } from '@playwright/test'

test('button primary variant', async ({ page }) => {
  await page.goto('/iframe.html?id=button--primary')
  await expect(page).toHaveScreenshot('button-primary.png')
})

test('button dark theme', async ({ page }) => {
  await page.goto('/iframe.html?id=button--primary&globals=theme:dark')
  await expect(page).toHaveScreenshot('button-dark.png')
})
```

**Run**:

```bash
pnpm exec playwright test
pnpm exec playwright test --update-snapshots  # Update baseline
```

### Testing Panda CSS Patterns

**Theme Switching**:

```typescript
// Separate stories per theme
export const LightTheme: Story = {
  args: { variant: 'primary' },
  parameters: { theme: 'light' },
}

export const DarkTheme: Story = {
  args: { variant: 'primary' },
  parameters: { theme: 'dark' },
}
```

**Responsive Breakpoints**:

```typescript
// Test mobile, tablet, desktop
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
}
```

**Token Changes**:

1. Update tokens in `panda.config.ts`
2. Run `pnpm panda codegen`
3. Rebuild Storybook
4. Visual diff will catch unintended changes

**Component-Level Testing**: Argos and Playwright support component isolation (single component snapshots), catching token/variant changes without full page noise.

---

## CI/CD Integration

The project uses GitHub Actions for continuous integration and Husky for pre-commit hooks. These are already configured in the repository.

**GitHub Actions** (`.github/workflows/ci.yml`): Runs linting, Panda CSS codegen, and builds on every push and PR.

**Pre-commit Hooks** (`.husky/pre-commit`): Automatically runs `lint-staged` to format and lint changed files before commits.

**Configuration details**: See [GITOPS.md](GITOPS.md) for the complete CI/CD setup and Docker build processes.

---

## Tips & Best Practices

### Development Workflow

1. **Component-first**: Build in Storybook before integrating into app
2. **Token-driven**: Define tokens in config before writing components
3. **Incremental codegen**: Run `panda codegen` after token changes
4. **Visual regression**: Run on every PR to catch style drift

### IDE Setup

**VS Code extensions and configuration**: See [SETUP.md](../SETUP.md) for recommended extensions and settings.

### Monorepo Considerations

**Share styled-system**: Prevent duplicate bundles by using `importMap`:

```typescript
// packages/design-system/panda.config.ts
export default defineConfig({
  emitPackage: true,
  importMap: '@acme/design-system',
})
```

**Consume in apps**:

```typescript
// apps/web/panda.config.ts
import preset from '@acme/design-system/preset'

export default defineConfig({
  presets: [preset],
})
```

---

## Troubleshooting Checklist

When styles don't work:

1. ✅ CSS imported in `main.tsx`?
2. ✅ `styled-system/styles.css` exists?
3. ✅ `panda codegen` run after config changes?
4. ✅ `include` paths match file locations?
5. ✅ `jsxFramework` set correctly?
6. ✅ Dev server watching `styled-system/`?
7. ✅ No TypeScript errors in terminal?
8. ✅ Browser DevTools showing generated CSS?

If all pass and styles still broken:

```bash
pnpm panda codegen --clean
rm -rf styled-system
pnpm panda codegen
```

---

## References

**Documentation**:

- [Panda CSS Installation](https://panda-css.com/docs/installation/vite)
- [Storybook for Vite](https://storybook.js.org/docs/get-started/frameworks/react-vite)
- [Argos Visual Testing](https://argos-ci.com/docs)
- [Playwright Visual Testing](https://playwright.dev/docs/test-snapshots)

**Tools**:

- [Panda VSCode Extension](https://marketplace.visualstudio.com/items?itemName=chakra-ui.panda-css-vscode)
- [Atomic CSS DevTools](https://github.com/astahmer/atomic-css-devtools)
- [tw2panda Migration Tool](https://github.com/astahmer/tw2panda)

**Community**:

- [Panda CSS Discord](https://discord.gg/VQrkpsgSx7)
- [GitHub Discussions](https://github.com/chakra-ui/panda/discussions)
