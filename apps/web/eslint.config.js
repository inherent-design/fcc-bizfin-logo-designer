// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'

import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import path from 'path'
import tseslint from 'typescript-eslint'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended, // Shared TypeScript rules for all apps
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/.vite/**'],
    files: ['**/*.{ts,tsx,js,jsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
      },
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  ...storybook.configs['flat/recommended'],
]
