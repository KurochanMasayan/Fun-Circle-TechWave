import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import LoadingScreen from '../components/LoadingScreen'

export default function PublicRoute() {
  const { session, loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  if (session) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}