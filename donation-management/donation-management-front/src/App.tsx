import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'
import AuthComponent from './components/Auth'
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
          <h1>Welcome to Donation Management</h1>
          <p>Logged in as: {session.user.email}</p>
          <button onClick={() => supabase.auth.signOut()}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}

export default App
