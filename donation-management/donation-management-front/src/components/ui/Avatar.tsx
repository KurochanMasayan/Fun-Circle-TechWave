import type { ReactNode } from 'react'
import styles from './Avatar.module.css'

interface AvatarProps {
  className?: string
  children: ReactNode
}

interface AvatarImageProps {
  src: string
  alt: string
  className?: string
}

interface AvatarFallbackProps {
  children: ReactNode
  className?: string
}

export function Avatar({ className = '', children }: AvatarProps) {
  return (
    <div className={`${styles.avatar} ${className}`}>
      {children}
    </div>
  )
}

export function AvatarImage({ src, alt, className = '' }: AvatarImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`${styles.avatarImage} ${className}`}
    />
  )
}

export function AvatarFallback({ children, className = '' }: AvatarFallbackProps) {
  return (
    <div className={`${styles.avatarFallback} ${className}`}>
      {children}
    </div>
  )
}