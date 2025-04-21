import apiClient from "./apiClient";

export const getCityNames = async () => {
    const response = await apiClient.get(`/cities/names`);
    return response.data;
};