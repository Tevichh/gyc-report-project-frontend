import { FileText, FolderPlus } from "lucide-react"
import { useEffect, useState } from "react";
import { TableComponent } from "./TableComponent";
import { ReportModalComponent } from "../reportModalComponent/ReportModalComponent";
import { deleteReportService, getReportByIdService, getReportsService } from "../../services/reportService";

export const ReportComponent = ({ isAdmin }: { isAdmin: boolean }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [rows, setRows] = useState<any[]>([]);


    const handleModal = () => {
        if (isOpen) {
            setIsOpen(false);
            setIsEditing(false);

        }
        else {
            setIsOpen(true);
        }
    }
    const headers = ["No. TICKET", "Tipo", "Lugar", "Fecha"];


    useEffect(() => {
        if (isAdmin) {
            const reports = getReportsService();
            reports.then((data) => {
                const formattedRows = data.map((report: any) => ({
                    "id": report.idReporte,
                    "No. TICKET": report.NoTicket,
                    "Tipo": report.tipoActividad,
                    "Lugar": report.locacion,
                    "Fecha": new Date(report.fechaInicio).toLocaleDateString(),
                }));
                setRows(formattedRows);
            }).catch((error) => {
                console.error("Error fetching reports:", error);
            });
        } else {
            const userReports = getReportByIdService(localStorage.getItem("userId") || "");
            userReports.then((data) => {
                const formattedRows = data.map((report: any) => ({
                    "id": report.idReporte,
                    "No. TICKET": report.NoTicket,
                    "Tipo": report.tipoActividad,
                    "Lugar": report.locacion,
                    "Fecha": new Date(report.fechaInicio).toLocaleDateString(),
                }));
                setRows(formattedRows);
            }).catch((error) => {
                console.error("Error fetching user reports:", error);
            });
        }
    }, []);

    return (
        <div className="reportComponentContainer text-gray-900 p-4 h-150">

            <ReportModalComponent edit={isEditing} isOpen={isOpen} handleModal={handleModal}></ReportModalComponent>

            <div className="flex justify-between items-center mb-10">
                <div className="text-2xl flex items-center">
                    <FileText className="mr-2 h-6 w-6 text-orange-500" />
                    <h3>Gestión de Reportes</h3>
                </div>
                <button onClick={handleModal} data-modal-target="crud-modal" data-modal-toggle="crud-modal" className="bg-orange-500 hover:bg-orange-600 text-white flex items-center p-3 rounded-lg">
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
                    headers={headers}
                    rows={rows}
                    onView={(row) => console.log("Ver", row)}
                    onDelete={(row) => { deleteReportService(row.id).then(() => alert("Reporte eliminado exitosamente")).catch(error => alert("Error al eliminar el reporte: " + error)) }}
                    onEdit={(row) => console.log("Editar", row)}
                />
            )}



        </div>
    )
}

