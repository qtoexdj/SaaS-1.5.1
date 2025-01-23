import { Session } from '@supabase/supabase-js'
    import UserList from './UserList'
    import { getSecurityClaims, getInmobiliariaData } from '../lib/authUtils'
    import { useEffect, useState } from 'react'

    interface AdminFrontProps {
      session: Session
    }

    export default function AdminFront({ session }: AdminFrontProps) {
      const [inmobiliaria, setInmobiliaria] = useState<any>(null)
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState<string | null>(null)
      const { id_inmobiliaria } = getSecurityClaims(session)

      useEffect(() => {
        console.log('ID Inmobiliaria desde el token:', id_inmobiliaria) // Depuración

        const fetchInmobiliaria = async () => {
          try {
            const data = await getInmobiliariaData(id_inmobiliaria)
            console.log('Datos de la inmobiliaria:', data) // Depuración
            setInmobiliaria(data)
          } catch (error) {
            console.error('Error fetching inmobiliaria:', error) // Depuración
            setError('No se pudo cargar la información de la inmobiliaria. Verifica la consola para más detalles.')
          } finally {
            setLoading(false)
          }
        }

        if (id_inmobiliaria) {
          fetchInmobiliaria()
        } else {
          setError('No se encontró el ID de la inmobiliaria en el token.')
          setLoading(false)
        }
      }, [id_inmobiliaria])

      if (loading) {
        return <div className="p-8">Cargando información de la inmobiliaria...</div>
      }

      if (error) {
        return <div className="p-8 text-red-600">{error}</div>
      }

      return (
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">Panel de Administrador</h1>
          <div className="mb-6 p-4 bg-blue-100 rounded-lg">
            <h2 className="text-xl font-semibold">Inmobiliaria: {inmobiliaria.nombre}</h2>
            <p className="text-gray-700">{inmobiliaria.direccion}</p>
            <p className="text-gray-700">{inmobiliaria.telefono}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p>Bienvenido, administrador. Aquí puedes gestionar tu inmobiliaria.</p>
            <UserList session={session} />
          </div>
        </div>
      )
    }
