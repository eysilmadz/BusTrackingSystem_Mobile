import apiClient from "./apiClient";

export const getCityNames = async () => {
    const response = await apiClient.get(`/cities/names`);
    return response.data;
};

export const getCityById = async (id) => {
  const response = await apiClient.get(`/cities/${id}`);
  return response.data;
};

// apiClient.interceptors.request.use(req => {
//   console.log(`➡️ ${req.method.toUpperCase()} →`, req.baseURL + req.url);
//   return req;
// }, err => Promise.reject(err));