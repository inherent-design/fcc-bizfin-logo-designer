// ============================================================================
// IMPORTS
// ============================================================================

import type { ComponentProps } from 'react'

// Heroicons (16x16 | Solid)
import * as Hero from '@heroicons/react/16/solid'

// Panda CSS
import { cx } from 'styled-system/css'

// Component styles
import { iconRecipe, type IconVariantProps } from './Icon.styles'

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

/**
 * Type-safe icon mapping from Heroicons
 * Maps lowercase icon names to their Heroicon components
 */
export const icons = Object.keys(Hero).reduce<
  Record<string, React.ComponentType<React.ComponentProps<'svg'>>>
>((acc, key) => {
  const iconName = key.split('Icon')[0].toLowerCase()
  acc[iconName] = Hero[key as keyof typeof Hero] as React.ComponentType<React.ComponentProps<'svg'>>
  return acc
}, {})

/**
 * Available icon names
 */
export type IconName = keyof typeof icons

/**
 * Icon component props
 * Size prop accepts all size tokens - passed directly to recipe with no remapping
 */
type IconProps = ComponentProps<'svg'> &
  IconVariantProps & {
    /** Name of the icon to render */
    name: IconName
  }

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Icon - Wrapper component for Heroicons
 *
 * Features:
 * - Type-safe icon name selection
 * - Size variants: 3xs (8px) → 4xl (128px)
 * - Default size: md (32px) - optimized for UI controls
 * - Supports all SVG props
 * - CSS-based sizing (supports design token references)
 *
 * Size progression uses two-stage approach:
 * - Micro sizes (3xs→xs): Musical ratios for subtle transitions
 * - Structural sizes (xs→4xl): Harmonic multiples of 8px base
 *
 * Note: Width/height are set via CSS classes (iconRecipe), not SVG attributes.
 * This allows proper use of CSS custom properties from design tokens.
 * SVG attributes don't accept var() values, but CSS properties do.
 *
 * @example
 * ```tsx
 * <Icon name="swatch" size="md" />  // Default: 32px
 * <Icon name="close" size="sm" />   // Small: 24px
 * <Icon name="paintbrush" size="3xl" /> // Large: 96px
 * ```
 */
export function Icon({ name, size = 'md', className, ...props }: IconProps) {
  const IconComponent = icons[name]

  return <IconComponent className={cx(iconRecipe({ size }), className)} {...props} />
}
