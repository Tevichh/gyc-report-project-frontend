/* email, password, nombres, apellidos, cedula, direccion, telefono, cargo, rol */

import { useState } from "react"
import { UserInfo } from "../../models/userInfo.interface"
import { X } from "lucide-react"

export const CreateUserComponent = ({ users, setUsers }: any) => {

    const [newUser, setNewUser] = useState<Partial<UserInfo>>({
        nombres: "",
        apellidos: "",
        cargo: "",
        telefono: "",
    })
    const [isAddingUser, setIsAddingUser] = useState(false)
    const handleAddUser = () => {
        if (newUser.nombres && newUser.apellidos) {
            const userToAdd = {
                ...newUser,
                id: Date.now().toString(), // Generamos un ID temporal
            } as UserInfo

            setUsers([...users, userToAdd])
            setNewUser({
                nombres: "",
                apellidos: "",
                cargo: "",
                telefono: "",
            })
            setIsAddingUser(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewUser({
            ...newUser,
            [name]: value,
        })
    }
    return (
        <div>
            {/* Modal para agregar usuario */}
            {isAddingUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-md mx-4">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold">Agregar Nuevo Usuario</h3>
                            <button onClick={() => setIsAddingUser(false)} className="text-gray-500 hover:text-gray-700">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">Nombres:</span>
                                <input
                                    name="nombres"
                                    value={newUser.nombres}
                                    onChange={handleInputChange}
                                    className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">Apellidos:</span>
                                <input
                                    name="apellidos"
                                    value={newUser.apellidos}
                                    onChange={handleInputChange}
                                    className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">Email:</span>
                                <input
                                    name="email"
                                    type="email"
                                    value={newUser.cargo || ""}
                                    onChange={handleInputChange}
                                    className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">Teléfono:</span>
                                <input
                                    name="telefono"
                                    value={newUser.telefono || ""}
                                    onChange={handleInputChange}
                                    className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 p-4 border-t border-gray-100">
                            <button
                                onClick={() => setIsAddingUser(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleAddUser}
                                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!newUser.nombres || !newUser.apellidos}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
