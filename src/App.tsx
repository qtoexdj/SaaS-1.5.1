import { useState, useEffect } from 'react'
    import { supabase } from './lib/supabaseClient'
    import AuthWrapper from './components/AuthWrapper'
    import Header from './components/Header'
    import RoleRouter from './components/RoleRouter'

    export default function App() {
      const [session, setSession] = useState<any>(null)

      useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session)
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
        })

        return () => subscription.unsubscribe()
      }, [])

      return (
        <AuthWrapper>
          <div className="min-h-screen bg-gray-100">
            <Header />
            {session && <RoleRouter session={session} />}
          </div>
        </AuthWrapper>
      )
    }
