import { useEffect, useState } from 'react'
    import { supabase } from '../lib/supabaseClient'
    import LoginForm from './LoginForm'

    export default function AuthWrapper({ children }: { children: React.ReactNode }) {
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

      if (!session) {
        return <LoginForm />
      }

      return <>{children}</>
    }
