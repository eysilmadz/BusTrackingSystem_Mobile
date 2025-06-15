import apiClient from "./apiClient";

export async function getStationByCity(cityId) {
    const response = await apiClient.get(`/stations/city/${cityId}`);
    return response.data;
}

export async function getStationById(stationId) {
    const response = await apiClient.get(`/station/${stationId}`)
    return response.data;
}

