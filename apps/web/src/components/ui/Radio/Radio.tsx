import { type ComponentProps, forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { radioRecipe } from './Radio.styles'

export type RadioProps = Omit<ComponentProps<'input'>, 'type' | 'size'> & {
  label?: string
  helperText?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, helperText, size = 'md', className, ...props }, ref) => {
    const recipeStyles = radioRecipe({ size })

    return (
      <label className={cx(recipeStyles.container, className)}>
        <div className={recipeStyles.wrapper}>
          <input ref={ref} type="radio" className={recipeStyles.input} {...props} />
          <div className={recipeStyles.circle}>
            <div className={recipeStyles.dot} />
          </div>
          {label && <span className={recipeStyles.label}>{label}</span>}
        </div>
        {helperText && <span className={recipeStyles.helper}>{helperText}</span>}
      </label>
    )
  }
)

Radio.displayName = 'Radio'
