import { useForm, useFieldArray } from "react-hook-form";
import { FolderPlus, TimerOff } from "lucide-react";
import { useEffect, useState } from "react";
import { LocationMap } from "./LocationMap";
import { createReportService } from "../../services/reportService";

interface EquipoIntervenido {
  equipo: string;
  serial: string;
  tipo: string;
  nuevoSerial?: string;
}

interface FormValues {
  ticket: string;
  sistema: string;
  zona: string;
  locacion: string;
  cliente: string;
  nombrePunto: string;
  descripcion: string;
  equipos: EquipoIntervenido[];
  evidencias: FileList | null;
}

interface ReportModalProps {
  edit: boolean;
  isOpen: boolean;
  handleModal: () => void;
  report?: any;
}

export const ReportModalComponent = ({
  edit,
  isOpen,
  handleModal,
  report
}: ReportModalProps) => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      ticket: report?.NoTicket || "",
      sistema: report?.sistema || "",
      zona: report?.zona || "",
      locacion: report?.locacion || "",
      cliente: report?.cliente || "",
      nombrePunto: report?.nombrePunto || "",
      descripcion: report?.descripcion || "",
      equipos: report?.equipos || [{ equipo: "", serial: "", tipo: "", nuevoSerial: "" }],
      evidencias: null
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "equipos"
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Error obtaining location:", error);
        }
      );
    }
  }, []);

  const onSubmit = (data: FormValues) => {
    const fechaInicio = new Date().toISOString(); // O el valor real
    const fechafin = new Date().toISOString();    // O el valor real
    const id = localStorage.getItem("userId")
    const idTecnicoResponsable = parseInt(id || "0");

    const body = {
      reportParams: {
        fechaInicio,
        fechafin,
        tipoActividad: "Mantenimiento preventivo",
        NoTicket: data.ticket,
        sistema: data.sistema,
        zona: data.zona,
        locacion: data.locacion,
        cliente: data.cliente,
        nombrePunto: data.nombrePunto,
        descripcionSolicitud: data.descripcion,
        descripcionActividad: data.descripcion,
        SolucionoRequimiento: true,
        nuevaIntervencion: false,
        estado: "Finalizado",
        idTecnicoResponsable
      },
      equiposIntervenidos: data.equipos.map((e) => ({
        equipo: e.equipo,
        serial: e.serial,
        estado: e.tipo.charAt(0).toUpperCase() + e.tipo.slice(1),  // Capitaliza
        serialAnterior: e.tipo === "cambio" ? e.nuevoSerial : ""
      })),
      anexosFotograficos: selectedImages.map((file) => ({
        url: URL.createObjectURL(file) // En la práctica: reemplaza con URL real tras subir
      }))
    };

    console.log("Body a enviar:", body);

    createReportService(body)

    handleModal();
  };

  function resetModal() {
    reset({
      ticket: "",
      sistema: "",
      zona: "",
      locacion: "",
      cliente: "",
      nombrePunto: "",
      descripcion: "",
      equipos: [{ equipo: "", serial: "", tipo: "", nuevoSerial: "" }],
      evidencias: null
    });
    setSelectedImages([]);
    handleModal();
  }

  return (
    <div className={`${isOpen ? "" : "hidden"} bg-gray-200 flex justify-center fixed inset-0 z-50`}>
      <div className="p-4 w-full max-w-[600px]">
        <div className="bg-white rounded-lg shadow-sm max-h-[680px] overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {edit ? "Editar Reporte" : "Crear nuevo reporte"}
            </h3>
            <button
              type="button"
              onClick={handleModal}
              className="text-gray-400 hover:bg-gray-200 rounded-lg w-8 h-8 flex justify-center items-center"
            >
              <span className="sr-only">Cerrar modal</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>

          <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 grid-cols-2">
              <hr className="col-span-2" />
              <h3 className="col-span-2 text-center font-medium text-gray-700">INFORMACIÓN INGRESO</h3>
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
                  <label className="block mb-1 text-sm font-medium text-gray-900">{label}</label>
                  <input
                    {...register(name as keyof FormValues, { required: true })}
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                  />
                  {errors[name as keyof FormValues] && (
                    <span className="text-xs text-red-500">Este campo es obligatorio</span>
                  )}
                </div>
              ))}

              <div className="col-span-2">
                <label className="block mb-1 text-sm font-medium text-gray-900">Descripción</label>
                <textarea
                  {...register("descripcion", { required: true })}
                  rows={3}
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                />
                {errors.descripcion && (
                  <span className="text-xs text-red-500">Este campo es obligatorio</span>
                )}
              </div>

              <hr className="col-span-2" />
              <h3 className="col-span-2 text-center font-medium text-gray-700">EQUIPO INTERVENIDO</h3>
              <hr className="col-span-2" />

              {fields.map((field, index) => {
                const tipoSeleccionado = watch(`equipos.${index}.tipo`);
                return (
                  <div key={field.id} className="col-span-2 border p-3 rounded bg-gray-50 mb-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        {...register(`equipos.${index}.equipo`, { required: true })}
                        placeholder="Equipo"
                        className="p-2 text-sm border border-gray-300 rounded-lg"
                      />
                      <input
                        {...register(`equipos.${index}.serial`, { required: true })}
                        placeholder="Serial"
                        className="p-2 text-sm border border-gray-300 rounded-lg"
                      />
                    </div>
                    {errors.equipos?.[index]?.equipo && (
                      <span className="text-xs text-red-500">El equipo es obligatorio</span>
                    )}
                    {errors.equipos?.[index]?.serial && (
                      <span className="text-xs text-red-500">El serial es obligatorio</span>
                    )}

                    <div className="flex flex-wrap gap-4 mt-2">
                      {["no_Aplica", "cambio", "mantenimiento", "suministro_Retiro"].map((tipo) => (
                        <label key={tipo} className="flex items-center gap-1 text-sm">
                          <input
                            type="radio"
                            value={tipo}
                            {...register(`equipos.${index}.tipo`, { required: true })}
                          />
                          {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                        </label>
                      ))}
                    </div>
                    {errors.equipos?.[index]?.tipo && (
                      <span className="text-xs text-red-500">Debe seleccionar un tipo</span>
                    )}

                    {tipoSeleccionado === "cambio" && (
                      <>
                        <input
                          {...register(`equipos.${index}.nuevoSerial`, { required: true })}
                          placeholder="Nuevo Serial"
                          className="w-full mt-2 p-2 text-sm border border-gray-300 rounded-lg"
                        />
                        {errors.equipos?.[index]?.nuevoSerial && (
                          <span className="text-xs text-red-500">El nuevo serial es obligatorio</span>
                        )}
                      </>
                    )}

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="mt-2 text-red-600 hover:text-red-800 text-sm"
                    >
                      Eliminar equipo
                    </button>
                  </div>
                );
              })}

              <div className="col-span-2">
                <button
                  type="button"
                  onClick={() =>
                    append({ equipo: "", serial: "", tipo: "", nuevoSerial: "" })
                  }
                  className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded hover:bg-blue-200 text-sm"
                >
                  + Agregar equipo intervenido
                </button>
              </div>

              <div className="col-span-2">
                <label className="block mb-1 text-sm font-medium text-gray-900">Evidencia Fotográfica</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setSelectedImages(files);
                  }}
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                />
                {selectedImages.length === 0 && (
                  <span className="text-xs text-red-500">Debe agregar al menos una imagen</span>
                )}

                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {selectedImages.map((file, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Evidencia ${idx + 1}`}
                          className="w-full h-24 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newImages = [...selectedImages];
                            newImages.splice(idx, 1);
                            setSelectedImages(newImages);
                          }}
                          className="absolute top-0 right-0 bg-white text-red-600 rounded-full p-1 shadow"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="col-span-2 flex justify-center mt-5">
                {isOpen && coords && (
                  <div className="w-[300px] h-[250px] rounded shadow overflow-hidden">
                    <LocationMap latitude={coords.lat} longitude={coords.lon} />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-4 col-span-2">
                <button
                  type="button"
                  onClick={resetModal}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`${edit ? "bg-orange-500 hover:bg-orange-600" : "bg-blue-900 hover:bg-blue-800"
                    } text-white flex items-center px-4 py-2 rounded-lg`}
                >
                  {edit ? (
                    <>
                      <TimerOff className="mr-2 h-5 w-5" />
                      Cerrar Reporte
                    </>
                  ) : (
                    <>
                      <FolderPlus className="mr-2 h-5 w-5" />
                      Guardar Reporte
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};













