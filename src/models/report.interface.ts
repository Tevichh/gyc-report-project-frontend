import { EquipoIntervenido } from "./equipoIntervenido.interface";

export interface Report {
    idReporte?: number;
    fechaInicio?: Date; // DD-MM-YYYY-HH:mm
    fechafin?: Date; // DD-MM-YYYY-HH:mm
    tipoActividad: string;
    NoTicket: string;
    sistema: string;
    zona?: string;
    locacion?: string;
    cliente: string;
    nombrePunto: string;
    descripcionSolicitud: string;
    descripcionActividad: string;
    equiposIntervenidos?: EquipoIntervenido[];
    anexoFotografico?: File[];
    SolucionoRequimiento?: boolean;
    nuevaIntervencion?: boolean;
    tecnicoResponsable: string;
    estado: "Finalizado" | "Pendiente" | "En Proceso" | "Cancelado";
}

export type ReportModalProps = {
    edit: boolean;
    isOpen?: boolean;
    handleModal?: () => void;
    report?: {
        NoTicket?: string;
        sistema?: string;
        zona?: string;
        locacion?: string;
        cliente?: string;
        nombrePunto?: string;
        descripcion?: string;
    };
};

export type Equipo = {
    equipo: string;
    serial: string;
    cambio: boolean;
    mantenimiento: boolean;
    suministroRetiro: boolean;
    nuevoSerial?: string;
};

export type FormValues = {
    ticket: string;
    sistema: string;
    zona: string;
    locacion: string;
    cliente: string;
    nombrePunto: string;
    descripcion: string;
    equipos: Equipo[];
    evidencias: FileList | null;
};

