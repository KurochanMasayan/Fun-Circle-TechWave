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

// 寄贈物の型定義
export interface DonationItem {
  id: number
  name: string
  category: ItemCategory
  donor: string
  department: string
  status: ItemStatus
  location: string
  addedDate: string
  condition: ItemCondition
  modelNumber?: string
  manufacturer?: string
  acquisitionPrice?: number
  quantity?: number
  description?: string
}

// TODO: カテゴリの動的管理とマスタデータ化
export type ItemCategory = '書籍' | '備品' | '電子機器' | '家具' | 'その他'
// TODO: ステータス管理の動的化とワークフロー対応
export type ItemStatus = '利用可能' | '使用中' | '廃棄予定'
// TODO: コンディション評価の詳細化と写真添付対応
export type ItemCondition = '優良' | '良好' | '普通' | '要修理'

// フォームデータの型定義
export interface ItemFormData {
  itemName: string
  category: string
  modelNumber: string
  manufacturer: string
  acquisitionDate: string
  acquisitionPrice: string
  condition: string
  location: string
  quantity: string
  description: string
}

// レポート関連の型定義
export interface DepartmentStats {
  name: string
  donations: number
  usage: number
}

export interface CategoryStats {
  name: string
  count: number
  percentage: number
}

export interface MonthlyTrend {
  month: string
  donations: number
  usage: number
}

export interface ReportsStats {
  totalItems: number
  totalUsers: number
  activeItems: number
  monthlyDonations: number
}

export interface PopularItem {
  name: string
  category: string
  count: number
}