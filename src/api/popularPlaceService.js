import apiClient from "./apiClient";

export const getPopularPlaces = async (cityId) => {
    try {
        const response = await apiClient.get('/popularplaces/byCityId', {
            params: { cityId },
        });
        return response.data;
    } catch (error) {
        console.error("Popüler yerler alınamadı:", error);
        return [];
    }
};