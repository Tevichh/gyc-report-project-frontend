export interface Report {
    id?: number;
    nombre: string;
    descripcion: string;
    fechaCreacion: string;
    fechaLimite: string;
    estado: string;
    prioridad: string;
    responsable: string;
    comentarios?: string[];
    ticket?: string;
    sistema?: string;
    zona?: string;
    locacion?: string;
    cliente?: string;
    nombrePunto?: string;
}

