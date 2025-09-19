import { useState } from 'react'
import type { ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import Header from './Header'
import Sidebar from './Sidebar'
import styles from './Layout.module.css'

interface LayoutProps {
  user: User
  onSignOut: () => void
  children: ReactNode
}

export default function Layout({ user, onSignOut, children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleSidebarClose = () => {
    setIsSidebarOpen(false)
  }

  const handleToggleCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  // TODO: ユーザー設定に基づくサイドバー状態の永続化
  // TODO: キーボードショートカットの実装 (Cmd+K など)
  // TODO: ブレッドクラムの実装

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <Sidebar
        user={user}
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />

      {/* Main content area */}
      <div className={`
        ${styles.main}
        ${isSidebarCollapsed ? styles.mainCollapsed : ''}
      `}>
        {/* Header */}
        <Header
          user={user}
          onMenuClick={handleMenuClick}
          onSignOut={onSignOut}
        />

        {/* Page content */}
        <main className={styles.content}>
          <div className={styles.contentInner}>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}