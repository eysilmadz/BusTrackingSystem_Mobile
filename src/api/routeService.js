import apiClient from "./apiClient";

export const getRoutesByCityId = async (cityId) => {
    const response = await apiClient.get('/routes/byCityId', {
        params: { cityId }
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


// İki yönlü path çekebilmek için
export const getRoutePath = async (routeId, direction = 'startToEnd') => {
  const response = await apiClient.get(`/simulation/${routeId}/path`, {
    params: { direction }
  });
  return response.data;
};

export const simulateAllMovements =async(routeId, futureOnly = true) => {
  return await apiClient.post(`/simulation/${routeId}/simulateAll`, null, {params: {futureOnly}});
}

export const startSimulation = async (routeId, simRequest) => {
  return await apiClient.post(`/simulation/${routeId}`, simRequest);
};

