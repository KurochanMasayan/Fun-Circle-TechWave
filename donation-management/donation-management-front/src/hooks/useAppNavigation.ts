import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

/**
 * アプリケーション内のナビゲーション処理を統一化するカスタムフック
 */
export function useAppNavigation() {
  const navigate = useNavigate()

  const goToDashboard = useCallback(() => {
    navigate('/dashboard')
  }, [navigate])

  const goToItems = useCallback(() => {
    navigate('/items')
  }, [navigate])

  const goToItemRegister = useCallback(() => {
    navigate('/items/register')
  }, [navigate])

  const goToItemDetail = useCallback((itemId: number | string) => {
    navigate(`/items/${itemId}`)
  }, [navigate])

  const goToReports = useCallback(() => {
    navigate('/reports')
  }, [navigate])

  const goToAnalytics = useCallback(() => {
    navigate('/analytics')
  }, [navigate])

  const goToUsers = useCallback(() => {
    navigate('/users')
  }, [navigate])

  const goToDepartments = useCallback(() => {
    navigate('/departments')
  }, [navigate])

  const goToLogin = useCallback(() => {
    navigate('/login')
  }, [navigate])

  const goBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  return {
    goToDashboard,
    goToItems,
    goToItemRegister,
    goToItemDetail,
    goToReports,
    goToAnalytics,
    goToUsers,
    goToDepartments,
    goToLogin,
    goBack,
    // 汎用的なnavigation関数も露出
    navigate
  }
}