import { useState } from 'react'
import type { FormEvent } from 'react'
import { supabase } from '../lib/supabase'
import LoginForm from '../components/LoginForm'

export default function AuthContainer() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      setMessage('メールアドレスとパスワードを入力してください')
      return
    }

    setLoading(true)
    setMessage('')
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        setMessage('確認メールを送信しました。メールを確認してください。')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'エラーが発生しました'
      setMessage(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleMode = () => {
    setIsSignUp(!isSignUp)
    setMessage('')
  }

  return (
    <LoginForm
      email={email}
      password={password}
      isSignUp={isSignUp}
      loading={loading}
      message={message}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
      onToggleMode={handleToggleMode}
    />
  )
}