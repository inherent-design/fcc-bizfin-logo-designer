import { type ComponentProps, forwardRef } from 'react'
import { cx } from 'styled-system/css'
import { checkboxRecipe } from './Checkbox.styles'

export type CheckboxProps = Omit<ComponentProps<'input'>, 'type' | 'size'> & {
  label?: string
  helperText?: string
  indeterminate?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, helperText, indeterminate, size = 'md', className, ...props }, ref) => {
    const recipeStyles = checkboxRecipe({ size })

    return (
      <label className={cx(recipeStyles.container, className)}>
        <div className={recipeStyles.wrapper}>
          <input
            ref={ref}
            type="checkbox"
            className={recipeStyles.input}
            {...(indeterminate ? { 'data-indeterminate': 'true' } : {})}
            {...props}
          />
          <div className={recipeStyles.box}>
            <svg
              className={recipeStyles.check}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {indeterminate ? (
                <line x1="4" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="2" />
              ) : (
                <polyline points="3,8 7,12 13,4" stroke="currentColor" strokeWidth="2" />
              )}
            </svg>
          </div>
          {label && <span className={recipeStyles.label}>{label}</span>}
        </div>
        {helperText && <span className={recipeStyles.helper}>{helperText}</span>}
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'
