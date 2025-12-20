// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import js from '@eslint/js'
import globals from 'globals'
import path from 'path'
import tseslint from 'typescript-eslint'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['**/dist/**', '**/node_modules/**'],
    files: ['{**,.}/*.{ts,tsx,js,jsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
    },
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
      },
      globals: globals.node,
    },
  },
]
