import { useLocation } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'
import Button from './ui/Button'
import Input from './ui/Input'
import { Avatar, AvatarFallback } from './ui/Avatar'
import Badge from './ui/Badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/DropdownMenu'
import { SearchIcon, MenuIcon, BellIcon, SettingsIcon, UserIcon, LogOutIcon, HelpCircleIcon, PlusIcon } from './ui/Icons'
import styles from './Header.module.css'

interface HeaderProps {
  user: User
  onMenuClick: () => void
  onSignOut: () => Promise<void>
}

export default function Header({ user, onMenuClick, onSignOut }: HeaderProps) {
  const location = useLocation()

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
      case '/dashboard':
        return { title: 'ダッシュボード', subtitle: 'システム概要と最新情報' }
      case '/items':
        return { title: '寄贈物一覧', subtitle: '登録されている寄贈物の管理' }
      case '/items/register':
        return { title: '寄贈物登録', subtitle: '新しい寄贈物を登録' }
      case '/reports':
        return { title: 'レポート・分析', subtitle: '寄贈物の利用状況と統計情報' }
      default:
        return { title: '社内寄贈物管理システム', subtitle: '' }
    }
  }

  const { title, subtitle } = getPageTitle()

  const getUserName = () => {
    return user.email?.split('@')[0] || '不明'
  }

  const getUserInitials = () => {
    const name = getUserName()
    return name.slice(0, 2).toUpperCase()
  }

  const handleSignOut = async () => {
    try {
      await onSignOut()
    } catch (error) {
      console.error('ログアウトに失敗しました:', error)
      // TODO: ユーザーにエラーメッセージを表示
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <div className={styles.leftSection}>
            <Button variant="ghost" size="small" className={styles.menuButton} onClick={onMenuClick}>
              <MenuIcon size={20} />
              <span className="sr-only">メニューを開く</span>
            </Button>

            <div className={styles.titleSection}>
              <h1 className={styles.title}>{title}</h1>
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
          </div>

          {/* TODO: 検索機能の実装 */}
          <div className={styles.searchSection}>
            <div className={styles.searchBox}>
              <SearchIcon size={16} className={styles.searchIcon} />
              <Input
                placeholder="検索機能は準備中です..."
                className={`${styles.searchInput} ${styles.disabledInput}`}
                disabled
                // TODO: onChange, onSubmit handlers
              />
            </div>
          </div>

          <div className={styles.rightSection}>
            {/* TODO: 新規登録ボタンのドロップダウン機能 */}
            <Button
              size="small"
              className={styles.quickAction}
              onClick={() => window.location.href = '/items/register'}
            >
              <PlusIcon size={16} />
              寄贈物登録
            </Button>

            {/* TODO: 実際の通知システムの実装 */}
            <Button
              variant="ghost"
              size="small"
              className={`${styles.notificationButton} ${styles.disabledButton}`}
              disabled
              title="通知機能は準備中です"
            >
              <BellIcon size={20} />
              <Badge variant="secondary" className={styles.notificationBadge}>
                0
              </Badge>
              <span className="sr-only">通知（準備中）</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={styles.userButton}>
                  <Avatar className={styles.avatar}>
                    <AvatarFallback className={styles.avatarFallback}>
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={styles.userMenu} align="end" forceMount>
                <DropdownMenuLabel className={styles.userInfo}>
                  <div className={styles.userDetails}>
                    <p className={styles.userName}>{getUserName()}</p>
                    <p className={styles.userEmail}>{user.email}</p>
                    <Badge variant="secondary" className={styles.departmentBadge}>
                      開発部
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* TODO: プロフィールページの実装 */}
                <DropdownMenuItem className={styles.disabledMenuItem}>
                  <UserIcon size={16} />
                  <span>プロフィール（準備中）</span>
                </DropdownMenuItem>
                {/* TODO: 設定ページの実装 */}
                <DropdownMenuItem className={styles.disabledMenuItem}>
                  <SettingsIcon size={16} />
                  <span>設定（準備中）</span>
                </DropdownMenuItem>
                {/* TODO: ヘルプ・ドキュメントページの実装 */}
                <DropdownMenuItem className={styles.disabledMenuItem}>
                  <HelpCircleIcon size={16} />
                  <span>ヘルプ（準備中）</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className={styles.logoutItem} onClick={handleSignOut}>
                  <LogOutIcon size={16} />
                  <span>ログアウト</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className={styles.mobileSearchSection}>
          <div className={styles.mobileSearchBox}>
            <SearchIcon size={16} className={styles.searchIcon} />
            <Input
              placeholder="検索機能は準備中です..."
              className={`${styles.searchInput} ${styles.disabledInput}`}
              disabled
            />
          </div>
        </div>
      </div>
    </header>
  )
}