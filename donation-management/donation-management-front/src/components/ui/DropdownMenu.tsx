import { useState, useRef, useEffect, createContext, useContext } from 'react'
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

interface DropdownContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  contentRef: React.RefObject<HTMLDivElement | null>
  triggerRef: React.RefObject<HTMLDivElement | null>
}

const DropdownContext = createContext<DropdownContextType | null>(null)

function useDropdownContext() {
  const context = useContext(DropdownContext)
  if (!context) {
    throw new Error('Dropdown components must be used within DropdownMenu')
  }
  return context
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as Node

      // Check if click is outside both trigger and content
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        contentRef.current && !contentRef.current.contains(target)
      ) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isOpen])

  const contextValue = {
    isOpen,
    setIsOpen,
    contentRef,
    triggerRef
  }

  return (
    <DropdownContext.Provider value={contextValue}>
      <div className={styles.dropdownMenu}>{children}</div>
    </DropdownContext.Provider>
  )
}

export function DropdownMenuTrigger({ children, asChild }: DropdownMenuTriggerProps) {
  const { isOpen, setIsOpen, triggerRef } = useDropdownContext()

  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  if (asChild && children) {
    // Clone the child element and add click handler and ref
    const child = children as React.ReactElement
    return (
      <div
        ref={triggerRef as React.RefObject<HTMLDivElement>}
        onClick={handleClick}
        className={styles.dropdownTrigger}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsOpen(!isOpen)
          }
        }}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {child}
      </div>
    )
  }

  return (
    <div
      ref={triggerRef as React.RefObject<HTMLDivElement>}
      onClick={handleClick}
      className={styles.dropdownTrigger}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setIsOpen(!isOpen)
        }
      }}
      aria-expanded={isOpen}
      aria-haspopup="menu"
    >
      {children}
    </div>
  )
}

export function DropdownMenuContent({
  children,
  className = '',
  align = 'start'
}: DropdownMenuContentProps) {
  const { isOpen, contentRef } = useDropdownContext()

  if (!isOpen) return null

  return (
    <div
      ref={contentRef}
      className={`${styles.dropdownContent} ${styles[`align-${align}`]} ${className}`}
      role="menu"
      aria-orientation="vertical"
    >
      {children}
    </div>
  )
}

export function DropdownMenuItem({ children, className = '', onClick }: DropdownMenuItemProps) {
  const { setIsOpen } = useDropdownContext()

  const handleClick = () => {
    onClick?.()
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      className={`${styles.dropdownItem} ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="menuitem"
      tabIndex={0}
    >
      {children}
    </div>
  )
}

export function DropdownMenuLabel({ children, className = '' }: DropdownMenuLabelProps) {
  return (
    <div className={`${styles.dropdownLabel} ${className}`} role="group" aria-label={typeof children === 'string' ? children : undefined}>
      {children}
    </div>
  )
}

export function DropdownMenuSeparator({ className = '' }: DropdownMenuSeparatorProps) {
  return <div className={`${styles.dropdownSeparator} ${className}`} role="separator" />
}