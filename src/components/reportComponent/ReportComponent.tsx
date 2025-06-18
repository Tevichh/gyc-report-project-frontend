import { FileText, FolderPlus } from "lucide-react";
import { TableComponent } from "./TableComponent";
import { ReportModalComponent } from "../reportModalComponent/ReportModalComponent";
import { deleteReportService, getReportByIdAdminService, getReportByIdService, getReportsService } from "../../services/reportService";
import { useEffect, useState } from "react";
import { generarReportePDF } from "../../services/pdfService";
import { fetchReportImages } from "../../services/imagesService";

export const ReportComponent = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [rows, setRows] = useState<any[]>([]);

    const fetchReports = () => {
        const userRole = localStorage.getItem("rol");
        const isAdmin = userRole === "administrador";

        if (isAdmin) {
            getReportsService()
                .then((data) => {
                    const formattedRows = data.map((report: any) => ({
                        "id": report.idReporte,
                        "No. TICKET": report.NoTicket,
                        "Tipo": report.tipoActividad,
                        "Lugar": report.locacion,
                        "Fecha": new Date(report.fechaInicio).toLocaleDateString(),
                    }));
                    setRows(formattedRows);
                })
                .catch((error) => {
                    console.error("Error fetching reports:", error);
                });
        } else {
            getReportByIdService(localStorage.getItem("userId") || "")
                .then((data) => {
                    const formattedRows = data.map((report: any) => ({
                        "id": report.idReporte,
                        "No. TICKET": report.NoTicket,
                        "Tipo": report.tipoActividad,
                        "Lugar": report.locacion,
                        "Fecha": new Date(report.fechaInicio).toLocaleDateString(),
                    }));
                    setRows(formattedRows);
                })
                .catch((error) => {
                    console.error("Error fetching user reports:", error);
                });
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleModal = () => {
        if (isOpen) {
            setIsOpen(false);
            setIsEditing(false);
            fetchReports(); // 👈 Cargar los datos después de cerrar el modal
        } else {
            setIsOpen(true);
        }
    };

    const handleDelete = (row: any) => {
        deleteReportService(row.id)
            .then(() => {
                alert("Reporte eliminado exitosamente");
                fetchReports(); // 👈 Refrescar la lista después de eliminar
            })
            .catch(error => alert("Error al eliminar el reporte: " + error));
    };

    const handleView = async (row: any) => {

        try {
            const report = await getReportByIdAdminService(row.id);
            const imagen = await fetchReportImages(report.NoTicket);
            console.log("Ver reporte", report);
            console.log("Imagenes del reporte", imagen);
            await generarReportePDF(report, imagen);
        } catch (error) {
            console.error("Error al obtener el reporte:", error);
            alert("Error al obtener el reporte: " + error);
        }

    }
    return (
        <div className="reportComponentContainer text-gray-900 p-4 h-150">

            <ReportModalComponent
                edit={isEditing}
                isOpen={isOpen}
                handleModal={handleModal}
                refreshReports={fetchReports}
            />

            <div className="flex justify-between items-center mb-10">
                <div className="text-2xl flex items-center">
                    <FileText className="mr-2 h-6 w-6 text-orange-500" />
                    <h3>Gestión de Reportes</h3>
                </div>
                <button
                    onClick={handleModal}
                    className="bg-orange-500 hover:bg-orange-600 text-white flex items-center p-3 rounded-lg"
                >
                    <FolderPlus className="mr-2 h-6 w-6" />
                    Nuevo Reporte
                </button>
            </div>

            {rows.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                    <p>No hay reportes disponibles.</p>
                </div>
            ) : (
                <TableComponent
                    headers={["No. TICKET", "Tipo", "Lugar", "Fecha"]}
                    rows={rows}
                    onView={handleView}
                    onDelete={handleDelete}
                    onEdit={handleView}
                />
            )}
        </div>
    );
};
