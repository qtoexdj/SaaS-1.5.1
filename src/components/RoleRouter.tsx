import { Session } from '@supabase/supabase-js'
    import DeveloperFront from './DeveloperFront'
    import AdminFront from './AdminFront'
    import SellerFront from './SellerFront'
    import { getSecurityClaims } from '../lib/authUtils'

    interface RoleRouterProps {
      session: Session
    }

    export default function RoleRouter({ session }: RoleRouterProps) {
      const { rol_global, rol_inmobiliaria } = getSecurityClaims(session)

      if (rol_global === 'desarrollador') {
        return <DeveloperFront session={session} />
      }

      if (rol_global === 'normal' && rol_inmobiliaria === 'administrador') {
        return <AdminFront session={session} />
      }

      if (rol_global === 'normal' && rol_inmobiliaria === 'vendedor') {
        return <SellerFront session={session} />
      }

      return (
        <div className="p-8">
          <h1 className="text-2xl font-bold">Acceso no autorizado</h1>
          <p>No tienes permisos para acceder a esta sección.</p>
        </div>
      )
    }
