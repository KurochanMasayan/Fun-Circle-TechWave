// アプリケーション設定
export const APP_CONFIG = {
  name: '社内寄贈物管理システム',
  nameEn: 'Internal Donation Management System',
  version: '1.0.0',
} as const

// 認証関連の定数
export const AUTH_MESSAGES = {
  SIGN_UP_TITLE: '新規アカウントを作成',
  SIGN_IN_TITLE: 'アカウントにログイン',
  SIGN_UP_BUTTON: 'アカウントを作成',
  SIGN_IN_BUTTON: 'ログイン',
  SIGN_UP_LINK: '新規登録はこちら',
  SIGN_IN_LINK: 'すでにアカウントをお持ちの方はこちら',
  LOADING: '処理中...',
  EMAIL_SENT: '確認メールを送信しました。メールを確認してください。',
  REQUIRED_FIELDS: 'メールアドレスとパスワードを入力してください',
  GENERIC_ERROR: 'エラーが発生しました',
} as const

// ダッシュボードの定数
export const DASHBOARD_CONFIG = {
  title: '寄贈物管理ダッシュボード',
  welcomeTitle: 'ようこそ、社内寄贈物管理システムへ',
  welcomeDescription: 'このシステムを使用して、社内の書籍や備品の寄贈・共有を効率的に管理できます。',
  signOutButton: 'ログアウト',
  loadingText: '読み込み中...',
} as const

// クイックアクション
export const QUICK_ACTIONS = [
  { label: '寄贈物を登録', variant: 'primary' as const, action: 'register' },
  { label: '寄贈物一覧を見る', variant: 'secondary' as const, action: 'list' },
  { label: 'レポートを確認', variant: 'secondary' as const, action: 'report' },
] as const

// 環境変数の検証
export const ENV = {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL as string,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
} as const