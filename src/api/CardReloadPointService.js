import apiClient from "./apiClient";

// Şehir ID’sine göre dolum noktalarını alır
export const getReloadPointsByCityId = async (cityId) => {
  const response = await apiClient.get(`/reloadpoints/city/${cityId}`);
  return response.data;
};
