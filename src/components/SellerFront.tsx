import { Session } from '@supabase/supabase-js'

    interface SellerFrontProps {
      session: Session
    }

    export default function SellerFront({ session }: SellerFrontProps) {
      return (
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">Panel de Vendedor</h1>
          <div className="bg-white p-6 rounded-lg shadow">
            <p>Bienvenido, vendedor. Aquí puedes ver las propiedades asignadas.</p>
            {/* Aquí puedes agregar más funcionalidades específicas para vendedores */}
          </div>
        </div>
      )
    }
