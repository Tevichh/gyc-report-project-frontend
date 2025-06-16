import { useForm, useFieldArray } from "react-hook-form";
import { FolderPlus, TimerOff } from "lucide-react";
import { useEffect, useState } from "react";
import { LocationMap } from "./LocationMap";
import { FormValues, ReportModalProps } from "../../models/report.interface";


export const ReportModalComponent = ({
  edit,
  isOpen,
  handleModal,
  report
}: ReportModalProps) => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
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
      equipos: [{ equipo: "", serial: "", cambio: false, mantenimiento: false, suministroRetiro: false }],
      evidencias: null
    }
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationString = `Lat: ${latitude}, Lon: ${longitude}`;

          setCoords({ lat: latitude, lon: longitude });

          reset({
            ticket: report?.NoTicket || "",
            sistema: report?.sistema || "",
            zona: report?.zona || "",
            locacion: report?.locacion || locationString,
            cliente: report?.cliente || "",
            nombrePunto: report?.nombrePunto || "",
            descripcion: report?.descripcion || "",
            equipos: report?.equipos || [{ equipo: "", serial: "", cambio: false, mantenimiento: false, suministroRetiro: false }],
            evidencias: null
          });
        },
        (error) => {
          console.error("Error obtaining location:", error);
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  }, [report, reset]);


  const { fields, append } = useFieldArray({
    control,
    name: "equipos"
  });

  const evidencias = watch("evidencias");

  const onSubmit = (data: FormValues) => {
    handleModal();
    console.log("Formulario:", data);
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
      equipos: [{ equipo: "", serial: "", cambio: false, mantenimiento: false, suministroRetiro: false }],
      evidencias: null
    });

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
                const cambio = watch(`equipos.${index}.cambio`);
                return (
                  <div key={field.id} className="col-span-2 border p-3 rounded bg-gray-50 mb-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        {...register(`equipos.${index}.equipo` as const)}
                        placeholder="Equipo"
                        className="p-2 text-sm border border-gray-300 rounded-lg"
                      />
                      <input
                        {...register(`equipos.${index}.serial` as const)}
                        placeholder="Serial"
                        className="p-2 text-sm border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2">
                      {["cambio", "mantenimiento", "suministroRetiro"].map((fieldName) => (
                        <label key={fieldName} className="flex items-center gap-1 text-sm">
                          <input type="checkbox" {...register(`equipos.${index}.${fieldName}` as const)} />
                          {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                        </label>
                      ))}
                    </div>
                    {cambio && (
                      <input
                        {...register(`equipos.${index}.nuevoSerial` as const)}
                        placeholder="Nuevo Serial"
                        className="w-full mt-2 p-2 text-sm border border-gray-300 rounded-lg"
                      />
                    )}
                  </div>
                );
              })}

              <div className="col-span-2">
                <button
                  type="button"
                  onClick={() => append({ equipo: "", serial: "", cambio: false, mantenimiento: false, suministroRetiro: false })}
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
                  {...register("evidencias")}
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                />
                {evidencias && evidencias.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {Array.from(evidencias).map((file, idx) => (
                      <img
                        key={idx}
                        src={URL.createObjectURL(file)}
                        alt={`Evidencia ${idx + 1}`}
                        className="w-full h-24 object-cover rounded border"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-2 flex justify-center mt-5">
              {isOpen && coords && (
                <div className=" w-[300px] h-[250px] rounded shadow overflow-hidden">
                  <LocationMap latitude={coords.lat} longitude={coords.lon} />
                </div>
              )}

            </div>


            <div className="flex justify-end gap-2 mt-4">
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
          </form>
        </div>
      </div>
    </div>
  );
};
