import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { UserInfo } from "../../models/userInfo.interface";
import { createUserService, updateUserService } from "../../services/userService";
import { useEffect } from "react";

type CreateOrEditUserComponentProps = {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    onSubmitUser: () => void;
    initialData?: UserInfo | null;
    onClose: () => void;
};

export const CreateUserComponent = ({ isOpen, setIsOpen, onSubmitUser, initialData, onClose }: CreateOrEditUserComponentProps) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UserInfo>({});

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        } else {
            reset({
                nombres: "",
                apellidos: "",
                email: "",
                telefono: "",
                cedula: "",
                direccion: "",
                cargo: "",
                rol: "",
                region: ""
            });
        }
    }, [initialData]);

    const onSubmit = (data: UserInfo) => {

        onSubmitUser();
        setIsOpen(false);

        if (initialData) {
            updateUserService(data);
        } else {
            createUserService(data);
        }

        reset();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md mx-4">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold">
                        {initialData ? "Editar Usuario" : "Agregar Nuevo Usuario"}
                    </h3>
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            onClose();
                            reset();
                        }}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-4 space-y-4 overflow-y-auto max-h-[500px]">
                        {/** Nombres */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-medium">Nombres:</span>
                            <input
                                {...register("nombres", { required: true })}
                                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                            />
                            {errors.nombres && <span className="text-red-500 text-sm col-span-4">Requerido</span>}
                        </div>

                        {/** Apellidos */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-medium">Apellidos:</span>
                            <input
                                {...register("apellidos", { required: true })}
                                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                            />
                            {errors.apellidos && <span className="text-red-500 text-sm col-span-4">Requerido</span>}
                        </div>

                        {/** Email */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-medium">Email:</span>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                            />
                            {errors.email && <span className="text-red-500 text-sm col-span-4">Requerido</span>}
                        </div>

                        {/** Teléfono */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-medium">Teléfono:</span>
                            <input
                                {...register("telefono")}
                                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        {/** Cédula */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-medium">Cédula:</span>
                            <input
                                {...register("cedula")}
                                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        {/** Dirección */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-medium">Dirección:</span>
                            <input
                                {...register("direccion")}
                                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        {/** Cargo */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-medium">Cargo:</span>
                            <input
                                {...register("cargo")}
                                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        {/** Rol */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-medium">Rol:</span>
                            <select
                                {...register("rol", { required: true })}
                                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                            >
                                <option value="tecnico">Técnico</option>
                                <option value="administrador">Administrador</option>
                            </select>
                            {errors.rol && <span className="text-red-500 text-sm col-span-4">Requerido</span>}
                        </div>
                        {/** Región */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-medium">Región:</span>
                            <input
                                {...register("region")}
                                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                    </div>

                    <div className="flex justify-end gap-2 p-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={() => {
                                setIsOpen(false);
                                reset();
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                        >
                            {initialData ? "Actualizar" : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
