import apiClient from "./apiClient";

export async function getStationByCity(cityId) {
    const response = await apiClient.get(`/stations/city/${cityId}`);
    console.log("API yanıtı:", response.data);
    return response.data;
}

export async function getStationById(stationId) {
    const response = await apiClient.get(`/station/${stationId}`)
    console.log("API yanıtı:", response.data);
    return response.data;
}

