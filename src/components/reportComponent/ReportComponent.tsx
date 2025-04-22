import { FileText, FolderPlus } from "lucide-react"
import { useState } from "react";
import { ReportModalComponent } from "../reportModalComponent/ReportModalComponent";
import { TableComponent } from "./TableComponent";

export const ReportComponent = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


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

    const rows = [
        {
            "No. TICKET": 1,
            "Tipo": "Reporte 1",
            "Lugar": "Descripción del reporte 1",
            "Fecha": "2023-10-01",
        }
    ];

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

            <TableComponent
                headers={headers}
                rows={rows}
                onView={(row) => console.log("Ver", row)}
                onDelete={(row) => console.log("Eliminar", row)}
                onEdit={(row) => console.log("Editar", row)}
            />


        </div>
    )
}

