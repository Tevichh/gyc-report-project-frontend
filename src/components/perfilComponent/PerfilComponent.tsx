import { ShieldUser, User } from "lucide-react";
import { UserInfo } from "../../models/userInfo.interface";

type PerfilComponentProps = {
  userInfo: UserInfo | null;
};


export const PerfilComponent = ({ userInfo }: PerfilComponentProps) => {

  if (!userInfo) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="w-full bg-blue-900 rounded-lg shadow-lg h-70">

        <div className="h-35 bg-white rounded-t-lg flex items-center justify-center">
          <img src="./src/assets/logogyc.png" className="h-16" alt="Logo" />
        </div>

        <div className="flex justify-center mt-[-40px]">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
            {/* <img
              src={userInfo.urlFoto}
              alt="Perfil"
              className="w-20 h-20 object-cover rounded-full"
            /> */}
            {
              (userInfo.rol === "administrador" && (
                <ShieldUser className="w-20 h-20 text-orange-400" />
              ) || (userInfo.rol === "tecnico" && (
                <User className="w-20 h-20 text-orange-400" />
              )))
            }
          </div>
        </div>

        <div className="text-center text-white mt-4">
          <h2 className="text-xl font-semibold">{userInfo.nombres + " " + userInfo.apellidos}</h2>
          <p className="text-sm text-blue-200">{userInfo.cargo}</p>
        </div>

        <div className="w-full bg-white shadow-lg p-6 mt-4">
          <h2 className="text-2xl font-semibold mb-4">Información del Usuario</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <div>
              <span className="font-medium">Nombres:</span> {userInfo.nombres}
            </div>
            <div>
              <span className="font-medium">Apellidos:</span> {userInfo.apellidos}
            </div>
            <div>
              <span className="font-medium">Cédula:</span> {userInfo.cedula}
            </div>
            <div>
              <span className="font-medium">Cargo:</span> {userInfo.cargo}
            </div>
            <div>
              <span className="font-medium">Teléfono:</span> {userInfo.telefono}
            </div>
            <div className="font-medium">
              <span className="font-medium">Dirección:</span> {userInfo.direccion}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
