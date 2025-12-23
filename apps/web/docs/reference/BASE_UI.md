# Base UI Comprehensive Reference

**Purpose:** Axiomatic knowledge for developing ANY components/features with Base UI
**Date:** 2025-12-21
**Source:** https://base-ui.com (@base-ui/react)

---

## Component Catalog (Categorical)

### Form Controls

| Component          | Purpose                     | Providers  | Key Features                                         | Accessibility    | Key Data Attributes                                    |
| ------------------ | --------------------------- | ---------- | ---------------------------------------------------- | ---------------- | ------------------------------------------------------ |
| **Button**         | Accessible button           | None       | Render as different element, focusable when disabled | ARIA button role | `data-disabled`                                        |
| **Checkbox**       | Boolean checkbox            | None       | Controlled/uncontrolled, indeterminate state         | ARIA checkbox    | `data-checked`, `data-unchecked`, `data-indeterminate` |
| **Checkbox Group** | Group of checkboxes         | None       | Shared state, value array                            | ARIA group       | `data-disabled`                                        |
| **Input**          | Text input                  | None       | Standard input with Base UI integration              | ARIA textbox     | `data-disabled`, `data-invalid`                        |
| **Number Field**   | Numeric input with spinners | None       | Min/max/step, scrub area, Intl.NumberFormat          | ARIA spinbutton  | `data-disabled`, `data-invalid`                        |
| **Radio**          | Single-choice option        | RadioGroup | Must be in group                                     | ARIA radio       | `data-checked`, `data-unchecked`                       |
| **Slider**         | Range input                 | None       | Single/multiple thumbs, min/max/step, format         | ARIA slider      | `data-disabled`, `data-direction`                      |
| **Switch**         | On/off toggle               | None       | Controlled/uncontrolled                              | ARIA switch      | `data-checked`, `data-unchecked`                       |
| **Toggle**         | Pressed/unpressed button    | None       | Button-styled switch                                 | ARIA button      | `data-pressed`, `data-unpressed`                       |
| **Toggle Group**   | Group of toggles            | None       | Single/multiple selection                            | ARIA group       | `data-disabled`                                        |
| **Select**         | Dropdown selection          | None       | Keyboard search, scroll arrows                       | ARIA listbox     | `data-popup-open`, `data-filled`                       |

### Advanced Form

| Component        | Purpose                    | Providers | Key Features                             | Accessibility          | Key Data Attributes                                                                       |
| ---------------- | -------------------------- | --------- | ---------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------- |
| **Autocomplete** | Input with suggestion list | None      | Mode: both/list/inline, custom rendering | ARIA combobox          | `data-popup-open`, `data-highlighted`                                                     |
| **Combobox**     | Input + selection list     | None      | Search + select, clear button            | ARIA combobox          | `data-popup-open`, `data-highlighted`, `data-selected`                                    |
| **Field**        | Label + validation wrapper | None      | Validation modes, dirty/touched tracking | ARIA label/description | `data-valid`, `data-invalid`, `data-dirty`, `data-touched`, `data-filled`, `data-focused` |
| **Fieldset**     | Group with legend          | None      | Stylable legend (vs native)              | ARIA group             | `data-disabled`                                                                           |
| **Form**         | Form wrapper               | None      | onFormSubmit with typed values           | ARIA form              | `data-valid`, `data-invalid`                                                              |

### Overlays

| Component        | Purpose            | Portal | Positioning             | Focus Trap | Esc Close | Key Data Attributes                                                                |
| ---------------- | ------------------ | ------ | ----------------------- | ---------- | --------- | ---------------------------------------------------------------------------------- |
| **Dialog**       | Modal dialog       | Yes    | Fixed center            | Yes        | Yes       | `data-open`, `data-starting-style`, `data-ending-style`, `data-nested-dialog-open` |
| **Alert Dialog** | Requires response  | Yes    | Fixed center            | Yes        | No        | `data-open`, `data-starting-style`, `data-ending-style`                            |
| **Popover**      | Anchored popup     | Yes    | Positioner              | Yes        | Yes       | `data-open`, `data-side`, `data-starting-style`, `data-ending-style`               |
| **Tooltip**      | Hover hint         | Yes    | Positioner              | No         | Yes       | `data-open`, `data-side`, `data-instant`                                           |
| **Menu**         | Action dropdown    | Yes    | Positioner              | Yes        | Yes       | `data-open`, `data-highlighted`, `data-side`                                       |
| **Context Menu** | Right-click menu   | Yes    | Positioner (at pointer) | Yes        | Yes       | `data-open`, `data-highlighted`, `data-side`                                       |
| **Preview Card** | Link hover preview | Yes    | Positioner              | No         | Yes       | `data-open`, `data-side`                                                           |

