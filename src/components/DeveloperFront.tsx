import { Session } from '@supabase/supabase-js'

    interface DeveloperFrontProps {
      session: Session
    }

    export default function DeveloperFront({ session }: DeveloperFrontProps) {
      return (
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">Panel de Desarrollador</h1>
          <div className="bg-white p-6 rounded-lg shadow">
            <p>Bienvenido, desarrollador. Tienes acceso completo al sistema.</p>
            {/* Aquí puedes agregar más funcionalidades específicas para desarrolladores */}
          </div>
        </div>
      )
    }
