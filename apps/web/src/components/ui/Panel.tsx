import type { ComponentProps } from 'react'
import { neoPanel } from 'styled-system/recipes'

type PanelProps = ComponentProps<'div'>

export function Panel({ className, ...props }: PanelProps) {
  return <div className={neoPanel({ className })} {...props} />
}
