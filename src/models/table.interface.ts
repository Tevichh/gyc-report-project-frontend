type RowData = Record<string, any>;

export interface TablaDinamicaProps {
    headers: string[];
    rows: RowData[];
    onView?: (row: RowData) => void;
    onDelete?: (row: RowData) => void;
    onEdit?: (row: RowData) => void;
}
