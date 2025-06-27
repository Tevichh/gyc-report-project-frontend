import { useForm, useFieldArray } from "react-hook-form";
import { FolderPlus, TimerOff } from "lucide-react";
import { useEffect, useState } from "react";
import { LocationMap } from "./LocationMap";
import { createReportService } from "../../services/reportService";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { uploadReportImages } from "../../services/imagesService";


interface EquipoIntervenido {
  equipo: string;
  serial: string;
  tipo: string;
  nuevoSerial?: string;
}

interface FormValues {
  fechaInicio: string;
  fechafin: string;
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
  refreshReports: () => void;
}

export const ReportModalComponent = ({
  edit,
  isOpen,
  handleModal,
  report,
  refreshReports
}: ReportModalProps) => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);


  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      fechaInicio: new Date().toISOString(),
      ticket: report?.NoTicket || "",
      sistema: report?.sistema || "",
      zona: report?.zona || "",
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
          reset({
            locacion: `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`,
            fechaInicio: new Date().toISOString().slice(0, 16)
          });
        },
        (error) => {
          console.error("Error obtaining location:", error);
        }
      );
    }
  }, []);

  const onSubmit = async (data: FormValues) => {
    let mapImageBase64 = "";
    const selectedImagesBase64: { name: string; base64: string }[] = [];

    if (mapRef.current) {
      mapRef.current.style.color = 'black';
      mapRef.current.style.background = 'white';

      const canvas = await html2canvas(mapRef.current, {
        useCORS: true
      });

      mapImageBase64 = canvas.toDataURL("image/png");
    }

    // Convertir las imágenes seleccionadas a base64
    const convertToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    for (const file of selectedImages) {
      const base64 = await convertToBase64(file);
      selectedImagesBase64.push({
        name: file.name,
        base64
      });
    }

    //const fechaInicio = new Date().toISOString();
    //const fechafin = "";
    const id = localStorage.getItem("userId");
    const idTecnicoResponsable = parseInt(id || "0");

    const body = {
      reportParams: {
        fechaInicio: new Date(data.fechaInicio).toISOString(),
        fechafin: new Date(data.fechafin).toISOString(),
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
        estado: e.tipo.charAt(0).toUpperCase() + e.tipo.slice(1),
        serialAnterior: e.tipo === "cambio" ? e.nuevoSerial : ""
      })),
      anexosFotograficos: [
        ...selectedImagesBase64.map((img) => ({
          nombre: img.name,
          url: img.name // Guardamos el nombre como referencia (el backend debería mapearlo al archivo real)
        })),
        ...(mapImageBase64 ? [{ nombre: "mapa.png", url: "mapa.png" }] : [])
      ]
    };

    // Enviamos imágenes como base64 al servicio
    await uploadReportImages(
      body.reportParams.NoTicket,
      [
        ...selectedImagesBase64.map((img) => img.base64),
        ...(mapImageBase64 ? [mapImageBase64] : [])
      ]
    );

    console.log("Body a enviar:", body);

    await createReportService(body);
    refreshReports();

    handleModal();
    resetModal();
  };



  function resetModal() {
    reset({
      fechaInicio: new Date().toISOString(),
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
              <div className="col-span-2 sm:col-span-1">
                <label className="block mb-1 text-sm font-medium text-gray-900">Fecha y hora de inicio</label>
                <input
                  type="datetime-local"
                  {...register("fechaInicio", { required: true })}
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                />
                {errors.fechaInicio && (
                  <span className="text-xs text-red-500">Este campo es obligatorio</span>
                )}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block mb-1 text-sm font-medium text-gray-900">Fecha y hora final</label>
                <input
                  type="datetime-local"
                  {...register("fechafin", { required: true })}
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                />
                {errors.fechafin && (
                  <span className="text-xs text-red-500">Este campo es obligatorio</span>
                )}
              </div>

              {[
                { label: "No. Ticket", name: "ticket", edit: false },
                { label: "Sistema", name: "sistema", edit: false },
                { label: "Zona", name: "zona", edit: false },
                { label: "Locación", name: "locacion", edit: true },
                { label: "Cliente/Proyecto", name: "cliente", edit: false },
                { label: "Nombre del punto", name: "nombrePunto", edit: false }
              ].map(({ label, name, edit }) => (
                <div key={name} className="col-span-2 sm:col-span-1">
                  <label className="block mb-1 text-sm font-medium text-gray-900">{label}</label>
                  {!edit ? (
                    <>
                      <input
                        {...register(name as keyof FormValues, {
                          required: true,
                          pattern: {
                            value: /^[a-zA-Z0-9\s]+$/,
                            message: "No se permiten caracteres especiales"
                          }
                        })}
                        className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                        onChange={(e) => {
                          e.target.value = e.target.value.toUpperCase();
                        }
                        }

                      />
                      {errors[name as keyof FormValues]?.type === "required" && (
                        <span className="text-xs text-red-500">Este campo es obligatorio</span>
                      )}
                      <br />
                      {errors[name as keyof FormValues]?.type === "pattern" && (
                        <span className="text-xs text-red-500">{(errors[name as keyof FormValues] as any).message}</span>
                      )}
                    </>

                  ) : (
                    <input
                      {...register(name as keyof FormValues)}
                      className="w-full p-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                      readOnly
                    />
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
                  <div
                    ref={mapRef}
                    className="w-[300px] h-[250px] rounded shadow overflow-hidden">
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













