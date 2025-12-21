import { type ComponentProps, forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { switchRecipe } from './Switch.styles'

export type SwitchProps = Omit<ComponentProps<'input'>, 'type' | 'size'> & {
  label?: string
  helperText?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, helperText, size = 'md', className, ...props }, ref) => {
    const recipeStyles = switchRecipe({ size })

    return (
      <label className={cx(recipeStyles.container, className)}>
        <div className={recipeStyles.wrapper}>
          <input ref={ref} type="checkbox" role="switch" className={recipeStyles.input} {...props} />
          <div className={recipeStyles.track}>
            <div className={recipeStyles.thumb} />
          </div>
          {label && <span className={recipeStyles.label}>{label}</span>}
        </div>
        {helperText && <span className={recipeStyles.helper}>{helperText}</span>}
      </label>
    )
  }
)

Switch.displayName = 'Switch'
