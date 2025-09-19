import { useState, useRef, useEffect } from 'react'
import type { ReactNode, MouseEvent } from 'react'
import styles from './DropdownMenu.module.css'

interface DropdownMenuProps {
  children: ReactNode
}

interface DropdownMenuTriggerProps {
  children: ReactNode
  asChild?: boolean
}

interface DropdownMenuContentProps {
  children: ReactNode
  className?: string
  align?: 'start' | 'end'
  forceMount?: boolean
}

interface DropdownMenuItemProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

interface DropdownMenuLabelProps {
  children: ReactNode
  className?: string
}

interface DropdownMenuSeparatorProps {
  className?: string
}

// Context for dropdown state
let dropdownContext: {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement>
} | null = null

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLElement>(null)

  dropdownContext = { isOpen, setIsOpen, triggerRef }

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return <div className={styles.dropdownMenu}>{children}</div>
}

export function DropdownMenuTrigger({ children, asChild }: DropdownMenuTriggerProps) {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    dropdownContext?.setIsOpen(!dropdownContext.isOpen)
  }

  if (asChild && children) {
    // Clone the child element and add click handler
    const child = children as React.ReactElement
    return (
      <div
        ref={dropdownContext?.triggerRef}
        onClick={handleClick}
        className={styles.dropdownTrigger}
      >
        {child}
      </div>
    )
  }

  return (
    <button
      ref={dropdownContext?.triggerRef}
      onClick={handleClick}
      className={styles.dropdownTrigger}
    >
      {children}
    </button>
  )
}

export function DropdownMenuContent({
  children,
  className = '',
  align = 'start'
}: DropdownMenuContentProps) {
  if (!dropdownContext?.isOpen) return null

  return (
    <div className={`${styles.dropdownContent} ${styles[`align-${align}`]} ${className}`}>
      {children}
    </div>
  )
}

export function DropdownMenuItem({ children, className = '', onClick }: DropdownMenuItemProps) {
  const handleClick = () => {
    onClick?.()
    dropdownContext?.setIsOpen(false)
  }

  return (
    <div className={`${styles.dropdownItem} ${className}`} onClick={handleClick}>
      {children}
    </div>
  )
}

export function DropdownMenuLabel({ children, className = '' }: DropdownMenuLabelProps) {
  return (
    <div className={`${styles.dropdownLabel} ${className}`}>
      {children}
    </div>
  )
}

export function DropdownMenuSeparator({ className = '' }: DropdownMenuSeparatorProps) {
  return <div className={`${styles.dropdownSeparator} ${className}`} />
}