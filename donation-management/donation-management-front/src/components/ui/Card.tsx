import type { ReactNode } from 'react'
import styles from './Card.module.css'

interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'bordered'
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

interface CardTitleProps {
  children: ReactNode
  className?: string
}

interface CardDescriptionProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '', variant = 'default' }: CardProps) {
  const variantClasses = {
    default: styles.cardDefault,
    elevated: styles.cardElevated,
    bordered: styles.cardBordered
  }

  return (
    <div className={`${styles.card} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`${styles.cardHeader} ${className}`}>
      {children}
    </div>
  )
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`${styles.cardContent} ${className}`}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h2 className={`${styles.cardTitle} ${className}`}>
      {children}
    </h2>
  )
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return (
    <p className={`${styles.cardDescription} ${className}`}>
      {children}
    </p>
  )
}