import { supabase } from './supabaseClient'

    interface SecurityClaims {
      id_inmobiliaria: string
      rol_global: string
      rol_inmobiliaria: string
    }

    export function getSecurityClaims(session: any): SecurityClaims {
      console.log('Token JWT completo:', session?.access_token) // Log del token JWT
      const claims = session?.user?.app_metadata?.security_claims || {
        id_inmobiliaria: '',
        rol_global: '',
        rol_inmobiliaria: ''
      }
      console.log('Claims del token:', claims)
      return claims
    }

    export async function getInmobiliariaData(id_inmobiliaria: string) {
      console.log('Consultando inmobiliaria con ID:', id_inmobiliaria)

      const { data, error } = await supabase
        .from('inmobiliaria')
        .select('*')
        .eq('id', id_inmobiliaria)
        .single()

      if (error) {
        console.error('Error en la consulta a Supabase:', {
          message: error.message,
          details: error.details,
          code: error.code,
          hint: error.hint
        })
        throw error
      }

      console.log('Datos de la inmobiliaria obtenidos:', data)
      return data
    }

    export function checkAdminAccess(rol_inmobiliaria: string): boolean {
      return rol_inmobiliaria === 'administrador'
    }
