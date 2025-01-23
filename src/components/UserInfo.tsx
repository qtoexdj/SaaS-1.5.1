import { Session } from '@supabase/supabase-js'
    import { getSecurityClaims, getInmobiliariaData, checkAdminAccess } from '../lib/authUtils'
    import { useEffect, useState } from 'react'

    export default function UserInfo({ session }: { session: Session }) {
      const [inmobiliaria, setInmobiliaria] = useState<any>(null)
      const { id_inmobiliaria, rol_global, rol_inmobiliaria } = getSecurityClaims(session)

      useEffect(() => {
        const fetchInmobiliaria = async () => {
          try {
            const data = await getInmobiliariaData(id_inmobiliaria)
            setInmobiliaria(data)
          } catch (error) {
            console.error('Error fetching inmobiliaria:', error)
          }
        }

        if (id_inmobiliaria) {
          fetchInmobiliaria()
        }
      }, [id_inmobiliaria])

      return (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Información del Usuario</h2>
          <div className="space-y-2">
            <p><strong>Email:</strong> {session.user.email}</p>
            <p><strong>Rol Global:</strong> {rol_global}</p>
            <p><strong>Rol Inmobiliaria:</strong> {rol_inmobiliaria}</p>

            {inmobiliaria && (
              <>
                <h3 className="text-xl font-bold mt-4 mb-2">Inmobiliaria</h3>
                <p><strong>Nombre:</strong> {inmobiliaria.nombre}</p>
                <p><strong>Dirección:</strong> {inmobiliaria.direccion}</p>
                <p><strong>Teléfono:</strong> {inmobiliaria.telefono}</p>
              </>
            )}

            {checkAdminAccess(rol_inmobiliaria) && (
              <div className="mt-4 p-4 bg-green-100 rounded">
                <p className="font-bold">Tienes acceso de administrador a esta inmobiliaria</p>
              </div>
            )}
          </div>
        </div>
      )
    }
