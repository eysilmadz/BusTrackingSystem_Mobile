import apiClient from "./apiClient";

export const getRoutesByCityId = async(cityId) => {
    const response = await apiClient.get('/routes/byCityId', {
        params: {cityId}
    });
    return response.data;
};

export const getRouteStations = async (routeId) => {
    const response = await apiClient.get(`/routeStations/byRoute/${routeId}`);
    return response.data;
}

export const getRoutesByStation = async (stationId) => {
    const response = await apiClient.get(`/routeStations/byStation/${stationId}`);
    return response.data;
}

export const getMovementTimesByRoute = async (routeId) => {
    const response = await apiClient.get(`/movement/byRoute/${routeId}`);
    return response.data;
}