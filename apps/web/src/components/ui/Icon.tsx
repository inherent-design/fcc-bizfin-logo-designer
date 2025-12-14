import type { ComponentProps } from 'react'
import {
  PaintBrushIcon,
  Squares2X2Icon,
  FolderIcon,
  HeartIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid'

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

export type IconName = keyof typeof icons

interface IconProps extends Omit<ComponentProps<'svg'>, 'children'> {
  name: IconName
}

export function Icon({ name, className, ...props }: IconProps) {
  const IconComponent = icons[name]
  return <IconComponent className={className} {...props} />
}
