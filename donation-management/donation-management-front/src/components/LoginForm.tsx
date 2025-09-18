import type { FormEvent } from 'react'
import Button from './ui/Button'
import Input from './ui/Input'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from './ui/Card'
import styles from './Auth.module.css'

interface LoginFormProps {
  email: string
  password: string
  isSignUp: boolean
  loading: boolean
  message: string
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onSubmit: (e: FormEvent) => void
  onToggleMode: () => void
}

export default function LoginForm({
  email,
  password,
  isSignUp,
  loading,
  message,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onToggleMode,
}: LoginFormProps) {
  return (
    <div className={styles.simpleAuthContainer}>
      <Card variant="elevated" className={styles.authCardSimple}>
        <CardHeader>
          <CardTitle>社内寄贈物管理システム</CardTitle>
          <CardDescription>
            {isSignUp ? '新規アカウントを作成' : 'アカウントにログイン'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className={styles.authForm}>
            <Input
              type="email"
              label="メールアドレス"
              placeholder="your-email@company.com"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              fullWidth
              required
            />
            
            <Input
              type="password"
              label="パスワード"
              placeholder="••••••••"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              fullWidth
              required
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="large"
              loading={loading}
            >
              {isSignUp ? 'アカウントを作成' : 'ログイン'}
            </Button>
          </form>

          <div className={styles.authSwitch}>
            <Button
              variant="ghost"
              fullWidth
              onClick={onToggleMode}
            >
              {isSignUp ? 'すでにアカウントをお持ちの方はこちら' : '新規登録はこちら'}
            </Button>
          </div>

          {message && (
            <div className={`${styles.authMessage} ${message.includes('エラー') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}