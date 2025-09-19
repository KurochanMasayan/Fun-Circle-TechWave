import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import LoadingScreen from '../components/LoadingScreen'
import Layout from '../components/Layout'

export default function ProtectedRoute() {
  const { session, loading, user, signOut } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  if (!session || !user) {
    return <Navigate to="/login" replace />
  }

  return (
    <Layout user={user} onSignOut={signOut}>
      <Outlet />
    </Layout>
  )
}