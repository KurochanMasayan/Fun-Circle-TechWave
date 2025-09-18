import type { RouteObject } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import AuthContainer from '../containers/AuthContainer'
import DashboardContainer from '../containers/DashboardContainer'
import { useAuth } from '../hooks/useAuth'

// ページコンポーネント（将来追加）
const ItemsPage = () => <div>寄贈物一覧</div>
const RegisterPage = () => <div>寄贈物登録</div>
const ReportsPage = () => <div>レポート</div>
const NotFound = () => <div>404 - ページが見つかりません</div>

// Dashboardページのラッパー
function DashboardPage() {
  const { user, signOut } = useAuth()
  if (!user) return null
  return <DashboardContainer user={user} onSignOut={signOut} />
}

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
      {
        path: 'items',
        element: <ItemsPage />
      },
      {
        path: 'items/register',
        element: <RegisterPage />
      },
      {
        path: 'reports',
        element: <ReportsPage />
      }
    ]
  },
  {
    path: '/login',
    element: <PublicRoute />,
    children: [
      {
        index: true,
        element: <AuthContainer />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]