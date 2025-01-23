import { supabase } from '../lib/supabaseClient'

    export default function Header() {
      const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
          console.error('Error al cerrar sesión:', error.message)
        } else {
          window.location.href = '/'
        }
      }

      return (
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Mi Aplicación</h1>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
            >
              Cerrar Sesión
            </button>
          </div>
        </header>
      )
    }
