import { useEffect, useState } from 'react'
    import { supabase } from '../lib/supabaseClient'
    import { getSecurityClaims } from '../lib/authUtils'

    interface User {
      id: string
      email: string
      rol_inmobiliaria: string
      created_at: string
    }

    export default function UserList({ session }: { session: any }) {
      const [users, setUsers] = useState<User[]>([])
      const [loading, setLoading] = useState(true)
      const { id_inmobiliaria, rol_inmobiliaria } = getSecurityClaims(session)

      useEffect(() => {
        const fetchUsers = async () => {
          if (rol_inmobiliaria !== 'administrador') return

          const { data, error } = await supabase
            .from('usuarios')
            .select('id, email, rol_inmobiliaria, created_at')
            .eq('id_inmobiliaria', id_inmobiliaria)

          if (error) {
            console.error('Error fetching users:', error)
            return
          }

          setUsers(data || [])
          setLoading(false)
        }

        fetchUsers()
      }, [id_inmobiliaria, rol_inmobiliaria])

      if (rol_inmobiliaria !== 'administrador') return null

      return (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Usuarios de la Inmobiliaria</h3>
          {loading ? (
            <p>Cargando usuarios...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Rol</th>
                    <th className="px-4 py-2 text-left">Fecha de Creación</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2 capitalize">{user.rol_inmobiliaria}</td>
                      <td className="px-4 py-2">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )
    }
