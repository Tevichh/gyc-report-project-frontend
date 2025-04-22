import { useState } from "react";
import { FileText, Trash2, FilePenLine } from "lucide-react";
import { TablaDinamicaProps } from "../../models/table.interface";

export const TableComponent = ({
    headers,
    rows,
    onView,
    onDelete,
    onEdit,
}: TablaDinamicaProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const totalPages = Math.ceil(rows.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedRows = rows.slice(startIndex, endIndex);

    const handlePrev = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="w-full">
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full h-100">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index} scope="col" className="px-6 py-6 text-left">
                                    {header}
                                </th>
                            ))}
                            <th scope="col" className="px-6 py-6 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-normal text-gray-900">
                        {paginatedRows.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="bg-white border-b border-gray-200 hover:bg-gray-50"
                            >
                                {headers.map((key, keyIndex) => (
                                    <td key={keyIndex} className="px-6 py-6 whitespace-nowrap">
                                        {row[key]}
                                    </td>
                                ))}
                                <td className="px-6 py-6 whitespace-nowrap">
                                    <button
                                        className="text-green-600 hover:text-green-900"
                                        onClick={() => onView?.(row)}
                                    >
                                        <FileText className="mr-2 h-4 w-4" />
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-900 ml-2"
                                        onClick={() => onDelete?.(row)}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                    </button>
                                    <button
                                        className="text-blue-600 hover:text-blue-900 ml-2"
                                        onClick={() => onEdit?.(row)}
                                    >
                                        <FilePenLine className="mr-2 h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer con paginación */}
            <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                    <span className="text-sm text-gray-700">
                        Mostrando {rows.length === 0 ? 0 : startIndex + 1}–{Math.min(endIndex, rows.length)} de {rows.length} resultados
                    </span>
                </div>
                <nav className="flex items-center space-x-2">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Anterior
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages || rows.length === 0}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Siguiente
                    </button>
                </nav>
            </div>
        </div>
    );
};
