import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    
    return (
      <div className={`${styles.inputWrapper} ${fullWidth ? styles.inputFullWidth : ''}`}>
        {label && (
          <label htmlFor={inputId} className={styles.inputLabel}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`${styles.input} ${error ? styles.inputError : ''} ${className}`}
          {...props}
        />
        {error && (
          <span className={styles.inputErrorMessage}>{error}</span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input