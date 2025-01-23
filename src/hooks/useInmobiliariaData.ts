import { useEffect, useState } from 'react'
    import { supabase } from '../lib/supabaseClient'
    import { getSecurityClaims } from '../lib/authUtils'

    export function useInmobiliariaData(session: any) {
      const [data, setData] = useState<any[]>([])
      const { id_inmobiliaria, rol_inmobiliaria } = getSecurityClaims(session)

      useEffect(() => {
        const fetchData = async () => {
          let query = supabase
            .from('propiedades')
            .select('*')

          if (rol_inmobiliaria !== 'administrador') {
            query = query.eq('inmobiliaria_id', id_inmobiliaria)
          }

          const { data, error } = await query

          if (error) {
            console.error('Error fetching data:', error)
            return
          }

          setData(data)
        }

        if (id_inmobiliaria) {
          fetchData()
        }
      }, [id_inmobiliaria, rol_inmobiliaria])

      return data
    }
