import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/shared/api/supabase'

export function HomePage() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="home-page">
      <h1>Welcome to Donation Management</h1>
      <p>Logged in as: {session?.user.email}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}