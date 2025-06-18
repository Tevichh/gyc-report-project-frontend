const API_URL = import.meta.env.VITE_API_IMAGES || "http://localhost:3000";


export async function uploadReportImages(reportId: string, base64Images: string[]) {
    try {
        const response = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                reportId,
                images: base64Images
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error uploading images');
        }

        const data = await response.json();
        console.log('Upload success:', data);
        return data;
    } catch (error) {
        console.error('Upload failed:', error);
        throw error;
    }
}

export async function fetchReportImages(reportId: string) {
    try {
        const response = await fetch(`${API_URL}/getImageByReportId/${reportId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error fetching images');
        }

        const data = await response.json();
        console.log('Fetched images:', data.images);
        return data.images;
    } catch (error) {
        console.error('Fetch images failed:', error);
        throw error;
    }
}



