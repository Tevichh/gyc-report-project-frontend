export interface EquipoIntervenido {
    equipo: string;
    serial: string;
    estado: "Cambio" | "Mantenimiento" | "Suministro/Retiro" | "No Aplica";
    serialAnterior?: string;
}
