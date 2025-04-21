import apiClient from "./apiClient";

export const getRoutesByCityId = async(cityId) => {
    const response = await apiClient.get('/routes/byCityId', {
        params: {cityId}
    });
    return response.data.map(route => `${route.name}-${route.line}`);
};