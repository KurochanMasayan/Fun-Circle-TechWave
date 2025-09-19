import { useLocation, Link } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'
import Button from './ui/Button'
import { Avatar, AvatarFallback } from './ui/Avatar'
import Badge from './ui/Badge'
import {
  HomeIcon,
  PackageIcon,
  BarChart3Icon,
  UsersIcon,
  SettingsIcon,
  BuildingIcon
} from './ui/Icons'
import styles from './Sidebar.module.css'

interface SidebarProps {
  user: User
  isOpen: boolean
  onClose: () => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

interface NavItem {
  path: string
  label: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  badge?: string | number
  disabled?: boolean
}

interface NavSection {
  title: string
  items: NavItem[]
}

const navigationSections: NavSection[] = [
  {
    title: 'メイン',
    items: [
      {
        path: '/dashboard',
        label: 'ダッシュボード',
        icon: HomeIcon
      },
      {
        path: '/items',
        label: '寄贈物一覧',
        icon: PackageIcon,
        badge: 42 // TODO: 動的な件数表示
      },
      {
        path: '/items/register',
        label: '新規登録',
        icon: PackageIcon
      }
    ]
  },
  {
    title: '分析・レポート',
    items: [
      {
        path: '/reports',
        label: 'レポート',
        icon: BarChart3Icon
      },
      {
        path: '/analytics', // TODO: ページの実装
        label: '利用統計',
        icon: BarChart3Icon,
        disabled: true
      }
    ]
  },
  {
    title: '管理', // TODO: 管理者権限チェック
    items: [
      {
        path: '/users', // TODO: ページの実装
        label: 'ユーザー管理',
        icon: UsersIcon,
        disabled: true
      },
      {
        path: '/departments', // TODO: ページの実装
        label: '部署管理',
        icon: BuildingIcon,
        disabled: true
      }
    ]
  }
]

export default function Sidebar({
  user,
  isOpen,
  onClose,
  isCollapsed = false,
  onToggleCollapse: _onToggleCollapse
}: SidebarProps) {
  const location = useLocation()

  const getUserName = () => {
    return user.email?.split('@')[0] || '不明'
  }

  const getUserInitials = () => {
    const name = getUserName()
    return name.slice(0, 2).toUpperCase()
  }

  const isActivePath = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard'
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className={`
        ${styles.sidebar}
        ${isOpen ? styles.sidebarOpen : ''}
        ${isCollapsed ? styles.sidebarCollapsed : ''}
      `}>
        <div className={styles.sidebarContent}>
          {/* Logo Section */}
          <div className={styles.logoSection}>
            <Link to="/dashboard" className={styles.logo} onClick={onClose}>
              <PackageIcon size={24} className={styles.logoIcon} />
              <div>
                <h2 className={styles.logoText}>寄贈物管理</h2>
                <p className={styles.logoSubtext}>Fun Circle TechWave</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className={styles.navigation}>
            {navigationSections.map((section) => (
              <div key={section.title} className={styles.navSection}>
                <h3 className={styles.navSectionTitle}>{section.title}</h3>
                <ul className={styles.navList}>
                  {section.items.map((item) => {
                    const Icon = item.icon
                    const isActive = isActivePath(item.path)

                    return (
                      <li key={item.path} className={styles.navItem}>
                        {item.disabled ? (
                          <div
                            className={`${styles.navLink} ${styles.navLinkDisabled}`}
                          >
                            <Icon size={20} className={styles.navIcon} />
                            <span className={styles.navText}>{item.label}</span>
                            {item.badge && (
                              <Badge variant="secondary" className={styles.navBadge}>
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <Link
                            to={item.path}
                            className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                            onClick={onClose}
                          >
                            <Icon size={20} className={styles.navIcon} />
                            <span className={styles.navText}>{item.label}</span>
                            {item.badge && (
                              <Badge variant="secondary" className={styles.navBadge}>
                                {item.badge}
                              </Badge>
                            )}
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>

          {/* Footer Section */}
          <div className={styles.footerSection}>
            <div className={styles.userInfo}>
              <Avatar className={styles.userAvatar}>
                <AvatarFallback>
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div className={styles.userDetails}>
                <p className={styles.userName}>{getUserName()}</p>
                <p className={styles.userEmail}>{user.email}</p>
              </div>
              {/* TODO: 設定ページへのリンク実装 */}
              <Button
                variant="ghost"
                size="small"
                className={styles.settingsButton}
                onClick={() => {
                  // TODO: Handle settings click
                  // console.log('Settings clicked')
                }}
              >
                <SettingsIcon size={16} />
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}