### Navigation

| Component           | Purpose            | Providers | Key Features                                | Accessibility   | Key Data Attributes                                     |
| ------------------- | ------------------ | --------- | ------------------------------------------- | --------------- | ------------------------------------------------------- |
| **Tabs**            | Panel switcher     | None      | Horizontal/vertical, auto/manual activation | ARIA tabs       | `data-selected`, `data-orientation`                     |
| **Accordion**       | Collapsible panels | None      | Single/multiple expansion                   | ARIA accordion  | `data-open`, `data-index`                               |
| **Collapsible**     | Single panel       | None      | Controlled/uncontrolled                     | ARIA region     | `data-open`, `data-starting-style`, `data-ending-style` |
| **Navigation Menu** | Website nav        | None      | Nested menus                                | ARIA navigation | `data-open`, `data-highlighted`                         |
| **Menubar**         | App menubar        | None      | F10/Alt activation                          | ARIA menubar    | `data-open`, `data-highlighted`                         |

### Content Display

| Component       | Purpose           | Providers | Key Features                     | Accessibility    | Key Data Attributes                                |
| --------------- | ----------------- | --------- | -------------------------------- | ---------------- | -------------------------------------------------- |
| **Avatar**      | User image        | None      | Loading states, fallback         | ARIA img         | `data-loading`, `data-loaded`                      |
| **Progress**    | Task indicator    | None      | Determinate/indeterminate        | ARIA progressbar | `data-indeterminate`                               |
| **Meter**       | Value gauge       | None      | Min/max/optimum, semantic states | ARIA meter       | `data-optimum`, `data-suboptimal`, `data-critical` |
| **Separator**   | Visual divider    | None      | Horizontal/vertical              | ARIA separator   | `data-orientation`                                 |
| **Scroll Area** | Custom scrollbars | None      | Native scroll, custom styling    | Native behavior  | `data-orientation`, `data-scrolling`               |

### Notifications

| Component | Purpose       | Providers      | Key Features                                    | Accessibility      | Key Data Attributes                                                    |
| --------- | ------------- | -------------- | ----------------------------------------------- | ------------------ | ---------------------------------------------------------------------- |
| **Toast** | Notifications | Toast.Provider | Stacked/anchored, swipe-dismiss, global manager | ARIA live, F6 jump | `data-expanded`, `data-swipe-direction`, `data-limited`, `data-behind` |

### Layout

| Component   | Purpose      | Providers | Key Features       | Accessibility | Key Data Attributes |
| ----------- | ------------ | --------- | ------------------ | ------------- | ------------------- |
| **Toolbar** | Button group | None      | Horizontal actions | ARIA toolbar  | `data-orientation`  |

### Utilities

| Utility                | Purpose            | Use Case                                     |
| ---------------------- | ------------------ | -------------------------------------------- |
| **Direction Provider** | RTL/LTR context    | Internationalization (Arabic, Hebrew)        |
| **useRender**          | Custom render hook | Building components with render prop pattern |

---

## Decision Tree: When to Use What

### User Input Needed?

**YES → Form Controls**

├─ **Text/numeric input?**
│  ├─ Plain text → **Input** or **Field.Control**
│  ├─ Numeric with increment/decrement → **Number Field**
│  ├─ Search with suggestions → **Autocomplete**
│  └─ Search + selection from list → **Combobox**
│
├─ **Boolean choice?**
│  ├─ Single on/off → **Switch** or **Checkbox**
│  ├─ Multiple checkboxes → **Checkbox Group**
│  └─ Button-styled toggle → **Toggle** or **Toggle Group**
│
├─ **Pick from list?**
│  ├─ Few options (<10) → **Radio** (inside group)
│  ├─ Dropdown select → **Select**
│  └─ Searchable dropdown → **Combobox**
│
├─ **Numeric range?**
│  ├─ Single value → **Slider** (single thumb)
│  └─ Min/max range → **Slider** (two thumbs)
│
└─ **Form wrapper needed?**
   ├─ Single control → **Field** (label + validation)
   ├─ Related controls → **Fieldset** (group with legend)
   └─ Entire form → **Form** (consolidated error handling)

**NO → Display/Navigation/Feedback**

