import type { User } from '@supabase/supabase-js'
import Dashboard from '../components/Dashboard'

interface DashboardContainerProps {
  user: User
  onSignOut: () => void
}

export default function DashboardContainer({ user, onSignOut }: DashboardContainerProps) {
  // 将来的にここにダッシュボードのビジネスロジックを追加
  // 例: データフェッチ、状態管理、イベントハンドリングなど
  
  return <Dashboard user={user} onSignOut={onSignOut} />
}