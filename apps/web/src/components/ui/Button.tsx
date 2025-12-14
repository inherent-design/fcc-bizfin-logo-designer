import type { ComponentProps } from 'react'
import { cx } from 'styled-system/css'
import { neoButton, type NeoButtonVariantProps } from 'styled-system/recipes'

interface ButtonProps extends ComponentProps<'button'>, NeoButtonVariantProps {}

export function Button(props: ButtonProps) {
  const [variantProps, restProps] = neoButton.splitVariantProps(props)
  const { className, ...htmlProps } = restProps

  return <button className={cx(neoButton(variantProps), className)} {...htmlProps} />
}
