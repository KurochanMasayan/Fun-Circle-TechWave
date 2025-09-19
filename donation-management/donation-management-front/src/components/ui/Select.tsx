import type { ReactNode, SelectHTMLAttributes } from 'react'
import styles from './Select.module.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  fullWidth?: boolean
  children: ReactNode
}

export default function Select({ 
  label, 
  error, 
  fullWidth = false, 
  children,
  className = '', 
  id,
  ...props 
}: SelectProps) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div className={`${styles.selectWrapper} ${fullWidth ? styles.selectFullWidth : ''}`}>
      {label && (
        <label htmlFor={selectId} className={styles.selectLabel}>
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`${styles.select} ${error ? styles.selectError : ''} ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && (
        <span className={styles.selectErrorMessage}>{error}</span>
      )}
    </div>
  )
}