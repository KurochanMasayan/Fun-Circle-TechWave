// 認証関連の型定義
export interface AuthError {
  message: string
  code?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

// ダッシュボード関連の型定義
export interface QuickAction {
  label: string
  variant: 'primary' | 'secondary' | 'danger'
  action: string
  icon?: string
}

// API レスポンスの型定義
export interface ApiResponse<T> {
  data?: T
  error?: AuthError
  status: 'success' | 'error' | 'loading'
}

// 寄贈物の型定義（将来使用）
export interface DonationItem {
  id: string
  title: string
  description: string
  category: 'book' | 'equipment' | 'other'
  donorId: string
  createdAt: Date
  status: 'available' | 'borrowed' | 'reserved'
}