├─ **Modal interaction needed?**
│  ├─ Blocks page, requires action → **Dialog**
│  ├─ Requires explicit response → **Alert Dialog**
│  ├─ Contextual hint → **Popover**
│  └─ Non-blocking tooltip → **Tooltip**
│
├─ **Navigation needed?**
│  ├─ Switchable views (same page) → **Tabs**
│  ├─ Expandable sections → **Accordion** or **Collapsible**
│  ├─ Website navigation → **Navigation Menu**
│  ├─ App menubar → **Menubar**
│  └─ Dropdown actions → **Menu**
│
├─ **Contextual menu?**
│  ├─ Click/tap → **Menu** (from trigger)
│  ├─ Right-click/long-press → **Context Menu**
│  └─ Hover preview → **Preview Card**
│
├─ **Feedback needed?**
│  ├─ Notification message → **Toast**
│  ├─ Task progress → **Progress**
│  ├─ Value gauge → **Meter**
│  └─ Visual divider → **Separator**
│
└─ **Other display?**
   ├─ User avatar → **Avatar**
   ├─ Custom scrollbars → **Scroll Area**
   ├─ Action grouping → **Toolbar**
   └─ Simple button → **Button**

---

## Provider Hierarchy

### Required Providers

**Toast.Provider**
- **When:** Using Toast component
- **Scope:** Wrap app or feature area
- **Props:** `limit` (max simultaneous toasts), `toastManager` (global instance)
- **Access:** `useToastManager()` hook

**Direction Provider**
- **When:** RTL language support needed
- **Scope:** Wrap entire app
- **Optional:** Only for internationalization

### Self-Contained Components

All other components manage their own state via Root component (no global provider needed).

**Pattern:** Root provides context, child components consume it.

---

## Common Patterns

### Portal Pattern

**Used By:** Dialog, Alert Dialog, Popover, Tooltip, Menu, Context Menu, Preview Card, Navigation Menu, Menubar, Select, Combobox, Autocomplete, Toast

**Purpose:** Render into document.body (or custom target) to escape local stacking context

**Setup Required:**
```css
/* App root */
.root {
  isolation: isolate;
}

/* iOS 26+ Safari */
body {
  position: relative;
}
```

**Structure:**
```jsx
<Component.Root>
  <Component.Trigger />
  <Component.Portal>  {/* Renders to body */}
    {children}
  </Component.Portal>
</Component.Root>
```

### Positioner Pattern

**Used By:** Popover, Tooltip, Menu, Context Menu, Preview Card, Navigation Menu, Menubar, Select, Combobox, Autocomplete, Toast (anchored)

**Features:**
- Collision detection (auto-flips to stay in viewport)
- Anchoring to trigger element
- Offset control via `sideOffset` prop
- CSS variables for available space

**CSS Variables:**
- `--available-width` - Max width before overflow
- `--available-height` - Max height before overflow
- `--anchor-width` - Anchor element width
- `--anchor-height` - Anchor element height
- `--transform-origin` - Animation origin (e.g., "top left")

**Data Attributes:**
- `data-side` - Positioning side: `top` | `bottom` | `left` | `right`

**Usage:**
```jsx
<Component.Positioner sideOffset={8}>
  <Component.Popup className={css({
    maxHeight: 'var(--available-height)',
    width: 'var(--anchor-width)',
    transformOrigin: 'var(--transform-origin)',
  })} />
</Component.Positioner>
```

### Compound API Pattern

**Structure:** Root → Trigger → Portal → Positioner → Popup → Content

**Flexibility:** Compose only parts you need

**Each Part:**
- Independently stylable
- Accepts `render` prop for customization
- Built-in ARIA relationships

**Typical Anatomy:**
```jsx
<Component.Root>
  <Component.Trigger />
  <Component.Portal>
    <Component.Positioner>
      <Component.Popup>
        <Component.Title />
        <Component.Description />
        <Component.Close />
      </Component.Popup>
    </Component.Positioner>
  </Component.Portal>
</Component.Root>
```

### Data Attributes Pattern

**Purpose:** Styling hooks for component state

**Common Attributes:**
- `data-disabled` - Component disabled
- `data-open` - Overlay/disclosure open
- `data-starting-style` - Animation enter state
- `data-ending-style` - Animation exit state
- `data-checked` / `data-unchecked` - Toggle state
- `data-highlighted` - Keyboard/mouse focus
- `data-selected` - Item selected
- `data-side` - Positioning side

**Styling Approach:**
```css
.Component {
  /* Base styles */
}

.Component[data-disabled] {
  opacity: 0.5;
  pointer-events: none;
}

.Component[data-starting-style],
.Component[data-ending-style] {
  opacity: 0;
  transform: scale(0.9);
}
```

### Focus Management Pattern

**Focus Trap (Dialog, Popover, Menu):**
- Focus moves inside on open
- Tab/Shift+Tab loop within
- Esc closes (configurable)
- Focus restores to trigger on close

