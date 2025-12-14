import type { ComponentProps } from 'react'
import { neoInput } from 'styled-system/recipes'

type InputProps = ComponentProps<'input'>

export function Input({ className, ...props }: InputProps) {
  return <input className={neoInput({ className })} {...props} />
}
