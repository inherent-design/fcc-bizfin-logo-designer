# Component Template Quick Reference

One-page cheat sheet for the neo-brutalist React + TypeScript + Panda CSS component template.

---

## File Structure Order

```
1. IMPORTS         → External, Panda, Types, Utils, Components
2. TYPES           → Props, Internal types, Exports
3. CONSTANTS       → Config, defaults (if needed)
4. STYLES          → css(), recipes (Panda CSS)
5. UTILS           → Helper functions
6. SUB-COMPONENTS  → Internal, not exported
7. MAIN COMPONENT  → Exported component
8. EXPORTS         → Named exports, types (if separate)
```

---

## Section Header Template

```typescript
// ============================================================================
// SECTION NAME
// ============================================================================
```

---

## Import Organization

```typescript
// External dependencies (React first, then alphabetical)
import { useState, useEffect } from 'react'
import { SomeLib } from 'some-lib'

// Panda CSS
import { css, cx } from 'styled-system/css'
import { stack } from 'styled-system/patterns'

// Types
import type { MyType } from '@/schemas/myType.schema'

// Utils
import { helperFn } from '@/utils/helpers'
import { logger } from '@/utils/logger'

// Components
import { Button } from '@/components/ui/Button'
```

---

## VS Code Snippets

| Prefix     | Description             |
| ---------- | ----------------------- |
| `rcp`      | Full component template |
| `section`  | Section header          |
| `pcss`     | Panda CSS style object  |
| `rsub`     | Sub-component           |
| `rprops`   | Props interface         |
| `rimports` | Import section          |
| `rutil`    | Utility function        |
| `rhandler` | Event handler           |
| `rctx`     | Component with context  |

---

## Common Patterns

### Basic Component

```typescript
// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface ButtonProps {
  variant: 'primary' | 'secondary'
  children: ReactNode
}

// ============================================================================
// STYLES
// ============================================================================

const buttonStyles = css({
  px: 4,
  py: 2,
  border: 'brutal',
})

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function Button({ variant, children }: ButtonProps) {
  return <button className={buttonStyles}>{children}</button>
}
```

### Component with Sub-components

```typescript
// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function ButtonIcon({ icon }: { icon: string }) {
  return <span>{icon}</span>
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function Button({ icon, children }: ButtonProps) {
  return (
    <button>
      <ButtonIcon icon={icon} />
      {children}
    </button>
  )
}
```

### Component with Recipe

```typescript
// ============================================================================
// IMPORTS
// ============================================================================

import type { ComponentProps } from 'react'
import { cx } from 'styled-system/css'
import { neoButton, type NeoButtonVariantProps } from 'styled-system/recipes'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface ButtonProps extends ComponentProps<'button'>, NeoButtonVariantProps {}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function Button(props: ButtonProps) {
  const [variantProps, restProps] = neoButton.splitVariantProps(props)
  const { className, ...htmlProps } = restProps

  return <button className={cx(neoButton(variantProps), className)} {...htmlProps} />
}
```

---

## JSDoc Templates

### Component

````typescript
/**
 * ComponentName - Brief description
 *
 * Features:
 * - Feature 1
 * - Feature 2
 *
 * @example
 * ```tsx
 * <ComponentName prop="value" />
 * ```
 */
export function ComponentName() {}
````

### Props Interface

```typescript
/**
 * ComponentName props
 */
interface ComponentNameProps {
  /** Prop description */
  propName: string
}
```

### Utility Function

```typescript
/**
 * Function description
 *
 * @param param - Parameter description
 * @returns Return value description
 */
function utilityFn(param: string): number {
  return 0
}
```

---

## Style Naming Conventions

Pattern: `{element}{State}Styles`

```typescript
const containerStyles = css({ ... })
const containerHoverStyles = css({ ... })
const buttonStyles = css({ ... })
const buttonActiveStyles = css({ ... })
const labelStyles = css({ ... })
const inputStyles = css({ ... })
const inputFocusStyles = css({ ... })
```

---

## Component Complexity Limits

| Metric             | Limit      | Action if Exceeded             |
| ------------------ | ---------- | ------------------------------ |
| Lines per file     | 600        | Split into multiple components |
| Lines per function | 100        | Extract sub-components         |
| JSX depth          | 5 levels   | Extract nested sections        |
| Styles in section  | 20 objects | Consider splitting component   |
| Sub-components     | 10         | Consider separate file         |

---

## Navigation Shortcuts

### VS Code

- `Cmd + P` → `@types` → Jump to types section
- `Cmd + P` → `@styles` → Jump to styles section
- `Cmd + F` → Type section name → Jump to section
- Click minimap → Visual section boundaries

### Outline View

Shows clear structure with section headers

---

## Code Review Checklist

- [ ] All imports organized (External → Panda → Types → Utils → Components)
- [ ] Section headers present and in correct order
- [ ] All styles in STYLES section (no inline css() in JSX)
- [ ] Sub-components extracted (no repeated JSX patterns)
- [ ] JSDoc comments on all interfaces and main component
- [ ] No function > 100 lines
- [ ] No file > 600 lines
- [ ] Utility functions in UTILS section
- [ ] Types use JSDoc for complex props
- [ ] Main component has usage example in JSDoc

---

## Migration Priority

1. **High Priority** (500+ lines)
   - Complex components with many sub-sections
   - Components with scattered styles
   - Components with duplication

2. **Medium Priority** (200-500 lines)
   - Components with some complexity
   - Components that are frequently modified

3. **Low Priority** (<200 lines)
   - Simple components
   - Components that rarely change

---

## Common Mistakes

### ❌ Don't

```typescript
// Inline styles
<div className={css({ p: 4 })}>

// Mixed imports
import { css } from 'styled-system/css'
import type { MyType } from './types'
import { useState } from 'react'

// No section headers
interface Props {}
const styles = css({})
export function Component() {}
```

### ✅ Do

```typescript
// ============================================================================
// IMPORTS
// ============================================================================

import { useState } from 'react'
import { css } from 'styled-system/css'
import type { MyType } from './types'

// ============================================================================
// STYLES
// ============================================================================

const containerStyles = css({ p: 4 })

// ============================================================================
// MAIN COMPONENT
// ============================================================================

<div className={containerStyles}>
```

---

## Resources

- **Full Guide**: [COMPONENT_TEMPLATE.md](./COMPONENT_TEMPLATE.md)
- **Example**: [COMPONENT_REFACTOR_EXAMPLE.md](./COMPONENT_REFACTOR_EXAMPLE.md)
- **ESLint Rules**: [ESLINT_COMPONENT_RULES.md](./ESLINT_COMPONENT_RULES.md)
- **VS Code Snippets**: [../.vscode/snippets.code-snippets](../.vscode/snippets.code-snippets)

---

## Keyboard Shortcuts Summary

| Action            | Shortcut                 |
| ----------------- | ------------------------ |
| New component     | `rcp` + Tab              |
| New section       | `section` + Tab          |
| New style         | `pcss` + Tab             |
| New sub-component | `rsub` + Tab             |
| Jump to section   | `Cmd + F` → Section name |
| Outline view      | `Cmd + Shift + O`        |

---

**Print this page for quick reference while coding!**

---

**Last updated**: 2025-12-15