**Keyboard Shortcuts:**
- **Esc** - Close overlays
- **F6** - Jump to toast viewport
- **Arrow keys** - Navigate menus/tabs/radio groups
- **Home/End** - Jump to first/last item
- **Type-ahead** - Search in Select/Combobox/Autocomplete
- **Enter/Space** - Activate buttons/toggles

### Form Integration Pattern

**Field Architecture:**
- `Field.Root` - Wrapper with validation state
- `Field.Label` - Auto-associates with control
- `Field.Control` - Input element (or Base UI form component)
- `Field.Description` - Helper text
- `Field.Error` - Conditional error message

**Validation:**
- Modes: `onSubmit` | `onBlur` | `onChange`
- Custom validation via `validate` prop
- Debouncing for onChange mode
- Native constraint validation API integration

**State Tracking:**
- `dirty` - Value changed
- `touched` - Field blurred
- `invalid` - Validation failed
- `filled` - Field has value

**ValidityState Matching:**
```jsx
<Field.Error match="valueMissing">Required</Field.Error>
<Field.Error match="patternMismatch">Invalid format</Field.Error>
```

---

## Theming Integration

### Styling Approach

Base UI is **completely unstyled**. Three styling methods:

1. **className** (static or function)
2. **style** (static or function)
3. **Data attributes** (state-based CSS)

### className Function Pattern

```jsx
<Switch.Thumb
  className={(state) =>
    state.checked ? 'bg-blue-500' : 'bg-gray-300'
  }
/>
```

### Data Attribute Styling (Recommended)

```css
.SwitchThumb {
  background: gray.300;
  transition: background 150ms;
}

.SwitchThumb[data-checked] {
  background: blue.500;
}

.SwitchThumb[data-disabled] {
  opacity: 0.5;
}
```

### CSS Variables (Dynamic Values)

```css
.Popup {
  maxHeight: var(--available-height);
  width: var(--anchor-width);
  transformOrigin: var(--transform-origin);
}

.Toast {
  zIndex: calc(1000 - var(--toast-index));
  transform: translateY(var(--toast-offset-y));
}
```

### Panda CSS Integration

**Strategy 1: Direct Patterns** (One-off styling)
```tsx
import { css } from '@styled-system/css'

<Dialog.Popup className={css({
  bg: 'white',
  borderRadius: 'lg',
  p: 6,
  '&[data-starting-style]': { opacity: 0, scale: 0.9 },
})} />
```

**Strategy 2: Recipes** (Reusable components)
```typescript
import { cva } from '@styled-system/css'

const buttonRecipe = cva({
  base: {
    display: 'flex',
    h: 10,
    px: 3.5,
    '&[data-disabled]': { opacity: 0.5 },
  },
  variants: {
    variant: {
      primary: { bg: 'blue.500' },
      secondary: { bg: 'gray.200' },
    }
  }
})

<Button.Root className={buttonRecipe({ variant: 'primary' })} />
```

**Strategy 3: Multi-Slot Recipes** (Complex components)
```typescript
import { sva } from '@styled-system/css'

const dialogRecipe = sva({
  slots: ['backdrop', 'popup', 'title'],
  base: {
    backdrop: {
      position: 'fixed',
      inset: 0,
      bg: 'blackAlpha.500',
    },
    popup: {
      position: 'fixed',
      bg: 'white',
      borderRadius: 'lg',
    }
  }
})

const classes = dialogRecipe()
<Dialog.Backdrop className={classes.backdrop} />
<Dialog.Popup className={classes.popup} />
```

### Swappable Theme Architecture

**Compatible with base → semantic token flow:**

1. **Base tokens** - Design primitives (neo-brutalism, high-fantasy)
2. **Semantic tokens** - Intent-based (border.default, surface.primary)
3. **Panda config** - Import semantic tokens
4. **Base UI styling** - Reference semantic tokens

**Swap themes:** Update base tokens, semantic layer auto-updates, components inherit new aesthetic.

---

## Key Capabilities

### Component Count
**40 total** (38 components + 2 utilities)

### Provider Requirements
**Minimal** - Only Toast requires provider, all others self-contained

### Positioning
**9 components** use Positioner with collision detection

### Portal Usage
**13 components** render via Portal to escape stacking context

### Styling
- **Primary:** Data attributes for state
- **Secondary:** CSS variables for dynamic values
- **Tertiary:** className/style functions for direct access

### Accessibility
- ARIA roles/attributes built-in
- Keyboard navigation comprehensive
- Focus management automatic
- Screen reader optimized

### Framework
- React-only
- TypeScript support
- Tree-shakable
- Zero runtime (build-time)

---

**End of Reference**
