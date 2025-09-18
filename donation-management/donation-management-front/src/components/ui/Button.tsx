import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'google'
  size?: 'small' | 'medium' | 'large'
  icon?: ReactNode
  loading?: boolean
  fullWidth?: boolean
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'medium',
  icon,
  loading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: styles.btnPrimary,
    secondary: styles.btnSecondary,
    danger: styles.btnDanger,
    ghost: styles.btnGhost,
    google: styles.btnGoogle
  }

  const sizeClasses = {
    small: styles.btnSmall,
    medium: styles.btnMedium,
    large: styles.btnLarge
  }

  const classes = [
    styles.btn,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && styles.btnFullWidth,
    loading && styles.btnLoading,
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className={styles.btnSpinner} />
      ) : icon ? (
        <span className={styles.btnIcon}>{icon}</span>
      ) : null}
      <span>{loading ? '処理中...' : children}</span>
    </button>
  )
}