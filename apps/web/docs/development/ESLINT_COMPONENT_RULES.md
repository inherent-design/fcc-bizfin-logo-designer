# ESLint Configuration for Component Template

This document provides recommended ESLint rules to enforce the component template structure.

## Installation

```bash
npm install --save-dev \
  eslint-plugin-import \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser
```

## ESLint Configuration

Add to your `.eslintrc.json` or `eslint.config.js`:

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "plugins": ["@typescript-eslint", "react", "react-hooks", "import"],
  "rules": {
    // ========================================================================
    // IMPORT ORGANIZATION
    // ========================================================================

    "import/order": [
      "error",
      {
        "groups": [["builtin", "external"], "internal", ["parent", "sibling"], "index", "type"],
        "pathGroups": [
          {
            "pattern": "react",
            "group": "external",
            "position": "before"
          },
          {
            "pattern": "react-**",
            "group": "external",
            "position": "before"
          },
          {
            "pattern": "styled-system/**",
            "group": "external",
            "position": "after"
          },
          {
            "pattern": "@/schemas/**",
            "group": "internal",
            "position": "before"
          },
          {
            "pattern": "@/utils/**",
            "group": "internal",
            "position": "after"
          },
          {
            "pattern": "@/components/**",
            "group": "internal",
            "position": "after"
          }
        ],
        "pathGroupsExcludedImportTypes": ["react"],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ],

    "import/newline-after-import": ["error", { "count": 1 }],
    "import/no-duplicates": "error",

    // ========================================================================
    // COMPONENT STRUCTURE
    // ========================================================================

    "react/jsx-max-depth": ["warn", { "max": 5 }],
    "max-lines-per-function": [
      "warn",
      {
        "max": 100,
        "skipBlankLines": true,
        "skipComments": true,
        "IIFEs": true
      }
    ],
    "max-lines": [
      "warn",
      {
        "max": 600,
        "skipBlankLines": true,
        "skipComments": true
      }
    ],

    // ========================================================================
    // REACT BEST PRACTICES
    // ========================================================================

    "react/function-component-definition": [
      "error",
      {
        "namedComponents": "function-declaration",
        "unnamedComponents": "arrow-function"
      }
    ],
    "react/jsx-sort-props": [
      "warn",
      {
        "callbacksLast": true,
        "shorthandFirst": true,
        "ignoreCase": true,
        "reservedFirst": true
      }
    ],
    "react/self-closing-comp": [
      "error",
      {
        "component": true,
        "html": true
      }
    ],

    // ========================================================================
    // TYPESCRIPT
    // ========================================================================

    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        "prefer": "type-imports",
        "fixStyle": "separate-type-imports"
      }
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "custom": {
          "regex": "^I[A-Z]",
          "match": false
        }
      },
      {
        "selector": "typeAlias",
        "format": ["PascalCase"]
      }
    ],

    // ========================================================================
    // CODE QUALITY
    // ========================================================================

    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "prefer-const": "error",
    "no-var": "error",
    "object-shorthand": ["error", "always"],
    "prefer-arrow-callback": "error",
    "prefer-template": "error"
  }
}
```

## Flat Config (eslint.config.js) for ESLint 9+

```javascript
import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import importPlugin from 'eslint-plugin-import'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react: react,
      'react-hooks': reactHooks,
      import: importPlugin,
    },
    rules: {
      // Same rules as above
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling'], 'index', 'type'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'styled-system/**',
              group: 'external',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      // ... rest of rules
    },
  },
]
```

## Prettier Configuration

`.prettierrc.json`:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always",
  "endOfLine": "lf",
  "bracketSpacing": true,
  "jsxSingleQuote": false,
  "proseWrap": "always"
}
```

## VS Code Settings

`.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "javascript.preferences.importModuleSpecifier": "non-relative"
}
```

## Custom ESLint Plugin (Advanced)

For enforcing section order, you can create a custom ESLint rule:

```javascript
// eslint-plugin-component-structure/index.js
module.exports = {
  rules: {
    'section-order': {
      meta: {
        type: 'layout',
        docs: {
          description: 'Enforce component section order',
          category: 'Stylistic Issues',
        },
        fixable: null,
        schema: [],
      },
      create(context) {
        const sections = [
          'IMPORTS',
          'TYPES & INTERFACES',
          'CONSTANTS',
          'STYLES',
          'UTILITY FUNCTIONS',
          'SUB-COMPONENTS',
          'MAIN COMPONENT',
          'EXPORTS',
        ]

        let lastSectionIndex = -1

        return {
          Program(node) {
            const comments = context.getSourceCode().getAllComments()

            comments.forEach((comment) => {
              const match = comment.value.match(/^\s*={10,}\s*$/)
              if (match) {
                const nextComment = comments[comments.indexOf(comment) + 1]
                if (nextComment) {
                  const sectionName = nextComment.value.trim()
                  const sectionIndex = sections.indexOf(sectionName)

                  if (sectionIndex !== -1) {
                    if (sectionIndex < lastSectionIndex) {
                      context.report({
                        node: comment,
                        message: `Section "${sectionName}" is out of order. Expected after "${sections[lastSectionIndex]}"`,
                      })
                    }
                    lastSectionIndex = sectionIndex
                  }
                }
              }
            })
          },
        }
      },
    },
  },
}
```

Usage:

```json
{
  "plugins": ["component-structure"],
  "rules": {
    "component-structure/section-order": "error"
  }
}
```

## Pre-commit Hook

Using Husky:

```bash
npm install --save-dev husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

`package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

## Validation Script

Add to `package.json`:

```json
{
  "scripts": {
    "lint": "eslint 'src/**/*.{ts,tsx}'",
    "lint:fix": "eslint 'src/**/*.{ts,tsx}' --fix",
    "format": "prettier --write 'src/**/*.{ts,tsx}'",
    "typecheck": "tsc --noEmit",
    "validate": "npm run typecheck && npm run lint && npm run format"
  }
}
```

## Rule Explanations

### Import Order

- **Groups**: External dependencies first, then internal, then types
- **Path Groups**: React always first, Panda CSS after other externals
- **Alphabetize**: Easier to find imports
- **Newlines between**: Visual separation between groups

### Component Structure

- **max-lines-per-function**: Encourages extracting sub-components
- **max-lines**: Encourages splitting large files
- **jsx-max-depth**: Prevents overly nested JSX

### React Best Practices

- **function-component-definition**: Consistency in component declarations
- **jsx-sort-props**: Easier to find props
- **self-closing-comp**: Cleaner JSX

### TypeScript

- **consistent-type-imports**: Separates types from values
- **naming-convention**: No "I" prefix for interfaces (modern convention)

## CI/CD Integration

GitHub Actions workflow:

```yaml
name: Lint

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
```

## Recommended VS Code Extensions

Add to `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "maptz.regionfolder",
    "styled-components.vscode-styled-components"
  ]
}
```

## Ignore Patterns

`.eslintignore`:

```
node_modules/
dist/
build/
coverage/
.next/
*.config.js
styled-system/
```

## Troubleshooting

### Import order not auto-fixing

Make sure VS Code settings include:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

### Prettier conflicts with ESLint

Install `eslint-config-prettier`:

```bash
npm install --save-dev eslint-config-prettier
```

Add to `.eslintrc.json`:

```json
{
  "extends": [
    // ... other extends
    "prettier"
  ]
}
```

---

**Last updated**: 2025-12-15
