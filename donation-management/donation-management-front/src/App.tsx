import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'
import AuthComponent from './components/Auth'
import DonationSearch from './components/DonationSearch'
import './App.css'

function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="App">
      {!session ? (
        <div className="auth-container">
          <h1>Donation Management System</h1>
          <AuthComponent />
        </div>
      ) : (
        <div className="dashboard">
          <header className="app-header">
            <div className="header-content">
              <h1>社内寄贈物管理システム</h1>
              <div className="user-info">
                <span>ログイン中: {session.user.email}</span>
                <button onClick={() => supabase.auth.signOut()} className="sign-out-btn">
                  ログアウト
                </button>
              </div>
            </div>
          </header>
          <main className="app-main">
            <DonationSearch />
          </main>
        </div>
      )}
    </div>
  )
}

export default App
