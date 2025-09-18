import type { User } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom'
import Button from './ui/Button'
import { Card, CardContent } from './ui/Card'
import styles from './Dashboard.module.css'

interface DashboardProps {
  user: User
  onSignOut: () => void
}

const QUICK_ACTIONS = [
  { label: '寄贈物を登録', variant: 'primary' as const, path: '/items/register' },
  { label: '寄贈物一覧を見る', variant: 'secondary' as const, path: '/items' },
  { label: 'レポートを確認', variant: 'secondary' as const, path: '/reports' },
] as const

export default function Dashboard({ user, onSignOut }: DashboardProps) {
  const navigate = useNavigate()
  
  const handleAction = (path: string) => {
    navigate(path)
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>寄贈物管理ダッシュボード</h1>
        <div className={styles.userInfo}>
          <span className={styles.userEmail}>{user.email}</span>
          <Button
            variant="danger"
            size="small"
            onClick={onSignOut}
          >
            ログアウト
          </Button>
        </div>
      </header>
      
      <main className={styles.dashboardContent}>
        <Card className={styles.welcomeCard}>
          <CardContent>
            <h2 className={styles.welcomeTitle}>
              ようこそ、社内寄贈物管理システムへ
            </h2>
            <p className={styles.welcomeDescription}>
              このシステムを使用して、社内の書籍や備品の寄贈・共有を効率的に管理できます。
            </p>
            
            <div className={styles.quickActions}>
              {QUICK_ACTIONS.map((action) => (
                <Button
                  key={action.path}
                  variant={action.variant}
                  size="medium"
                  onClick={() => handleAction(action.path)}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}