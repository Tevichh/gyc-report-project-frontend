export const getReportsService = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_REPORTES}/getReportes`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
    if (!response.ok) {
        throw new Error("Failed to fetch reports data");
    }
    const data = await response.json();
    return data;
}

export const getReportByIdService = async (id: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_REPORTES}/getReportesByTecnico/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch report data");
    }
    const data = await response.json();
    return data;
}

export const getReportByIdAdminService = async (id: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_REPORTES}/getReportesById/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch report data");
    }
    const data = await response.json();
    return data;
}

export const createReportService = async (dataReport: any) => {
    const response = await fetch(`${import.meta.env.VITE_API_REPORTES}/createReport`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(dataReport),
    });

    if (!response.ok) {
        throw new Error("Failed to create user");
    }
    const data = await response.json();
    return data;
}

export const updateReportService = async (dataReport: any) => {
    const response = await fetch(`${import.meta.env.VITE_API_REPORTES}/updateReport/${dataReport.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(dataReport),
    });

    if (!response.ok) {
        throw new Error("Failed to update report");
    }
    const data = await response.json();
    return data;
}

export const deleteReportService = async (id: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_REPORTES}/deleteReport/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete report");
    }
    const data = await response.json();
    return data;
}