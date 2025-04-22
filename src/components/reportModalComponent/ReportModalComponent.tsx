import { FolderPlus, TimerOff } from "lucide-react";
import { useState } from "react";
import { Report } from "../../models/report.interface";

type ReportModalProps = {
    edit: boolean;
    report?: Report;
    isOpen?: boolean;
    handleModal?: () => void;
};

export const ReportModalComponent = ({ edit, report, isOpen, handleModal }: ReportModalProps) => {
    const [formData, setFormData] = useState({
        ticket: report?.ticket || "",
        sistema: report?.sistema || "",
        zona: report?.zona || "",
        locacion: report?.locacion || "",
        cliente: report?.cliente || "",
        nombrePunto: report?.nombrePunto || "",
        descripcion: report?.descripcion || "",
    });

    const [evidencias, setEvidencias] = useState<File[]>([]);
    const [equipos, setEquipos] = useState([
        { equipo: "", serial: "", cambio: false, mantenimiento: false, suministroRetiro: false, nuevoSerial: "" },
    ]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEvidenciaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setEvidencias(prev => [...prev, ...filesArray]);
        }
    };

    const handleEquipoChange = (index: number, field: string, value: string | boolean) => {
        const updatedEquipos = [...equipos];
        (updatedEquipos[index] as any)[field] = value;
        setEquipos(updatedEquipos);
    };

    const handleAddEquipo = () => {
        setEquipos([...equipos, { equipo: "", serial: "", cambio: false, mantenimiento: false, suministroRetiro: false, nuevoSerial: "" }]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Formulario:", formData);
        console.log("Equipos intervenidos:", equipos);
        console.log("Evidencias:", evidencias);
    };

    return (

        <div className={`${isOpen ? "" : "hidden"} bg-gray-200 flex justify-center fixed inset-0 z-50`}>
            <div className="p-4 w-full max-w-[600px]">
                <div className="bg-white rounded-lg shadow-sm max-h-[680px] overflow-y-auto">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {edit ? "Editar Reporte" : "Crear nuevo reporte"}
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            data-modal-toggle="crud-modal"
                        >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Cerrar modal</span>
                        </button>
                    </div>

                    <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <hr className="col-span-2" />
                            <h3 className="text-center col-span-2 font-medium text-gray-700">INFORMACIÓN INGRESO</h3>
                            <hr className="col-span-2" />

                            {[
                                { label: "No. Ticket", name: "ticket" },
                                { label: "Sistema", name: "sistema" },
                                { label: "Zona", name: "zona" },
                                { label: "Locación", name: "locacion" },
                                { label: "Cliente/Proyecto", name: "cliente" },
                                { label: "Nombre del punto", name: "nombrePunto" }
                            ].map(({ label, name }) => (
                                <div key={name} className="col-span-2 sm:col-span-1">
                                    <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
                                    <input
                                        type="text"
                                        id={name}
                                        name={name}
                                        value={formData[name as keyof typeof formData]}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required
                                    />
                                </div>
                            ))}

                            <hr className="col-span-2" />
                            <h3 className="text-center col-span-2 font-medium text-gray-700">INFORMACIÓN SOBRE LA VISITA</h3>
                            <hr className="col-span-2" />

                            <div className="col-span-2">
                                <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900">
                                    Descripción de la Solicitud del Cliente o Daño Reportado
                                </label>
                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    rows={4}
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            {/* Equipos Intervenidos */}
                            <hr className="col-span-2" />
                            <h3 className="text-center col-span-2 font-medium text-gray-700">INFORMACIÓN DEL EQUIPO INTERVENIDO</h3>
                            <hr className="col-span-2" />

                            {equipos.map((equipo, index) => (
                                <div key={index} className="col-span-2 border p-4 rounded-lg mb-2 bg-gray-50">
                                    <div className="grid grid-cols-2 gap-4 mb-2">
                                        <div>
                                            <label className="text-sm font-medium text-gray-900">Equipo</label>
                                            <input
                                                type="text"
                                                value={equipo.equipo}
                                                onChange={(e) => handleEquipoChange(index, "equipo", e.target.value)}
                                                className="w-full mt-1 p-2 text-sm border border-gray-300 rounded-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-900">Serial</label>
                                            <input
                                                type="text"
                                                value={equipo.serial}
                                                onChange={(e) => handleEquipoChange(index, "serial", e.target.value)}
                                                className="w-full mt-1 p-2 text-sm border border-gray-300 rounded-lg"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-4 mb-2">
                                        <label className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={equipo.cambio}
                                                onChange={(e) => handleEquipoChange(index, "cambio", e.target.checked)}
                                            />
                                            Cambio
                                        </label>
                                        <label className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={equipo.mantenimiento}
                                                onChange={(e) => handleEquipoChange(index, "mantenimiento", e.target.checked)}
                                            />
                                            Mantenimiento
                                        </label>
                                        <label className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={equipo.suministroRetiro}
                                                onChange={(e) => handleEquipoChange(index, "suministroRetiro", e.target.checked)}
                                            />
                                            Suministro/Retiro
                                        </label>
                                    </div>
                                    {equipo.cambio && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-900">Nuevo Serial</label>
                                            <input
                                                type="text"
                                                value={equipo.nuevoSerial}
                                                onChange={(e) => handleEquipoChange(index, "nuevoSerial", e.target.value)}
                                                className="w-full mt-1 p-2 text-sm border border-gray-300 rounded-lg"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}

                            <div className="col-span-2">
                                <button
                                    type="button"
                                    onClick={handleAddEquipo}
                                    className="bg-blue-100 text-blue-800 px-4 py-2 rounded hover:bg-blue-200 text-sm"
                                >
                                    + Agregar otro equipo intervenido
                                </button>
                            </div>

                            {/* Evidencias */}
                            <div className="col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Evidencia Fotográfica</label>
                                <div className="flex items-center gap-3 mb-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleEvidenciaChange}
                                        className="block text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer p-2.5"
                                    />
                                </div>
                                {evidencias.length > 0 && (
                                    <div className="grid grid-cols-3 gap-2 mt-2">
                                        {evidencias.map((file, index) => (
                                            <img
                                                key={index}
                                                src={URL.createObjectURL(file)}
                                                alt={`Evidencia ${index + 1}`}
                                                className="w-full h-24 object-cover rounded border"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="w-full flex justify-end gap-2 mt-4">
                            <button
                                type="button"
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 p-2.5 rounded-lg"
                                onClick={handleModal}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className={`${edit ? "bg-orange-500 hover:bg-orange-600" : "bg-blue-900 hover:bg-blue-800"} text-white flex items-center p-2.5 rounded-lg`}
                            >
                                {edit ? (
                                    <>
                                        <TimerOff className="mr-2 h-6 w-6" />
                                        Cerrar Reporte
                                    </>
                                ) : (
                                    <>
                                        <FolderPlus className="mr-2 h-6 w-6" />
                                        Guardar Reporte
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};
