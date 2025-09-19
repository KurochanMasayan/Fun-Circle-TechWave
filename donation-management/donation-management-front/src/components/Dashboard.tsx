import Button from './ui/Button'
import { Card, CardContent } from './ui/Card'
import PageLayout from './PageLayout'
import styles from './Dashboard.module.css'

interface DashboardStats {
  totalItems: number
  availableItems: number
  inUseItems: number
  recentRegistrations: number
}

interface QuickAction {
  label: string
  variant: 'primary' | 'secondary'
  path: string
}

interface DashboardProps {
  stats: DashboardStats | null
  loading: boolean
  quickActions: readonly QuickAction[]
  onQuickAction: (path: string) => void
}

export default function Dashboard({
  stats,
  loading,
  quickActions,
  onQuickAction
}: DashboardProps) {

  return (
    <PageLayout
      title="ダッシュボード"
      description="システム概要と最新情報"
    >
      {/* TODO: ダッシュボード統計カードの実装 */}
      {stats && !loading && (
        <div className={styles.statsGrid}>
          <Card>
            <CardContent>
              <h3>総登録数</h3>
              <p className={styles.statNumber}>{stats.totalItems}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3>利用可能</h3>
              <p className={styles.statNumber}>{stats.availableItems}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3>使用中</h3>
              <p className={styles.statNumber}>{stats.inUseItems}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3>今月の新規登録</h3>
              <p className={styles.statNumber}>{stats.recentRegistrations}</p>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className={styles.welcomeCard}>
        <CardContent>
          <h2 className={styles.welcomeTitle}>
            ようこそ、社内寄贈物管理システムへ
          </h2>
          <p className={styles.welcomeDescription}>
            このシステムを使用して、社内の書籍や備品の寄贈・共有を効率的に管理できます。
          </p>

          <div className={styles.quickActions}>
            {quickActions.map((action) => (
              <Button
                key={action.path}
                variant={action.variant}
                size="medium"
                onClick={() => onQuickAction(action.path)}
                disabled={loading}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* TODO: 最近の活動フィードの実装 */}
      {/* TODO: 人気の寄贈物ランキングの実装 */}
      {/* TODO: お知らせ・アナウンスエリアの実装 */}
    </PageLayout>
  )
}