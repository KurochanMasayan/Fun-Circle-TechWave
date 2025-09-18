import type { AuthError } from '../types'

/**
 * エラーメッセージを取得する
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message)
  }
  return 'エラーが発生しました'
}

/**
 * 認証エラーかどうかを判定する
 */
export function isAuthError(error: unknown): error is AuthError {
  return (
    error !== null &&
    typeof error === 'object' &&
    'message' in error &&
    typeof (error as AuthError).message === 'string'
  )
}

/**
 * エラーをコンソールにログ出力する（開発環境のみ）
 */
export function logError(error: unknown, context?: string): void {
  if (import.meta.env.DEV) {
    console.error(`[${context || 'Error'}]:`, error)
  }
}