import { InputHTMLAttributes, forwardRef } from 'react'
import cn from 'classnames'

export const Input = forwardRef<HTMLInputElement,InputHTMLAttributes<HTMLInputElement>>(({ className, ...rest }, ref) => {
  return (
    <input
      {...rest}
      ref={ref}
      className={cn(
        className,
      )}
    />
  )
})
