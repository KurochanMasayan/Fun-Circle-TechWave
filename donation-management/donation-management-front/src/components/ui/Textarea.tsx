import { forwardRef } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import styles from './Textarea.module.css'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  fullWidth?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, fullWidth = false, className = '', id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
    
    return (
      <div className={`${styles.textareaWrapper} ${fullWidth ? styles.textareaFullWidth : ''}`}>
        {label && (
          <label htmlFor={textareaId} className={styles.textareaLabel}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`${styles.textarea} ${error ? styles.textareaError : ''} ${className}`}
          {...props}
        />
        {error && (
          <span className={styles.textareaErrorMessage}>{error}</span>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea