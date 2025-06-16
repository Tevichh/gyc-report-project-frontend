import { AlertTriangle, Home } from "lucide-react"
import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] px-6 py-12">
            <div className="text-center space-y-6">
                {/* Icono principal */}
                <div className="flex justify-center">
                    <div className="rounded-full bg-orange-100 p-4">
                        <AlertTriangle className="h-12 w-12 text-orange-500" />
                    </div>
                </div>

                {/* Código de error */}
                <div className="space-y-2">
                    <h1 className="text-6xl font-bold text-gray-900">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-700">Página no encontrada</h2>
                </div>

                {/* Mensaje descriptivo */}
                <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                    Lo sentimos, la página que estás buscando no existe o ha sido movida. Verifica la URL o regresa al inicio.
                </p>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <Link to="/" className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium">
                        <Home className="h-4 w-4 mr-2" />
                        Ir al inicio
                    </Link>

                </div>

            </div>
        </div>
    )
}
