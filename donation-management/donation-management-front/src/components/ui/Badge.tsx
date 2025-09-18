import type { ReactNode } from 'react'
import styles from './Badge.module.css'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'small' | 'medium'
}

export default function Badge({ 
  children, 
  variant = 'default',
  size = 'medium'
}: BadgeProps) {
  const variantClasses = {
    default: styles.badgeDefault,
    primary: styles.badgePrimary,
    success: styles.badgeSuccess,
    warning: styles.badgeWarning,
    danger: styles.badgeDanger
  }

  const sizeClasses = {
    small: styles.badgeSmall,
    medium: styles.badgeMedium
  }

  return (
    <span className={`${styles.badge} ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </span>
  )
}