import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Dashboard from '../components/Dashboard'

interface DashboardStats {
  totalItems: number
  availableItems: number
  inUseItems: number
  recentRegistrations: number
}

const QUICK_ACTIONS = [
  { label: '寄贈物を登録', variant: 'primary' as const, path: '/items/register' },
  { label: '寄贈物一覧を見る', variant: 'secondary' as const, path: '/items' },
  { label: 'レポートを確認', variant: 'secondary' as const, path: '/reports' },
] as const

export default function DashboardContainer() {
  const navigate = useNavigate()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  // TODO: 実際のAPIからダッシュボード統計データを取得
  useEffect(() => {
    const fetchDashboardStats = async () => {
      setLoading(true)
      try {
        // TODO: APIエンドポイント /api/dashboard/stats を実装
        // const response = await fetch('/api/dashboard/stats')
        // const stats = await response.json()

        // 仮のデータ
        await new Promise(resolve => setTimeout(resolve, 500))
        setStats({
          totalItems: 42,
          availableItems: 28,
          inUseItems: 12,
          recentRegistrations: 5
        })
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error)
        // TODO: エラーハンドリングとユーザー通知の実装
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardStats()
  }, [])

  const handleQuickAction = useCallback((path: string) => {
    // TODO: アナリティクス追跡の実装
    // analytics.track('dashboard_quick_action', { path })
    navigate(path)
  }, [navigate])

  return (
    <Dashboard
      stats={stats}
      loading={loading}
      quickActions={QUICK_ACTIONS}
      onQuickAction={handleQuickAction}
    />
  )
}