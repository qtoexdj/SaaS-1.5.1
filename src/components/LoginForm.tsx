import { useState } from 'react'
    import { supabase } from '../lib/supabaseClient'

    export default function LoginForm() {
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [error, setError] = useState<string | null>(null)

      const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          setError(error.message)
          return
        }

        // Redirect or update UI after successful login
        window.location.href = '/'
      }

      return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">Iniciar Sesión</h2>
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      )
    }
