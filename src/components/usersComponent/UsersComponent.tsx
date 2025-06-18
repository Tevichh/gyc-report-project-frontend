"use client";

import { useEffect, useState } from "react";
import type { UserInfo } from "../../models/userInfo.interface";
import { PlusCircle, Eye, X, Pencil, Trash2 } from "lucide-react";
import { CreateUserComponent } from "./CreateUserComponent";
import { deleteUserSevice, getAllUsers } from "../../services/userService";

export const UsersComponent = () => {
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [editingUser, setEditingUser] = useState<UserInfo | null>(null);
    const [viewingUser, setViewingUser] = useState<UserInfo | null>(null);

    const openUserDetails = (user: UserInfo) => {
        setViewingUser(user);
    };

    const closeUserDetails = () => {
        setViewingUser(null);
        fetchUsers();
    };

    const handleCreateOrUpdateUser = () => {
        setIsAddingUser(false);
        setEditingUser(null);
        fetchUsers();
    };

    const fetchUsers = () => {
        getAllUsers()
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    };

    const deleteUser = (userId: number) => {
        fetchUsers(); // Refresh the user list before deletion
        deleteUserSevice(userId)
            .then(() => {
                console.log("Usuario eliminado correctamente");
                setViewingUser(null);
                fetchUsers();
            })
            .catch((error) => {
                console.error("Error al eliminar el usuario:", error);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, [editingUser, isAddingUser]);

    return (
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="text-xl font-bold">Listado de Usuarios</h2>
                <button
                    onClick={() => {
                        setIsAddingUser(true);
                        setEditingUser(null);
                    }}
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
                                <th className="px-4 py-3 text-center font-semibold">Acciones</th>
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
                                    <tr
                                        key={user.id || index}
                                        className="border-b border-gray-100 hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-3">{user.nombres}</td>
                                        <td className="px-4 py-3">{user.apellidos}</td>
                                        <td className="px-4 py-3">{user.cargo || "-"}</td>
                                        <td className="px-4 py-3">{user.telefono || "-"}</td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => openUserDetails(user)}
                                                className="inline-flex items-center min-w-[90px] max-w-[90px] justify-center px-3 py-1 m-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
                                            >
                                                <Eye className="h-4 w-4 mr-1" />
                                                Ver
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditingUser(user);
                                                    setIsAddingUser(true);
                                                }}
                                                className="inline-flex items-center min-w-[90px] max-w-[90px] justify-center px-3 py-1 m-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
                                            >
                                                <Pencil className="h-4 w-4 mr-1" />
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => {
                                                    deleteUser(parseInt(user.id));
                                                    alert("Usuario eliminado correctamente");
                                                }}
                                                className="inline-flex items-center min-w-[90px] max-w-[90px] justify-center px-3 py-1 m-1 border border-red-300 rounded-md text-sm text-red-500 hover:bg-red-50 transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4 mr-1" />
                                                Eliminar
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <CreateUserComponent
                isOpen={isAddingUser}
                setIsOpen={setIsAddingUser}
                onSubmitUser={handleCreateOrUpdateUser}
                initialData={editingUser}
                onClose={() => setEditingUser(null)}
            />

            {viewingUser && (
                <div className="fixed inset-0 bg-gray-200 bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 animate-fade-in">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">👤 Detalles del Usuario</h3>
                        <div className="space-y-3">
                            <div className="p-3 rounded-lg border border-gray-100 bg-gray-50">
                                <p className="text-sm text-gray-500">Nombres</p>
                                <p className="font-medium text-gray-800">{viewingUser.nombres}</p>
                            </div>
                            <div className="p-3 rounded-lg border border-gray-100 bg-gray-50">
                                <p className="text-sm text-gray-500">Apellidos</p>
                                <p className="font-medium text-gray-800">{viewingUser.apellidos}</p>
                            </div>
                            <div className="p-3 rounded-lg border border-gray-100 bg-gray-50">
                                <p className="text-sm text-gray-500">Cargo</p>
                                <p className="font-medium text-gray-800">{viewingUser.cargo || "-"}</p>
                            </div>
                            <div className="p-3 rounded-lg border border-gray-100 bg-gray-50">
                                <p className="text-sm text-gray-500">Teléfono</p>
                                <p className="font-medium text-gray-800">{viewingUser.telefono || "-"}</p>
                            </div>
                            <div className="p-3 rounded-lg border border-gray-100 bg-gray-50">
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium text-gray-800">{viewingUser.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={closeUserDetails}
                            className="mt-6 w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex justify-center items-center"
                        >
                            <X className="h-4 w-4 mr-2" />
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
