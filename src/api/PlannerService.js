import apiClient from "./apiClient";

export async function getRouteSegments(fromLat, fromLon, toLat, toLon, type, cityId ) {
    const response = await apiClient.get('/planner/segments',{
        params: {fromLat, fromLon, toLat, toLon, type, cityId}
    });
    console.log('[GET ROUTE]',response);
    return response.data;
}