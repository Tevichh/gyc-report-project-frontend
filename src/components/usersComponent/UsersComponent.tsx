"use client"

import { useState } from "react"
import type { UserInfo } from "../../models/userInfo.interface"
import { PlusCircle, Eye, X } from "lucide-react"
import { CreateUserComponent } from "./CreateUserComponent"

type UsersComponentProps = {
    users: UserInfo[]
}

export const UsersComponent = ({ users: initialUsers }: UsersComponentProps) => {
    const [users, setUsers] = useState<UserInfo[]>(initialUsers)
    const [isAddingUser, setIsAddingUser] = useState(false)

    const [viewingUser, setViewingUser] = useState<UserInfo | null>(null)


    const openUserDetails = (user: UserInfo) => {
        setViewingUser(user)
    }

    const closeUserDetails = () => {
        setViewingUser(null)
    }

    return (
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="text-xl font-bold">Listado de Usuarios</h2>
                <button
                    onClick={() => setIsAddingUser(true)}
                    className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Agregar Usuario
                </button>
            </div>
            <div className="p-4">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-4 py-3 text-left font-semibold">Nombres</th>
                                <th className="px-4 py-3 text-left font-semibold">Apellidos</th>
                                <th className="px-4 py-3 text-left font-semibold">Cargo</th>
                                <th className="px-4 py-3 text-left font-semibold">Teléfono</th>
                                <th className="px-4 py-3 text-right font-semibold">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-6 text-gray-500">
                                        No hay usuarios registrados
                                    </td>
                                </tr>
                            ) : (
                                users.map((user, index) => (
                                    <tr key={user.id || index} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-4 py-3">{user.nombres}</td>
                                        <td className="px-4 py-3">{user.apellidos}</td>
                                        <td className="px-4 py-3">{user.cargo || "-"}</td>
                                        <td className="px-4 py-3">{user.telefono || "-"}</td>
                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={() => openUserDetails(user)}
                                                className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
                                            >
                                                <Eye className="h-4 w-4 mr-1" />
                                                Ver
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <CreateUserComponent/>

            {/* Modal para ver detalles del usuario */}
            {viewingUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-md mx-4">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold">Información del Usuario</h3>
                            <button onClick={closeUserDetails} className="text-gray-500 hover:text-gray-700">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">Nombres:</span>
                                <span className="col-span-3">{viewingUser.nombres}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">Apellidos:</span>
                                <span className="col-span-3">{viewingUser.apellidos}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">Email:</span>
                                <span className="col-span-3">{viewingUser.cargo || "-"}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">Teléfono:</span>
                                <span className="col-span-3">{viewingUser.telefono || "-"}</span>
                            </div>
                        </div>
                        <div className="flex justify-end p-4 border-t border-gray-100">
                            <button
                                onClick={closeUserDetails}
                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
