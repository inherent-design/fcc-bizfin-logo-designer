// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import type { ComponentProps } from 'react'
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HeartIcon,
  PaintBrushIcon,
  PlusIcon,
  Squares2X2Icon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid'

// Panda CSS
import { css, cx } from 'styled-system/css'

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

const icons = {
  palette: PaintBrushIcon,
  grid: Squares2X2Icon,
  folder: FolderIcon,
  heart: HeartIcon,
  download: ArrowDownTrayIcon,
  upload: ArrowUpTrayIcon,
  trash: TrashIcon,
  copy: DocumentDuplicateIcon,
  plus: PlusIcon,
  close: XMarkIcon,
} as const

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Available icon names
 */
export type IconName = keyof typeof icons

/**
 * Available icon sizes
 */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg'

/**
 * Icon component props
 */
interface IconProps extends Omit<ComponentProps<'svg'>, 'children'> {
  /** Name of the icon to render */
  name: IconName
  /** Size of the icon (default: md) */
  size?: IconSize
}

// ============================================================================
// STYLES
// ============================================================================

const iconSizeMap: Record<IconSize, string> = {
  xs: css({ width: 4, height: 4 }),
  sm: css({ width: 5, height: 5 }),
  md: css({ width: 6, height: 6 }),
  lg: css({ width: 8, height: 8 }),
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Icon - Wrapper component for Heroicons
 *
 * Features:
 * - Type-safe icon name selection
 * - Standardized size variants (xs, sm, md, lg)
 * - Supports all SVG props (className, etc.)
 * - Uses 24x24 solid icons from Heroicons
 *
 * @example
 * ```tsx
 * <Icon name="palette" size="md" />
 * <Icon name="close" size="sm" />
 * ```
 */
export function Icon({ name, size = 'md', className, ...props }: IconProps) {
  const IconComponent = icons[name]
  return <IconComponent className={cx(iconSizeMap[size], className)} {...props} />
}
