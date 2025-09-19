import type { ReactNode } from 'react'
import styles from './PageLayout.module.css'

interface PageLayoutProps {
  title: string
  description?: string
  headerAction?: ReactNode
  children: ReactNode
}

export default function PageLayout({
  title,
  description,
  headerAction,
  children
}: PageLayoutProps) {
  return (
    <div className={styles.pageLayout}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerInfo}>
            <h1 className={styles.title}>{title}</h1>
            {description && (
              <p className={styles.description}>{description}</p>
            )}
          </div>
          {headerAction && (
            <div className={styles.headerAction}>
              {headerAction}
            </div>
          )}
        </div>
      </header>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}